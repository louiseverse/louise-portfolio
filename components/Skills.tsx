import Image from "next/image";

const skills = [
  { name: "TypeScript", icon: "/skills/typescript.png" },
  { name: "JavaScript", icon: "/skills/javascript.png" },
  { name: "Python", icon: "/skills/python.png" },
  { name: "HTML", icon: "/skills/html.png" },
  { name: "CSS", icon: "/skills/css.png" },
  { name: "Firebase", icon: "/skills/firebase.png" },
  { name: "WordPress", icon: "/skills/wordpress.png" },
  { name: "Adobe Photoshop", icon: "/skills/photoshop.png" },
  { name: "Blender", icon: "/skills/blender.png" },
  { name: "Vibe Coding", icon: "/skills/code.png" },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative h-screen overflow-hidden bg-[#ececec]"
    >
      {/* LEFT CIRCLE CONTINUATION */}
      <div
  className="absolute -left-[24vw] -top-[48vw] h-[58vw] w-[58vw] rounded-full bg-[#c7cdd0]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.85) 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* RIGHT CIRCLE CONTINUATION */}
<div
  className="absolute -top-[18vw] -right-[20vw] h-[62vw] w-[62vw] rounded-full"
  style={{
    background:
      "linear-gradient(90deg, #e4e7e8 0%, #9ba5ab 45%, #263941 100%)",
    
    WebkitMaskImage:
      "radial-gradient(circle at 0% 50%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",

    maskImage:
      "radial-gradient(circle at 0% 50%, transparent 0%, transparent 23%, rgba(0,0,0,.15) 28%, rgba(0,0,0,.45) 34%, black 42%)",
 
  }}
/>
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-10 py-24">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-[#344754] lg:text-6xl">
            Technical stack
          </h2>

          <p className="mt-6 text-lg text-[#66737b] lg:text-xl">
            Technologies and tools I use to build modern system experiences.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="rounded-[24px] border-2 border-[#7b8a92] bg-transparent p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex flex-col items-center">
                <div className="relative h-24 w-24">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="my-5 h-px w-full bg-[#7b8a92]" />

                <h3 className="text-center text-xl text-[#5b6972]">
                  {skill.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}