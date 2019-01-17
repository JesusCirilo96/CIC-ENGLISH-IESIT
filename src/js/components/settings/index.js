import React, { Component} from "react";
import request from 'superagent';
import store from '../../store';
import {InputMask} from 'primereact/inputmask'
import NotificationSystem from 'react-notification-system';

class Settings extends Component{

    constructor(){
        super();
        this.state={
            nombre :'',
            id: store.getState().teacher[0].id,
            app:'',
            apm:'',
            email:'',
            level:'',
            date:'',
            status:'',
            mobile_number:'',
            msgD:false,
            passwordA: '',
            passwordN:'',
            passwordC:''
        }
        this.notificationSystem = React.createRef();
    }
    change(e){
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    getEstado(estado){
        switch (estado) {
            case 0: return 'Inactive'; break;
            case 1: return 'Active'; break;
            default:
                break;
        }
      }

    getNivel(nivel){
        switch (nivel) {
            case '1': return 'Administrador'; break;
            case '2': return 'Docente'; break;
            case '3': return 'Alumno'; break;
            default:
                break;
        }
      }

    componentDidMount(){
        request
        .post('http://localhost:3000/getbyid')
        .send({
            "tbl":"D",
            "id": store.getState().teacher[0].id
        })            
        .set('Accept', /application\/json/)
        .end((err, response)=>{
            const res = (JSON.parse(response.text))
            //this.setState({dataUser:res})
            this.getDataState(res)
            console.log(this.state);
        });
    }

    saveD(e){
        request
          .post('http://localhost:3000/docente')
          .send({
                modificacion:'D',
                id:this.state.id,
                nombre: this.state.nombre,
                apellido_mat: this.state.apm,
                apellido_pat:this.state.app,
                email: this.state.email,
                telefono: this.state.mobile_number
            })
          .set('Accept', /application\/json/)
          .end((err, response)=>{
            const res = (JSON.parse(response.text)['success']);
            if(res){
              this.setState({
                msgD : !this.state.msgD,
              });
            } 
          });
          e.preventDefault();
      }

      savePassword(e){
          if(this.state.passwordN === this.state.passwordC){
            request
            .post('http://localhost:3000/docente')
            .send({
                    modificacion:'P',
                    docente_id:this.state.id,
                    passwordA:this.state.passwordA,
                    passwordN:this.state.passwordN
                })
            .set('Accept', /application\/json/)
            .end((err, response)=>{
                const res = (JSON.parse(response.text).success);
                const msg = (JSON.parse(response.text).msg);
                if(res){
                   this.addNotification("Contraseña",msg,"success")        
                }else{
                    this.addNotification("Contraseña",msg,"error")        
                }
            });
          }else{
            this.addNotification("Contraseña","Las contraseñas no coinciden","warning")
          }
        
          e.preventDefault();
      }

      getDataState(djson){
        var nombre = '', app='', apm='', email='', picture='',level='',date='',status='',mobile_number = '';
        djson.map((data,key)=>{
            nombre= data.NOMBRE,
            app = data.APP,
            apm = data.APM,
            email = data.EMAIL,            
            level = data.NIVEL_ACCESO,
            date = data.FECHA_REGISTRO,
            status = data.ESTADO,
            mobile_number = data.TELEFONO
        })
        this.setState({
            nombre:nombre,
            app : app,
            apm : apm,
            email : email,
            level : level,
            date : date,
            picture: picture,
            status : status,
            mobile_number : mobile_number            
        })
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

    render(){
        return(
            <div className="contenedor-tabla">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-3">
                            <h1>My Profile</h1>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-3 form-settings-aside">
                            <div className="row">
                                <div className="col-md-12"><p><strong>Access Level:</strong> <br/>{this.getNivel(this.state.level)}</p></div>
                            </div>
                            <div className="row">
                                <div className="col-md-12"><p><strong>Added the day:</strong><br/> {this.state.date}</p></div>
                            </div>
                            <div className="row">
                                <div className="col-md-12"><p><strong>Status:</strong> {this.getEstado(this.state.status)} </p></div>
                            </div>
                        </div>
                        <div className="form-settings col-md-9">
                            <form className="">
                                <div className="row form-group">
                                    <div className="col-md-6">
                                        <p className="bold">NAME:</p>
                                        <input type="text" className="form-control" defaultValue={this.state.nombre} name="nombre" onChange={e=> this.change(e)} /> 
                                    </div>
                                    <div className="col-md-6 input-group">
                                        <p className="bold">LAST NAME:</p>
                                        <div className="input-group">
                                            <input type="text" className="form-control" defaultValue={this.state.app} name="app" onChange={e=> this.change(e)} />
                                            <input type="text" className="form-control" defaultValue={this.state.apm} name="apm" onChange={e=> this.change(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-md-6">
                                        <p className="bold">EMAIL ADDRESS:</p>
                                        <input type="email" className="form-control" defaultValue={this.state.email} placeholder="example@example.com" name="email" onChange={e=> this.change(e)} />
                                    </div>
                                    <div className="col-md-6">
                                        <p className="number bold">MOBILE NUMBER:</p>
                                        <InputMask size="50" mask="(999) 999-9999" value={this.state.mobile_number} placeholder="Enter your mobile number" name="mobile_number" onChange={(e) => this.change(e)}></InputMask>
                                        <small id="emailHelp" className="form-text text-muted">This information can be used to contact you.</small>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col align-self-end">
                                        <button className="btn btn-primary" onClick={e=>{
                                            this.saveD(e);
                                        }}>Save</button>
                                    </div>
                                    {
                                        this.state.msgD?
                                            <p>Se actualizaron los datos correctamente.</p>
                                        :null
                                    }
                                </div>
                            </form>
                            <hr/>
                            <h4>Change your password</h4>
                            <form className="col-md-12 form-group">
                                
                                    <div className="row">
                                        <div className="col-md-5">
                                            <p className="bold">Contraseña Actual:</p>
                                            <input type="password" className="form-control"  placeholder="Contraseña Actual" name="passwordA" onChange={e=>this.change(e)}/> 
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5">
                                            <p className="bold">Nueva contraseña:</p>
                                            <input type="password" className="form-control" placeholder="Nueva Contraseña" name="passwordN" onChange={e => this.change(e)}/> 
                                        </div>
                                        <div className="col-md-5">
                                            <p className="bold">Confirmar contraseña:</p>
                                            <input type="password" className="form-control" placeholder="Confirmar Contraseña" name="passwordC" onChange={e => this.change(e)}/> 
                                        </div>
                                    </div>
                                    <br/>   
                                    <div className="row">
                                        <div className="col-md-2">
                                            <button className="btn btn-secondary"
                                                onClick={e=>
                                                    this.savePassword(e)
                                                }
                                            >Change</button>
                                        </div>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
                <NotificationSystem ref={this.notificationSystem} />
            </div>
        );
    }

}

export default Settings;