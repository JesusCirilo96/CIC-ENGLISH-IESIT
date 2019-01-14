import React, { Component} from 'react';
import store from '../../../store';
import request from 'superagent';
import TableExternos from '../tables/externos';

let datos

class Externos extends Component{
    constructor(){
        super();
        this.state={
            showForm: true,
            showTable: false,
            grupoExterno:[]
        };

        this.showForm = this.showForm.bind(this)
    }

    componentDidMount(){
        request
        .post('http://localhost:3000/getgroupext')
        .send({"clave":store.getState().teacher[0].id})
        .set('Accept', /application\/json/)
        .end((err, response)=>{
            const res = (JSON.parse(response.text))
            this.setState({grupoExterno:res})
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
                        <strong><p>Grupos: {this.state.grupoExterno.length}</p></strong>
                        <div className="tabla">
                            <div className="row">
                                {
                                    this.state.grupoExterno.map((data,i) =>
                                    <div key={i} className="col-md-3" onClick={e=>{
                                        datos = data
                                        this.showForm();
                                    }}>
                                        <div className="card bg-light mb-3">
                                            <div className="card-header text-center"><strong>{data.NOMBRE_GRUPO}</strong></div>
                                            <div className="card-body">
                                                <p className="card-text">Level: {data.NIVEL}</p>
                                                <p className="card-text">Classroom: {data.SALON}</p>
                                                <p className="card-text">Days: {data.DIAS}</p>                                       
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
                   <TableExternos data={datos} show={this.showForm} />:
                null
                
            }
            </div>
           
        )
    }
}

export default Externos;
