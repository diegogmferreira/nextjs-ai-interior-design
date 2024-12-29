'use client'

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import { useState, type ChangeEvent } from "react";

interface Props {
  onChange: (file: File) => void;
}

export function ImageSelection(props: Props) {
  const [file, setFile] = useState<File | null>(null);

  function onFileSelect(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target?.files) return;

    setFile(e.target.files[0]);
    props.onChange(e.target.files[0]);
  }

  return (
    <div className="flex flex-col gap-4">
      <Label>Select an image for your interior design</Label>
      <div className="flex flex-col gap-4">
        <Label htmlFor="upload-image">
          <div className={cn(
            `flex items-center justify-center border border-dashed border-primary p-4 rounded-xl cursor-pointer hover:shadow`,
            !file && 'p-28 bg-zinc-200'
            )}>
            {!file
              ? <ImageUp size={70} />
              : <Image src={URL.createObjectURL(file)} alt="Uploaded image" width={300} height={300} className="w-[300px] h-[300px] object-contain"/>
            }
          </div>
        </Label>
        <input type="file" id="upload-image" name="input-image" accept="image/*" className="hidden" onChange={onFileSelect} />
      </div>
    </div>
  )
}