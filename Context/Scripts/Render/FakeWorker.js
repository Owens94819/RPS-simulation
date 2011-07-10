export function Render({ width, height, context, objectDataId }, postMessage, ctx, fromWorker) {
  const cord = [];
  for (let i = 0; i < context.length; i++) {
    if (!context[i]) continue;
    const _context = context[i]
    const { imageBitmap, x, y } = _context;
    const { width, height } = imageBitmap;
    let id;
    for (let h = 0; h < height; h++) {
      if (id >= 0) break;
      for (let w = 0; w < width; w++) {
        const _cord = (y + h) + "-" + (w + x);
        //  if(objectDataId===i){
        id = cord.lastIndexOf(_cord)
        cord.push(_cord)
        if (id >= 0) {
          for (let _i = id; _i < cord.length; _i++) {
            if ((typeof cord[_i]) === "number") {
              if (cord[_i + 1] !== context[cord[_i]]) break;
              postMessage({ bottom: cord[_i], top: i })
              break;
            }
          }
          break;
        }
        //  }
      }
    }

    if (_context === context[i]) {
      cord.push(i)
      cord.push(_context)
      ctx.drawImage(imageBitmap, x, y);
    }
  }


    postMessage(null)
}