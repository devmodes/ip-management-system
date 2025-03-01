import DeleteIPDialog from "@components/dialogs/delete-ip-dialog";
import EditIPDialog from "@components/dialogs/edit-ip-dialog";
import EditIPLabelDialog from "@components/dialogs/edit-ip-label-dialog";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Card, CardHeader, CardTitle } from "@components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
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
  Edit3Icon,
  FileEditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";

type IPAddressCardProps = {
  item: IPAddress;
  toggleDialog: () => void;
};

function IPAddressCard({ item }: IPAddressCardProps) {
  return (
    <Card className="cursor-pointer py-2 bg-zinc-900 hover:border-zinc-600">
      <CardHeader className="px-4">
        <CardTitle className="font-bold tracking-wide flex items-center flex-wrap">
          <HoverCard>
            <HoverCardTrigger asChild>
              <span>{item.ip}</span>
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
          {/* Action Items */}
          <div className="flex items-center space-x-2 ml-auto">
            <EditIPLabelDialog item={item}>
              <Button variant="ghost" size="sm" className="hover:bg-sky-900">
                <Edit3Icon />
              </Button>
            </EditIPLabelDialog>
            <EditIPDialog item={item}>
              <Button variant="ghost" size="sm" className="hover:bg-sky-900">
                <Edit3Icon />
              </Button>
            </EditIPDialog>
            <DeleteIPDialog item={item}>
              <Button variant="ghost" size="sm" className="hover:bg-rose-900">
                <TrashIcon />
              </Button>
            </DeleteIPDialog>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default IPAddressCard;
