/*
 * @Description: 图表数据
 * @Date: 2021-07-27 10:50:59
 * @page: data.js
 */
const groups = [
    {
        // 表一
        id: 1,
        default: "1-1",
        data: [
            // 模型1
            {
                title: "学生",
                chartsId: "1-1",
                chartsTitle: "学生12月数据",
                type: "line",
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'line'
                    }
                ]
            },
            // 模型2
            {
                title: "老师",
                chartsId: "1-2",
                chartsTitle: "老师12月数据",
                type: "bar",
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar'
                    }
                ]
            }
        ]
    },
    {
        // 图表二
        id: 2,
        data: [
            // 模型一
            {
                title: "学生",
                chartsId: "2-1",
                type: "scatter",
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: "value"
                },
                series: [{
                    symbolSize: 10,
                    data: [
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
                        [9.15, 7.20],
                        [11.5, 7.20],
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
                    ],
                    type: 'scatter'
                }]
            },
            // 模型二
            {
                title: "老师",
                chartsId: "2-2",
                chartsTitle: "老师12月数据",
                type: "pie",
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: '搜索引擎' },
                            { value: 735, name: '直接访问' },
                            { value: 580, name: '邮件营销' },
                            { value: 484, name: '联盟广告' },
                            { value: 300, name: '视频广告' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        ]
    },
    {
        // 图表三
        id: 3,
        data: [
            // 模型一
            {
                title: "学生",
                chartsId: "3-1",
                type: "radar",
                radar: {
                    // shape: 'circle',
                    indicator: [
                        { name: '销售（Sales）', max: 6500 },
                        { name: '管理（Administration）', max: 16000 },
                        { name: '信息技术（Information Technology）', max: 30000 },
                        { name: '客服（Customer Support）', max: 38000 },
                        { name: '研发（Development）', max: 52000 },
                        { name: '市场（Marketing）', max: 25000 }
                    ]
                },
                series: [{
                    name: '预算 vs 开销（Budget vs spending）',
                    type: 'radar',
                    data: [
                        {
                            value: [4200, 3000, 20000, 35000, 50000, 18000],
                            name: '预算分配（Allocated Budget）'
                        },
                        {
                            value: [5000, 14000, 28000, 26000, 42000, 21000],
                            name: '实际开销（Actual Spending）'
                        }
                    ]
                }]
            },
            // 模型二
            {
                title: "老师",
                chartsId: "3-2",
                chartsTitle: "老师12月数据",
                type: "pie",
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: [50, 150],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 8
                        },
                        data: [
                            { value: 40, name: 'rose 1' },
                            { value: 38, name: 'rose 2' },
                            { value: 32, name: 'rose 3' },
                            { value: 30, name: 'rose 4' },
                            { value: 28, name: 'rose 5' },
                            { value: 26, name: 'rose 6' },
                            { value: 22, name: 'rose 7' },
                            { value: 18, name: 'rose 8' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        // 图表四
        id: 4,
        data: [
            // 模型一
            {
                title: "学生",
                chartsId: "4-1",
                type: "line",
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'line',
                        areaStyle: {}
                    }
                ]
            },
            // 模型二
            {
                title: "老师",
                chartsId: "4-2",
                chartsTitle: "老师12月数据",
                series: [
                    {
                        name: '漏斗图',
                        type: 'funnel',
                        left: '10%',
                        top: 60,
                        //x2: 80,
                        bottom: 60,
                        width: '80%',
                        // height: {totalHeight} - y - y2,
                        min: 0,
                        max: 100,
                        minSize: '0%',
                        maxSize: '100%',
                        sort: 'descending',
                        gap: 2,
                        label: {
                            show: true,
                            position: 'inside'
                        },
                        labelLine: {
                            length: 10,
                            lineStyle: {
                                width: 1,
                                type: 'solid'
                            }
                        },
                        itemStyle: {
                            borderColor: '#fff',
                            borderWidth: 1
                        },
                        emphasis: {
                            label: {
                                fontSize: 20
                            }
                        },
                        data: [
                            { value: 60, name: '访问' },
                            { value: 40, name: '咨询' },
                            { value: 20, name: '订单' },
                            { value: 80, name: '点击' },
                            { value: 100, name: '展现' }
                        ]
                    }
                ]
            }
        ]
    }
]

export default groups