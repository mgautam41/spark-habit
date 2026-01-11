import { CheckCircle2 } from 'lucide-react';

interface CompletionSummaryProps {
  completed: number;
  total: number;
}

export function CompletionSummary({ completed, total }: CompletionSummaryProps) {
  const percentage = Math.round((completed / total) * 100);
  const circumference = 2 * Math.PI * 24;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getMessage = () => {
    if (percentage === 100) return { text: "Perfect day!", emoji: "🎉" };
    if (percentage >= 80) return { text: "Almost there!", emoji: "💪" };
    if (percentage >= 50) return { text: "Keep going!", emoji: "🚀" };
    return { text: "You've got this!", emoji: "⭐" };
  };

  const message = getMessage();

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-3 right-3 sm:left-4 sm:right-4 lg:left-auto lg:right-6 lg:w-[360px] z-40">
      <div className="glass-card p-3 sm:p-4 flex items-center gap-3 sm:gap-4 shadow-modal">
        {/* Circular Progress */}
        <div className="relative w-11 h-11 sm:w-14 sm:h-14 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="hsl(var(--background-tertiary))"
              strokeWidth="4"
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-small sm:text-body font-semibold text-foreground truncate">
            {completed} of {total} completed ({percentage}%)
          </p>
          <p className="text-small text-muted-foreground truncate">
            {message.text} {message.emoji}
          </p>
        </div>
      </div>
    </div>
  );
}
