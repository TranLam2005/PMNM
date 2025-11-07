export function StatCard({ title, value, sub, icon: Icon }: { title: string; value: number | undefined; sub: string; icon: React.ElementType }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm w-full">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-600">{title}</p>
        <div className="rounded-xl bg-slate-100 p-2"><Icon className="h-4 w-4 text-slate-600" /></div>
      </div>
      <p className="mt-4 text-3xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{sub}</p>
    </div>
  );
}