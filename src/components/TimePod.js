import { draw7SegmentDisplay, draw16SegmentDisplay } from "./SegmentDisplay";

export function drawTimePod(ctx, width, y, color, name, value) {
  let months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  let output = "             ";

  if (typeof value == "string") {
    output = value;
  } else {
    output =
      months[value.getMonth()] +
      value.getDate().toString().padStart(2, "0") +
      value.getFullYear().toString() +
      value.getHours().toString().padStart(2, "0") +
      value.getMinutes().toString().padStart(2, "0");
  }

  let segThick = width * 0.01;
  let segGap = width * 0.001;
  let segWidth = width * 0.047;
  let segHeight = width * 0.085;
  let segSkew = -0.1;
  let segSeparation = width * 0.028;

  let height = width / 4.5;

  let labelFontSize = width * 0.023;
  let nameFontSize = width * 0.03;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "#000000";
  ctx.shadowBlur = 4;
  ctx.font = "Bold " + labelFontSize + "px Verdana";

  let timeLabelColor = "#C40000";

  //background
  ctx.fillStyle = "#888888";
  ctx.fillRect(0, y, width, height);

  //month label
  ctx.fillStyle = timeLabelColor;
  ctx.fillRect(
    segSeparation,
    y + segThick,
    (segWidth + segThick) * 3,
    labelFontSize + segThick
  );

  ctx.fillStyle = "#000000";
  ctx.fillRect(
    segSeparation - segThick / 2,
    y + height / 2 - (segHeight + segThick * 2) / 2,
    (segWidth + segThick) * 3 + segThick,
    segHeight + segThick * 2
  );

  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    "MONTH",
    segSeparation + ((segWidth + segThick) * 3) / 2,
    y + labelFontSize + segThick / 2
  );

  //day label
  ctx.fillStyle = timeLabelColor;
  ctx.fillRect(
    segSeparation * 2 + (segWidth + segThick) * 3,
    y + segThick,
    (segWidth + segThick) * 2,
    labelFontSize + segThick
  );

  ctx.fillStyle = "#000000";
  ctx.fillRect(
    segSeparation * 2 + (segWidth + segThick) * 3 - segThick / 2,
    y + height / 2 - (segHeight + segThick * 2) / 2,
    (segWidth + segThick) * 2 + segThick,
    segHeight + segThick * 2
  );

  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    "DAY",
    segSeparation * 2 + (segWidth + segThick) * 4,
    y + labelFontSize + segThick / 2
  );

  //year label
  ctx.fillStyle = timeLabelColor;
  ctx.fillRect(
    segSeparation * 3 + (segWidth + segThick) * 6,
    y + segThick,
    (segWidth + segThick) * 2,
    labelFontSize + segThick
  );

  ctx.fillStyle = "#000000";
  ctx.fillRect(
    segSeparation * 3 + (segWidth + segThick) * 5 - segThick / 2,
    y + height / 2 - (segHeight + segThick * 2) / 2,
    (segWidth + segThick) * 4 + segThick,
    segHeight + segThick * 2
  );

  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    "YEAR",
    segSeparation * 3 + (segWidth + segThick) * 7,
    y + labelFontSize + segThick / 2
  );

  //hour label
  ctx.fillStyle = timeLabelColor;
  ctx.fillRect(
    segSeparation * 4 + (segWidth + segThick) * 10,
    y + segThick,
    (segWidth + segThick) * 2,
    labelFontSize + segThick
  );

  ctx.fillStyle = "#000000";
  ctx.fillRect(
    segSeparation * 4 + (segWidth + segThick) * 10 - segThick / 2,
    y + height / 2 - (segHeight + segThick * 2) / 2,
    (segWidth + segThick) * 2 + segThick,
    segHeight + segThick * 2
  );

  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    "HOUR",
    segSeparation * 4 + (segWidth + segThick) * 11,
    y + labelFontSize + segThick / 2
  );

  //time :
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(
    segSeparation * 5 + (segWidth + segThick) * 12,
    y + height / 2 - segThick * 2,
    segThick,
    0,
    2 * Math.PI
  );
  ctx.arc(
    segSeparation * 5 + (segWidth + segThick) * 12,
    y + height / 2 + segThick * 2,
    segThick,
    0,
    2 * Math.PI
  );
  ctx.globalAlpha = new Date().getSeconds() % 2 === 0 ? 1 : 0.4;
  ctx.fill();
  ctx.globalAlpha = 1;

  //min label
  ctx.fillStyle = timeLabelColor;
  ctx.fillRect(
    segSeparation * 6 + (segWidth + segThick) * 12,
    y + segThick,
    (segWidth + segThick) * 2,
    labelFontSize + segThick
  );

  ctx.fillStyle = "#000000";
  ctx.fillRect(
    segSeparation * 6 + (segWidth + segThick) * 12 - segThick / 2,
    y + height / 2 - (segHeight + segThick * 2) / 2,
    (segWidth + segThick) * 2 + segThick,
    segHeight + segThick * 2
  );

  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    "MIN",
    segSeparation * 6 + (segWidth + segThick) * 13,
    y + labelFontSize + segThick / 2
  );

  //Title label
  ctx.fillStyle = "#000000";
  ctx.font = "Bold " + nameFontSize + "px Verdana";
  let textWidth = ctx.measureText(name).width;
  ctx.fillRect(
    width / 2 - textWidth / 2 - segThick * 2,
    y + height - nameFontSize - (segThick * 3) / 2,
    textWidth + segThick * 4,
    nameFontSize + segThick
  );

  ctx.fillStyle = "#ffffff";
  ctx.fillText(name, width / 2, y + height - nameFontSize + (segThick * 2) / 3);

  ctx.transform(1, 0, segSkew, 1, 0.1 * y + segThick * 2, 0);

  ctx.fillStyle = color;

  draw16SegmentDisplay(
    ctx,
    segSeparation,
    y + height / 2 - segHeight / 2,
    segWidth,
    segHeight,
    segThick,
    segGap,
    output[0]
  );
  draw16SegmentDisplay(
    ctx,
    segSeparation + segWidth + segThick,
    y + height / 2 - segHeight / 2,
    segWidth,
    segHeight,
    segThick,
    segGap,
    output[1]
  );
  draw16SegmentDisplay(
    ctx,
    segSeparation + (segWidth + segThick) * 2,
    y + height / 2 - segHeight / 2,
    segWidth,
    segHeight,
    segThick,
    segGap,
    output[2]
  );

  draw7SegmentDisplay(
    ctx,
    segSeparation * 2 + (segWidth + segThick) * 3,
    y + height / 2 - segHeight / 2,
    segWidth,
    segHeight,
    segThick,
    segGap,
    output[3]
  );
  draw7SegmentDisplay(
    ctx,
    segSeparation * 2 + (segWidth + segThick) * 4,
    y + height / 2 - segHeight / 2,
    segWidth,
    segHeight,
    segThick,
    segGap,
    output[4]
  );

  draw7SegmentDisplay(
    ctx,
    segSeparation * 3 + (segWidth + segThick) * 5,
    y + height / 2 - segHeight / 2,
    segWidth,
    segHeight,
    segThick,
    segGap,
    output[5]
  );
  draw7SegmentDisplay(
    ctx,
    segSeparation * 3 + (segWidth + segThick) * 6,
    y + height / 2 - segHeight / 2,
    segWidth,
    segHeight,
    segThick,
    segGap,
    output[6]
  );
  draw7SegmentDisplay(
    ctx,
    segSeparation * 3 + (segWidth + segThick) * 7,
    y + height / 2 - segHeight / 2,
    segWidth,
    segHeight,
    segThick,
    segGap,
    output[7]
  );
  draw7SegmentDisplay(
    ctx,
    segSeparation * 3 + (segWidth + segThick) * 8,
    y + height / 2 - segHeight / 2,
    segWidth,
    segHeight,
    segThick,
    segGap,
    output[8]
  );

  draw7SegmentDisplay(
    ctx,
    segSeparation * 4 + (segWidth + segThick) * 10,
    y + height / 2 - segHeight / 2,
    segWidth,
    segHeight,
    segThick,
    segGap,
    output[9]
  );
  draw7SegmentDisplay(
    ctx,
    segSeparation * 4 + (segWidth + segThick) * 11,
    y + height / 2 - segHeight / 2,
    segWidth,
    segHeight,
    segThick,
    segGap,
    output[10]
  );

  draw7SegmentDisplay(
    ctx,
    segSeparation * 6 + (segWidth + segThick) * 12,
    y + height / 2 - segHeight / 2,
    segWidth,
    segHeight,
    segThick,
    segGap,
    output[11]
  );
  draw7SegmentDisplay(
    ctx,
    segSeparation * 6 + (segWidth + segThick) * 13,
    y + height / 2 - segHeight / 2,
    segWidth,
    segHeight,
    segThick,
    segGap,
    output[12]
  );

  ctx.resetTransform();
}
