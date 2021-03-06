import React, { Component } from "react";
import request from 'superagent';

class LicenciaturaTable extends Component {

  constructor (){
    super();
    this.state = {
      nombre_corto : '',
      nombre : '',
      msg: false
    }
  }
  change(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  save (e){
    request
      .post('http://localhost:3000/licenciatura')
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
      e.preventDefault();
  }
 
  render() {
    return(
          <div className="form">
          {
            this.state.msg ?
            <div className="alert alert-primary" role="alert">
              Licenciatura Agregada Correctamente...
            </div>:
            null
          }
            <form className="contact100-form validate-form">

              <div className="wrap-input100">
                <input className="input100" type="text" required
                  name = "nombre"
                  placeholder="Nombre completo"
                  value={this.state.nombre}
                  onChange={e=> this.change(e)}
                />
                <span className="focus-input100"></span>
              </div>
              <div className="wrap-input100">
                <input className="input100" type="text" required
                  name = "siglas"
                  placeholder="Nombre corto"
                  value={this.state.siglas}
                  onChange={e=> this.change(e)} 
                />
                <span className="focus-input100"></span>
              </div>
              <div className="container-contact100-form-btn">
                <button className="contact100-form-btn"
                  onClick={e=>{
                    this.save(e);
                  }}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
    );
  }
}

export default LicenciaturaTable;