import React, { Component} from "react";
import ReactTable from "react-table";
import request from 'superagent';
import {Button} from 'primereact/button'

class Parcial2 extends Component {  

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

  saveParcial(asis, part, trab, exam, parc, matr, grupo, nombre){
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
          this.props.notificacion("Segundo Parcial","La Calificación de "+nombre+" Fue Actualizada","success")
        }else{
          this.props.notificacion("Segundo Parcial","No se pudieron guardar los datos","error")
        }
      });    
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
                  <Button
                    className="p-button-secondary"
                    label="Guardar"
                    icon="pi pi-check"
                    iconPos="right"
                    onClick={()=>{
                      this.saveParcial(
                        String(props.original.ASISTENCIA_PAR2),
                        String(props.original.PARTICIPACION_PAR2),
                        String(props.original.TRABAJOS_PAR2),
                        String(props.original.EXAMEN_PAR2),
                        '2',
                        props.original.ALUMNO_MATRICULA,
                        props.original.GRUPO_ID,
                        props.original.NOMBRE_COMPLETO
                      )
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
export default Parcial2;