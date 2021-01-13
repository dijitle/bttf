export function drawVerticalLine(ctx, x1, y1, x2, y2, thick, gap) {
  ctx.beginPath();
  ctx.moveTo(x1, y1 + gap);
  ctx.lineTo(x1 + thick / 2, y1 + thick / 2 + gap);
  ctx.lineTo(x2 + thick / 2, y2 - thick / 2 - gap);
  ctx.lineTo(x2, y2 - gap);
  ctx.lineTo(x2 - thick / 2, y2 - thick / 2 - gap);
  ctx.lineTo(x1 - thick / 2, y1 + thick / 2 + gap);
  ctx.closePath();
  ctx.fill();
}

export function drawHorizontalLine(ctx, x1, y1, x2, y2, thick, gap) {
  ctx.beginPath();
  ctx.moveTo(x1 + gap, y1);
  ctx.lineTo(x1 + thick / 2 + gap, y1 - thick / 2);
  ctx.lineTo(x2 - thick / 2 - gap, y2 - thick / 2);
  ctx.lineTo(x2 - gap, y2);
  ctx.lineTo(x2 - thick / 2 - gap, y2 + thick / 2);
  ctx.lineTo(x1 + thick / 2 + gap, y1 + thick / 2);
  ctx.closePath();
  ctx.fill();
}

export function drawDiagonalDownLine(ctx, x1, y1, x2, y2, thick, gap) {
  ctx.beginPath();
  ctx.moveTo(x1 + gap, y1 + gap);
  ctx.lineTo(x1 + thick / Math.sqrt(2) + gap, y1 + gap);
  ctx.lineTo(x2 - gap, y2 - thick / Math.sqrt(2) - gap);
  ctx.lineTo(x2 - gap, y2 - gap);
  ctx.lineTo(x2 - thick / Math.sqrt(2) - gap, y2 - gap);
  ctx.lineTo(x1 + gap, y1 + thick / Math.sqrt(2) + gap);
  ctx.closePath();
  ctx.fill();
}

export function drawDiagonalUpLine(ctx, x1, y1, x2, y2, thick, gap) {
  ctx.beginPath();
  ctx.moveTo(x1 + gap, y1 - gap);
  ctx.lineTo(x1 + gap, y1 - thick / Math.sqrt(2) - gap);
  ctx.lineTo(x2 - thick / Math.sqrt(2) - gap, y2 + gap);
  ctx.lineTo(x2 - gap, y2 + gap);
  ctx.lineTo(x2 - gap, y2 + thick / Math.sqrt(2) + gap);
  ctx.lineTo(x1 + thick / Math.sqrt(2) + gap, y1 - gap);
  ctx.closePath();
  ctx.fill();
}

export function draw7SegmentDisplay(ctx, x, y, w, h, t, g, value) {
  let top = y + t / 2;
  let left = x + t / 2;
  let right = x + w - t / 2;
  let middle = y + h / 2;
  let bottom = y + h - t / 2;
  let dim = 0.08;

  //top
  ctx.globalAlpha = "02356789".includes(value) ? 1 : dim;
  drawHorizontalLine(ctx, left, top, right, top, t, g);

  //middle
  ctx.globalAlpha = "2345689".includes(value) ? 1 : dim;
  drawHorizontalLine(ctx, left, middle, right, middle, t, g);

  //bottom
  ctx.globalAlpha = "023568".includes(value) ? 1 : dim;
  drawHorizontalLine(ctx, left, bottom, right, bottom, t, g);

  //rightTop
  ctx.globalAlpha = "01234789".includes(value) ? 1 : dim;
  drawVerticalLine(ctx, right, top, right, middle, t, g);

  //rightBottom
  ctx.globalAlpha = "013456789".includes(value) ? 1 : dim;
  drawVerticalLine(ctx, right, middle, right, bottom, t, g);

  //leftBottom
  ctx.globalAlpha = "0268".includes(value) ? 1 : dim;
  drawVerticalLine(ctx, left, middle, left, bottom, t, g);

  //leftTop
  ctx.globalAlpha = "045689".includes(value) ? 1 : dim;
  drawVerticalLine(ctx, left, top, left, middle, t, g);

  ctx.globalAlpha = 1;
}

export function draw16SegmentDisplay(ctx, x, y, w, h, t, g, value) {
  let top = y + t / 2;
  let left = x + t / 2;
  let right = x + w - t / 2;
  let center = x + w / 2;
  let middle = y + h / 2;
  let bottom = y + h - t / 2;
  let dim = 0.08;

  //northwest
  ctx.globalAlpha = "MNXx".includes(value) ? 1 : dim;
  drawDiagonalDownLine(ctx, left, top, center, middle, t, g);

  //northeast
  ctx.globalAlpha = "01KMVXZkx".includes(value) ? 1 : dim;
  drawDiagonalUpLine(ctx, center, middle, right, top, t, g);

  //southeast
  ctx.globalAlpha = "5KNQRWXkwx".includes(value) ? 1 : dim;
  drawDiagonalDownLine(ctx, center, middle, right, bottom, t, g);

  //southwest
  ctx.globalAlpha = "0VWXZevwxz".includes(value) ? 1 : dim;
  drawDiagonalUpLine(ctx, left, bottom, center, middle, t, g);

  ctx.globalAlpha = dim;

  //top left
  ctx.globalAlpha = "02356789ABCDEFGIOPQRSTZgpqs".includes(value) ? 1 : dim;
  drawHorizontalLine(ctx, left, top, center, top, t, g);

  //top right
  ctx.globalAlpha = "02356789ABCDEFGIOPQRSTZf".includes(value) ? 1 : dim;
  drawHorizontalLine(ctx, center, top, right, top, t, g);

  //middle left
  ctx.globalAlpha = "245689AEFHKPRSYabcefghmnopqrstz".includes(value) ? 1 : dim;
  drawHorizontalLine(ctx, left, middle, center, middle, t, g);

  //middle right
  ctx.globalAlpha = "234689ABGHPRSYdfmy".includes(value) ? 1 : dim;
  drawHorizontalLine(ctx, center, middle, right, middle, t, g);

  //bottom left
  ctx.globalAlpha = "035689BCDEGIJLOQSUYZabcegjostuz".includes(value) ? 1 : dim;
  drawHorizontalLine(ctx, left, bottom, center, bottom, t, g);

  //bottom right
  ctx.globalAlpha = "0235689BCDEGIJLOQSUYZady".includes(value) ? 1 : dim;
  drawHorizontalLine(ctx, center, bottom, right, bottom, t, g);

  //rightTop
  ctx.globalAlpha = "01234789ABDHJMNOPQRUWYdy".includes(value) ? 1 : dim;
  drawVerticalLine(ctx, right, top, right, middle, t, g);

  //rightBottom
  ctx.globalAlpha = "01346789ABDGHJMNOQSUWYdmwy".includes(value) ? 1 : dim;
  drawVerticalLine(ctx, right, middle, right, bottom, t, g);

  //leftBottom
  ctx.globalAlpha = "0268ACEFGHJKLMNOPQRUVWabcehjlmnoprtuvw".includes(value)
    ? 1
    : dim;
  drawVerticalLine(ctx, left, middle, left, bottom, t, g);

  //leftTop
  ctx.globalAlpha = "045689ACEFGHKLMNOPQRSUVWYbghlpqst".includes(value)
    ? 1
    : dim;
  drawVerticalLine(ctx, left, top, left, middle, t, g);

  //centerTop
  ctx.globalAlpha = "BDITfgjkpqy".includes(value) ? 1 : dim;
  drawVerticalLine(ctx, center, top, center, middle, t, g);

  //centerBottom
  ctx.globalAlpha = "BDITabdfghijkmnoqsu".includes(value) ? 1 : dim;
  drawVerticalLine(ctx, center, middle, center, bottom, t, g);

  ctx.globalAlpha = 1;
}
