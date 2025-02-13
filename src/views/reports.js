import { useState } from "../scripts/useState.js";
export function reports() {
  return `
          <div class="container-reports">
              <span class="title-reports"><h4>Reports</h4></span>
              <div class="btn-report-generate">
                <div class="btn-report">
                  <button id="btn-show-report-month">Show monthly</button>
                  <button id="btn-show-report-quarterly">Show quarterly</button>
                  <button id="btn-show-report-annual">Show Annual</button>
                </div>
                <button id="btn-export-pdf">To PDF</button>
                <button id="btn-export-csv">To CSV</button>
              </div>
              <body class="body-reports">
                <div class="cont-report-table">

                  <div class="cont-non-report">
                    <span class="icon-pie-chart"></span>
                  </div>

                </div>
              </div>
          </div>
      `;
}

export function funcReport(libJsPDF) {
  document.querySelector("#btn-export-pdf").disabled = true;
  document.querySelector("#btn-export-csv").disabled = true;

  const [getIndexBtn, setIndexBtn] = useState(null);

  const contenido = document.querySelector(".cont-report-table");

  let btnReportM = document.getElementById("btn-show-report-month");
  let btnReportQ = document.getElementById("btn-show-report-quarterly");
  let btnReportA = document.getElementById("btn-show-report-annual");

  const schemeTable = {
    monthly: `
                    <table class="report-table">
                      <tr>
                        <td data-label="Title"><h2 class="report-title">Informe Financiero Mensual</h2></td>
                      </tr>
                    </table>
                    <table class="report-table" border="1">
                      <tr>
                        <th class="report-header">Categoría</th>
                        <th class="report-header">Descripción</th>
                        <th class="report-header">Monto</th>
                      </tr>
                      <tr>
                        <td class="report-cell" data-label="Categoría"><b>Ingresos</b></td>
                        <td class="report-cell" data-label="Descripción"></td>
                        <td class="report-cell" data-label="Monto"></td>
                      </tr>
                      <tr>
                        <td class="report-cell" data-label="Categoría">Salario</td>
                        <td class="report-cell" data-label="Descripción"></td>
                        <td class="report-cell" data-label="Monto">$2,000.00</td>
                      </tr>
                      <tr>
                        <td class="report-cell" data-label="Categoría">Freelance</td>
                        <td class="report-cell" data-label="Descripción"></td>
                        <td class="report-cell" data-label="Monto">$500.00</td>
                      </tr>
                      <tr>
                        <td class="report-cell" data-label="Categoría"><b>Total de Ingresos</b></td>
                        <td class="report-cell" data-label="Descripción"></td>
                        <td class="report-cell" data-label="Monto"><b>$2,500.00</b></td>
                      </tr>
                      <tr>
                        <td class="report-cell" data-label="Categoría"><b>Gastos</b></td>
                        <td class="report-cell" data-label="Descripción"></td>
                        <td class="report-cell" data-label="Monto"></td>
                      </tr>
                      <tr>
                        <td class="report-cell" data-label="Categoría">Alquiler</td>
                        <td class="report-cell" data-label="Descripción"></td>
                        <td class="report-cell" data-label="Monto">$800.00</td>
                      </tr>
                      <tr>
                        <td class="report-cell" data-label="Categoría">Alimentos</td>
                        <td class="report-cell" data-label="Descripción">Compra de supermercado</td>
                        <td class="report-cell" data-label="Monto">$300.00</td>
                      </tr>
                      <tr>
                        <td class="report-cell" data-label="Categoría">Transporte</td>
                        <td class="report-cell" data-label="Descripción">Gasolina y transporte público</td>
                        <td class="report-cell" data-label="Monto">$150.00</td>
                      </tr>
                      <tr>
                        <td class="report-cell" data-label="Categoría">Entretenimiento</td>
                        <td class="report-cell" data-label="Descripción">Salidas, cine, etc.</td>
                        <td class="report-cell" data-label="Monto">$100.00</td>
                      </tr>
                      <tr>
                        <td class="report-cell" data-label="Categoría">Servicios</td>
                        <td class="report-cell" data-label="Descripción">Agua, luz, internet</td>
                        <td class="report-cell" data-label="Monto">$120.00</td>
                      </tr>
                      <tr>
                        <td class="report-cell" data-label="Categoría">Otros</td>
                        <td class="report-cell" data-label="Descripción">Suscripciones, etc.</td>
                        <td class="report-cell" data-label="Monto">$50.00</td>
                      </tr>
                      <tr>
                        <td class="report-cell" data-label="Categoría"><b>Total de Gastos</b></td>
                        <td class="report-cell" data-label="Descripción"></td>
                        <td class="report-cell" data-label="Monto"><b>$1,520.00</b></td>
                      </tr>
                      <tr>
                        <td class="report-cell" data-label="Categoría"><b>Balance Neto Mensual</b></td>
                        <td class="report-cell" data-label="Descripción">Total Ingresos - Total Gastos</td>
                        <td class="report-cell" data-label="Monto"><b>$980.00</b></td>
                      </tr>
                    </table>

                    <table class="report-table">
                      <tr>
                        <td data-label="Objetivos del Mes">
                          <h3 class="report-subtitle">Objetivos del Mes</h3>
                        </td>
                      </tr>
                      <tr>
                        <td data-label="Objetivos del Mes">
                          <p class="report-text">Ahorro, pago de deudas, etc. - Cumplidos: 75%</p>
                        </td>
                      </tr>
                    </table>

                    <table class="report-table">
                      <tr>
                        <td data-label="Conclusiones">
                          <h3 class="report-subtitle">Conclusiones</h3>
                        </td>
                      </tr>
                      <tr>
                        <td data-label="Conclusiones">
                          <p class="report-text">Gastos en entretenimiento fueron altos. Ajustar el próximo mes.</p>
                        </td>
                      </tr>
                    </table>`,
    quarterly: `
      <table class="report-table">
        <tr>
          <td data-label="Title"><h2 class="report-title">Informe Financiero Trimestral</h2></td>
        </tr>
      </table>
      <table class="report-table-q" border="1">
        <tr>
          <th class="report-header">Trimestre</th>
          <th class="report-header">Mes</th>
          <th class="report-header">Total Ingresos</th>
          <th class="report-header">Total Gastos</th>
          <th class="report-header">Balance Neto</th>
        </tr>
        <tr>
          <td class="report-cell" data-label="Trimestre">1</td>
          <td class="report-cell" data-label="Mes">Enero</td>
          <td class="report-cell" data-label="Total Ingresos">$2,500.00</td>
          <td class="report-cell" data-label="Total Gastos">$1,520.00</td>
          <td class="report-cell" data-label="Balance Neto">$980.00</td>
        </tr>
        <tr>
          <td class="report-cell" data-label="Trimestre"></td>
          <td class="report-cell"
          <td class="report-cell">$2,500.00</td>
          <td class="report-cell">$1,480.00</td>
          <td class="report-cell">$1,020.00</td>
        </tr>
        <tr>
          <td class="report-cell"></td>
          <td class="report-cell">Marzo</td>
          <td class="report-cell">$2,500.00</td>
          <td class="report-cell">$1,600.00</td>
          <td class="report-cell">$900.00</td>
        </tr>
        <tr>
          <td class="report-cell"><b>Total</b></td>
          <td class="report-cell"><b>Trimestre 1</b></td>
          <td class="report-cell"><b>$7,500.00</b></td>
          <td class="report-cell"><b>$4,600.00</b></td>
          <td class="report-cell"><b>$2,900.00</b></td>
        </tr>
      </table>

      <table class="report-table">
        <tr>
          <td>
            <h3 class="report-subtitle">Desglose de Gastos por Categoría (Trimestral)</h3>
          </td>
        </tr>
      </table>
      <table class="report-table" border="1">
        <tr>
          <th class="report-header">Categoría de Gasto</th>
          <th class="report-header">Enero</th>
          <th class="report-header">Febrero</th>
          <th class="report-header">Marzo</th>
          <th class="report-header">Total Trimestral</th>
        </tr>
        <tr>
          <td class="report-cell">Alquiler</td>
          <td class="report-cell">$800.00</td>
          <td class="report-cell">$800.00</td>
          <td class="report-cell">$800.00</td>
          <td class="report-cell">$2,400.00</td>
        </tr>
        <tr>
          <td class="report-cell">Alimentos</td>
          <td class="report-cell">$300.00</td>
          <td class="report-cell">$280.00</td>
          <td class="report-cell">$320.00</td>
          <td class="report-cell">$900.00</td>
        </tr>
        <tr>
          <td class="report-cell">Transporte</td>
          <td class="report-cell">$150.00</td>
          <td class="report-cell">$140.00</td>
          <td class="report-cell">$150.00</td>
          <td class="report-cell">$440.00</td>
        </tr>
        <tr>
          <td class="report-cell">Entretenimiento</td>
          <td class="report-cell">$100.00</td>
          <td class="report-cell">$90.00</td>
          <td class="report-cell">$120.00</td>
          <td class="report-cell">$310.00</td>
        </tr>
        <tr>
          <td class="report-cell">Servicios</td>
          <td class="report-cell">$120.00</td>
          <td class="report-cell">$130.00</td>
          <td class="report-cell">$130.00</td>
          <td class="report-cell">$380.00</td>
        </tr>
        <tr>
          <td class="report-cell">Otros</td>
          <td class="report-cell">$50.00</td>
          <td class="report-cell">$40.00</td>
          <td class="report-cell">$80.00</td>
          <td class="report-cell">$170.00</td>
        </tr>
      </table>

      <table class="report-table">
        <tr>
          <td colspan="6">
            <h3 class="report-subtitle">Conclusiones Trimestrales y Metas del Próximo Trimestre</h3>
          </td>
        </tr>
        <tr>
          <td colspan="4" class="report-cell"><b>Logros:</b></td>
          <td class="report-cell"> Se mantuvo un balance positivo cada mes. Se logró ahorrar el 70% de la meta trimestral.</td>    
        </tr>
        <tr>
          <td colspan="4" class="report-cell"><b>Observaciones:</b></td>
          <td class="report-cell"> Aumento en gastos de entretenimiento en marzo.</td>
        </tr>
        <tr>
          <td colspan="4" class="report-cell"><b>Meta para el próximo trimestre:</b></td>
          <td class="report-cell"> Reducir un 10% el gasto en entretenimiento y aumentar el ahorro un 5%.</td>
        </tr>
      </table>

    `,
    annual: `
      <table class="report-table">
        <tr>
          <td>
            <h2 class="report-title">Informe Financiero Anual</h2>
          </td>
        </tr>
      </table>

      <table class="report-table" border="1">
        <tr>
          <th class="report-header">Mes</th>
          <th class="report-header">Total Ingresos</th>
          <th class="report-header">Total Gastos</th>
          <th class="report-header">Balance Neto</th>
        </tr>
        <tr>
          <td class="report-cell">Enero</td>
          <td class="report-cell">$2,500.00</td>
          <td class="report-cell">$1,520.00</td>
          <td class="report-cell">$980.00</td>
        </tr>
        <tr>
          <td class="report-cell">Febrero</td>
          <td class="report-cell">$2,500.00</td>
          <td class="report-cell">$1,480.00</td>
          <td class="report-cell">$1,020.00</td>
        </tr>
        <tr>
          <td class="report-cell">Marzo</td>
          <td class="report-cell">$2,500.00</td>
          <td class="report-cell">$1,480.00</td>
          <td class="report-cell">$1,020.00</td>
        </tr>
        <tr>
          <td class="report-cell">Abril</td>
          <td class="report-cell">$2,500.00</td>
          <td class="report-cell">$1,480.00</td>
          <td class="report-cell">$1,020.00</td>
        </tr>
        <tr>
          <td class="report-cell">Mayo</td>
          <td class="report-cell">$2,500.00</td>
          <td class="report-cell">$1,480.00</td>
          <td class="report-cell">$1,020.00</td>
        </tr>
        <tr>
          <td class="report-cell">Junio</td>
          <td class="report-cell">$2,500.00</td>
          <td class="report-cell">$1,480.00</td>
          <td class="report-cell">$1,020.00</td>
        </tr>
        <tr>
          <td class="report-cell">Julio</td>
          <td class="report-cell">$2,500.00</td>
          <td class="report-cell">$1,480.00</td>
          <td class="report-cell">$1,020.00</td>
        </tr>
        <tr>
          <td class="report-cell">Agosto</td>
          <td class="report-cell">$2,500.00</td>
          <td class="report-cell">$1,480.00</td>
          <td class="report-cell">$1,020.00</td>
        </tr>
        <tr>
          <td class="report-cell">Septiembre</td>
          <td class="report-cell">$2,500.00</td>
          <td class="report-cell">$1,480.00</td>
          <td class="report-cell">$1,020.00</td>
        </tr>
        <tr>
          <td class="report-cell">Octubre</td>
          <td class="report-cell">$2,500.00</td>
          <td class="report-cell">$1,480.00</td>
          <td class="report-cell">$1,020.00</td>
        </tr>
        <tr>
          <td class="report-cell">Noviembre</td>
          <td class="report-cell">$2,500.00</td>
          <td class="report-cell">$1,480.00</td>
          <td class="report-cell">$1,020.00</td>
        </tr>
        <tr>
          <td class="report-cell">Diciembre</td>
          <td class="report-cell">$2,500.00</td>
          <td class="report-cell">$1,480.00</td>
          <td class="report-cell">$1,020.00</td>
        </tr>
        <!-- Repetir filas para cada mes -->
        <tr>
          <td class="report-cell"><b>Total Anual</b></td>
          <td class="report-cell"><b>$30,000.00</b></td>
          <td class="report-cell"><b>$18,510.00</b></td>
          <td class="report-cell"><b>$11,490.00</b></td>
        </tr>
      </table>

      <table class="report-table">
        <tr>
          <td>
            <h3 class="report-subtitle">Desglose de Gastos Anuales por Categoría</h3>
          </td>
        </tr>
      </table>
      <table class="report-table" border="1">
        <tr>
          <th class="report-header">Categoría de Gasto</th>
          <th class="report-header">Gasto Total</th>
          <th class="report-header">Porcentaje del Gasto Total</th>
        </tr>
        <tr>
          <td class="report-cell">Alquiler</td>
          <td class="report-cell">$9,600.00</td>
          <td class="report-cell">52%</td>
        </tr>
        <tr>
          <td class="report-cell">Alimentos</td>
          <td class="report-cell">$3,600.00</td>
          <td class="report-cell">19%</td>
        </tr>
        <tr>
          <td class="report-cell">Transporte</td>
          <td class="report-cell">$1,800.00</td>
          <td class="report-cell">10%</td>
        </tr>
        <tr>
          <td class="report-cell">Entretenimiento</td>
          <td class="report-cell">$1,200.00</td>
          <td class="report-cell">6%</td>
        </tr>
        <tr>
          <td class="report-cell">Servicios</td>
          <td class="report-cell">$1,500.00</td>
          <td class="report-cell">8%</td>
        </tr>
        <tr>
          <td class="report-cell">Otros</td>
          <td class="report-cell">$810.00</td>
          <td class="report-cell">5%</td>
        </tr>
      </table>

      <table class="report-table">
        <tr>
          <td>
            <h3 class="report-subtitle">Logros Financieros del Año</h3>
          </td>
        </tr>
        <tr>
          <td>
            <ul class="report-list">
              <li><b>Ahorro Anual:</b> $11,490.00, equivalente al 38% del ingreso total anual.</li>
              <li><b>Deudas Reducidas:</b> Reducción de un 20% en deudas pendientes.</li>
              <li><b>Inversiones Realizadas:</b> $2,000.00 en fondos de inversión a largo plazo.</li>
            </ul>
          </td>
        </tr>
      </table>

      <table class="report-table">
        <tr>
          <td>
            <h3 class="report-subtitle">Metas Financieras para el Próximo Año</h3>
          </td>
        </tr>
        <tr>
          <td>
            <ul class="report-list">
              <li>Aumentar el ahorro anual al 40%.</li>
              <li>Reducir los gastos en entretenimiento un 15%.</li>
              <li>Destinar un 5% adicional de los ingresos a nuevas inversiones.</li>
            </ul>
          </td>
        </tr>
      </table>
    `,
  };

  let btnsReport = [btnReportM, btnReportQ, btnReportA];
  btnsReport.forEach((button, index) => {
    button.addEventListener("click", () => {
      setIndexBtn(index);
      if (getIndexBtn() === 0) {
        contenido.innerHTML = schemeTable.monthly;
        document.querySelector("#btn-export-pdf").disabled = false;
        document.querySelector("#btn-export-csv").disabled = false;
        exportDoc("monthly-finance-report");
      } else if (getIndexBtn() === 1) {
        contenido.innerHTML = schemeTable.quarterly;
        document.querySelector("#btn-export-pdf").disabled = false;
        document.querySelector("#btn-export-csv").disabled = false;
        exportDoc("quarterly-finance-report");
      } else if (getIndexBtn() === 2) {
        contenido.innerHTML = schemeTable.annual;
        document.querySelector("#btn-export-pdf").disabled = false;
        document.querySelector("#btn-export-csv").disabled = false;
        exportDoc("annual-finance-report");
      }
    });
  });

  function exportDoc(nameDoc) {
    // Construir el contenido CSV
    let csv = [];
    const filas = contenido.querySelectorAll("table tr");

    filas.forEach((fila) => {
      let columnas = fila.querySelectorAll("th, td");
      let filaCSV = [];
      columnas.forEach((columna) => filaCSV.push(`"${columna.innerText}"`)); // Encerrar en comillas para evitar problemas con comas
      csv.push(filaCSV.join(",")); // Combina columnas con comas
    });

    // Convertir el array a texto
    let csvContent = csv.join("\n");

    document.getElementById("btn-export-csv").addEventListener("click", () => {
      // Crear un enlace de descarga
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${nameDoc}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    const pdf = new libJsPDF();

    // Usa jsPDF para exportar el contenido de la tabla a PDF
    let tablas = document.querySelectorAll(".report-table");
    let startY = 20;
    
    tablas.forEach((tabla, index) => {
        let filas = tabla.querySelectorAll("tr");
        let data = [];
        let encabezado = [];
        
        filas.forEach((fila, filaIndex) => {
            let columnas = fila.querySelectorAll("th, td");
            let filaData = [];
            
            columnas.forEach((columna) => {
                filaData.push(columna.innerText);
            });
            
            if (filaIndex === 0) {
                encabezado.push(filaData);
            } else {
                data.push(filaData);
            }
        });
        
        pdf.autoTable({
            head: encabezado,
            body: data,
            startY: startY,
            theme: 'grid',
            headStyles: { fillColor: [153, 102, 255], textColor: [255, 255, 255] },
            bodyStyles: { fillColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [240, 240, 240] },
            tableLineColor: [0, 0, 0],
            tableLineWidth: 0.1,
        });
        
        startY = pdf.lastAutoTable.finalY + 10;
        
        if (index < tablas.length - 1 && startY > 250) {
            pdf.addPage();
            startY = 20;
        }
    });

    document.querySelector("#btn-export-pdf").addEventListener("click", () => {
      pdf.save(`${nameDoc}.pdf`);
    });
  }
}
