'use client';

import { useEffect, useState } from 'react';
import BudgetForm from '@/components/BudgetForm';
import BudgetList from '@/components/BudgetList';
import BudgetVsActualChart from '@/components/BudgetVsActualChart';
import SpendingInsights from '@/components/SpendingInsights';
import { Transaction } from '@/types/Transaction';
import { Budget } from '@/types/Budget';

export default function BudgetsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const txRes = await fetch('/api/transactions');
      const budgetRes = await fetch('/api/budgets');
      const txData = await txRes.json();
      const budgetData = await budgetRes.json();

      setTransactions(txData);
      setBudgets(budgetData);
    }

    fetchData();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Monthly Budgets</h1>

      {/* Budget Form */}
      <div className="bg-white p-4 rounded-xl shadow">
        <BudgetForm onAdd={handleRefresh} />
      </div>

      {/* Budget List */}
      <div className="bg-white p-4 rounded-xl shadow">
        <BudgetList />
      </div>

      {/* Budget vs Actual Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Budget vs Actual</h2>
        <BudgetVsActualChart transactions={transactions} budgets={budgets} />
      </div>

      {/* Spending Insights */}
      <div className="p-4 bg-yellow-100 rounded-xl text-yellow-800 shadow">
        <SpendingInsights transactions={transactions} budgets={budgets} />
      </div>
    </div>
  );
}
