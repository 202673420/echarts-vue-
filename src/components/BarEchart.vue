<template>
    <!-- <div> -->
      <div ref="bar" :style="bar.style ? bar.style : style">柱状图</div>
      <!-- <p>{{option}}</p> -->
    <!-- </div> -->
  
</template>

<script>
import * as echarts from 'echarts';
import { loopShowTooltip } from "../normal/tooltip-auto-show-vue";
export default {
    name: 'BarEchart',
    props:{
      bar:{
        type:Object,
        default(){
          return{}
        }
      },
    },
    data(){
      return {
        tootipTimer:0,
        is:0,
        style:{
            width:'600px',
            height:'400px',
          },
        barOption:{
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
            trigger: "axis",
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            left: "10%",
            top: "20%",
            right: "12%",
            bottom: "15%"
          },
          legend: {    //图例
              type: "plain",
              show: false,
              left: 'center',
              top: "2%"
          },
          xAxis: {
            type: 'category',
            // axisLabel:{
            //   interval: 0,
            //   color: '#1E1E1E',
            //   rotate: 25,
            //   fontSize: 10,
            //   margin: 10
            // },
            triggerEvent: true,
            data: [],
            axisTick:{
              show:false,
              alignWithLabel: true
            },
            axisLine:{
              lineStyle: {
                color: '#78787A'
              }
            }, 
          },
           yAxis:[
             {
                type: 'value',
                axisTick: {show: true},
                name: '',
                position: 'left',
                nameLocation: 'end',
                // splitNumber:10,
                nameTextStyle: {
                  color: '#969696'
                },
                axisLine: {
                  show: false,  //是否需要Y轴线
                  lineStyle: {
                    color: '#ccc'
                  }
                },
                axisLabel: {
                  // color: '#1E1E1E',
                  formatter:this.bar.sjdw?'{value} / '+this.bar.sjdw:'{value}',
                  fontSize: 10
                },
                min: 0,
                max: 1, // 右侧y轴最大值
                interval: 1, // 间距等分为10等分
              }
              // {
              //   type: 'value',
              //   axisTick: {show: true},
              //   name: '',
              //   position: 'left',
              //   nameLocation: 'end',
              //   nameTextStyle: {
              //     color: '#969696'
              //   },
              //   axisLine: {
              //     show: false,  //是否需要Y轴线
              //     lineStyle: {
              //       color: '#ccc'
              //     }
              //   },
              //   axisLabel: {
              //     // color: '#1E1E1E',
              //     formatter:this.bar.sjdw?'{value} / '+this.bar.sjdw:'{value}',
              //     fontSize: 10
              //   },
              // }
            ],
            dataZoom: [   //鼠标滚动可缩放
              {
                type: 'inside'
              }
            ],
            toolbox: {   //是否需要工具栏
              show: false,
              feature: {
                // dataZoom: {
                //   yAxisIndex: "none"
                // },
                // dataView: {
                //   readOnly: false
                // },
                magicType: {
                  type: ["line", "bar"]
                },
                // restore: {},
                saveAsImage: {}
              },
              itemSize: 13,
              right: "12%",
              top:'6%',
              showTitle: true,
              iconStyle: {
                borderColor: "rgba(193, 217, 212, 1)"
              }
            },
          series: [],
        },
      }
    },

    // computed: {
    //   options(){
    //     return this.barOption
    //   }
    // },

    watch: {
      
      bar: {
        handler() {
        this.init();
        // this.initChartData()
        // console.log(newVal);
      },
      deep: true,
      // immediate: true
      }
    },

    mounted(){
      this.init();
      // this.dingshi()
    },
    methods:{
      init(){
        var myChart = echarts.init(this.$refs.bar,this.bar.dark);
        this.initChartData()

        //自动播放tooltip
        if (this.bar.tootipTimer) {
          this.tootipTimer && this.tootipTimer.clearLoop(); // this.tootipTimer 在data里定义
          this.tootipTimer = 0;
          this.tootipTimer = loopShowTooltip(myChart, this.barOption, {
            interval: 2000, // 轮播间隔时间
            loopSeries: true // 是否开启轮播循环
          });
        }

        myChart.setOption(this.barOption);

        //当窗口大小发生变化的时候执行此函数
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      },

      dingshi(){
        var that = this
        setInterval(function(){
          // console.log('1');
          // console.log(that.bar);
          that.bar.xAxis.data.push('s1')
          that.bar.series[0].data.push(20)
        },5000)
      },
      
      initChartData(){
      const maxY1 = parseInt((Math.max(...this.bar.series[0].data) + 200) / 100) * 100
      // const maxY2 = parseInt((Math.max(...this.bar.series[2].data) + 10) / 10) * 10
      
      // //判断this.bar.series里面的对象里面哪个含有yAxisIndex字段，并拿到对应的下标
      // for (let i = 0; i < this.bar.series.length; i++){
      //     if (this.bar.series[i].yAxisIndex) {
      //       this.is = i
      //     }
      // }
      
      const maxY2 = parseInt((Math.max(...this.bar.series[this.is].data) + 10) / 10) * 10

      this.barOption.yAxis[0].max = maxY1
      this.barOption.yAxis[0].interval = Math.ceil(maxY1 / 5)


        this.bar.title ? this.barOption.title.text = this.bar.title.text : this.barOption.title
        this.bar.color ? this.barOption.color = this.bar.color : this.barOption.color
        this.bar.grid ? this.barOption.grid = this.bar.grid : this.barOption.grid
        this.barOption.xAxis.data = this.bar.xAxis.data

        // if (this.bar.xAxis.data.length>7) {
        //     // this.bar.xAxis.data.shift()
        //     delete this.bar.xAxis.data[0]
        //     delete this.bar.series[0]
        //   }

        this.bar.toolbox ? this.barOption.toolbox.show = this.bar.toolbox : this.barOption.toolbox.show
        this.bar.legend ? this.barOption.legend.show = this.bar.legend : this.barOption.legend.show
        this.bar.dark ? this.barOption.title.textStyle.color = '#fff'  : ''
        this.bar.yAxisName ? this.barOption.yAxis[0].name = this.bar.yAxisName : ''
        this.bar.axisLine ? this.barOption.yAxis[0].axisLine.show = this.bar.axisLine : this.barOption.yAxis[0].axisLine.show
        this.bar.yAxisRight ? this.barOption.yAxis.push(
              {
                type: 'value',
                axisTick: {show: true},
                // name: '',
                name: this.bar.yAxisRight.yAxisNameRight ? this.bar.yAxisRight.yAxisNameRight : '',
                position: 'right',
                nameLocation: 'end',
                // splitNumber:10,
                nameTextStyle: {
                  color: '#969696'
                },
                axisLine: {
                  // show: false,  //是否需要Y轴线
                  show: this.bar.yAxisRight.axisLineRight ? this.bar.yAxisRight.axisLineRight : false,  //是否需要Y轴线
                  lineStyle: {
                    color: '#ccc'
                  }
                },
                axisLabel: {
                  // color: '#1E1E1E',
                  // formatter:this.bar.sjdw?'{value} / '+this.bar.sjdw:'{value}',
                  formatter:this.bar.yAxisRight.sjdwRight?'{value} / '+this.bar.yAxisRight.sjdwRight:'{value}',  //是否需要Y轴数据单位
                  fontSize: 10
                },
                min: 0,
                max: maxY2, // 右侧y轴最大值
                interval: Math.ceil(maxY2 / 5), // 间距等分为5等分
              }) : ''

        let getSeries = this.bar.series
        for (let i = 0; i < getSeries.length; i++) {
          var quanseries = {
                  // type: 'bar',
                  type: getSeries[i].type?getSeries[i].type:'bar',
                  showBackground: false, //柱子是否带背景
                  stack: '', //是否瀑布柱子
                  name: getSeries[i].name,
                  data:  getSeries[i].data,
                  yAxisIndex: getSeries[i].yAxisIndex,
                  // itemStyle: {        //单个柱子可选渐变色柱子
                  //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  //     { offset: 0, color: '#83bff6' },
                  //     { offset: 0.5, color: '#188df0' },
                  //     { offset: 1, color: '#188df0' }
                  //   ])
                  // },
                  // itemStyle: {
                  //     color: {
                  //       type: 'linear',
                  //       x: 0,
                  //       x1: 0,
                  //       y: 1,
                  //       y1: 0,
                  //       colorStops: [
                  //         {
                  //           offset: 0,
                  //           color: '#3051f1'
                  //         },
                  //         {
                  //           offset: 1,
                  //           color: '#4c90ff'
                  //         }
                  //       ]
                  //     }
                  // },
                  label: {   //柱子显示文字
                      show: false,
                      color: '#ccc',
                      position: "top",
                      fontSize: 13,
                      fontWeight: 'line',
                      // fontFamily: 'DINPro-Medium'
                    
                  }
              }
          getSeries[i].showBackground ? quanseries.showBackground = getSeries[i].showBackground : quanseries.showBackground
          getSeries[i].stack ? quanseries.stack = 'Total' : quanseries.stack
          getSeries[i].label ? quanseries.label.show = getSeries[i].label : quanseries.label.show
          // this.barOption.series.push(quanseries)
          this.barOption.series[i] = quanseries
          // console.log(this.barOption.series.length);

          if (this.bar.xAxis.data.length>7) {
            this.bar.xAxis.data.shift()
            // delete this.bar.xAxis.data[0]
            getSeries[i].data.shift()
            // delete this.barOption.series[i].data[0]
          }

        }

      },
      
    },
    
}
</script>

<style scoped>

</style>