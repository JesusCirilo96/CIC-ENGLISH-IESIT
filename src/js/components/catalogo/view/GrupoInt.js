import React, { Component} from "react";

import GrupoForm from '../forms/GrupoIntForm';
import GrupoTable from '../tables/GrupoIntTable';

class Grupo extends Component{

    constructor(){
        super();
        this.state = {
            showForm: false,
            showTable:true,
            name: "Nuevo",
            icon:"fas fa-plus-circle"
        }

        this.showForm = this.showForm.bind(this)
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
            <br></br>
                <div className="row">
                    <button className="col-md-1 btn btn-outline-primary btn-sm button-form-group"
                        onClick={e=>{this.showForm(e)}}
                    >{this.state.name} <i className={this.state.icon}></i></button>
                </div>                    
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
