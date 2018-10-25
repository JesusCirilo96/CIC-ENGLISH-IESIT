import React, { Component } from "react";

class Login extends Component {
  constructor(){
    super();
    this.state={
      username: '',
      password: ''
    }
  }

  login(e){
    this.props.loginForm(this.state);
    e.preventDefault();
  }

  change(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return(
      <div className="login-container">
        <div className="login row">
          <div className="col-md-6 sesion-info">
            <div className="row">
              <div className="col-md-12">
                <p className="text-center login-title">Welcome Back!</p>                
              </div>
            </div>
            <div className="row align-items-center">
              <div className="logo col">
                <figure>
                  <img className="" alt="Logo" src="http://localhost:8080/src/img/logo.png" />
                </figure>
              </div>
            </div>
          </div>
          <div className="col-md-6 sesion-login">
            <div className="row">
              <div className="col-md-12">
                <p className="text-center login-title">Sign in</p>                
              </div>
            </div>
            <div className="row">
              <form className="form-login">
                <div className="row">
                  <input className="form-control" type="text" 
                    name="username"
                    placeholder="Username or E-mail" 
                    value={this.state.username}
                    onChange={e=> this.change(e)} 
                  />
                </div>
                <div className="row">
                  <input className="form-control" type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={this.state.password}
                    onChange={e=> this.change(e)} 
                  />
                </div>
                <div className="row">
                  <button onClick={e=>{
                    this.login(e);
                  }} className="btn btn-light form-control">Sign in</button>
                </div>
                <div className="row text-center">
                  <a href="">Forgotten your password?</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
