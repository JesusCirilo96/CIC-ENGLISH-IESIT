import React, { Component} from "react";
import request from 'superagent';

class Table extends Component{

    constructor(){
        super();
        this.state={
            dataDocente:[],
        }
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
                                            <li><a href="#" onClick={this.props.showForm()}><i className="fas fa-info"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                        }

                    </div>
                </div>            
        );
    }

}

export default Table;