import { IpAddress } from "@prisma/client";
import config from "@utils/config";
import { User } from "src/types/User";

export class IPAddressPolicy {
  static canCreate(user: User): boolean {
    const { permissions } = user;

    return permissions.includes(config("app.create_ip"));
  }

  static canView(user: User): boolean {
    const { permissions } = user;

    return permissions.includes(config("app.read_ip"));
  }

  static canUpdate(user: User, record: IpAddress): boolean {
    const { id, permissions } = user;

    return (
      permissions.includes(config("app.update_ip")) || id === record.created_by
    );
  }

  static canDelete(user: User): boolean {
    const { permissions } = user;

    return permissions.includes(config("app.delete_ip"));
  }
}
