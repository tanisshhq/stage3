'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Transaction } from '@/types/Transaction';
import { Budget } from '@/types/Budget';

interface Props {
  transactions: Transaction[];
  budgets: Budget[];
}

export default function BudgetComparisonChart({ transactions, budgets }: Props) {
  const data = budgets.map((budget) => {
    const actual = transactions
      .filter((tx) => tx.category === budget.category)
      .reduce((sum, tx) => sum + tx.amount, 0);

    return {
      category: budget.category,
      Budget: budget.amount,
      Spent: actual,
    };
  });

  return (
    <Card>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Budget" fill="#8884d8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Spent" fill="#f97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
