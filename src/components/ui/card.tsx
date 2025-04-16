// components/ui/card.tsx

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`bg-white p-6 rounded-xl shadow-lg ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`h-[300px] ${className}`}>{children}</div>;
  }
  
  