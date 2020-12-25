import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";

function App() {

  const [winSize, setWinSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () =>
      setWinSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const drawSegment = (ctx, thick, length, gap) => {
      ctx.lineWidth = 0;
      ctx.beginPath();
      ctx.moveTo(thick / 2 + gap, thick / 2);
      ctx.lineTo(thick + gap, 0);
      ctx.lineTo(length - thick / 2 - gap, 0);
      ctx.lineTo(length - gap, thick / 2)
      ctx.lineTo(length - thick / 2 - gap, thick);
      ctx.lineTo(thick + gap, thick)
      ctx.closePath();
      ctx.fill()
    }

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

      ctx.strokeStyle = "#ffffff";
      ctx.fillStyle = "#ffffff";

      let segThick = 100;
      let segGap = 15;
      let segLength = 600;
      let startX = 200;
      let startY = 100;
      let skew = -0.1;

      ctx.transform(1, 0, skew, 1, startX, startY);
      ctx.rect(0, 0, segLength + segThick / 2, 2 * segLength);
      ctx.stroke();

      ctx.rect(0, 0, segLength + segThick / 2, segLength);
      ctx.stroke();
      ctx.save();

      //top
      ctx.transform(1, 0, 0, 1, 0, 0)
      drawSegment(ctx, segThick, segLength, segGap);

      //middle
      ctx.transform(1, 0, 0, 1, 0, segLength - segThick / 2)
      drawSegment(ctx, segThick, segLength, segGap);

      //bottom
      ctx.transform(1, 0, 0, 1, 0, segLength - segThick / 2)
      drawSegment(ctx, segThick, segLength, segGap);
      
      //rightTop
      ctx.restore();
      ctx.rotate(Math.PI / 2)
      ctx.transform(1, 0, 0, 1, 0, -1 * segLength - segThick /2)
      drawSegment(ctx, segThick, segLength, segGap);
      
      //rightBottom
      ctx.transform(1, 0, 0, 1, segLength - segThick / 2, 0)
      drawSegment(ctx, segThick, segLength, segGap);
      
      //leftBottom
      ctx.restore();
      ctx.transform(1, 0, 0, 1, 0, segLength - segThick / 2)
      drawSegment(ctx, segThick, segLength, segGap);
      
      //leftTop
      ctx.restore();
      ctx.transform(1, 0, 0, 1, -segLength + segThick / 2, 0)
      drawSegment(ctx, segThick, segLength, segGap);
    };

    let id = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(id);
  }, [
    winSize
  ]);

  return (
    <div className="App vh-100 vw-100">
      <div className="container-fluid p-0">
        <canvas id="timeCircuits"></canvas>
      </div>
    </div>
  );
}

export default App;
