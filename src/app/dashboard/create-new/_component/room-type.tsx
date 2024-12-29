import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  onChangeSelectRoomType: (value: string) => void;
}

export function RoomType(props: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Label>Select Room type</Label>
      <Select onValueChange={(value) => props.onChangeSelectRoomType(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="bedroom">Bedroom</SelectItem>
          <SelectItem value="living_room">Living room</SelectItem>
          <SelectItem value="kitchen">Kitchen</SelectItem>
          <SelectItem value="dining_room">Dining room</SelectItem>
          <SelectItem value="home_office">Home Office</SelectItem>
          <SelectItem value="bathroom">Bathroom</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}