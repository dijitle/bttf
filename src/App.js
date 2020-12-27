import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import {drawTimePod} from "./components/TimePod"

function App() {

  const [winSize, setWinSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  const [segNumValue, setSegNumValue] = useState(8);
  const [segCharValue, setSegCharValue] = useState("a");

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

      canvas.width = Math.min(width - 2, height - 2) * 2;
      canvas.height = Math.min(width - 2, height - 2) * 2;

      canvas.style =
        "width: " +
        Math.min(width - 5, height - 5) +
        "px; height: " +
        Math.min(width - 5, height - 5);

      var w = canvas.width;

      ctx.clearRect(0, 0, w, w);

      drawTimePod(ctx, w, 0, "#ff0000", "DESTINATION TIME", new Date(1985, 10, 26, 1, 21))

      drawTimePod(ctx, w, w / 4 + 10, "#00ff00", "DESTINATION TIME", new Date(1985, 10, 26, 1, 22))

      drawTimePod(ctx, w, w / 2 + 20, "#ffff00", "LAST TIME DEPARTED", new Date(1985, 10, 26, 1, 20))

    };

    let id = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(id);
  }, [
    winSize,
    segNumValue,
    segCharValue
  ]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setSegNumValue((segNumValue + 1) % 10);
  //     setSegCharValue(segCharValue === "Z" ? "a" : segCharValue === "z" ? "A" : String.fromCharCode(segCharValue?.charCodeAt(0) + 1))
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // });

  return (
    <div className="App vh-100 vw-100">
      <div className="container-fluid p-0">
        <canvas id="timeCircuits"></canvas>
        
      </div>
    </div>
  );
}

export default App;
