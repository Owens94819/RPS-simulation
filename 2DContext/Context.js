/***
 * A framework around the 2d context of a canvas
 * @author {Owens94819}
 */

import { Rect } from "./Instance/Rect.js"
import { FakeWorker } from "./Scripts/FakeWorker.js"

export class Context extends EventTarget {
  #thread = new Worker("./2DContext/Threads/Context.js");
  #useThread;
  #AutoUpateContext=true;
  #context;
  #canvas;
  #width;
  #height;
  #id = 0;
  #idLists = {};
  #objects = [];
  #transferables = [];
  #objectsData = [];
  #sharedInstance = Symbol("sharedInstance")
  #onupdate = null
  #oncollision = null
  constructor(canvas, useThread, AutoUpateContext) {
    super();
    this.#useThread = useThread
    this.#AutoUpateContext = AutoUpateContext?true:false;
    this.#width = canvas.width
    this.#height = canvas.height

    const ctx = canvas.getContext("2d");
    !useThread && (this.#thread = new FakeWorker(ctx));
    const thread = this.#thread;
    console.log(thread);
    thread.onmessage = (ev) => { this.#message(ev.data || ev.detail) };

    ctx.save();
    this.#context = ctx
    this.#canvas = canvas;
  }

  createObject() {
    return new Rect(this.#sharedInstance)
  }

  removeObject(object) {
    if (!(object instanceof Rect)) {
      throw "unexpected instance"
    }
    const sharedInstance = object[this.#sharedInstance];
    if (!sharedInstance.isConnected) return;

    sharedInstance.isConnected = false;
    const objectsData = this.#objectsData;
    const objectData = sharedInstance.objectData
    const objectDataId = objectsData.indexOf(objectData)
    const id = this.#transferables.indexOf(objectData.imageBitmap)
    this.#objects.splice(id, 1)
    this.#transferables.splice(id, 1)
    this.#objectsData.splice(objectDataId, 1)

    const idList = sharedInstance.idLists[0];
    const idListIndex = idList.indexOf(object)
    idList.splice(idListIndex, 1)
    sharedInstance.idLists = void 0;

    sharedInstance.EventListeners.forEach(function (callback) {
      object.removeEventListener(callback.name, callback)
    })

    delete sharedInstance.AutoUpateContext;

    const { width, height } = this.#canvas;
    this.#thread.postMessage({ width, height, context: objectsData, objectDataId })
  }

  appendObject(object) {
    if (!(object instanceof Rect)) {
      throw "unexpected instance"
    }

    const sharedInstance = object[this.#sharedInstance];

    if (sharedInstance.isConnected) {
      throw "object is already in use"
    }

    const { x, y } = object;
    const canvas = new OffscreenCanvas(object.width, object.height),
      ctx = canvas.getContext("2d");
    //this.#updateObject(object,ctx);

    const imageBitmap = canvas.transferToImageBitmap();

    const thread = this.#thread;
    const objectsData = this.#objectsData;
    const objectData = { imageBitmap, x, y };

    const id =
      this.#transferables.push(imageBitmap) - 1

    if (this.#objectsData.length === id) {
      this.#objectsData.push(objectData);
    } else {
      this.#objectsData[id] = objectData;
    }

    this.#id = id

    const _object = { object: object, id };
    this.#objects.push(_object);

    object.index = id;

    const self = this;
    //this.#context.drawImage(imageBitmap, object.x, object.y)

    sharedInstance.isConnected = true
    sharedInstance.index = id
    sharedInstance.objectData = objectData
    sharedInstance.canvas = canvas



    let idList = this.#idLists[object.id]
    if (!idList) {
      idList = this.#idLists[object.id] = [object]
    } else {
      idList.push(object)
    }
    sharedInstance.idLists = [idList, this.#idLists]
    sharedInstance.AutoUpateContext = this.#AutoUpateContext
    // const { width, height } = this.#canvas;
    //thread.postMessage({width, height, context: objectsData, id}) 
      function update({ detail }) {
        self.#update_event(detail, { object, objectData, canvas })
      }
      sharedInstance.EventListeners.push(update)
      update({ detail: "-" + sharedInstance.props.join("-") + "-" })
      object.addEventListener(update.name, update);
  }

  updateContext(...props){
    props='-'+props.join('-')+'-'
    const canv = this.#canvas;
    const objectsData = this.#objectsData;
    const thread = this.#thread;

    thread.postMessage({ width: canv.width, height: canv.height, context: objectsData })
  }

  getObjectById(id) {
    if (!this.#idLists.hasOwnProperty(id)) return
    const list = this.#idLists[id]
    return list[0]
  }
  getAllObjectById(id) {
    if (!this.#idLists.hasOwnProperty(id)) return [];
    const list = this.#idLists[id]
    return list;
  }
  getLastObjectById(id) {
    if (!this.#idLists.hasOwnProperty(id)) retur
    const list = this.#idLists[id]
    return list[list.length]
  }
  forAllObjectById(id, callback) {
    if (!this.#idLists.hasOwnProperty(id)) return
    const list = this.#idLists[id]
    for (var i = 0; i < list.length; i++) {
      if (callback(list[i])) return list[i];
    }
  }
  // getAllObject() {
  //   const list = this.#idLists
  //   fo
  //   return list;
  // }

  #update_event(detail, { object, objectData, canvas }) {
    const thread = this.#thread;
    const objectsData = this.#objectsData;

    const id = this.#transferables.indexOf(objectData.imageBitmap)
    let objectDataId = objectsData.indexOf(objectData)

    const canv = this.#canvas;
    const { width, height, color, backgroundImage, x, y } = object

    //console.log(detail,object.id,object.index);
    if (detail.includes("-width-")) {
      canvas.width = width
    }
    if (detail.includes("-height-")) {
      canvas.height = height
    }

    const ctx = canvas.getContext("2d");
    if (true || detail.match(/\-color\-|\-backgroundImage\-|\-width\-|\-height\-/)) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height)
      const size = [width, height]
      object.backgroundImage && ctx.drawImage(backgroundImage, 0, 0, ...size);
    }

    if (detail.includes("-index-")) {
      const n = object.index;
      if (n !== objectDataId) {
        if (n === objectsData.length || n === objectsData.length - 1) {
          objectsData.push(objectsData.splice(objectDataId, 1)[0])//,...objectsData.splice(objectDataId,1));
          objectDataId = objectsData.length - 1
        } else if (n <= 0) {
          objectsData.unshift(objectsData.splice(objectDataId, 1)[0])//,...objectsData.splice(objectDataId,1));
          objectDataId = 0
        } else {
          if (n >= objectsData.length) {
            objectsData[n] = objectsData.splice(objectDataId, 1)[0]//,...objectsData.splice(objectDataId,1));
            objectDataId = n
            // object.index=objectsData.length-1;
            //return
          } else {
            objectsData.splice(n, 0, ...objectsData.splice(objectDataId, 1));
            objectDataId = n
          }
        }
      }
    }
    if (detail.includes("-x-")) {
      objectData.x = x
    }
    if (detail.includes("-y-")) {
      objectData.y = y
    }
    if (detail.match(/\-x\-|\-width\-/)) {
      if ((width + x) > canv.width || x < 0) {
        const event = new CustomEvent("offgrid", {
          detail: "x"
        })
        object.dispatchEvent(event)
      }
    }
    if (detail.match(/\-y\-|\-height\-/)) {
      if ((height + y) > canv.height || y < 0) {
        const event = new CustomEvent("offgrid", {
          detail: "y"
        })
        object.dispatchEvent(event)
      }
    }

    // this.#updateObject(object, ctx)

    
    const imageBitmap = canvas.transferToImageBitmap();

    this.#transferables[id] =
    objectData.imageBitmap = imageBitmap;
    
    objectsData[objectDataId] = objectData;

    if (this.#AutoUpateContext) {
    thread.postMessage({ width: canv.width, height: canv.height, context: objectsData, objectDataId })
  }
  //thread.postMessage({width,height,context:self.#objectsData}, self.#transferables)
    //this.#transferables[id]= (new Uint8Array()).buffer
  }

  #updateObject({ color, width, height, x, y }, ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height)
  }

  #message(data) {
    if (data instanceof ImageBitmap) {
      // if ( fromWorker ) {
      const context = this.#context
      const { width, height } = this.#canvas
      context.clearRect(0, 0, width, height)
      context.drawImage(data, 0, 0)
      data.close();
      super.dispatchEvent(new Event("update"));
      //  }
    } else if (data === null) {
      const dispatchEvent = () => super.dispatchEvent(new Event("update"));
      requestAnimationFrame(dispatchEvent)
    } else if ((typeof data) === "object") {
      const useThread = this.#useThread;
      let top, bottom;
      if (useThread) {
        top = this.#objectsData[data.top];
        bottom = this.#objectsData[data.bottom];
        if (!top || !bottom) return;
        top = top.imageBitmap;
        bottom = bottom.imageBitmap;
      } else {
        top = this.#objectsData[data.top].imageBitmap
        bottom = this.#objectsData[data.bottom].imageBitmap
      }

      top = this.#transferables.indexOf(top)
      bottom = this.#transferables.indexOf(bottom)


      top = this.#objects[top];
      bottom = this.#objects[bottom];

      super.dispatchEvent(new CustomEvent("collision", {
        detail: { bottom: bottom.object, top: top.object }
      }))

      top.object.dispatchEvent(new CustomEvent("collide", {
        detail: bottom.object
      }))
    }
  }

  set onupdate(foo) {
    console.warn("onupdate is an experimental feature");
    if (typeof foo !== "function") {
      if (typeof this.#onupdate === "function") {
        super.removeEventListener("update", this.#onupdate)
      }
      return this.#onupdate = null
    }
    super.addEventListener("update", foo)
    super.dispatchEvent(new Event('update'))
    return this.#onupdate = foo
  }
  set oncollision(foo) {
    if (typeof foo !== "function") {
      if (typeof this.#oncollision === "function") {
        super.removeEventListener("collision", this.#oncollision)
      }
      return this.#oncollision = null
    }
    super.addEventListener("collision", foo)
    return this.#oncollision = foo
  }

  get onupdate() {
    return this.#onupdate
  }
  get oncollision() {
    return this.#oncollision
  }
  get width() {
    return this.#width
  }
  get height() {
    return this.#height
  }
}