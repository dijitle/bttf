import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { drawTimePod } from "./components/TimePod";
import InputPad from "./components/InputPad";
import { Row } from "react-bootstrap";

function App() {
  const [winSize, setWinSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });
  const [destinationTime, setDestinationTime] = useState(
    new Date(1985, 9, 26, 1, 21)
  );
  const [presentTime, setPresentTime] = useState(new Date());
  const [lastTime, setLastTime] = useState(new Date(1985, 9, 26, 1, 20));

  useEffect(() => {
    const handleResize = () =>
      setWinSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const draw = () => {
      let canvas = document.getElementById("timeCircuits");
      let ctx = canvas.getContext("2d");
      ctx.scale(2, 2);

      let width = window.innerWidth;
      let height = window.innerHeight;

      canvas.width = Math.min(width, height) * 2;
      canvas.height = Math.min(width, height) * 2;

      canvas.style =
        "width: " +
        Math.min(width, height) +
        "px; height: " +
        Math.min(width, height) +
        "px;";

      var w = canvas.width;

      ctx.clearRect(0, 0, w, w);

      drawTimePod(ctx, w, 0, "#ff0000", "DESTINATION TIME", destinationTime);

      drawTimePod(ctx, w, w / 4, "#00ff00", "PRESENT TIME", presentTime);

      drawTimePod(ctx, w, w / 2, "#ffff00", "LAST TIME DEPARTED", lastTime);
    };

    let id = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(id);
  }, [winSize, destinationTime, presentTime, lastTime]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPresentTime(new Date());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div
      className="App vh-100 vw-100"
      style={{
        flexDirection: winSize.w > winSize.h ? "row" : "column",
      }}
    >
      <canvas id="timeCircuits"></canvas>
      <InputPad
        width={Math.min(
          Math.abs(winSize.h - winSize.w),
          Math.min(winSize.h, winSize.w)
        )}
      />
    </div>
  );
}

export default App;
