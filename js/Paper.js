import { Obj } from "./Obj.js";
import { image } from "./image.js";
const img = await image("./paper.svg")

export class Paper extends Obj{
  constructor(ctx, ...arg) {
    super({
      ctx,
      id: "p",
      color: "rgba(0,0,0,0)",
      x: random(ctx.width),
      y: random(ctx.height),
      width: 10,
      height: 10,
      objective: "r",
      backgroundImage: img
    }, ...arg);
  }
}