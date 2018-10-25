import React, { Component} from "react";

class Page404 extends Component{
    render(){

        return(
            <div>
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1>404</h1>
                        </div>
                        <h2>Oops, La pagina que buscas no se encuentra!</h2>
                        <a href="#"><span className="arrow"></span>Return To Homepage</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Page404;
