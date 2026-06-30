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
    <div className="flex w-full justify-center pt-6 sm:pt-8">
      <div className="w-full max-w-[860px]  pt-8 text-left sm:pt-12">
        <div className="inline-flex w-fit max-w-full flex-col">
          <div className="flex items-center justify-between text-[#8a9398] sm:gap-8 w-full">
            <span className="text-lg font-extrabold uppercase tracking-[0.08em] text-[#344754] sm:text-xl lg:text-2xl">
              github
            </span>
            <a
              href="https://github.com/Louisesoledad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-[0.08em] transition-colors hover:text-[#344754] sm:text-sm"
            >
              @LOUISESOLEDAD /
            </a>
          </div>

          <div className="mt-6 flex justify-start">
            <div className="grid grid-flow-col grid-rows-7 gap-[clamp(0.18rem,0.4vw,0.42rem)]">
              {contributionLevels.flatMap((week, weekIndex) =>
                week.map((level, dayIndex) => (
                  <span
                    key={`${weekIndex}-${dayIndex}`}
                    className={`h-[clamp(0.32rem,1.3vw,0.8rem)] w-[clamp(0.32rem,1.3vw,0.8rem)] rounded-full ${contributionTone[level]}`}
                  />
                ))
              )}
            </div>
          </div>

          <p className="mt-5 text-sm font-semibold leading-[1.75] text-[#66737b] sm:text-base lg:text-lg lg:leading-[1.9]">
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
        className="absolute -right-[30vw] -top-[36vw] h-[78vw] w-[78vw] rounded-full sm:-right-[24vw] lg:-right-[19.5vw] lg:-top-[26vw] lg:h-[62vw] lg:w-[62vw]"
        style={{
          background:
            "linear-gradient(90deg, #e4e7e8 0%, #9ba5ab 45%, #263941 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at 0% 50%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
          maskImage:
            "radial-gradient(circle at 0% 50%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-16 sm:px-10 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[860px] text-left">
          <h2 className="text-[clamp(2.15rem,8.6vw,4.15rem)] font-extrabold leading-none text-[#344754]">
            Tech Stack
          </h2>

          <p className="mt-4 max-w-[680px] text-base leading-[1.75] text-[#66737b] sm:text-lg lg:text-xl lg:leading-[1.9]">
            Technologies and tools I use to build modern system experiences.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[860px] space-y-10 text-left sm:mt-16 sm:space-y-12 lg:mt-20">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-extrabold uppercase tracking-[0.08em] text-[#8a9398] sm:text-base lg:text-lg">
                {group.category}
              </h3>

              <div className="mt-5 flex flex-wrap justify-start gap-3 sm:gap-4">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-[#cfd4d7] bg-transparent px-4.5 py-2.5 text-sm font-semibold text-[#4d5960] transition-all hover:border-[#344754] hover:bg-[#344754]/5 sm:px-5 sm:py-3 sm:text-base"
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
