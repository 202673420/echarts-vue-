<template>
  <div ref="pie"  :style="pie.style ? pie.style : style" class="myPit">饼图</div>
</template>

<script>
  import * as echarts from 'echarts';
  import { loopShowTooltip } from "../normal/tooltip-auto-show-vue";
  export default {
    name: "PieEchart",
    props: {
      pie:{
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
        pieOption:{
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
          series: [],
        },
      }
    },
    // computed: {
    //   options(){
    //     return this.pieOption
    //   }
    // },
    watch: {
      pie: {
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
      // this.dingshi()
    },
     methods:{
      init(){
        var myChart = echarts.init(this.$refs.pie,this.pie.dark);
        this.initChartData()

         //自动播放tooltip
        if (this.pie.tootipTimer) {
          this.tootipTimer && this.tootipTimer.clearLoop(); // this.tootipTimer 在data里定义
        this.tootipTimer = 0;
        this.tootipTimer = loopShowTooltip(myChart, this.pieOption, {
          interval: 2000, // 轮播间隔时间
          loopSeries: true // 是否开启轮播循环
        });
        }

        myChart.setOption(this.pieOption);

        //当窗口大小发生变化的时候执行此函数
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      },

      dingshi(){
        var that = this
        setInterval(function(){
          // console.log('1');
          // console.log(that.pie);
          that.pie.series[0].data.push({ value: 100, name: '000' })
        },10000)
      },

      initChartData(){
        this.pie.title ? this.pieOption.title.text = this.pie.title.text : this.pieOption.title
        this.pie.color ? this.pieOption.color = this.pie.color : this.pieOption.color
        this.pie.toolbox ? this.pieOption.toolbox.show = this.pie.toolbox : this.pieOption.toolbox.show
        this.pie.legend ? this.pieOption.legend.show = this.pie.legend : this.pieOption.legend.show
        this.pie.dark ? this.pieOption.title.textStyle.color = '#fff' : ''
        // this.pieOption.series = this.pie.series
        
        let getSeries = this.pie.series
          var quanseries = {
                  type: 'pie',
                  name: getSeries[0].name,
                  data:  getSeries[0].data,
                  radius: getSeries[0].radius,
                  roseType: '',
                  itemStyle: {},
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
              }
          getSeries[0].yuanjioa ? quanseries.itemStyle = {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 1
            } : ''
          getSeries[0].roseType ? quanseries.roseType = 'area' : ''
          
          this.pieOption.series.push(quanseries)
      },
    }
  }
</script>
<style lang="scss" scoped>
 
</style>