import IPAddressCard from "@components/ip-address-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { IPAddress } from "@lib/types/ip-address";
import { useMemo, useState } from "react";

type IPAddressListProps = {
  items: IPAddress[];
};

function IPAddressList({ items }: IPAddressListProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen(isOpen);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {items.map((item) => (
        <IPAddressCard key={item.id} item={item} toggleDialog={toggleDialog} />
      ))}
    </div>
  );
}

export default IPAddressList;
