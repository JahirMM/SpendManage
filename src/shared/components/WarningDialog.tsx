import { AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface WarningDialogProps {
  title: string;
  description: string;
  actionLabel: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAction: () => void;
}

function WarningDialog({
  title,
  description,
  actionLabel,
  open,
  onOpenChange,
  onAction,
}: WarningDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#FFECEC]">
        <AlertDialogHeader className="gap-3">
          {/* Ícono + título */}
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertDialogTitle className="text-red-600">
              {title}
            </AlertDialogTitle>
          </div>

          <AlertDialogDescription className="font-semibold text-black">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-muted">
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onAction}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default WarningDialog;
