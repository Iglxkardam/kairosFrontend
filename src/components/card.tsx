import { cn } from "@/lib/cn";

export function Card({
  title,
  action,
  className,
  children,
}: {
  title?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("rounded-3xl border border-line bg-card/70 p-5 backdrop-blur", className)}>
      {title && (
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-display text-base font-bold">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function ViewAll() {
  return <button className="text-xs text-muted">View all</button>;
}
