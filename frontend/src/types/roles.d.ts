export {};

declare global {
  interface IRole {
    roleId: number;
    name: string;
    label: string;
    flag: boolean;
    createdAt: string;
    updatedAt: string;
    permissions: Permission[] | number[];
  }

  export interface Permission {
    permissionId: number;
    name: string;
    label: string;
    flag: boolean;
    createdAt: string;
    updatedAt: string;
  }
}
