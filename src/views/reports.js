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
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  const currentMonthYear = `${currentMonth} - ${currentYear}`;

  const currentMonthIndex = currentDate.getMonth() + 1;
  const isFirstSemester = currentMonthIndex <= 6;
  const semesterStartMonth = isFirstSemester ? 'January' : 'July';
  const semesterEndMonth = isFirstSemester ? 'June' : 'December';
  const currentSemester = `${semesterStartMonth} - ${semesterEndMonth} ${currentYear}`;
  const currentSemesterLabel = isFirstSemester ? 'First Semester' : 'Second Semester';

  const currencyData = JSON.parse(localStorage.getItem('currency')) || {};
  const currencySymbol = currencyData.symbol;
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  const goals = JSON.parse(localStorage.getItem('goals')) || [];
  const budgetTracking = JSON.parse(localStorage.getItem('budgetTracking')) || [];
  const budgetCategories = JSON.parse(localStorage.getItem('budgetCategories')) || [];
  document.getElementById('btn-show-report-month').addEventListener('click', () => {
    const reportContainer = document.querySelector('.cont-report-table');
    const monthlyTransactions = transactions.filter(transaction => transaction.date.startsWith('2025-03'));
    const incomeTransactions = monthlyTransactions.filter(transaction => transaction.type === 'Income');
    const expenseTransactions = monthlyTransactions.filter(transaction => transaction.type === 'Expense');

    const totalIncome = incomeTransactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
    const totalExpenses = expenseTransactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
    const balance = totalIncome - totalExpenses;

    const incomeRows = incomeTransactions.map(transaction => `
      <tr>
      <td>${transaction.category}</td>
      <td>${budgetCategories.income.find(cat => cat.name === transaction.category)?.description || ''}</td>
      <td>${currencySymbol} ${transaction.amount}</td>
      </tr>
    `).join('');

    const expenseRows = expenseTransactions.map(transaction => `
      <tr>
      <td>${transaction.category}</td>
      <td>${budgetCategories.expense.find(cat => cat.name === transaction.category)?.description || ''}</td>
      <td>${currencySymbol} ${transaction.amount}</td>
      </tr>
    `).join('');

    reportContainer.innerHTML = `
      <div class="container">
      <h1>Monthly Personal Finance Report</h1>
      <div class="report-header">
        <h3>${currentMonthYear}</h3>
        <p>Period: ${currentMonthYear}</p>
      </div>
      <table>
        <thead>
        <tr>
          <th>Category</th>
          <th>Description</th>
          <th>Amount (${currencySymbol})</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td colspan="3" style="text-align:center; font-weight: bold; background-color:#e6f7e6;">Income</td>
        </tr>
        ${incomeRows}
        <tr>
          <td colspan="3" style="text-align:center; font-weight: bold; background-color:#f1f1f1;">Expenses</td>
        </tr>
        ${expenseRows}
        <tr class="total-row">
          <td>Total Income</td>
          <td></td>
          <td>${currencySymbol} ${totalIncome.toFixed(2)}</td>
        </tr>
        <tr class="total-row">
          <td>Total Expenses</td>
          <td></td>
          <td>${currencySymbol} ${totalExpenses.toFixed(2)}</td>
        </tr>
        <tr class="highlight">
          <td>Balance</td>
          <td></td>
          <td>${currencySymbol} ${balance.toFixed(2)}</td>
        </tr>
        </tbody>
      </table>
      <div class="summary">
        <h3>Summary</h3>
        <p><strong>Total Income:</strong> ${currencySymbol} ${totalIncome.toFixed(2)}</p>
        <p><strong>Total Expenses:</strong> ${currencySymbol} ${totalExpenses.toFixed(2)}</p>
        <p><strong>Balance:</strong> <span class="highlight">${currencySymbol} ${balance.toFixed(2)}</span></p>
        <p><strong>Savings:</strong> <span class="highlight">${((totalIncome - totalExpenses) / totalIncome * 100).toFixed(2)}%</span></p>
        <p><strong>Remaining Debt:</strong> ${currencySymbol} ${goals.reduce((sum, goal) => sum + parseFloat(goal.amount), 0)}</p>
      </div>
      </div>
    `;
  });

  document.getElementById('btn-show-report-quarterly').addEventListener('click', () => {
    const reportContainer = document.querySelector('.cont-report-table');
    const firstSemesterTransactions = transactions.filter(transaction => {
      const month = new Date(transaction.date).getMonth() + 1;
      return month >= 1 && month <= 6;
    });

    const incomeTransactions = firstSemesterTransactions.filter(transaction => transaction.type === 'Income');
    const expenseTransactions = firstSemesterTransactions.filter(transaction => transaction.type === 'Expense');

    const totalIncome = incomeTransactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
    const totalExpenses = expenseTransactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
    const balance = totalIncome - totalExpenses;

    const incomeRows = incomeTransactions.map(transaction => `
      <tr>
      <td>${transaction.category}</td>
      <td>${budgetCategories.income.find(cat => cat.name === transaction.category)?.description || ''}</td>
      <td>${currencySymbol}${transaction.amount}</td>
      <td></td>
      </tr>
    `).join('');

    const expenseRows = expenseTransactions.map(transaction => `
      <tr>
      <td>${transaction.category}</td>
      <td>${budgetCategories.expense.find(cat => cat.name === transaction.category)?.description || ''}</td>
      <td>${currencySymbol}${transaction.amount}</td>
      <td></td>
      </tr>
    `).join('');

    reportContainer.innerHTML = `
      <div class="container">
      <h1>Personal Finance Report - ${currentSemesterLabel} ${currentYear}</h1>
      <div class="report-header">
        <h3>${currentSemester}</h3>
        <p>Period: ${currentSemesterLabel}</p>
      </div>
      <table>
        <thead>
        <tr>
          <th>Category</th>
          <th>Description</th>
          <th>Amount (${currencySymbol})</th>
          <th>Comparison (Last Semester)</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td colspan="4" style="text-align:center; font-weight: bold; background-color:#e6f7e6;">Income</td>
        </tr>
        ${incomeRows}
        <tr>
          <td colspan="4" style="text-align:center; font-weight: bold; background-color:#f1f1f1;">Expenses</td>
        </tr>
        ${expenseRows}
        <tr class="total-row">
          <td>Total Income</td>
          <td></td>
          <td>${currencySymbol} ${totalIncome.toFixed(2)}</td>
          <td></td>
        </tr>
        <tr class="total-row">
          <td>Total Expenses</td>
          <td></td>
          <td>${currencySymbol} ${totalExpenses.toFixed(2)}</td>
          <td></td>
        </tr>
        <tr class="highlight">
          <td>Balance</td>
          <td></td>
          <td>${currencySymbol} ${balance.toFixed(2)}</td>
          <td></td>
        </tr>
        </tbody>
      </table>
      <div class="summary">
        <h3>Summary</h3>
        <p><strong>Total Income:</strong> ${currencySymbol} ${totalIncome.toFixed(2)}</p>
        <p><strong>Total Expenses:</strong> ${currencySymbol} ${totalExpenses.toFixed(2)}</p>
        <p><strong>Balance:</strong> <span class="highlight">${currencySymbol} ${balance.toFixed(2)}</span></p>
        <p><strong>Savings:</strong> <span class="highlight">${((totalIncome - totalExpenses) / totalIncome * 100).toFixed(2)}%</span></p>
        <p><strong>Remaining Debt:</strong> ${currencySymbol} ${goals.reduce((sum, goal) => sum + parseFloat(goal.amount), 0)}</p>
      </div>
      <!-- <div class="comparing-periods">
        <h3>Comparison to Previous Semester</h3>
        <p><strong>Income Change:</strong> +12%</p>
        <p><strong>Expenses Change:</strong> +5%</p>
        <p><strong>Balance Change:</strong> +15%</p>
      </div> -->
      </div>
    `;
  });

  document.getElementById('btn-show-report-annual').addEventListener('click', () => {
    const reportContainer = document.querySelector('.cont-report-table');
    const annualTransactions = transactions.filter(transaction => transaction.date.startsWith('2025'));
    const incomeTransactions = annualTransactions.filter(transaction => transaction.type === 'Income');
    const expenseTransactions = annualTransactions.filter(transaction => transaction.type === 'Expense');

    const totalIncome = incomeTransactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
    const totalExpenses = expenseTransactions.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
    const balance = totalIncome - totalExpenses;

    const incomeRows = incomeTransactions.map(transaction => `
      <tr>
      <td>${transaction.category}</td>
      <td>${budgetCategories.income.find(cat => cat.name === transaction.category)?.description || ''}</td>
      <td>${currencySymbol} ${transaction.amount}</td>
      <td></td>
      </tr>
    `).join('');

    const expenseRows = expenseTransactions.map(transaction => `
      <tr>
      <td>${transaction.category}</td>
      <td>${budgetCategories.expense.find(cat => cat.name === transaction.category)?.description || ''}</td>
      <td>${currencySymbol} ${transaction.amount}</td>
      <td></td>
      </tr>
    `).join('');

    reportContainer.innerHTML = `
      <div class="container">
      <h1>Personal Finance Report - ${currentYear}</h1>
      <div class="report-header">
        <h3>Year: ${currentYear}</h3>
        <p>Period: Full Year</p>
      </div>
      <table>
        <thead>
        <tr>
          <th>Category</th>
          <th>Description</th>
          <th>Amount (${currencySymbol})</th>
          <th>Comparison (Last Year)</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td colspan="4" style="text-align:center; font-weight: bold; background-color:#e6f7e6;">Income</td>
        </tr>
        ${incomeRows}
        <tr>
          <td colspan="4" style="text-align:center; font-weight: bold; background-color:#f1f1f1;">Expenses</td>
        </tr>
        ${expenseRows}
        <tr class="total-row">
          <td>Total Income</td>
          <td></td>
          <td>${currencySymbol} ${totalIncome.toFixed(2)}</td>
          <td></td>
        </tr>
        <tr class="total-row">
          <td>Total Expenses</td>
          <td></td>
          <td>${currencySymbol} ${totalExpenses.toFixed(2)}</td>
          <td></td>
        </tr>
        <tr class="highlight">
          <td>Balance</td>
          <td></td>
          <td>${currencySymbol} ${balance.toFixed(2)}</td>
          <td></td>
        </tr>
        </tbody>
      </table>
      <div class="summary">
        <h3>Summary</h3>
        <p><strong>Total Income:</strong> ${currencySymbol} ${totalIncome.toFixed(2)}</p>
        <p><strong>Total Expenses:</strong> ${currencySymbol} ${totalExpenses.toFixed(2)}</p>
        <p><strong>Balance:</strong> <span class="highlight">${currencySymbol} ${balance.toFixed(2)}</span></p>
        <p><strong>Savings:</strong> <span class="highlight">${((totalIncome - totalExpenses) / totalIncome * 100).toFixed(2)}%</span></p>
        <p><strong>Remaining Debt:</strong> ${currencySymbol} ${goals.reduce((sum, goal) => sum + parseFloat(goal.amount), 0)}</p>
      </div>
      <!-- <div class="comparing-periods">
        <h3>Comparison to Previous Year</h3>
        <p><strong>Income Change:</strong> +14%</p>
        <p><strong>Expenses Change:</strong> +7%</p>
        <p><strong>Balance Change:</strong> +20%</p>
      </div> -->
      </div>
    `;
  });

  document.getElementById('btn-export-pdf').addEventListener('click', async () => {
    await loadJsPDF();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const reportContainer = document.querySelector('.container');
    if (reportContainer) {
      doc.text("Personal Finance Report", 10, 10);
      doc.autoTable({ html: reportContainer.querySelector('table') });
      const summary = reportContainer.querySelector('.summary');
      if (summary) {
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("Summary", 10, doc.autoTable.previous.finalY + 10);
        doc.autoTable({
          startY: doc.autoTable.previous.finalY + 15,
          head: [['Description', 'Amount']],
          body: [
        ['Total Income', summary.querySelector('p:nth-child(2)').innerText.split(': ')[1]],
        ['Total Expenses', summary.querySelector('p:nth-child(3)').innerText.split(': ')[1]],
        ['Balance', summary.querySelector('p:nth-child(4)').innerText.split(': ')[1]],
        ['Savings', summary.querySelector('p:nth-child(5)').innerText.split(': ')[1]],
        ['Remaining Debt', summary.querySelector('p:nth-child(6)').innerText.split(': ')[1]],
          ],
          theme: 'grid',
          styles: { fontSize: 10, cellPadding: 2 },
        });
      }
      const comparison = reportContainer.querySelector('.comparing-periods');
      if (comparison) {
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("Comparison to Previous Period", 10, doc.autoTable.previous.finalY + 10);
        doc.autoTable({
          startY: doc.autoTable.previous.finalY + 15,
          head: [['Metric', 'Change']],
          body: [
        ['Income Change', comparison.querySelector('p:nth-child(2)').innerText.split(': ')[1]],
        ['Expenses Change', comparison.querySelector('p:nth-child(3)').innerText.split(': ')[1]],
        ['Balance Change', comparison.querySelector('p:nth-child(4)').innerText.split(': ')[1]],
          ],
          theme: 'grid',
          styles: { fontSize: 10, cellPadding: 2 },
        });
      }
      doc.save('report.pdf');
    } else {
      console.error('No report content available to export.');
    }
  });

  document.getElementById('btn-export-csv').addEventListener('click', async () => {
    const reportContainer = document.querySelector('.container');
    if (reportContainer) {
      const table = reportContainer.querySelector('table');
      const rows = Array.from(table.querySelectorAll('tr'));
      let csvContent = rows.map(row => {
        const cells = Array.from(row.querySelectorAll('th, td'));
        return cells.map(cell => cell.innerText).join(',');
      }).join('\n');

      const summary = reportContainer.querySelector('.summary');
      if (summary) {
        csvContent += '\n\nSummary\n';
        csvContent += `Total Income,${summary.querySelector('p:nth-child(2)').innerText.split(': ')[1]}\n`;
        csvContent += `Total Expenses,${summary.querySelector('p:nth-child(3)').innerText.split(': ')[1]}\n`;
        csvContent += `Balance,${summary.querySelector('p:nth-child(4)').innerText.split(': ')[1]}\n`;
        csvContent += `Savings,${summary.querySelector('p:nth-child(5)').innerText.split(': ')[1]}\n`;
        csvContent += `Remaining Debt,${summary.querySelector('p:nth-child(6)').innerText.split(': ')[1]}\n`;
      }

      const comparison = reportContainer.querySelector('.comparing-periods');
      if (comparison) {
        csvContent += '\n\nComparison to Previous Period\n';
        csvContent += `Income Change,${comparison.querySelector('p:nth-child(2)').innerText.split(': ')[1]}\n`;
        csvContent += `Expenses Change,${comparison.querySelector('p:nth-child(3)').innerText.split(': ')[1]}\n`;
        csvContent += `Balance Change,${comparison.querySelector('p:nth-child(4)').innerText.split(': ')[1]}\n`;
      }

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'report.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('No report content available to export.');
    }
  });

  document.getElementById('btn-export-xlsx').addEventListener('click', async () => {
    const reportContainer = document.querySelector('.container');
    if (reportContainer) {
      // await import("https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.2.1/exceljs.min.js");
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Report');

      const table = reportContainer.querySelector('table');
      const rows = Array.from(table.querySelectorAll('tr'));
      rows.forEach((row, rowIndex) => {
        const cells = Array.from(row.querySelectorAll('th, td'));
        cells.forEach((cell, cellIndex) => {
          const cellRef = worksheet.getCell(rowIndex + 1, cellIndex + 1);
          cellRef.value = cell.innerText;
          if (rowIndex === 0) {
            cellRef.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FF4F81BD' },
            };
            cellRef.font = { bold: true, color: { argb: 'FFFFFFFF' } };
          }
          cellRef.alignment = { wrapText: true, vertical: 'middle', horizontal: 'left' };
        });
      });

      const summary = reportContainer.querySelector('.summary');
      if (summary) {
        const summaryStartRow = rows.length + 2;
        worksheet.getCell(summaryStartRow, 1).value = 'Summary';
        worksheet.getCell(summaryStartRow, 1).font = { bold: true };
        worksheet.getCell(summaryStartRow + 1, 1).value = 'Total Income';
        worksheet.getCell(summaryStartRow + 1, 2).value = summary.querySelector('p:nth-child(2)').innerText.split(': ')[1];
        worksheet.getCell(summaryStartRow + 2, 1).value = 'Total Expenses';
        worksheet.getCell(summaryStartRow + 2, 2).value = summary.querySelector('p:nth-child(3)').innerText.split(': ')[1];
        worksheet.getCell(summaryStartRow + 3, 1).value = 'Balance';
        worksheet.getCell(summaryStartRow + 3, 2).value = summary.querySelector('p:nth-child(4)').innerText.split(': ')[1];
        worksheet.getCell(summaryStartRow + 4, 1).value = 'Savings';
        worksheet.getCell(summaryStartRow + 4, 2).value = summary.querySelector('p:nth-child(5)').innerText.split(': ')[1];
        worksheet.getCell(summaryStartRow + 5, 1).value = 'Remaining Debt';
        worksheet.getCell(summaryStartRow + 5, 2).value = summary.querySelector('p:nth-child(6)').innerText.split(': ')[1];
      }

      const comparison = reportContainer.querySelector('.comparing-periods');
      if (comparison) {
        const comparisonStartRow = rows.length + 9;
        worksheet.getCell(comparisonStartRow, 1).value = 'Comparison to Previous Period';
        worksheet.getCell(comparisonStartRow, 1).font = { bold: true };
        worksheet.getCell(comparisonStartRow + 1, 1).value = 'Income Change';
        worksheet.getCell(comparisonStartRow + 1, 2).value = comparison.querySelector('p:nth-child(2)').innerText.split(': ')[1];
        worksheet.getCell(comparisonStartRow + 2, 1).value = 'Expenses Change';
        worksheet.getCell(comparisonStartRow + 2, 2).value = comparison.querySelector('p:nth-child(3)').innerText.split(': ')[1];
        worksheet.getCell(comparisonStartRow + 3, 1).value = 'Balance Change';
        worksheet.getCell(comparisonStartRow + 3, 2).value = comparison.querySelector('p:nth-child(4)').innerText.split(': ')[1];
      }

      worksheet.columns.forEach(column => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, cell => {
          const cellValue = cell.value ? cell.value.toString() : '';
          maxLength = Math.max(maxLength, cellValue.length);
        });
        column.width = maxLength < 30 ? maxLength + 2 : 30;
      });

      worksheet.eachRow({ includeEmpty: true }, function(row) {
        row.height = row.height ? row.height + 2 : 15;
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'report.xlsx');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('No report content available to export.');
    }
  });
  
}
