"use client";

import Image from "next/image";

const skillGroups = [
  {
    category: "Frontend",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Vite",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Python",
      "FastAPI",
      "Firebase",
      "MySQL",

    ],
  },
  {
    category: "AI & Machine Learning",
    skills: [
      "TensorFlow",
      "MediaPipe",
      "OpenCV",
      "Transformers",
      "OpenAI",
      "Hugging Face",
      "Claude code",
      "Codex",

    ],
  },
  {
    category: "Developer Tools",
    skills: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "VS Code",
      "Vercel",
      "Adobe Photoshop",
      "Blender",
      "WordPress",
    ],
  },
];

const iconMap: Record<string, string> = {
  JavaScript: "javascript.png",
  TypeScript: "typescript.png",
  React: "react.png",
  "Next.js": "nextjs.png",
  HTML: "html.png",
  CSS: "css.png",
  "Tailwind CSS": "tailwindcss.png",
  Vite: "vite.png",

  "Node.js": "nodejs.png",
  Python: "python.png",
  FastAPI: "fastapi.png",
  Firebase: "firebase.png",
  MySQL: "mysql.png",

  TensorFlow: "tensorflow.png",
  MediaPipe: "mediapipe.png",
  OpenCV: "opencv.png",
  Transformers: "transformers.png",
  OpenAI: "openai.png",
  "Hugging Face": "huggingface.png",
  "Claude code": "claude.png",
  Codex: "codex.png",

  Git: "git.png",
  GitHub: "github.png",
  "GitHub Actions": "githubactions.png",
  "VS Code": "vscode.png",
  Vercel: "vercel.png",
  "Adobe Photoshop": "photoshop.png",
  Blender: "blender.png",
  WordPress: "wordpress.png",
};

/* ─── Reusable Skill Item ─── */

function SkillItem({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="group flex flex-col items-center gap-2.5 sm:gap-3">
      <div className="flex h-14 w-14 items-center justify-center transition-transform duration-[250ms] ease-out group-hover:-translate-y-1 group-hover:scale-[1.08] sm:h-16 sm:w-16 lg:h-20 lg:w-20">
        <Image
          src={`/skills/${icon}`}
          alt={label}
          width={80}
          height={80}
          className="object-contain"
        />
      </div>
      <span className="text-[13px] font-semibold text-[#4C5C68] transition-colors duration-[250ms] ease-out group-hover:text-[#36454F] sm:text-sm lg:text-[15px] text-center">
        {label}
      </span>
    </div>
  );
}

/* ─── Skills Section ─── */

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen overflow-hidden bg-[#DCDCDD]"
    >


      <div
        className="absolute -right-[30vw] -top-[36vw] h-[78vw] w-[78vw] rounded-full sm:-right-[24vw] lg:-right-[19.5vw] lg:-top-[26vw] lg:h-[62vw] lg:w-[62vw]"
        style={{
          background:
            "linear-gradient(90deg, #DCDCDD 0%, #899097 45%, #36454F 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at 0% 50%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
          maskImage:
            "radial-gradient(circle at 0% 50%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-16 sm:px-10 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[860px] text-center">
          <h2 className="text-[clamp(2.15rem,8.6vw,4.15rem)] font-extrabold leading-none text-[#36454F]">
            Tech Stack
          </h2>

          <p className="mx-auto mt-4 max-w-[680px] text-base leading-[1.75] text-[#4C5C68] sm:text-lg lg:text-xl lg:leading-[1.9]">
            Technologies and tools I use to build modern system experiences.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[860px] space-y-12 sm:mt-16 sm:space-y-14 lg:mt-20 lg:space-y-16">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="text-center text-sm font-extrabold uppercase tracking-[0.12em] text-[#899097] sm:text-base lg:text-lg">
                {group.category}
              </h3>

              <div className="mx-auto mt-8 grid max-w-[500px] grid-cols-3 gap-x-4 gap-y-8 sm:mt-10 sm:max-w-[760px] sm:grid-cols-5 sm:gap-x-6 sm:gap-y-10 lg:max-w-[860px] lg:grid-cols-5 lg:gap-x-8 lg:gap-y-12">
                {group.skills.map((skill) => (
                  <SkillItem
                    key={skill}
                    icon={iconMap[skill] ?? ""}
                    label={skill}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
