import { useState } from '../scripts/useState.js';

export function goals() {
  return `
        <div class="container-goals">
        <span class="title-goals"><h4>Goals</h4></span>
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
            <div id="cont-btn-goal"><button id="btn-add-goal" type="button">Add Goal</button></div>
        </div>
        <div id="goal-list">
            <!-- List of goals will be rendered here -->
        </div>
        </div>
    `;
}

export function initializeGoals() {
    const [goals, setGoals] = useState([]);

    const btnAddGoal = document.getElementById('btn-add-goal');
    const goalList = document.getElementById('goal-list');
    const goalForm = document.getElementById('goal-form');

    btnAddGoal.addEventListener('click', () => {
        const goalName = document.getElementById('goal-name').value;
        const goalAmount = document.getElementById('goal-amount').value;
        const goalDate = document.getElementById('goal-date').value;
        const newGoal = { name: goalName, amount: goalAmount, currentAmount: 0, date: goalDate };
        setGoals([...goals(), newGoal]);
        renderGoals();
        console.log(goals());
        document.getElementById('goal-name').value = '';
        document.getElementById('goal-amount').value = '';
    });

    function renderGoals() {
        goalList.innerHTML = `
            <table class="goal-table">
            <thead>
                <tr>
                <th>Goal Name</th>
                <th>Amount</th>
                <th>Current Amount</th>
                <th>Target Date</th>
                <th>Progress</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${goals().map(goal => `
                <tr>
                    <td>${goal.name}</td>
                    <td>$${goal.amount}</td>
                    <td>$${goal.currentAmount}</td>
                    <td>${goal.date}</td>
                    <td>${goal.currentAmount / goal.amount * 100}%</td>
                    <td><button id="btn-edit-goal" type="button">Edit</button> | <button id="btn-delete-goal" type="button">Delete</button></td>
                </tr>
                `).join('')}
            </tbody>
            </table>
        `;
    }

    renderGoals();
}

// document.addEventListener('DOMContentLoaded', initializeGoals);