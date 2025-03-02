import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@components/ui/table";
import { formatDate } from "@lib/helpers";
import { useGetIPAddressQuery } from "@store/api/ip-address-api";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function IPAddressPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetIPAddressQuery(id || "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <React.Fragment>
      <div>
        <Button onClick={() => navigate(-1)} variant="link" className="px-0">
          <ArrowLeftIcon />
          Back
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Basic Information</h2>
          <Table>
            <TableBody>
              <TableRow className="border-none">
                <TableCell className="text-muted-foreground font-medium">
                  IP Address:{" "}
                </TableCell>
                <TableCell className="font-bold">{data.data.ip}</TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="text-muted-foreground font-medium">
                  Laebl:{" "}
                </TableCell>
                <TableCell className="font-bold">{data.data.label}</TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="text-muted-foreground font-medium">
                  Comment:{" "}
                </TableCell>
                <TableCell className="font-bold">{data.data.comment}</TableCell>
              </TableRow>
              <TableRow className="border-none">
                <TableCell className="text-muted-foreground font-medium">
                  Creation Date:{" "}
                </TableCell>
                <TableCell className="font-bold">
                  {formatDate(data.data.created_at)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        {/* TODO: Only show this to admins */}
        <div className="flex flex-col gap-4 mt-5 md:mt-0">
          <h2 className="text-lg font-bold">IP History</h2>
          <div className="flex items-start">
            <Badge className="mr-3">{formatDate(data.data.created_at)}</Badge>
            <span>Created Initial IP {data.data.ip} by: Clark Dave</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default IPAddressPage;
