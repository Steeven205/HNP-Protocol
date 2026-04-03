type Status = "confirmed" | "in_progress" | "escalated" | "timeout";

const statusConfig: Record<Status, { label: string; className: string }> = {
  confirmed: { label: "Confirmed", className: "badge-confirmed" },
  in_progress: { label: "In Progress", className: "badge-progress" },
  escalated: { label: "Escalated", className: "badge-escalated" },
  timeout: { label: "Timeout", className: "badge-timeout" },
};

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
