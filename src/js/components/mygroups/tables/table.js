import React, { Component} from "react";
import ReactTable from "react-table";
import request from 'superagent';

class Table extends Component {  

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

  saveParcial(asis, part, trab, exam, parc, matr, grupo){
    var regex = /(\d+)/g;
    
    asis = asis.match(regex);
    part = part.match(regex);
    trab = trab.match(regex);
    exam = exam.match(regex);

    request
      .post('http://localhost:3000/parcialint')
      .send({
        asistencia: parseInt(asis),
        participacion: parseInt(part),
        trabajos: parseInt(trab),
        examen: parseInt(exam),
        parcial: parc,
        matricula: matr,
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

  saveNivelacionInterno(calificacion,parcial,matricula,grupo){
    request
      .post('http://localhost:3000/nivelacionint')
      .send({
        calificacion: calificacion,
        parcial: parcial,
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

  saveNivelacionExterno(){

  }

  saveFinal(){

  }

  saveExtraordinario(){

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

  promedioFinal(cal1, cal2, cal3, calNivelacion,calFinal){
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
      var columns = [];
        if(this.props.parcial === 1){
            columns = [
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
                  Header:"Asistencia",
                  accessor: "ASISTENCIA_PAR1",
                  Cell: this.renderEditable,
                  width: 100,
                  maxWidth: 100,
                  minWidth: 100
                  },
                  {
                    Header:"Participación",
                    accessor: "PARTICIPACION_PAR1",
                    Cell: this.renderEditable,
                    width: 100,
                    maxWidth: 100,
                    minWidth: 100
                  },
                  {
                    Header:"Trabajos",
                    accessor: "TRABAJOS_PAR1",
                    Cell: this.renderEditable,
                    width: 100,
                    maxWidth: 100,
                    minWidth: 100
                  },
                  {
                    Header:"Examen",
                    accessor: "EXAMEN_PAR1",
                    Cell: this.renderEditable,
                    width: 100,
                    maxWidth: 100,
                    minWidth: 100
                  },
                  {
                    Header:"Calificación",
                    id:"cal_par1",
                    accessor: row =>
                    <div 
                      dangerouslySetInnerHTML={{
                        __html: parseInt(row.PARTICIPACION_PAR1) + parseInt(row.TRABAJOS_PAR1) + parseInt(row.EXAMEN_PAR1)
                      }}
                    />
                    ,
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
                          this.saveParcial(
                            String(props.original.ASISTENCIA_PAR1),
                            String(props.original.PARTICIPACION_PAR1),
                            String(props.original.TRABAJOS_PAR1),
                            String(props.original.EXAMEN_PAR1),
                            '1',
                            props.original.ALUMNO_MATRICULA,
                            props.original.GRUPO_ID
                          )
                        }}
                      >Guardar</button>
                    )
                  },
                  width: 100,
                  maxWidth: 100,
                  minWidth: 100
                }
            
              ];
        }
        
        if(this.props.parcial === 2){
          columns = [
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
                Header:"Asistencia",
                accessor: "ASISTENCIA_PAR2",
                Cell: this.renderEditable,
                width: 100,
              maxWidth: 100,
              minWidth: 100
              },
              {
                Header:"Participación",
                accessor: "PARTICIPACION_PAR2",
                Cell: this.renderEditable,
                width: 100,
              maxWidth: 100,
              minWidth: 100
              },
              {
                Header:"Trabajos",
                accessor: "TRABAJOS_PAR2",
                Cell: this.renderEditable,
                width: 100,
              maxWidth: 100,
              minWidth: 100
              },
              {
                Header:"Examen",
                accessor: "EXAMEN_PAR2",
                Cell: this.renderEditable,
                width: 100,
              maxWidth: 100,
              minWidth: 100
              },
              {
                Header:"Calificación",
                id:"cal_par2",
                    accessor: row =>
                    <div 
                      dangerouslySetInnerHTML={{
                        __html: parseInt(row.PARTICIPACION_PAR2) + parseInt(row.TRABAJOS_PAR2) + parseInt(row.EXAMEN_PAR2)
                      }}
                    />
                    ,
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
                      this.saveParcial(
                        String(props.original.ASISTENCIA_PAR2),
                        String(props.original.PARTICIPACION_PAR2),
                        String(props.original.TRABAJOS_PAR2),
                        String(props.original.EXAMEN_PAR2),
                        '2',
                        props.original.ALUMNO_MATRICULA,
                        props.original.GRUPO_ID
                      )
                    }}
                  >Eliminar</button>
                )
              },
              width: 100,
              maxWidth: 100,
              minWidth: 100
            }     
          ];
        }

        if(this.props.parcial === 3){
          columns = [
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
                Header:"Asistencia",
                accessor: "ASISTENCIA_PAR3",
                Cell: this.renderEditable,
                width: 100,
              maxWidth: 100,
              minWidth: 100
              },
              {
                Header:"Participación",
                accessor: "PARTICIPACION_PAR3",
                Cell: this.renderEditable,
                width: 100,
              maxWidth: 100,
              minWidth: 100
              },
              {
                Header:"Trabajos",
                accessor: "TRABAJOS_PAR3",
                Cell: this.renderEditable,
                width: 100,
              maxWidth: 100,
              minWidth: 100
              },
              {
                Header:"Examen",
                accessor: "EXAMEN_PAR3",
                Cell: this.renderEditable,
                width: 100,
              maxWidth: 100,
              minWidth: 100
              },
              {
                Header:"Calificación",
                id:"cal_par3",
                    accessor: row =>
                    <div 
                      dangerouslySetInnerHTML={{
                        __html: parseInt(row.PARTICIPACION_PAR3) + parseInt(row.TRABAJOS_PAR3) + parseInt(row.EXAMEN_PAR3)
                      }}
                    />
                    ,
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
                      //console.log("props" , props);
                      this.saveParcial(
                        String(props.original.ASISTENCIA_PAR3),
                        String(props.original.PARTICIPACION_PAR3),
                        String(props.original.TRABAJOS_PAR3),
                        String(props.original.EXAMEN_PAR3),
                        '3',
                        props.original.ALUMNO_MATRICULA,
                        props.original.GRUPO_ID
                      )
                    }}
                  >Guardar</button>
                )
              },
              width: 100,
              maxWidth: 100,
              minWidth: 100
            }     
          ];
        }

        if(this.props.parcial === 4){
          columns = [
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
                      (row.original.CAL_NIVELACION)
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
                          props.original.NIVELACION_PAR,
                          props.original.ALUMNO_MATRICULA,
                          props.original.GRUPO_ID
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
        }

        if(this.props.parcial === 5){
          columns = [
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
                          (row.original.FINAL)
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
                        //console.log("props" , props);
                        this.deleteRow(props.original.PACIENTE_ID);
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
        }

        if(this.props.parcial === 6){
          columns = [
              {
                Header:"Semestre",
                accessor: "SEMESTRE"
              },
              {
                Header:"Licenciatura",
                accessor: "SIGLAS"
              },
              {
                Header:"Nombre",
                accessor: "NOMBRE_COMPLETO"
              },
              {
                 Header:"Calificacion",
                 accessor: "EXTRAORDINARIO"
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
                    >Guardar</button>
                  )
                },
                sortable: false,
                width: 100,
                maxWidth: 100,
                minWidth: 100
              }
          
            ];
        }
    
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
export default Table;



