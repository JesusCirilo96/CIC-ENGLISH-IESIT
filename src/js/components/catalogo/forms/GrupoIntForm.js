import React, { Component } from "react";
import request from 'superagent';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

class GrupoForm extends Component {
  constructor (props){
    super(props);
    this.state = {
        dataDocente:[],
        dataNivel: [],
        dataPeriodo:[],
        dataCiclo:[],
        accion: '',
        id:this.props.data.GRUPO_ID,
        nombre: '',
        salon: '',
        grupo: '',
        modalidad:'',
        ciclo_escolar:'',
        periodo_escolar:'',
        turno:'',
        nivel:'',
        dias: '',
        docente:'',
        estado:'',
        horario:'',
        msg: false
    }
  }

  componentDidMount(){
    if(!this.props.edit){
        request
        .get('http://localhost:3000/docente')
        .end((err, response)=>{
            const data = JSON.parse(response.text);
            var docente = []
            for(var key in data){
                docente.push({'value':data[key].DOCENTE_ID,'label':data[key].NOMBRE_COMPLETO})
            }
            this.setState({
            dataDocente: docente
            });
        });
        request
        .get('http://localhost:3000/nivel')
        .end((err, response)=>{
            const data = JSON.parse(response.text);
            var level = []
            for(var key in data){
                level.push({'value':data[key].ID_NIVEL,'label':data[key].NOMBRE})
            }
            this.setState({
            dataNivel: level
            });
        });
        request
        .get('http://localhost:3000/cicloescolar')
        .end((err, response)=>{
            const data = JSON.parse(response.text);
            var ciclo = []
            for(var key in data){
                ciclo.push({'value':data[key].CICLO_ESCOLAR_ID,'label':data[key].NOMBRE})
            }
            this.setState({
            dataCiclo: ciclo
            });
        });
        request
        .get('http://localhost:3000/periodoescolar')
        .end((err, response)=>{
            const data = JSON.parse(response.text);
            var periodo = []
            for(var key in data){
                periodo.push({'value':data[key].PERIODO_ID,'label':data[key].NOMBRE})
            }
            this.setState({
            dataPeriodo: periodo
            });
        });
    }
  }

  change(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  changeDias(e){
    var days= '';
      for(var key in e){
        days += e[key].label + " "
      }
    this.setState({
        dias: days
    });
  }

  save (e){
    var nombre = this.state.nombre, salon = this.state.salon, horario = this.state.horario, estado = this.state.estado
    if(this.props.edit === false){
        var grupo = this.state.grupo, modalidad =this.state.modalidad, ciclo = this.state.ciclo_escolar, periodo = this.state.periodo_escolar
        var turno = this.state.turno, nivel = this.state.nivel
        var dias = this.state.dias, docente = this.state.docente

      /*  if(nombre === '') this.setState({errorNombre: true})
        if(salon === '') this.setState({errorSalon: true})
        if(grupo === '') this.setState({errorGrupo: true})
        if(modalidad === '') this.setState({errorModalidad: true})
        if(ciclo === '') this.setState({errorCiclo: true})
        if(periodo === '') this.setState({errorPeriodo: true})
        if(turno === '') this.setState({errorTurno: true})
        if(nivel === '') this.setState({errorNivel: true})
        if(dias === '') this.setState({errorDias: true})
        if(docente === '') this.setState({errorDocente: true})
        if(estado === '') this.setState({errorEstado: true})
        if(horario === '') this.setState({errorEstado: true})*/

        if(nombre !== '' && 
            salon !== '' &&
            grupo !== '' &&
            modalidad !== '' && 
            ciclo !== '' &&
            periodo !== '' &&
            turno !== '' && 
            nivel !== '' && 
            dias !== '' && 
            docente !== '' &&
            estado !== '' &&
            horario !== ''){
                this.state.accion = 'S'
                this.saveRequest()           
        }
    }else{
        if(nombre === ''){this.state.nombre = this.props.data.NOMBRE_GRUPO}
        if(salon === ''){this.state.salon = this.props.data.SALON}
        if(horario === ''){this.state.horario = this.props.data.HORARIO}
        if(estado === ''){this.state.estado = this.props.data.ESTADO}
        this.state.accion = 'U'
        this.saveRequest()
        this.props.get_data()
    }
    console.log(this.state)
    e.preventDefault()
  }

  saveRequest(){
    request
    .post('http://localhost:3000/grupoint')
    .send(this.state)
    .set('Accept', /application\/json/)
    .end((err, response)=>{
        const res = (JSON.parse(response.text)['success']);
        if(res){
        this.setState({
            msg : !this.state.msg,
        });
        } 
    });
  }

  getGrupo(grupo){
    switch (grupo) {
        case 0: return 'A'; break;
        case 1: return 'B'; break;
        case 2: return 'C'; break;
        default:
            break;
    }
  }
  getModalidad(modalidad){
    switch (modalidad) {
        case 0: return 'Escolarizada'; break;
        case 1: return 'Semi Escolarizada'; break;
        case 2: return 'No Escolarizada'; break;
        default:
            break;
    }
  }
  getTurno(turno){
    switch (turno) {
        case 0: return 'Matutino'; break;
        case 1: return 'Vespertino'; break;
        case 2: return 'Mixto'; break;
        default:
            break;
    }
  }

  render() {
    const days = [
        {value: '0', label:'Lunes'},
        {value: '1', label:'Martes'},
        {value: '2', label:'Miercoles'},
        {value: '3', label:'Jueves'},
        {value: '4', label:'Viernes'},
        {value: '5', label:'Sabado'},
        {value: '6', label:'Domingo'},
    ]
    const modalidad = [
        {value: '0', label:'Escolarizada'},
        {value: '1', label:'Semi Escolarizada'},
        {value: '2', label:'No Escolarizada'}
    ]
    const grupo = [
        {value: '0', label:'A'},
        {value: '1', label:'B'},
        {value: '2', label:'C'}
    ]
    const turno = [
        {value: '0', label:'Matutino'},
        {value: '1', label:'Vespertino'},
        {value: '2', label:'Mixto'}
    ]
    const estado = [
        {value: '0', label:'Activo'},
        {value: '1', label:'Inactivo'}
    ]

    return(
          <div className="form-large">
          {
            this.props.edit?
                <button className="btn-grupos" onClick={e=>{
                    this.props.showEdit()
                }}><i className="fas fa-arrow-circle-left">Regresar</i></button>
            :null
          }          
          {
            this.state.msg ?
            <div className="alert alert-primary" role="alert">
              Grupo Agregado Correctamente...
            </div>:
            null
          }
            <form className="contact100-form validate-form col-md-12">
                <div className="row">
                    <div className="col-md-4">
                    Nombre:
                        <div className="wrap-input100">
                            <input className="input100" type="text" required
                            name = "nombre"
                            placeholder="Example: Beginner A"
                            defaultValue={this.props.data.NOMBRE_GRUPO}
                            onChange={e=> this.change(e)}
                            />
                            <span className="focus-input100"></span>
                        </div>
                    </div>
                    <div className="col-md-4">
                    Salon:
                        <div className="wrap-input100">
                            <input className="input100" type="text" required
                            name = "salon"
                            placeholder="Example: A1"
                            defaultValue={this.props.data.SALON}
                            onChange={e=> this.change(e)} 
                            />
                            <span className="focus-input100"></span>
                        </div>
                    </div>
                    <div className="col-md-4">
                    Grupo:
                        {
                            this.props.edit?
                                <div className="wrap-input100">
                                <input className="input100"
                                    type="text"
                                    disabled
                                    value={this.getGrupo(parseInt(this.props.data.GRUPO))}
                                    onChange={e=> this.change(e)}
                                />
                                <span className="focus-input100"></span>
                            </div>:
                            <div className="selectStyle">
                                <Select className="form-control"
                                    name = "grupo"
                                    onChange={e => 
                                        this.setState({
                                            grupo: e.value
                                        })
                                    }
                                options = {grupo}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                />
                            </div>
                        }
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                    Modalidad:
                        {
                            this.props.edit?
                            <div className="wrap-input100">
                              <input className="input100"
                                type="text"
                                disabled
                                value={this.getModalidad(parseInt(this.props.data.MODALIDAD))}
                                onChange={e=> this.change(e)}
                              />
                              <span className="focus-input100"></span>
                            </div>:
                            <div className="selectStyle">
                                <Select className="form-control"
                                    onChange={e => 
                                        this.setState({
                                            modalidad: e.value
                                        })
                                    }
                                    name = "modalidad"
                                    options = {modalidad}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        }
                    </div>
                    <div className="col-md-4">
                    Ciclo Escolar:
                    {
                        this.props.edit?
                        <div className="wrap-input100">
                              <input className="input100" disabled
                                type="text"
                                disabled
                                value={this.props.data.CICLO_ESCOLAR}
                              />
                            <span className="focus-input100"></span>
                        </div>:
                        <div className="selectStyle">
                             <Select className="form-control"
                                    onChange={e => 
                                        this.setState({
                                            ciclo_escolar: e.value
                                        })
                                    }
                                    name = "nivel"
                                    options = {this.state.dataCiclo}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                        </div>
                    }
                    </div>
                    <div className="col-md-4">
                    Periodo Escolar:
                    {
                        this.props.edit?
                        <div className="wrap-input100">
                              <input className="input100" disabled
                                type="text"
                                disabled
                                value={this.props.data.PERIODO_ESCOLAR}
                              />
                            <span className="focus-input100"></span>
                        </div>:                
                            <div className="selectStyle">
                                <Select className="form-control"
                                    onChange={e => 
                                        this.setState({
                                            periodo_escolar: e.value
                                        })
                                    }
                                    name = "nivel"
                                    options = {this.state.dataPeriodo}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>                           
                    }
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                    Turno:
                        {
                            this.props.edit?
                            <div className="wrap-input100">
                              <input className="input100"
                                type="text"
                                disabled
                                value={this.getTurno(parseInt(this.props.data.TURNO))}
                                onChange={e=> this.change(e)}
                              />
                              <span className="focus-input100"></span>
                            </div>:
                            <div className="selectStyle">
                                <Select className="form-control"
                                    name = "turno"
                                    options = {turno}
                                    onChange={e => 
                                        this.setState({
                                            turno: e.value
                                        })
                                    }
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        }
                    </div>
                    <div className="col-md-4">
                    Nivel:
                        {
                            this.props.edit?
                            <div className="wrap-input100">
                              <input className="input100"
                                type="text"
                                disabled
                                value={this.props.data.NIVEL}
                                onChange={e=> this.change(e)}
                              />
                              <span className="focus-input100"></span>
                            </div>:
                            <div className="selectStyle">
                                <Select className="form-control"
                                    onChange={e => 
                                        this.setState({
                                            nivel: e.value
                                        })
                                    }
                                    name = "nivel"
                                    options = {this.state.dataNivel}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        }
                    </div>
                    <div className="col-md-4">
                    Dias:
                        {
                            this.props.edit?
                            <div className="wrap-input100">
                              <input className="input100"
                                type="text"
                                disabled
                                value={this.props.data.DIAS}
                                onChange={e=> this.change(e)}
                              />
                              <span className="focus-input100"></span>
                            </div>:
                            <div className="selectStyle">
                                <Select className="form-control"
                                closeMenuOnSelect={false}
                                isMulti
                                name = "dias"
                                onChange={(e) => 
                                    this.changeDias(e)
                                }
                                options = {days}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                components  = {makeAnimated()}
                                />
                            </div>
                        }
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                    Horario:
                        {
                            <div className="wrap-input100">
                              <input className="input100"
                                type="text"
                                name="horario"
                                defaultValue={this.props.data.HORARIO}
                                placeholder="Example: 09:10 Am to 10:30 Am"
                                onChange={e=> this.change(e)}
                              />
                              <span className="focus-input100"></span>
                            </div>
                        }
                    </div>
                    <div className="col-md-4">
                    Docente:
                        {
                            this.props.edit?
                            <div className="wrap-input100">
                              <input className="input100"
                                type="text"
                                disabled
                                value={this.props.data.NOMBRE_DOCENTE}
                                onChange={e=> this.change(e)}
                              />
                              <span className="focus-input100"></span>
                            </div>:
                            <div className="selectStyle">
                            <Select className="form-control"
                                    onChange={e => 
                                        this.setState({
                                            docente: e.value
                                        })
                                    }
                                    name = "docente"
                                    options = {this.state.dataDocente}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </div>
                        }
                    </div>
                    <div className="col-md-4">
                    Estado:
                        <div className="selectStyle">
                            <Select className="form-control"
                                defaultValue={estado[this.props.data.ESTADO]}
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
                    </div>              
                </div>
                <div className="">
                        <div className="container-contact100-form-btn">
                            <button className="contact100-form-btn"
                            onClick={e=>{
                                this.save(e);
                            }}
                            >
                            Guardar
                            </button>
                        </div>
                </div> 
            </form>
          </div>
    );
  }
}

export default GrupoForm;

/*

<div className="wrap-input100">
                            <input className="input100" type="text" required
                                name = "ciclo_escolar"
                                placeholder="Example: 2014-2018"
                                defaultValue={this.props.data.CICLO_ESCOLAR}
                                onChange={e=> this.change(e)}
                            />
                            <span className="focus-input100"></span>
                        </div>
*/