import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative h-screen overflow-hidden bg-[#ececec]"
    >
      {/* Left Circle with Dots */}
      <div
  className="absolute -left-[24vw] top-[2vw] h-[58vw] w-[58vw] rounded-full bg-[#c7cdd0]"
  style={{
    backgroundImage:
      "radial-gradient(rgba(255,255,255,.85) 1.5px, transparent 1.5px)",
    backgroundSize: "18px 18px",
  }}
/>

      {/* Bottom Right Circle */}
<div
  className="absolute -bottom-[45vw] -right-[19.5vw] h-[62vw] w-[62vw] rounded-full"
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
      <div className="relative z-15 mx-auto flex h-full max-w-[1400px] items-center justify-center px-10">
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">
          
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative h-[550px] w-[550px] overflow-hidden">
              <Image
                src="/ale.jpg"
                alt="Louise"
                fill
                priority
                className="object-cover grayscale"
              />
            </div>
          </div>

          {/* Text */}
          <div className="max-w-[520px]">
            <h2 className="mb-8 text-5xl font-extrabold text-[#344754] lg:text-6xl">
              Meet the Developer
            </h2>

            <p className="text-lg leading-[1.9] text-[#66737b] lg:text-xl">
              I'm Louise, a passionate web developer with a background in
              computer science. I enjoy building modern, responsive, and
              user-friendly websites. I focus on writing clean code and
              creating smooth user experiences that bring ideas to life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}