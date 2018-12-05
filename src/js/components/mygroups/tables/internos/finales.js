import React, { Component} from "react";
import ReactTable from "react-table";
import request from 'superagent';

class Final extends Component {  

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

  saveFinal(calificacion,matricula,grupo){
    request
      .post('http://localhost:3000/nivelacionint')
      .send({
        calificacion: calificacion,
        param:"F",
        matricula: matricula,
        grupo: grupo
      })
      .set('Accept', /application\/json/)
      .end((err, response)=>{
        const res = (JSON.parse(response.text)['success']);
        if(res){
          console.log("Calificación de Nivelacion Actualizada");
        } 
      });
  }

  promedioFinal(cal1, cal2, cal3, calNivelacion,calFinal){
    var regex = /(\d+)/g
    calFinal = calFinal.match(regex)
    calFinal = parseInt(calFinal)

    var promedio = (cal1 + cal2 + cal3)
    if(promedio < 210){
      if(cal1 < cal2 && cal1 < cal3){
        promedio = (cal2 + cal3 + calNivelacion)/3
      }else if(cal2 < cal3){
        promedio = (cal1 + cal3 + calNivelacion)/3
      }else{
        promedio = (cal2 + cal3 + calNivelacion)/3
      }
    }else{
      promedio = promedio/3
    }

    promedio = Math.round(promedio * 10)/10

    promedio = (promedio + calFinal)/2

    return Math.round(promedio);
  }

  render() {
        
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
                accessor: "FINAL",
                Cell: this.renderEditable,
                width: 100,
                maxWidth: 100,
                minWidth: 100
              },
              {
                  Header:"Promedio",
                  Cell: row =>(
                      this.promedioFinal(
                          (row.original.PARTICIPACION_PAR1 + row.original.TRABAJOS_PAR1 + row.original.EXAMEN_PAR1),
                          (row.original.PARTICIPACION_PAR2 + row.original.TRABAJOS_PAR2 + row.original.EXAMEN_PAR2),
                          (row.original.PARTICIPACION_PAR3 + row.original.TRABAJOS_PAR3 + row.original.EXAMEN_PAR3),
                          (row.original.CAL_NIVELACION),
                          String(row.original.FINAL)
                      )
                  ),
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
                        this.saveFinal(
                            props.original.FINAL,
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
export default Final;



