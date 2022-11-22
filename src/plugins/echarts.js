import * as echarts from 'echarts'
import { loopShowTooltip } from "../normal/tooltip-auto-show-vue";

const install = function (Vue){
    Object.defineProperties(Vue.prototype,{
      $charts:{
        get() {
          return {
            // 柱状图
            barEchart:function (id,bar) {

              var myEchart = echarts.init(document.getElementById(id),bar.dark)
              var colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']

              var option = {
                    // color:['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'], //默认颜色
                    color:bar.color?bar.color:colors, //默认颜色
                    title: {
                    text: bar.title ? bar.title.text : '',
                    subtext: '',
                    left:"left",
                    textStyle: {
                        fontSize: 18,
                        color: bar.dark?'#fff':'#333'
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
                        show: bar.legend ? bar.legend: false,
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
                        data: bar.xAxis.data,
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
                        name: bar.yAxisName?bar.yAxisName:'',
                        position: 'left',
                        nameLocation: 'end',
                        // splitNumber:10,
                        nameTextStyle: {
                            color: '#969696'
                        },
                        axisLine: {
                            show: bar.axisLine?bar.axisLine:false,  //是否需要Y轴线
                            lineStyle: {
                            color: '#ccc'
                            }
                        },
                        axisLabel: {
                            // color: '#1E1E1E',
                            formatter:bar.sjdw?'{value} / '+bar.sjdw:'{value}',
                            fontSize: 10
                        },
                        min: 0,
                        max: 1, // 右侧y轴最大值
                        interval: 1, // 间距等分为10等分
                        }
                    ],
                    dataZoom: [   //鼠标滚动可缩放
                        {
                        type: 'inside'
                        }
                    ],
                    toolbox: {   //是否需要工具栏
                        show: bar.toolbox?bar.toolbox:false,
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
                  }

                var is = 0
                const maxY1 = parseInt((Math.max(...bar.series[0].data) + 200) / 100) * 100
                // const maxY2 = parseInt((Math.max(...this.bar.series[2].data) + 10) / 10) * 10
                
                //判断this.bar.series里面的对象里面哪个含有yAxisIndex字段，并拿到对应的下标
                for (let i = 0; i < bar.series.length; i++){
                    if (bar.series[i].yAxisIndex) {
                        is = i
                    }
                }
                
                const maxY2 = parseInt((Math.max(...bar.series[is].data) + 10) / 10) * 10

                option.yAxis[0].max = maxY1
                option.yAxis[0].interval = Math.ceil(maxY1 / 5)
                
                // 判断是否需要双y轴
                if(bar.yAxisRight){
                    option.yAxis.push(
                        {
                            type: 'value',
                            axisTick: {show: true},
                            // name: '',
                            name:  bar.yAxisRight.yAxisNameRight ?  bar.yAxisRight.yAxisNameRight : '',
                            position: 'right',
                            nameLocation: 'end',
                            // splitNumber:10,
                            nameTextStyle: {
                              color: '#969696'
                            },
                            axisLine: {
                              // show: false,  //是否需要Y轴线
                              show:  bar.yAxisRight.axisLineRight ?  bar.yAxisRight.axisLineRight : false,  //是否需要Y轴线
                              lineStyle: {
                                color: '#ccc'
                              }
                            },
                            axisLabel: {
                              // color: '#1E1E1E',
                              // formatter:this.bar.sjdw?'{value} / '+this.bar.sjdw:'{value}',
                              formatter: bar.yAxisRight.sjdwRight?'{value} / '+ bar.yAxisRight.sjdwRight:'{value}',  //是否需要Y轴数据单位
                              fontSize: 10
                            },
                            min: 0,
                            max: maxY2, // 右侧y轴最大值
                            interval: Math.ceil(maxY2 / 5), // 间距等分为5等分
                          }
                    )
                }
              
                // 遍历series
                let getSeries = bar.series
              for (let i = 0; i < getSeries.length; i++) {
                var quanseries = {
                        // type: 'bar',
                        type: getSeries[i].type?getSeries[i].type:'bar',
                        showBackground: false, //柱子是否带背景
                        stack: '', //是否瀑布柱子
                        name: getSeries[i].name,
                        data:  getSeries[i].data,
                        yAxisIndex: getSeries[i].yAxisIndex,
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
                option.series[i] = quanseries
                // console.log(quanseries);
              }
            // option.series.push(quanseries)
            // console.log(quanseries);
            //   console.log(option.series);

            //自动播放tooltip
            var tootipTimer = 0
            if (bar.tootipTimer) {
                tootipTimer && tootipTimer.clearLoop(); // this.tootipTimer 在data里定义
                tootipTimer = 0;
                tootipTimer = loopShowTooltip(myEchart, option, {
                interval: 2000, // 轮播间隔时间
                loopSeries: true // 是否开启轮播循环
                });
            }

              myEchart.setOption(option)

            },
            // 饼图
            pieEchart:function (id,pie) {
                var myEchart = echarts.init(document.getElementById(id),pie.dark)
                var colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']

                var option = {
                    color:pie.color?pie.color:colors, //默认颜色
                    title: {
                        text: pie.title ? pie.title.text : '',
                        subtext: '',
                        left:"left",
                        textStyle: {
                        fontSize: 18,
                        color: pie.dark?'#fff':'#333'
                        },
                    },
                    tooltip:{
                        confine: true
                    },
                    legend: {    //图例
                        type: "plain",
                        show: pie.legend ? pie.legend: false,
                        left: "center",
                        top: "5%",
                        orient: "horizontal"
                    },
                    toolbox: {
                        show: pie.toolbox?pie.toolbox:false,
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
                }

                let getSeries = pie.series
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
                
                option.series.push(quanseries)

                //自动播放tooltip
                var tootipTimer = 0
                if (pie.tootipTimer) {
                    tootipTimer && tootipTimer.clearLoop(); // this.tootipTimer 在data里定义
                    tootipTimer = 0;
                    tootipTimer = loopShowTooltip(myEchart, option, {
                    interval: 2000, // 轮播间隔时间
                    loopSeries: true // 是否开启轮播循环
                    });
                }

                myEchart.setOption(option)
            },
            // 折线图
            lineEchart:function (id,line) {
                var myEchart = echarts.init(document.getElementById(id),line.dark)
                var colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']

                var option = {
                    color:line.color?line.color:colors, //默认颜色
                    title: {
                        text: line.title ? line.title.text : '',
                        subtext: '',
                        left:"left",
                        textStyle: {
                        fontSize: 18,
                        color: line.dark?'#fff':'#333'
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
                        show: line.legend ? line.legend: false,
                        left: "center",
                        top: "8%"
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: line.xAxis.boundaryGap, //折线是否占满X轴
                        // axisLabel:{
                        //   interval: 0,
                        //   color: '#1E1E1E',
                        //   rotate: 25,
                        //   fontSize: 10,
                        //   margin: 10
                        // },
                        triggerEvent: true,
                        data: line.xAxis.data,
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
                        name: line.yAxisName?line.yAxisName:'',
                        nameLocation: 'end',
                        nameTextStyle: {
                            color: '#969696'
                        },
                        axisLine: {
                            show: line.axisLine?line.axisLine:false,  //是否需要Y轴线
                            lineStyle: {
                            color: '#ccc'
                            }
                        },
                        axisLabel: {
                        //   color: '#1E1E1E',
                          formatter:line.sjdw?'{value} / '+line.sjdw:'{value}',
                          fontSize: 10
                        }
                        },
                        dataZoom: [   //鼠标滚动可缩放
                        {
                            type: 'inside'
                        }
                        ],
                        toolbox: {   //是否需要工具栏
                        show: line.toolbox?line.toolbox:false,
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
                }

                 // 遍历series
                 let getSeries = line.series
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
                    option.series[i]= quanseries
                  }

                //自动播放tooltip
                var tootipTimer = 0
                if (line.tootipTimer) {
                    tootipTimer && tootipTimer.clearLoop(); 
                    tootipTimer = 0;
                    tootipTimer = loopShowTooltip(myEchart, option, {
                    interval: 2000, // 轮播间隔时间
                    loopSeries: true // 是否开启轮播循环
                    });
                }

                myEchart.setOption(option)
            },
            // 雷达
            radarEchart:function (id,radar) {
                var myEchart = echarts.init(document.getElementById(id),radar.dark)
                var colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']

                var option = {
                    color:radar.color?radar.color:colors, //默认颜色
                    title: {
                        text: radar.title ? radar.title.text : '',
                        subtext: '',
                        left:"left",
                        textStyle: {
                        fontSize: 18,
                        color: radar.dark?'#fff':'#333'
                        },
                    },
                    tooltip:{
                        confine: true
                    },
                    legend: {    //图例
                        type: "plain",
                        show: radar.legend ? radar.legend: false,
                        left: "center",
                        top: "5%",
                        orient: "horizontal"
                    },
                    toolbox: {
                    show: radar.toolbox?radar.toolbox:false,
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
                    shape: radar.shape?'circle':'',  //图例背景线条设置为圆形
                    center:radar.center ?radar.center :["50%","60%"], //图例位置
                    triggerEvent: true,
                    radius: radar.radius ?radar.radius :'60%', //图例大小
                    // splitArea:{
                    //     show : true,   
                    //     areaStyle : {
                    //         color: ["#fff"]  // 图例背景网格的颜色
                    //     }
                    // },
                    indicator: radar.indicator
                    },
                    series: [],
                }

                let getSeries = radar.series
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
                option.series[0]=quanseries

                myEchart.setOption(option)
            },
            // 地图
            mapEchart:function (id,map) {
                var myEchart = echarts.init(document.getElementById(id),map.dark)

                var dataMap = require('@/assets/mapJson/yunnan.json')

                var option = {
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
                        show: map.toolbox?map.toolbox:false,
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
                            text: map.title?map.title.text:'云南地图数据展示',
                            // 字体粗细、大小、字体
                            font: 'bolder 1.5rem "Microsoft YaHei", sans-serif',
                            // 字体颜色
                            // fill: this.map.dark ? '#fff'  : '#333'
                            fill:map.dark?'#fff':'#333'
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
                        // color: ['#24CFF4', '#1E62AC']
                        color: map.color?map.color:['#24CFF4', '#1E62AC']
                        },
                        textStyle: {
                        color: '#24CFF4'
                        }
                    },
                    series: [
                        {
                        type: "map",
                        map: 'yunnan',
                        zoom:map.zoom?map.zoom:1,
                        roam: map.roam?map.roam:false, 
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
                            show: map.labelShow?map.labelShow:false, //显示地图地区名称
                            textBorderColor:'#fff',
                        },
                        data: map.mapData,
                        // data: [],
                        },
                    ],
                }

                //判断数据最大值
                var cityMax = parseInt(option.series[0].data[0].value);
                for (var i = 0; i < option.series[0].data.length - 1; i++) {
                    cityMax = cityMax < parseInt(option.series[0].data[i + 1].value) ? parseInt(option.series[0].data[i + 1].value) : cityMax
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
                option.visualMap.max = parseInt(arr.join(''))

                //自动播放tooltip
                var tootipTimer = 0
                if (map.tootipTimer) {
                    tootipTimer && tootipTimer.clearLoop(); // this.tootipTimer 在data里定义
                    tootipTimer = 0;
                    tootipTimer = loopShowTooltip(myEchart, option, {
                    interval: 2000, // 轮播间隔时间
                    loopSeries: true // 是否开启轮播循环
                    });
                }

                myEchart.off('click') // 防止地图点击后多次渲染，导致页面卡顿
                myEchart.on('click',(data)=>{
                // console.log(data.data)
                changeMap(data.data)
                })

                function initCharts() {
                    myEchart = echarts.init(document.getElementById(id),map.dark)
                    echarts.registerMap("yunnan",dataMap)
                    myEchart.setOption(option)
                }

                // 区域判定方法，对点击获取到的数据进行判断，然后去赋值相应的城市json数据
                function changeMap(data){
                    if(data.name==='昆明市'){
                        dataMap=require('@/assets/mapJson/kunming.json')
                        option.series[0].data=map.kunming
                        initCharts()
                    }else if (data.name==='曲靖市') {
                        dataMap=require('@/assets/mapJson/qujing.json')
                        option.series[0].data=map.qujing
                        initCharts()
                    }else if (data.name==='昭通市') {
                        dataMap=require('@/assets/mapJson/zhaotong.json')
                        option.series[0].data=map.zhaotong
                        initCharts()
                    }else if (data.name==='文山壮族苗族自治州') {
                        dataMap=require('@/assets/mapJson/wenshan.json')
                        option.series[0].data=map.wenshan
                        initCharts()
                    }else if (data.name==='红河哈尼族彝族自治州') {
                        dataMap=require('@/assets/mapJson/honghe.json')
                        option.series[0].data=map.honghe
                        initCharts()
                    }else if (data.name==='玉溪市') {
                        dataMap=require('@/assets/mapJson/yuxi.json')
                        option.series[0].data=map.yuxi
                        initCharts()
                    }else if (data.name==='楚雄彝族自治州') {
                        dataMap=require('@/assets/mapJson/chuxiong.json')
                        option.series[0].data=map.chuxiong
                        initCharts()
                    }else if (data.name==='普洱市') {
                        dataMap=require('@/assets/mapJson/puer.json')
                        option.series[0].data=map.puer
                        initCharts()
                    }else if (data.name==='西双版纳傣族自治州') {
                        dataMap=require('@/assets/mapJson/banna.json')
                        option.series[0].data=map.banna
                        initCharts()
                    }else if (data.name==='迪庆藏族自治州') {
                        dataMap=require('@/assets/mapJson/diqing.json')
                        option.series[0].data=map.diqing
                        initCharts()
                    }else if (data.name==='怒江傈僳族自治州') {
                        dataMap=require('@/assets/mapJson/nujiang.json')
                        option.series[0].data=map.nujiang
                        initCharts()
                    }else if (data.name==='丽江市') {
                        dataMap=require('@/assets/mapJson/lijiang.json')
                        option.series[0].data=map.lijiang
                        initCharts()
                    }else if (data.name==='大理白族自治州') {
                        dataMap=require('@/assets/mapJson/dali.json')
                        option.series[0].data=map.dali
                        initCharts()
                    }else if (data.name==='保山市') {
                        dataMap=require('@/assets/mapJson/baoshan.json')
                        option.series[0].data=map.baoshan
                        initCharts()
                    }else if (data.name==='德宏傣族景颇族自治州') {
                        dataMap=require('@/assets/mapJson/dehong.json')
                        option.series[0].data=map.dehong
                        initCharts()
                    }else if (data.name==='临沧市') {
                        dataMap=require('@/assets/mapJson/lincang.json')
                        option.series[0].data=map.lincang
                        initCharts()
                    }
                }

                // 地图注册，第一个参数的名字必须和option.geo.map一致
                echarts.registerMap("yunnan",dataMap)

                myEchart.setOption(option)

                // 添加返回标签并做点击事件
                window.onload = function () {
                    //在body中添加标签
                    //添加div元素(在内存中)
                    let div = document.createElement('div');
                    div.innerHTML = "返回";
                    //把div添加到body作为他的子元素
                    document.getElementById(id).appendChild(div);
                    div.style.position = 'absolute';
                    div.style.top = '5%';
                    div.style.right = '9%';
                    div.style.cursor = 'pointer';
                    if (map.dark) {
                        div.style.color = '#fff'
                    }else{
                        div.style.color = '#333'
                    }
                    div.onclick = function(){
                        dataMap = require('@/assets/mapJson/yunnan.json')
                        option.series[0].data=map.mapData
                        initCharts()
                    }
                }

            },
            // 仪表
            gaugeEchart:function (id,gauge) {
                var myEchart = echarts.init(document.getElementById(id),gauge.dark)

                var option = {
                    title: {
                        text: gauge.title ? gauge.title.text :'',
                        subtext: '',
                        left:"left",
                        textStyle: {
                          fontSize: 18,
                          color: gauge.dark ? '#fff': "#333"
                        },
                      },
                       tooltip: {
                          formatter: '{a} <br/>{b} : {c}%'
                        },
                      toolbox: {
                        show: gauge.toolbox ? gauge.toolbox : false,
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
                            show: gauge.sjshow == false ? false: true, //是否需要数据展示背景
                            width:  gauge.sjzswidth ? gauge.sjzswidth : 10,  //设置数据背景宽度
                          },
                          axisLine: {
                            lineStyle: {
                              width: gauge.ybwidth ? gauge.ybwidth : 10, //设置仪表背景宽度
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
                            show: gauge.anchor == false ? gauge.anchor : true, //是否需要指针圆圈
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
                          data: gauge.data
                        }
                      ],
                }
                gauge.djcolor ? option.series[0].axisLine.lineStyle.color = gauge.djcolor : ''

                myEchart.setOption(option)
            },
            // 散点
            scatterEchart:function (id,scatter) {
                var myEchart = echarts.init(document.getElementById(id),scatter.dark)

                var option = {
                    title: {
                        text: scatter.title ? scatter.title.text : '',
                        subtext: '',
                        left:"left",
                        textStyle: {
                          fontSize: 18,
                          color: scatter.dark ? "#fff" : "#333"
                        },
                      },
                      dataset: [
                        {
                          source: scatter.data
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
                          color: scatter.sdcolor ? scatter.sdcolor : '#188df0'
                          },
                          datasetIndex: 0
                        },
                        {
                          name: 'line',
                          type: 'line',
                          itemStyle:{
                          color: scatter.linecolor ? scatter.linecolor : '#188df0'
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
                }
                scatter.exponential ? delete option.dataset[1].transform.config.method  : option.dataset[1].transform.config.method
                scatter.dataset == false ? option.series.pop() : ''

                //自动播放tooltip
                if (scatter.tootipTimer) {
                    var self = this;
                    var count = 0
                    self.timeTicket = setInterval(function() {
                    myEchart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                    });
                    myEchart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: count
                    });
                    myEchart.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,
                        dataIndex: count
                    });
                    count++;
                    if (count == scatter.data.length) {
                        count = 0
                    }
                    }, 3000);
        
                    myEchart.on('mouseover', function(params) {
                    clearInterval(self.timeTicket);
                    myEchart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0
                    });
                    myEchart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: params.dataIndex
                    });
                    myEchart.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,
                        dataIndex: params.dataIndex,
                    });
                    })
        
                    myEchart.on('mouseout', function() {
                    var count = 0
                    self.timeTicket = setInterval(function() {
                        myEchart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        });
                        myEchart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: count
                        });
                        myEchart.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,
                        dataIndex: count
                        });
                        count++;
                        if (count == scatter.data.length) {
                            count = 0
                        }
                    }, 3000);
                    })
                }

                myEchart.setOption(option)
            },
            // 温度计
            thermometerEchart:function (id,thermometer) {
                var myChart = echarts.init(document.getElementById(id),thermometer.dark);

                var TP_value = thermometer.dataValue;
                var kd = [];
                var Gradient = [];
                var leftColor = '';
                var showValue = '';
                var boxPosition = [35, 0];
                var TP_txt = ''
                // 刻度使用柱状图模拟，短设置1，长的设置3；构造一个数据
                for(var i = 0, len = 135; i <= len; i++) {
                    if(i < 10 || i > 130) {
                        kd.push('')
                    } else {
                        if((i - 10) % 20 === 0) {
                            kd.push('-3');
                        } else if((i - 10) % 4 === 0) {
                            kd.push('-1');
                        } else {
                            kd.push('');
                        }
                    }

                }
                //中间线的渐变色和文本内容
                if(TP_value > 50) {
                    TP_txt = '温度偏高';
                    Gradient.push({
                        offset: 0,
                        color: '#93FE94'
                    }, {
                        offset: 0.5,
                        color: '#E4D225'
                    }, {
                        offset: 1,
                        color: '#E01F28'
                    })
                } else if(TP_value > 0) {
                    TP_txt = '温度正常';
                    Gradient.push({
                        offset: 0,
                        color: '#93FE94'
                    }, {
                        offset: 1,
                        color: '#E4D225'
                    })
                } else {
                    TP_txt = '温度偏低';
                    Gradient.push({
                        offset: 1,
                        color: '#93FE94'
                    })
                }
                if(TP_value > 100) {
                    showValue = 100
                } else {
                    if(TP_value < -20) {
                        showValue = -20
                    } else {
                        showValue = TP_value
                    }
                }
                // if(TP_value < -10) {
                //     boxPosition = [65, -120];
                // }
                leftColor = Gradient[Gradient.length - 1].color;
                // 因为柱状初始化为0，温度存在负值，所以加上负值60和空出距离10

                var option = {
                    // backgroundColor: '#0C2F6F',
                    title: {
                        text: thermometer.title ? thermometer.title.text : '温度计',
                    },
                    yAxis: [{
                        // show: false,
                        data: [],
                        min: 0,
                        max: 135,
                        axisLine: {
                            show: false
                        }
                    }, {
                        show: false,
                        min: 0,
                        max: 50,
                    }, {
                        type: 'category',
                        data: ['', '', '', '', '', '', '', '', '', '', ''],
                        position: 'left',
                        offset: -100,
                        axisLabel: {
                            fontSize: 10,
                            color: 'white'
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                    }],
                    xAxis: [{
                        show: false,
                        min: -10,
                        max: 80,
                        data: []
                    }, {
                        show: false,
                        min: -10,
                        max: 80,
                        data: []
                    }, {
                        show: false,
                        min: -10,
                        max: 80,
                        data: []
                    }, {
                        show: false,
                        min: -5,
                        max: 80,
        
                    }],
                    series: [{
                        name: '条',
                        type: 'bar',
                        // 对应上面XAxis的第一个对)象配置
                        xAxisIndex: 0,
                        data: [{
                            value: (showValue + 30),
                            label: {
                                normal: {
                                    show: true,
                                    position: boxPosition,
                                    backgroundColor: {
                                        image: 'plugin/subway_beijing/images/power/bg5Valuebg.png',//文字框背景图
                                    },
                                    width: 200,
                                    height: 100,
                                    formatter: '{back| ' + TP_value + ' }{unit|°C}\n{downTxt|' + TP_txt + '}',
                                    rich: {
                                        back: {
                                            align: 'center',
                                            lineHeight: 50,
                                            fontSize: 40,
                                            fontFamily: 'digifacewide',
                                            color: leftColor
                                        },
                                        unit: {
                                            fontFamily: '微软雅黑',
                                            fontSize: 15,
                                            lineHeight: 50,
                                            color: leftColor
                                        },
                                        downTxt: {
                                            lineHeight: 50,
                                            fontSize: 25,
                                            align: 'center',
                                            color: '#fff'
                                        }
                                    }
                                }
                            }
                        }],
        
                        barWidth: 18,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, Gradient)
                            }
                        },
                        z: 2
                    }, {
                        name: '白框',
                        type: 'bar',
                        xAxisIndex: 1,
                        barGap: '-100%',
                        data: [134],
                        barWidth: 28,
                        itemStyle: {
                            normal: {
                                color: '#0C2E6D',
                                barBorderRadius: 50,
                            }
                        },
                        z: 1
                    }, {
                        name: '外框',
                        type: 'bar',
                        xAxisIndex: 2,
                        barGap: '-100%',
                        data: [135],
                        barWidth: 38,
                        itemStyle: {
                            normal: {
                                color: '#4577BA',
                                barBorderRadius: 50,
                            }
                        },
                        z: 0
                    }, {
                        name: '圆',
                        type: 'scatter',
                        hoverAnimation: false,
                        data: [0],
                        xAxisIndex: 0,
                        symbolSize: 48,
                        itemStyle: {
                            normal: {
                                color: '#93FE94',
                                opacity: 1,
                            }
                        },
                        z: 2
                    }, {
                        name: '白圆',
                        type: 'scatter',
                        hoverAnimation: false,
                        data: [0],
                        xAxisIndex: 1,
                        symbolSize: 60,
                        itemStyle: {
                            normal: {
                                color: '#0C2E6D',
                                opacity: 1,
                            }
                        },
                        z: 1
                    }, {
                        name: '外圆',
                        type: 'scatter',
                        hoverAnimation: false,
                        data: [0],
                        xAxisIndex: 2,
                        symbolSize: 70,
                        itemStyle: {
                            normal: {
                                color: '#4577BA',
                                opacity: 1,
                            }
                        },
                        z: 0
                    }, {
                        name: '刻度',
                        type: 'bar',
                        yAxisIndex: 0,
                        xAxisIndex: 3,
                        label: {
                            normal: {
                                show: true,
                                position: 'left',
                                distance: 10,
                                color: 'white',
                                fontSize: 14,
                                formatter: function(params) {
                                    if(params.dataIndex > 130 || params.dataIndex < 10) {
                                        return '';
                                    } else {
                                        if((params.dataIndex - 10) % 20 === 0) {
                                            return params.dataIndex - 30;
                                        } else {
                                            return '';
                                        }
                                    }
                                }
                            }
                        },
                        barGap: '-100%',
                        data: kd,
                        barWidth: 1,
                        itemStyle: {
                            normal: {
                                color: 'white',
                                barBorderRadius: 120,
                            }
                        },
                        z: 0
                    }]
                };

                myChart.setOption(option);
            }
          }
        }
      }
    })
 } 
 export default install