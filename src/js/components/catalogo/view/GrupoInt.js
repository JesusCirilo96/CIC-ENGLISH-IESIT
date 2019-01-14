import React, { Component} from "react";

import GrupoForm from '../forms/GrupoIntForm';
import GrupoTable from '../tables/GrupoIntTable';
import Select from 'react-select';
import request from 'superagent';

import {Toolbar} from 'primereact/toolbar'
import {Button} from 'primereact/button'
import {AutoComplete} from 'primereact/autocomplete'

class Grupo extends Component{

    constructor(){
        super();
        this.state = {
            docente:"",
            dataDocente:[],
            filteredDocente:null,
            dataGrupo:[],
            updateGrupo:[],
            updateDocente:[],
            showForm: false,
            showTable:true,
            name: "Nuevo",
            icon:"pi pi-plus",
            style:"",
            disabledSave:"disabled",
            disabledUpdate:"disabled"
        }

        this.showForm = this.showForm.bind(this)
        this.getRequest = this.getRequest.bind(this)
        this.filterDocente = this.filterDocente.bind(this)
    }

    filterDocente(event) {
        setTimeout(() => {
            var results = this.state.dataDocente.filter((docente) => {
                return docente.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
            this.setState({ filteredDocente: results });
        }, 250);
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
            this.setState({dataGrupo:res, updateGrupo:res, updateDocente:res})
        });
    }

    filterData(docenteFilter){
        this.setState({docente: docenteFilter})
        if(docenteFilter === undefined){
            this.setState({
                updateGrupo:this.state.dataGrupo
            })
        }else{
            console.log(docenteFilter);
            var updatedList = this.state.dataGrupo;
            updatedList = updatedList.filter(function(item){
            return item.NOMBRE_DOCENTE.toLowerCase().search(
                docenteFilter.toLowerCase()) !== -1 ;
            });
            this.setState({updateDocente: updatedList, updateGrupo:updatedList});
        }
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
                    //docente.push({'value':data[key].DOCENTE_ID,'label':data[key].NOMBRE_COMPLETO})
                    docente.push({'name':data[key].NOMBRE_COMPLETO})
                }
                this.setState({
                dataDocente: docente
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
                name:"Cancelar",
                icon:"pi pi-times",
                style:"p-button-danger",
                disabledSave:""
            })
        }else{
            this.setState({
                name:"Nuevo",
                icon:"pi pi-plus",
                style:"",
                disabledSave:"disabled"
            })
        }
       
        e.preventDefault();
    }

    render(){
        return(
            <div className="col-md-12">
            <br></br>
            <Toolbar>
                <div className="p-toolbar-group-left">
                    <Button className={this.state.style} label={this.state.name} icon={this.state.icon} style={{marginRight:'.25em'}} onClick={e=>{this.showForm(e)}}/>
                    <i className="pi pi-bars p-toolbar-separator" style={{marginRight:'.25em'}} />
                    <Button className="p-button-warning" label="Save" icon="pi pi-check" style={{marginRight:'.25em'}} disabled={this.state.disabledSave} />
                    <Button label="Update" icon="pi pi-upload" className="p-button-success" disabled={this.state.disabledUpdate}/>
                </div>
                <div className="p-toolbar-group-right">
                    <AutoComplete value={this.state.docente} suggestions={this.state.filteredDocente} completeMethod={this.filterDocente} field="name"
                        size={30} placeholder="Filtrar docente" minLength={1} onChange={(e) => this.filterData(e.value)} />
                </div>
            </Toolbar>
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
/*
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
                </div>
                <hr/>       */        