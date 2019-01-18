import React, { Component} from "react";
import request from 'superagent';
import {Button} from 'primereact/button'

class Extras extends Component {

  constructor(props){
    super(props);
    this.state={
      dataHorario: [],
      dataCiclo: [],
      dataPeriodo: []
    }
  }
  
  componentDidMount(){
    request
        .get('http://localhost:3000/horario')
        .end((err, response)=>{
            const data = JSON.parse(response.text);
            var horario = []
            for(var key in data){
                horario.push({'horario_id':data[key].HORARIO_ID,'hora_inicio':data[key].HORA_INICIO, 'hora_fin':data[key].HORA_FIN})
            }
            this.setState({
                dataHorario: horario
            });
            });
    request
        .get('http://localhost:3000/cicloescolar')
        .end((err, response)=>{
            const data = JSON.parse(response.text);
            this.setState({
                dataCiclo: data
            });
         });

    request
        .post('http://localhost:3000/getbyid')
        .send({
            "tbl":"PE",
            "id": "1"
        })            
        .set('Accept', /application\/json/)
        .end((err, response)=>{
            const data = JSON.parse(response.text);
            var periodo = []
            for(var key in data){
                periodo.push({'value':data[key].PERIODO_ESCOLAR_ID,'label':data[key].NOMBRE})
            }
            this.setState({
                dataPeriodo: periodo
            });
        });
        
  }

 render(){
     return(
        <div className="col-md-12 contenedor-tabla">
            <div className="row">
                <div className="col-md-12">
                    <h3 className="text-center">Ciclo escolar</h3>
                </div>
                <div className="col-md-6">
                    <div className="panel panel-default" >
                        <div className="pre-scrollable panel-body">
                            <table className="table table-hover table-border">
                                <thead>
                                    <tr>
                                        <th>Fecha Inicio</th>
                                        <th>Fecha Fin</th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.dataCiclo.map((data,key)=>
                                        <tr key={key}>
                                            <td>{data.FECHA_INICIO}</td>
                                            <td>{data.FECHA_FIN}</td>
                                            <td>
                                                <Button label="Modificar" icon="pi pi-external-link" onClick={(e)=>console.log(data.CICLO_ESCOLAR_ID)}/>
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div> 
                </div>
                <div className="col-md-6">
                    <div className="form-extras">
                        <form id="form-metodo">
                            <div className="form-group">
                            <p className="bold">Año Inicio:</p>
                                <input type="text" maxLength="4" className="form-control" placeholder="Solo Año" name="year-inicio" />
                            </div>
                            <div className="form-group">
                                <p className="bold">Año Fin:</p>
                                <input type="text" maxLength="4" className="form-control" placeholder="Solo año" name="year-fin" />
                            </div>
                                
                            <div className="form-group">
                                <button className="btn btn-primary">Guardar</button>
                            </div>
                        </form> 
                    </div>
                </div>   
            </div>
        <hr/>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="text-center">Horario</h3>
                </div>
                <div className="col-md-6">
                    <div className="panel panel-default" >
                        <div className="pre-scrollable panel-body">
                            <table className="table table-hover table-border">
                                <thead>
                                    <tr>
                                        <th>Hora Inicio</th>
                                        <th>Hora Fin</th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.dataHorario.map((data,key)=>
                                        <tr key={key}>
                                            <td>{data.hora_inicio}</td>
                                            <td>{data.hora_fin}</td>
                                            <td>
                                                <Button label="Modificar" icon="pi pi-external-link" onClick={(e)=>console.log(data.horario_id)}/>
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div> 
                </div>
                <div className="col-md-6">
                    <div className="form-extras">
                        <form id="form-metodo">
                            <div className="form-group">
                            <p className="bold">Hora Inicio:</p>
                                <input type="time" className="form-control" name="hora-inicio" />
                            </div>
                            <div className="form-group">
                                <p className="bold">Hora Fin:</p>
                                <input type="time" className="form-control" name="hora-fin" />
                            </div>
                                
                            <div className="form-group">
                                <button className="btn btn-primary">Guardar</button>
                            </div>
                        </form> 
                    </div>
                </div>   
            </div>
        </div>
     );
 }
}

export default Extras;