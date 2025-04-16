'use client';

type Props = {
  transactions: { category: string; amount: number; date: string }[];
  budgets: { category: string; amount: number }[];
};

export default function SpendingInsights({ transactions, budgets }: Props) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonthTx = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
  });

  const totalSpent = thisMonthTx.reduce((sum, tx) => sum + tx.amount, 0);

  const categoryTotals = thisMonthTx.reduce((acc: Record<string, number>, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  const highestCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const remaining = totalBudget - totalSpent;

  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow space-y-2 mt-4">
      <h2 className="text-lg font-semibold mb-2">Spending Insights</h2>
      <p><strong>Total Spent This Month:</strong> ₹{totalSpent}</p>
      <p><strong>Highest Spending Category:</strong> {highestCategory?.[0] || 'N/A'} (₹{highestCategory?.[1] || 0})</p>
      <p><strong>Remaining Budget:</strong> ₹{remaining >= 0 ? remaining : 0}</p>
    </div>
  );
}
