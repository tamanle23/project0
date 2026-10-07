import type { SandboxRouteHandler, SandboxRequest } from '../types';
import { users as initialUsers } from '../../../features/users/data/users';
import { type User } from '../../../features/users/data/schema';

class UsersSandboxRepository {
  private users: User[] = [];

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.users = JSON.parse(JSON.stringify(initialUsers));
  }

  public getAll(): User[] {
    return [...this.users];
  }

  public getById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  public create(user: User): User {
    this.users.unshift(user);
    return user;
  }

  public update(id: string, patch: Partial<User>): User | null {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    this.users[idx] = { ...this.users[idx], ...patch, updatedAt: new Date() };
    return this.users[idx];
  }

  public delete(id: string): boolean {
    const beforeLen = this.users.length;
    this.users = this.users.filter((u) => u.id !== id);
    return this.users.length < beforeLen;
  }
}

export const usersSandboxRepo = new UsersSandboxRepository();

export const usersSandboxHandler: SandboxRouteHandler = {
  id: 'users-sandbox-handler',
  name: 'Users Sandbox Repository',
  description: 'In-memory CRUD mock repository for Users',
  priority: 80,
  matcher: (ctx) => ctx.pathname.startsWith('/api/users'),
  handler: async (req: SandboxRequest, ctx) => {
    const subPath = ctx.pathname.replace(/^\/api\/users/, '');

    // List or Create
    if (subPath === '' || subPath === '/') {
      if (req.method === 'GET') {
        return { status: 200, data: usersSandboxRepo.getAll() };
      }
      if (req.method === 'POST') {
        const created = usersSandboxRepo.create(req.data);
        return { status: 201, data: created };
      }
    }

    // Detail, Update, Delete
    const idMatch = subPath.match(/^\/([^/]+)$/);
    if (idMatch) {
      const id = idMatch[1];
      if (req.method === 'GET') {
        const user = usersSandboxRepo.getById(id);
        if (!user) return { status: 404, data: { message: 'User not found' } };
        return { status: 200, data: user };
      }
      if (req.method === 'PATCH' || req.method === 'PUT') {
        const updated = usersSandboxRepo.update(id, req.data);
        if (!updated) return { status: 404, data: { message: 'User not found' } };
        return { status: 200, data: updated };
      }
      if (req.method === 'DELETE') {
        const deleted = usersSandboxRepo.delete(id);
        return { status: 200, data: { success: deleted } };
      }
    }

    return { status: 404, data: { message: 'Not found' } };
  },
};
