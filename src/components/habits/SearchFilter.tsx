import { useState } from 'react';
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Category } from '@/data/mockData';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface FilterState {
  search: string;
  categories: Category[];
  status: ('active' | 'completed' | 'pending' | 'streak')[];
  sortBy: 'name' | 'streak' | 'recent' | 'completion' | 'category';
}

interface SearchFilterProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  resultCount: number;
  totalCount: number;
}

const categories: Category[] = ['Health', 'Learning', 'Mind', 'Fitness', 'Productivity', 'Social'];
const statusOptions = [
  { value: 'active' as const, label: 'Active' },
  { value: 'completed' as const, label: 'Completed Today' },
  { value: 'pending' as const, label: 'Pending Today' },
  { value: 'streak' as const, label: 'On Streak (3+ days)' },
];
const sortOptions = [
  { value: 'name' as const, label: 'Name (A-Z)' },
  { value: 'streak' as const, label: 'Streak (High to Low)' },
  { value: 'recent' as const, label: 'Recently Added' },
  { value: 'completion' as const, label: 'Completion Rate' },
  { value: 'category' as const, label: 'Category' },
];

export function SearchFilter({ filters, onFiltersChange, resultCount, totalCount }: SearchFilterProps) {
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleCategory = (cat: Category) => {
    const newCategories = filters.categories.includes(cat)
      ? filters.categories.filter(c => c !== cat)
      : [...filters.categories, cat];
    updateFilter('categories', newCategories);
  };

  const toggleStatus = (status: 'active' | 'completed' | 'pending' | 'streak') => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    updateFilter('status', newStatus);
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      categories: [],
      status: [],
      sortBy: 'name',
    });
  };

  const hasActiveFilters = filters.search || filters.categories.length > 0 || filters.status.length > 0;

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder="Search habits..."
            className="pl-9 pr-9 bg-background-tertiary border-card-border text-foreground placeholder:text-muted-foreground"
          />
          {filters.search && (
            <button
              onClick={() => updateFilter('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
            showFilters || hasActiveFilters
              ? "bg-primary/10 text-primary"
              : "bg-background-tertiary text-muted-foreground hover:text-foreground"
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {filters.categories.length + filters.status.length + (filters.search ? 1 : 0)}
            </span>
          )}
        </button>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background-tertiary text-muted-foreground hover:text-foreground transition-colors">
              <span className="hidden sm:inline">Sort</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-card border-card-border" align="end">
            <DropdownMenuLabel className="text-muted-foreground">Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-card-border" />
            {sortOptions.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={filters.sortBy === option.value}
                onCheckedChange={() => updateFilter('sortBy', option.value)}
                className="text-foreground"
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="p-4 rounded-xl bg-card border border-card-border space-y-4 animate-fade-in-up">
          {/* Categories */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Categories</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                    filters.categories.includes(cat)
                      ? "bg-primary text-primary-foreground"
                      : "bg-background-tertiary text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Status</label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleStatus(option.value)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                    filters.status.includes(option.value)
                      ? "bg-primary text-primary-foreground"
                      : "bg-background-tertiary text-muted-foreground hover:text-foreground"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Result Count */}
      {hasActiveFilters && (
        <p className="text-sm text-muted-foreground">
          Showing {resultCount} of {totalCount} habits
        </p>
      )}

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
              "{filters.search}"
              <button onClick={() => updateFilter('search', '')} className="hover:text-primary-hover">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.categories.map((cat) => (
            <span
              key={cat}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
            >
              {cat}
              <button onClick={() => toggleCategory(cat)} className="hover:text-primary-hover">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filters.status.map((status) => (
            <span
              key={status}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
            >
              {statusOptions.find(o => o.value === status)?.label}
              <button onClick={() => toggleStatus(status)} className="hover:text-primary-hover">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
