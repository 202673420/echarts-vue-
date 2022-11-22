<template>
    <!-- <div> -->
      <div ref="scatter" :style="scatter.style ? scatter.style : style">散点图</div>
      <!-- <p>{{option}}</p> -->
    <!-- </div> -->
  
</template>

<script>
import * as echarts from 'echarts';
// import { loopShowTooltip } from "../normal/tooltip-auto-show-vue";
import ecStat from 'echarts-stat';
echarts.registerTransform(ecStat.transform.regression);
export default {
    name: 'ScatterEchart',
    props:{
      scatter:{
        type:Object,
        default(){
          return{}
        }
      },
    },
    data(){
      return {
        tootipTimer:0,
        style:{
            width:'600px',
            height:'400px',
          },
        scatterOption:{
          title: {
            text: '',
            subtext: '',
            left:"left",
            textStyle: {
              fontSize: 18,
              color: "#333"
            },
          },
          dataset: [
            {
              source: this.scatter.data
            },
            {
              transform: {
                type: 'ecStat:regression',
                config: {      //曲线
                  method: 'exponential'
                  // 'end' by default
                  // formulaOn: 'start'
                }
              }
            }
          ],
          tooltip:{
            trigger: "axis",
            axisPointer: {
              type: 'cross'
            }
          },
           xAxis: {
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          yAxis: {
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          dataZoom: [   //鼠标滚动可缩放
            {
              type: 'inside'
            }
          ],
           series: [
            {
              name: 'scatter',
              type: 'scatter',
              symbolSize: 10,
              itemStyle:{
              color:this.scatter.sdcolor ? this.scatter.sdcolor : '#188df0'
              },
              datasetIndex: 0
            },
            {
              name: 'line',
              type: 'line',
              itemStyle:{
              color:this.scatter.linecolor ? this.scatter.linecolor : '#188df0'
              },
              smooth: true,
              datasetIndex: 1,
              symbolSize: 0.1,
              symbol: 'circle',
              label: { show: true, fontSize: 16 },
              labelLayout: { dx: -20 },
              encode: { label: 2, tooltip: 1 }
            }
          ]
        },
      }
    },

    // computed: {
    //   options(){
    //     return this.scatterOption
    //   }
    // },

    watch: {
      
      scatter: {
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
      // this.dingshi();
    },
    methods:{
      init(){
        var myChart = echarts.init(this.$refs.scatter,this.scatter.dark);
        this.initChartData()

        //自动播放tooltip
        // if (this.scatter.tootipTimer) {
        //   this.tootipTimer && this.tootipTimer.clearLoop(); // this.tootipTimer 在data里定义
        //   this.tootipTimer = 0;
        //   this.tootipTimer = loopShowTooltip(myChart, this.scatterOption, {
        //     interval: 2000, // 轮播间隔时间
        //     loopSeries: true // 是否开启轮播循环
        //   });
        // }
        
        //自动播放tooltip
        // console.log(this.scatter.data.length);
        var datals = this.scatter.data.length
        if (this.scatter.tootipTimer) {
          var self = this;
          var count = 0
          self.timeTicket = setInterval(function() {
            myChart.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
            });
            myChart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: count
            });
            myChart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: count
            });
            count++;
            // console.log(this.scatter.data);
            if (count == datals) {
                  count = 0
              }
          }, 3000);

           myChart.on('mouseover', function(params) {
            clearInterval(self.timeTicket);
            myChart.dispatchAction({
              type: 'downplay',
              seriesIndex: 0
            });
            myChart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: params.dataIndex
            });
            myChart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: params.dataIndex,
            });
          })

          myChart.on('mouseout', function() {
            var count = 0
            self.timeTicket = setInterval(function() {
              myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
              });
              myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: count
              });
              myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: count
              });
              count++;
              if (count == datals) {
                  count = 0
              }
            }, 3000);
          })
        }


        myChart.setOption(this.scatterOption);

        //当窗口大小发生变化的时候执行此函数
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      },

      dingshi(){
        var that = this
        setInterval(function(){
          // console.log('1');
          console.log(that.scatter);
          that.scatter.data.push([1.0,1.0])
        },10000)
      },
      
      initChartData(){
        this.scatter.title ? this.scatterOption.title.text = this.scatter.title.text : this.scatterOption.title
        this.scatter.dark ? this.scatterOption.title.textStyle.color = '#fff'  : ''
        this.scatter.exponential ? delete this.scatterOption.dataset[1].transform.config.method  : this.scatterOption.dataset[1].transform.config.method
        this.scatter.dataset == false ? this.scatterOption.series.pop() : ''
      },

    },
    
}
</script>

<style scoped>

</style>