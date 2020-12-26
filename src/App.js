import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";

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
    const drawVerticalLine = (ctx, x1, y1, x2, y2, thick, gap) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1 + gap);
      ctx.lineTo(x1 + thick / 2, y1 + thick / 2 + gap);
      ctx.lineTo(x2 + thick / 2, y2 - thick / 2 - gap);
      ctx.lineTo(x2, y2 - gap)
      ctx.lineTo(x2 - thick / 2, y2 - thick / 2 - gap);
      ctx.lineTo(x1 - thick / 2, y1 + thick / 2 + gap)
      ctx.closePath();
      ctx.fill()
    }

    const drawHorizontalLine = (ctx, x1, y1, x2, y2, thick, gap) => {
      ctx.beginPath();
      ctx.moveTo(x1 + gap, y1);
      ctx.lineTo(x1 + thick / 2 + gap, y1 - thick / 2);
      ctx.lineTo(x2 - thick / 2 - gap, y2 - thick / 2);
      ctx.lineTo(x2 - gap, y2)
      ctx.lineTo(x2 - thick / 2 - gap, y2 + thick / 2);
      ctx.lineTo(x1 + thick / 2 + gap, y1 + thick /2)
      ctx.closePath();
      ctx.fill()
    }

    const drawDiagonalDownLine = (ctx, x1, y1, x2, y2, thick, gap) => {
      ctx.beginPath();
      ctx.moveTo(x1 + gap, y1 + gap);
      ctx.lineTo(x1 + thick / Math.sqrt(2) + gap, y1 + gap);
      ctx.lineTo(x2 - gap, y2 - thick / Math.sqrt(2) - gap);
      ctx.lineTo(x2 - gap, y2 - gap)
      ctx.lineTo(x2 - thick / Math.sqrt(2) - gap, y2 - gap);
      ctx.lineTo(x1 + gap, y1 + thick / Math.sqrt(2) + gap)
      ctx.closePath();
      ctx.fill()
    }

    const drawDiagonalUpLine = (ctx, x1, y1, x2, y2, thick, gap) => {
      ctx.beginPath();
      ctx.moveTo(x1 + gap, y1 - gap);
      ctx.lineTo(x1 + gap, y1 - thick / Math.sqrt(2) - gap);
      ctx.lineTo(x2 - thick / Math.sqrt(2) - gap, y2 + gap);
      ctx.lineTo(x2 - gap, y2 + gap)
      ctx.lineTo(x2 - gap, y2 + thick / Math.sqrt(2) + gap);
      ctx.lineTo(x1 + thick / Math.sqrt(2) + gap, y1 - gap)
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

      let dim = 0.08;
      ctx.globalAlpha = dim;
      
      let segThick = 25;
      let segGap = 4;
      let segLength = 200;
      let skew = -0.1;


      ctx.fillStyle = "#ff0000";
      ctx.transform(1, 0, skew, 1, 100, 100);

      let top = segThick / 2;
      let left = segThick / 2;
      let right = segLength - segThick / 2;
      let center = segLength / 2;
      let middle = segLength
      let bottom = 2 * segLength - segThick / 2;

      //top
      ctx.globalAlpha = [0, 2, 3, 5, 6, 7, 8, 9].includes(segNumValue) ? 1 : dim;
      drawHorizontalLine(ctx, left, top, right, top, segThick, segGap);

      //middle
      ctx.globalAlpha = [2, 3, 4, 5, 6, 8, 9].includes(segNumValue) ? 1 : dim;
      drawHorizontalLine(ctx, left, middle, right, middle, segThick, segGap);

      //bottom
      ctx.globalAlpha = [0, 2, 3, 5, 6, 8].includes(segNumValue) ? 1 : dim;
      drawHorizontalLine(ctx, left, bottom, right, bottom, segThick, segGap);
      
      //rightTop
      ctx.globalAlpha = [0, 1, 2, 3, 4, 7, 8, 9].includes(segNumValue) ? 1 : dim;
      drawVerticalLine(ctx, right, top, right, middle, segThick, segGap);
      
      //rightBottom
      ctx.globalAlpha = [0, 1, 3, 4, 5, 6, 7, 8, 9].includes(segNumValue) ? 1 : dim;
      drawVerticalLine(ctx, right, middle, right, bottom, segThick, segGap);
      
      //leftBottom
      ctx.globalAlpha = [0, 2, 6, 8].includes(segNumValue) ? 1 : dim;
      drawVerticalLine(ctx, left, middle, left, bottom, segThick, segGap);
      
      //leftTop
      ctx.globalAlpha = [0, 4, 5, 6, 8, 9].includes(segNumValue) ? 1 : dim;
      drawVerticalLine(ctx, left, top, left, middle, segThick, segGap);


      ctx.globalAlpha = dim;
      ctx.fillStyle = "#0000ff";
      ctx.resetTransform();

      ctx.transform(1, 0, skew, 1, 800, 100);
      
      ctx.globalAlpha = 1;
     
      ctx.fillStyle = "#00ff00"

      //northwest
      ctx.globalAlpha = "MNXx".includes(segCharValue) ? 1 : dim;
      drawDiagonalDownLine(ctx, left, top, center, middle, segThick, segGap);

      //northeast
      ctx.globalAlpha = "01KMVXZkx".includes(segCharValue) ? 1 : dim;
      drawDiagonalUpLine(ctx, center, middle, right, top, segThick, segGap);

      //southeast
      ctx.globalAlpha = "5KNQRWXkwx".includes(segCharValue) ? 1 : dim;
      drawDiagonalDownLine(ctx, center, middle, right, bottom, segThick, segGap);

      //southwest
      ctx.globalAlpha = "0VWXZevwxz".includes(segCharValue) ? 1 : dim;
      drawDiagonalUpLine(ctx, left, bottom, center, middle, segThick, segGap);

      ctx.globalAlpha = dim;

      //top left
      ctx.globalAlpha = "02356789ABCDEFGIOPQRSTZgpqs".includes(segCharValue) ? 1 : dim;
      drawHorizontalLine(ctx, left, top, center, top, segThick, segGap);

      //top right
      ctx.globalAlpha = "02356789ABCDEFGIOPQRSTZf".includes(segCharValue) ? 1 : dim;
      drawHorizontalLine(ctx, center, top, right, top, segThick, segGap);

      //middle left
      ctx.globalAlpha = "245689AEFHKPRSYabcefghmnopqrstz".includes(segCharValue) ? 1 : dim;
      drawHorizontalLine(ctx, left, middle, center, middle, segThick, segGap);

      //middle right
      ctx.globalAlpha = "234689ABGHPRSYdfmy".includes(segCharValue) ? 1 : dim;
      drawHorizontalLine(ctx, center, middle, right, middle, segThick, segGap);

      //bottom left
      ctx.globalAlpha = "035689BCDEGIJLOQSUYZabcegjostuz".includes(segCharValue) ? 1 : dim;
      drawHorizontalLine(ctx, left, bottom, center, bottom, segThick, segGap);

      //bottom right
      ctx.globalAlpha = "0235689BCDEGIJLOQSUYZady".includes(segCharValue) ? 1 : dim;
      drawHorizontalLine(ctx, center, bottom, right, bottom, segThick, segGap);
      
      //rightTop
      ctx.globalAlpha = "01234789ABDHJMNOPQRUWYdy".includes(segCharValue) ? 1 : dim;
      drawVerticalLine(ctx, right, top, right, middle, segThick, segGap);
      
      //rightBottom
      ctx.globalAlpha = "01346789ABDGHJMNOQSUWYdmwy".includes(segCharValue) ? 1 : dim;
      drawVerticalLine(ctx, right, middle, right, bottom, segThick, segGap);
      
      //leftBottom
      ctx.globalAlpha = "0268ACEFGHJKLMNOPQRUVWabcehjlmnoprtuvw".includes(segCharValue) ? 1 : dim;
      drawVerticalLine(ctx, left, middle, left, bottom, segThick, segGap);
      
      //leftTop
      ctx.globalAlpha = "045689ACEFGHKLMNOPQRSUVWYbghlpqst".includes(segCharValue) ? 1 : dim;
      drawVerticalLine(ctx, left, top, left, middle, segThick, segGap);

      //centerTop
      ctx.globalAlpha = "BDITfgjkpqy".includes(segCharValue) ? 1 : dim;
      drawVerticalLine(ctx, center, top, center, middle, segThick, segGap);
      
      //centerBottom
      ctx.globalAlpha = "BDITabdfghijkmnoqsu".includes(segCharValue) ? 1 : dim;
      drawVerticalLine(ctx, center, middle, center, bottom, segThick, segGap);
      
    };

    let id = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(id);
  }, [
    winSize,
    segNumValue,
    segCharValue
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSegNumValue((segNumValue + 1) % 10);
      setSegCharValue(segCharValue === "Z" ? "a" : segCharValue === "z" ? "A" : String.fromCharCode(segCharValue?.charCodeAt(0) + 1))
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
