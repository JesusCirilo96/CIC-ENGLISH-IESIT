import React, { Component } from "react";
import request from 'superagent';

class DocenteTable extends Component {

  constructor (){
    super();
    this.state = {
      nombre : '',
      apellido_pat : '',
      apellido_mat : '',
      estado : '',
      nivel_acceso : '',
      email: '',
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
      .post('http://localhost:3000/docente')
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
              Docente Agregado Correctamente...
            </div>:
            null
          }

            <form className="contact100-form validate-form">
              <div className="wrap-input100">
                <input className="input100" type="text" required
                  name = "nombre"
                  placeholder="Nombre"
                  value={this.state.nombre}
                  onChange={e=> this.change(e)}
                />
                <span className="focus-input100"></span>
              </div>

              <div className="wrap-input100">
                <input className="input100" type="text" required
                  name = "apellido_pat"
                  placeholder="Apellido Paterno"
                  value={this.state.apellido_pat}
                  onChange={e=> this.change(e)} 
                />
                <span className="focus-input100"></span>
              </div>

              <div className="wrap-input100">
                <input className="input100" type="text"
                  name = "apellido_mat"
                  placeholder="Apellido Materno"
                  value={this.state.apellido_mat}
                  onChange={e=> this.change(e)}
                />
                <span className="focus-input100"></span>
              </div>

              <div className="wrap-input100">
                <input className="input100" type="email"
                  name = "email"
                  placeholder="E-mail"
                  value={this.state.email}
                  onChange={e=> this.change(e)} 
                />
                <span className="focus-input100"></span>
              </div>

              <div className="selectStyle">
                <select className="form-control"
                  name = "nivel_acceso"
                  value={this.state.nivel_acceso}
                  onChange={e=> this.change(e)}
                >
                  <option defaultValue>Restricciones..</option>
                  <option value="1">Admin</option>
                  <option value="2">Docente</option>
                </select>
              </div>

              <div className="selectStyle">
                <select className="form-control"
                  name = "estado"
                  value={this.state.estado}
                  onChange={e=> this.change(e)}
                >
                  <option defaultValue>Estado..</option>
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </select>
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

export default DocenteTable;