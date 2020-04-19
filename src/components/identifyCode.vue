/*
 * @Author: chenminggui
 * @Date: 2020-01-03 15:32:23
 * @Last Modified by: chenminggui
 * @Last Modified time: 2020-01-03 15:35:29
 * @Desc: 验证码图片组件
 */
<template>
  <div class="s-canvas">
    <canvas
      class="cancas-size"
      id="s-canvas"
      :width="contentWidth"
      :height="contentHeight"
    ></canvas>
  </div>
</template>

<script>
export default {
  name: 'SIdentify',
  props: {
    identifyCode: {
      // 默认注册码
      type: String,
      default: '1234'
    },
    fontSizeMin: {
      // 字体最小值
      type: Number,
      default: 32
    },
    fontSizeMax: {
      // 字体最大值
      type: Number,
      default: 32
    },
    backgroundColorMin: {
      // 验证码图片背景色最小值
      type: Number,
      default: 230
    },
    backgroundColorMax: {
      // 验证码图片背景色最大值
      type: Number,
      default: 235
    },
    dotColorMin: {
      // 背景干扰点最小值
      type: Number,
      default: 2
    },
    dotColorMax: {
      // 背景干扰点最大值
      type: Number,
      default: 200
    },
    contentWidth: {
      // 容器宽度
      type: Number,
      default: 90
    },
    contentHeight: {
      // 容器高度
      type: Number,
      default: 40
    }
  },
  methods: {
    // 生成一个随机数
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 生成一个随机的颜色
    randomColor (min, max) {
      let r = this.randomNum(min, max)
      let g = this.randomNum(min, max)
      let b = this.randomNum(min, max)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    drawPic () {
      let canvas = document.getElementById('s-canvas')
      let ctx = canvas.getContext('2d')
      ctx.textBaseline = 'bottom'
      // 画之前清空画布
      ctx.clearRect(0, 0, this.contentWidth, this.contentHeight)

      // 绘制背景
      // ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax);
      // ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
      // 绘制文字
      for (let i = 0; i < this.identifyCode.length; i++) {
        this.drawText(ctx, this.identifyCode[i], i)
      }
      this.drawLine(ctx)
      this.drawDot(ctx)
    },
    drawText (ctx, txt, i) {
      ctx.fillStyle = this.randomColor(50, 160) // 随机生成字体颜色
      ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei' // 随机生成字体大小
      let x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
      let y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
      let deg = this.randomNum(-30, 30)
      // 修改坐标原点和旋转角度
      ctx.translate(x, y)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(txt, 0, 0)
      // 恢复坐标原点和旋转角度
      ctx.rotate((-deg * Math.PI) / 180)
      ctx.translate(-x, -y)
    },
    /* 减少用户识别难度，取消线条 */
    drawLine (ctx) {
      console.log(ctx)
      // 绘制干扰线
      // for (let i = 0; i < 1; i++) {
      //     ctx.strokeStyle = this.randomColor(180, 200);
      //     ctx.beginPath();
      //     ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight));
      //     ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight));
      //     ctx.stroke()
      // }
    },
    // eslint-disable-next-line no-unused-vars
    drawDot (ctx) {
      // 绘制干扰点
      // for (let i = 0; i < 10; i++) {
      //     ctx.fillStyle = this.randomColor(0, 255);
      //     ctx.beginPath();
      //     ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI);
      //     ctx.fill()
      // }
    }
  },
  watch: {
    identifyCode () {
      this.drawPic()
    }
  },
  mounted () {
    this.drawPic()
  }
}
</script>

<style>
.s-canvas {
  height: 30px;
}
  .cancas-size{
    width: 90px;
    height: 40px;
  }
</style>
