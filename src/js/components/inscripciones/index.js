import React, {Component} from 'react';
import NotificationSystem from 'react-notification-system';
import ReactTable from 'react-table';
import request from 'superagent';
import Alumno from './inscripcion';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button'; 
import Select from 'react-select';
import {Dropdown} from 'primereact/dropdown';

class Inscripcion extends Component{
    constructor(){
        super();

        this.state = {
            periodoEscolar: null,
            periodoOptions:[],
            dataGrupos:[],
            showForm: true,
            showTable: false,
            visible: false,
            grupo_id: '',
            matricula:'',
            tipo_curso:'',
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
        this.getGrupoInt('0','ALL','0')
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
        request
        .get('http://localhost:3000/periodoescolar')
        .set('Accept', /application\/json/)
        .end((err, response)=>{
            const res = (JSON.parse(response.text))
            var periodo = []
            for(var key in res){
                periodo.push({name:res[key].NOMBRE,code:res[key].PERIODO_ID})
            }
            this.setState({
                periodoOptions:periodo
            })
        });
    } 
    showForm(){
        this.setState ({
            showForm : !this.state.showForm,
            showTable : !this.state.showTable
        })
    }

    onPeriodoChange(e) {
        this.setState({periodoEscolar: e.value});
        this.getGrupoInt("0","PE",e.value.code)
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

    getGrupoInt(clave,opcion,periodo){
        request
        .post('http://localhost:3000/getgroupint')
        .send({
            "opcion": opcion,
            "clave": clave,
            "periodo_id": periodo
        })            
        .set('Accept', /application\/json/)
        .end((err, response)=>{
            const res = (JSON.parse(response.text))
            //console.log(res)
            this.setState({dataGrupos:res})
        });
    }

    addAlumno (matricula, nroAlumnos){
        if(nroAlumnos < 15){
            request
            .post('http://localhost:3000/alumnogrupoint')
            .send({
                matricula: matricula,
                grupo_id: this.state.grupo_id,
                tipo_curso: this.state.tipo_curso
            })
            .set('Accept', /application\/json/)
            .end((err, response)=>{
                const res = (JSON.parse(response.text)['data'].success);
                const msg = (JSON.parse(response.text)['data'].msg);
                if(res){
                    this.addNotification("Alumno",msg,"success")
                    this.setState({
                        nroAlumnos: this.state.nroAlumnos + 1
                    })
                    if(this.state.periodoEscolar.code === ""){
                        this.getGrupoInt('0','ALL','0')
                    }else{
                        this.getGrupoInt("0","PE",this.state.periodoEscolar.code)
                    }
                }else{
                    this.addNotification("Alumno",msg,"error")
                }
            });
        }else{
            this.addNotification("Alumno","Se alcanzo el limite de alumnos inscritos: "+ this.state.nroAlumnos,"error")
        }
    }

    grupoInternoUpdate(){  
        if(this.state.periodoEscolar.code === ""){
            this.getGrupoInt('0','ALL','0')
        }else{
            this.getGrupoInt("0","PE",this.state.periodoEscolar.code)
        }
        this.showForm()
    }

    render(){
        const footer = (
            <div className="row justify-content-between">
                <div className="col-4">
                    <a href="#" onClick={e=>{
                                this.setState ({
                                    showForm : !this.state.showForm,
                                    showTable : !this.state.showTable,
                                    visible: false
                    })}}>¿El alumno no esta inscrito?</a>
                </div>
                <div className="col-8">
                    <Button label="Agregar" icon="pi pi-check" onClick={e=>{
                        this.addAlumno(this.state.matricula,this.state.nroAlumnos)
                    }} />
                    <Button label="Cancelar" icon="pi pi-times" onClick={this.onHide} className="p-button-secondary" /> 
                </div>    
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
        const tipo_curso = [
            {value: '1', label:'Curricular'},
            {value: '2', label:'Curso'},
            {value: '3', label:'Recursamiento'}
        ]
        return(
            <div className="contenedor-tabla">
                {
                this.state.showForm?
                <div>
                    <Dropdown value={this.state.periodoEscolar} options={this.state.periodoOptions} onChange={e=>{this.onPeriodoChange(e)}} style={{width:'250px'}} placeholder="Filtrar por periodo" optionLabel="name"/>            
                    <ReactTable 
                        previousText = "Anterior"
                        nextText =  'Siguiente'
                        loadingText = 'Cargando...'
                        noDataText = 'No se encontraron Registros'
                        pageText = 'Pagina'
                        ofText = 'de'
                        rowsText = 'Registros'
                        defaultPageSize = {20}
                        className="-highlight"
                        filterable
                        columns = {columns} data = {this.state.dataGrupos}>
                    </ReactTable>
                </div>
                :null
                }        
                {
                this.state.showTable?
                <div>
                    <a href="#" onClick={e=>this.grupoInternoUpdate()} >Regresar</a>
                    <Alumno grupo_id = {this.state.grupo_id} nroAlumnos={this.state.nroAlumnos} grupo_int={this.getGrupoInt} notificacion={this.addNotification} />
                </div>
                :null
                }

                <Dialog header="Reinscripcion" visible={this.state.visible} style={{width: '50vw'}} footer={footer} onHide={this.onHide} maximizable>
                <div className="row">
                    <div className="col-md-7">
                        <Select className="form-control"
                            onChange={e => 
                                this.setState({
                                matricula: e.value
                            })}
                            placeholder="Nombre del alumno"
                            options = {this.state.dataAlumno}
                            className="basic-single"
                            classNamePrefix="select"
                        />
                    </div>
                    <div className="col-md-5">
                        <Select className="form-control"
                            onChange={e => 
                                this.setState({
                                tipo_curso: e.value
                            })}
                            options = {tipo_curso}
                            placeholder="Tipo curso"
                            className="basic-single"
                            classNamePrefix="select"
                        />
                    </div>
                </div>
                <small id="emailHelp" className="form-text text-muted">Solo figuran los alumnos Inscritos con anterioridad</small>
            </Dialog>

            <NotificationSystem ref={this.notificationSystem} />
            </div>
        );
    }

}

export default Inscripcion;
