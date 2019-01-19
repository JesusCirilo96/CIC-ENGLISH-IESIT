import React, { Component} from "react";
import request from 'superagent';
import store from '../../../store';
import TableInternos from '../tables/internos';
import {Dropdown} from 'primereact/dropdown';

let datos

class Internos extends Component{
    constructor(){
        super();
        this.state={
            periodoEscolar: null,
            periodoOptions:[],
            showForm: true,
            showTable: false,
            grupoInterno: []
        };

        this.showForm = this.showForm.bind(this)
    }

    componentDidMount(){
        this.getGrupoInt(store.getState().teacher[0].id,"ID","0")
        request
        .get('http://localhost:3000/periodoescolar')
        .set('Accept', /application\/json/)
        .end((err, response)=>{
            const res = (JSON.parse(response.text))
            var periodo = []
            for(var key in res){
                periodo.push({name:res[key].NOMBRE,code:res[key].PERIODO_ID})
            }
            this.setState({
                periodoOptions:periodo
            })
        });
    }

    getGrupoInt(clave,opcion,periodo){
        console.log(opcion, clave, periodo)
        request
        .post('http://localhost:3000/getgroupint')
        .send({
            "opcion": opcion,
            "clave": clave,
            "periodo_id": periodo
        })            
        .set('Accept', /application\/json/)
        .end((err, response)=>{
            const res = (JSON.parse(response.text))
            this.setState({grupoInterno:res})
        });
    }

    onPeriodoChange(e) {
        this.setState({periodoEscolar: e.value});
        this.getGrupoInt(store.getState().teacher[0].id,"PEID",e.value.code)
    }

    showForm(){
        this.setState ({
            showForm : !this.state.showForm,
            showTable : !this.state.showTable
        })
    }

    render(){
        return(
            <div>
            {
                this.state.showForm?
                    <div className="col-md-12 contenedor-grupos">
                        <div className="row justify-content-between">
                            <div className="col-md-3">
                                <Dropdown value={this.state.periodoEscolar} options={this.state.periodoOptions} onChange={e=>{this.onPeriodoChange(e)}} style={{width:'250px'}} placeholder="Filtrar por periodo" optionLabel="name"/>            
                            </div>
                            <div className="col-md-1">
                                <strong><p>Grupos: {this.state.grupoInterno.length}</p></strong>
                            </div>    
                        </div>
                        <hr/>
                        <div className="tabla">
                            <div className="row">
                                {
                                    this.state.grupoInterno.map((data,i) =>
                                    <div key={i} className="col-md-3" onClick={e=>{
                                        datos = data
                                        this.showForm();
                                    }}>
                                        <div className="card bg-light mb-3">
                                            <div className="card-header text-center"><strong>{data.NOMBRE_GRUPO}</strong></div>
                                            <div className="card-body">
                                                <p className="card-text"><strong>Level:</strong> {data.NIVEL}</p>
                                                <p className="card-text"><strong>Classroom:</strong> {data.SALON}</p>
                                                <p className="card-text"><strong>Schedule:</strong> {data.HORARIO}</p>              
                                                <p className="card-text"><strong>Days:</strong> {data.DIAS}</p>                                       
                                            </div>
                                        </div>
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>:
                null
            }
            {
                this.state.showTable?
                   <TableInternos data={datos} show={this.showForm} />:
                null
                
            }
            </div>
           
        )
    }
}

export default Internos;
