import React, { Component} from "react";

//views

import Docente from './view/Docente';
import Nivel from './view/Nivel';

class Catalogo extends Component{

    render(){
        return(
        <div>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="docente-tab" data-toggle="tab" href="#docente" role="tab" aria-controls="docente" aria-selected="true">Docente</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="nivel-tab" data-toggle="tab" href="#nivel" role="tab" aria-controls="nivel" aria-selected="false">Nivel</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="docente" role="tabpanel" aria-labelledby="docente-tab"><Docente /></div>
                <div className="tab-pane fade" id="nivel" role="tabpanel" aria-labelledby="nivel-tab"><Nivel /></div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
            </div>


        </div>
        );
    }
}

export default Catalogo;
