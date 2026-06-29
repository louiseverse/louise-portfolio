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
      "Prettier",
      "Vercel",
      "Adobe Photoshop",
      "Blender",
      "WordPress",
    ],
  },
];

const contributionPattern: Record<string, number> = {
  "6-4": 2,
  "9-3": 3,
  "9-4": 4,
  "35-5": 1,
  "36-4": 2,
  "36-6": 3,
  "37-0": 2,
  "37-1": 1,
  "38-0": 2,
  "38-1": 2,
  "40-4": 3,
  "41-6": 2,
  "42-0": 3,
  "42-1": 2,
  "42-2": 4,
  "42-3": 3,
  "42-5": 2,
  "43-0": 4,
  "43-1": 3,
  "43-2": 2,
  "43-3": 4,
  "43-4": 2,
  "43-5": 1,
  "44-1": 3,
  "44-2": 2,
  "44-4": 1,
  "44-6": 3,
  "45-0": 2,
  "45-2": 3,
  "45-3": 2,
  "45-6": 4,
  "46-0": 2,
  "47-3": 1,
  "49-5": 1,
  "50-5": 2,
  "51-0": 2,
  "51-1": 1,
  "51-2": 3,
};

const contributionLevels = Array.from({ length: 52 }, (_, week) =>
  Array.from(
    { length: 7 },
    (_, day) => contributionPattern[`${week}-${day}`] ?? 0,
  ),
);

const contributionTone = [
  "bg-transparent",
  "bg-[#9ba5ab]",
  "bg-[#66737b]",
  "bg-[#344754]",
  "bg-[#263941]",
];

function GitHubContributions() {
  return (
    <div className="w-full">
      <div className="overflow-x-auto pb-1">
        <div className="w-max">
          <div className="flex items-start justify-between gap-8 text-[#8a9398]">
            <span className="text-base font-bold uppercase tracking-[0.08em] text-[#344754] sm:text-lg lg:text-xl">github</span>
            <a
              href="https://github.com/Louisesoledad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.08em] transition-colors hover:text-[#344754]"
            >
              @LOUISESOLEDAD /
            </a>
          </div>

          <div className="mt-5 grid grid-flow-col grid-rows-7 gap-1.5">
            {contributionLevels.flatMap((week, weekIndex) =>
              week.map((level, dayIndex) => (
                <span
                  key={`${weekIndex}-${dayIndex}`}
                  className={`h-2.5 w-2.5 rounded-full ${contributionTone[level]}`}
                />
              )),
            )}
          </div>

          <p className="mt-4 text-sm leading-[1.75] text-[#66737b] sm:text-base lg:text-lg lg:leading-[1.9]">
            166 contributions in the last year
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen overflow-hidden bg-[#ececec]"
    >
      <div
        className="absolute -left-[34vw] -top-[30vw] hidden h-[76vw] w-[76vw] rounded-full bg-[#c7cdd0] sm:block lg:-left-[23.6vw] lg:-top-[48vw] lg:h-[58vw] lg:w-[58vw]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.85) 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div
        className="absolute -right-[34vw] -top-[12vw] h-[78vw] w-[78vw] rounded-full sm:-right-[28vw] lg:-right-[20vw] lg:-top-[18vw] lg:h-[62vw] lg:w-[62vw]"
        style={{
          background:
            "linear-gradient(90deg, #e4e7e8 0%, #9ba5ab 45%, #263941 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at 0% 50%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
          maskImage:
            "radial-gradient(circle at 0% 50%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-10 sm:px-10 sm:py-24 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1120px] text-left">
          <h2 className="text-base font-bold uppercase tracking-[0.08em] text-[#344754] sm:text-lg lg:text-xl">
            Tech stack
          </h2>

          <p className="mt-3 max-w-[680px] text-sm leading-[1.75] text-[#66737b] sm:text-base lg:text-lg lg:leading-[1.9]">
            Technologies and tools I use to build modern system experiences.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-[1120px] space-y-9 sm:mt-14 sm:space-y-11 lg:mt-16">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-[#8a9398]">
                {group.category}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2.5 sm:gap-3">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-[#cfd4d7] bg-transparent px-3.5 py-2 text-xs text-[#4d5960] transition-colors hover:border-[#8d9aa1] sm:px-4 sm:text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <GitHubContributions />
        </div>
      </div>
    </section>
  );
}
