import { useState } from '../scripts/useState.js';
export function goals() {
return /*HTML*/`
            <div class="container-goals">
            <span class="title-goals"><h4>Goals</h4></span>
            <button id='btn-new-goals' type='button'>New goals</button>
            <div id="goal-form">
                    <div class="form-group">
                            <label for="goal-name">Goal Name:</label>
                            <input type="text" id="goal-name" name="goal-name" required>
                    </div>
                    <div class="form-group">
                            <label for="goal-amount">Goal Amount:</label>
                            <input type="number" id="goal-amount" name="goal-amount" required>
                    </div>
                    <div class="form-group">
                            <label for="goal-date">Target Date:</label>
                            <input type="date" id="goal-date" name="goal-date" required>
                    </div>
                    <div id="cont-btn-goal">
                            <button id="btn-add-goal" type="button">Add Goal</button>
                            <button id="btn-cancel-goal" type="button">cancel</button>
                    </div>
            </div>
            <div id="goal-list">
                    <table class="goal-table">
                            <thead>
                                    <tr class="head-table-goals">
                                            <th>Goal Name</th>
                                            <th>Goal Amount</th>
                                            <th>Current Amount</th>
                                            <th>Target Date</th>
                                            <th>Action</th>
                                    </tr>
                            </thead>
                            <tbody id="body-table-goals">
                                    <!-- Goals will be dynamically inserted here -->
                            </tbody>
                    </table>
            </div>
            </div>
    `;
}
let dataCurrency;

fetch('./src/locale/currency/currency.json')
.then((response)=>response.json())
.then((data)=>dataCurrency = data)
.catch((error)=>console.log(error));

export async function initializeGoals() {

    document.getElementById('btn-add-goal').addEventListener('click', addGoal);
    document.getElementById('btn-cancel-goal').addEventListener('click', clearForm);

    const btnNewGoal = document.getElementById('btn-new-goals');
    const goalForm = document.getElementById('goal-form');

    goalForm.style.display = 'none';

    btnNewGoal.addEventListener('click', ()=>{
        goalForm.style.display = 'block'

        document.getElementById('btn-cancel-goal').addEventListener('click', () => {
            goalForm.style.display = 'none';
        });
    })

    function addGoal() {
        const goalName = document.getElementById('goal-name').value;
        const goalAmount = document.getElementById('goal-amount').value;
        const goalDate = document.getElementById('goal-date').value;

        if (!goalName || !goalAmount || !goalDate) {
            alert('All fields are required');
            return;
        }

        const goal = {
            name: goalName,
            amount: goalAmount,
            date: goalDate,
            type: 'goals'
        };

        let goals = JSON.parse(localStorage.getItem('goals')) || [];
        goals.push(goal);
        localStorage.setItem('goals', JSON.stringify(goals));
        goalForm.style.display = 'none';

        renderGoals();
        clearForm();
    }

    function clearForm() {
        document.getElementById('goal-name').value = '';
        document.getElementById('goal-amount').value = '';
        document.getElementById('goal-date').value = '';
    }



    function renderGoals() {
        const goals = JSON.parse(localStorage.getItem('goals')) || [];
        const tbody = document.getElementById('body-table-goals');
        tbody.innerHTML = '';

        goals.forEach((goal, index) => {
            const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
            const currentAmount = transactions
                .filter(transaction => transaction.category === goal.name)
                .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

            // console.log(currentAmount);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Goal Name">${goal.name}</td>
                <td data-label="Goal Amount">${goal.amount}</td>
                <td data-label="Current Amount" style="color: ${currentAmount >= parseFloat(goal.amount) ? 'green' : 'orange'};">${currentAmount}</td>
                <td data-label="Target Date">${goal.date}</td>
                <td data-label="Action"><button id="btn-delete-goal">Delete</button></td>
            `;
            tbody.appendChild(row);
        });
    }

    function removeGoal(index) {
        let goals = JSON.parse(localStorage.getItem('goals')) || [];
        goals.splice(index, 1);
        localStorage.setItem('goals', JSON.stringify(goals));
        renderGoals();
    }

    document.getElementById('body-table-goals').addEventListener('click', (event) => {
        if (event.target && event.target.id === 'btn-delete-goal') {
            const rowIndex = Array.from(event.target.parentNode.parentNode.parentNode.children).indexOf(event.target.parentNode.parentNode);
            removeGoal(rowIndex);
        }
    });

    renderGoals();
    
}

