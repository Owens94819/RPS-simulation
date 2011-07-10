import { Obj } from "./Obj.js";
import { image } from "./image.js";
const img = await image("/scissor.svg")

export class Scissor extends Obj {
  constructor(ctx,...arg) {
    super({
      ctx,
      id: "s",
      color: "rgba(0,0,0,0)",
      x: random(ctx.width - 60),
      y: 0,
      objective: "p",
      backgroundImage: img
    },...arg);
  }
}