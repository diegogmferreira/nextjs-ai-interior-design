/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from "@/components/ui/button";
import { storage } from "@/config/firebase";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { AIOutputDialog } from "../_components/ai-output-dialog";
import { AdditionalRequirements } from "./_component/additional-requirements";
import { CustomLoading } from "./_component/custom-loading";
import { DesignType } from "./_component/design-type";
import { ImageSelection } from "./_component/image-selection";
import { RoomType } from "./_component/room-type";

type FormData = {
  image: File | null;
  roomType: string | null;
  designType: string | null;
  additionalRequirements: string | null;
}

export default function CreateNew() {
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [isOutputDialogOpen, setIsOutputDialogOpen] = useState(false);
  const [originImage, setOriginImage] = useState<any>();
  const [outputResult, setOutputResult] = useState<any>();
  const [formData, setFormData] = useState<FormData>({
    image: null,
    roomType: null,
    designType: null,
    additionalRequirements: null,
  })

  function handleInputChange(value: File | string, fieldName: string) {
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  }

  async function generateAiImage() {
    setIsLoading(true);
    if (!formData) return;

    const rawImageUrl = await saveImageToDatabase();

    const { data } = await axios.post<{ result: string }>('/api/interior-design', {
      imageUrl: rawImageUrl,
      roomType: formData.roomType,
      designType: formData.designType,
      additionalRequirements: formData.additionalRequirements,
      userEmail: user?.primaryEmailAddress?.emailAddress,
    });

    setIsLoading(false);
    setOutputResult(data.result);
    setIsOutputDialogOpen(true);
    return data;
  }

  async function saveImageToDatabase() {
    if (!formData.image) return;

    const fileName = `${Date.now()}_raw.png`;
    const imageRef = ref(storage, `interior-design/${fileName}`);

    await uploadBytes(imageRef, formData.image)
      .then(() => {
        console.log('Image uploaded successfully');
      });

    const downloadUrl = await getDownloadURL(imageRef);
    setOriginImage(downloadUrl);

    return downloadUrl;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-4xl text-primary text-center">Experience the Magic of AI Interior Design</h2>
        <p className="text-center text-zinc-500">Transform any room into a magical oasis with our AI-powered interior design solution.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-32 justify-center">
          <ImageSelection onChange={(value) => handleInputChange(value, 'image')} />

          <div className="flex flex-col gap-8">
            <RoomType onChangeSelectRoomType={(value) => handleInputChange(value, 'roomType')} />
            <DesignType onSelectDesignType={(value) => handleInputChange(value, 'designType')} />
            <AdditionalRequirements onInputAdditionalRequirements={(value) => handleInputChange(value, 'additionalRequirements')} />

            <div className="pb-24">
              <Button className="w-full" onClick={generateAiImage}>Generate AI Image</Button>
              <span className="text-sm italic text-zinc-500">Note: 1 credit is used to generate the design</span>
            </div>
          </div>
        </div>
      </div>

      {isLoading && <CustomLoading isLoading={isLoading} />}
      {isOutputDialogOpen && 
        <AIOutputDialog 
          isOpen={isOutputDialogOpen}
          onClose={() => setIsOutputDialogOpen(false)}
          inputImage={originImage}
          outputImage={outputResult}
        />}
    </>
  )
}