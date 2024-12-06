import { User, Role } from '../types';
import { users as initialUsers, roles as initialRoles } from '../data/mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Local Storage Keys
const STORAGE_KEYS = {
  USERS: 'rbac_users',
  ROLES: 'rbac_roles',
};

class ApiService {
  private users: User[] = [];
  private roles: Role[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
      const storedRoles = localStorage.getItem(STORAGE_KEYS.ROLES);

      this.users = storedUsers ? JSON.parse(storedUsers) : initialUsers;
      this.roles = storedRoles ? JSON.parse(storedRoles) : initialRoles;

      if (!storedUsers) this.saveUsers();
      if (!storedRoles) this.saveRoles();
    } catch (error) {
      console.error('Error loading from storage:', error);
      this.users = [...initialUsers];
      this.roles = [...initialRoles];
    }
  }

  private saveUsers() {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.users));
  }

  private saveRoles() {
    localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(this.roles));
  }

  async getUsers(): Promise<User[]> {
    await delay(500);
    return [...this.users];
  }

  async getUser(id: string): Promise<User | undefined> {
    await delay(300);
    return this.users.find(user => user.id === id);
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    await delay(500);
    const newUser = { ...user, id: Math.random().toString(36).substr(2, 9) };
    this.users.push(newUser);
    this.saveUsers();
    return newUser;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    await delay(500);
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) throw new Error('User not found');
    
    this.users[index] = { ...this.users[index], ...updates };
    this.saveUsers();
    return this.users[index];
  }

  async deleteUser(id: string): Promise<void> {
    await delay(500);
    this.users = this.users.filter(user => user.id !== id);
    this.saveUsers();
  }

  async getRoles(): Promise<Role[]> {
    await delay(500);
    return [...this.roles];
  }

  async getRole(id: string): Promise<Role | undefined> {
    await delay(300);
    return this.roles.find(role => role.id === id);
  }

  async createRole(role: Omit<Role, 'id'>): Promise<Role> {
    await delay(500);
    const newRole = { ...role, id: Math.random().toString(36).substr(2, 9) };
    this.roles.push(newRole);
    this.saveRoles();
    return newRole;
  }

  async updateRole(id: string, updates: Partial<Role>): Promise<Role> {
    await delay(500);
    const index = this.roles.findIndex(role => role.id === id);
    if (index === -1) throw new Error('Role not found');
    
    this.roles[index] = { ...this.roles[index], ...updates };
    this.saveRoles();
    return this.roles[index];
  }

  async deleteRole(id: string): Promise<void> {
    await delay(500);
    this.roles = this.roles.filter(role => role.id !== id);
    this.saveRoles();
  }

  getTotalUsers(): number {
    return this.users.length;
  }

  getTotalActiveUsers(): number {
    return this.users.filter(user => user.status === 'active').length;
  }

  getTotalRoles(): number {
    return this.roles.length;
  }
}

export const api = new ApiService();