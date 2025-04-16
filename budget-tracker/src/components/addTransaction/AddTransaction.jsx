
import { addTransaction } from "../../services/transaction-services";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

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
    <form onSubmit={handleSubmit} 
    style={{maxWidth: "400px",
     marginBottom: "200px", 
     marginTop: "100px" }} >
        <h1 style={{color: "green", marginBottom: "100px"}} >Adding transactions</h1>

    <label style={{fontSize: "23px", color: "black", marginRight: "23px"}} >Sum:</label>
    <input 
    type="number" 
    name="sum" 
    placeholder='Add a sum' 
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

    <label style={{fontSize: "23px", color: "black", marginRight: "23px"}} >Type of transaction</label>
    <select 
    name="type" 
    value={transaction.type} 
    style={{
        borderRadius: '38px',
        fontSize: "20px",
        backgroundColor: "blue"
    }}
    onChange={handleChange}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
    </select>

    <br />

    <label style={{fontSize: "23px", color: "black", marginRight: "23px"}} >Category</label>
    <select 
    name="category" 
    value={transaction.category} 
    style={{
        borderRadius: '38px',
        fontSize: "20px",
        backgroundColor: "blue"
    }}
    onChange={handleChange} >
        <option value="salary">Salary</option>
        <option value="bonuses">Bonuses</option>
        <option value="otherIncome">Other income</option>
        <option value="food">Food</option>
        <option value="rent">Rent</option>
        <option value="transport">Transport</option>
        <option value="entertainment">Entertainment</option>
    </select>

    <br />

    <label style={{fontSize: "23px", color: "black", marginRight: "23px"}} >Info</label>
    <input 
    type="text" 
    name="info" 
    value={transaction.info} 
    placeholder='info' 
    onChange={handleChange}
    style={{
        borderRadius: '38px',
        fontSize: "20px",
        backgroundColor: "blue"
    }}
    />

        <br />

<label style={{fontSize: "23px", color: "black", marginRight: "23px"}} >Date</label>
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
        backgroundColor: "blue"
    }}
/>

        <div>
        <button type='submit' style={{marginTop: "200px", fontSize: "30px"}}>Add transaction </button>
        </div>

    </form>
  )
}

export default AddTransaction;