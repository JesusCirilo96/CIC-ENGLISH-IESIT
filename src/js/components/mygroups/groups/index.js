import React, { Component} from "react";
import request from 'superagent';

import Internos from './internos';


class Index extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }

    componentDidMount(){
        request
            .post('http://localhost:3000/getgroupint')
            .send({"clave":"DMC181025"})
            .set('Accept', /application\/json/)
            .end((err, response)=>{
                const res = (JSON.parse(response.text))
                this.setState({data:res})
            });
    }
    render(){
        const type = this.props.type;
        console.log(this.state.data);
        if(type){
            return(
                <Internos data = {this.state.data} />
            )
        }
    }
}

export default Index;