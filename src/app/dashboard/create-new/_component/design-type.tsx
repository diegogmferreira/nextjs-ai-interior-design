import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface Props {
  onSelectDesignType: (value: string) => void;
}

const designTypes = [
  { name: 'Modern', image: '/modern.png' },
  { name: 'Classic', image: '/classic.png' },
  { name: 'Contemporary', image: '/contemporary.png' },
  { name: 'Rustic', image: '/rustic.png' },
  { name: 'Industrial', image: '/industrial.png' },
  // { name: 'Traditional', image: '/traditional.png' },
  // { name: 'Desert', image: '/desert.png' },
  { name: 'Vintage', image: '/vintage.png' },
  { name: 'Coastal Beach', image: '/coastal-beach.png' },
  { name: 'French', image: '/french.png' },
  { name: 'Mediterranean', image: '/mediterranean.png' },
  { name: 'Californian', image: '/californian.png' },
  { name: 'Farm house', image: '/farm-house.png' },
  { name: 'Japonese', image: '/oriental.png' },
]

export function DesignType(props: Props) {
  const [selectedDesignType, setSelectedDesignType] = useState<string>(designTypes[0].name);

  return (
    <div className="flex flex-col gap-4">
      <Label>Select interior design type</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {designTypes.map(designType => (
          <div
            key={designType.name}
            className="flex flex-col gap-2"
            onClick={() => {
              setSelectedDesignType(designType.name)
              props.onSelectDesignType(designType.name)
            }}
          >
            <Image
              src={designType.image}
              alt={designType.name}
              width={128}
              height={128}
              className={cn(
                "object-cover h-20 rounded-md hover:scale-105 transition-all cursor-pointer",
                selectedDesignType === designType.name && ' ring-2 ring-primary p-1'
              )}
            />
            <p className="text-sm text-zinc-500">{designType.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}