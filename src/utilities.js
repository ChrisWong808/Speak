// import pic from './pikachu.jpeg'
// const pic = document.getElementById('pikachu.jpeg')
{/* <img src = './pikachu.jpeg' ></img> */}

export const drawBall = (ctx, x, y, r) => {
    ctx.beginPath();
    console.log('it is running')
    ctx.arc(x, y, r, 0, 3*Math.PI)
    ctx.fillStyle = "aqua"
    ctx.fill()

    var img = new Image();
    img.src = './pikachu.jpeg';
    img.onload = function() {
        console.log('on load')
        console.log(img.width,img.height,img.complete);
        // ctx.save();
        // ctx.globalCompositeOperation = 'source-in';
        ctx.drawImage(img, x, y)
        // ctx.restore();
      }
    // img.src = './pikachu.jpeg';
    // img.decode().then(()=>{
    //   console.log('on load')
    //   ctx.drawImage(img, x, y)
    // }).catch(()=>{
    //     console.log('Error loading image')
    // });
    // if(img.complete){
    //     console.log('on load')
    //     ctx.drawImage(img, x, y);
    // }

    //ctx.drawImage(img, x, y)
}