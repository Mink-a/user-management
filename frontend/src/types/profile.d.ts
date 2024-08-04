export {};

declare global {
  interface IProfile {
    staffId: number;
    code: string;
    name: string;
    email: string;
    mobile: string;
    joinedDate: string;
    depId: number;
    position: string;
    age: number;
    gender: string;
    status: string;
    updatedAt: string;
    createdAt: string;
    createdBy: number;
    updatedBy: number;
    department: IDepartment;
    users: User;
  }

  export interface User {
    userId: number;
    staffId: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    createdBy: number;
    updatedBy: number;
    flag: boolean;
    role: Role[];
  }

  export interface Role {
    roleId: number;
    name: string;
    label: string;
    flag: boolean;
    createdAt: string;
    updatedAt: string;
    permissions: Permission[];
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
