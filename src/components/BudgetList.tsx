'use client';

export default function BudgetList() {
  const dummyBudgets = [
    { category: 'Food', amount: 3000 },
    { category: 'Transport', amount: 1500 },
    { category: 'Entertainment', amount: 2000 },
  ];

  return (
    <div className="space-y-2 mt-4">
      {dummyBudgets.map((b, i) => (
        <div key={i} className="flex justify-between p-2 border rounded">
          <span>{b.category}</span>
          <span>₹{b.amount}</span>
        </div>
      ))}
    </div>
  );
}
