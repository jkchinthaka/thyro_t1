export function Card({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`bg-card rounded-2xl shadow-sm border border-border p-5 ${className}`} style={style}>
      {children}
    </div>
  );
}
