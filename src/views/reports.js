import { useState } from "../scripts/useState.js";
export function reports() {
  return `
          <div class="container-reports">
              <span class="title-reports"><h4>Reports</h4></span>
              <div class="btn-report-generate">
                <button id="btn-show-report-month">Show monthly report</button>
                <button id="btn-show-report-quarterly">Show quarterly report</button>
                <button id="btn-show-report-annual">Show Annual Report</button>
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
                    <table>
                      <tr>
                        <td><h2>Informe Financiero Mensual</h2></td>
                      </tr>
                    </table>
                    <table border="1">
                      <tr>
                        <th>Categoría</th>
                        <th>Descripción</th>
                        <th>Monto</th>
                      </tr>
                      <tr>
                        <td><b>Ingresos</b></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Salario</td>
                        <td></td>
                        <td>$2,000.00</td>
                      </tr>
                      <tr>
                        <td>Freelance</td>
                        <td></td>
                        <td>$500.00</td>
                      </tr>
                      <tr>
                        <td><b>Total de Ingresos</b></td>
                        <td></td>
                        <td><b>$2,500.00</b></td>
                      </tr>
                      <tr>
                        <td><b>Gastos</b></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Alquiler</td>
                        <td></td>
                        <td>$800.00</td>
                      </tr>
                      <tr>
                        <td>Alimentos</td>
                        <td>Compra de supermercado</td>
                        <td>$300.00</td>
                      </tr>
                      <tr>
                        <td>Transporte</td>
                        <td>Gasolina y transporte público</td>
                        <td>$150.00</td>
                      </tr>
                      <tr>
                        <td>Entretenimiento</td>
                        <td>Salidas, cine, etc.</td>
                        <td>$100.00</td>
                      </tr>
                      <tr>
                        <td>Servicios</td>
                        <td>Agua, luz, internet</td>
                        <td>$120.00</td>
                      </tr>
                      <tr>
                        <td>Otros</td>
                        <td>Suscripciones, etc.</td>
                        <td>$50.00</td>
                      </tr>
                      <tr>
                        <td><b>Total de Gastos</b></td>
                        <td></td>
                        <td><b>$1,520.00</b></td>
                      </tr>
                      <tr>
                        <td><b>Balance Neto Mensual</b></td>
                        <td>Total Ingresos - Total Gastos</td>
                        <td><b>$980.00</b></td>
                      </tr>
                    </table>

                    <table>
                      <tr>
                        <td>
                          <h3>Objetivos del Mes</h3>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>Ahorro, pago de deudas, etc. - Cumplidos: 75%</p>
                        </td>
                      </tr>
                    </table>

                    <table>
                      <tr>
                        <td>
                          <h3>Conclusiones</h3>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>Gastos en entretenimiento fueron altos. Ajustar el próximo mes.</p>
                        </td>
                      </tr>
                    </table>`,
    quarterly: `
      <table>
        <tr>
          <td><h2>Informe Financiero Trimestral</h2></td>
        </tr>
      </table>
      <table border="1">
        <tr>
          <th>Trimestre</th>
          <th>Mes</th>
          <th>Total Ingresos</th>
          <th>Total Gastos</th>
          <th>Balance Neto</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Enero</td>
          <td>$2,500.00</td>
          <td>$1,520.00</td>
          <td>$980.00</td>
        </tr>
        <tr>
          <td></td>
          <td>Febrero</td>
          <td>$2,500.00</td>
          <td>$1,480.00</td>
          <td>$1,020.00</td>
        </tr>
        <tr>
          <td></td>
          <td>Marzo</td>
          <td>$2,500.00</td>
          <td>$1,600.00</td>
          <td>$900.00</td>
        </tr>
        <tr>
          <td><b>Total</b></td>
          <td><b>Trimestre 1</b></td>
          <td><b>$7,500.00</b></td>
          <td><b>$4,600.00</b></td>
          <td><b>$2,900.00</b></td>
        </tr>
      </table>

      <table>
        <tr>
          <td>
            <h3>Desglose de Gastos por Categoría (Trimestral)</h3>
          </td>
        </tr>
      </table>
      <table border="1">
        <tr>
          <th>Categoría de Gasto</th>
          <th>Enero</th>
          <th>Febrero</th>
          <th>Marzo</th>
          <th>Total Trimestral</th>
        </tr>
        <tr>
          <td>Alquiler</td>
          <td>$800.00</td>
          <td>$800.00</td>
          <td>$800.00</td>
          <td>$2,400.00</td>
        </tr>
        <tr>
          <td>Alimentos</td>
          <td>$300.00</td>
          <td>$280.00</td>
          <td>$320.00</td>
          <td>$900.00</td>
        </tr>
        <tr>
          <td>Transporte</td>
          <td>$150.00</td>
          <td>$140.00</td>
          <td>$150.00</td>
          <td>$440.00</td>
        </tr>
        <tr>
          <td>Entretenimiento</td>
          <td>$100.00</td>
          <td>$90.00</td>
          <td>$120.00</td>
          <td>$310.00</td>
        </tr>
        <tr>
          <td>Servicios</td>
          <td>$120.00</td>
          <td>$130.00</td>
          <td>$130.00</td>
          <td>$380.00</td>
        </tr>
        <tr>
          <td>Otros</td>
          <td>$50.00</td>
          <td>$40.00</td>
          <td>$80.00</td>
          <td>$170.00</td>
        </tr>
      </table>

      <table>
        <tr>
          <td colspan="6">
            <h3>Conclusiones Trimestrales y Metas del Próximo Trimestre</h3>
          </td>
        </tr>
        <tr>
          <td colspan="4"><b>Logros:</b></td>
          <td> Se mantuvo un balance positivo cada mes. Se logró ahorrar el 70% de la meta trimestral.</td>    
        </tr>
        <tr>
          <td colspan="4"><b>Observaciones:</b></td>
          <td> Aumento en gastos de entretenimiento en marzo.</td>
        </tr>
        <tr>
          <td colspan="4"><b>Meta para el próximo trimestre:</b></td>
          <td> Reducir un 10% el gasto en entretenimiento y aumentar el ahorro un 5%.</td>
        </tr>
      </table>

    `,
    annual: `
      <table>
        <tr>
          <td>
            <h2>Informe Financiero Anual</h2>
          </td>
        </tr>
      </table>

      <table border="1">
        <tr>
          <th>Mes</th>
          <th>Total Ingresos</th>
          <th>Total Gastos</th>
          <th>Balance Neto</th>
        </tr>
        <tr>
          <td>Enero</td>
          <td>$2,500.00</td>
          <td>$1,520.00</td>
          <td>$980.00</td>
        </tr>
        <tr>
          <td>Febrero</td>
          <td>$2,500.00</td>
          <td>$1,480.00</td>
          <td>$1,020.00</td>
        </tr>
        <tr>
          <td>Marzo</td>
          <td>$2,500.00</td>
          <td>$1,480.00</td>
          <td>$1,020.00</td>
        </tr>
        <tr>
          <td>Abril</td>
          <td>$2,500.00</td>
          <td>$1,480.00</td>
          <td>$1,020.00</td>
        </tr>
        <tr>
          <td>Mayo</td>
          <td>$2,500.00</td>
          <td>$1,480.00</td>
          <td>$1,020.00</td>
        </tr>
        <tr>
          <td>Junio</td>
          <td>$2,500.00</td>
          <td>$1,480.00</td>
          <td>$1,020.00</td>
        </tr>
        <tr>
          <td>Julio</td>
          <td>$2,500.00</td>
          <td>$1,480.00</td>
          <td>$1,020.00</td>
        </tr>
        <tr>
          <td>Agosto</td>
          <td>$2,500.00</td>
          <td>$1,480.00</td>
          <td>$1,020.00</td>
        </tr>
        <tr>
          <td>Septiembre</td>
          <td>$2,500.00</td>
          <td>$1,480.00</td>
          <td>$1,020.00</td>
        </tr>
        <tr>
          <td>Octubre</td>
          <td>$2,500.00</td>
          <td>$1,480.00</td>
          <td>$1,020.00</td>
        </tr>
        <tr>
          <td>Noviembre</td>
          <td>$2,500.00</td>
          <td>$1,480.00</td>
          <td>$1,020.00</td>
        </tr>
        <tr>
          <td>Diciembre</td>
          <td>$2,500.00</td>
          <td>$1,480.00</td>
          <td>$1,020.00</td>
        </tr>
        <!-- Repetir filas para cada mes -->
        <tr>
          <td><b>Total Anual</b></td>
          <td><b>$30,000.00</b></td>
          <td><b>$18,510.00</b></td>
          <td><b>$11,490.00</b></td>
        </tr>
      </table>

      <table>
        <tr>
          <td>
            <h3>Desglose de Gastos Anuales por Categoría</h3>
          </td>
        </tr>
      </table>
      <table border="1">
        <tr>
          <th>Categoría de Gasto</th>
          <th>Gasto Total</th>
          <th>Porcentaje del Gasto Total</th>
        </tr>
        <tr>
          <td>Alquiler</td>
          <td>$9,600.00</td>
          <td>52%</td>
        </tr>
        <tr>
          <td>Alimentos</td>
          <td>$3,600.00</td>
          <td>19%</td>
        </tr>
        <tr>
          <td>Transporte</td>
          <td>$1,800.00</td>
          <td>10%</td>
        </tr>
        <tr>
          <td>Entretenimiento</td>
          <td>$1,200.00</td>
          <td>6%</td>
        </tr>
        <tr>
          <td>Servicios</td>
          <td>$1,500.00</td>
          <td>8%</td>
        </tr>
        <tr>
          <td>Otros</td>
          <td>$810.00</td>
          <td>5%</td>
        </tr>
      </table>

      <table>
        <tr>
          <td>
            <h3>Logros Financieros del Año</h3>
          </td>
        </tr>
        <tr>
          <td>
            <ul>
              <li><b>Ahorro Anual:</b> $11,490.00, equivalente al 38% del ingreso total anual.</li>
              <li><b>Deudas Reducidas:</b> Reducción de un 20% en deudas pendientes.</li>
              <li><b>Inversiones Realizadas:</b> $2,000.00 en fondos de inversión a largo plazo.</li>
            </ul>
          </td>
        </tr>
      </table>

      <table>
        <tr>
          <td>
            <h3>Metas Financieras para el Próximo Año</h3>
          </td>
        </tr>
        <tr>
          <td>
            <ul>
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
    // Selecciona el div que deseas exportar
    const filas = contenido.querySelectorAll("table tr");
    // Usa html2canvas para capturar el contenido
    html2canvas(contenido, {
      scale: 2, // Aumenta la calidad de la captura
      useCORS: true, // Para asegurar que los estilos externos se aplican
    }).then((canvas) => {
      // Convierte el canvas a una imagen en formato PNG
      const imgData = canvas.toDataURL("image/png");

      // Crea el PDF
      const pdf = new libJsPDF({
        orientation: "portrait", // orientación del PDF
        unit: "px", // unidad de medida
        format: [canvas.width, canvas.height], // Tamaño ajustado al canvas
      });

      // Añade la imagen al PDF
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

      // Guarda el PDF
      document
        .querySelector("#btn-export-pdf")
        .addEventListener("click", () => {
          pdf.save(`${nameDoc}.pdf`);
        });
    });

    // Construir el contenido CSV
    let csv = [];

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

    // Usa DOMParser para convertir el HTML en un nodo de tabla
    const tablaHTML = document.querySelector(".cont-report-table").innerHTML;
    const parser = new DOMParser();
    const doc = parser.parseFromString(tablaHTML, "text/html");
    const tableElement = doc.querySelector("table");
  }
}
