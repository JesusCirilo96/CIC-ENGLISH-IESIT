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
import Mygroups from './mygroups';
import Teachers from './teachers';
import Students from './students';
import Settings from './settings';

//catalogos
import Home from './Home';
import Catalogo from './catalogo/Catalogo';

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
            redirectRoute: false,
            token: ''
        }

        this.login = this.login.bind(this)
    }

    verifyToken(){
        request
            .post('http://localhost:3000/api/posts')
            .set('Accept', /application\/json/)
            .set('Authorization', 'Bearer ' + this.state.token)
            .end((err, response)=>{
            if(response.body === null){
                console.log("Its null")
            }else{
                console.log(response.body);
                if(response.body.access === true){
                    const nivel = response.body.authData.user.accessLevel;
                    switch (nivel){
                        case "1": level = 1; break;
                        case "2": level = 2; break;
                        case "3": level = 3; break;
                    }
                    fakeAuth.authenticate(()=>this.setState({redirectRoute:true}))
                    this.dataTeacher(response.body.authData.user)
                    //console.log(response.body.authData.user)
                }
            }
        });
    }

   login(data){
        request
          .post('http://localhost:3000/api/login')
          .send(data)
          .set('Accept', /application\/json/)
          .end((err, response)=>{
            const token = response.body.token;
//            console.log(response.body); imprime el token
            this.setState({
                token: token
            })
            if(token){
                this.verifyToken();
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

const Routes = () =>(
    <Switch>
        <PrivateRoute exact path="/home" component={Home}/>
        <PrivateRoute exact path="/catalogues" component={Catalogo}/>     
        <PrivateRoute exact path="/mygroups" component={Mygroups}/>
        <PrivateRoute exact path="/teachers" component={Teachers}/>
        <PrivateRoute exact path="/students" component={Students}/>
        <PrivateRoute exact path="/settings" component={Settings}/>

        <Route component={Page404}/>
    </Switch>
)

const Authsite = () =>(
    <Router>
        <div>
            <AuthButton />
            <Switch>
                <Route exact path="/" component={Login}/>
                <Routes />                
            </Switch>
        </div>
    </Router>
)

export default Authsite