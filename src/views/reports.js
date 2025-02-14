import { useState } from "../scripts/useState.js";
import { getCategories, getTransactions, getGoals } from "../data/storage.js";
async function loadJsPDF() {
  if (!window.jspdf) {
      await import("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js") || await import("../lib/jspdf.umd.min.js");
  }
  if (!window.jspdf?.jsPDF.prototype.autoTable) {
      await import("https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js") || await import("../lib/jspdf.plugin.autotable.min.js");
  }
}

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
                <button id="btn-export-xlsx">To Xlsx</button>

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

export function funcReport() {
  document.querySelector("#btn-export-pdf").disabled = true;
  document.querySelector("#btn-export-csv").disabled = true;

  const [getIndexBtn, setIndexBtn] = useState(null);

  const contenido = document.querySelector(".cont-report-table");

  let btnReportM = document.getElementById("btn-show-report-month");
  let btnReportQ = document.getElementById("btn-show-report-quarterly");
  let btnReportA = document.getElementById("btn-show-report-annual");

  const schemeTable = {
    // monthly: `
    //                 <table class="report-table">
    //                   <tr>
    //                     <td data-label="Title"><h2 class="report-title">Informe Financiero Mensual</h2></td>
    //                   </tr>
    //                 </table>
    //                 <table class="report-table" border="1">
    //                   <tr>
    //                     <th class="report-header" data-label="Categoría">Categoría</th>
    //                     <th class="report-header" data-label="Descripción">Descripción</th>
    //                     <th class="report-header" data-label="Monto">Monto</th>
    //                   </tr>
    //                   <tr>
    //                     <td class="report-cell" data-label="Categoría"><b>Ingresos</b></td>
    //                     <td class="report-cell" data-label="Descripción"></td>
    //                     <td class="report-cell" data-label="Monto"></td>
    //                   </tr>
    //                   <tr>
    //                     <td class="report-cell" data-label="Categoría">Salario</td>
    //                     <td class="report-cell" data-label="Descripción"></td>
    //                     <td class="report-cell" data-label="Monto">$2,000.00</td>
    //                   </tr>
    //                   <tr>
    //                     <td class="report-cell" data-label="Categoría">Freelance</td>
    //                     <td class="report-cell" data-label="Descripción"></td>
    //                     <td class="report-cell" data-label="Monto">$500.00</td>
    //                   </tr>
    //                   <tr>
    //                     <td class="report-cell" data-label="Categoría"><b>Total de Ingresos</b></td>
    //                     <td class="report-cell" data-label="Descripción"></td>
    //                     <td class="report-cell" data-label="Monto"><b>$2,500.00</b></td>
    //                   </tr>
    //                   <tr>
    //                     <td class="report-cell" data-label="Categoría"><b>Gastos</b></td>
    //                     <td class="report-cell" data-label="Descripción"></td>
    //                     <td class="report-cell" data-label="Monto"></td>
    //                   </tr>
    //                   <tr>
    //                     <td class="report-cell" data-label="Categoría">Alquiler</td>
    //                     <td class="report-cell" data-label="Descripción"></td>
    //                     <td class="report-cell" data-label="Monto">$800.00</td>
    //                   </tr>
    //                   <tr>
    //                     <td class="report-cell" data-label="Categoría">Alimentos</td>
    //                     <td class="report-cell" data-label="Descripción">Compra de supermercado</td>
    //                     <td class="report-cell" data-label="Monto">$300.00</td>
    //                   </tr>
    //                   <tr>
    //                     <td class="report-cell" data-label="Categoría">Transporte</td>
    //                     <td class="report-cell" data-label="Descripción">Gasolina y transporte público</td>
    //                     <td class="report-cell" data-label="Monto">$150.00</td>
    //                   </tr>
    //                   <tr>
    //                     <td class="report-cell" data-label="Categoría">Entretenimiento</td>
    //                     <td class="report-cell" data-label="Descripción">Salidas, cine, etc.</td>
    //                     <td class="report-cell" data-label="Monto">$100.00</td>
    //                   </tr>
    //                   <tr>
    //                     <td class="report-cell" data-label="Categoría">Servicios</td>
    //                     <td class="report-cell" data-label="Descripción">Agua, luz, internet</td>
    //                     <td class="report-cell" data-label="Monto">$120.00</td>
    //                   </tr>
    //                   <tr>
    //                     <td class="report-cell" data-label="Categoría">Otros</td>
    //                     <td class="report-cell" data-label="Descripción">Suscripciones, etc.</td>
    //                     <td class="report-cell" data-label="Monto">$50.00</td>
    //                   </tr>
    //                   <tr>
    //                     <td class="report-cell" data-label="Categoría"><b>Total de Gastos</b></td>
    //                     <td class="report-cell" data-label="Descripción"></td>
    //                     <td class="report-cell" data-label="Monto"><b>$1,520.00</b></td>
    //                   </tr>
    //                   <tr>
    //                     <td class="report-cell" data-label="Categoría"><b>Balance Neto Mensual</b></td>
    //                     <td class="report-cell" data-label="Descripción">Total Ingresos - Total Gastos</td>
    //                     <td class="report-cell" data-label="Monto"><b>$980.00</b></td>
    //                   </tr>
    //                 </table>

    //                 <table class="report-table">
    //                   <tr>
    //                     <td data-label="Objetivos del Mes">
    //                       <h3 class="report-subtitle">Objetivos del Mes</h3>
    //                     </td>
    //                   </tr>
    //                   <tr>
    //                     <td data-label="Objetivos del Mes">
    //                       <p class="report-text">Ahorro, pago de deudas, etc. - Cumplidos: 75%</p>
    //                     </td>
    //                   </tr>
    //                 </table>

    //                 <table class="report-table">
    //                   <tr>
    //                     <td data-label="Conclusiones">
    //                       <h3 class="report-subtitle">Conclusiones</h3>
    //                     </td>
    //                   </tr>
    //                   <tr>
    //                     <td data-label="Conclusiones">
    //                       <p class="report-text">Gastos en entretenimiento fueron altos. Ajustar el próximo mes.</p>
    //                     </td>
    //                   </tr>
    //                 </table>`,
    // quarterly: `
    //   <table class="report-table">
    //     <tr>
    //       <td data-label="Title"><h2 class="report-title">Informe Financiero Trimestral</h2></td>
    //     </tr>
    //   </table>
    //   <table class="report-table-q" border="1">
    //     <tr>
    //       <th class="report-header" data-label="Trimestre">Trimestre</th>
    //       <th class="report-header" data-label="Mes">Mes</th>
    //       <th class="report-header" data-label="Total Ingresos">Total Ingresos</th>
    //       <th class="report-header" data-label="Total Gastos">Total Gastos</th>
    //       <th class="report-header" data-label="Balance Neto">Balance Neto</th>
    //     </tr>
    //     <tr>
    //       <td class="report-cell" data-label="Trimestre">1</td>
    //       <td class="report-cell" data-label="Mes">Enero</td>
    //       <td class="report-cell" data-label="Total Ingresos">$2,500.00</td>
    //       <td class="report-cell" data-label="Total Gastos">$1,520.00</td>
    //       <td class="report-cell" data-label="Balance Neto">$980.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell" data-label="Trimestre"></td>
    //       <td class="report-cell" data-label="Mes">Febrero</td>
    //       <td class="report-cell" data-label="Total Ingresos">$2,500.00</td>
    //       <td class="report-cell" data-label="Total Gastos">$1,480.00</td>
    //       <td class="report-cell" data-label="Balance Neto">$1,020.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell" data-label="Trimestre"></td>
    //       <td class="report-cell" data-label="Mes">Marzo</td>
    //       <td class="report-cell" data-label="Total Ingresos">$2,500.00</td>
    //       <td class="report-cell" data-label="Total Gastos">$1,600.00</td>
    //       <td class="report-cell" data-label="Balance Neto">$900.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell" data-label="Trimestre"><b>Total</b></td>
    //       <td class="report-cell" data-label="Mes"><b>Trimestre 1</b></td>
    //       <td class="report-cell" data-label="Total Ingresos"><b>$7,500.00</b></td>
    //       <td class="report-cell" data-label="Total Gastos"><b>$4,600.00</b></td>
    //       <td class="report-cell" data-label="Balance Neto"><b>$2,900.00</b></td>
    //     </tr>
    //   </table>

    //   <table class="report-table">
    //     <tr>
    //       <td data-label="Desglose de Gastos por Categoría (Trimestral)">
    //         <h3 class="report-subtitle">Desglose de Gastos por Categoría (Trimestral)</h3>
    //       </td>
    //     </tr>
    //   </table>
    //   <table class="report-table" border="1">
    //     <tr>
    //       <th class="report-header" data-label="Categoría de Gasto">Categoría de Gasto</th>
    //       <th class="report-header" data-label="Enero">Enero</th>
    //       <th class="report-header" data-label="Febrero">Febrero</th>
    //       <th class="report-header" data-label="Marzo">Marzo</th>
    //       <th class="report-header" data-label="Total Trimestral">Total Trimestral</th>
    //     </tr>
    //     <tr>
    //       <td class="report-cell" data-label="Categoría de Gasto">Alquiler</td>
    //       <td class="report-cell" data-label="Enero">$800.00</td>
    //       <td class="report-cell" data-label="Febrero">$800.00</td>
    //       <td class="report-cell" data-label="Marzo">$800.00</td>
    //       <td class="report-cell" data-label="Total Trimestral">$2,400.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell" data-label="Categoría de Gasto">Alimentos</td>
    //       <td class="report-cell" data-label="Enero">$300.00</td>
    //       <td class="report-cell" data-label="Febrero">$280.00</td>
    //       <td class="report-cell" data-label="Marzo">$320.00</td>
    //       <td class="report-cell" data-label="Total Trimestral">$900.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell" data-label="Categoría de Gasto">Transporte</td>
    //       <td class="report-cell" data-label="Enero">$150.00</td>
    //       <td class="report-cell" data-label="Febrero">$140.00</td>
    //       <td class="report-cell" data-label="Marzo">$150.00</td>
    //       <td class="report-cell" data-label="Total Trimestral">$440.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell" data-label="Categoría de Gasto">Entretenimiento</td>
    //       <td class="report-cell" data-label="Enero">$100.00</td>
    //       <td class="report-cell" data-label="Febrero">$90.00</td>
    //       <td class="report-cell" data-label="Marzo">$120.00</td>
    //       <td class="report-cell" data-label="Total Trimestral">$310.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell" data-label="Categoría de Gasto">Servicios</td>
    //       <td class="report-cell" data-label="Enero">$120.00</td>
    //       <td class="report-cell" data-label="Febrero">$130.00</td>
    //       <td class="report-cell" data-label="Marzo">$130.00</td>
    //       <td class="report-cell" data-label="Total Trimestral">$380.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell" data-label="Categoría de Gasto">Otros</td>
    //       <td class="report-cell" data-label="Enero">$50.00</td>
    //       <td class="report-cell" data-label="Febrero">$40.00</td>
    //       <td class="report-cell" data-label="Marzo">$80.00</td>
    //       <td class="report-cell" data-label="Total Trimestral">$170.00</td>
    //     </tr>
    //   </table>

    //   <table class="report-table">
    //     <tr>
    //       <td data-label="Conclusiones Trimestrales y Metas del Próximo Trimestre" colspan="6">
    //         <h3 class="report-subtitle">Conclusiones Trimestrales y Metas del Próximo Trimestre</h3>
    //       </td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell" data-label="Logros" colspan="4"></td>
    //       <td class="report-cell" data-label="Descripción"> Se mantuvo un balance positivo cada mes. Se logró ahorrar el 70% de la meta trimestral.</td>    
    //     </tr>
    //     <tr>
    //       <td class="report-cell" data-label="Observaciones" colspan="4"></td>
    //       <td class="report-cell" data-label="Descripción"> Aumento en gastos de entretenimiento en marzo.</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell" data-label="Meta para el próximo trimestre" colspan="4"></td>
    //       <td class="report-cell" data-label="Descripción"> Reducir un 10% el gasto en entretenimiento y aumentar el ahorro un 5%.</td>
    //     </tr>
    //   </table>

    // `,
    // annual: `
    //   <table class="report-table">
    //     <tr>
    //       <td data-label="Title">
    //         <h2 class="report-title">Informe Financiero Anual</h2>
    //       </td>
    //     </tr>
    //   </table>

    //   <table class="report-table" border="1">
    //     <tr>
    //       <th class="report-header">Mes</th>
    //       <th class="report-header">Total Ingresos</th>
    //       <th class="report-header">Total Gastos</th>
    //       <th class="report-header">Balance Neto</th>
    //     </tr>
    //     <tr>
    //       <td class="report-cell" data-label="Mes">Enero</td>
    //       <td class="report-cell" data-label="Total Ingresos">$2,500.00</td>
    //       <td class="report-cell" data-label="Total Gastos">$1,520.00</td>
    //       <td class="report-cell" data-label="Balance Neto">$980.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell" data-label="Mes">Febrero</td>
    //       <td class="report-cell" data-label="Total Ingresos">$2,500.00</td>
    //       <td class="report-cell" data-label="Total Gastos">$1,480.00</td>
    //       <td class="report-cell" data-label="Balance Neto">$1,020.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell" data-label="Mes">Marzo</td>
    //       <td class="report-cell" data-label="Total Ingresos">$2,500.00</td>
    //       <td class="report-cell" data-label="Total Gastos">$1,480.00</td>
    //       <td class="report-cell" data-label="Balance Neto">$1,020.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell" data-label="Mes">Abril</td>
    //       <td class="report-cell" data-label="Total Ingresos">$2,500.00</td>
    //       <td class="report-cell" data-label="Total Gastos">$1,480.00</td>
    //       <td class="report-cell" data-label="Balance Neto">$1,020.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell">Mayo</td>
    //       <td class="report-cell">$2,500.00</td>
    //       <td class="report-cell">$1,480.00</td>
    //       <td class="report-cell">$1,020.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell">Junio</td>
    //       <td class="report-cell">$2,500.00</td>
    //       <td class="report-cell">$1,480.00</td>
    //       <td class="report-cell">$1,020.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell">Julio</td>
    //       <td class="report-cell">$2,500.00</td>
    //       <td class="report-cell">$1,480.00</td>
    //       <td class="report-cell">$1,020.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell">Agosto</td>
    //       <td class="report-cell">$2,500.00</td>
    //       <td class="report-cell">$1,480.00</td>
    //       <td class="report-cell">$1,020.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell">Septiembre</td>
    //       <td class="report-cell">$2,500.00</td>
    //       <td class="report-cell">$1,480.00</td>
    //       <td class="report-cell">$1,020.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell">Octubre</td>
    //       <td class="report-cell">$2,500.00</td>
    //       <td class="report-cell">$1,480.00</td>
    //       <td class="report-cell">$1,020.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell">Noviembre</td>
    //       <td class="report-cell">$2,500.00</td>
    //       <td class="report-cell">$1,480.00</td>
    //       <td class="report-cell">$1,020.00</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell">Diciembre</td>
    //       <td class="report-cell">$2,500.00</td>
    //       <td class="report-cell">$1,480.00</td>
    //       <td class="report-cell">$1,020.00</td>
    //     </tr>
    //     <!-- Repetir filas para cada mes -->
    //     <tr>
    //       <td class="report-cell"><b>Total Anual</b></td>
    //       <td class="report-cell"><b>$30,000.00</b></td>
    //       <td class="report-cell"><b>$18,510.00</b></td>
    //       <td class="report-cell"><b>$11,490.00</b></td>
    //     </tr>
    //   </table>

    //   <table class="report-table">
    //     <tr>
    //       <td>
    //         <h3 class="report-subtitle">Desglose de Gastos Anuales por Categoría</h3>
    //       </td>
    //     </tr>
    //   </table>
    //   <table class="report-table" border="1">
    //     <tr>
    //       <th class="report-header">Categoría de Gasto</th>
    //       <th class="report-header">Gasto Total</th>
    //       <th class="report-header">Porcentaje del Gasto Total</th>
    //     </tr>
    //     <tr>
    //       <td class="report-cell">Alquiler</td>
    //       <td class="report-cell">$9,600.00</td>
    //       <td class="report-cell">52%</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell">Alimentos</td>
    //       <td class="report-cell">$3,600.00</td>
    //       <td class="report-cell">19%</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell">Transporte</td>
    //       <td class="report-cell">$1,800.00</td>
    //       <td class="report-cell">10%</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell">Entretenimiento</td>
    //       <td class="report-cell">$1,200.00</td>
    //       <td class="report-cell">6%</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell">Servicios</td>
    //       <td class="report-cell">$1,500.00</td>
    //       <td class="report-cell">8%</td>
    //     </tr>
    //     <tr>
    //       <td class="report-cell">Otros</td>
    //       <td class="report-cell">$810.00</td>
    //       <td class="report-cell">5%</td>
    //     </tr>
    //   </table>

    //   <table class="report-table">
    //     <tr>
    //       <td>
    //         <h3 class="report-subtitle">Logros Financieros del Año</h3>
    //       </td>
    //     </tr>
    //     <tr>
    //       <td>
    //         <ul class="report-list">
    //           <li><b>Ahorro Anual:</b> $11,490.00, equivalente al 38% del ingreso total anual.</li>
    //           <li><b>Deudas Reducidas:</b> Reducción de un 20% en deudas pendientes.</li>
    //           <li><b>Inversiones Realizadas:</b> $2,000.00 en fondos de inversión a largo plazo.</li>
    //         </ul>
    //       </td>
    //     </tr>
    //   </table>

    //   <table class="report-table">
    //     <tr>
    //       <td>
    //         <h3 class="report-subtitle">Metas Financieras para el Próximo Año</h3>
    //       </td>
    //     </tr>
    //     <tr>
    //       <td>
    //         <ul class="report-list">
    //           <li>Aumentar el ahorro anual al 40%.</li>
    //           <li>Reducir los gastos en entretenimiento un 15%.</li>
    //           <li>Destinar un 5% adicional de los ingresos a nuevas inversiones.</li>
    //         </ul>
    //       </td>
    //     </tr>
    //   </table>
    // `,
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

    function exportToCSV(nameDoc) {
      const rows = document.querySelectorAll(".report-table tr");
      let csvContent = "data:text/csv;charset=utf-8,";
      
      rows.forEach(row => {
      let rowData = [];
      row.querySelectorAll("td, th").forEach(cell => {
        rowData.push(cell.innerText);
      });
      csvContent += rowData.join(",") + "\r\n";
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${nameDoc}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    document.querySelector("#btn-export-csv").addEventListener("click", () => {
      exportToCSV(nameDoc);
    });

    function exportToPDF(nameDoc) {

      window.jsPDF = window.jspdf.jsPDF;
      const doc = new jsPDF();
      const element = document.querySelector(".cont-report-table");

      doc.text("Financial Report", 14, 16);
      const tables = element.querySelectorAll("table");
      let startY = 20;

      tables.forEach((table) => {
      doc.autoTable({
        html: table,
        startY: startY,
        theme: 'grid',
        headStyles: { fillColor: [22, 160, 133] },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        styles: { fontSize: 8 }
      });
      startY = doc.lastAutoTable.finalY + 10;
      });

      doc.save(`${nameDoc}.pdf`);
    }

    document.querySelector("#btn-export-pdf").addEventListener("click", async () => {
      await loadJsPDF(); // Asegura que se cargaron antes de ejecutarlo
      exportToPDF(nameDoc);
    });
    function exportToXLSX(nameDoc) {
      const tables = document.querySelectorAll(".report-table, .report-table-q");
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Report");

      tables.forEach((table, tableIndex) => {
      const rows = table.querySelectorAll("tr");
      rows.forEach((row, rowIndex) => {
        const rowData = [];
        row.querySelectorAll("td, th").forEach(cell => {
        rowData.push(cell.innerText);
        });
        const excelRow = worksheet.addRow(rowData);

        // Apply styles
        excelRow.eachCell((cell) => {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
        if (rowIndex === 0) {
          // Header row styles
          cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF16A085' } };
        } else {
          // Data row styles
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0F0F0' } };
        }
        });
      });

      worksheet.columns.forEach(column => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, cell => {
          const cellValue = cell.value ? cell.value.toString() : '';
          maxLength = Math.max(maxLength, cellValue.length);
          if (cellValue.length > 33) {
        cell.alignment = { wrapText: true };
          }
        });
        column.width = Math.min(maxLength + 2, 35); // Add some padding to the width, max width 35
      });

      worksheet.eachRow({ includeEmpty: true }, row => {
        let maxHeight = 15; // Default row height
        row.eachCell({ includeEmpty: true }, cell => {
          const cellValue = cell.value ? cell.value.toString() : '';
          const lineCount = Math.ceil(cellValue.length / 33);
          maxHeight = Math.max(maxHeight, lineCount * 15); // Approximate height per line
          if (cellValue.length > 33) {
        cell.alignment = { wrapText: true };
          }
        });
        row.height = maxHeight;
      });

      // Add a blank row between tables
      if (tableIndex < tables.length - 1) {
        worksheet.addRow([]);
      }
      });

      workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${nameDoc}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      });
    }

    document.querySelector("#btn-export-xlsx").addEventListener("click", () => {
      exportToXLSX(nameDoc);
    });
   
  }

  async function fetchDataAndFillTables(reportType) {
    const categories = await getCategories();
    const transactions = await getTransactions();
    const goals = await getGoals();

    let tableContent = '';

    if (reportType === 'monthly') {
      tableContent = generateMonthlyReport(categories, transactions, goals);
    } else if (reportType === 'quarterly') {
      tableContent = generateQuarterlyReport(categories, transactions, goals);
    } else if (reportType === 'annual') {
      tableContent = generateAnnualReport(categories, transactions, goals);
    }

    document.querySelector(".cont-report-table").innerHTML = tableContent;
  }

  function generateMonthlyReport(categories, transactions, goals) {
    let incomeTotal = 0;
    let expenseTotal = 0;
    let incomeRows = '';
    let expenseRows = '';

    transactions.forEach(transaction => {
      if (transaction.type === 'Income') {
      incomeTotal += Number(transaction.amount);
      incomeRows += `
        <tr>
        <td class="report-cell" data-label="Categoría">${transaction.categoryId}</td>
        <td class="report-cell" data-label="Descripción">${transaction.note}</td>
        <td class="report-cell" data-label="Monto">$${Number(transaction.amount).toFixed(2)}</td>
        </tr>
      `;
      } else if (transaction.type === 'Expense') {
      expenseTotal += Number(transaction.amount);
      expenseRows += `
        <tr>
        <td class="report-cell" data-label="Categoría">${transaction.categoryId}</td>
        <td class="report-cell" data-label="Descripción">${transaction.note}</td>
        <td class="report-cell" data-label="Monto">$${Number(transaction.amount).toFixed(2)}</td>
        </tr>
      `;
      }
    });

    const netBalance = incomeTotal - expenseTotal;

    return `
      <table class="report-table">
      <tr>
        <td><h2 class="report-title">Informe Financiero Mensual</h2></td>
      </tr>
      </table>
      <table class="report-table" border="1">
      <tr>
        <th class="report-header" data-label="Categoría">Categoría</th>
        <th class="report-header" data-label="Descripción">Descripción</th>
        <th class="report-header" data-label="Monto">Monto</th>
      </tr>
      <tr>
        <td class="report-cell" data-label="Categoría"><b>Ingresos</b></td>
        <td class="report-cell" data-label="Descripción"></td>
        <td class="report-cell" data-label="Monto"></td>
      </tr>
      ${incomeRows}
      <tr>
        <td class="report-cell" data-label="Categoría"><b>Total de Ingresos</b></td>
        <td class="report-cell" data-label="Descripción"></td>
        <td class="report-cell" data-label="Monto"><b>$${incomeTotal.toFixed(2)}</b></td>
      </tr>
      <tr>
        <td class="report-cell" data-label="Categoría"><b>Gastos</b></td>
        <td class="report-cell" data-label="Descripción"></td>
        <td class="report-cell" data-label="Monto"></td>
      </tr>
      ${expenseRows}
      <tr>
        <td class="report-cell" data-label="Categoría"><b>Total de Gastos</b></td>
        <td class="report-cell" data-label="Descripción"></td>
        <td class="report-cell" data-label="Monto"><b>$${expenseTotal.toFixed(2)}</b></td>
      </tr>
      <tr>
        <td class="report-cell" data-label="Categoría"><b>Balance Neto Mensual</b></td>
        <td class="report-cell" data-label="Descripción">Total Ingresos - Total Gastos</td>
        <td class="report-cell" data-label="Monto"><b>$${netBalance.toFixed(2)}</b></td>
      </tr>
      </table>

      <table class="report-table">
      <tr>
        <td>
        <h3 class="report-subtitle">Objetivos del Mes</h3>
        </td>
      </tr>
      <tr>
        <td>
        <p class="report-text">${goals.monthly}</p>
        </td>
      </tr>
      </table>

      <table class="report-table">
      <tr>
        <td>
        <h3 class="report-subtitle">Conclusiones</h3>
        </td>
      </tr>
      <tr>
        <td>
        <p class="report-text">Gastos en entretenimiento fueron altos. Ajustar el próximo mes.</p>
        </td>
      </tr>
      </table>
    `;
  }

  function generateQuarterlyReport(categories, transactions, goals) {
    let incomeTotal = 0;
    let expenseTotal = 0;
    let incomeRows = '';
    let expenseRows = '';
    let monthlyTotals = {};

    transactions.forEach(transaction => {
      const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
      if (!monthlyTotals[month]) {
      monthlyTotals[month] = { income: 0, expense: 0 };
      }

      if (transaction.type === 'Income') {
      incomeTotal += Number(transaction.amount);
      monthlyTotals[month].income += Number(transaction.amount);
      } else if (transaction.type === 'Expense') {
      expenseTotal += Number(transaction.amount);
      monthlyTotals[month].expense += Number(transaction.amount);
      }
    });

    const netBalance = incomeTotal - expenseTotal;

    let monthlyRows = Object.keys(monthlyTotals).map(month => {
      const { income, expense } = monthlyTotals[month];
      return `
      <tr>
        <td class="report-cell" data-label="Mes">${month}</td>
        <td class="report-cell" data-label="Total Ingresos">$${income.toFixed(2)}</td>
        <td class="report-cell" data-label="Total Gastos">$${expense.toFixed(2)}</td>
        <td class="report-cell" data-label="Balance Neto">$${(income - expense).toFixed(2)}</td>
      </tr>
      `;
    }).join('');

    return `
      <table class="report-table">
      <tr>
        <td><h2 class="report-title">Informe Financiero Trimestral</h2></td>
      </tr>
      </table>
      <table class="report-table-q" border="1">
      <tr>
        <th class="report-header" data-label="Trimestre">Trimestre</th>
        <th class="report-header" data-label="Mes">Mes</th>
        <th class="report-header" data-label="Total Ingresos">Total Ingresos</th>
        <th class="report-header" data-label="Total Gastos">Total Gastos</th>
        <th class="report-header" data-label="Balance Neto">Balance Neto</th>
      </tr>
      ${monthlyRows}
      <tr>
        <td class="report-cell" data-label="Trimestre"><b>Total</b></td>
        <td class="report-cell" data-label="Mes"><b>Trimestre 1</b></td>
        <td class="report-cell" data-label="Total Ingresos"><b>$${incomeTotal.toFixed(2)}</b></td>
        <td class="report-cell" data-label="Total Gastos"><b>$${expenseTotal.toFixed(2)}</b></td>
        <td class="report-cell" data-label="Balance Neto"><b>$${netBalance.toFixed(2)}</b></td>
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
        <th class="report-header" data-label="Categoría de Gasto">Categoría de Gasto</th>
        <th class="report-header" data-label="Enero">Enero</th>
        <th class="report-header" data-label="Febrero">Febrero</th>
        <th class="report-header" data-label="Marzo">Marzo</th>
        <th class="report-header" data-label="Total Trimestral">Total Trimestral</th>
      </tr>
      ${expenseRows}
      </table>

      <table class="report-table">
      <tr>
        <td>
        <h3 class="report-subtitle">Conclusiones Trimestrales y Metas del Próximo Trimestre</h3>
        </td>
      </tr>
      <tr>
        <td class="report-cell" data-label="Logros" colspan="4"></td>
        <td class="report-cell" data-label="Descripción"> Se mantuvo un balance positivo cada mes. Se logró ahorrar el 70% de la meta trimestral.</td>    
      </tr>
      <tr>
        <td class="report-cell" data-label="Observaciones" colspan="4"></td>
        <td class="report-cell" data-label="Descripción"> Aumento en gastos de entretenimiento en marzo.</td>
      </tr>
      <tr>
        <td class="report-cell" data-label="Meta para el próximo trimestre" colspan="4"></td>
        <td class="report-cell" data-label="Descripción"> Reducir un 10% el gasto en entretenimiento y aumentar el ahorro un 5%.</td>
      </tr>
      </table>
    `;
  }

  function generateAnnualReport(categories, transactions, goals) {
    let incomeTotal = 0;
    let expenseTotal = 0;
    let monthlyTotals = {};
    let categoryTotals = {};

    transactions.forEach(transaction => {
      const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
      if (!monthlyTotals[month]) {
      monthlyTotals[month] = { income: 0, expense: 0 };
      }

      if (transaction.type === 'Income') {
      incomeTotal += Number(transaction.amount);
      monthlyTotals[month].income += Number(transaction.amount);
      } else if (transaction.type === 'Expense') {
      expenseTotal += Number(transaction.amount);
      monthlyTotals[month].expense += Number(transaction.amount);

      if (!categoryTotals[transaction.categoryId]) {
        categoryTotals[transaction.categoryId] = 0;
      }
      categoryTotals[transaction.categoryId] += Number(transaction.amount);
      }
    });

    const netBalance = incomeTotal - expenseTotal;

    let monthlyRows = Object.keys(monthlyTotals).map(month => {
      const { income, expense } = monthlyTotals[month];
      return `
      <tr>
        <td class="report-cell" data-label="Mes">${month}</td>
        <td class="report-cell" data-label="Total Ingresos">$${income.toFixed(2)}</td>
        <td class="report-cell" data-label="Total Gastos">$${expense.toFixed(2)}</td>
        <td class="report-cell" data-label="Balance Neto">$${(income - expense).toFixed(2)}</td>
      </tr>
      `;
    }).join('');

    let categoryRows = Object.keys(categoryTotals).map(category => {
      const total = categoryTotals[category];
      const percentage = ((total / expenseTotal) * 100).toFixed(2);
      return `
      <tr>
        <td class="report-cell">${category}</td>
        <td class="report-cell">$${total.toFixed(2)}</td>
        <td class="report-cell">${percentage}%</td>
      </tr>
      `;
    }).join('');

    return `
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
      ${monthlyRows}
      <tr>
      <td class="report-cell" data-label="Mes"><b>Total Anual</b></td>
      <td class="report-cell" data-label="Total Ingresos"><b>$${incomeTotal.toFixed(2)}</b></td>
      <td class="report-cell" data-label="Total Gastos"><b>$${expenseTotal.toFixed(2)}</b></td>
      <td class="report-cell" data-label="Balance Neto"><b>$${netBalance.toFixed(2)}</b></td>
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
      ${categoryRows}
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
        <li><b>Ahorro Anual:</b> $${netBalance.toFixed(2)}, equivalente al ${(netBalance / incomeTotal * 100).toFixed(2)}% del ingreso total anual.</li>
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
    `;
  }

  btnsReport.forEach((button, index) => {
    button.addEventListener("click", async () => {
      setIndexBtn(index);
      let reportType = '';
      if (getIndexBtn() === 0) {
        reportType = 'monthly';
      } else if (getIndexBtn() === 1) {
        reportType = 'quarterly';
      } else if (getIndexBtn() === 2) {
        reportType = 'annual';
      }

      await fetchDataAndFillTables(reportType);
      document.querySelector("#btn-export-pdf").disabled = false;
      document.querySelector("#btn-export-csv").disabled = false;
      exportDoc(`${reportType}-finance-report`);
    });
  });

}
