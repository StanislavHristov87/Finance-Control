import React, { useEffect, useState } from 'react'

const FilteredTransactions = ({ transactions }) => {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
      
    if (startDate && endDate && transactions.length > 0) {
        const filtered = transactions.filter(transaction => {
            const date = new Date(transaction.date);
            return date >= new Date(startDate) && date <= new Date(endDate);
        });

        setFilteredTransactions(filtered);
    }
    
    }, [startDate, endDate, transactions])
    

    const handleFilter = () => {

        if (!startDate || !endDate) {
            alert("Please select dates !");
            return;
        }
       
        setShowResult(true);
    }

   



  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1 style={{color: "green", }}>Filter transactions by date</h1>

      <label style={{color: "blue", 
          fontSize: "28px",
          cursor: "pointer"
          }} >Start date:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        style={{borderRadius: "18px",
            fontSize: "23px",
            marginLeft: "28px",
            marginTop: "50px",
            cursor: "pointer"
        }}
      />

      <br />

      <label style={{color: "black", fontSize: "28px", cursor: "pointer"
      }} >End date:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        style={{borderRadius: "18px",
            fontSize: "23px",
            marginLeft: "28px",
            marginTop: "50px",
            cursor: "pointer"
        }}
      />

      <br />
      <button onClick={handleFilter} style={{marginTop: "200px", 
      marginBottom: "100px",
        fontSize: "23px",
        backgroundColor: "blue",
        color: ""
        }} >Show results</button>

      {showResult && (
        <div >
          <h3 style={{color: "black"}}>Results:</h3>
          {filteredTransactions.length === 0 ? (
            <p>No transactions for this period</p>
          ) : (
            filteredTransactions.map((transaction, index) => (
              <div key={index} style={{ borderBottom: "1px solid #ccc"
              , 
               backgroundColor: "black",
               borderRadius: "18px",
               color: "yellow"
              }}>
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