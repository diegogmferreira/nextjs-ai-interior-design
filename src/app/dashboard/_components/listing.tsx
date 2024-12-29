'use client'

import { Button } from "@/components/ui/button";
import { db } from "@/config/db";
import { AIGeneratedImage } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { Plus } from "@phosphor-icons/react";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EmptyState } from "./empty-state";
import { ImageListCard } from "./image-list-card";

export type ImageData = {
  id: number;
  roomType: string;
  designType: string;
  additionalRequirements: string | null;
  originalImageUrl: string;
  aiImageUrl: string;
  userEmail: string;
}

export function Listing() {
  const { user } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userImagesList, setUserImagesList] = useState<ImageData[]>([]);

  useEffect(() => {
    async function getUserImagesList() {
      if (!user?.primaryEmailAddress?.emailAddress) {
        return
      };

      const imagesList = await db.select().from(AIGeneratedImage)
        .where(eq(AIGeneratedImage.userEmail, user.primaryEmailAddress?.emailAddress));

      if (imagesList.length === 0) {
        return
      };

      setUserImagesList(imagesList);
    }

    getUserImagesList();
  }, [user])

  return (
    <div className='p-5 flex flex-col gap-8'>
      <div className="flex items-center justify-between">
        <h2 className='text-2xl font-bold'>Hello, {user?.firstName}</h2>

        <Button asChild>
          <Link href={`/dashboard/create-new`}>
            <Plus size={18} />
            New Interior Design
          </Link>
        </Button>
      </div>

      {userImagesList.length === 0
        ? <EmptyState />
        : (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Your AI Interior Designs</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {
                userImagesList.map(imageItem => (
                  <ImageListCard
                    key={imageItem.id}
                    imageData={imageItem}
                  />
                ))
              }
            </div>
          </div>
        )
      }
    </div>
  )
}