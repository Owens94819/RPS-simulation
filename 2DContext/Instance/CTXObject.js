export class CTXObject extends EventTarget{
  #list;
  #private_obj
  #key;
  #isConnected;
  #emit_index="-";
  #oncollide=null;
  #onoffgrid=null;
  constructor(sharedInstance){
    if(typeof sharedInstance !== "symbol") throw "unexpected instance";
    super();
    const dispatchEvent=e=>super.dispatchEvent(e)
    this.#list=[];
    this.#private_obj={
      isConnected:false,
      index:null,
      EventListeners:[],
      emit: function(e){
        // if (!this.#private_obj.AutoUpateContext) return;

        this.#emit_index+=e+"-";
        const self=this;
        const index =this.#emit_index.length; 
        queueMicrotask(function() {
          if (index===self.#emit_index.length) {
           const event= new CustomEvent("update",{
             detail:self.#emit_index
            }) 
           self.#emit_index="-";
           dispatchEvent(event)
          }
        })
       }
    };
    this[sharedInstance]=this.#private_obj
  }
  
  set oncollide(foo){
    if (typeof foo !== "function") {
      if (typeof this.#oncollide === "function") {
        super.removeEventListener("collide",this.#oncollide)
      }
       return this.#oncollide=null
    }
    super.addEventListener("collide", foo)
    return this.#oncollide=foo
  }
  set onoffgrid(foo){
    if (typeof foo !== "function") {
      if (typeof this.#onoffgrid === "function") {
        super.removeEventListener("offgrid",this.#onoffgrid)
      }
       return this.#onoffgrid=null
    }
    super.addEventListener("offgrid", foo)
    return this.#onoffgrid=foo
  }
  
  get isConnected(){
    return this.#private_obj.isConnected;
  }
  get oncollide(){
    return this.#oncollide
  }
  get onoffgrid(){
    return this.#onoffgrid
  }
}