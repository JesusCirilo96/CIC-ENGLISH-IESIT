import React, { Component} from "react";

//views
import Groups from '../mygroups/groups';
import Internos from '../mygroups/groups/internos';
import Externos from '../mygroups/groups/externos';

class Index extends Component{
    render(){
        
        return(
        <div>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="docente-tab" data-toggle="tab" href="#docente" role="tab" aria-controls="docente" aria-selected="true">Grupos Internos</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="nivel-tab" data-toggle="tab" href="#nivel" role="tab" aria-controls="nivel" aria-selected="false">Grupos Externos</a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="docente" role="tabpanel" aria-labelledby="docente-tab"><Groups type={true} /></div>
                <div className="tab-pane fade" id="nivel" role="tabpanel" aria-labelledby="nivel-tab"><h2>Nel</h2></div>                
            </div>
        </div>
        );
    }
}


export default Index;
