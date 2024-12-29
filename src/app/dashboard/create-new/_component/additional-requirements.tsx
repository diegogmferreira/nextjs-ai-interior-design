import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  onInputAdditionalRequirements: (value: string) => void;
}

export function AdditionalRequirements(props: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor="message">Add additional requirements (Optional)</Label>
      <Textarea 
        id="additional-requirements" 
        name="additional-requirements" 
        placeholder="The design should have...." 
        className="px-4 py-2"
        onChange={(e) => props.onInputAdditionalRequirements(e.target.value)}
      />
    </div>
  )
}