import React, { Component} from "react";

import GrupoForm from '../forms/GrupoIntForm';
import GrupoTable from '../tables/GrupoIntTable';
import Select from 'react-select';
import request from 'superagent';

class Grupo extends Component{

    constructor(){
        super();
        this.state = {
            dataDocente:[],
            dataCiclo:[],
            dataPeriodo:[],
            dataGrupo:[],
            updateGrupo:[],
            updateDocente:[],
            updateCiclo:[],
            showForm: false,
            showTable:true,
            name: "Nuevo",
            icon:"fas fa-plus-circle"
        }

        this.showForm = this.showForm.bind(this)
        this.getRequest = this.getRequest.bind(this)
    }

    getRequest(){
        request
        .post('http://localhost:3000/getgroupint')
        .send({
            "clave": '0'
        })            
        .set('Accept', /application\/json/)
        .end((err, response)=>{
            const res = (JSON.parse(response.text))
            this.setState({dataGrupo:res, updateGrupo:res, updateDocente:res,updateCiclo:res})
        });
    }

    filterData(docenteFilter){
        var updatedList = this.state.dataGrupo;
        updatedList = updatedList.filter(function(item){
          return item.NOMBRE_DOCENTE.toLowerCase().search(
            docenteFilter.toLowerCase()) !== -1 ;
        });
        this.setState({updateDocente: updatedList, updateGrupo:updatedList});
    }
    
    filterDataCiclo(cicloFilter){
        var updatedList = this.state.updateDocente;
        updatedList = updatedList.filter(function(item){
          return item.CICLO_ESCOLAR.toLowerCase().search(
            cicloFilter.toLowerCase()) !== -1 ;
        });
        this.setState({updateCiclo: updatedList, updateGrupo:updatedList});
    }

    filterDataPeriodo(periodoFilter){
        var updatedList = this.state.updateCiclo;
        updatedList = updatedList.filter(function(item){
          return item.PERIODO_ESCOLAR.toLowerCase().search(
            periodoFilter.toLowerCase()) !== -1 ;
        });
        this.setState({updateGrupo: updatedList});
    }
    
    componentDidMount(){
        this.getRequest()
        if(!this.props.edit){
            request
            .get('http://localhost:3000/docente')
            .end((err, response)=>{
                const data = JSON.parse(response.text);
                var docente = []
                for(var key in data){
                    docente.push({'value':data[key].DOCENTE_ID,'label':data[key].NOMBRE_COMPLETO})
                }
                this.setState({
                dataDocente: docente
                });
            });
            request
            .get('http://localhost:3000/cicloescolar')
            .end((err, response)=>{
                const data = JSON.parse(response.text);
                var ciclo = []
                for(var key in data){
                    ciclo.push({'value':data[key].CICLO_ESCOLAR_ID,'label':data[key].NOMBRE})
                }
                this.setState({
                    dataCiclo: ciclo
                });
            });
            request
            .get('http://localhost:3000/periodoescolar')
            .end((err, response)=>{
                const data = JSON.parse(response.text);
                var periodo = []
                for(var key in data){
                    periodo.push({'value':data[key].PERIODO_ID,'label':data[key].NOMBRE})
                }
                this.setState({
                dataPeriodo: periodo
                });
            });
        }
      }

    showForm(e){
        this.setState ({
            showForm : !this.state.showForm,
            showTable : !this.state.showTable
        })

        if(this.state.showForm == false){
            this.setState({
                name:"Registros",
                icon:"fas fa-arrow-circle-left"
            })
        }else{
            this.setState({
                name:"Nuevo",
                icon:"fas fa-plus-circle"
            })
        }
       
        e.preventDefault();
    }

    render(){
        return(
            <div className="col-md-12">
            <br></br>
                <div className="row">
                    <div className="col-md-4">
                        <p className="bold">Docente:</p>
                        <Select className="form-control"
                            name = "docente"
                            onChange={e =>
                                this.filterData(e.label)
                            }
                            options = {this.state.dataDocente}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>
                    <div className="col-md-3">
                        <p className="bold">Ciclo Escolar:</p>
                        <Select className="form-control"
                            name = "ciclo_id"
                            onChange={e => 
                              this.filterDataCiclo(e.label)
                            }
                            options = {this.state.dataCiclo}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>
                    <div className="col-md-3">
                        <p className="bold">Periodo Escolar:</p>
                        <Select className="form-control"
                            name = "periodo_id"
                            onChange={e => 
                                this.filterDataPeriodo(e.label)
                            }
                            options = {this.state.dataPeriodo}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>
                    <div className="col-md-2">
                        <p className="bold">Nuevo:</p>
                        <button className="btn btn-outline-primary"
                            onClick={e=>{this.showForm(e)}}
                        >{this.state.name} <i className={this.state.icon}></i></button>
                    </div>
                </div>
                <hr/>                
                {
                    this.state.showForm?
                    <div>
                        <GrupoForm data edit={false}/>
                    </div>:
                    null
                }
                {
                    this.state.showTable?
                        <GrupoTable 
                            show={this.showForm}
                            dataJson = {this.state.updateGrupo}
                            getRequest = {this.getRequest}  />:
                    null
                }
            </div>
        );
    }
}

export default Grupo;
