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

type EditIPDialogProps = PropsWithChildren & {
  item: IPAddress;
};

function EditIPDialog({ item, children }: EditIPDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item.ip}</DialogTitle>
          <DialogDescription>Modify this IP Address Record</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 my-2">
          <div className="grid my-1 gap-2">
            <Label htmlFor="ip">IP Address</Label>
            <Input defaultValue={item.ip} />
          </div>
          <div className="grid my-1 gap-2">
            <Label htmlFor="label">Label</Label>
            <Input defaultValue={item.label} />
          </div>
          <div className="grid my-1 gap-2">
            <Label htmlFor="comment">Comment</Label>
            <Input defaultValue={item.comment} />
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

export default EditIPDialog;
