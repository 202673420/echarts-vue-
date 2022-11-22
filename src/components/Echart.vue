<template>
    <!-- <div> -->
      <div ref="main" :style="option.style">echarts</div>
      <!-- <p>{{option}}</p> -->
    <!-- </div> -->
  
</template>

<script>
import * as echarts from 'echarts';
export default {
    name: 'Echart',
    props:{
      option:{
        type:Object,
        default(){
          return{}
        }
      },
    },
    data(){
      return {
        axisOption:{ //有坐标轴的配置对象
          // color:[],
          color:['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
          title: {
            text: '',
            subtext: '',
            left: 'center'
          },
          tooltip:{
            trigger: "axis"
          },
          grid: {
            show: false
          },
          legend: {},
          xAxis: {
            type: 'category',
            data: []
          },
           yAxis: {
            type: 'value'
          },
          series: []
        },
        normalOption:{ //无坐标轴的配置对象
          color:['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
          title: {
            text: '',
            subtext: '',
            left: 'center'
          },
          // radar: {
          //   indicator: [
          //     { name: 'Sales', max: 6500 },
          //     { name: 'Administration', max: 16000 },
          //     { name: 'Information Technology', max: 30000 },
          //     { name: 'Customer Support', max: 38000 },
          //     { name: 'Development', max: 52000 },
          //     { name: 'Marketing', max: 25000 }
          //   ]
          // },
          // radar:{},
          tooltip:{
            trigger: "item"
          },
          legend: {},
          series: []
        },
        isAxisChart:true
      }
    },

    computed: {
      options(){
        return this.option.type == 1 ? this.axisOption : this.normalOption
      }
    },
    watch:{
      // option:{
      //   handler: function(){
      //       this.init()
      //   },
      //   deep: true
      // }
      // style:{
      //   handler: function(){
      //       width=this.option.width
      //       height=this.option.height
      //   },
      //   deep: true
      // }
    },
    mounted(){
      this.init();
    },
    methods:{
      init(){
        var myChart = echarts.init(this.$refs.main);
        this.initChartData()
          // var option = {}
          //     option = this.axisOption
        // myChart.setOption(option);
        myChart.setOption(this.options);

        //当窗口大小发生变化的时候执行此函数
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      },
      initChartData(){
        if (this.option.type == 1) {
          this.option.title ? this.axisOption.title = this.option.title : this.axisOption.title
          this.option.color ? this.axisOption.color = this.option.color : this.axisOption.color
          this.option.grid ? this.axisOption.grid = this.option.grid : this.axisOption.grid
          this.axisOption.xAxis.data = this.option.xAxis.data
          this.axisOption.series = this.option.series
        } else {
          this.option.title ? this.normalOption.title = this.option.title : this.normalOption.title
          this.option.color ? this.normalOption.color = this.option.color : this.normalOption.color
          // this.option.series.type !== radar ? this.normalOption.radar=[]:this.normalOption.radar
          this.normalOption.series = this.option.series
          // console.log('22');
        }
      }
    }
}
</script>

<style scoped>

</style>