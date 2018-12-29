import React, { Component} from "react";

class Info extends Component{

    constructor(){
        super();

    }
    render(){
        return(
            <div className="">
                <a href="#" onClick={this.props.showForm}>Regresar</a>
                <h1>Info</h1>
            </div>
        );
    }

}

export default Info;