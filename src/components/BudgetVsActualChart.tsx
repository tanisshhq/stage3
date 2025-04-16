'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
  transactions: { category: string; amount: number }[];
  budgets: { category: string; amount: number }[];
};

export default function BudgetVsActualChart({ transactions, budgets }: Props) {
  const data = budgets.map((b) => {
    const totalSpent = transactions
      .filter((t) => t.category === b.category)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      category: b.category,
      budgeted: b.amount,
      spent: totalSpent,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="budgeted" fill="#8884d8" />
        <Bar dataKey="spent" fill="#f87171" />
      </BarChart>
    </ResponsiveContainer>
  );
}
