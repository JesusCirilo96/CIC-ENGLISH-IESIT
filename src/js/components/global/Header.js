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
    }

    level(){
        if(this.props.level === 1){
            this.setState({
                header: [
                 {
                     route: "/home",
                     tag: "Inicio",
                     icon:"fas fa-home"
                 },
                 {
                     route: "/mygroups",
                     tag: "Mis Grupos",
                     icon:"fas fa-chalkboard-teacher"
                 },
                 {
                    route: "/teachers",
                    tag:"Docentes",
                    icon:"fas fa-chalkboard-teacher"
                },
                {
                    route: "/students",
                    tag:"Alumnos",
                    icon:"fas fa-book-reader"
                },
                 {
                    route: "/catalogues",
                    tag:"Catalogós",
                    icon:"fas fa-book-open",
                }
                ]
            })
        }
        if(this.props.level === 2){
           this.setState({
               header: [
                {
                    route: "/home",
                    tag: "Inicio",
                    icon:"fas fa-home"
                },
                {
                    route: "/mygroups",
                    tag: "Mis Grupos",
                    icon:"fas fa-chalkboard-teacher"
                }
               ]
           })
        }

        if(this.props.level === 3){
            this.setState({
                header: [
                 {
                     route: "/home",
                     tag: "Inicio",
                     icon:"fas fa-home"
                 },
                 {
                     route: "/qualification",
                     tag:"Mis Calificaciones",
                     icon:"fas fa-award"
                 }
                ]
            })
         }
    }
    render(){
        return(
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark navigation">
                    <button className="navbar-toggler" type="button" 
                        data-toggle="collapse"
                        data-target="#navbarsExample08"
                        aria-controls="navbarsExample08"
                        aria-expanded="true" 
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse justify-content-md-center collapse show" id="navbarsExample08"  >
                        <ul className="navbar-nav ulPersonalize">
                            {
                                this.state.header.map((data, i) =>
                                    <li key={i} className="nav-item">
                                        <Link className="nav-link" to={data.route}>{data.tag} <i className={data.icon}></i></Link>
                                    </li>                                        
                                )
                            }
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"></a>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to="/settings">Mi perfil <i className="fas fa-cogs"></i></Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" to="/"
                                        onClick={()=> this.props.fakeAuth.sigout(()=> this.props.history.push('/'))}>
                                        Salir <i className="fas fa-sign-out-alt"></i>
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
             </nav>
             
        )
    }
}
export default Header;