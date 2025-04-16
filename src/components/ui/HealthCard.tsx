
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HealthCardProps {
  children: ReactNode;
  className?: string;
}

const HealthCard = ({ children, className }: HealthCardProps) => {
  return (
    <div className={cn("health-card p-6", className)}>
      {children}
    </div>
  );
};

export default HealthCard;
