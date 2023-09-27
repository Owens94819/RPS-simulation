import { Context } from "./../2DContext/Context.js";
import { Rock } from "./Rock.js";
import { Paper } from "./Paper.js";
import { Scissor } from "./Scissor.js";

const MAX = 20;

window.random = function (t) {
  t = Math.random() * (t)
  return t
}

const ctx = new Context(canvas, false, false);

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

var arr = [];
var str = '';
for (var i = 0; i < MAX; i++) {
  const rock = new Rock(ctx);
  const scissor = new Scissor(ctx);
  const paper = new Paper(ctx)


  // paper.object.x = 0


  // rock.object.x = 0
  // rock.object.y = 0
  // // rock.object.width = 0
  // // rock.object.height = 0


  // scissor.object.x = 0
  // scissor.object.y = 0

  ctx.appendObject(paper.object);
  ctx.appendObject(rock.object);
  ctx.appendObject(scissor.object);
  arr.push({ rock, paper, scissor })


  str += `
  arr[${i}].rock.object.isConnected && arr[${i}].rock.direct()
  arr[${i}].paper.object.isConnected && arr[${i}].paper.direct()
  arr[${i}].scissor.object.isConnected && arr[${i}].scissor.direct()
  `
}
let anim;
str = `
anim=function() {
  ${str}
    ctx.updateContext('x','y','backgroundImage');
requestAnimationFrame(anim)

  }
  `;

eval(str);
// anim()
// ctx.onupdate=anim
requestAnimationFrame(anim)

// d=[44,4,4];
//  Array.prototype.s


// var s = 9000
// var s = 9000000
// var l=[]
// var arr = Array(s).fill({
//   x: 90000, y: 900000, blob: new Blob([Array(900000).fill(32)])
// });
// var t=0;
// var n = performance.now()
// arr.find(({ x, y, blob }) => {
//   let d = 900;
//   d = (d + x / y) === 90
//   let c = x * y * blob.size
//   d += c / 90
//   let b = d === 800
//   t += d + c
//   l.push([t,d,c])
//   if (b) {
//     return 90
//   }
// })
// console.log(performance.now() - n, t);

// var l = []
// var t=1;
// var n = performance.now()
// for (var i = 0; i < arr.length; i++) {
//   let { x, y, blob } = arr[i]
//   let d = 900;
//   d = (d + x / y) === 90
//   let c = x * y * blob.size
//   d += c / 90
//   let b = d === 800
//   t+=d+c
//   l.push([t, d, c])
//   if (b) {
//     //break;
//   }
// }
// console.log(performance.now() - n,t,l);

