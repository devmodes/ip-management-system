import IPAddressList from "@components/ip-address-list";
import { useIpAddressListQuery } from "@store/api/ip-address-api";

function IPAddressPage() {
  const { data: ipAddresses, isLoading, isError } = useIpAddressListQuery({});

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError && !ipAddresses) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <IPAddressList items={ipAddresses.data} />
    </div>
  );
}

export default IPAddressPage;
