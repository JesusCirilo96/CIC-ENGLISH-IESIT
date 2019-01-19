import React, { Component} from "react";
import request from 'superagent';
import Select from 'react-select';

class Inscripcion extends Component{

    constructor(props){
        super();
        this.state={
            dataLicenciatura:[],
            dataAlumno:[],
            matricula:'',
            matriculaEx:'',
            nombre:'',
            app:'',
            apm:'',
            licenciatura:'',
            semestre:'',
            grupo:'',
            email:'',
            nroAlumnos: props.nroAlumnos,
            disabled: "",
            tipo_curso:""
        }
    }

    componentWillMount(){
        request
        .get('http://localhost:3000/licenciatura')
        .end((err, response)=>{
            const data = JSON.parse(response.text);
            var lic = []
            for(var key in data){
                lic.push({'value':data[key].LICENCIATURA_ID,'label':data[key].NOMBRE})
            }
            this.setState({
                dataLicenciatura: lic
            });
        });
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

    change(e){
        this.setState({
          [e.target.name]: e.target.value
        });
    }
    
    save (e){
        request
          .post('http://localhost:3000/alumno')
          .send({
              modificacion:'S',
              matricula: this.state.matricula,
              nombre: this.state.nombre,
              apellido_pat: this.state.app,
              apellido_mat: this.state.apm,
              licenciatura: this.state.licenciatura,
              semestre: this.state.semestre,
              grupo: this.state.grupo,
              email: this.state.email,
              grupo_int: this.props.grupo_id
          })
          .set('Accept', /application\/json/)
          .end((err, response)=>{
            const res = (JSON.parse(response.text)['data'].success);
            const msg = (JSON.parse(response.text)['data'].msg);
            if(res){
                this.props.notificacion("Alumno",msg,"success")
                this.addAlumno(this.state.matricula)
            }else{
                this.props.notificacion("Alumno",msg,"error")
            } 
          });
          e.preventDefault();
      }

      addAlumno (matricula){
        if(this.state.nroAlumnos < 15){
            request
            .post('http://localhost:3000/alumnogrupoint')
            .send({
                matricula: matricula,
                grupo_id: this.props.grupo_id,
                tipo_curso: this.state.tipo_curso
            })
            .set('Accept', /application\/json/)
            .end((err, response)=>{
                const res = (JSON.parse(response.text)['data'].success);
                const msg = (JSON.parse(response.text)['data'].msg);
                if(res){
                    this.props.notificacion("Alumno",msg,"success")
                    this.setState({
                        nroAlumnos: this.state.nroAlumnos + 1
                    })
                    //console.log(this.state.nroAlumnos)
                }else{
                    this.props.notificacion("Alumno",msg,"error")
                }
            });
        }
        if(this.state.nroAlumnos === 14){
            this.props.notificacion("¡Alumno","Se alcanzo el limite de alumnos inscritos! ","info")
            this.setState({
                disabled:"disabled"
            })
        }
      }

    render(){
        const grupo = [
            {value: '0', label:'A'},
            {value: '1', label:'B'},
            {value: '2', label:'C'}
        ]
        const tipo_curso = [
            {value: '1', label:'Curricular'},
            {value: '2', label:'Curso'},
            {value: '3', label:'Recursamiento'}
        ]
        const semestre = [
            {value:'1', label:'Primero'},
            {value:'2', label:'Segundo'},
            {value:'3', label:'Tercero'},
            {value:'4', label:'Cuarto'},
            {value:'5', label:'Quinto'},
            {value:'6', label:'Sexto'},
            {value:'7', label:'Septimo'},
            {value:'8', label:'Octavo'},
            {value:'9', label:'Noveno'},
            {value:'10', label:'Decimo'}
        ]
        return(
            <div className="">
            <div className="col-md-12">
                <div className="row">
                    <div className="form-settings col-md-12">
                        <form className="">
                            <div className="row form-group">
                                <div className="col-md-4">
                                    <p className="bold">*Matricula:</p>
                                    <input type="text" className="form-control" maxLength="8" defaultValue={this.state.matricula} name="matricula" placeholder="Example: 1403B005" onChange={e=> this.change(e)} disabled={this.state.disabled} /> 
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-md-6">
                                    <p className="bold">*Nombre:</p>
                                    <input type="text" className="form-control" defaultValue={this.state.nombre} name="nombre" placeholder="Nombre" onChange={e=> this.change(e)} disabled={this.state.disabled}/> 
                                </div>
                                <div className="col-md-6 input-group">
                                    <p className="bold">*Apellidos:</p>
                                    <div className="input-group">
                                        <input type="text" className="form-control" defaultValue={this.state.app} name="app" placeholder="Apellido paterno" onChange={e=> this.change(e)} disabled={this.state.disabled}/>
                                        <input type="text" className="form-control" defaultValue={this.state.apm} name="apm" placeholder="Apellido materno" onChange={e=> this.change(e)} disabled={this.state.disabled}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-md-6">
                                    <p className="bold">Licenciatura:</p>
                                    <Select className="form-control"
                                        onChange={e => 
                                            this.setState({
                                                licenciatura: e.value
                                            })
                                        }
                                        isDisabled={this.state.disabled}
                                        name = "licencitura"
                                        options = {this.state.dataLicenciatura}
                                        className="basic-single"
                                        classNamePrefix="select"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <p className="bold">Semestre:</p>
                                    <Select className="form-control"
                                        onChange={e => 
                                            this.setState({
                                                semestre: e.value
                                            })
                                        }
                                        isDisabled={this.state.disabled}
                                        name = "modalidad"
                                        options = {semestre}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                     />
                                </div>
                                <div className="col-md-3">
                                <p className="bold">Grupo:</p>
                                    <Select className="form-control"
                                        onChange={e => 
                                            this.setState({
                                                grupo: e.value
                                            })
                                        }
                                        isDisabled = {this.state.disabled}
                                        name = "grupo"
                                        options = {grupo}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-md-6">
                                    <p className="bold">Correo electronico:</p>
                                    <input type="email" className="form-control" defaultValue={this.state.email} placeholder="example@example.com" name="email" onChange={e=> this.change(e)} disabled = {this.state.disabled} /> 
                                </div>
                                <div className="col-md-3">
                                <p className="bold">Tipo curso:</p>
                                    <Select className="form-control"
                                        onChange={e => 
                                            this.setState({
                                                tipo_curso: e.value
                                            })
                                        }
                                        isDisabled = {this.state.disabled}
                                        name = "tipo_curso"
                                        options = {tipo_curso}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <p className="bold">Grupo Ingles:</p>
                                    <input type="text" className="form-control" defaultValue={this.props.grupo_id} name="grupo_id" onChange={e=> this.change(e)} disabled /> 
                                </div>
                            </div>
                            <div className="row">
                                <div className="col align-self-end">
                                    <button className="btn btn-secondary float-right btn-primary" disabled = {this.state.disabled} onClick={e=>{
                                        this.save(e);
                                    }}>Save</button>
                                </div>
                            </div>
                        </form>
                        <hr/>
                        <small id="emailHelp" className="form-text text-muted">Una vez guardado los datos, el alumno se agrega en automatico al grupo.</small>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}


export default Inscripcion;
