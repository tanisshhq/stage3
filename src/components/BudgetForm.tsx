'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function BudgetForm({ onAdd }: { onAdd: () => void }) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!category || !amount) return;

    await fetch('/api/budgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, amount: Number(amount) }),
    });

    setCategory('');
    setAmount('');
    onAdd();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-end">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">Category</label>
        <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Food" />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">Amount</label>
        <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 3000" />
      </div>
      <Button type="submit">Add Budget</Button>
    </form>
  );
}
