<template>
  <div id="app">
    <!-- 柱状图，折线图，拼图封 -->
    <echart :option="options"></echart>
    <echart :option="options1"></echart>
    <echart :option="options2"></echart>

    <!-- 组件封装使用 -->
    <bar-echart :bar="bars"></bar-echart>
    <pie-echart :pie="pies"></pie-echart>
    <line-echart :line="lines"></line-echart>
    <radar-echart :radar="radars"></radar-echart>
    <map-new-echart :mapn="maps"></map-new-echart>
    <gauge-echart :gauge="gauges"></gauge-echart>
    <scatter-echart :scatter="scatters"></scatter-echart>
    <thermometer-echart :thermometer="thermometers"></thermometer-echart>

    <!-- 方法封装使用 -->
    <div id="bar" style="width:600px;height:400px"></div>
    <div id="pie" style="width:600px;height:400px"></div>
    <div id="line" style="width:600px;height:400px"></div>
    <div id="radar" style="width:600px;height:400px"></div>
    <div id="map" style="width:800px;height:600px"></div>
    <div id="gauge" style="width:600px;height:400px"></div>
    <div id="scatter" style="width:600px;height:400px"></div>
    <div id="thermometer" style="width:600px;height:400px"></div>

  </div>
</template>

<script>
import Echart from './components/Echart.vue'
import BarEchart from './components/BarEchart.vue'
import PieEchart from './components/PieEchart.vue'
import LineEchart from './components/LineEchart.vue'
import RadarEchart from './components/RadarEchart.vue'
import MapNewEchart from './components/MapNewEchart.vue'
import GaugeEchart from './components/GaugeEchart.vue'
import ScatterEchart from './components/ScatterEchart.vue'
import ThermometerEchart from './components/ThermometerEchart.vue'

export default {
  name: 'App',
  components: {
    Echart,
    BarEchart,
    PieEchart,
    LineEchart,
    RadarEchart,
    MapNewEchart,
    GaugeEchart,
    ScatterEchart,
    ThermometerEchart,
  },
  data(){
    return{
      options:{
        // title:{           //非必传值
        //     text:'标题',
        //     textStyle: {
        //       fontSize: 30,
        //       color: "rgba(187, 24, 24, 1)"
        //     },
        //   }, 
          // grid: {     //非必传值
          //   show: true
          // },
          // color:['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'], //非必传值
          style:{ //必传值
            width:'600px',
            height:'400px',
          },
          xAxis:{ //必传值-
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
          series:[ //必传值
            {
              name:'dd',
              data: [120, 132, 101, 134, 90, 230, 210],
              type: 'bar',
              symbol: 'none',
            },
            {
              name:'ff',
              data: [20, 32, 10, 34, 9, 23, 10],
              type: 'bar',
              symbol: 'none',
            }
          ],
          type:'1' //必传值 当为1时，表示有坐标轴，0表示无坐标轴
      },
      options1:{
        // title:{text:'标题'},
        style:{
            width:'600px',
            height:'400px',
          },
          series:[
                {
                  name: 'Access From',
                  type: 'pie',
                  radius: ['40%', '70%'],
                  avoidLabelOverlap: false,
                  itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                  },
                  label: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: '40',
                      fontWeight: 'bold'
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                  ]
                }
              ],
          type:'0'
      },
      options2:{
         // title:{text:'标题'},
         style:{
            width:'600px',
            height:'400px',
          },
        xAxis:{
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          series:[
            {
              name:'gg',
              data: [120, 132, 101, 134, 90, 230, 210],
              type: 'line',
              smooth: true
            },
            {
              name:'hh',
              data: [20, 32, 10, 34, 9, 23, 10],
              type: 'line',
              smooth: true
            }
          ],
          type:'1'
      },

    //注意，非必传值表示这一字段都可以不传，而不是改为false，或者空

      //柱状图
      bars:{
        dark:'dark',  //非必传值，深色模式
        title:{     //非必传值
            text:'标题',
          }, 
          color:['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'], //非必传值
          toolbox:true,   //非必传值， 表示是否需要工具栏
          legend:true,   //非必传值， 表示是否需要图例
          tootipTimer:true, //非必传值，表示是否开启tootip自动轮播
          style:{ //非必传值
            width:'600px',
            height:'400px',
          },
          yAxisName:'y轴名称',   //非必传值， 表示是否需要y轴名称
          axisLine:true,    //非必传值， 表示是否需要y轴线
          sjdw:'￥',    //非必传值， 表示是否需要y轴数据单位
          yAxisRight:{
                        //非必传值， 表示是否需要多y轴实例，默认一条Y轴为left，多Y轴表示多加一条right的Y轴，
                        //如果设置了yAxisRight多Y轴实例，就必须在series里面确定那条数据为right的Y轴数据（yAxisIndex属性），两属性同存同失
            yAxisNameRight:'右边y轴名称',   //非必传值， 表示是否需要右边y轴名称
            axisLineRight:true,    //非必传值， 表示是否需要右边y轴线
            sjdwRight:'$',    //非必传值， 表示是否需要右边y轴数据单位
          },
          xAxis:{ //必传值
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
          series:[ //必传值
            {
              name:'dd',
              data: [120, 132, 101, 134, 90, 230, 210],
              label:true,   //非必传值, 是否显示柱子文字
              showBackground:true,    //非必传值, 是否显示柱子背景
              stack:true ,//非必传值, 是否瀑布柱子,多个柱子设置时有效
            },
            {
              name:'ff',
              data: [20, 32, 10, 34, 9, 23, 10],
            },
            {
              type: 'line',     //非必传值, 是否显则线图、柱状图混合
              name:'77',
              data: [60, 82, 20, 54, 2, 13, 31],
              yAxisIndex:1    //此属性为确定多Y轴实例时right的Y轴的数据，当设置yAxisRight多Y轴属性时，此参数必传
            },
            {
              name:'55',
              data: [30, 52, 2, 86, 72, 33, 61],
            },
          ]
      },

      //饼图
      pies:{
        // dark:'dark',  //非必传值，深色模式
        title:{     //非必传值
            text:'标题',
          }, 
          color:['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'], //非必传值
          toolbox:true,   //非必传值， 表示是否需要工具栏
          legend:true,   //非必传值， 表示是否需要图例
          tootipTimer:true, //非必传值，表示是否开启tootip自动轮播
          style:{ //非必传值
            width:'600px',
            height:'400px',
          },
          series:[ //必传值
            {
              name:'dd', //       必传值
              radius:'60%', //       必传值           radius可设置一个值或两个值，两个值时为数组，图例为圆环,值分别控制内外圆的大小
              // radius:['40%','60%'],   //  radius 为两个值时，传入roseType为true可设置为南丁格尔玫瑰图
              roseType:false,    //非必传值， 表示是否设置为南丁格尔玫瑰图
              yuanjioa:false,      //非必传值， 表示是否需要普通图例圆角或者圆环圆角
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
              ]
            },
          ]
      },

      //折线图
      lines:{
        // dark:'dark',  //非必传值，深色模式
          title:{     //非必传值
            text:'标题',
          }, 
          color:['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'], //非必传值
          toolbox:true,   //非必传值， 表示是否需要工具栏
          legend:true,   //非必传值， 表示是否需要图例
          tootipTimer:true, //非必传值，表示是否开启tootip自动轮播
          style:{ //非必传值
            width:'600px',
            height:'400px',
          },
          yAxisName:'y轴名称',   //非必传值， 表示是否需要y轴名称
          axisLine:true,    //非必传值， 表示是否需要y轴线
          sjdw:'￥',    //非必传值， 表示是否需要y轴数据单位
          xAxis:{ //必传值
              boundaryGap:false,   //非必传值，折线是否占满X轴，为false表示占满，为true表示不占满，不传默认占满
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
          series:[ //必传值
            {
              name:'dd', //必传值
              data: [120, 132, 101, 134, 90, 190, 150], //必传值
              label:true,   //非必传值, 是否显示折线文字
              showBackground:true,    //非必传值, 是否显示柱子背景
              smooth:true,   //非必传值，是否设置为平滑曲线
              areaStyle: false,   //非必传值，是否设置为面积图    areaStyle为true时不传areaStyleColor，
              areaStyleColor:    //非必传值，是否设置为面积渐变图
                {
                  color1:'rgb(0, 221, 255)',
                  color2:'rgb(77, 119, 255)',
                },
              markPoint:true,  //非必传值, 是否标记最高 / 最低点
              markLine:true,  //非必传值, 是否标记中线
            },
            {
              name:'ff',
              data: [20, 32, 10, 34, 9, 23, 10],
              areaStyle: true,   //非必传值，是否设置为面积图
            },
            {
              name:'55',
              data: [15, 3, 120, 13, 19, 123, 50],
            },
          ]
      },

      //雷达
      radars:{
        // dark:'dark',  //非必传值，深色模式
        title:{     //非必传值
            text:'标题',
          }, 
          color:['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'], //非必传值
          shape: true,  //非必传值， 图例背景线条是否设置为圆形
          toolbox:true,   //非必传值， 表示是否需要工具栏
          legend:true,   //非必传值， 表示是否需要图例
          style:{ //非必传值
            width:'600px',
            height:'400px',
          },
          indicator: [  //必传值
            { name: 'Sales', max: 6500 },
            { name: 'Administration', max: 16000 },
            { name: 'Information Technology', max: 30000 },
            { name: 'Customer Support', max: 38000 },
            { name: 'Development', max: 52000 },
            { name: 'Marketing', max: 25000 }
          ],
          center:["50%","60%"], //非必传值， 图例位置
          radius: '60%', //非必传值， 图例大小
          series:[ //必传值
            {
              name:'dd', //       必传值
              data: [
                {
                  value: [4200, 3000, 20000, 35000, 50000, 18000],
                  name: 'Allocated Budget'
                },
                {
                  value: [5000, 14000, 28000, 26000, 42000, 21000],
                  name: 'Actual Spending'
                }
              ]
            },
          ]
      },

      //地图
      maps:{
        dark:'dark',  //非必传值，深色模式
        labelShow: true, //非必传值，是否显示地图地区名称
        title:{     //非必传值
          text:'云南地图数据展示',
        }, 
        color:['#24CFF4', '#1E62AC'], //非必传值，地图过度颜色,可接收一个或多个
        zoom:1.1,    //非必传值， 表示地图缩放比例
        // roam: true,   //非必传值， 表示地图是否可以缩放
        toolbox:true,   //非必传值， 表示是否需要工具栏
        tootipTimer:true, //非必传值，表示是否开启tootip自动轮播
        style:{        //非必传值
          width:'800px',
          height:'600px',
        },
        mapData:[
          { name: "昆明市", value: 333 },
          { name: "曲靖市", value: 666 },
          { name: "玉溪市", value: 999 },
          { name: "昭通市", value: 1568 },
          { name: "楚雄彝族自治州", value: 6472 },
          { name: "丽江市", value: 666 },
          { name: "大理白族自治州", value: 2458 },
          { name: "迪庆藏族自治州", value: 222 },
          { name: "怒江傈僳族自治州", value: 555 },
          { name: "保山市", value: 7546 },
          { name: "临沧市", value: 5410 },
          { name: "普洱市", value: 1230 },
          { name: "德宏傣族景颇族自治州", value: 777 },
          { name: "文山壮族苗族自治州", value: 335 },
          { name: "红河哈尼族彝族自治州", value: 642 },
          { name: "西双版纳傣族自治州", value: 658 },
        ],
        kunming:[
          {name: '五华区',value: '1890'},
          {name: '盘龙区',value: '3960'},
          {name: '西山区',value: '4567'},
          {name: '官渡区',value: '3960'},
          {name: '呈贡区',value: '3960'},
          {name: '晋宁区',value: '3960'},
          {name: '东川区',value: '3960'},
          {name: '安宁市',value: '3960'},
          {name: '宜良县',value: '3960'},
          {name: '石林彝族自治县',value: '3960'},
          {name: '富民县',value: '3960'},
          {name: '嵩明县',value: '3960'},
          {name: '寻甸回族彝族自治县',value: '3960'},
          {name: '禄劝彝族苗族自治县',value: '3960'},
        ],
        qujing:[
          {name: '富源县',value: '1890'},
          {name: '罗平县',value: '1890'},
          {name: '师宗县',value: '1890'},
          {name: '陆良县',value: '1890'},
          {name: '麒麟区',value: '1890'},
          {name: '马龙区',value: '1890'},
          {name: '沾益区',value: '1890'},
          {name: '宣威市',value: '1890'},
          {name: '会泽县',value: '1890'},
        ],
        zhaotong:[
          {name: '绥江县',value: '1890'},
          {name: '永善县',value: '1890'},
          {name: '水富市',value: '1890'},
          {name: '盐津县',value: '1890'},
          {name: '大关县',value: '1890'},
          {name: '彝良县',value: '1890'},
          {name: '镇雄县',value: '1890'},
          {name: '威信县',value: '1890'},
          {name: '昭阳区',value: '1890'},
          {name: '鲁甸县',value: '1890'},
          {name: '巧家县',value: '1890'},
        ],
        wenshan:[
          {name: '富宁县',value: '1890'},
          {name: '广南县',value: '1890'},
          {name: '麻栗坡县',value: '1890'},
          {name: '丘北县',value: '1890'},
          {name: '砚山县',value: '1890'},
          {name: '文山市',value: '1890'},
          {name: '西畴县',value: '1890'},
          {name: '马关县',value: '1890'},
        ],
        honghe:[
          {name: '泸西县',value: '1890'},
          {name: '弥勒市',value: '1890'},
          {name: '开远市',value: '1890'},
          {name: '建水县',value: '1890'},
          {name: '石屏县',value: '1890'},
          {name: '个旧市',value: '1890'},
          {name: '蒙自市',value: '1890'},
          {name: '红河县',value: '1890'},
          {name: '元阳县',value: '1890'},
          {name: '绿春县',value: '1890'},
          {name: '屏边苗族自治县',value: '1890'},
          {name: '河口瑶族自治县',value: '1890'},
          {name: '金平苗族瑶族傣族自治县',value: '1890'},
        ],
        yuxi:[
          {name: '澄江市',value: '1890'},
          {name: '华宁县',value: '1890'},
          {name: '江川区',value: '1890'},
          {name: '通海县',value: '1890'},
          {name: '红塔区',value: '1890'},
          {name: '易门县',value: '1890'},
          {name: '峨山彝族自治县',value: '1890'},
          {name: '新平彝族傣族自治县',value: '1890'},
          {name: '元江哈尼族彝族傣族自治县',value: '1890'},
        ],
      },

      //仪表
      gauges:{
        // dark:'dark',  //非必传值，深色模式
        title:{     //非必传值
            text:'标题',
        }, 
        toolbox:true,   //非必传值， 表示是否需要工具栏
        style:{ //非必传值
          width:'600px',
          height:'400px',
        },
        // sjshow:false,    //非必传值，是否需要数据展示背景,默认有背景
        sjzswidth:10,     //非必传值，是否需要设置数据展示背景宽度
        ybwidth:20,       //非必传值，是否需要设置数仪表宽度
        // anchor:false,     //非必传值，是否需要指针圆圈，默认需要
        djcolor: [         //非必传值，是否需要等级阶段颜色表示
          [0.3, '#67e0e3'],  
          [0.7, '#37a2da'],
          [1, '#fd666d']
        ],
        data: [  //必传值
          {
            value: 60,
            name:'数据标题'
          }
        ]
      },

       //散点图
      scatters:{
        dark:'dark',  //非必传值，深色模式
        title:{     //非必传值
            text:'标题',
          }, 
          sdcolor:'#188df0', //非必传值，散点颜色
          linecolor:'#188df0', //非必传值，回归线颜色
          tootipTimer:true, //非必传值，表示是否开启tootip自动轮播
          // dataset:false,      //非必传值，表示是否需要回归线，默认有回归线
          // exponential:true,   //非必传值，表示回归线是否需要直线，默认曲线
          style:{ //非必传值
            width:'600px',
            height:'400px',
          },
          data: [     //必传值
            [10.0, 8.04],
            [8.07, 6.95],
            [13.0, 7.58],
            [9.05, 8.81],
            [11.0, 8.33],
            [14.0, 7.66],
            [13.4, 6.81],
            [10.0, 6.33],
            [14.0, 8.96],
            [12.5, 6.82],
            [9.15, 7.2],
            [11.5, 7.2],
            [3.03, 4.23],
            [12.2, 7.83],
            [2.02, 4.47],
            [1.05, 3.33],
            [4.05, 4.96],
            [6.03, 7.24],
            [12.0, 6.26],
            [12.0, 8.84],
            [7.08, 5.82],
            [5.02, 5.68]
          ]
      },

      //温度计
      thermometers:{
        dark:'dark',  //非必传值，深色模式
        title:{     //非必传值
            text:'温度计',
        }, 
        style:{ //非必传值
          width:'600px',
          height:'400px',
        },
        minscale:-20,  //必传值 最小温度刻度线，总刻度分为六个，间隔20，设置最小温度刻度最高温度刻度会自动调整
        dataValue: 30.6   //必传值 温度
      },

    }
  },
  mounted(){
      this.$charts.barEchart("bar",this.bars)
      this.$charts.pieEchart("pie",this.pies)
      this.$charts.lineEchart("line",this.lines)
      this.$charts.radarEchart("radar",this.radars)
      this.$charts.mapEchart("map",this.maps)
      this.$charts.gaugeEchart("gauge",this.gauges)
      this.$charts.scatterEchart("scatter",this.scatters)
      this.$charts.thermometerEchart("thermometer",this.thermometers)
      // this.dingshi()
  },
  methods:{
    dingshi(){
        var that = this
        setInterval(function(){
          // console.log('1');
          // console.log(that.bar);
          that.bars.xAxis.data.push('s1')
          that.bars.series[0].data.push(20)
        },5000)
      },
  }
}
</script>

<style>

</style>
