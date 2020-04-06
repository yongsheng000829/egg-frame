import React, { Component } from 'react';

import { DatePicker,TimePicker} from 'antd';
import moment from 'moment';



export default class Vote extends Component {
    state = {
        oList:[{title:'选项1',type:'num1',index:1}],
        num:1,
        date:'',
        time:'',
    }
    componentWillMount=()=>this.$push=this.props.history.push;
    dateCange=(time, timeString)=> {
        this.setState({date:timeString});
    }
    timeChange=(time, timeString)=> {
        this.setState({time:timeString});
      }
    subFunc= async()=>{
        let info = {};
        let typeData = [];
        for(let i =1;i<=this.state.num;i++){
            typeData.push(this.refs[`num${this.state.num}`].value);
        }
        info.title = this.refs.inp.value;
        info.des = this.refs.tex.value;
        info.type = this.refs.sel.value;
        info.time = this.state.date+'-'+this.state.time;
        info.tag = typeData.join(',');
        console.log(info,456);
        // let res = await this.$http('post','/vote/insert',info);
        // const {code,msg} = res.data;
        // alert(msg);
        // if(Object.is(code,0)) this.$push('/home/vote');
    }
    pushFunc=()=>{
        let {oList,num} = this.state;
        this.setState({num:++num})
        this.setState({oList:oList.push({title:'选项'+num,type:'num'+num,index:num})},()=>{
            console.log(this.state.oList)
        });
    }
    render() {
        return (
            <div className="vote">
                <div className="header">
                    <div><span>ㄑ</span></div>
                    <div>投票</div>
                    <div onClick={()=>this.$push('/home/vote')}>统计</div>
                </div>
                <div className="con">
                    <p>
                       <span>标题 :</span><input ref="inp" type="text" placeholder="请输入标题"/>
                    </p>
                    <p>
                        <span>描述 :</span><textarea ref="tex" placeholder="输入内容"></textarea>
                    </p>
                    {/* {
                        this.state.oList.map(v=>{
                           return <p key={v.index} className="option">
                                    <span>{v.title}</span>
                                    <input ref={v.type} type="text" placeholder={"请输入"+v.title}/>
                                    
                               </p>
                            })
                        } */}
                        <span onClick={()=>this.pushFunc()}>+</span>
                    <p>
                        <select ref="sel"> 
                            <option value="单选">单选</option>
                            <option value="多选">多选</option>
                        </select>
                    </p>
                    <p>
                        <span>截至时间 :</span>
                    </p>
                    <div className="time-wrap">
                         <DatePicker onChange={this.dateCange} />
                    </div>
                    <div className="time-wrap">
                        <TimePicker onChange={this.timeChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                    </div>
                </div>
                <div className="foot">
                    <button onClick={this.subFunc}>发布</button>
                </div>
            </div>
        );
    }
}

