function Render({ width, height, context, objectDataId }, postMessage, ctx, fromWorker) {
  const cord = [];
  for (let i = 0; i < context.length; i++) {
    if (!context[i]) continue;
    const { imageBitmap, x, y } = context[i];
    const { width, height } = imageBitmap;
    let id;
    for (let h = 0; h < height; h++) {
      if (id >= 0) break;
      for (let w = 0; w < width; w++) {
        const _cord = (y + h) + "-" + (w + x);
        // if (objectDataId === i) {
          id = cord.lastIndexOf(_cord)
          cord.push(_cord)
          if (id >= 0) {
            for (let _i = id; _i < cord.length; _i++) {
              if ((typeof cord[_i]) === "number") {
                   postMessage({ bottom: cord[_i], top: i })
                  break;
              }
            }
            break;
          }
        // }
      }
    }
    cord.push(i)
    ctx.drawImage(imageBitmap, x, y);
  }

    const imageBitmap = ctx.canvas.transferToImageBitmap();
    postMessage(imageBitmap, [imageBitmap])
}