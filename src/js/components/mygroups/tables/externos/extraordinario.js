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

  saveExtraordinario(calificacion,alumno_id,grupo){
    request
      .post('http://localhost:3000/nivelacionext')
      .send({
        calificacion: calificacion,
        param:"E",
        alumno_id: alumno_id,
        grupo: grupo
      })
      .set('Accept', /application\/json/)
      .end((err, response)=>{
        const res = (JSON.parse(response.text)['success']);
        if(res){
          this.props.notificacion("Extraordinario","Calificación Actualizada","success")
        }else{
          this.props.notificacion("Final","No se pudo guardar la calificacion","error")
        }
      });
  }

  render(){
    const columns = [
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
                            props.original.ALUMNO_EXTERNO_ID,
                            props.original.GRUPO_EXTERNO_ID
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



