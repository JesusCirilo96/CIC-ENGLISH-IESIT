import React, { Component} from "react";
import request from 'superagent';
import Select from 'react-select';
class Alumno extends Component{

    constructor(){
        super();
        this.state={
            dataLicenciatura:[],
            dataAlumno:[],
            matricula:'',
            matriculaEx:'',
            nombre:'',
            app:'',
            apm:'',
            estado:'',
            licenciatura:'',
            semestre:'',
            grupo:'',
            email:'',
            msg:false
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
              estado:this.state.estado,
              licenciatura: this.state.licenciatura,
              semestre: this.state.semestre,
              grupo: this.state.grupo,
              email: this.state.email,
              grupo_int: this.props.grupo_id
          })
          .set('Accept', /application\/json/)
          .end((err, response)=>{
            const res = (JSON.parse(response.text)['success']);
            if(res){
              this.setState({
                msg : true,
              });
              this.props.get_alumno()
            } 
          });
          e.preventDefault();
      }

      addAlumno (e){
        request
          .post('http://localhost:3000/alumnogrupoint')
          .send({
              matricula: this.state.matriculaEx,
              grupo_id: this.props.grupo_id
          })
          .set('Accept', /application\/json/)
          .end((err, response)=>{
            const res = (JSON.parse(response.text)['success']);
            if(res){
              this.setState({
                msg : true,
              });
              this.props.get_alumno()
            } 
          });
          e.preventDefault();
      }
     

    render(){
        const grupo = [
            {value: '0', label:'A'},
            {value: '1', label:'B'},
            {value: '2', label:'C'}
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

        const estado = [
            {value: '0', label:'Activo'},
            {value: '1', label:'Inactivo'}
        ]
        return(
            <div className="contenedor-tabla">
            <div className="col-md-12">
                <div className="row">
                    <div className="form-settings col-md-12">
                    {
                        this.state.msg ?
                        <div className="alert alert-primary" role="alert">
                        Alumno Agregado Correctamente...
                        </div>:
                        null
                    }
                        <div className="row">
                            <div className="col-md-6">
                            <p className="bold">AGREGA UN ALUMNO.</p>
                                <Select className="form-control"
                                    onChange={e => 
                                        this.setState({
                                            matriculaEx: e.value
                                        })
                                    }
                                    name = "licencitura"
                                    options = {this.state.dataAlumno}
                                    className="basic-single"
                                    classNamePrefix="select"
                                />
                                <small id="emailHelp" className="form-text text-muted">Solo se mostraran los alumnos agregados anteriormente y con un estado activo.</small>
                            </div>
                            <div className="col-md-2">
                                <p>add</p>
                                <button className="btn btn-primary" onClick={e=>{
                                    this.addAlumno(e);
                                }}>Añadir</button>
                            </div>
                        </div>
                        <hr/>
                        <form className="">
                            <div className="row form-group">
                                <div className="col-md-4">
                                    <p className="bold">*MATRICULA:</p>
                                    <input type="text" className="form-control" defaultValue={this.state.matricula} name="matricula" placeholder="Example: 1403B005" onChange={e=> this.change(e)} /> 
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-md-6">
                                    <p className="bold">*NAME:</p>
                                    <input type="text" className="form-control" defaultValue={this.state.nombre} name="nombre" onChange={e=> this.change(e)} /> 
                                </div>
                                <div className="col-md-6 input-group">
                                    <p className="bold">*LAST NAME:</p>
                                    <div className="input-group">
                                        <input type="text" className="form-control" defaultValue={this.state.app} name="app" onChange={e=> this.change(e)} />
                                        <input type="text" className="form-control" defaultValue={this.state.apm} name="apm" onChange={e=> this.change(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-md-6">
                                    <p className="bold">DEGREE:</p>
                                    <Select className="form-control"
                                        onChange={e => 
                                            this.setState({
                                                licenciatura: e.value
                                            })
                                        }
                                        name = "licencitura"
                                        options = {this.state.dataLicenciatura}
                                        className="basic-single"
                                        classNamePrefix="select"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <p className="bold">SEMESTER:</p>
                                    <Select className="form-control"
                                        onChange={e => 
                                            this.setState({
                                                semestre: e.value
                                            })
                                        }
                                        name = "modalidad"
                                        options = {semestre}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                     />
                                </div>
                                <div className="col-md-3">
                                <p className="bold">GROUP:</p>
                                    <Select className="form-control"
                                        onChange={e => 
                                            this.setState({
                                                grupo: e.value
                                            })
                                        }
                                        name = "grupo"
                                        options = {grupo}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-md-6">
                                    <p className="bold">EMAIL ADDRESS:</p>
                                    <input type="email" className="form-control" defaultValue={this.state.email} placeholder="example@example.com" name="email" onChange={e=> this.change(e)} /> 
                                </div>
                                <div className="col-md-3">
                                <p className="bold">ESTATUS:</p>
                                    <Select className="form-control"
                                        name = "estado"
                                        options = {estado}
                                        onChange={e => 
                                            this.setState({
                                                estado: String(e.value)
                                            })
                                        }
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <p className="bold">GROUP:</p>
                                    <input type="text" className="form-control" defaultValue={this.props.grupo_id} name="grupo_id" onChange={e=> this.change(e)} disabled /> 
                                </div>
                            </div>
                            <div className="row">
                                <div className="col align-self-end">
                                    <button className="btn btn-secondary float-right btn-primary" onClick={e=>{
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


export default Alumno;
