import { db } from "@/config/db";
import { storage } from "@/config/firebase";
import { AIGeneratedImage } from "@/config/schema";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN
});


export async function POST(request: Request) {
  const { imageUrl, roomType, designType, additionalRequirements, userEmail } = await request.json();

  try {
    const input = {
      image: imageUrl,
      prompt: `A ${roomType} with a ${designType} style interior design, with ${additionalRequirements}`
      // prompt: "A bedroom with a bohemian spirit centered around a relaxed canopy bed complemented by a large macrame wall hanging. An eclectic dresser serves as a unique storage solution while an array of potted plants brings life and color to the room"
    };

    const output = await replicate.run("adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", { input });

    const base64Image = await convertImageToBase64(output);
    const fileName = `${Date.now()}.png`;
    const storageRef = ref(storage, `interior-design/${fileName}`);

    await uploadString(storageRef, base64Image, 'data_url');

    const downloadUrl = await getDownloadURL(storageRef);

    await db.insert(AIGeneratedImage).values({
      roomType: roomType,
      designType: designType,
      additionalRequirements: additionalRequirements,
      originalImageUrl: imageUrl,
      aiImageUrl: downloadUrl,
      userEmail,
    }).returning({ id: AIGeneratedImage.id })

    return NextResponse.json({ result: downloadUrl })
  } catch (error) {
    return NextResponse.json({ error })
  }
}

async function convertImageToBase64(imageUrl: string) {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const base64ImageRaw = Buffer.from(response.data).toString('base64');

  return `data:image/png;base64,${base64ImageRaw}`;
}