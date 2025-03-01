import CreateIPDialog from "@components/dialogs/create-ip-dialog";
import IPAddressCard from "@components/ip-address-card";
import { Button } from "@components/ui/button";
import { IPAddress } from "@lib/types/ip-address";

type IPAddressListProps = {
  items: IPAddress[];
};

function IPAddressList({ items }: IPAddressListProps) {
  if (!items || items.length === 0) {
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
    <div className="grid grid-cols-1 md:grid-cols-3">
      {/* Render Header controls like create button, filters, search */}
      <div className="flex col-span-full w-full items-center mb-3">
        <CreateIPDialog>
          <Button>New IP Address</Button>
        </CreateIPDialog>
      </div>
      {items.map((item) => (
        <IPAddressCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default IPAddressList;
