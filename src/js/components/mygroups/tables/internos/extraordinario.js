import React, { Component} from "react";
import ReactTable from "react-table";
import request from 'superagent';

class Extraordinario extends Component {  

  constructor(){
    super();

    this.renderEditable = this.renderEditable.bind(this);
  }

  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.props.dataTable];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.props.dataTable[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  saveExtraordinario(calificacion,matricula,grupo){
    request
      .post('http://localhost:3000/nivelacionint')
      .send({
        calificacion: calificacion,
        param:"E",
        matricula: matricula,
        grupo: grupo
      })
      .set('Accept', /application\/json/)
      .end((err, response)=>{
        const res = (JSON.parse(response.text)['success']);
        if(res){
          this.props.notificacion("Extraordinario","Calificacion Actualizada","success")
        }else{
          this.props.notificacion("Extraordinario","No se pudo guardar la calificación","error")
        }
      });
  }

  render(){
    const columns = [
              {
                Header:"Semestre",
                accessor: "SEMESTRE",
                width: 100,
                maxWidth: 100,
                minWidth: 100
              },
              {
                Header:"Licenciatura",
                accessor: "SIGLAS",
                width: 100,
                maxWidth: 100,
                minWidth: 100
              },
              {
                Header:"Nombre",
                accessor: "NOMBRE_COMPLETO"
              },
              {
                Header:"Calificacion",
                accessor: "EXTRAORDINARIO",
                Cell: this.renderEditable,
                width: 100,
                maxWidth: 100,
                minWidth: 100
              },
              {
                Header:"Acciones",
                Cell: props =>{
                  return(
                    <button className="btn btn-light" 
                      onClick={()=>{
                        this.saveExtraordinario(
                            props.original.EXTRAORDINARIO,
                            props.original.ALUMNO_MATRICULA,
                            props.original.GRUPO_ID
                        )
                      }}
                    >Guardar</button>
                  )
                },
                sortable: false,
                width: 100,
                maxWidth: 100,
                minWidth: 100
              }
          
            ];
    
        return (
          <div className="all-table">
            <ReactTable 
                previousText = "Anterior"
                nextText =  'Siguiente'
                loadingText = 'Cargando...'
                noDataText = 'No se encontraron Registros'
                pageText = 'Pagina'
                ofText = 'de'
                rowsText = 'Registros'
                defaultPageSize = {10}
                columns = {columns} data = {this.props.dataTable}>
            </ReactTable>      
          </div>
          
      );
    }
  }
export default Extraordinario;



