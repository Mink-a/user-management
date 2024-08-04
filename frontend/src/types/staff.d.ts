export {};

declare global {
  interface IStaff {
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
}
