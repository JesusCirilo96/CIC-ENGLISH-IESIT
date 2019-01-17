import React from "react";
import {render} from "react-dom";

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './css/body.css';
import './formUtil/util.css';
import './css/cardTeacher.css'
import './formUtil/main.css';
import './css/404.css';

import 'bulma/css/bulma.css'
import Favicon from 'react-favicon';

import AuthSite from './js/components/Auth.jsx';

render(
    <div>
        <Favicon url="http://localhost:8080/src/img/logofav64.png"/>
        <AuthSite />
    </div>, document.getElementById('app')
)
