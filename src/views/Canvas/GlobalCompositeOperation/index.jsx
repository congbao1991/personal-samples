/* eslint-disable */
import { useRef, useEffect } from 'react'
import img1 from '@/assets/images/195613089_13_2020071302380421.png'
import img2 from '@/assets/images/195613089_14_20200713023804177.png'
import img3 from '@/assets/images/195613089_15_20200713023804380.jpg'

function globalCompositeOperation() {

  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d') // 保存图片路径的数组
    const urlArr = [
      img1,
      img3,
    ] // imgArr 保存加载后的图片的数组，imgArr中保存的是真实的图片 // loadImg 函数用来加载 urlArr 中所有的图片 // 并返回一个保存所有图片的数组
    
    const imgArr = loadImg(urlArr) // flag 用来限制 点击事件，一张图片只会产生一次效果
    let flag = false
    
    function loadImg(urlArr) {
      var index = 0;
      var res = []; 
      // 每次给 load 函数传入一个图片路径，来加载图片 
      load(urlArr[index]);
      function load(url) {
        // 如果 index 等于 urlArr.length，
        // 表示加载完 全部图片了，就结束 load函数
        if (index == urlArr.length) {
          // 加载完全部图片，调用 init 函数
          init();
          return;
        }
        var img = new Image();
        img.src = url; // 不管当前图片是否加载成功，都要加载下一张图片
        img.onload = next;
        img.onerror = function () {
          console.log(res[index] + "加载失败");
          next();
        }; // next 用来加载下一张图片
        function next() {
          // 把加载后的图片，保存到 res 中
          res[index] = img;
          load(urlArr[++index]);
        }
      }
      // 最后返回保存所有真实图片的数组
      return res;
    }
    function init() {
      // 先在canvas上画黑白的图片，然后再设置背景是彩色的图片
      // 避免先显示出彩色图片，再显示出黑白的图片
      context.globalCompositeOperation = 'source-over'
      context.drawImage(imgArr[0], 0, 0, 400, 250)
      canvas.style.background = `url(${img2})`
      canvas.style.backgroundSize = '100% 100%' // flag 是 true 时，鼠标点击才有水滴扩散的效果
      flag = true // canvas 绑定点击事件，点击时产生水滴扩散效果
      canvas.onclick = diffusion
    }
    // width 表示 不规则形状的图片的尺寸
    let width = 0
    // speed 表示扩散效果的速度
    const speed = 8
    // diffusion 函数根据鼠标坐标，产生效果
    function diffusion(e) {
      if (flag) {
        flag = false
        context.globalCompositeOperation = 'destination-out'
        window.requestAnimationFrame(draw)
        // 根据鼠标坐标，画扩散效果
        function draw() {
          // 这里不一定需要是 1800 ，但必须是一个足够大的数，可以扩散出整张背景图
          if (width > 1800) {
            flag = true
            return
          }
          width += speed
          // 获取鼠标相对于 canvas 的坐标
          const x = e.layerX
          const y = e.layerY
          // 画不规则形状的图片，逐渐增大图片尺寸
          context.drawImage(
            imgArr[1],
            x - width / 2,
            y - width / 2,
            width,
            width
          )
          window.requestAnimationFrame(draw)
        }
      }
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} style={{cursor: 'pointer'}} width="400px" height="250px"></canvas>
      点击图片
    </>
  )
}

export default globalCompositeOperation
