import React, { Component} from "react";
import request from 'superagent';

import Parcial1 from "./parcial1";
import Parcial2 from "./parcial2";
import Parcial3 from "./parcial3";
import Nivelacion from "./nivelacion";
import Final from "./finales";
import Extraordinario from "./extraordinario";

class Index extends Component{
    constructor(){
        super();
        this.state={
            days:[],
            dataTable:[]
        }
    }
    
   componentDidMount(){
    request
        .post('http://localhost:3000/getAlumnoExt')
        .send({
            id_grupo:this.props.data.GRUPO_EXTERNO_ID
        })            
        .set('Accept', /application\/json/)
        .end((err, response)=>{
            const res = (JSON.parse(response.text))
            this.setState({
                dataTable: res
            });
    });
    }

    clickHeaders(param){
        request
            .post('http://localhost:3000/getAlumnoExt')
            .send({
                id_grupo:this.props.data.GRUPO_EXTERNO_ID
            })
            .set('Accept', /application\/json/)
            .end((err, response)=>{
                const res = (JSON.parse(response.text))
                this.setState({
                    dataTable: res
                });
        });
        }

    render(){
        return(
        <div className="table-parcial">
            <div className="info-group">
                <div className="row">
                    <div className="col-md-11">
                        <p>Students: <strong>{this.state.dataTable.length}</strong></p>
                    </div>
                    <div className="col-md-1">
                        <button className="btn-grupos" onClick={e=>{this.props.show()}}><i className="fas fa-arrow-circle-left"> Grupos</i></button>
                    </div>
                </div>
                
                        <div className="row">
                            <div className="col-md-4">
                                <p>Level: {this.props.data.NIVEL}</p>
                            </div>
                            <div className="col-md-4">
                                <p>Days: {
                                    JSON.parse(this.props.data.DIAS).map((data,i) =>
                                        <span key={i}>{data.dia} </span>
                                    )
                                }</p>
                            </div>
                            <div className="col-md-4">
                                <p>Classroom: {this.props.data.SALON}</p>
                            </div>
                        </div>
                
            </div>

           <ul className="nav nav-pills nav-justified mb-3 table-content-parcial" id="pills-tab" role="tablist">
            <li className="nav-item">
                <a className="nav-link active" id="pills-first-parcial-tab" data-toggle="pill" href="#pills-first-parcial" role="tab" aria-controls="pills-first-parcial" aria-selected="true">Primer parcial</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" id="pills-second-parcial-tab" data-toggle="pill" href="#pills-second-parcial" role="tab" aria-controls="pills-second-parcial" aria-selected="false">Segundo Parcial</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" id="pills-third-parcial-tab" data-toggle="pill" href="#pills-third-parcial" role="tab" aria-controls="pills-third-parcial" aria-selected="false">Tercer Parcial</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" id="pills-nivelacion-tab" data-toggle="pill" href="#pills-nivelacion" role="tab" aria-controls="pills-nivelacion" aria-selected="false" onClick={()=>{this.clickHeaders("N")}}>Nivelación</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" id="pills-finales-tab" data-toggle="pill" href="#pills-finales" role="tab" aria-controls="pills-finales" aria-selected="false" onClick={()=>{this.clickHeaders("N")}}>Finales</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" id="pills-extraordinario-tab" data-toggle="pill" href="#pills-extraordinario" role="tab" aria-controls="pills-extraordinario" aria-selected="false" onClick={()=>{this.clickHeaders("N")}}>Extraordinario</a>
            </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-first-parcial" role="tabpanel" aria-labelledby="pills-first-parcial-tab"> <Parcial1 dataTable={this.state.dataTable} />  </div>
                <div className="tab-pane fade" id="pills-second-parcial" role="tabpanel" aria-labelledby="pills-second-parcial-tab"><Parcial2 dataTable={this.state.dataTable} /></div>
                <div className="tab-pane fade" id="pills-third-parcial" role="tabpanel" aria-labelledby="pills-third-parcial-tab"><Parcial3 dataTable={this.state.dataTable} /></div>
                <div className="tab-pane fade" id="pills-nivelacion" role="tabpanel" aria-labelledby="pills-nivelacion-tab"><Nivelacion dataTable={this.state.dataTable} /></div>
                <div className="tab-pane fade" id="pills-finales" role="tabpanel" aria-labelledby="pills-finales-tab"><Final dataTable={this.state.dataTable} /></div>
                <div className="tab-pane fade" id="pills-extraordinario" role="tabpanel" aria-labelledby="pills-extraordinario-tab"><Extraordinario dataTable={this.state.dataTable} /></div>
            </div>
        </div>

        );
    }
}


export default Index;