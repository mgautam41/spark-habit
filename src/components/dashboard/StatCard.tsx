import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  change?: string;
  progress?: number;
  iconBgClass?: string;
  delay?: number;
}

export function StatCard({ 
  icon: Icon, 
  value, 
  label, 
  change, 
  progress,
  iconBgClass = 'bg-primary/20',
  delay = 0 
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState<string | number>(typeof value === 'number' ? 0 : value);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      if (typeof value === 'number') {
        const duration = 800;
        const steps = 20;
        const stepValue = value / steps;
        let current = 0;
        
        const interval = setInterval(() => {
          current += stepValue;
          if (current >= value) {
            setDisplayValue(value);
            clearInterval(interval);
          } else {
            setDisplayValue(Math.round(current));
          }
        }, duration / steps);

        return () => clearInterval(interval);
      } else {
        setDisplayValue(value);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div 
      className={cn(
        "stat-card opacity-0",
        isVisible && "animate-fade-in-up"
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0",
          iconBgClass
        )}>
          <Icon className="w-5 h-5 text-primary" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-h1 text-foreground font-bold leading-none">
            {displayValue}
          </p>
          <p className="text-tiny text-muted-foreground mt-1 uppercase tracking-wider">
            {label}
          </p>
          
          {change && (
            <p className="text-small text-primary mt-2 font-medium">
              {change}
            </p>
          )}

          {typeof progress === 'number' && (
            <div className="mt-3 progress-bar">
              <div 
                className="progress-bar-fill bg-gradient-to-r from-primary to-primary-hover"
                style={{ 
                  width: isVisible ? `${progress}%` : '0%',
                  transitionDelay: `${delay + 300}ms`
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
