import React, { Component} from "react";
import request from 'superagent';

import GrupoEditForm from '../forms/GrupoIntForm';

let datos

class GrupoTable extends Component{
    constructor(){
        super();
        this.state={
            showForm: true,
            showTable: false
        };
        
        this.showForm = this.showForm.bind(this)
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
                        <strong><p>Grupos: {this.props.dataJson.length}</p></strong>
                        <div className="tabla">
                            <div className="row">
                                {
                                    this.props.dataJson.map((data,i) =>
                                    <div key={i} className="col-md-3" onClick={e=>{
                                        datos = data
                                        this.showForm();
                                    }}>
                                        <div className="card bg-ligh mb-3">
                                            <div className="card-header text-center"><strong>{data.NOMBRE_GRUPO}</strong></div>
                                            <div className="card-body">
                                                <p className="card-text"><strong>Level :</strong> {data.NIVEL}</p>
                                                <p className="card-text"><strong>Classroom: </strong>{data.SALON}</p>
                                                <p className="card-text"><strong>Days: </strong>{data.DIAS}</p>
                                                <p className="card-text"><strong>Schedule: </strong> {data.HORARIO}</p>        
                                                <p className="card-text"><strong>Teacher: </strong> {data.NOMBRE_DOCENTE}</p> 
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
                   <GrupoEditForm data = {datos} showEdit={this.showForm} edit={true} get_data={this.props.getRequest}/>
                :null
            }
            </div>
           
        )
    }
}

export default GrupoTable;
