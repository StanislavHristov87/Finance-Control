import React from 'react'

function AddTransaction() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Transactions will be added soon!")
    }
  return (
    <form onSubmit={handleSubmit} style={{maxWidth: "400px", margin: "auto"}} >
        <h2>Adding transactions</h2>

    <label>Sum</label>
    <input type="number" placeholder='add a sum' required />

    <label>Type of transaction</label>
    <select>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
    </select>

    <label>Category</label>
    <select>
        <option value="salary">Salary</option>
        <option value="food">Food</option>
        <option value="rent">Rent</option>
        <option value="entertainment">Entertainment</option>
    </select>

    <label>Info</label>
    <input type="tex" placeholder='Info' />

        <button type='submit'>Add</button>

    </form>
  )
}

export default AddTransaction