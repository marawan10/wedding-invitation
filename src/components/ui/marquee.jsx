import { cn } from "@/lib/utils";

export default function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 2,
  speed = 50,
  direction = "left",
  autoFill = false,
  gradient = false,
  ...props
}) {
  const duration = speed ? `${100 - speed}s` : "40s";
  const isReverse = direction === "right" || reverse;
  
  return (
    <div
      dir={vertical ? undefined : "ltr"}
      {...props}
      className={cn(
        "group flex overflow-hidden [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
      style={{
        "--duration": duration,
        "--gap": "1rem",
        gap: "var(--gap)",
      }}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": isReverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
