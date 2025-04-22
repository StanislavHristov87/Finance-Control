
import { addTransaction } from "../../services/transaction-services";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
// import './addTransactions.css'

const AddTransaction = ({ transaction, setTransaction } ) => {

    const { user } = useContext(AppContext);

        const navigate = useNavigate();

        const handleChange = (e) => {
            setTransaction({
                ...transaction,
                [e.target.name]: e.target.value
            });
        };



   const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting transaction:", transaction); 
    try {
        await addTransaction(user.uid, transaction);
        alert("transaction added successfully!");

        navigate("/transactionsList")
    } catch (error) {
        console.error("Error adding transaction:", error.message); 
        alert("Error adding transaction!", error)
    }
   }
    


  return (
    <form  onSubmit={handleSubmit} 
    style={{maxWidth: "400px",
     marginBottom: "200px", 
     marginTop: "100px", 
     marginLeft: "270px"
     }} >
        <h1 style={{color: "BLACK", 
            marginBottom: "30px"}} >Transactions</h1>

    <label style={{fontSize: "23px", color: "black",
         marginRight: "23px"}} >Sum:</label>
    <input 
    type="number" 
    name="sum" 
    placeholder='' 
    value={transaction.sum} 
    onChange={handleChange} 
    required 
    style={{
        borderRadius: '38px',
        fontSize: "20px",
        backgroundColor: "blue"
    }}
    />
    

    <br />

    <label style={{fontSize: "23px",
         color: "black", marginRight: "33px"}} >Type:</label>
    <select 
    name="type" 
    value={transaction.type} 
    style={{
        borderRadius: '38px',
        fontSize: "23px",
        backgroundColor: "blue",
        width: "210px"
    }}
    onChange={handleChange}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
    </select>

    <br />

    <label style={{fontSize: "23px",
         color: "black", marginRight: "3px"}} >Category:</label>
    <select 
    name="category" 
    value={transaction.category} 
    style={{
        borderRadius: '38px',
        fontSize: "20px",
        backgroundColor: "blue",
        width: "200px"
    }}
    onChange={handleChange} >
        <option value="salary">Salary</option>
        <option value="bonuses">Bonuses</option>
        <option value="otherIncome">Other income</option>
        <option value="food">Food</option>
        <option value="rent">Rent</option>
        <option value="transport">Transport</option>
        <option value="entertainment">Entertainment</option>
        <option value="other expenses">Other expenses</option>
    </select>

    <br />

    <label style={{fontSize: "23px",
         color: "black", marginRight: "33px"}} >Info:</label>
    <input 
    type="text" 
    name="info" 
    value={transaction.info} 
    placeholder='' 
    onChange={handleChange}
    style={{
        borderRadius: '38px',
        fontSize: "20px",
        backgroundColor: "blue"
    }}
    />

        <br />

<label style={{fontSize: "23px", 
    color: "black", marginRight: "33px"}} >Date:</label>
<input 
    type="date" 
    name="date" 
    value={transaction.date}
    placeholder="date"
    onChange={handleChange}
    required
    style={{
        borderRadius: '38px',
        fontSize: "20px",
        backgroundColor: "blue",
        width: "210px"
    }}
/>

        <div>
        <button type='submit' style={{marginTop: "70px",
             fontSize: "20px"
             }}>Add transaction </button>
        </div>

    </form>
  )
}

export default AddTransaction;