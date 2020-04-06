import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';

class Statistics extends Component {
    state = {
        options: {},
        count: 0
    }
    componentDidMount() {
        this.setOptions();
    }
    setOptions = async () => {
        let { voteId } = this.props.item;
        let res = await this.http('get', '/voteData', { vote_id: voteId });
        let countRes = await this.http('post', '/vote/count', { vote_id: voteId });
        let { code, msg, data } = res.data;
        let options = {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [
                {
                    type: 'category',
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            barWidth: '30%',
            series: [
                {
                    name: '蒸发量',
                    type: 'bar',
                    data: [],
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }
            ]
        }
        if (code === 0) {
            options.xAxis[0].data = data.data.map(val => val.value);
            options.series[0].data = data.data.map(val => val.count);
            this.setState({ options,count:countRes.data.data }); return;
        }
        alert(msg);
    }
    events={
        "click":this.clickEcharts.bind(this)
    }
    clickEcharts(e){
        console.log(e);
    }
    render() {
        let { item } = this.props;
        return (
            <div>
                <div className="top">
                    <img src={item.img} alt="" />
                    <span style={{ marginLeft: '30px' }}>{item.title}</span>
                    <span style={{marginLeft:'20px'}}>{this.state.count}人参与</span>
                    <p style={{ marginLeft: '15px', marginTop: '20px' }}>{item.title}</p>
                </div>
                <div style={{ marginTop: '50px' }}>
                    <ReactEcharts option={this.state.options} onEvents={this.events} />
                </div>
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        item: state.item
    }
};

export default connect(mapStateToProps)(Statistics);
