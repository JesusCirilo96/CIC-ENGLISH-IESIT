import React, { Component} from "react";
import request from 'superagent';
import NotificationSystem from 'react-notification-system';

import Parcial1 from "./parcial1";
import Parcial2 from "./parcial2";
import Parcial3 from "./parcial3";
import Nivelacion from "./nivelacion";
import Final from "./finales";
import Extraordinario from "./extraordinario";


class Index extends Component{
    constructor(){
        super();
        this.state={
            days:[],
            dataTable:[]
        }
        this.getAlumno = this.getAlumno.bind(this);
        this.notificationSystem = React.createRef();
        this.addNotification = this.addNotification.bind(this)
    }
    
   componentDidMount(){
        this.getAlumno();
    }

    addNotification(title,message,level){
        const notification = this.notificationSystem.current;
        notification.addNotification({
            title:title,
            message: message,
            level: level,
            position:'br'
        });
    };

    getAlumno(){
        request
        .post('http://localhost:3000/getAlumnoInt')
        .send({
            id_grupo:this.props.data.GRUPO_ID,
            id_param:"P"    
        })            
        .set('Accept', /application\/json/)
        .end((err, response)=>{
            const res = (JSON.parse(response.text))
            this.setState({
                dataTable: res
            });
        });
    }

    clickHeaders(param){
        request
            .post('http://localhost:3000/getAlumnoInt')
            .send({
                id_grupo:this.props.data.GRUPO_ID,
                id_param:param
            })
            .set('Accept', /application\/json/)
            .end((err, response)=>{
                const res = (JSON.parse(response.text))
                this.setState({
                    dataTable: res
                });
        });
    }

    promedio(cal1, cal2,cal3){
        var puntuacion = (cal1 + cal2 + cal3);
        var nivelacion = "No"
        if(puntuacion < 210 ){
            nivelacion = "Si"
        }
        return nivelacion
    }

    studentsNivelacion(){
        var dataStudents = this.state.dataTable
        let students = []
        for (var key in dataStudents){
          var par1 = dataStudents[key].PARTICIPACION_PAR1 + dataStudents[key].TRABAJOS_PAR1 + dataStudents[key].EXAMEN_PAR1
          var par2 = dataStudents[key].PARTICIPACION_PAR2 + dataStudents[key].TRABAJOS_PAR2 + dataStudents[key].EXAMEN_PAR2
          var par3 = dataStudents[key].PARTICIPACION_PAR3 + dataStudents[key].TRABAJOS_PAR3 + dataStudents[key].EXAMEN_PAR3
          if(this.promedio(par1, par2, par3) === "Si"){
            students.push({
              'ALUMNO_MATRICULA':dataStudents[key].ALUMNO_MATRICULA,
              'GRUPO_ID':dataStudents[key].GRUPO_ID,
              'SEMESTRE':dataStudents[key].SEMESTRE,
              'SIGLAS':dataStudents[key].SIGLAS,
              'NOMBRE_COMPLETO':dataStudents[key].NOMBRE_COMPLETO,
              'ASISTENCIA_PAR1':dataStudents[key].ASISTENCIA_PAR1,
              'ASISTENCIA_PAR2':dataStudents[key].ASISTENCIA_PAR2,
              'ASISTENCIA_PAR3':dataStudents[key].ASISTENCIA_PAR3,
              'PARCIAL1':par1,
              'PARCIAL2':par2,
              'PARCIAL3':par3,          
              'CAL_NIVELACION':dataStudents[key].CAL_NIVELACION,
            })
          }
        }
        return students
    }

    render(){
        return(
        <div className="table-parcial">
            <div className="info-group">
                        <div className="row">
                            <div className="col-md-2">
                                <p>Students: <strong>{this.state.dataTable.length}</strong></p>
                            </div>
                            <div className="col-md-2">
                                <p>Nivel: {this.props.data.NIVEL}</p>
                            </div>
                            <div className="col-md-3">
                                <p>Dias: {this.props.data.DIAS}</p>
                            </div>
                            <div className="col-md-2">
                                <p>Salon: {this.props.data.SALON}</p>
                            </div>
                            <div className="col-md-3">
                                <p>Horario: {this.props.data.HORARIO}</p>
                            </div>
                        </div>
                <button className="btn-grupos" onClick={e=>{this.props.show()}}><i className="fas fa-arrow-circle-left"> Grupos</i></button>
                <button className="btn-grupos" onClick={e=>{this.getAlumno()}}><i className="fas fa-sync"></i>Actualizar</button>
            </div>

            <ul className="nav nav-pills nav-justified mb-3 table-content-parcial" id="pills-tab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="pills-first-parcial-tab" data-toggle="pill" href="#pills-first-parcial" role="tab" aria-controls="pills-first-parcial" aria-selected="true">Primer parcial</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-second-parcial-tab" data-toggle="pill" href="#pills-second-parcial" role="tab" aria-controls="pills-second-parcial" aria-selected="false">Segundo Parcial</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-third-parcial-tab" data-toggle="pill" href="#pills-third-parcial" role="tab" aria-controls="pills-third-parcial" aria-selected="false">Tercer Parcial</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" id="pills-nivelacion-tab" data-toggle="pill" href="#pills-nivelacion" role="tab" aria-controls="pills-nivelacion" aria-selected="false" onClick={()=>{this.clickHeaders("N")}}>Nivelación</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-finales-tab" data-toggle="pill" href="#pills-finales" role="tab" aria-controls="pills-finales" aria-selected="false" onClick={()=>{this.clickHeaders("N")}}>Finales</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-extraordinario-tab" data-toggle="pill" href="#pills-extraordinario" role="tab" aria-controls="pills-extraordinario" aria-selected="false" onClick={()=>{this.clickHeaders("N")}}>Extraordinario</a>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-first-parcial" role="tabpanel" aria-labelledby="pills-first-parcial-tab"> <Parcial1 dataTable={this.state.dataTable} notificacion={this.addNotification} />  </div>
                <div className="tab-pane fade" id="pills-second-parcial" role="tabpanel" aria-labelledby="pills-second-parcial-tab"><Parcial2 dataTable={this.state.dataTable} notificacion={this.addNotification} /></div>
                <div className="tab-pane fade" id="pills-third-parcial" role="tabpanel" aria-labelledby="pills-third-parcial-tab"><Parcial3 dataTable={this.state.dataTable} notificacion={this.addNotification} /></div>
                <div className="tab-pane fade" id="pills-nivelacion" role="tabpanel" aria-labelledby="pills-nivelacion-tab"><Nivelacion dataTable={this.studentsNivelacion()} notificacion={this.addNotification} /></div>
                <div className="tab-pane fade" id="pills-finales" role="tabpanel" aria-labelledby="pills-finales-tab"><Final dataTable={this.state.dataTable} notificacion={this.addNotification}/></div>
                <div className="tab-pane fade" id="pills-extraordinario" role="tabpanel" aria-labelledby="pills-extraordinario-tab"><Extraordinario dataTable={this.state.dataTable} notificacion={this.addNotification} /></div>
            </div>
            <NotificationSystem ref={this.notificationSystem} />
        </div>

        );
    }
}


/*
<div className="tab-pane fade" id="pills-alumno" role="tabpanel" aria-labelledby="pills-alumno-tab"><div className="contenedor-tabla"><Alumno grupo_id = {this.props.data.GRUPO_ID} get_alumno={this.getAlumno} notificacion={this.addNotification} /></div></div>
*/


export default Index;