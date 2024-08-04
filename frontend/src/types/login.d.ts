export {};

declare global {
  interface IUser {
    userId: number;
    staffId: number;
    name: string;
    email: string;
    hashedPassword: string;
    createdAt: string;
    updatedAt: string;
    createdBy: number;
    updatedBy: number;
    flag: boolean;
    staff: Staff;
    role: Role[];
  }

  export interface Staff {
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
