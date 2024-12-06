export type Permission = 'create' | 'read' | 'update' | 'delete';

export interface Resource {
  id: string;
  name: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Record<string, Permission[]>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roleId: string;
  status: 'active' | 'inactive';
}