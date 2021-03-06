import React, { Component} from "react";
import ReactTable from "react-table";
import request from 'superagent';
import {Button} from 'primereact/button';

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

  saveNivelacionInterno(calificacion,matricula,grupo,nombre,parcial){
    var regex = /(\d+)/g;
    calificacion = calificacion.match(regex);

    request
      .post('http://localhost:3000/nivelacionint')
      .send({
        calificacion: parseInt(calificacion),
        param:"N",
        matricula: matricula,
        grupo: grupo
      })
      .set('Accept', /application\/json/)
      .end((err, response)=>{
        const res = (JSON.parse(response.text)['success']);
        if(res){
          this.props.notificacion("Nivelación","La Calificación de nivelación de "+nombre+" Fue Actualizada","success")
        }else{
          this.props.notificacion("Nivelación","No se pudieron guardar los datos","error")
        }
      });
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
      }else if(cal2 < cal1 && cal2 < cal3){
        promedio = (cal1 + cal3 + calNivelacion)/3
      }else if(cal3 < cal1 && cal3 < cal2){
        promedio = (cal1 + cal2 + calNivelacion)/3
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
                Header:"Semestre",
                accessor: "SEMESTRE",
                width: 100,
                maxWidth: 100,
                minWidth: 100
              },
              {
                Header:"Lic.",
                accessor: "SIGLAS",
                width: 100,
                maxWidth: 100,
                minWidth: 100
              },
              {
                Header:"Nombre",
                accessor: "NOMBRE_COMPLETO",
              },
              {
                Header:"Promedio Parcial",
                Cell: row =>(
                  this.promedioNum(row.original.PARCIAL1,row.original.PARCIAL2,row.original.PARCIAL3)),
                width: 100,
                maxWidth: 100,
                minWidth: 100
              },
              {
                Header:"Parcial",
                accessor: "NIVELACION_PAR",
                Cell: row =>(
                  this.parcial(row.original.PARCIAL1,row.original.PARCIAL2,row.original.PARCIAL3)
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
                  this.promedioNivelacion(row.original.PARCIAL1,row.original.PARCIAL2,row.original.PARCIAL3,String(row.original.CAL_NIVELACION)),
                width:100,
                maxWidth: 100,
                minWidth: 100
              },
              {
                Header:"Acciones",
                Cell: props =>{
                return(
                  <Button
                    className="p-button-secondary"
                    label="Guardar"
                    icon="pi pi-check"
                    iconPos="right"
                    onClick={()=>{
                    this.saveNivelacionInterno(
                      String(props.original.CAL_NIVELACION),
                      props.original.ALUMNO_MATRICULA,
                      props.original.GRUPO_ID,
                      props.original.NOMBRE_COMPLETO,
                      props.original.NIVELACION_PAR
                    );
                    }}
                  />
                )
              },
              width: 120
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
                defaultPageSize = {15}
                className="-highlight"
                showPaginationBottom = {false}
                columns = {columns} data = {this.props.dataTable}>
            </ReactTable>      
          </div>
          
      );
    }
  }
export default Nivelacion;