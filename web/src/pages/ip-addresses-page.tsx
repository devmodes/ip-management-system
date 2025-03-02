import CreateIPDialog from "@components/dialogs/create-ip-dialog";
import DeleteIPDialog from "@components/dialogs/delete-ip-dialog";
import EditIPDialog from "@components/dialogs/edit-ip-dialog";
import IPAddressList from "@components/ip-address-list";
import { Button } from "@components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";
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
import { useIpAddressListQuery } from "@store/api/ip-address-api";
import { Edit3Icon, EyeIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TablePagination() {
  return (
    <Pagination className="justify-end flex-1">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function IPAddressesPage() {
  const navigate = useNavigate();
  const { data: ipAddresses, isLoading, isError } = useIpAddressListQuery({});

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError && !ipAddresses) {
    return <div>Something went wrong</div>;
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
              <TablePagination />
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
            {ipAddresses.data.map((item: IPAddress) => (
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

export default IPAddressesPage;
