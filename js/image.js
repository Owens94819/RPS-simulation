export function image(src) {
    return new Promise((r) => {
        const resolve=()=> r(img);
        const img=new Image()
        img.src=src;
        img.onload = resolve
        img.onerror = resolve
    })
}