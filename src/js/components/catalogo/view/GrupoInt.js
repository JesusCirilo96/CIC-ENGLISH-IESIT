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
            showForm: false,
            showTable:true,
            name: "Nuevo",
            icon:"fas fa-plus-circle"
        }

        this.showForm = this.showForm.bind(this)
    }
    
    componentDidMount(){
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
                            name = "grupo"
                           // onChange={e => 
                            //this.setState({
                              //  grupo: e.value
                            //})}
                            options = {this.state.dataDocente}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>
                    <div className="col-md-3">
                        <p className="bold">Ciclo Escolar:</p>
                        <Select className="form-control"
                            name = "grupo"
                           // onChange={e => 
                            //this.setState({
                              //  grupo: e.value
                            //})}
                            options = {this.state.dataCiclo}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>
                    <div className="col-md-3">
                        <p className="bold">Periodo Escolar:</p>
                        <Select className="form-control"
                            name = "grupo"
                           // onChange={e => 
                            //this.setState({
                              //  grupo: e.value
                            //})}
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
                        <GrupoForm  data edit={false}/>
                    </div>:
                    null
                }
                {
                    this.state.showTable?
                        <GrupoTable show={this.showForm} />:
                    null
                }
            </div>
        );
    }
}

export default Grupo;
