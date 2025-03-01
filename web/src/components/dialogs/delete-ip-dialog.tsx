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
import { IPAddress } from "@lib/types/ip-address";
import { PropsWithChildren } from "react";

type DeleteIPDialogProps = PropsWithChildren & {
  item: IPAddress;
};

function DeleteIPDialog({ children, item }: DeleteIPDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete IP Address</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this record?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <DialogDescription>
            Address: <span className="font-bold text-primary">{item.ip}</span>
          </DialogDescription>
          <DialogDescription>
            Label: <span className="font-bold text-primary">{item.label}</span>
          </DialogDescription>
          <DialogDescription>
            Comment:{" "}
            <span className="font-bold text-primary">{item.comment}</span>
          </DialogDescription>
        </div>
        <DialogDescription className="mt-3">
          This process cannot be undone.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" size="sm">
              Close
            </Button>
          </DialogClose>
          <Button size="sm">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteIPDialog;
