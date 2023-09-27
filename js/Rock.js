import { Obj } from "./Obj.js";
import { image } from "./image.js";
const img = await image("./rock.svg")
export class Rock extends Obj{
  constructor(ctx, ...arg) {
    super({
      ctx,
      id: "r",
      color: "rgba(200,0,0,0)",
      x: random(ctx.width),
      y: random(ctx.height),
      width: 10,
      height: 10,
      objective: "s",
      backgroundImage: img
    }, ...arg);
  }
}