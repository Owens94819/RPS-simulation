import { Context } from "./../2DContext/Context.js";
import { Rock } from "./Rock.js";
import { Paper } from "./Paper.js";
import { Scissor } from "./Scissor.js";

const MAX = 2;

window.random = function (t) {
  return Math.random() * (t - 20)
}

const ctx = new Context(canvas, true, false);

ctx.oncollision = function ({ detail: { top, bottom } }) {
  const type = top.id + bottom.id;
  switch (type) {
    case 'rs':
      top.collide(bottom)
      break;
    case 'sr':
      bottom.collide(top)
      break;
    case 'sp':
      top.collide(bottom)
      break;
    case 'ps':
      bottom.collide(top)
      break;
    case 'pr':
      top.collide(bottom)
      break;
    case 'rp':
      bottom.collide(top)
      break;
  }
}

var arr=[]
var str = '';
for (var i = 0; i < MAX; i++) {
  const rock = new Rock(ctx);
  const scissor = new Scissor(ctx);
  const paper = new Paper(ctx)

  
  ctx.appendObject(paper.object);
  ctx.appendObject(rock.object);
  ctx.appendObject(scissor.object);
  arr.push({rock,paper,scissor})
  str+=`
  arr[${i}].rock.object.isConnected && arr[${i}].rock.direct()
  arr[${i}].paper.object.isConnected && arr[${i}].paper.direct()
  arr[${i}].scissor.object.isConnected && arr[${i}].scissor.direct()
  `
}
let anim;
str=`
anim=function() {
  ${str}
   ctx.updateContext('x','y','backgroundImage');
  }
  `;
  
  eval(str);
  ctx.onupdate=anim
