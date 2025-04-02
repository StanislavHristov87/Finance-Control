
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const TransactionList = ({ transactions }) => {

    

        // const total = transactions.reduce((acc, transaction) => {
        //     if ( transaction.type === "income" ) {
        //         acc.income += Number(transaction.sum);
        //     } else if( transaction.type === "expense" ){
        //         acc.expense += Number(transaction.sum);
        //     }
        //     return acc;
        // }, { income: 0, expense: 0 });

        // const data = [
        //     { name: "Income", value: total.income },
        //     { name:"Expense", value: total.expense }
        // ];

        // const COLORS = ["#00C49F", "#FF4D4D"];

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
    
    // <div>
    //     <h2>Transactions list</h2>
        
    //     <p><strong>Total income:</strong>{total.income} lv</p>
    //     <p><strong>Total expense:</strong>{total.expense} lv</p>

    //     <h3><strong>Balance:</strong>{total.income - total.expense} lv</h3>

    //     <PieChart width={400} height={300}>
    //             <Pie
    //                 data={data}
    //                 cx="50%"
    //                 cy="50%"
    //                 labelLine={false}
    //                 outerRadius={100}
    //                 fill="#8884d8"
    //                 dataKey="value"
    //             >
    //                 {data.map((entry, index) => (
    //                     <Cell key={`cell-${index}`} fill={COLORS[index]} />
    //                 ))}
    //             </Pie>
    //             <Tooltip />
    //             <Legend />
    //             </PieChart>
    // </div>
    
        <div>
            <h2>Statistics</h2>
    
            <h3>Income by Category</h3>
            <PieChart width={400} height={300}>
                <Pie data={incomeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#4CAF50" label>
                    {incomeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={["#4CAF50", "#81C784", "#66BB6A", "#388E3C"][index % 4]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
    
            <h3>Expenses by Category</h3>
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
    );
    

  
}

export default TransactionList;