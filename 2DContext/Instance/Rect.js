const { CTXObject } = await import("./CTXObject.js")

export class Rect extends CTXObject {
  #props = ["x", "y", "index", "color", "width", "height"];
  #sharedInstance;
  #emit;
  #id="";
  #color = "#000000";
  #backgroundImage = null;
  #width = 20;
  #height = 20;
  #index = 0;
  #x = 0;
  #y = 0;
  constructor(sharedInstance) {
    const exd = (super(sharedInstance))[sharedInstance]
    exd.props = this.#props;
    this.#emit = exd.emit;
    this.#sharedInstance = exd;
    // this.#id=sharedInstance
  }
  cloneObject(nest) {
    const object = new Rect(this.#sharedInstance);
    for (let i = 0; i < this.#props.length; i++) {
      const prop = this.#props[i]
      object[prop] = this[prop]
    }
    if (nest) {
      for (let prop in this) {
        if (!(prop in object)) {
          object[prop] = this[prop]
        }
      }
    }
    return object
  }
  set id(v) {
    v = String(v)
    if (v === this.#id) return;
    const idList = this.#sharedInstance.idLists;
    if (idList) {
      // delete previous object
      idList[0].splice(idList[0].indexOf(this), 1)
      const lists = idList[1];
      if (lists.hasOwnProperty(v)) {
        lists[v].push(this);
      } else {
        lists[v] = [this]
      }
      if (lists[this.#id].length === 0) {
        delete lists[this.#id];
      }
    }
    this.#id = v
  }
  set color(v) {
    this.#color = String(v)
    this.#emit("color");
  }
  set backgroundImage(v) {
    if (!(v instanceof Image)) {
      console.warn("image error");
      return
    }
    this.#backgroundImage = v
    this.#emit("backgroundImage");
  }
  set width(v) {
    this.#width = parseInt(v) || 0
    this.#emit("width");
  }
  set height(v) {
    this.#height = parseInt(v) || 0
    this.#emit("height");
  }
  set index(v) {
    v = parseInt(v) || 0
    this.#index = v < 0 ? 0 : v;
    this.#emit("index");
  }
  set x(v) {
    this.#x = parseInt(v) || 0
    this.#emit("x");
  }
  set y(v) {
    this.#y = parseInt(v) || 0
    this.#emit("y");
  }

  get id() {
    return this.#id
  }
  get color() {
    return this.#color
  } 
  get backgroundImage() {
    return this.#backgroundImage
  }
  get width() {
    return this.#width
  }
  get height() {
    return this.#height
  }
  get index() {
    return this.#index
  }
  get x() {
    return this.#x
  }
  get y() {
    return this.#y
  }
}
