
Promise.allSettled([
  import("./context.js")
  ]).then(e=>{
    e.forEach(({value})=>{
      console.log(value);
    })
  })