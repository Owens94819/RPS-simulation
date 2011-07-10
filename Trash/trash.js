var u = new Uint8Array(50).map((v,i)=>i)
  var u1 = new Uint8Array(50).map((v,i)=>i)
 // u=[]
 
 thread.postMessage({u,u1})//,[u.buffer,u1.buffer])//,[u.buffer])
  
thread.onmessage=({data})=>{
  console.log(data);
}


self.onmessage=function({data}) {
data.u[0]=5
  postMessage(data,[data.u.buffer])
  postMessage(data.u.length)
}



var u = new Uint8Array(50)//2000*2000*100)//.map((v,i)=>i)
  var u1 = new Uint8Array(2_000_000_000)//.map((v,i)=>i)
 // u=[]
 
 setTimeout(function() {
   thread.postMessage({u,u1},[u.buffer,u1.buffer])//,[u.buffer])
  var n=performance.now();
thread.onmessage=({data})=>{
  console.log(performance.now()-n, data.u2);
}
 }, 3000);
 
 
 self.onmessage=function({data}) {
  //data.u.map((v,i)=> 20)
  for (let i = 0; i < data.u.length; i++) {
    data.u[i]=i+7
  }
  data.u2=data.u[0]
  postMessage(data,[data.u.buffer,data.u1.buffer])
}


var a=[0,1]
var i=0;
var n_i=1
var r=i>=n_i?0:1;
//1
a.splice(n_i,0,...a.splice(i,1))
console.log(a+"");

//console.log(obj);

var b={};
var a=[1,2,4,6]
a.push(b)
b.c=6
a[4]=b
 a.splice(0,0) 
 a.splice(4,1)
 //console.log(a)
//console.log(a.indexOf(b));



import {Context} from "./Context.js";

;(function() {

const ctx=new Context(canvas);

window.obj =ctx.createObject()
obj.color="red";
obj.id="a"
const obj1 =ctx.createObject()
obj1.x=20
obj1.color="blue";
obj1.id="b"
const obj3 =ctx.createObject()
obj3.x=40
obj3.color="green";
obj3.id="c"

ctx.appendObject(obj);
ctx.appendObject(obj1)
ctx.appendObject(obj3);

const obj4 = obj.cloneObject(true);
console.log(obj4);


obj.onoffgrid=function ({detail}) {
 obj[detail] = 0
}

function anim(argument) {
obj.x+=4
obj.y+=1
requestAnimationFrame(anim)
}
requestAnimationFrame(anim)
})();