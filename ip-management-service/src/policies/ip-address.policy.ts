import { IpAddress } from "@prisma/client";
import { User } from "src/types/User";

export class IPAddressPolicy {
  static canCreate(user: User): boolean {
    const { permissions } = user;

    return permissions.includes("create.ip");
  }

  static canView(user: User): boolean {
    const { permissions } = user;

    return permissions.includes("read.ip");
  }

  static canUpdate(user: User, record: IpAddress): boolean {
    const { id, permissions } = user;

    return permissions.includes("update.ip") || id === record.created_by;
  }

  static canDelete(user: User): boolean {
    const { permissions } = user;

    return permissions.includes("delete.ip");
  }
}
