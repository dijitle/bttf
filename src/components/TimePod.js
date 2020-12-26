import {draw7SegmentDisplay, draw16SegmentDisplay} from "./SegmentDisplay"

export function drawTimePod(ctx, width, y, color, name, value) {

    let segThick = 15;
    let segGap = 4;
    let segWidth = 100;
    let segHeight = 200;
    let segSkew = -0.1;


    ctx.fillStyle = "#888888";
    ctx.fillRect(0, y, width, width / 3);

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(25, y + 5, width / 10, width / 30);

    ctx.fillRect(125, y + 5, width / 10, width / 30);

    ctx.fillStyle = "#ffffff";
    ctx.textAlign="center"; 
    ctx.textBaseline = "top";
    ctx.font = "Bold 75px Courier"
    ctx.fillText("MONTH", 225, 25)


    ctx.fillStyle = "#000000";
    let textWidth = ctx.measureText(name).width;
    ctx.fillRect(width / 2 - textWidth / 2 - 20, width / 3  - 85, textWidth + 40, 80);

    ctx.fillStyle = "#ffffff";
    ctx.fillText(name, width / 2, width / 3  - 85)

    ctx.transform(1, 0, segSkew, 1, 0, 0);
    
    ctx.fillStyle = color;
    
    draw7SegmentDisplay(ctx, 50, 200, segWidth, segHeight, segThick, segGap, value.getFullYear().toString()[0]);
    draw7SegmentDisplay(ctx, 175, 200, segWidth, segHeight, segThick, segGap, value.getFullYear().toString()[1]);
    draw7SegmentDisplay(ctx, 300, 200, segWidth, segHeight, segThick, segGap, value.getFullYear().toString()[2]);
    draw7SegmentDisplay(ctx, 425, 200, segWidth, segHeight, segThick, segGap, value.getFullYear().toString()[3]);
    
    draw16SegmentDisplay(ctx, 50, 520, segWidth, segHeight, segThick, segGap, "A")


    

    
}