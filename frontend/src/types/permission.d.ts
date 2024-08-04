export {};

declare global {
  interface IPermission {
    permissionId: number;
    name: string;
    label: string;
    flag: boolean;
    createdAt: string;
    updatedAt: string;
  }
}
