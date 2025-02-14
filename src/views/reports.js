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
  document.querySelector("#btn-export-xlsx").disabled = true;

  const [getIndexBtn, setIndexBtn] = useState(null);

  const contenido = document.querySelector(".cont-report-table");

  let btnReportM = document.getElementById("btn-show-report-month");
  let btnReportQ = document.getElementById("btn-show-report-quarterly");
  let btnReportA = document.getElementById("btn-show-report-annual");


  let btnsReport = [btnReportM, btnReportQ, btnReportA];

  btnsReport.forEach((button, index) => {
    button.addEventListener("click", async () => {
      setIndexBtn(index);
      let reportType = '';
      let reportName = '';

      if (getIndexBtn() === 0) {
        reportType = 'monthly';
        reportName = 'monthly-finance-report';
      } else if (getIndexBtn() === 1) {
        reportType = 'quarterly';
        reportName = 'quarterly-finance-report';
      } else if (getIndexBtn() === 2) {
        reportType = 'annual';
        reportName = 'annual-finance-report';
      }

      await fetchDataAndFillTables(reportType);

      document.querySelector("#btn-export-pdf").disabled = false;
      document.querySelector("#btn-export-csv").disabled = false;
      document.querySelector("#btn-export-xlsx").disabled = false;

      document.querySelector("#btn-export-pdf").onclick = async () => {
        await loadJsPDF();
        exportDoc(reportName, "pdf");
      };
      document.querySelector("#btn-export-csv").onclick = () => {
        exportDoc(reportName, "csv");
      };
      document.querySelector("#btn-export-xlsx").onclick = () => {
        exportDoc(reportName, "xlsx");
      };
    });
  });

  function exportDoc(nameDoc, type) {

    if (type === "pdf") {
      exportToPDF(nameDoc);
    } else if (type === "csv") {
      exportToCSV(nameDoc);
    } else if (type === "xlsx") {
      exportToXLSX(nameDoc);
    }

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

    
   
  }

  // document.querySelector("#btn-export-csv").addEventListener("click", () => {
  //   exportToCSV(nameDoc);
  // });
// document.querySelector("#btn-export-pdf").addEventListener("click", async () => {
//     await loadJsPDF(); // Asegura que se cargaron antes de ejecutarlo
//     exportToPDF(nameDoc);
//   });
// document.querySelector("#btn-export-xlsx").addEventListener("click", () => {
//     exportToXLSX(nameDoc);
//   });

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
        <td class="report-cell" data-label="Category">${transaction.categoryId}</td>
        <td class="report-cell" data-label="Description">${transaction.note}</td>
        <td class="report-cell" data-label="Amount">$${Number(transaction.amount).toFixed(2)}</td>
        </tr>
      `;
      } else if (transaction.type === 'Expense') {
      expenseTotal += Number(transaction.amount);
      expenseRows += `
        <tr>
        <td class="report-cell" data-label="Category">${transaction.categoryId}</td>
        <td class="report-cell" data-label="Description">${transaction.note}</td>
        <td class="report-cell" data-label="Amount">$${Number(transaction.amount).toFixed(2)}</td>
        </tr>
      `;
      }
    });

    const netBalance = incomeTotal - expenseTotal;

    return `
      <table class="report-table">
      <tr>
        <td><h2 class="report-title">Monthly Financial Report</h2></td>
      </tr>
      </table>
      <table class="report-table" border="1">
      <tr>
        <th class="report-header" data-label="Category">Category</th>
        <th class="report-header" data-label="Description">Description</th>
        <th class="report-header" data-label="Amount">Amount</th>
      </tr>
      <tr>
        <td class="report-cell" data-label="Category"><b>Income</b></td>
        <td class="report-cell" data-label="Description"></td>
        <td class="report-cell" data-label="Amount"></td>
      </tr>
      ${incomeRows}
      <tr>
        <td class="report-cell" data-label="Category"><b>Total Income</b></td>
        <td class="report-cell" data-label="Description"></td>
        <td class="report-cell" data-label="Amount"><b>$${incomeTotal.toFixed(2)}</b></td>
      </tr>
      <tr>
        <td class="report-cell" data-label="Category"><b>Expenses</b></td>
        <td class="report-cell" data-label="Description"></td>
        <td class="report-cell" data-label="Amount"></td>
      </tr>
      ${expenseRows}
      <tr>
        <td class="report-cell" data-label="Category"><b>Total Expenses</b></td>
        <td class="report-cell" data-label="Description"></td>
        <td class="report-cell" data-label="Amount"><b>$${expenseTotal.toFixed(2)}</b></td>
      </tr>
      <tr>
        <td class="report-cell" data-label="Category"><b>Net Monthly Balance</b></td>
        <td class="report-cell" data-label="Description">Total Income - Total Expenses</td>
        <td class="report-cell" data-label="Amount"><b>$${netBalance.toFixed(2)}</b></td>
      </tr>
      </table>

      <table class="report-table">
      <tr>
        <td>
        <h3 class="report-subtitle">Monthly Goals</h3>
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
        <h3 class="report-subtitle">Conclusions</h3>
        </td>
      </tr>
      <tr>
        <td>
        <p class="report-text">Entertainment expenses were high. Adjust next month.</p>
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
          <td class="report-cell" data-label="Month">${month}</td>
          <td class="report-cell" data-label="Total Income">$${income.toFixed(2)}</td>
          <td class="report-cell" data-label="Total Expenses">$${expense.toFixed(2)}</td>
          <td class="report-cell" data-label="Net Balance">$${(income - expense).toFixed(2)}</td>
        </tr>
      `;
    }).join('');

    return `
      <table class="report-table">
        <tr>
          <td><h2 class="report-title">Quarterly Financial Report</h2></td>
        </tr>
      </table>
      <table class="report-table-q" border="1">
        <tr>
          <th class="report-header" data-label="Quarter">Quarter</th>
          <th class="report-header" data-label="Month">Month</th>
          <th class="report-header" data-label="Total Income">Total Income</th>
          <th class="report-header" data-label="Total Expenses">Total Expenses</th>
          <th class="report-header" data-label="Net Balance">Net Balance</th>
        </tr>
        ${monthlyRows}
        <tr>
          <td class="report-cell" data-label="Quarter"><b>Total</b></td>
          <td class="report-cell" data-label="Month"><b>Quarter 1</b></td>
          <td class="report-cell" data-label="Total Income"><b>$${incomeTotal.toFixed(2)}</b></td>
          <td class="report-cell" data-label="Total Expenses"><b>$${expenseTotal.toFixed(2)}</b></td>
          <td class="report-cell" data-label="Net Balance"><b>$${netBalance.toFixed(2)}</b></td>
        </tr>
      </table>

      <table class="report-table">
        <tr>
          <td>
            <h3 class="report-subtitle">Expense Breakdown by Category (Quarterly)</h3>
          </td>
        </tr>
      </table>
      <table class="report-table" border="1">
        <tr>
          <th class="report-header" data-label="Expense Category">Expense Category</th>
          <th class="report-header" data-label="January">January</th>
          <th class="report-header" data-label="February">February</th>
          <th class="report-header" data-label="March">March</th>
          <th class="report-header" data-label="Total Quarterly">Total Quarterly</th>
        </tr>
        ${expenseRows}
      </table>

      <table class="report-table">
        <tr>
          <td>
            <h3 class="report-subtitle">Quarterly Conclusions and Goals for the Next Quarter</h3>
          </td>
        </tr>
        <tr>
          <td class="report-cell" data-label="Achievements" colspan="4"></td>
          <td class="report-cell" data-label="Description"> A positive balance was maintained each month. 70% of the quarterly goal was achieved.</td>    
        </tr>
        <tr>
          <td class="report-cell" data-label="Observations" colspan="4"></td>
          <td class="report-cell" data-label="Description"> Increase in entertainment expenses in March.</td>
        </tr>
        <tr>
          <td class="report-cell" data-label="Goal for the next quarter" colspan="4"></td>
          <td class="report-cell" data-label="Description"> Reduce entertainment expenses by 10% and increase savings by 5%.</td>
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
        <td class="report-cell" data-label="Month">${month}</td>
        <td class="report-cell" data-label="Total Income">$${income.toFixed(2)}</td>
        <td class="report-cell" data-label="Total Expenses">$${expense.toFixed(2)}</td>
        <td class="report-cell" data-label="Net Balance">$${(income - expense).toFixed(2)}</td>
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
      <h2 class="report-title">Annual Financial Report</h2>
      </td>
      </tr>
      </table>

      <table class="report-table" border="1">
      <tr>
      <th class="report-header">Month</th>
      <th class="report-header">Total Income</th>
      <th class="report-header">Total Expenses</th>
      <th class="report-header">Net Balance</th>
      </tr>
      ${monthlyRows}
      <tr>
      <td class="report-cell" data-label="Month"><b>Annual Total</b></td>
      <td class="report-cell" data-label="Total Income"><b>$${incomeTotal.toFixed(2)}</b></td>
      <td class="report-cell" data-label="Total Expenses"><b>$${expenseTotal.toFixed(2)}</b></td>
      <td class="report-cell" data-label="Net Balance"><b>$${netBalance.toFixed(2)}</b></td>
      </tr>
      </table>

      <table class="report-table">
      <tr>
      <td>
      <h3 class="report-subtitle">Annual Expense Breakdown by Category</h3>
      </td>
      </tr>
      </table>
      <table class="report-table" border="1">
      <tr>
      <th class="report-header">Expense Category</th>
      <th class="report-header">Total Expense</th>
      <th class="report-header">Percentage of Total Expense</th>
      </tr>
      ${categoryRows}
      </table>

      <table class="report-table">
      <tr>
      <td>
      <h3 class="report-subtitle">Financial Achievements of the Year</h3>
      </td>
      </tr>
      <tr>
      <td>
      <ul class="report-list">
        <li><b>Annual Savings:</b> $${netBalance.toFixed(2)}, equivalent to ${(netBalance / incomeTotal * 100).toFixed(2)}% of the total annual income.</li>
        <li><b>Debts Reduced:</b> 20% reduction in outstanding debts.</li>
        <li><b>Investments Made:</b> $2,000.00 in long-term investment funds.</li>
      </ul>
      </td>
      </tr>
      </table>

      <table class="report-table">
      <tr>
      <td>
      <h3 class="report-subtitle">Financial Goals for the Next Year</h3>
      </td>
      </tr>
      <tr>
      <td>
      <ul class="report-list">
        <li>Increase annual savings to 40%.</li>
        <li>Reduce entertainment expenses by 15%.</li>
        <li>Allocate an additional 5% of income to new investments.</li>
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
    });
  });

}
