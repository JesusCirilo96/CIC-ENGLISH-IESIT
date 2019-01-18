import React, { Component} from "react";
import request from 'superagent';
import store from '../../../store';
import TableInternos from '../tables/internos';

let datos

class Internos extends Component{
    constructor(){
        super();
        this.state={
            showForm: true,
            showTable: false,
            grupoInterno: []
        };

        this.showForm = this.showForm.bind(this)
    }

    componentDidMount(){
        request
            .post('http://localhost:3000/getgroupint')
            .send({"opcion":"ID","clave":store.getState().teacher[0].id,"periodo_id":"0"})            
            .set('Accept', /application\/json/)
            .end((err, response)=>{
                const res = (JSON.parse(response.text))
                this.setState({grupoInterno:res})
            });
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
                        <strong><p>Grupos: {this.state.grupoInterno.length}</p></strong>
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
