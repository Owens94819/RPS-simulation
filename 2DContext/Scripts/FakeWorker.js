import { Render } from "./Render/FakeWorker.js"

export class FakeWorker extends EventTarget{
  #onmessage=null;
  #ctx;
  constructor(ctx){
    super();
    this.#ctx = ctx
  }
  postMessage(data){
    const dispatchEvent =event=>super.dispatchEvent(event);
    const {width, height} = this.#ctx.canvas
    this.#ctx.clearRect(0,0, width, height)
    Render(data,function(data) {
      // return
      const event = new CustomEvent("message",{
         detail: data
        }) 
      dispatchEvent(event)
      // queueMicrotask(() => dispatchEvent(event))
    }, this.#ctx)   
  }
  get onmessage(){
    return this.#onmessage;
  }
  set onmessage(foo){
    if (typeof foo !== "function") {
      if (typeof this.#onmessage === "function") {
        super.removeEventListener("message",this.#onmessage)
      }
       return this.#onmessage=null
    }
    super.addEventListener("message", foo)
    return this.#onmessage=foo
  }
}