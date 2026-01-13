import { CheckCircle2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CompletionSummaryProps {
  completed: number;
  total: number;
  isVisible?: boolean;
}

export function CompletionSummary({ completed, total, isVisible = true }: CompletionSummaryProps) {
  const navigate = useNavigate();
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getMessage = () => {
    if (percentage === 100) return { text: "Perfect day!", emoji: "🎉" };
    if (percentage >= 80) return { text: "Almost there!", emoji: "💪" };
    if (percentage >= 50) return { text: "Keep going!", emoji: "🚀" };
    return { text: "You've got this!", emoji: "⭐" };
  };

  const message = getMessage();

  return (
    <div 
      className={`fixed bottom-20 lg:bottom-6 left-3 right-3 sm:left-4 sm:right-4 lg:left-auto lg:right-6 lg:w-[360px] z-40 transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-16'
      }`}
    >
      <div className="glass-card p-2.5 sm:p-3 flex items-center gap-3 shadow-modal">
        {/* Circular Progress */}
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="hsl(var(--background-tertiary))"
              strokeWidth="3"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-small sm:text-body font-semibold text-foreground truncate">
            {completed} of {total} completed ({percentage}%)
          </p>
          <p className="text-tiny sm:text-small text-muted-foreground truncate">
            {message.text} {message.emoji}
          </p>
        </div>

        {/* Add Button */}
        <button
          onClick={() => navigate('/habits/create')}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary hover:bg-primary-hover flex items-center justify-center flex-shrink-0 transition-all duration-200 shadow-glow hover:scale-105 active:scale-95"
          aria-label="Add new habit"
        >
          <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
        </button>
      </div>
    </div>
  );
}
