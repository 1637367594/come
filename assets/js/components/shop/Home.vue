
<template>
    <div>

        <!--本周订单图-->
        <el-row>
            <el-col :span="24">
                <div id="sales_count" style="width: 100%;height:400px;"></div>
            </el-col>
        </el-row>

        <!--本周销量图-->
        <el-row>
            <el-col :span="24">
                <div id="sales_amount" style="width: 100%;height:400px;"></div>
            </el-col>
        </el-row>

        <!--本月热销商品Top图-->
        <el-row>
            <el-col :span="24">
                <div id="top" style="width: 100%;height:400px;"></div>
            </el-col>
        </el-row>


        <el-row>
            <!--会员性别统计-->
            <el-col :span="12">
                <div id="sex_count" style="width: 100%;height:400px;"></div>
            </el-col>
            <!--会员省份统计-->
            <el-col :span="12">
                <div id="customer_province" style="width: 100%;height:400px;"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import 'echarts/theme/macarons.js'
    import 'echarts/map/js/china.js'

    export default {
    // mounted 是生命周期，在DOM事件渲染完成之后执行，相当于调用
        mounted() {
            this.sales_count();
            this.sales_amount();
            this.top();
            this.sex_count();
            this.customer_province();
        },
        methods: {
            //本周订单图
            sales_count() {
                axios.get("http://localhost:8000/api/sales_count").then(response => {
                    var data = response.data;
                    var myChart = echarts.init(document.getElementById('sales_count'), 'macarons');

                    myChart.setOption({
                        title: {
                            text: '本周订单数',
                            subtext: data.week_start + ' ~ ' + data.week_end
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['下单', '付款', '配货', '出库', '交易成功']
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataZoom: {},
                                dataView: {
                                    readOnly: false
                                },
                                magicType: {
                                    type: ['line', 'bar']
                                },
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        series: [{
                                name: '下单',
                                type: 'bar',
                                data: data.count.create,
                            },
                            {
                                name: '付款',
                                type: 'bar',
                                data: data.count.pay,
                            },
                            {
                                name: '配货',
                                type: 'bar',
                                data: data.count.picking,
                            },
                            {
                                name: '出库',
                                type: 'bar',
                                data: data.count.shipping,
                            },
                            {
                                name: '交易成功',
                                type: 'bar',
                                data: data.count.finish,
                            }
                        ]
                    });

                })
            },

            //    本周销量图
            sales_amount() {
                axios.get("http://localhost:8000/api/sales_amount").then(response => {
                    var data = response.data;
                    var myChart = echarts.init(document.getElementById('sales_amount'), 'macarons');
                    myChart.setOption({
                        title: {
                            text: '本周销售额',
                            subtext: data.week_start + ' ~ ' + data.week_end
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['未付款', '已付款']
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataZoom: {},
                                dataView: {
                                    readOnly: false
                                },
                                magicType: {
                                    type: ['line', 'bar']
                                },
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        series: [{
                                name: '未付款',
                                type: 'line',
                                data: data.amount.create,
                            },
                            {
                                name: '已付款',
                                type: 'line',
                                data: data.amount.pay,
                            }
                        ]
                    })
                })
            },


            //    本月热销商品Top图
            top() {
                axios.get("http://localhost:8000/api/top").then(response => {

                    var data = response.data;
                    var myChart = echarts.init(document.getElementById('top'), 'macarons');

                    let sell = [];     //数据
                    let type=[];       //类型

                    data.products.forEach((v) => {
                        sell.push({
                            value: v.sum_num,
                            name: v.product.name
                        }),
                        type.push(v.name)
                    })

                    myChart.setOption({
                        title: {
                            text: '本月热销商品Top图',
                            subtext: data.month_start + ' ~ ' + data.month_end,
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data:type,
                            },
                        series: [{
                            name: '销售量',
                            type: 'pie',
                            radius: '75%',   //调整效果大小直径
                            center: ['50%', '60%'],
                            data: sell,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    });
                })
            },

            // 会员性别统计
            sex_count() {
                axios.get("http://localhost:8000/api/sex_count").then(response => {
                    var data = response.data;
                    var myChart = echarts.init(document.getElementById('sex_count'), 'macarons');
                    myChart.setOption({
                        title: {
                            text: '会员性别统计',
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: ['男', '女']
                        },
                        series: [{
                            name: '访问来源',
                            type: 'pie',
                            radius: '60%',
                            center: ['50%', '60%'],
                            data: [{
                                    value: data.male,
                                    name: '男'
                                },
                                {
                                    value: data.female,
                                    name: '女'
                                }
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    });
                })
            },

            // 会员省份统计
            customer_province() {
                axios.get("http://localhost:8000/api/customer_province").then(response => {

                    console.log(response.data)
                    var data = response.data;
                    var myChart = echarts.init(document.getElementById('customer_province'), 'macarons');
                    myChart.setOption({

                        title: {
                            text: '会员省份统计',
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item'
                        },

                        dataRange: {
                            min: 0,
                            max: 100,
                            x: 'left',
                            y: 'bottom',
                            text: ['高', '低'], // 文本，默认为数值文本
                            calculable: true,
                            splitNumber: 0,
                            // color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096', ]
                        },
                        toolbox: {
                            show: true,
                            orient: 'vertical',
                            x: 'right',
                            y: 'center',
                            feature: {
                                mark: {
                                    show: true
                                },
                                dataView: {
                                    show: true,
                                    readOnly: false
                                },
                                dataZoom: {
                                    show: true
                                },
                                restore: {
                                    show: true
                                },
                                saveAsImage: {
                                    show: true
                                }
                            }
                        },
                        roamController: {
                            show: true,
                            x: 'right',
                            mapTypeControl: {
                                'china': true
                            }
                        },
                        series: [{
                            name: '会员',
                            type: 'map',
                            mapType: 'china',
                            roam: false,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true
                                    }
                                },
                                emphasis: {
                                    label: {
                                        show: true
                                    }
                                }
                            },
                            data: data,
                        }]
                    });
                })
            }
        }
    }
</script>

<style scoped>
    .el-main>div {
        margin: 35px;
    }
</style>
