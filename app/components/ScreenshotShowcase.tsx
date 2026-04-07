import Image from "next/image";

const screenshots = [
  { src: "/images/home.jpg", alt: "Home screen" },
  { src: "/images/charts-page.jpg", alt: "Charts and analytics" },
  { src: "/images/goals-page.jpg", alt: "Goals tracking" },
  { src: "/images/streak-page.jpg", alt: "Streak tracking" },
  { src: "/images/workout-details.jpg", alt: "Workout details" },
];

export default function ScreenshotShowcase() {
  return (
    <section
      className="py-[clamp(4rem,8vh,7rem)] relative overflow-hidden"
      id="screenshots"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(255,85,38,0.06)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1200px] mx-auto px-[clamp(1rem,5vw,3rem)]">
        <h2 className="text-[clamp(2rem,3vw+0.5rem,3rem)] font-bold leading-tight tracking-tight text-center mb-14">
          See it in action.
        </h2>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-[clamp(1rem,5vw,3rem)] pb-4 scroll-smooth">
        {screenshots.map((ss) => (
          <div
            key={ss.src}
            className="shrink-0 snap-center"
          >
            <div className="phone-frame w-[220px] sm:w-[260px]">
              <Image
                src={ss.src}
                alt={ss.alt}
                width={260}
                height={563}
                className="w-full h-auto"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
