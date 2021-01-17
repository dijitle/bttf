import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { drawTimePod } from "./components/TimePod";
import InputPad from "./components/InputPad";

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

  const [inputTime, setInputTime] = useState(null);

  const addNumberToInput = (num) => {
    if (num === null) {
      setInputTime(null);
      return;
    }

    if (num === "input" && inputTime === null) {
      setInputTime("M_");
      return;
    }

    if (inputTime == null) {
      return;
    }

    if (num === "clear") {
      setInputTime("M_");
      return;
    }

    if (num === "back") {
      if (inputTime === "M_") {
        return;
      }
    }

    if (num === "enter") {
      let d = new Date(
        inputTime.substring(5, 9),
        inputTime.substring(1, 3) - 1,
        inputTime.substring(3, 5),
        inputTime.substring(9, 11),
        inputTime.substring(11, 13)
      );
      if (isNaN(d)) {
        setInputTime("M_");
        return;
      } else {
        setDestinationTime(d);
        setInputTime(null);
        return;
      }
    }
    if (typeof num === "number") {
      if (inputTime.length === 14) {
        return;
      }
      let dateString = inputTime.slice(1, -1);
      let l = dateString.length;
      let prefix =
        l < 1
          ? "M"
          : l < 3
          ? "D"
          : l < 7
          ? "Y"
          : l < 9
          ? "H"
          : l < 11
          ? "m"
          : "_";
      setInputTime(prefix + dateString + num + "_");
    }
  };

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

      drawTimePod(
        ctx,
        w,
        w - (w / 4.5) * 3.2,
        "#ff0000",
        "DESTINATION TIME",
        inputTime == null ? destinationTime : inputTime
      );

      drawTimePod(
        ctx,
        w,
        w - (w / 4.5) * 2.1,
        "#00ff00",
        "PRESENT TIME",
        presentTime
      );

      drawTimePod(
        ctx,
        w,
        w - w / 4.5,
        "#ffff00",
        "LAST TIME DEPARTED",
        lastTime
      );
    };

    let id = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(id);
  }, [winSize, destinationTime, presentTime, lastTime, inputTime]);

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
        input={addNumberToInput}
        width={Math.min(
          Math.abs(winSize.h - winSize.w),
          Math.min(winSize.h, winSize.w)
        )}
      />
    </div>
  );
}

export default App;
