import { useState } from "../scripts/useState.js";
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
let dataCurrency;
fetch('./src/locale/currency/currency.json')
.then((response)=>response.json())
.then((data)=>dataCurrency = data)
.catch((error)=>console.log(error));

export async function initializeReport() {
  
}
