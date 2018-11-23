import React, { Component} from "react";

//views
import Grupo from './view/GrupoInt';
import Docente from './view/Docente';
import Nivel from './view/Nivel';
import Licenciatura from './view/Licenciatura';

class Catalogo extends Component{

    render(){
        return(
        <div>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                 <li className="nav-item">
                    <a className="nav-link active" id="grupo-tab" data-toggle="tab" href="#grupo" role="tab" aria-controls="grupo" aria-selected="false">Grupos Internos</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="docente-tab" data-toggle="tab" href="#docente" role="tab" aria-controls="docente" aria-selected="true">Docente</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="nivel-tab" data-toggle="tab" href="#nivel" role="tab" aria-controls="nivel" aria-selected="false">Nivel</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="licenciatura-tab" data-toggle="tab" href="#licenciatura" role="tab" aria-controls="licenciatura" aria-selected="false">Licenciatura</a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="grupo" role="tabpanel" aria-labelledby="grupo-tab"><Grupo /></div>
                <div className="tab-pane fade" id="docente" role="tabpanel" aria-labelledby="docente-tab"><Docente /></div>
                <div className="tab-pane fade" id="nivel" role="tabpanel" aria-labelledby="nivel-tab"><Nivel /></div>
                <div className="tab-pane fade" id="licenciatura" role="tabpanel" aria-labelledby="licenciatura-tab"><Licenciatura /></div>
            </div>


        </div>
        );
    }
}

export default Catalogo;
