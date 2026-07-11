export function Input({ label, type = "text", placeholder, value, onChange, icon }: {
  label?: string; type?: string; placeholder?: string; value?: string;
  onChange?: (v: string) => void; icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-semibold text-foreground">{label}</label>}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          className={`w-full rounded-xl border border-border bg-input-background py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition ${icon ? "pl-10 pr-4" : "px-4"}`}
        />
      </div>
    </div>
  );
}
