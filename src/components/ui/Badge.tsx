import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "default";

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
    const variants = {
        success: "badge-success",
        warning: "badge-warning",
        danger: "badge-danger",
        info: "badge-info",
        default: "badge bg-surface-100 text-surface-700",
    };

    return (
        <span className={cn(variants[variant], className)}>{children}</span>
    );
}
