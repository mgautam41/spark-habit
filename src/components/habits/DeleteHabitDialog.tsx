import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Archive, Trash2, AlertTriangle } from 'lucide-react';

interface DeleteHabitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  habitName: string;
  onArchive: () => void;
  onDelete: () => void;
}

export function DeleteHabitDialog({
  open,
  onOpenChange,
  habitName,
  onArchive,
  onDelete,
}: DeleteHabitDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-card border-card-border max-w-md">
        <AlertDialogHeader>
          <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-2">
            <AlertTriangle className="w-6 h-6 text-danger" />
          </div>
          <AlertDialogTitle className="text-center text-foreground">
            Remove "{habitName}"?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground">
            This will remove the habit from your active list. You can archive it to keep your history, or delete it permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="space-y-3 pt-2">
          <button
            onClick={() => {
              onArchive();
              onOpenChange(false);
            }}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-background-tertiary hover:bg-muted transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Archive className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Archive (Recommended)</p>
              <p className="text-sm text-muted-foreground">Keep your history, restore anytime</p>
            </div>
          </button>
          
          <button
            onClick={() => {
              onDelete();
              onOpenChange(false);
            }}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-danger/5 hover:bg-danger/10 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-danger/10 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-danger" />
            </div>
            <div>
              <p className="font-medium text-danger">Delete Forever</p>
              <p className="text-sm text-muted-foreground">This will delete all history</p>
            </div>
          </button>
        </div>
        
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="w-full bg-background-tertiary border-card-border text-foreground hover:bg-muted">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
