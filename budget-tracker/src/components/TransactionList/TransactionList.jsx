
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// const TransactionList = ({ transactions }) => {

//     const totals = transactions.reduce((acc, transaction) => {
//         if ( transaction.type === 'income' ) {
//             acc.income += Number(transaction.sum)
// ;        } else if ( transaction.type === 'expense' ) {
//             acc.expense += Number(transaction.sum)
//         }
//         return acc;
//     }, {income: 0, expense: 0})
    
//     // const total = transactions.reduce((acc, transaction) => {
//     //     return acc + Number(transaction.sum); // Уверяваме се, че добавяме числовата стойност
//     // }, 0);  // Началната стойност на acc е 0

//     return (
//         <div>
//             {/* Показваме общата сума */}
//             <h2>Обща сума на транзакциите: {totals.income - totals.expense}</h2>
//         </div>
    
//     )
  
// }

// export default TransactionList;

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import { COLORS, EXPENSE_COLORS , BALANCE_COLORS} from "../../data/colors";

import { useNavigate } from "react-router-dom";


const TransactionList = ({ transactions }) => {

    const navigate = useNavigate();
  // Смятаме тотали
  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += Number(transaction.sum);
      } else if (transaction.type === "expense") {
        acc.expense += Number(transaction.sum);
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  // Групиране по категории за разходи
  const expenseData = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.sum);
      return acc;
    }, {});

  const expenseChart = Object.entries(expenseData).map(([key, value]) => ({
    name: key,
    value,
  }));

  // Групиране по категории за приходи
  const incomeData = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.sum);
      return acc;
    }, {});

  const incomeChart = Object.entries(incomeData).map(([key, value]) => ({
    name: key,
    value,
  }));

  const totalSumLeft = totals.income - totals.expense;

  const data = [
    { name: 'savedMoney', value: totalSumLeft },
    {name: 'moneySpent', value: totals.expense }      
  ];
  const handleNavigate = () => {
    navigate("/transactions")
  }


  return (
    <div style={{ display: "flex", justifyContent: "space-around", marginTop: 50 }}>
      <div>
        <h3 style={{ textAlign: "center", color: "green" }}>Income</h3>
        <PieChart width={300} height={300}>
          <Pie
            data={incomeChart}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {incomeChart.map((entry, index) => (
              <Cell key={`cell-income-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div>
        <h3 style={{ textAlign: "center", color: "red" }}>Expense</h3>
        <PieChart width={300} height={300}>
          <Pie
            data={expenseChart}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {expenseChart.map((entry, index) => (
              <Cell key={`cell-expense-${index}`} fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      
      <div>
        <h3 style={{ textAlign: "center", color: "blue" }}>Total sum left</h3>
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-expense-${index}`}
               fill={BALANCE_COLORS[index % BALANCE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      <button type="button" onClick={handleNavigate} >new transactions</button>
    </div>

    
  );
};

export default TransactionList;
