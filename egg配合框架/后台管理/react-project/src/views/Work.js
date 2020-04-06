import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import LazyLoad from 'react-lazyload';


export default class Work extends Component {
    state = {
        option: {}
    }
    setData = async () => {
        let res = await this.http('get', '/role/echarts');
        let { option } = this.state;
        let { code, msg, data } = res.data;
        if (code === 0) {
            let arr = {
                title: {
                    text: '某站点角色占比',
                    subtext: '纯属虚构',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: data.map(val => val.name)
                },
                calculable: true,
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data
                    }
                ]
            };
            this.setState({ option: arr }); return;
        }
        alert(msg);
    }
    componentDidMount() {
        this.setData();
    }
    render() {
        let { option } = this.state;
        return (
            <div className='work'>
                <ReactEcharts option={option} style={{ width: 1000, height: 350 }}></ReactEcharts>
                <LazyLoad height={500}>
                    <img src="http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg" alt="" />
                </LazyLoad>
                <LazyLoad height={500}>
                    <img src="http://a2.att.hudong.com/52/75/01200000194258136323753630105.jpg" alt="" />
                </LazyLoad>
                <LazyLoad height={500}>
                    <img src="http://pic27.nipic.com/20130309/10558908_195559579000_2.jpg" alt="" />
                </LazyLoad>
                <LazyLoad height={500}>
                    <img src="http://a3.att.hudong.com/20/56/19300001056606131348564606754.jpg" alt="" />
                </LazyLoad>
            </div>
        )
    }
}
