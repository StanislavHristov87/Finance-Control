import React, { useState } from 'react'

const FilteredTransactions = ({ transactions }) => {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleStartDateChange = (e) => {
        e.preventDefault();
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const filtered = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const from = startDate ? new Date(startDate) : null;
        const to = endDate ? new Date(endDate) : null;

        return (
            (!from || transactionDate >= from) && (!to || transactionDate <= to)
        )
    });



  return (
    <div style={{ padding: "1rem", border: "1px solid #ddd", marginTop: "1rem" }} >

    <h1>Filter by transactions date</h1>

    <div>
    <label>From Date:</label>
    <input type="date" value={startDate} onChange={handleStartDateChange}/>

    <label>To Date:</label>
    <input type="date" value={endDate} onChange={handleEndDateChange} />
    </div>


    <h3 style={{color: "yellow"}} >Results:</h3>

    {filtered.length === 0 ? (
        <p>No transactions for this period!</p>
    ) : (
        <ul>
            {filtered.map((t, index) => (
                <li key={index}>
                    <strong>{t.category}</strong> - {t.sum} lv ({t.type}) - {t.date}
                </li>
            ))}
        </ul>
    )

    }

    </div>
  )
}

export default FilteredTransactions;