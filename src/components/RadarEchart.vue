<template>
  <div ref="radar"  :style="radar.style ? radar.style : style" class="myPit">雷达</div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    name: "RadarEchart",
    props: {
      radar:{
        type:Object,
        default(){
          return{}
        }
      },
    },
    data () {
      return {
        style:{
            width:'600px',
            height:'400px',
          },
        radarOption:{
          color:['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'], //默认颜色
          title: {
            text: '',
            subtext: '',
            left:"left",
            textStyle: {
              fontSize: 18,
              color: "#333"
            },
          },
          tooltip:{
            confine: true
          },
          legend: {    //图例
              type: "plain",
              show: false,
              left: "center",
              top: "5%",
              orient: "horizontal"
          },
            toolbox: {
              show: false,
              iconStyle: {
                borderColor: "rgba(193, 217, 212, 1)"
              },
              right: "12%",
              top:'11%',
              feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            radar: {
              shape: '',  //图例背景线条设置为圆形
              center:["50%","60%"], //图例位置
              triggerEvent: true,
              radius: '60%', //图例大小
              // splitArea:{
              //     show : true,   
              //     areaStyle : {
              //         color: ["#fff"]  // 图例背景网格的颜色
              //     }
              // },
              indicator: this.radar.indicator
            },
          series: [],
        },
      }
    },
    // computed: {
    //   options(){
    //     return this.radarOption
    //   }
    // },
    watch: {
      radar: {
        handler:function() {
          this.init()
        // this.initChartData()
        // console.log(newVal,oldVal);
      },
      deep: true
      // immediate: true
      }
    },
    mounted(){
      this.init();
      // this.dingshi();
    },
     methods:{
      init(){
        var myChart = echarts.init(this.$refs.radar,this.radar.dark);
        this.initChartData()
        myChart.setOption(this.radarOption);

        //当窗口大小发生变化的时候执行此函数
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      },

       dingshi(){
        var that = this
        setInterval(function(){
          // console.log('1');
          console.log(that.radar);
          // that.radar.indicator.push({ name: '222', max: 25000 })
          that.radar.series[0].data.push({
                  value: [420, 300, 2000, 3500, 5000, 1800],
                  name: 'A3333'
                },)
        },10000)
      },

      initChartData(){
        this.radar.title ? this.radarOption.title.text = this.radar.title.text : this.radarOption.title
        this.radar.color ? this.radarOption.color = this.radar.color : this.radarOption.color
        this.radar.toolbox ? this.radarOption.toolbox.show = this.radar.toolbox : this.radarOption.toolbox.show
        this.radar.legend ? this.radarOption.legend.show = this.radar.legend : this.radarOption.legend.show
        this.radar.dark ? this.radarOption.title.textStyle.color = '#fff'  : ''
        this.radar.center ? this.radarOption.radar.center = this.radar.center : this.radarOption.radar.center
        this.radar.radius ? this.radarOption.radar.radius = this.radar.radius : this.radarOption.radar.radius
        this.radar.shape ? this.radarOption.radar.shape = 'circle' : this.radarOption.radar.shape
        // this.radarOption.series = this.radar.series
        
        let getSeries = this.radar.series
          var quanseries = {
                  type: 'radar',
                  name: getSeries[0].name,
                  data:  getSeries[0].data,
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
              }
          this.radarOption.series[0]=quanseries
      },
    }
  }
</script>
<style lang="scss" scoped>
 
</style>