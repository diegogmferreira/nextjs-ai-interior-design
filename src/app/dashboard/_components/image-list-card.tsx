import { useState } from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import { AIOutputDialog } from './ai-output-dialog';
import type { ImageData } from "./listing";

interface IProps {
  imageData: ImageData
}

export function ImageListCard({ imageData }: IProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 shadow-md rounded-md" onClick={() => setIsDialogOpen(true)}>
        <ReactBeforeSliderComponent
          firstImage={{
            imageUrl: imageData.aiImageUrl
          }}
          secondImage={{
            imageUrl: imageData.originalImageUrl
          }}
        />

        <div className='flex flex-col gap-2 p-2'>
          <p>Room Type: {imageData.roomType}</p>
          <p>Design Type: {imageData.designType}</p>
        </div>

      </div>

      {isDialogOpen &&
        <AIOutputDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          inputImage={imageData.originalImageUrl}
          outputImage={imageData.aiImageUrl}
        />
      }
    </>
  )
}