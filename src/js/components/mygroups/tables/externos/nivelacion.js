import React, { Component} from "react";
import ReactTable from "react-table";
import request from 'superagent';

class Nivelacion extends Component {  

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

  saveNivelacionInterno(calificacion,alumno_id,grupo){
    request
      .post('http://localhost:3000/nivelacionext')
      .send({
        calificacion: calificacion,
        param:"N",
        alumno_id: alumno_id,
        grupo: grupo
      })
      .set('Accept', /application\/json/)
      .end((err, response)=>{
        const res = (JSON.parse(response.text)['success']);
        if(res){
          this.props.notificacion("Nivelación","Calificación Actualizada","success")
        }else{
          this.props.notificacion("Nivelación","No se pudo guardar la calificacion","error")
        }
      });
  }

  promedio(cal1, cal2,cal3){
        var puntuacion = (cal1 + cal2 + cal3);
        var nivelacion = "No"
        if(puntuacion < 210 ){
            nivelacion = "Si"
        }
        return nivelacion
  }

  promedioNum(cal1, cal2,cal3){
      var puntuacion = (cal1 + cal2 + cal3)
      puntuacion = puntuacion/3
      puntuacion = Math.round(puntuacion * 10)/10
      return puntuacion
  }

  parcial(cal1, cal2,cal3){
      var parcial = cal1 + cal2 + cal3;
      if(parcial < 210){
        if(cal1 < cal2 && cal1 < cal3){
          parcial = 1
        }else if(cal2 < cal3){
          parcial = 2
        }else{
          parcial = 3
        }
      }else{
        parcial= 0
      }

  return parcial;      
  }

  promedioNivelacion(cal1, cal2, cal3, calNivelacion){
    var regex = /(\d+)/g
    calNivelacion = calNivelacion.match(regex)
    calNivelacion = parseInt(calNivelacion)

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

    return promedio;
  }

    render() {
        const columns = [
              {
                Header:"Nombre",
                accessor: "NOMBRE_COMPLETO"
              },
              {
                Header:"Promedio Parcial",
                Cell: row =>(
                this.promedioNum(
                  (row.original.PARTICIPACION_PAR1 + row.original.TRABAJOS_PAR1 + row.original.EXAMEN_PAR1),
                  (row.original.PARTICIPACION_PAR2 + row.original.TRABAJOS_PAR2 + row.original.EXAMEN_PAR2),
                  (row.original.PARTICIPACION_PAR3 + row.original.TRABAJOS_PAR3 + row.original.EXAMEN_PAR3)
                  )
                ),
                width: 100,
                maxWidth: 100,
                minWidth: 100
              },
              {
                Header:"Nivelacion",
                Cell: row =>(
                this.promedio(
                  (row.original.PARTICIPACION_PAR1 + row.original.TRABAJOS_PAR1 + row.original.EXAMEN_PAR1),
                  (row.original.PARTICIPACION_PAR2 + row.original.TRABAJOS_PAR2 + row.original.EXAMEN_PAR2),
                  (row.original.PARTICIPACION_PAR3 + row.original.TRABAJOS_PAR3 + row.original.EXAMEN_PAR3)
                  )
                ),
                width: 100,
              maxWidth: 100,
              minWidth: 100
              },
              {
                Header:"Parcial",
                accessor: "NIVELACION_PAR",
                Cell: row =>(
                  this.parcial(
                    (row.original.PARTICIPACION_PAR1 + row.original.TRABAJOS_PAR1 + row.original.EXAMEN_PAR1),
                    (row.original.PARTICIPACION_PAR2 + row.original.TRABAJOS_PAR2 + row.original.EXAMEN_PAR2),
                    (row.original.PARTICIPACION_PAR3 + row.original.TRABAJOS_PAR3 + row.original.EXAMEN_PAR3)
                  )
                ),
                width: 100,
              maxWidth: 100,
              minWidth: 100
              },
              {
                Header:"Calificacion",
                accessor: "CAL_NIVELACION",
                Cell: this.renderEditable,
                width: 100,
                maxWidth: 100,
                minWidth: 100
              },
              {
                Header:"Promedio",
                Cell: row =>
                this.promedioNivelacion(
                  (row.original.PARTICIPACION_PAR1 + row.original.TRABAJOS_PAR1 + row.original.EXAMEN_PAR1),
                  (row.original.PARTICIPACION_PAR2 + row.original.TRABAJOS_PAR2 + row.original.EXAMEN_PAR2),
                  (row.original.PARTICIPACION_PAR3 + row.original.TRABAJOS_PAR3 + row.original.EXAMEN_PAR3),
                  String(row.original.CAL_NIVELACION)
                ),
                width:100,
                maxWidth: 100,
                minWidth: 100
              },
              {
                Header:"Acciones",
                Cell: props =>{
                return(
                  <button className="btn btn-light" 
                    onClick={()=>{
                    this.saveNivelacionInterno(
                      props.original.CAL_NIVELACION,
                      props.original.ALUMNO_EXTERNO_ID,
                      props.original.GRUPO_EXTERNO_ID
                    );
                    }}
                  >Guardar</button>
                )
              },
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
export default Nivelacion;



