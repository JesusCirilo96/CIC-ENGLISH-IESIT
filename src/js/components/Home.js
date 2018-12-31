import React, {Component} from "react"
import store from '../store'
import NotificationSystem from 'react-notification-system';

import {Button} from 'primereact/button';

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

        this.notificationSystem = React.createRef();
        this.addNotification = this.addNotification.bind(this)
    }


    addNotification(event){
        event.preventDefault();
        const notification = this.notificationSystem.current;
        notification.addNotification({
            title:'Calificacion',
            message: 'Calificacion Guardada',
            level: 'success',
            position:'br'
        });
    };
    

    render(){
        return(
            <div className="contenedor-tabla">
                <h1>Home</h1>
                <button onClick={this.addNotification}>Add notification</button>

                <Button label="Click" icon="pi pi-check" iconPos="right" />
                <NotificationSystem ref={this.notificationSystem} />
            </div>
        );
    }

}

export default Home;
