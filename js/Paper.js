import { Obj } from "./Obj.js";
import { image } from "./image.js";
const img = await image("/paper.svg")

export class Paper extends Obj{
  constructor(ctx, ...arg) {
    super({
      ctx,
      id: "p",
      color: "rgba(0,0,0,0)",
      x: (ctx.width) - 60,
      y: random(ctx.height),
      objective: "r",
      backgroundImage: img
    }, ...arg);
  }
}