import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    withRouter,
    Switch
} from 'react-router-dom';
import request from 'superagent';
import store from '../store';

//componets global
import Header from './global/Header';
import Page404 from '../components/Page404';

//login
import LoginForm from '../components/login/Login';

//Header
import Home from './Home';
import Teachers from './teachers';
import Students from './students';
import Settings from './settings';
import Inscripcion from './inscripciones';
import GrupoInterno from './catalogo/view/GrupoInt';
import Docente from './catalogo/view/Docente';
import Nivel from './catalogo/view/Nivel';
import Licenciatura from './catalogo/view/Licenciatura';
import Extras from './catalogo/Extras'

import MiGrupoInterno from './mygroups/groups/internos';
import MiGrupoExterno from './mygroups/groups/externos';


var level;

const AuthButton = withRouter(({history})=>(
    (fakeAuth.isAuthenticated)
    ? 
        <div>
           <Header level = {level} fakeAuth={fakeAuth} history={history}/>
        </div>
    :
    null
))

const PrivateRoute = ({ component: Component, rest}) => (
    <Route {...rest} render={(props)=>(
        fakeAuth.isAuthenticated ? <Component {...props} /> : <Redirect to={{pathname: '/', state:{from:props.location}}} />
    )} />
)

//login fake
const fakeAuth = {
    isAuthenticated : false,
    authenticate(cb){
        this.isAuthenticated = true
        setTimeout(cb, 100)
    },
    sigout(cb){
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

class Login extends Component {
    constructor(...props){
        super(...props)
        this.state={
            redirectRoute: false
        }

        this.login = this.login.bind(this)
    }

   login(data){
        request
          .post('http://localhost:3000/api/login')
          .send(data)
          .set('Accept', /application\/json/)
          .end((err, response)=>{
            if(response.body === null){
                console.log("Its null")
            }else{
                console.log(response);
                if(response.body.access === true){
                    const nivel = response.body.accessLevel;
                    switch (nivel){
                        case "1": level = 1; break;
                        case "2": level = 2; break;
                        case "3": level = 3; break;
                    }
                    fakeAuth.authenticate(()=>this.setState({redirectRoute:true}))
                    this.dataTeacher({id:response.body.id,username:response.body.username ,isAuthenticated:fakeAuth.isAuthenticated})
                    //console.log(response.body.authData.user)
                    //console.log("Dentro");
                }
            }
          });
    }

    render(){
        const {from} = this.props.location.state || {from:{pathname: '/home'}}
        
        const {redirectRoute} = this.state
                
        if( redirectRoute ){
            return (
                <Redirect to={from} />
            );
        }else{
            return (
                <div>
                    <LoginForm 
                        loginForm = {this.login}
                    />
                </div>
            );

        }
    }

    dataTeacher(data) {
        store.dispatch({
            type: "DATA_TEACHER",
            data
        })
    }

}

const Authsite = () =>(
    <Router>
        <div>
            <AuthButton />
            <Switch>
                <Route exact path="/" component={Login}/>
                <PrivateRoute exact path="/home" component={Home}/>
                <PrivateRoute exact path="/teachers" component={Teachers}/>
                <PrivateRoute exact path="/students" component={Students}/>
                <PrivateRoute exact path="/settings" component={Settings}/>
                <PrivateRoute exact path="/inscripcion" component={Inscripcion}/>

                <PrivateRoute exact path="/misgruposinternos" component={MiGrupoInterno}/>
                <PrivateRoute exact path="/misgruposexternos" component={MiGrupoExterno}/>

                <PrivateRoute exact path="/gruposinternos" component={GrupoInterno}/>
                <PrivateRoute exact path="/docentes" component={Docente}/>
                <PrivateRoute exact path="/licenciatura" component={Licenciatura}/>
                <PrivateRoute exact path="/nivel" component={Nivel}/>       
                <PrivateRoute exact path="/extras" component={Extras}/>

                <Route component={Page404}/>
            </Switch>
        </div>  
    </Router>
)

export default Authsite