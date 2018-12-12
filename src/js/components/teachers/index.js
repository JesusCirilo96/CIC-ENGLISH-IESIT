import React, { Component} from "react";
import request from 'superagent';

class Teachers extends Component{

    constructor(){
        super();
        this.state={
            dataDocente:[]
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
    render(){
        return(
            <div className="contenedor-tabla">
                <div className="content mt-40">
                    <h3 className="text-center">Hover Effect Style : Demo - 16</h3>
                    <div className="row mt-30">

                        {
                        this.state.dataDocente.map((data, key)=>
                            <div className="col-md-3 col-sm-6 margin-bottom">
                                <div className="box16">
                                    <img src={data.PICTURE}/>
                                    <div className="box-content">
                                        <h3 className="title">{data.NOMBRE}</h3>
                                        <span className="post"><i className="fas fa-mobile-alt"></i>  {data.TELEFONO}</span>
                                        <span className="post"><i className="far fa-envelope"></i>  {data.EMAIL}</span>
                                        <ul className="social">
                                            <li><a href="#"><i className="fas fa-info"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                        }

                    </div>
                </div>
            </div>
        );
    }

}

export default Teachers;