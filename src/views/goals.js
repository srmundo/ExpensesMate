import { useState } from '../scripts/useState.js';
import { insertGoal, getGoals, updateGoal, deleteGoal } from '../data/storage.js';
export function goals() {
  return `
        <div class="container-goals">
        <span class="title-goals"><h4>Goals</h4></span>
        <button id='btn-new-goals'>New goals</button>
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
    goalForm.classList.add('hidden');

    btnAddGoal.addEventListener('click', () => {
        const goalName = document.getElementById('goal-name').value;
        const goalAmount = document.getElementById('goal-amount').value;
        const goalDate = document.getElementById('goal-date').value;
        const newGoal = { name: goalName, amount: goalAmount, currentAmount: 0, date: goalDate };

        // Insert the new goal into the database
        insertGoal(newGoal.name, newGoal.amount, newGoal.currentAmount, newGoal.date).then(() => {
            // Update the state and re-render the goals
            setGoals([...goals(), newGoal]);
            renderGoals();
            console.log(goals());

            // Clear the form inputs
            document.getElementById('goal-name').value = '';
            document.getElementById('goal-amount').value = '';
            document.getElementById('goal-date').value = '';
        }).catch(error => {
            console.error('Error inserting goal:', error);
        });
    });

    function renderGoals() {
        getGoals().then(fetchedGoals => {
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
            ${fetchedGoals.map(goal => `
            <tr id='${goal.id}'>
                <td data-label="Goal Name">${goal.name}</td>
                <td data-label="Amount">$${goal.amount}</td>
                <td data-label="Current Amount">$${goal.currentAmount}</td>
                <td data-label="Target Date">${goal.date}</td>
                <td data-label="Progress">${goal.currentAmount / goal.amount * 100}%</td>
                <td data-label="Actions"><button class="btn-delete-goal" type="button">Delete</button></td>
            </tr>
            `).join('')}
            </tbody>
            </table>
            `;

            // Add event listeners for delete buttons
            document.querySelectorAll('.btn-delete-goal').forEach(button => {
            button.addEventListener('click', (event) => {
                const goalId = event.target.closest('tr').id;
                deleteGoal(Number(goalId)).then(() => {
                setGoals(goals().filter(goal => goal.id !== goalId));
                renderGoals();
                }).catch(error => {
                console.error('Error deleting goal:', error);
                });
            });
            });
        }).catch(error => {
            console.error('Error fetching goals:', error);
        });

        // Add event listeners for delete buttons
        document.querySelectorAll('.btn-delete-goal').forEach(button => {
            button.addEventListener('click', (event) => {
                const goalId = event.target.closest('tr').id;
                // console.log(typeof goalId);
                deleteGoal(Number(goalId)).then(() => {
                    setGoals(goals().filter(goal => goal.id !== goalId));
                    renderGoals();
                }).catch(error => {
                    console.error('Error deleting goal:', error);
                });
            });
        });
    }

    function loadGoals() {
        getGoals().then(fetchedGoals => {
            setGoals(fetchedGoals);
            renderGoals();
        }).catch(error => {
            console.error('Error fetching goals:', error);
        });
    }

    const btnNewGoals = document.getElementById('btn-new-goals');
    const btnCancelGoal = document.getElementById('btn-cancel-goal');

    btnNewGoals.addEventListener('click', () => {
        goalForm.classList.toggle('hidden');
    });

    btnCancelGoal.addEventListener('click', () => {
        goalForm.classList.add('hidden');
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            goalForm.classList.remove('hidden');
        }
    });

    loadGoals();
}

// document.addEventListener('DOMContentLoaded', initializeGoals);