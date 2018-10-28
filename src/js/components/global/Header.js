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
                    icon:"fas fa-user-graduate"
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
                },
                 {
                     route: "/settings",
                     tag:"Configuración",
                     icon:"fas fa-cogs"
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
                    route: "/groups",
                    tag: "Mis Grupos",
                    icon:"fas fa-chalkboard-teacher"
                },
                {
                    route: "/settings",
                    tag:"Configuración",
                    icon:"fas fa-cogs"
                }
               ]
           })
        }
    }
    render(){
        return(
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark navigation">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="true" aria-label="Toggle navigation">
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
                            <li className="nav-item">
                                <button className="nav-link" onClick={()=> this.props.fakeAuth.sigout(()=> this.props.history.push('/'))}>Salir <i className="fas fa-sign-out-alt"></i></button>
                            </li>
                        </ul>
                    </div>
             </nav>
             
        )
    }
}
export default Header;