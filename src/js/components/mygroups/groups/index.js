import React, { Component} from "react";
import request from 'superagent';

import Internos from './internos';
import Externos from './externos';

import store from '../../../store';

class Index extends Component{

    constructor(){
        super();
        this.state={
            dataext:[],
            dataint:[],            
        }
    }
    componentDidMount(){
        request
            .post('http://localhost:3000/getgroupint')
            .send({"clave":store.getState().teacher[0].id})            
            .set('Accept', /application\/json/)
            .end((err, response)=>{
                const res = (JSON.parse(response.text))
                this.setState({dataint:res})
            });
        
            request
            .post('http://localhost:3000/getgroupext')
            .send({"clave":store.getState().teacher[0].id})
            .set('Accept', /application\/json/)
            .end((err, response)=>{
                const res = (JSON.parse(response.text))
                this.setState({dataext:res})
            });
    }

    render(){
        
        return(
        <div>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="interno-tab" data-toggle="tab" href="#interno" role="tab" aria-controls="interno" aria-selected="true">Grupos Internos</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="externo-tab" data-toggle="tab" href="#externo" role="tab" aria-controls="externo" aria-selected="false">Grupos Externos</a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="interno" role="tabpanel" aria-labelledby="interno-tab">
                <Internos data={this.state.dataint}/>
                 </div>
                <div className="tab-pane fade" id="externo" role="tabpanel" aria-labelledby="externo-tab">
                    <Externos data = {this.state.dataext} />
                </div>                
            </div>
        </div>
        );
    }
}


export default Index;
