import { useState } from '../scripts/useState.js';
import { insertGoal, getGoals, updateGoal, deleteGoal, getCurrencyConfig } from '../data/storage.js';
import * as storageMobile from '../data/storageMobile.js';
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
let dataCurrency;

fetch('./src/locale/currency/currency.json')
.then((response)=>response.json())
.then((data)=>dataCurrency = data)
.catch((error)=>console.log(error));

export async function initializeGoals() {
    function isMobileDevice() {
        return /Mobi|Android/i.test(navigator.userAgent);
    }
    const session = sessionStorage.getItem('session');
    const sessionId =JSON.parse(session).id;
    const currencyConfig = await getCurrencyConfig(sessionId);
    const currencySymbol = dataCurrency[currencyConfig[0].currency].symbol;
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
        if (!goalName || !goalAmount || !goalDate) {
            if (!goalName) document.getElementById('goal-name').style.border = '1px solid red';
            if (!goalAmount) document.getElementById('goal-amount').style.border = '1px solid red';
            if (!goalDate) document.getElementById('goal-date').style.border = '1px solid red';
            return;
        } else {
            document.getElementById('goal-name').style.border = '';
            document.getElementById('goal-amount').style.border = '';
            document.getElementById('goal-date').style.border = '';
        }
        // Insert the new goal into the database
        if (isMobileDevice()) {
            storageMobile.insertGoal(sessionId, newGoal.name, newGoal.amount, newGoal.currentAmount, newGoal.date).then(() => {
                // Update the state and re-render the goals
                // setGoals([...goals(), newGoal]);
                renderGoals();
                // console.log(goals());

                // Clear the form inputs
                document.getElementById('goal-name').value = '';
                document.getElementById('goal-amount').value = '';
                document.getElementById('goal-date').value = '';

                goalForm.classList.add('hidden');

            }).catch(error => {
                console.error('Error inserting goal:', error);
            });
        }
        insertGoal(sessionId, newGoal.name, newGoal.amount, newGoal.currentAmount, newGoal.date).then(() => {
            // Update the state and re-render the goals
            // setGoals([...goals(), newGoal]);
            renderGoals();
            // console.log(goals());

            // Clear the form inputs
            document.getElementById('goal-name').value = '';
            document.getElementById('goal-amount').value = '';
            document.getElementById('goal-date').value = '';

            goalForm.classList.add('hidden');

        }).catch(error => {
            console.error('Error inserting goal:', error);
        });
    });

    function renderGoals() {
        if (isMobileDevice()) {
            storageMobile.getGoals(sessionId).then(fetchedGoals => {
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
                    <td data-label="Progress">${(goal.currentAmount / goal.amount * 100).toFixed(2)}%</td>
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
                    storageMobile.deleteGoal(sessionId, Number(goalId)).then(() => {
                    // setGoals(goals().filter(goal => goal.id !== goalId));
                    renderGoals();
                    }).catch(error => {
                    console.error('Error deleting goal:', error);
                    });
                });
                });
            }).catch(error => {
                console.error('Error fetching goals:', error);
            });
        }
        getGoals(sessionId).then(fetchedGoals => {
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
                <td data-label="Amount">${currencySymbol} ${goal.amount}</td>
                <td data-label="Current Amount">${currencySymbol} ${goal.currentAmount}</td>
                <td data-label="Target Date">${goal.date}</td>
                <td data-label="Progress">${(goal.currentAmount / goal.amount * 100).toFixed(2)}%</td>
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
                deleteGoal(sessionId, Number(goalId)).then(() => {
                // setGoals(goals().filter(goal => goal.id !== goalId));
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
                if (isMobileDevice()) {
                    storageMobile.deleteGoal(sessionId, Number(goalId)).then(() => {
                        setGoals(goals().filter(goal => goal.id !== goalId));
                        renderGoals();
                    }).catch(error => {
                        console.error('Error deleting goal:', error);
                    });
                }
                deleteGoal(sessionId, Number(goalId)).then(() => {
                    setGoals(sessionId, goals().filter(goal => goal.id !== goalId));
                    renderGoals();
                }).catch(error => {
                    console.error('Error deleting goal:', error);
                });
            });
        });
    }

    function loadGoals() {
        if (isMobileDevice()) {
            storageMobile.getGoals(sessionId).then(fetchedGoals => {
                setGoals(fetchedGoals);
                renderGoals();
            }).catch(error => {
                console.error('Error fetching goals:', error);
            });
        }
        getGoals(sessionId).then(fetchedGoals => {
            setGoals(sessionId, fetchedGoals);
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