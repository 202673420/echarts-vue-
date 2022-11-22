<template>
  <div ref="gauge"  :style="gauge.style ? gauge.style : style" class="myPit">仪表</div>
</template>

<script>
  import * as echarts from 'echarts'
  export default {
    name: "GaugeEchart",
    props: {
      gauge:{
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
        gaugeOption:{
          title: {
            text: '',
            subtext: '',
            left:"left",
            textStyle: {
              fontSize: 18,
              color: "#333"
            },
          },
           tooltip: {
              formatter: '{a} <br/>{b} : {c}%'
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
          series: [
            {
              name:'大标题',
              type: 'gauge',
              progress: {
                show: true, //是否需要数据展示背景
                width: 10,  //设置数据背景宽度
              },
              axisLine: {
                lineStyle: {
                  width: 10, //设置仪表背景宽度
                  // color: [
                  //   [0.3, '#67e0e3'],  //等级阶段颜色表示
                  //   [0.7, '#37a2da'],
                  //   [1, '#fd666d']
                  // ]
                }
              },
              axisTick: {
                show: true
              },
              // pointer: {
              //   icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              //   length: '12%',
              //   width: 20,
              //   offsetCenter: [0, '-66%'],
              //   itemStyle: {
              //     color: 'auto'
              //   }
              // },
              splitLine: {
                length: 15,
                lineStyle: {
                  width: 2,
                  color: '#999'
                }
              },
              axisLabel: {
                distance: 25,
                color: '#999',
                fontSize: 20
              },
              anchor: {
                show: true, //是否需要指针圆圈
                showAbove: true,
                size: 15,
                itemStyle: {
                  borderWidth: 5
                }
              },
              title: {
                show: true
              },
              detail: {
                valueAnimation: true,
                fontSize: 60,
                offsetCenter: [0, '70%']
              },
              data: []
            }
          ],
        },
      }
    },
    // computed: {
    //   options(){
    //     return this.gaugeOption
    //   }
    // },
    watch: {
      gauge: {
        handler:function() {
        this.init()
        // this.initChartData()
        // console.log(newVal,oldVal);
      },
      deep: true,
      // immediate: true
      }
    },
    mounted(){
      this.init();
    },
     methods:{
      init(){
        var myChart = echarts.init(this.$refs.gauge,this.gauge.dark);
        this.initChartData()
        myChart.setOption(this.gaugeOption);

        //当窗口大小发生变化的时候执行此函数
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      },
      initChartData(){
        this.gauge.title ? this.gaugeOption.title.text = this.gauge.title.text : this.gaugeOption.title.text
        // this.gauge.color ? this.gaugeOption.color = this.gauge.color : this.gaugeOption.color
        this.gauge.toolbox ? this.gaugeOption.toolbox.show = this.gauge.toolbox : this.gaugeOption.toolbox.show
        this.gauge.dark ? this.gaugeOption.title.textStyle.color = '#fff'  : '#333'
        this.gauge.data ? this.gaugeOption.series[0].data = this.gauge.data : ''
        this.gauge.sjshow == false ? this.gaugeOption.series[0].progress.show = this.gauge.sjshow : this.gaugeOption.series[0].progress.show
        this.gauge.djcolor ? this.gaugeOption.series[0].axisLine.lineStyle.color = this.gauge.djcolor : this.gaugeOption.series[0].axisLine.lineStyle.color
        this.gauge.sjzswidth ? this.gaugeOption.series[0].progress.width = this.gauge.sjzswidth : this.gaugeOption.series[0].progress.width
        this.gauge.ybwidth ? this.gaugeOption.series[0].axisLine.lineStyle.width = this.gauge.ybwidth : this.gaugeOption.series[0].axisLine.lineStyle.width
        this.gauge.anchor == false ? this.gaugeOption.series[0].anchor.show = this.gauge.anchor : this.gaugeOption.series[0].anchor.show
      },
    }
  }
</script>
<style lang="scss" scoped>
 
</style>