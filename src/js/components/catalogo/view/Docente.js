import React, { Component} from "react";

import DocenteForm from '../forms/DocenteForm';
import DocenteTable from '../tables/DocenteTable';

class Docente extends Component{

    constructor(){
        super();
        this.state = {
            showForm: false,
            showTable:true,
            name: "Nuevo",
            icon:"fas fa-plus-circle"
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
            <div>
                <div className = "row">
                    <div className="col-md-12 text-center"><h3>Docente</h3></div>
                </div>
                <div className="row">
                    <button className="col-md-1 btn btn-outline-primary btn-sm button-form"
                        onClick={e=>{this.showForm(e)}}
                    >{this.state.name} <i className={this.state.icon}></i></button>
                </div>
                {
                    this.state.showForm?
                    <div>
                        <DocenteForm />
                    </div>:
                    null
                }
                {
                    this.state.showTable?
                        <DocenteTable />:
                    null
                }
            </div>
        );
    }
}

export default Docente;
