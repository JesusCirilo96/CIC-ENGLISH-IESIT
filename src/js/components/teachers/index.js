import React, { Component} from "react";
import request from 'superagent';

import Info from './info';

class Teachers extends Component{

    constructor(){
        super();
        this.state={
            dataDocente:[],
            showForm:true,
            showTable:false
        }
        this.showForm = this.showForm.bind(this)
    }
    componentDidMount(){
        request
          .get('http://localhost:3000/docente')
          .end((err, response)=>{
            const data = JSON.parse(response.text);
            this.setState({
              dataDocente: data
            });
          });
    }

    
    showForm(){
        this.setState ({
            showForm : !this.state.showForm,
            showTable : !this.state.showTable
        })
    }
    mail(email){
        if(email !== null && email !== ''){
            return(
                <span className="post"><i className="far fa-envelope"></i>  {email}</span>
            )
        }
    }
    
    phone(phone){
        if(phone !== null && phone !== ''){
            return(
                <span className="post"><i className="fas fa-mobile-alt"></i>  {phone}</span>
            )
        }
    }
    render(){
        return(
            <div className="contenedor-tabla">
            {
            this.state.showForm?
                <div className="content mt-40">
                    <h3 className="text-center">Docentes</h3>
                    <div className="row mt-30">

                        {
                        this.state.dataDocente.map((data, key)=>
                            <div key={key} className="col-md-3 col-sm-6 margin-bottom">
                                <div className="box16">
                                    <img src={data.PICTURE}/>
                                    <div className="box-content">
                                        <h3 className="title">{data.NOMBRE}</h3>
                                        {this.phone(data.TELEFONO)}
                                        {this.mail(data.EMAIL)}                                    
                                        <ul className="social">
                                            <li><a href="#" onClick={this.showForm}><i className="fas fa-info"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                        }

                    </div>
                </div>
                :null
            }
            {
                this.state.showTable?
                <Info showForm={this.showForm}/>
                :null
            }
            </div>
        );
    }

}

export default Teachers;