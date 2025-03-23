import React from 'react'

function TransactionList() {
  return (
  <div style={{maxWidth: "300px", margin: "auto" }}>
    <h2>History of transactions</h2>

    <ul>
        <li>Salary - +2000 lv (15.03.2025)</li>
        <li>Food - 9 lv (23.03.2025)</li>
        <li>Transport - 30 lv (22.03.2025)</li>
        <li>Rent - 900 lv (01.03.2025)</li>
    </ul>

  </div>
  )
}

export default TransactionList;