import React, { Component} from "react";
import {Link} from 'react-router-dom';

class Header extends Component{
    constructor (){
        super();
        this.state = {
            header: []
        }
    }
    

    componentDidMount(){
        this.level();
        this.navbar();
    }

    navbar (){
        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
      
        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {
      
          // Add a click event on each of them
          $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {
      
              // Get the target from the "data-target" attribute
              const target = el.dataset.target;
              const $target = document.getElementById(target);
      
              // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
              el.classList.toggle('is-active');
              $target.classList.toggle('is-active');
      
            });
          });
        }
      
    };

    

    level(){
        if(this.props.level === 1){
            this.setState({
                header: [
                 {
                     route: "/home",
                     tag: "Inicio",
                 },
                 {
                    route: "/teachers",
                    tag:"Docentes"
                },
                {
                    route: "/students",
                    tag:"Alumnos"
                }
                ]
            })
        }
        if(this.props.level === 2){
           this.setState({
               header: [
                {
                    route: "/home",
                    tag: "Inicio"
                }
               ]
           })
        }

        if(this.props.level === 3){
            this.setState({
                header: [
                 {
                     route: "/home",
                     tag: "Inicio"
                 },
                 {
                     route: "/qualification",
                     tag:"Mis Calificaciones"
                 }
                ]
            })
         }
    }
    render(){
        return(
            <nav className="navbar navigation" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="#">
                        <img src="http://localhost:8080/src/img/cicenglish.png" width="112" height="28"/>
                    </a>
                    <a role="button" className="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>   
                </div>

                <div className="navbar-menu" id="navMenu">
                    <div className="navbar-start">
                        {
                            this.state.header.map((data, i) =>  
                                <Link key={i} className="navbar-item" to={data.route}>{data.tag}</Link>
                            )
                        }
                        {
                            this.props.level === 1 || this.props.level === 2 ?
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link">
                                    Mis Grupos
                                </a>
                                <div className="navbar-dropdown">
                                    <Link className="navbar-item" to="/misgruposinternos">Grupos internos</Link>
                                    <Link className="navbar-item" to="/misgruposexternos">Grupos externos</Link>
                                </div>
                            </div>
                            :null
                        }
                        {
                            this.props.level === 1 ?
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link">
                                    Catalogos
                                </a>
                                <div className="navbar-dropdown">
                                    <Link className="navbar-item" to="/gruposinternos">Grupos Internos</Link>
                                    <Link className="navbar-item" to="/gruposexternos">Grupos Externos</Link>
                                    <Link className="navbar-item" to="/licenciatura">Licenciaturas</Link>
                                    <Link className="navbar-item" to="/docentes">Docentes</Link>
                                    <Link className="navbar-item" to="/nivel">Niveles</Link>
                                    <Link className="navbar-item" to="/horarios">Horarios</Link>
                                    <Link className="navbar-item" to="/cicloescolar">C/P Escolar</Link>
                                </div>
                            </div>
                            :null
                        }
                        
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                Mas..
                            </a>
                            <div className="navbar-dropdown">
                                <Link className="navbar-item" to="/inscripcion">Inscripciones</Link>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                Jesus                                
                            </a>
                            <div className="navbar-dropdown">
                                <Link className="navbar-item" to="/settings">Mi perfil</Link>
                            </div>
                        </div>
                        <div>
                            <a className="navbar-item"
                                    onClick={()=> this.props.fakeAuth.sigout(()=> this.props.history.push('/'))}>
                                    Cerrar sesion
                            </a>
                        </div>
                    </div>
                </div> 
            </nav>
             
        )
    }
}
export default Header;