import React, {Component} from 'react';
import NotificationSystem from 'react-notification-system';
import ReactTable from 'react-table';
import request from 'superagent';
import Alumno from './inscripcion';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button'; 
import Select from 'react-select';

class Inscripcion extends Component{
    constructor(){
        super();

        this.state = {
            dataGrupos:[],
            showForm: true,
            showTable: false,
            visible: false,
            grupo_id: '',
            matricula:'',
            nroAlumnos: 0
        };
        

        this.showForm = this.showForm.bind(this)
        this.notificationSystem = React.createRef();
        this.addNotification = this.addNotification.bind(this)
        this.getGrupoInt = this.getGrupoInt.bind(this)
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    componentDidMount(){
        this.getGrupoInt()
        request
        .get('http://localhost:3000/alumno')
        .end((err, response)=>{
            const data = JSON.parse(response.text);
            var alumno = []
            for(var key in data){
                alumno.push({'value':data[key].MATRICULA,'label':data[key].NOMBRE_COMPLETO})
            }
            this.setState({
                dataAlumno: alumno
            });
        });
    } 
    showForm(){
        this.setState ({
            showForm : !this.state.showForm,
            showTable : !this.state.showTable
        })
    }

    onClick(GRUPO_ID, ALUMNOS_INSCRITOS) {
        this.setState({
            visible: true,
            grupo_id: GRUPO_ID,
            nroAlumnos: ALUMNOS_INSCRITOS
        });
    }

    onHide(event) {
        this.setState({visible: false});
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

    addAlumno (matricula, nroAlumnos){
        console.log(nroAlumnos <= 15);
        if(nroAlumnos < 15){
            request
            .post('http://localhost:3000/alumnogrupoint')
            .send({
                matricula: matricula,
                grupo_id: this.state.grupo_id
            })
            .set('Accept', /application\/json/)
            .end((err, response)=>{
                const res = (JSON.parse(response.text)['data'].success);
                const msg = (JSON.parse(response.text)['data'].msg);
                if(res){
                    this.addNotification("Alumno",msg,"success")
                    this.getGrupoInt()
                    this.setState({
                        nroAlumnos: this.state.nroAlumnos + 1
                    })
                }else{
                    this.addNotification("Alumno",msg,"error")
                }
            });
        }else{
            this.addNotification("Alumno","Se alcanzo el limite de alumnos inscritos: "+ this.state.nroAlumnos,"error")
        }
    }

    render(){
        const footer = (
            <div>
                <Button label="Agregar" icon="pi pi-check" onClick={e=>{
                                    this.addAlumno(this.state.matricula,this.state.nroAlumnos)
                                }} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.onHide} className="p-button-secondary" />
            </div>
        );
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
                Header:"A. Inscritos",
                accessor:"ALUMNOS_INSCRITOS",
                filterable: false,
                width: 100,
                maxWidth: 100,
                minWidth: 100
              },
            {
              Header:"Nuevo",
              Cell: props =>{
                var v_disabled = ''
                if(props.original.ALUMNOS_INSCRITOS >= 15){
                    v_disabled='disabled'
                }
                return(
                    <Button label="Añadir" icon="pi pi-external-link" onClick={(e)=>this.onClick(props.original.GRUPO_ID,props.original.ALUMNOS_INSCRITOS)} disabled={v_disabled}/>
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

            <Dialog header="Reinscripcion" visible={this.state.visible} style={{width: '50vw'}} footer={footer} onHide={this.onHide} maximizable>
                <div className="row">
                    <div className="col-md-12">
                        <Select className="form-control"
                            onChange={e => 
                                this.setState({
                                matricula: e.value
                            })}
                            name = "licencitura"
                            options = {this.state.dataAlumno}
                            className="basic-single"
                            classNamePrefix="select"
                        />
                    </div>
                    <div className="col-md-12">
                        <a href="#" onClick={e=>{
                             this.setState ({
                                 showForm : !this.state.showForm,
                                 showTable : !this.state.showTable,
                                 visible: false
                        })}}>¿El alumno no esta inscrito?</a>
                    </div>
                </div>
            </Dialog>

            <NotificationSystem ref={this.notificationSystem} />
            </div>
        );
    }

}

export default Inscripcion;
