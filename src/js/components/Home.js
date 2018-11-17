import React, { Component} from "react";
import store from '../store';

class Home extends Component{

    constructor(){
        super();

        this.state = {
            teacher:''
        };

        store.subscribe(()=>{
            this.setState({
                teacher: store.getState().teacher[0].id
            })
        });
    }
    render(){
        return(
            <div className="contenedor-tabla">
                <h1>Home</h1>
            </div>
        );
    }

}

export default Home;
