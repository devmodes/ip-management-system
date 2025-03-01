import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Card, CardHeader, CardTitle } from "@components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@components/ui/hover-card";
import { Separator } from "@components/ui/separator";
import { formatDate } from "@lib/helpers";
import { IPAddress } from "@lib/types/ip-address";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {
  DeleteIcon,
  Edit2Icon,
  Edit3Icon,
  EditIcon,
  FileEditIcon,
  MoreHorizontalIcon,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";

type IPAddressListProps = {
  items: IPAddress[];
};

function IPAddressList({ items }: IPAddressListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {items.map((item) => (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Card className="cursor-pointer py-4 bg-zinc-900 hover:border-zinc-600">
              <CardHeader className="px-4">
                <CardTitle className="font-bold tracking-wide flex items-center">
                  <span>{item.ip}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="ml-auto p-1"
                        variant="ghost"
                        size="icon"
                      >
                        <MoreHorizontalIcon size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuItem className="flex items-center p-1 gap-2 cursor-pointer hover:bg-slate-900">
                        <Edit3Icon size={14} />
                        <small>Edit Label</small>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center p-1 gap-2 cursor-pointer hover:bg-slate-900">
                        <FileEditIcon size={14} />
                        <small>Edit Record</small>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center p-1 gap-2 cursor-pointer hover:bg-rose-900">
                        <TrashIcon size={14} />
                        <small>Delete</small>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardTitle>
              </CardHeader>
            </Card>
          </HoverCardTrigger>
          <HoverCardContent align="start" className="w-80">
            <div className="space-5">
              <h4 className="font-bold">{item.label}</h4>
              <Separator className="my-2" />
              <div className="flex items-center justify-between">
                <p>{item.comment}</p>
                <Badge>{formatDate(item.created_at)}</Badge>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}

export default IPAddressList;
