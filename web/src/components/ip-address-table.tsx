import CreateIPDialog from "@components/dialogs/create-ip-dialog";
import DeleteIPDialog from "@components/dialogs/delete-ip-dialog";
import EditIPDialog from "@components/dialogs/edit-ip-dialog";
import { Button } from "@components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { IPAddress } from "@lib/types/ip-address";
import { Edit3Icon, EyeIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type IPAddressTableProps = {
  items: IPAddress[];
};

function IPAddressTable({ items }: IPAddressTableProps) {
  const navigate = useNavigate();

  if (!items.length) {
    return (
      <div className="w-full h-[85vh] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h2>There are no recorded IP Address yet</h2>
          <CreateIPDialog>
            <Button>Add IP Address</Button>
          </CreateIPDialog>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CreateIPDialog>
        <Button size="sm">New IP Address</Button>
      </CreateIPDialog>
      <div className="mt-5">
        <Table>
          <TableCaption className="text-start">
            <div className="flex items-center justify-between">
              <div className="flex-1">List of recorded IP Address</div>
            </div>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">IP Address</TableHead>
              <TableHead className="text-center">Label</TableHead>
              <TableHead className="text-center">Comment</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">{item.ip}</TableCell>
                <TableCell className="text-center">{item.label}</TableCell>
                <TableCell className="text-center">{item.comment}</TableCell>
                <TableCell className="text-center">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`/app/ip-address/${item.id}`)}
                  >
                    <EyeIcon />
                  </Button>
                  <EditIPDialog item={item}>
                    <Button size="sm" variant="ghost">
                      <Edit3Icon />
                    </Button>
                  </EditIPDialog>
                  <DeleteIPDialog item={item}>
                    <Button size="sm" variant="ghost">
                      <TrashIcon />
                    </Button>
                  </DeleteIPDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default IPAddressTable;
