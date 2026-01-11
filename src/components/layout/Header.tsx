import { Bell, Calendar as CalendarIcon } from 'lucide-react';
import { getRandomQuote } from '@/data/mockData';
import { format } from 'date-fns';

export function Header() {
  const today = new Date();
  const quote = getRandomQuote();

  return (
    <header className="h-14 sm:h-16 lg:h-18 bg-background-secondary/80 backdrop-blur-xl border-b border-card-border sticky top-0 z-40">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between max-w-[1200px] mx-auto gap-4">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-2 flex-shrink-0">
          <span className="text-lg sm:text-h3 font-bold text-foreground">FocusFlow</span>
        </div>

        {/* Quote - Desktop */}
        <div className="hidden lg:block flex-1 min-w-0">
          <p className="text-body italic text-muted-foreground truncate">"{quote}"</p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Date */}
          <div className="hidden sm:flex items-center gap-2 text-small sm:text-body text-muted-foreground">
            <CalendarIcon className="w-4 h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">{format(today, 'EEE, MMM d')}</span>
          </div>

          {/* Notification Bell */}
          <button className="relative p-2 rounded-lg hover:bg-background-tertiary transition-colors touch-manipulation">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
          </button>

          {/* Avatar - Desktop */}
          <div className="hidden lg:flex w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-foreground">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
}
