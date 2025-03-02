import { useState } from '../scripts/useState.js';
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
    
}

