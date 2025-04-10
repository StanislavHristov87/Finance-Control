
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const TransactionList = ({ transactions }) => {

    const total = transactions.reduce((acc, transaction) => {
        if ( transaction.type === "income" ) {
            acc.income += Number(transaction.sum);
        } else if( transaction.type === "expense" ){
            acc.expense += Number(transaction.sum);
        }
        return acc;
    }, { income: 0, expense: 0 })

        const categorizedExpenses = transactions.reduce((acc, transaction) => {
            if (transaction.type === "expense") {
                acc[transaction.category] = (acc[transaction.category] || 0)
                 + Number(transaction.sum);
            }
            return acc;
        }, {});

        const categorizedIncomes = transactions.reduce((acc, transaction) => {
            if (transaction.type === "income") {
                acc[transaction.category] = (acc[transaction.category] || 0)
                + Number(transaction.sum)
            }
            return acc;
        }, {});

        const expenseData = Object.entries(categorizedExpenses).map(([category, amount]) => ({
            name: category,
            value: amount
        }));
        
        const incomeData = Object.entries(categorizedIncomes).map(([category, amount]) => ({
            name: category,
            value: amount
        }));
        

  return (
    
  
    
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }} >
            
            <div>

            <h2 style={ {textAlign: "center", fontSize: "87px", color: "blue", fontWeight: "bold" } } >Statistics</h2>
    
    <h3 style={{textAlign: "left", fontSize: "31px", color: "green",  }} >Income</h3>
    <PieChart width={400} height={300}>
        <Pie data={incomeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#4CAF50" label>
            {incomeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={["#4CAF50", "#81C784", "#66BB6A", "#388E3C"][index % 4]} />
            ))}
        </Pie>
        <Tooltip />
        <Legend />
    </PieChart>
            </div>

            <div>
            <h3 style={{textAlign: "right", fontSize: "31px", color: "red"}} >Expenses</h3>
    <PieChart width={400} height={300}>
        <Pie data={expenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#FF5722" label>
            {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={["#FF5722", "#FF7043", "#F4511E", "#BF360C"][index % 4]} />
            ))}
        </Pie>
        <Tooltip />
        <Legend />
    </PieChart>
            </div>
            <div>
              <h1 style={{backgroundColor: "black",
                 color: "green",
                 borderRadius: '38px'
                 
                 }} > Balance</h1>

               <p style={{backgroundColor: "green",
                 color: "black",
                 borderRadius: '38px'
                 
                 }} >
              { total.income - total.expense
              }
               </p>
           
           
           

            </div>
            
        </div>
    );
    

  
}

export default TransactionList;