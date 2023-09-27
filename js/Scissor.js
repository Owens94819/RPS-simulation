import { Obj } from "./Obj.js";
import { image } from "./image.js";
const img = await image("./scissor.svg")

export class Scissor extends Obj {
  constructor(ctx,...arg) {
    super({
      ctx,
      id: "s",
      color: "rgba(0,0,0,0)",
      x: random(ctx.width),
      y: random(ctx.height),
      width: 10,
      height: 10,
      objective: "p",
      backgroundImage: img
    },...arg);
  }
}