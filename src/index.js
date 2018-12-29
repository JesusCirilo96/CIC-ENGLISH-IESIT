import './css/body.css';
import './formUtil/util.css';
import './css/cardTeacher.css'
import './formUtil/main.css';
import './css/404.css';


import React from "react";
import {render} from "react-dom";

import AuthSite from './js/components/Auth.jsx';

render(
    <AuthSite />,
    document.getElementById('app')
)
