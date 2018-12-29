import React, { Component} from "react";
import ReactTable from "react-table";
import request from 'superagent';

class Parcial3 extends Component {  

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

  saveParcial(asis, part, trab, exam, parc, matr, grupo,nombre){
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
          this.props.notificacion("Tercer Parcial","La Calificación de "+nombre+" Fue Actualizada","success")
        }else{
          this.props.notificacion("Tercer Parcial","No se pudieron guardar los datos","error")
        }
      });    
  }

  promedioNum(cal1, cal2,part,trab,exam){
    var regex = /(\d+)/g

    part = part.match(regex)
    trab = trab.match(regex)
    exam = exam.match(regex)

    part = parseInt(part)
    trab = parseInt(trab)
    exam = parseInt(exam)
    var cal3 = part + trab + exam

    var puntuacion = (cal1 + cal2 + cal3)
    puntuacion = puntuacion/3
    puntuacion = Math.round(puntuacion * 10)/10
    return puntuacion
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
                Header:"Promedio Parcial",
                Cell: row =>(
                this.promedioNum(
                  (row.original.PARTICIPACION_PAR1 + row.original.TRABAJOS_PAR1 + row.original.EXAMEN_PAR1),
                  (row.original.PARTICIPACION_PAR2 + row.original.TRABAJOS_PAR2 + row.original.EXAMEN_PAR2),
                  String(row.original.PARTICIPACION_PAR3),
                  String(row.original.TRABAJOS_PAR3),
                  String(row.original.EXAMEN_PAR3),
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
                      this.saveParcial(
                        String(props.original.ASISTENCIA_PAR3),
                        String(props.original.PARTICIPACION_PAR3),
                        String(props.original.TRABAJOS_PAR3),
                        String(props.original.EXAMEN_PAR3),
                        '3',
                        props.original.ALUMNO_MATRICULA,
                        props.original.GRUPO_ID,
                        props.original.NOMBRE_COMPLETO
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
                columns = {columns} data = {this.props.dataTable}>
            </ReactTable>      
          </div>
          
      );
    }
  }
export default Parcial3;



