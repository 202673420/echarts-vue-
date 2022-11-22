<template>
    <!-- <div> -->
      <div ref="line" :style="line.style ? line.style : style">折线图</div>
      <!-- <p>{{option}}</p> -->
    <!-- </div> -->
  
</template>

<script>
import * as echarts from 'echarts';
import { loopShowTooltip } from "../normal/tooltip-auto-show-vue";
export default {
    name: 'LineEchart',
    props:{
      line:{
        type:Object,
        default(){
          return{}
        }
      },
    },
    data(){
      return {
        style:{
            width:'600px',
            height:'400px',
          },
        lineOption:{
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
              // type: "plain",
              // data: ['dd', 'ff', '55',],
              show: false,
              left: "center",
              top: "8%"
          },
          xAxis: {
            type: 'category',
            boundaryGap: true, //折线是否占满X轴
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
           yAxis:{
              type: 'value',
              axisTick: {show: false},
              name: '',
              nameLocation: 'end',
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
                formatter:this.line.sjdw?'{value} / '+this.line.sjdw:'{value}',
                fontSize: 10
              }
            },
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
              right: "10%",
              top:'7%',
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
    //     return this.lineOption
    //   }
    // },
    watch: {
      line: {
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
      // this.dingshi()
    },
    methods:{
      init(){
        var myChart = echarts.init(this.$refs.line,this.line.dark);
        this.initChartData()

        //自动播放tooltip
        if (this.line.tootipTimer) {
          this.tootipTimer && this.tootipTimer.clearLoop(); // this.tootipTimer 在data里定义
        this.tootipTimer = 0;
        this.tootipTimer = loopShowTooltip(myChart, this.lineOption, {
          interval: 2000, // 轮播间隔时间
          loopSeries: true // 是否开启轮播循环
        });
        }

        myChart.setOption(this.lineOption);

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
          that.line.xAxis.data.push('s1')
          that.line.series[0].data.push(20)
        },10000)
      },

      initChartData(){
        this.line.title ? this.lineOption.title.text = this.line.title.text : this.lineOption.title
        this.line.color ? this.lineOption.color = this.line.color : this.lineOption.color
        this.line.grid ? this.lineOption.grid = this.line.grid : this.lineOption.grid
        this.lineOption.xAxis.data = this.line.xAxis.data
        this.lineOption.xAxis.boundaryGap = this.line.xAxis.boundaryGap
        this.line.toolbox ? this.lineOption.toolbox.show = this.line.toolbox : this.lineOption.toolbox.show
        this.line.legend ? this.lineOption.legend.show = this.line.legend : this.lineOption.legend.show
        this.line.dark ? this.lineOption.title.textStyle.color = '#fff'  : ''
        this.line.yAxisName ? this.lineOption.yAxis.name = this.line.yAxisName : ''
         this.line.axisLine ? this.lineOption.yAxis.axisLine.show = this.line.axisLine : this.lineOption.yAxis.axisLine.show
        
        // this.lineOption.series = this.line.series
        // this.handleArr(this.line.series)
        let getSeries = this.line.series
        for (let i = 0; i < getSeries.length; i++) {
          var quanseries = {
                  type: 'line',
                  showBackground: false, //柱子是否带背景
                  name: getSeries[i].name,
                  data:  getSeries[i].data,
                  smooth: false, //设置为平滑曲线
                  markPoint: {},//标记最高/最低点
                  markLine: {},  //标记中线
                  label: {   //显示文字
                      show: false,
                      color: '#ccc',
                      position: "top",
                      fontSize: 13,
                      fontWeight: 'line',
                      // fontFamily: 'DINPro-Medium'
                    
                  }
              }
          getSeries[i].showBackground ? quanseries.showBackground = getSeries[i].showBackground : quanseries.showBackground
          getSeries[i].label ? quanseries.label.show = getSeries[i].label : quanseries.label.show
          getSeries[i].smooth ? quanseries.smooth = getSeries[i].smooth : quanseries.smooth
          getSeries[i].areaStyle ? quanseries['areaStyle'] = {} : ''  //设置为面积
          getSeries[i].areaStyleColor ? quanseries['areaStyle'] = {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: getSeries[i].areaStyleColor.color1
              },
              {
                offset: 1,
                color: getSeries[i].areaStyleColor.color2
              }
            ])
          } : ''  //设置为面积
          getSeries[i].markPoint ? quanseries.markPoint = {
            data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' }
                  ]
          } : quanseries.markPoint
          getSeries[i].markLine ? quanseries.markLine = {
            data: [{ type: 'average', name: 'Avg' }]
          } : quanseries.markLine
          this.lineOption.series[i]= quanseries
        }
        // console.log(this.lineOption.series);

        // if (this.line.series.length == 1) {
        // } else {
        // }
      },

      /**
       * 处理数据
       * arr 原始数据
       * str 字段
       * return 处理过后的数据
       */
      // handleArr(arr){
      //   let arrData = []
      //   let arrName = []
      //   arr.map((item) => {
      //     arrData.push(item.data)
      //     arrName.push(item.name)
      //   });
      // },
      
    }
}
</script>

<style scoped>

</style>