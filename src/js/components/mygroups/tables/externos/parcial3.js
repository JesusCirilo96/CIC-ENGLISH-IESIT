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

  saveParcial(asis, part, trab, exam, parc, matr, grupo){
    var regex = /(\d+)/g;
    
    asis = asis.match(regex);
    part = part.match(regex);
    trab = trab.match(regex);
    exam = exam.match(regex);

    request
      .post('http://localhost:3000/parcialext')
      .send({
        asistencia: parseInt(asis),
        participacion: parseInt(part),
        trabajos: parseInt(trab),
        examen: parseInt(exam),
        parcial: parc,
        alumno_id: matr,
        grupo: grupo
      })
      .set('Accept', /application\/json/)
      .end((err, response)=>{
        const res = (JSON.parse(response.text)['success']);
        if(res){
          this.props.notificacion("Tercer Parcial","Calificación Actualizada","success")
        }else{
          this.props.notificacion("Tercer Parcial","No se pudieron guardar los datos","success")
        }
      });    
  }

    render() {

        
        const columns = [           
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
                        props.original.ALUMNO_EXTERNO_ID,
                        props.original.GRUPO_EXTERNO_ID
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
                defaultPageSize = {10}
                columns = {columns} data = {this.props.dataTable}>
            </ReactTable>      
          </div>
          
      );
    }
  }
export default Parcial3;



