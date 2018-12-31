import React, {Component} from 'react';
import NotificationSystem from 'react-notification-system';
import ReactTable from 'react-table';
import request from 'superagent'

import Alumno from '../mygroups/tables/internos/alumno';

class Inscripcion extends Component{
    constructor(){
        super();

        this.state = {
            dataGrupos:[],
            showForm: true,
            showTable: false
        };
        

        this.showForm = this.showForm.bind(this)
        this.notificationSystem = React.createRef();
        this.addNotification = this.addNotification.bind(this)
        this.getGrupoInt = this.getGrupoInt.bind(this)
    }

    componentDidMount(){
        this.getGrupoInt()
    }

    
    showForm(){
        this.setState ({
            showForm : !this.state.showForm,
            showTable : !this.state.showTable
        })
    }

    addNotification(title,message,level,e){
        const notification = this.notificationSystem.current;
        notification.addNotification({
            title:title,
            message: message,
            level: level,
            position:'br'
        });
        e.preventDefault()
    };

    getGrupoInt(){
        request
        .post('http://localhost:3000/getgroupint')
        .send({
            "clave": '0'
        })            
        .set('Accept', /application\/json/)
        .end((err, response)=>{
            const res = (JSON.parse(response.text))
            this.setState({dataGrupos:res})
        });
    }

    render(){
        const columns = [
            {
              Header:"Docente",
              accessor: "NOMBRE_DOCENTE",
              filterable: true
            },
            {
              Header:"Horario",
              accessor: "HORARIO",
              filterable:true
              },
              {
                Header:"Nivel",
                accessor: "NIVEL",
                filterable: true
              },
              {
                Header:"Dias",
                accessor: "DIAS",
                filterable: false
              },
              {
                Header:"Cupo",
                accessor: "ESTADO",
                filterable: false,
                width: 100,
                maxWidth: 100,
                minWidth: 100
              },
            {
              Header:"Acciones",
              Cell: props =>{
                return(
                  <button className="btn btn-light" 
                    onClick={e=>
                        this.setState ({
                            showForm : !this.state.showForm,
                            showTable : !this.state.showTable,
                            grupo_id: props.original.GRUPO_ID
                        })
                    }
                  >Agregar</button>
                )
              },
              filterable: false,
              width: 100,
              maxWidth: 100,
              minWidth: 100
            }
        
        ];
        return(
            <div className="contenedor-tabla">
            <h2 className="text-center">Inscripciones</h2>
            {
                this.state.showForm?
                <ReactTable 
                    previousText = "Anterior"
                    nextText =  'Siguiente'
                    loadingText = 'Cargando...'
                    noDataText = 'No se encontraron Registros'
                    pageText = 'Pagina'
                    ofText = 'de'
                    rowsText = 'Registros'
                    defaultPageSize = {20}
                    filterable
                    columns = {columns} data = {this.state.dataGrupos}>
                </ReactTable>
                :null
            }
            {
                this.state.showTable?
                <div>
                    <a href="#" onClick={this.showForm} >Regresar</a>
                    <Alumno grupo_id = {this.state.grupo_id} get_alumno={this.getGrupoInt} notificacion={this.addNotification} />
                </div>
                :null
            }
                <NotificationSystem ref={this.notificationSystem} />
            </div>
        );
    }

}

export default Inscripcion;
