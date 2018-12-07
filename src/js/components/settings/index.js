import React, { Component} from "react";
import request from 'superagent';
import store from '../../store';

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
            picture:'',
            mobile_number:'',
            file: '',
            imagePreviewUrl: '',
            msgD:false
        }

        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file

      }
    
      _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
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

      getDataState(djson){
        var nombre = '', app='', apm='', email='', picture='',level='',date='',status='',mobile_number = '';
        djson.map((data,key)=>{
            nombre= data.NOMBRE,
            app = data.APP,
            apm = data.APM,
            email = data.EMAIL,
            picture = data.PICTURE,
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
            mobile_number : mobile_number,
            imagePreviewUrl:picture
        })
      }

    render(){
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img className="img-thumbnail" src={imagePreviewUrl}/>);
        }

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
                                    <div className="img-profile-settings col-md-12">
                                        <figure>
                                            {$imagePreview}
                                        </figure>                            
                                    </div>
                                </div>
                            <form>
                                <div className="row">
                                    <div className="col-md-12 input-group">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" name="picture" onChange={this._handleImageChange} id="inputGroupFile04"/>
                                            <label className="custom-file-label" for="inputGroupFile04">Choose file</label>
                                        </div>
                                        <div class="input-group-append">
                                            <button className="btn btn-outline-secondary" type="submit" onClick={this._handleSubmit}>Upload</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <hr/>
                            <div className="row">
                                <div className="col-md-12"><h5 className="text-center">NOTES</h5></div>
                            </div>
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
                                        <small id="emailHelp" className="form-text text-muted">You can use the email to login.</small>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="number bold">MOBILE NUMBER:</p>
                                        <input type="text" className="form-control" defaultValue={this.state.mobile_number} placeholder="Enter Your mobile Number" name="mobile_number" onChange={e=> this.change(e)}/> 
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
                            <form>
                                <div className="row justify-content-start form-group">
                                    <div className="col-md-5">
                                        <p className="bold">CURRENT PASSWORD:</p>
                                        <input type="password" className="form-control" placeholder="Current Password" name="last-password"/> 
                                    </div>
                                    <div className="col-md-5">
                                        <p className="bold">NEW PASSWORD:</p>
                                        <input type="password" className="form-control" placeholder="New Password" name="new-password"/> 
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2">
                                            <button className="btn btn-secondary">Change</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Settings;