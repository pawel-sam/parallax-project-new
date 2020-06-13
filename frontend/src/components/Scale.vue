<template>
  <div>
    <svg :width="xEnd+50" height="50%">
      <line 
        :x1="x0" 
        y1="80" 
        :x2="xEnd" 
        y2="80" 
        style="stroke:rgb(0,0,0); stroke-width:2" 
      />

      <line
        v-for="(line,index) in marksArr"
        :key="`line-${index}`"
        :x1="line.x"
        y1="80"
        :x2="line.x"
        :y2="line.y"
        style="stroke:rgb(0,0,0); stroke-width:1"
      />

      <text
        v-for="(mark, index) in signsArr"
        :key="`mark-${index}`"
        :x="mark.x"
        y="95"
        fill="black"
      >{{ mark.value }}</text>
    </svg>
  </div>
</template>

<script>
export default {
  name: "Scale",
  props: {
    startDate: Number,
    endDate: Number,
    step: Number,
    ratio: Number
  },
  data() {
    return {
      /* wpx: window.screen.availWidth, */
      wpx: window.innerWidth,
      x0: 50,
      xEnd: 0,
      marksArr: [],
      signsArr: [],
      signString: '',
      scaleLength: 0
    };
  },

  created() {
    this.calculateScale()
    this.$emit("returnScaleLength", this.scaleLength)
  },

  mounted() {},

  methods: {
    calculateScale() {
      console.log("1.0)", this.wpx, "px ширина видимой части экрана") // смотрим ширину видимой части экрана
      this.wpx = Math.floor(this.wpx / 100) * 100 // округление до сотен в меньшую сторону

      this.xEnd = this.wpx * 1.3 - 50
      this.scaleLength = (this.xEnd - this.x0) * this.ratio
      console.log("1.1)", this.wpx, "px - округлили размер экрана в меньшую сторону")
      console.log("1.2)", "конец предполагаемой шкалы", this.xEnd, "px. Ее ширина (-50px)", this.scaleLength)
      // находим предполагаемые конец шкалы и длину шкалы
      let minMarkStep = this.wpx / 10 // находим минимальную длину периода (но не менее 130px)
      if (minMarkStep < 130) {
        minMarkStep = 130
      }
      console.log("1.3)", minMarkStep, "px это ~ 1/10 экрана, но не менее 130 px")
         
      let decade = 10 // десятилетие
      let century = 100 // столетие
      let millenium = 1000 //тысячалетие

      let newStep = this.step
      if (this.endDate - this.startDate >= millenium) {
        newStep = century
      } else if (this.endDate - this.startDate >= century) {
        newStep = decade
      }

      newStep = 1000      
      console.log("2.0) Масштаб 1 /", newStep); // выводим масштаб

      let markQnt = (this.endDate - this.startDate) / newStep
      let markStep = Math.floor(this.scaleLength / markQnt)
      
      let startScale = Math.floor(this.startDate / newStep) * newStep // начало шкалы
      let endScale = Math.ceil(this.endDate / newStep) * newStep // конец шкалы      
      console.log("3.0)", startScale, "начало шкалы") // выводим начало периода
      console.log("3.1)", this.startDate, "начальная дата") // выводим начальную дату
      console.log("3.2)", this.endDate, "конечная дата") // выводим конечную дату
      console.log("3.3)", endScale, "конец шкалы") // выводим конец периода
      
      let sign = this.startDate // начальная дата шкалы (Number)
      this.signString = String(sign) // начальная дата шкалы (String)
      if (sign > startScale && newStep > 1) {
        sign = startScale
        markQnt = (endScale - startScale) / newStep
        markStep = Math.floor(this.scaleLength / markQnt)
        if (newStep > 10) {
          this.signString = this.romanize(sign, newStep)
        }
      }
      console.log("3.4 Первый sign)", sign)
      console.log("3.5 Первый signString)", this.signString)

      console.log("4.2)", markQnt, "периодов") // находим кол-во периодов
      console.log("4.3) Период =", markStep, "px") // выводи длину периода
      
      console.log("5.0)", markStep, "px сравниваем с минимально допустимыми", minMarkStep, "px") // сравниваем длину периода с минимальной
      if (markStep < minMarkStep) {
        markStep = minMarkStep // если markStep < 130px, то markStep = 130px
      }

      this.scaleLength = markStep * markQnt // пересчитываем шкалу
      this.xEnd = this.scaleLength + this.x0 // высчитываем конечную точку шкалы
      console.log("5.1) Период", markStep, "px * на кол-во периодов", markQnt, "= шкала", this.scaleLength, "px") // выводим длину реальной шкалы
      console.log("5.2) Конец шкалы:", this.xEnd, "px (+50 px)") // выводим координату конечной точки шкалы

      let bigMark = 12 // количество рисок в периоде (12 или 10)
      if (newStep === millenium || newStep === century || newStep === decade) {
        bigMark = 10
      }
      console.log("6.1) Количество рисок в периоде", bigMark)

      let smallMarkQnt = Math.ceil(bigMark * markQnt) // кол-во рисок на шкале      
      console.log("6.2)", smallMarkQnt, "рисок в шкале (", markQnt, "периодов * на", bigMark, "рисок в периоде )")

      let smallMArkStep = Math.floor(this.scaleLength / smallMarkQnt) // находим и округляем расстояние между мелкими рисками
      console.log("6.3)", smallMArkStep, "px - округленный шаг между мелкими рисками")

      this.scaleLength = smallMArkStep * smallMarkQnt // пересчитаем длину шкалы scaleLength
      console.log("6.4) Пересчитываем длину шкалы")
      console.log("6.5) Новый размер шкалы", this.scaleLength, "px (", smallMArkStep, "px между рисками *", smallMarkQnt, "кол-во рисок )")
      console.log("6.6) scaleFullWidth", this.scaleLength + 100, "px (", this.scaleLength, "px шкала + 2 отступа слева и справа по 50 px )")

      this.xEnd = this.x0 + this.scaleLength // пересчитаем конец шкалы
      console.log("6.7)", this.x0, "px и", this.xEnd, "px - начало и конец шкалы по оси Х без отступов")

      

      let counter = 0
      for (let x = this.x0; x <= this.xEnd; x += smallMArkStep) {
        if (counter % bigMark === 0) {
          this.marksArr.push({ x, y: 30 })
          if (newStep > 10) {
            this.signsArr.push({
              value: this.romanize(sign, newStep),
              x: x - this.shiftSign()
            })
          } else {
            this.signsArr.push({
              value: sign,
              x: x - this.shiftSign(this.signString)
            })
          }          
          sign += newStep
          this.signString = String(sign)
        } else {
          this.marksArr.push({ x, y: 60 })
        }
        counter++
      }
      //console.log("11)", this.marksArr) // убрать
    },

    shiftSign ()  { // высчитываем половину ширины sign
      let pixelWidth = require('string-pixel-width') // работаем с библиотекой 'string-pixel-width'
      let stringWidth = pixelWidth(this.signString, { size: 16 })
      let shiftSign = stringWidth / 2 // сдвиг на 50%
      return shiftSign
    },

    romanize (sign, newStep) { // романизация арабских чисел
      if (sign === 0) {
        this.signString = 0
        return 0
      } else {
        let lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1}, roman = '', i
        if (newStep > 100 && newStep < 1000) {
          sign = sign / newStep + 1
        } else {
          sign = sign / newStep
        }
        for ( i in lookup ) {
          while ( sign >= lookup[i] ) {
            roman += i          
            sign -= lookup[i]
          }
        }
        if (newStep > 100) {
          this.signString = roman + " тыс."
          return roman + " тыс."
        } else if (newStep > 10) {
          this.signString = roman + " век"
          return roman + " век"
        }
      }
    }    
  }
};
</script>

<style scoped>
</style>
