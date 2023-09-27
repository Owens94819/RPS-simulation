export function Render({ width, height, context, objectDataId }, postMessage, ctx, fromWorker) {
  for (let i = 0; i < context.length; i++) {
    const _context = context[i]
    if (!_context) continue;
    const { imageBitmap, x, y ,width, height} = _context;
    let x_max = width + x
    let y_max = height + y

    for (let i1 = i-1; i1 >= 0; i1--) {
      let {width:Bwidth, height:Bheight, x:Bx, y:By} = context[i1];
      let Bx_max = Bwidth + Bx
      let By_max = Bheight + By
      if ((Bx_max > x && Bx < x_max) && (By_max > y && By < y_max)) postMessage({ bottom: i1, top: i });
    }

    if (_context === context[i]) ctx.drawImage(imageBitmap, x, y);
  }

    postMessage(null)
}