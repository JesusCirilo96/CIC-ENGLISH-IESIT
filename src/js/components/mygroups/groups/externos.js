import React, { Component} from "react";

class Externos extends Component{

    render(){
        return(
            <div className="col-md-12 contenedor-grupos">
                <strong><p>Grupos: {this.props.data.length}</p></strong>
                <div className="tabla">
                    <div className="row">
                        {
                            //this.props.data.map((data, i) =>        
                            this.props.data.map((data,i) =>
                            <div key={i} className="col-md-3">
                                <div className="card bg-light mb-3">
                                    <div className="card-header text-center"><strong>{data.NOMBRE_GRUPO}</strong></div>
                                    <div className="card-body">
                                        <p className="card-text">Level: {data.NIVEL}</p>
                                        <p className="card-text">Classroom: {data.SALON}</p>
                                        <p className="card-text">Days {data.DIAS}:</p>                                       
                                    </div>
                                </div>
                            </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Externos;
