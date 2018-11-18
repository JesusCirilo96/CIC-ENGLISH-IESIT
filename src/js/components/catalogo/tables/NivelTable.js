import React, { Component} from "react";
import request from 'superagent';
import ReactTable from "react-table";

import 'react-table/react-table.css';

class NivelTable extends Component {

  constructor(props){
    super(props);
    this.state={
      dataJson: []
    }
  }
  
  componentDidMount(){
    request
      .get('http://localhost:3000/nivel')
      .end((err, response)=>{
        const data = JSON.parse(response.text);
        this.setState({
          dataJson: data
        });
      });
  }

  deleteRow(id){
    //ACTIONS FOR BUTTON ELIMINAR
    console.log({
      MSG: "Deleted",
      ID: id
    });
  }

  render() {
    const columns = [
      {
        Header:"Nombre corto",
        accessor: "NOMBRE_CORTO",
        filterable: false
      },
      {
        Header:"Nombre",
        accessor: "NOMBRE",
        filterable: false
      },
      {
        Header:"Acciones",
        Cell: props =>{
          return(
            <button className="btn btn-light" 
              onClick={()=>{
                //console.log("props" , props);
                this.deleteRow(props.original.PACIENTE_ID);
              }}
            >Eliminar</button>
          )
        },
        sortable: false,
        filterable: false,
        width: 100,
        maxWidth: 100,
        minWidth: 100
      }

    ];
    return (
        <div className="col-md-12 contenedor-tabla">
        <div className="tabla">
          <ReactTable 
              previousText = "Anterior"
              nextText =  'Siguiente'
              loadingText = 'Cargando...'
              noDataText = 'No se encontraron Registros'
              pageText = 'Pagina'
              ofText = 'de'
              rowsText = 'Registros'
              defaultPageSize = {5}
              filterable
              columns = {columns} data = {this.state.dataJson}>
          </ReactTable>      
        </div>
        </div>
        
    );
  }
}

export default NivelTable;