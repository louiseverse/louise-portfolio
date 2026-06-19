import {
  LOUISE_ASSISTANT_SYSTEM_PROMPT,
  type GroqChatMessage,
  type GroqChatRole,
} from "@/lib/groq";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL ?? "llama-3.1-8b-instant";
const REQUEST_TIMEOUT_MS = 12000;

type GroqApiMessage = {
  role: "system" | GroqChatRole;
  content: string;
};

type GroqApiResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

type AssistantRequestBody = {
  prompt?: unknown;
  history?: unknown;
};

function sanitizeHistory(history: unknown): GroqChatMessage[] {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter((message): message is GroqChatMessage => {
      if (!message || typeof message !== "object") {
        return false;
      }

      const candidate = message as Partial<GroqChatMessage>;

      return (
        (candidate.role === "user" || candidate.role === "assistant") &&
        typeof candidate.content === "string" &&
        candidate.content.trim().length > 0
      );
    })
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 1000),
    }));
}

function sanitizeResponse(text: string) {
  return text.replace(/[*_#`[\]]/g, "").trim();
}

function getApiKey() {
  return process.env.GROQ_API_KEY ?? process.env.VITE_GROQ_API_KEY;
}

export async function POST(request: Request) {
  const apiKey = getApiKey();

  if (!apiKey) {
    return Response.json({ error: "ASSISTANT_NOT_CONFIGURED" }, { status: 503 });
  }

  let body: AssistantRequestBody;

  try {
    body = (await request.json()) as AssistantRequestBody;
  } catch {
    return Response.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";

  if (!prompt) {
    return Response.json({ error: "PROMPT_REQUIRED" }, { status: 400 });
  }

  if (prompt.length > 1200) {
    return Response.json({ error: "PROMPT_TOO_LONG" }, { status: 413 });
  }

  const messages: GroqApiMessage[] = [
    { role: "system", content: LOUISE_ASSISTANT_SYSTEM_PROMPT },
    ...sanitizeHistory(body.history),
    { role: "user", content: prompt },
  ];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 140,
        temperature: 0.45,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Groq] API Error ${response.status}:`, errorText);

      if (response.status === 429) {
        return Response.json({ error: "TOO_MANY_REQUESTS" }, { status: 429 });
      }

      if (response.status === 401 || response.status === 403) {
        return Response.json({ error: "ASSISTANT_NOT_CONFIGURED" }, { status: response.status });
      }

      return Response.json({ error: "GROQ_API_ERROR" }, { status: 502 });
    }

    const data = (await response.json()) as GroqApiResponse;
    const reply = data.choices?.[0]?.message?.content;

    if (!reply?.trim()) {
      return Response.json({ reply: "Saglit, hindi malinaw yung sagot ko. Pwede mo bang ulitin?" });
    }

    return Response.json({ reply: sanitizeResponse(reply) });
  } catch (error) {
    console.error("[Groq] Route error:", error);

    const isAbortError = error instanceof Error && error.name === "AbortError";

    return Response.json(
      { error: isAbortError ? "REQUEST_TIMEOUT" : "GROQ_NETWORK_ERROR" },
      { status: isAbortError ? 504 : 502 },
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
