import React, { Component} from "react";

import TableInternos from '../tables/internos';

let datos

class Internos extends Component{
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
                        <strong><p>Grupos: {this.props.data.length}</p></strong>
                        <div className="tabla">
                            <div className="row">
                                {
                                    this.props.data.map((data,i) =>
                                    <div key={i} className="col-md-3" onClick={e=>{
                                        datos = data
                                        this.showForm();
                                    }}>
                                        <div className="card bg-light mb-3">
                                            <div className="card-header text-center"><strong>{data.NOMBRE_GRUPO}</strong></div>
                                            <div className="card-body">
                                                <p className="card-text">Level: {data.NIVEL}</p>
                                                <p className="card-text">Classroom: {data.SALON}</p>
                                                <p className="card-text">Days {data.DIAS}:</p>                                       
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
