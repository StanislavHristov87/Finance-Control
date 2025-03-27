
import { addTransaction } from "../../services/transaction-services";
import { useNavigate } from "react-router-dom";

const AddTransaction = ({ transaction, setTransaction } ) => {


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
        await addTransaction(transaction);
        alert("transaction added successfully!");

        navigate("/transactionsList")
    } catch (error) {
        console.error("Error adding transaction:", error.message); 
        alert("Error adding transaction!", error)
    }
   }
    


  return (
    <form onSubmit={handleSubmit} style={{maxWidth: "400px", margin: "auto"}} >
        <h2>Adding transactions</h2>

    <label>Sum</label>
    <input 
    type="number" 
    name="sum" 
    placeholder='Add a sum' 
    value={transaction.sum} 
    onChange={handleChange} 
    required />

    <label>Type of transaction</label>
    <select 
    name="type" 
    value={transaction.type} 
    onChange={handleChange}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
    </select>

    <label>Category</label>
    <select 
    name="category" 
    value={transaction.category} 
    onChange={handleChange} >
        <option value="salary">Salary</option>
        <option value="food">Food</option>
        <option value="rent">Rent</option>
        <option value="entertainment">Entertainment</option>
    </select>

    <label>Info</label>
    <input 
    type="text" 
    name="info" 
    value={transaction.info} 
    placeholder='info' 
    onChange={handleChange} />

        <button type='submit'>Add</button>

    </form>
  )
}

export default AddTransaction;