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

      let segThick = 50;
      let segGap = 5;
      let segLength = 400;
      let startX = 25;
      let startY = 25;

      ctx.rect(startX, startY, startX + segLength, startY + 2 * segLength - segThick / 2);
      ctx.stroke();

      ctx.rect(startX, startY, startX + segLength, startY + segLength - segThick / 2);
      ctx.stroke();


      //top
      ctx.translate(startX, startY)
      drawSegment(ctx, segThick, segLength, segGap);
      ctx.resetTransform();

      //middle
      ctx.translate(startX, startY + segLength - segThick / 2)
      drawSegment(ctx, segThick, segLength, segGap);
      ctx.resetTransform();

      //bottom
      ctx.translate(startX, startY + 2 *  segLength - segThick)
      drawSegment(ctx, segThick, segLength, segGap);
      ctx.resetTransform();
      
      //rightTop
      ctx.rotate(Math.PI / 2)
      ctx.translate(startX, -1 * startY - segLength - segThick /2)
      drawSegment(ctx, segThick, segLength, segGap);
      ctx.resetTransform();
      
      //rightBottom
      ctx.rotate(Math.PI / 2)
      ctx.translate(startX + segLength - segThick / 2, -1 * startY - segLength - segThick /2)
      drawSegment(ctx, segThick, segLength, segGap);
      ctx.resetTransform();
      
      //leftBottom
      ctx.rotate(Math.PI / 2)
      ctx.translate(startX + segLength - segThick / 2, -1 * startY - segThick)
      drawSegment(ctx, segThick, segLength, segGap);
      ctx.resetTransform();
      
      //leftTop
      ctx.rotate(Math.PI / 2)
      ctx.translate(startX, -1 * startY - segThick)
      drawSegment(ctx, segThick, segLength, segGap);
      ctx.resetTransform();
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
