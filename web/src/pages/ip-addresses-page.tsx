import IPAddressTable from "@components/ip-address-table";
import { useIpAddressListQuery } from "@store/api/ip-address-api";

function IPAddressesPage() {
  const { data, isLoading, isError } = useIpAddressListQuery({});

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError && !data) {
    return <div>Something went wrong</div>;
  }

  return <IPAddressTable items={data?.data || []} />;
}

export default IPAddressesPage;
