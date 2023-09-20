importScripts("./../Scripts/Render/Worker.js")

self.onmessage=({data})=>{
//postMessage(true)
 const canvas =new OffscreenCanvas(data.width, data.height) 
 const ctx = canvas.getContext("2d");
  Render(data, postMessage, ctx, true)
  };