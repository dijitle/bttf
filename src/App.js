import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";

function App() {

  const [winSize, setWinSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  const [segValue, setSegValue] = useState(0);

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

      ctx.fillStyle = "#ffffff";
      let dim = 0.05;
      ctx.globalAlpha = dim;

      let segThick = 100;
      let segGap = 15;
      let segLength = 600;
      let startX = 200;
      let startY = 100;
      let skew = 0;

      ctx.transform(1, 0, skew, 1, startX, startY);
      ctx.rect(0, 0, segLength + segThick / 2, 2 * segLength);
      ctx.stroke();

      ctx.rect(0, 0, segLength + segThick / 2, segLength);
      ctx.stroke();
      ctx.save();

      //top
      ctx.globalAlpha = [0, 2, 3, 5, 6, 7, 8, 9].includes(segValue) ? 1 : dim;
      drawSegment(ctx, segThick, segLength, segGap);

      //middle
      ctx.globalAlpha = [2, 3, 4, 5, 6, 8, 9].includes(segValue) ? 1 : dim;
      ctx.translate(0, segLength - segThick / 2)
      drawSegment(ctx, segThick, segLength, segGap);

      //bottom
      ctx.globalAlpha = [0, 2, 3, 5, 6, 8].includes(segValue) ? 1 : dim;
      ctx.translate(0, segLength - segThick / 2)
      drawSegment(ctx, segThick, segLength, segGap);
      
      //rightTop
      ctx.restore();
      ctx.globalAlpha = [0, 1, 2, 3, 4, 7, 8, 9].includes(segValue) ? 1 : dim;
      ctx.rotate(Math.PI / 2)
      ctx.translate(0, -1 * segLength - segThick /2)
      drawSegment(ctx, segThick, segLength, segGap);
      
      //rightBottom
      ctx.globalAlpha = [0, 1, 3, 4, 5, 6, 7, 8, 9].includes(segValue) ? 1 : dim;
      ctx.translate(segLength - segThick / 2, 0)
      drawSegment(ctx, segThick, segLength, segGap);
      
      //leftBottom
      ctx.restore();
      ctx.globalAlpha = [0, 2, 6, 8].includes(segValue) ? 1 : dim;
      ctx.translate( 0, segLength - segThick / 2)
      drawSegment(ctx, segThick, segLength, segGap);
      
      //leftTop
      ctx.restore();
      ctx.globalAlpha = [0, 4, 5, 6, 8, 9].includes(segValue) ? 1 : dim;
      ctx.translate( -segLength + segThick / 2, 0)
      drawSegment(ctx, segThick, segLength, segGap);
    };

    let id = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(id);
  }, [
    winSize,
    segValue
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSegValue((segValue + 1) % 10);
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="App vh-100 vw-100">
      <div className="container-fluid p-0">
        <canvas id="timeCircuits"></canvas>
        
      </div>
    </div>
  );
}

export default App;
