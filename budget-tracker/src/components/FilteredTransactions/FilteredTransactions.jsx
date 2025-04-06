import React, { useState } from 'react'

const FilteredTransactions = ({ transactions }) => {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [showResult, setShowResult] = useState(false);



    const handleFilter = () => {

        if (!startDate || !endDate) {
            alert("Please select dates !");
            return;
        }

        const filtered = transactions.filter(transaction => {
            const date = new Date(transaction.date);
            return date >= new Date(startDate) && date <= new Date(endDate);
        });

        setFilteredTransactions(filtered);
        setShowResult(true);
    }

   



  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Filter transactions by date</h2>

      <label>Start date:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <br />

      <label>End date:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <br />
      <button onClick={handleFilter}>Show results</button>

      {showResult && (
        <div>
          <h3>Results:</h3>
          {filteredTransactions.length === 0 ? (
            <p>No transactions for this period</p>
          ) : (
            filteredTransactions.map((transaction, index) => (
              <div key={index} style={{ borderBottom: "1px solid #ccc", marginTop: "10px" }}>
                <p><strong>Sum:</strong> {transaction.sum} лв</p>
                <p><strong>Category:</strong> {transaction.category}</p>
                <p><strong>Type:</strong> {transaction.type}</p>
                <p><strong>Date:</strong> {transaction.date}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default FilteredTransactions;