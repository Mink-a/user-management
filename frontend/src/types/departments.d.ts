export {};

declare global {
  interface IDepartment {
    depId: number;
    name: string;
    label: string;
    flag: boolean;
    createdAt: string;
    updatedAt: string;
  }
}
