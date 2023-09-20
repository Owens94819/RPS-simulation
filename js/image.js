export function image(src) {
    return new Promise((r,j) => {
        const resolve=()=> r(img);
        const img=new Image()
        // console.log(img);
        img.src=src;
        img.onload = resolve
        img.onerror = j
    })
}