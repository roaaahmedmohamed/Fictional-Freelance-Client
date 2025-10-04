import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ChartProgress({ value }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const stepTime = 15;
    const increment = (value / duration) * stepTime;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setProgress(start);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <CircularProgressbar
      value={progress}
      text={`${Math.round(progress)}%`}
      strokeWidth={8}
      styles={buildStyles({
        textColor: "#fff",
        pathColor: "#3b82f6",
        trailColor: "#1f2937",
        pathTransitionDuration: 0.15,
      })}
    />
  );
}
