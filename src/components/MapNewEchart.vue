<template>
  <div :style="mapn.style?mapn.style:styles" class="map">
    <button class="backMap"  @click="backMap">返回</button>
    <div ref="charts"  :style="style">地图</div>
  </div>
  
</template>

<script>
  import * as echarts from 'echarts';
  // import yunnan from "@/assets/mapJson/yunnan.json"
  import { loopShowTooltip } from "../normal/tooltip-auto-show-vue";
  export default {
    name: "MapNewEchart",
    props: {
      mapn:{
        type:Object,
        default(){
          return{}
        }
      },
    },
    data () {
      return {
        dataMap:require('@/assets/mapJson/yunnan.json'), // 获取初始化省级地图数据
        styles:{
            width:'800px',
            height:'600px',
          },
        style:{
            width:'100%',
            height:'100%',
          },
          // mapData:this.mapn.mapData,
          mapOption:{
            // 背景颜色
            // backgroundColor: "#ccc",
            // 提示浮窗样式
            tooltip: {
              show: true,
              trigger: "item",
              alwaysShowContent: false,
              backgroundColor: "#0C121C",
              borderColor: "rgba(0, 0, 0, 0.16);",
              hideDelay: 100,
              triggerOn: "mousemove",
              enterable: true,
              textStyle: {
                color: "#DADADA",
                fontSize: "12",
                width: 20,
                height: 30,
                overflow: "break",
              },
              showDelay: 100,
              // formatter(params) {
              //     return `地区：${params.name}</br> ${params.value}`;
              // }
              formatter: '地区：{b}<br/>数据量：{c}',
            },

            toolbox: {  // 工具栏
              show: false,
              orient: 'vertical',
              right: '15%',
              top: '4.5%',
              feature: {
                saveAsImage: {}
              }
            },
            graphic:{
                // 水印类型
                type: 'text',
                // 相对于容器的位置
                left:'5%',
                top: '5%',
                // 样式设置
                style: {
                    // 文本内容
                    text: '',
                    // 字体粗细、大小、字体
                    font: 'bolder 1.5rem "Microsoft YaHei", sans-serif',
                    // 字体颜色
                    // fill: this.mapn.dark ? '#fff'  : '#333'
                    fill:'#333'
                }
            },
            visualMap: {
              min: 0,
              max: 8000,
              left: '3%',
              bottom: '5%',
              calculable: true,
              seriesIndex: [0],
              inRange: {
                color: ['#24CFF4', '#1E62AC']
                // color: this.mapn.color?this.mapn.color:['#24CFF4', '#1E62AC']
              },
              textStyle: {
                color: '#24CFF4'
              }
            },
            series: [
              {
                type: "map",
                map: 'yunnan',
                zoom:1,
                roam: false, 
                itemStyle: {
                  normal: {
                    color: "rgba(255, 235, 255, .7)",
                    shadowBlur: 10,
                    shadowColor: "#333",
                  },
                  emphasis: { // 鼠标移入动态的时候显示的默认样式
                    borderWidth: 1, // 边框宽度
                    // areaColor: '#ffffff' // 地图颜色
                  }
                },
                label:{
                  show: false, //显示地图地区名称
                  textBorderColor:'#fff',
                },
                data: [],
                // data: this.mapn.mapData,
              },
            ],
          }
        // mapData:[
        //   { name: "昆明市", value: 333 },
        //   { name: "曲靖市", value: 666 },
        //   { name: "玉溪市", value: 999 },
        //   { name: "昭通市", value: 1568 },
        //   { name: "楚雄彝族自治州", value: 6472 },
        //   { name: "丽江市", value: 666 },
        //   { name: "大理白族自治州", value: 2458 },
        //   { name: "迪庆藏族自治州", value: 222 },
        //   { name: "怒江傈僳族自治州", value: 555 },
        //   { name: "保山市", value: 7546 },
        //   { name: "临沧市", value: 5410 },
        //   { name: "普洱市", value: 1230 },
        //   { name: "德宏傣族景颇族自治州", value: 777 },
        //   { name: "文山壮族苗族自治州", value: 335 },
        //   { name: "红河哈尼族彝族自治州", value: 642 },
        //   { name: "西双版纳傣族自治州", value: 658 },
        // ]
      }
    },
    watch: {
      mapn: {
        handler:function() {
        this.initChartData()
        // console.log(newVal,oldVal);
      },
      // deep: true,
      immediate: true
      }
    },
    created () {
      this.$nextTick(() => {
        this.initCharts();
      })
    },
    methods: {
      initCharts() {
        const charts = echarts.init(this.$refs.charts,this.mapn.dark);

        //判断数据最大值
        var cityMax = parseInt(this.mapOption.series[0].data[0].value);
        for (var i = 0; i < this.mapOption.series[0].data.length - 1; i++) {
            cityMax = cityMax < parseInt(this.mapOption.series[0].data[i + 1].value) ? parseInt(this.mapOption.series[0].data[i + 1].value) : cityMax
        }
        // this.mapOption.visualMap.max = cityMax
        // console.log(cityMax);
        var arr = []
        var arr1 = []
        var str = cityMax.toString(); 
        for (var j = 0; j < str.length; j++) {
                arr1=parseInt(str[0]) +1
                arr.push(0);
            }
        // console.log(arr1);  
        arr[0]=arr1
        // console.log(arr);  
        // console.log(parseInt(arr.join('')));
        this.mapOption.visualMap.max = parseInt(arr.join(''))

         //自动播放tooltip
        if (this.mapn.tootipTimer) {
          this.tootipTimer && this.tootipTimer.clearLoop(); // this.tootipTimer 在data里定义
          this.tootipTimer = 0;
          this.tootipTimer = loopShowTooltip(charts, this.mapOption, {
            interval: 2000, // 轮播间隔时间
            loopSeries: true // 是否开启轮播循环
          });
        }

        charts.off('click') // 防止地图点击后多次渲染，导致页面卡顿
        charts.on('click',(data)=>{
        console.log(data.data)
        this.changeMap(data.data)
        })

        // 地图注册，第一个参数的名字必须和option.geo.map一致
        echarts.registerMap("yunnan",this.dataMap)

        charts.setOption(this.mapOption);

        //当窗口大小发生变化的时候执行此函数
        window.addEventListener("resize", function () {
          charts.resize();
        });
      },

      initChartData(){
        this.mapn.toolbox?this.mapOption.toolbox.show = this.mapn.toolbox:this.mapOption.toolbox.show
        this.mapn.title?this.mapOption.graphic.style.text = this.mapn.title.text:'云南地图数据展示'
        this.mapn.dark?this.mapOption.graphic.style.fill = '#fff':'#333'
        this.mapn.color?this.mapOption.visualMap.inRange.color = this.mapn.color:this.mapOption.visualMap.inRange.color
        this.mapn.labelShow?this.mapOption.series[0].label.show = this.mapn.labelShow : this.mapOption.series[0].label.show
        this.mapn.zoom?this.mapOption.series[0].zoom = this.mapn.zoom : this.mapOption.series[0].zoom
        this.mapn.roam?this.mapOption.series[0].roam = this.mapn.roam : this.mapOption.series[0].roam
        this.mapOption.series[0].data = this.mapn.mapData
      },

      // 区域判定方法，对点击获取到的数据进行判断，然后去赋值相应的城市json数据
        changeMap(data){
              if(data.name==='昆明市'){
                  this.dataMap=require('@/assets/mapJson/kunming.json')
                  // this.mapData=[
                  //   {name: '五华区',value: '1890'},
                  //   {name: '盘龙区',value: '3960'},
                  //   {name: '西山区',value: '3960'},
                  //   {name: '官渡区',value: '3960'},
                  //   {name: '呈贡区',value: '3960'},
                  //   {name: '晋宁区',value: '3960'},
                  //   {name: '东川区',value: '3960'},
                  //   {name: '安宁市',value: '3960'},
                  //   {name: '宜良县',value: '3960'},
                  //   {name: '石林彝族自治县',value: '3960'},
                  //   {name: '富民县',value: '3960'},
                  //   {name: '嵩明县',value: '3960'},
                  //   {name: '嵩明县',value: '3960'},
                  //   {name: '寻甸回族彝族自治县',value: '3960'},
                  //   {name: '禄劝彝族苗族自治县',value: '3960'},
                  //   {name: '禄劝彝族苗族自治县',value: '3960'},
                  //   ]
                  this.mapOption.series[0].data=this.mapn.kunming
                  this.initCharts()
              }else if (data.name==='曲靖市') {
                this.dataMap=require('@/assets/mapJson/qujing.json')
                  // this.mapData=[
                  //   {name: '富源县',value: '1890'},
                  //   {name: '罗平县',value: '1890'},
                  //   {name: '师宗县',value: '1890'},
                  //   {name: '陆良县',value: '1890'},
                  //   {name: '麒麟区',value: '1890'},
                  //   {name: '马龙区',value: '1890'},
                  //   {name: '沾益区',value: '1890'},
                  //   {name: '宣威市',value: '1890'},
                  //   {name: '会泽县',value: '1890'},
                  //   ]
                  this.mapOption.series[0].data=this.mapn.qujing
                  this.initCharts()
              }else if (data.name==='昭通市') {
                this.dataMap=require('@/assets/mapJson/zhaotong.json')
                  // this.mapData=[
                  //   {name: '绥江县',value: '1890'},
                  //   {name: '永善县',value: '1890'},
                  //   {name: '水富市',value: '1890'},
                  //   {name: '盐津县',value: '1890'},
                  //   {name: '大关县',value: '1890'},
                  //   {name: '彝良县',value: '1890'},
                  //   {name: '镇雄县',value: '1890'},
                  //   {name: '威信县',value: '1890'},
                  //   {name: '昭阳区',value: '1890'},
                  //   {name: '鲁甸县',value: '1890'},
                  //   {name: '巧家县',value: '1890'},
                  //   ]
                  this.mapOption.series[0].data=this.mapn.zhaotong
                  this.initCharts()
              }else if (data.name==='文山壮族苗族自治州') {
                this.dataMap=require('@/assets/mapJson/wenshan.json')
                  // this.mapData=[
                  //   {name: '富宁县',value: '1890'},
                  //   {name: '广南县',value: '1890'},
                  //   {name: '麻栗坡县',value: '1890'},
                  //   {name: '丘北县',value: '1890'},
                  //   {name: '砚山县',value: '1890'},
                  //   {name: '文山市',value: '1890'},
                  //   {name: '西畴县',value: '1890'},
                  //   {name: '马关县',value: '1890'},
                  //   ]
                  this.mapOption.series[0].data=this.mapn.wenshan
                  this.initCharts()
              }else if (data.name==='红河哈尼族彝族自治州') {
                this.dataMap=require('@/assets/mapJson/honghe.json')
                  // this.mapData=[
                  //   {name: '泸西县',value: '1890'},
                  //   {name: '弥勒市',value: '1890'},
                  //   {name: '开远市',value: '1890'},
                  //   {name: '建水县',value: '1890'},
                  //   {name: '石屏县',value: '1890'},
                  //   {name: '个旧市',value: '1890'},
                  //   {name: '蒙自市',value: '1890'},
                  //   {name: '红河县',value: '1890'},
                  //   {name: '元阳县',value: '1890'},
                  //   {name: '绿春县',value: '1890'},
                  //   {name: '屏边苗族自治县',value: '1890'},
                  //   {name: '河口瑶族自治县',value: '1890'},
                  //   {name: '金平苗族瑶族傣族自治县',value: '1890'},
                  //   ]
                  this.mapOption.series[0].data=this.mapn.honghe
                  this.initCharts()
              }else if (data.name==='玉溪市') {
                this.dataMap=require('@/assets/mapJson/yuxi.json')
                  // this.mapData=[
                  //   {name: '澄江市',value: '1890'},
                  //   {name: '华宁县',value: '1890'},
                  //   {name: '江川区',value: '1890'},
                  //   {name: '通海县',value: '1890'},
                  //   {name: '红塔区',value: '1890'},
                  //   {name: '易门县',value: '1890'},
                  //   {name: '峨山彝族自治县',value: '1890'},
                  //   {name: '新平彝族傣族自治县',value: '1890'},
                  //   {name: '元江哈尼族彝族傣族自治县',value: '1890'},
                  //   ]
                  this.mapOption.series[0].data=this.mapn.yuxi
                  this.initCharts()
              }else if (data.name==='楚雄彝族自治州') {
                this.dataMap=require('@/assets/mapJson/chuxiong.json')
                  // this.mapData=[
                  //   {name: '楚雄市',value: '1890'},
                  //   {name: '大姚县',value: '1890'},
                  //   {name: '永仁县',value: '1890'},
                  //   {name: '元谋县',value: '1890'},
                  //   {name: '武定县',value: '1890'},
                  //   {name: '姚安县',value: '1890'},
                  //   {name: '牟定县',value: '1890'},
                  //   {name: '禄丰市',value: '1890'},
                  //   {name: '南华县',value: '1890'},
                  //   {name: '双柏县',value: '1890'},
                  //   ]
                  this.mapOption.series[0].data=this.mapn.chuxiong
                  this.initCharts()
              }else if (data.name==='普洱市') {
                this.dataMap=require('@/assets/mapJson/puer.json')
                  // this.mapData=[
                  //   {name: '景东彝族自治县',value: '1890'},
                  //   {name: '镇沅彝族哈尼族拉祜族自治县',value: '1890'},
                  //   {name: '景谷傣族彝族自治县',value: '1890'},
                  //   {name: '宁洱哈尼族彝族自治县',value: '1890'},
                  //   {name: '墨江哈尼族自治县',value: '1890'},
                  //   {name: '思茅区',value: '1890'},
                  //   {name: '江城哈尼族彝族自治县',value: '1890'},
                  //   {name: '澜沧拉祜族自治县',value: '1890'},
                  //   {name: '西盟佤族自治县',value: '1890'},
                  //   {name: '孟连傣族拉祜族佤族自治县',value: '1890'},
                  //   ]
                  this.mapOption.series[0].data=this.mapn.puer
                  this.initCharts()
              }else if (data.name==='西双版纳傣族自治州') {
                this.dataMap=require('@/assets/mapJson/banna.json')
                  // this.mapData=[
                  //   {name: '勐海县',value: '1890'},
                  //   {name: '景洪市',value: '1890'},
                  //   {name: '勐腊县',value: '1890'},
                  //   ]
                  this.mapOption.series[0].data=this.mapn.banna
                  this.initCharts()
              }else if (data.name==='迪庆藏族自治州') {
                this.dataMap=require('@/assets/mapJson/diqing.json')
                  // this.mapData=[
                  //   {name: '德钦县',value: '1890'},
                  //   {name: '香格里拉市',value: '1890'},
                  //   {name: '维西傈僳族自治县',value: '1890'},
                  //   ]
                  this.mapOption.series[0].data=this.mapn.diqing
                  this.initCharts()
              }else if (data.name==='怒江傈僳族自治州') {
                this.dataMap=require('@/assets/mapJson/nujiang.json')
                  // this.mapData=[
                  //   {name: '贡山独龙族怒族自治县',value: '1890'},
                  //   {name: '福贡县',value: '1890'},
                  //   {name: '兰坪白族普米族自治县',value: '1890'},
                  //   {name: '泸水市',value: '1890'},
                  //   ]
                  this.mapOption.series[0].data=this.mapn.nujiang
                  this.initCharts()
              }else if (data.name==='丽江市') {
                this.dataMap=require('@/assets/mapJson/lijiang.json')
                  // this.mapData=[
                  //   {name: '玉龙纳西族自治县',value: '1890'},
                  //   {name: '古城区',value: '1890'},
                  //   {name: '宁蒗彝族自治县',value: '1890'},
                  //   {name: '永胜县',value: '1890'},
                  //   {name: '华坪县',value: '1890'},
                  //   ]
                  this.mapOption.series[0].data=this.mapn.lijiang
                  this.initCharts()
              }else if (data.name==='大理白族自治州') {
                this.dataMap=require('@/assets/mapJson/dali.json')
                  // this.mapData=[
                  //   {name: '剑川县',value: '1890'},
                  //   {name: '云龙县',value: '1890'},
                  //   {name: '洱源县',value: '1890'},
                  //   {name: '鹤庆县',value: '1890'},
                  //   {name: '永平县',value: '1890'},
                  //   {name: '漾濞彝族自治县',value: '1890'},
                  //   {name: '大理市',value: '1890'},
                  //   {name: '宾川县',value: '1890'},
                  //   {name: '巍山彝族回族自治县',value: '1890'},
                  //   {name: '祥云县',value: '1890'},
                  //   {name: '弥渡县',value: '1890'},
                  //   {name: '南涧彝族自治县',value: '1890'},
                  //   ]
                  this.mapOption.series[0].data=this.mapn.dali
                  this.initCharts()
              }else if (data.name==='保山市') {
                this.dataMap=require('@/assets/mapJson/baoshan.json')
                  // this.mapData=[
                  //   {name: '腾冲市',value: '1890'},
                  //   {name: '隆阳区',value: '1890'},
                  //   {name: '龙陵县',value: '1890'},
                  //   {name: '施甸县',value: '1890'},
                  //   {name: '昌宁县',value: '1890'},
                  //   ]
                  this.mapOption.series[0].data=this.mapn.baoshan
                  this.initCharts()
              }else if (data.name==='德宏傣族景颇族自治州') {
                this.dataMap=require('@/assets/mapJson/dehong.json')
                  // this.mapData=[
                  //   {name: '盈江县',value: '1890'},
                  //   {name: '梁河县',value: '1890'},
                  //   {name: '陇川县',value: '1890'},
                  //   {name: '芒市',value: '1890'},
                  //   {name: '瑞丽市',value: '1890'},
                  //   ]
                  this.mapOption.series[0].data=this.mapn.dehong
                  this.initCharts()
              }else if (data.name==='临沧市') {
                this.dataMap=require('@/assets/mapJson/lincang.json')
                  // this.mapData=[
                  //   {name: '凤庆县',value: '1890'},
                  //   {name: '云县',value: '1890'},
                  //   {name: '永德县',value: '1890'},
                  //   {name: '临翔区',value: '1890'},
                  //   {name: '耿马傣族佤族自治县',value: '1890'},
                  //   {name: '镇康县',value: '1890'},
                  //   {name: '双江拉祜族佤族布朗族傣族自治县',value: '1890'},
                  //   {name: '沧源佤族自治县',value: '1890'},
                  //   ]
                  this.mapOption.series[0].data=this.mapn.lincang
                  this.initCharts()
              }
        },

        // 点击返回按钮事件，如果当前是市区地图的话点击按钮就会返回到省级地图，参数就相当于是初始加载数据，
        //如果是点击到县里面的话就要修改逻辑了，这里只有两级判断
        backMap(){
              this.dataMap=require('@/assets/mapJson/yunnan.json')
              // this.mapData=[
              //   { name: "昆明市", value: 333 },
              //   { name: "曲靖市", value: 666 },
              //   { name: "玉溪市", value: 999 },
              //   { name: "昭通市", value: 1568 },
              //   { name: "楚雄彝族自治州", value: 6472 },
              //   { name: "丽江市", value: 666 },
              //   { name: "大理白族自治州", value: 2458 },
              //   { name: "迪庆藏族自治州", value: 222 },
              //   { name: "怒江傈僳族自治州", value: 555 },
              //   { name: "保山市", value: 7546 },
              //   { name: "临沧市", value: 5410 },
              //   { name: "普洱市", value: 1230 },
              //   { name: "德宏傣族景颇族自治州", value: 777 },
              //   { name: "文山壮族苗族自治州", value: 335 },
              //   { name: "红河哈尼族彝族自治州", value: 642 },
              //   { name: "西双版纳傣族自治州", value: 658 },
              // ]
              this.mapOption.series[0].data=this.mapn.mapData
              this.initCharts()
        }
    },
  }
</script>
<style scoped>
  .map{
    position: relative;
  }
 .backMap{
   position: absolute;
   top: 5%;
   right: 8%;
   z-index: 999;
   background: #2883bf;
   border-radius: 4px;
   color: #fff;
   padding: 2px 8px;
   border: none;
   cursor: pointer;
 }
</style>