import React, { Component} from "react";
import ReactTable from "react-table";
import request from 'superagent';


import {Button} from 'primereact/button';


class Parcial1 extends Component {  

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
        const res = (JSON.parse(response.text)['success'])
        if(res){
          this.props.notificacion("Primer Parcial","La Calificación de "+nombre+" Fue Actualizada","success")
        }else{
          this.props.notificacion("Primer Parcial","No se pudieron guardar los datos","error")
        }
      });    
  }


    render() {
        const button =[
          {
            label: 'Update', 
            icon: 'pi pi-refresh', 
            command: (e) => {
                this.growl.show({severity:'success', summary:'Updated', detail:'Data Updated'});
            }
          },
          {
            label: 'Delete', 
            icon: 'pi pi-times',
            command: (e) => {
                this.growl.show({ severity: 'success', summary: 'Delete', detail: 'Data Deleted' });
            }
          }
        ];
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
                      <Button
                        className="p-button-secondary"
                        label="Guardar"
                        icon="pi pi-check"
                        iconPos="right"
                        onClick={()=>{
                          this.saveParcial(
                            String(props.original.ASISTENCIA_PAR1),
                            String(props.original.PARTICIPACION_PAR1),
                            String(props.original.TRABAJOS_PAR1),
                            String(props.original.EXAMEN_PAR1),
                            '1',
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
export default Parcial1;