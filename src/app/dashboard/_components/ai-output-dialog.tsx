import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

interface IProps {
  isOpen: boolean;
  inputImage: string;
  outputImage: string;
  onClose: () => void;
}

export function AIOutputDialog({ isOpen, onClose, inputImage, outputImage }: IProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>

        <ReactBeforeSliderComponent
          firstImage={{
            imageUrl: inputImage
          }}
          secondImage={{
            imageUrl: outputImage
          }}
        />

        <Button onClick={onClose}>Close</Button>
      </AlertDialogContent>
    </AlertDialog>

  )
}