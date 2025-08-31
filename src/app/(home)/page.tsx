import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="p-4 space-y-4">
      <div>
        <p className="text-rose-500">
          Hello World
        </p>
      </div>
      <div>
        <Button variant="elevated">
          Click Me!
        </Button>
      </div>
      <div>
        <Input placeholder="Input Here!"/>
      </div>
      <div>
        <Progress value={50} />
      </div>
      <div>
        <Textarea placeholder="Type Here!" />
      </div>
    </div>
  );
}
