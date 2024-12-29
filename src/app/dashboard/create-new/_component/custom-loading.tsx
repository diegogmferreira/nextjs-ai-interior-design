import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@phosphor-icons/react";

interface IProps {
  isLoading: boolean;
}

export function CustomLoading({ isLoading }: IProps) {
  return (
    <AlertDialog open={isLoading}>
      <AlertDialogContent>
        <div className="bg-white flex flex-col items-center justify-center">
          <Spinner className="w-28 h-28 text-primary animate-spin" />
          <p className="text-lg font-semibold">Generating your AI image, do not refresh the page</p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}