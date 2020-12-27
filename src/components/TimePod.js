import {draw7SegmentDisplay, draw16SegmentDisplay} from "./SegmentDisplay"

export function drawTimePod(ctx, width, y, color, name, value) {

    let segThick = width * .01;
    let segGap = width * .001;
    let segWidth = width * .047;
    let segHeight = width * .085;
    let segSkew = -0.1;
    let segSeparation = width * .025

    let height = width / 4.5

    let labelFontSize = width * 0.023;
    let nameFontSize = width * 0.042;

    ctx.textAlign="center"; 
    ctx.textBaseline = "top";
    ctx.font = "Bold " +  labelFontSize + "px Verdana"

    //background
    ctx.fillStyle = "#888888";
    ctx.fillRect(0, y, width, height);

    //month label
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(segSeparation, y + 5, (segWidth + segThick) * 3, labelFontSize + 10);

    ctx.fillStyle = "#000000";
    ctx.fillRect(segSeparation - segThick / 2, y + labelFontSize + 25 + segThick, (segWidth + segThick)  * 3 + segThick, segHeight + segThick * 2);

    ctx.fillStyle = "#ffffff";
    ctx.fillText("MONTH", segSeparation + (segWidth + segThick)  * 3 / 2, y + 15)

    //day label
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(segSeparation * 2 + (segWidth + segThick) * 3, y + 5, (segWidth + segThick)  * 2, labelFontSize + 10);

    ctx.fillStyle = "#000000";
    ctx.fillRect(segSeparation * 2 + (segWidth + segThick) * 3 - segThick / 2, y + labelFontSize + 25 + segThick, (segWidth + segThick)  * 2 + segThick, segHeight + segThick * 2);

    ctx.fillStyle = "#ffffff";
    ctx.fillText("DAY", segSeparation * 2 + (segWidth + segThick)  * 4, y + 15)

    //year label
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(segSeparation * 3 + (segWidth + segThick)  * 6, y + 5, (segWidth + segThick)  * 2, labelFontSize + 10);

    ctx.fillStyle = "#000000";
    ctx.fillRect(segSeparation * 3 + (segWidth + segThick) * 5 - segThick / 2, y + labelFontSize + 25 + segThick, (segWidth + segThick)  * 4 + segThick, segHeight + segThick * 2);

    ctx.fillStyle = "#ffffff";
    ctx.fillText("YEAR", segSeparation * 3 + (segWidth + segThick) * 7, y + 15)

    //hour label
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(segSeparation * 4 + (segWidth + segThick)  * 10, y + 5, (segWidth + segThick)  * 2, labelFontSize + 10);

    ctx.fillStyle = "#000000";
    ctx.fillRect(segSeparation * 4 + (segWidth + segThick) * 10 - segThick / 2, y + labelFontSize + 25 + segThick, (segWidth + segThick) * 2 + segThick, segHeight + segThick * 2);

    ctx.fillStyle = "#ffffff";
    ctx.fillText("HOUR", segSeparation * 4 + (segWidth + segThick)  * 11, y + 15)

    //time :
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(segSeparation * 5 + (segWidth + segThick)  * 12, y + labelFontSize + 25 + segThick + segHeight / 2, segThick, 0, 2 * Math.PI);
    ctx.arc(segSeparation * 5 + (segWidth + segThick)  * 12, y + labelFontSize + 25 + segThick + segHeight / 2 + segSeparation, segThick, 0, 2 * Math.PI);
    ctx.fill();

    //min label
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(segSeparation * 6 + (segWidth + segThick)  * 12, y + 5, (segWidth + segThick)  * 2, labelFontSize + 10);

    ctx.fillStyle = "#000000";
    ctx.fillRect(segSeparation * 6 + (segWidth + segThick) * 12 - segThick / 2, y + labelFontSize + 25 + segThick, (segWidth + segThick) * 2 + segThick, segHeight + segThick * 2);

    ctx.fillStyle = "#ffffff";
    ctx.fillText("MIN", segSeparation * 6 + (segWidth + segThick)  * 13, y + 15)

    //Time label
    ctx.fillStyle = "#000000";
    ctx.font = "Bold " +  nameFontSize + "px Verdana"
    let textWidth = ctx.measureText(name).width;
    ctx.fillRect(width / 2 - textWidth / 2 - 20, y + height - nameFontSize - 10, textWidth + 40, nameFontSize + 5);

    ctx.fillStyle = "#ffffff";
    ctx.fillText(name, width / 2, y + height  - nameFontSize - 5)

    ctx.fillStyle = color;
    draw16SegmentDisplay(ctx, segSeparation, y + labelFontSize + 25 + segThick * 2, segWidth, segHeight, segThick, segGap, "O")
    draw16SegmentDisplay(ctx, segSeparation + segWidth + segThick, y + labelFontSize + 25 + segThick * 2, segWidth, segHeight, segThick, segGap, "C")
    draw16SegmentDisplay(ctx, segSeparation + (segWidth + segThick) * 2, y + labelFontSize + 25 + segThick * 2, segWidth, segHeight, segThick, segGap, "T")

    draw7SegmentDisplay(ctx, segSeparation * 2 + (segWidth + segThick)  * 3, y + labelFontSize + 25 + segThick * 2, segWidth, segHeight, segThick, segGap, value.getDate().toString().padStart(2, "0")[0]);
    draw7SegmentDisplay(ctx, segSeparation * 2 + (segWidth + segThick)  * 4, y + labelFontSize + 25 + segThick * 2, segWidth, segHeight, segThick, segGap, value.getDate().toString().padStart(2, "0")[1]);
    
    
    draw7SegmentDisplay(ctx, segSeparation * 3 + (segWidth + segThick)  * 5, y + labelFontSize + 25 + segThick * 2, segWidth, segHeight, segThick, segGap, value.getFullYear().toString()[0]);
    draw7SegmentDisplay(ctx, segSeparation * 3 + (segWidth + segThick)  * 6, y + labelFontSize + 25 + segThick * 2, segWidth, segHeight, segThick, segGap, value.getFullYear().toString()[1]);
    draw7SegmentDisplay(ctx, segSeparation * 3 + (segWidth + segThick)  * 7, y + labelFontSize + 25 + segThick * 2, segWidth, segHeight, segThick, segGap, value.getFullYear().toString()[2]);
    draw7SegmentDisplay(ctx, segSeparation * 3 + (segWidth + segThick)  * 8, y + labelFontSize + 25 + segThick * 2, segWidth, segHeight, segThick, segGap, value.getFullYear().toString()[3]);
    

    draw7SegmentDisplay(ctx, segSeparation * 4 + (segWidth + segThick) * 10, y + labelFontSize + 25 + segThick * 2, segWidth, segHeight, segThick, segGap, value.getHours().toString().padStart(2, "0")[0]);
    draw7SegmentDisplay(ctx, segSeparation * 4 + (segWidth + segThick) * 11, y + labelFontSize + 25 + segThick * 2, segWidth, segHeight, segThick, segGap, value.getHours().toString().padStart(2, "0")[1]);
    
    draw7SegmentDisplay(ctx, segSeparation * 6 + (segWidth + segThick) * 12, y + labelFontSize + 25 + segThick * 2, segWidth, segHeight, segThick, segGap, value.getMinutes().toString().padStart(2, "0")[0]);
    draw7SegmentDisplay(ctx, segSeparation * 6 + (segWidth + segThick) * 13, y + labelFontSize + 25 + segThick * 2, segWidth, segHeight, segThick, segGap, value.getMinutes().toString().padStart(2, "0")[1]);
}