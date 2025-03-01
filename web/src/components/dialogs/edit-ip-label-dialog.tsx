import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { IPAddress } from "@lib/types/ip-address";
import { PropsWithChildren } from "react";

type EditIPLabelDialogProps = PropsWithChildren & {
  item: IPAddress;
};

function EditIPLabelDialog({ item, children }: EditIPLabelDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item.ip}</DialogTitle>
          <DialogDescription>
            Change the label for this IP Address
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 my-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="label">IP Label</Label>
            <Input defaultValue={item.label} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" size="sm" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button size="sm">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditIPLabelDialog;
