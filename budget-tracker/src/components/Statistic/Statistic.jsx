import React from 'react'

const Statistic = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>📊 Balance</h2>
      <p>Full balance: <strong>+1330 лв.</strong></p>
      <p>📥 All income: <strong>2000 лв.</strong></p>
      <p>📤 All expensive: <strong>-670 лв.</strong></p>

      <h3>Graphs</h3>
      <div style={{ width: "300px", height: "150px", backgroundColor: "#ddd", margin: "auto" }}>
        <p>📊 Here will be the Graphs</p>
      </div>
    </div>
  )
}

export default Statistic