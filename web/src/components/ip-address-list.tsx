import IPAddressCard from "@components/ip-address-card";
import { IPAddress } from "@lib/types/ip-address";
import { useState } from "react";

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
