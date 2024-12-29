import { Button } from "@/components/ui/button";
import { Plus } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import emptyImg from "../../../../public/empty-img.jpeg";

export function EmptyState() {
  return (
    <div className="flex items-center justify-center mt-20 flex-col gap-6">
      <Image src={emptyImg} alt="Empty state" width={200} height={200} />

      <h3 className="font-medium text-xl text-zinc-500">Create a new Ai Interior Design for you room</h3>

      <Button asChild>
        <Link href={`/dashboard/create-new`}>
          <Plus size={18} />
          New Interior Design
        </Link>
      </Button>
    </div>
  )
}