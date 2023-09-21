import { Obj } from "./Obj.js";
import { image } from "./image.js";
const img = await image("./rock.svg")
export class Rock extends Obj{
  constructor(ctx, ...arg) {
    super({
      ctx,
      id: "r",
      color: "rgba(200,0,0,0)",
      x: random(ctx.width - 160),
      y: ctx.height - 160,
      objective: "s",
      backgroundImage: img
    }, ...arg);
  }
}