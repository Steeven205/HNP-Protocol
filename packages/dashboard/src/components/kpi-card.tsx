interface KpiCardProps {
  title: string;
  value: string;
  icon: string;
  trend?: string;
  trendUp?: boolean;
}

export function KpiCard({ title, value, icon, trend, trendUp }: KpiCardProps) {
  return (
    <div className="bg-white p-6 rounded-[16px] border border-slate-200 shadow-soft">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
          {trend && (
            <p
              className={`mt-1 text-xs font-medium ${
                trendUp ? "text-green-600" : "text-red-500"
              }`}
            >
              {trend}
            </p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
          <i className={icon} />
        </div>
      </div>
    </div>
  );
}
