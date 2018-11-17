import {createStore} from 'redux';


const reducer = (state, action) =>{

    if(action.type === "DATA_TEACHER"){
        return{
            ...state,
            teacher: state.teacher.concat(action.data)
        }
    }


    return state;
};

export default createStore(reducer, {teacher:[]});