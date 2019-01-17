import React, { Component} from "react";
import ReactTable from "react-table";
import request from 'superagent';
import {Button} from 'primereact/button';

let students = []

class Extraordinario extends Component {  

  constructor(props){
    super();
    this.state = {
      dataExtra: []
    }
    
    this.renderEditable = this.renderEditable.bind(this)
  }
  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...students];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: students[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }
  componentDidMount(){
    this.setState({
      dataExtra: this.props.dataTable
    })
  }
  saveExtraordinario(calificacion,matricula,grupo){
    var regex = /(\d+)/g
    calificacion = calificacion.match(regex)
    
    request
      .post('http://localhost:3000/nivelacionint')
      .send({
        calificacion: parseInt(calificacion),
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
  promedioFinal(cal1, cal2, cal3, calNivelacion,calFinal){
    var regex = /(\d+)/g
    calFinal = calFinal.match(regex)
    calFinal = parseInt(calFinal)

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

    promedio = (promedio + calFinal)/2
    var response = ""
    if(promedio < 70){
      response = "Si"
    }else{
      response = "No"
    }

    return response
  }

  studentsExtraordinario(){
    var dataStudents = this.props.dataTable
    for (var key in dataStudents){
      var par1 = dataStudents[key].PARTICIPACION_PAR1 + dataStudents[key].TRABAJOS_PAR1 + dataStudents[key].EXAMEN_PAR1
      var par2 = dataStudents[key].PARTICIPACION_PAR2 + dataStudents[key].TRABAJOS_PAR2 + dataStudents[key].EXAMEN_PAR2
      var par3 = dataStudents[key].PARTICIPACION_PAR3 + dataStudents[key].TRABAJOS_PAR3 + dataStudents[key].EXAMEN_PAR3
      console.log(promedioFinal(par1, par2, par3, dataStudents[key].CAL_NIVELACION, dataStudents[key].FINAL))
      if(this.promedioFinal(par1, par2, par3, dataStudents[key].CAL_NIVELACION, dataStudents[key].FINAL) === "Si"){
        students.push({
          'ALUMNO_MATRICULA':dataStudents[key].ALUMNO_MATRICULA,
          'GRUPO_ID':dataStudents[key].GRUPO_ID,
          'SEMESTRE':dataStudents[key].SEMESTRE,
          'SIGLAS':dataStudents[key].SIGLAS,
          'NOMBRE_COMPLETO':dataStudents[key].NOMBRE_COMPLETO,
          'ASISTENCIA_PAR1':dataStudents[key].ASISTENCIA_PAR1,
          'ASISTENCIA_PAR2':dataStudents[key].ASISTENCIA_PAR2,
          'ASISTENCIA_PAR3':dataStudents[key].ASISTENCIA_PAR3,
          'PARCIAL1':par1,
          'PARCIAL2':par2,
          'PARCIAL3':par3,          
          'CAL_NIVELACION':dataStudents[key].CAL_NIVELACION,
          'EXTRAORDINARIO': dataStudents[key].EXTRAORDINARIO
        })
      }
    }
}

  render(){
    console.log(this.props.dataTable)
    console.log(this.state.dataExtra)
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
                    <Button
                      className="p-button-secondary"
                      label="Guardar"
                      icon="pi pi-check"
                      iconPos="right"
                      onClick={()=>{
                        this.saveExtraordinario(
                            String(props.original.EXTRAORDINARIO),
                            props.original.ALUMNO_MATRICULA,
                            props.original.GRUPO_ID
                        )
                      }}
                    />
                  )
                },
                sortable: false,
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
                showPaginationBottom = {false}
                className="-highlight"
                columns = {columns} data = {students}>
            </ReactTable>      
          </div>
          
      );
    }
  }
export default Extraordinario;



