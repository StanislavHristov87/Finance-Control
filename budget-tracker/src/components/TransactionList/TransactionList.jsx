
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const TransactionList = ({ transactions }) => {

    

        const total = transactions.reduce((acc, transaction) => {
            if ( transaction.type === "income" ) {
                acc.income += Number(transaction.sum);
            } else if( transaction.type === "expense" ){
                acc.expense += Number(transaction.sum);
            }
            return acc;
        }, { income: 0, expense: 0 });

        const data = [
            { name: "Income", value: total.income },
            { name:"Expense", value: total.expense }
        ];

        const COLORS = ["#00C49F", "#FF4D4D"];

  return (
    
    <div>
        <h2>Transactions list</h2>
        
        <p><strong>Total income:</strong>{total.income} lv</p>
        <p><strong>Total expense:</strong>{total.expense} lv</p>

        <h3><strong>Balance:</strong>{total.income - total.expense} lv</h3>

        <PieChart width={400} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
                </PieChart>
    </div>
  )
}

export default TransactionList;