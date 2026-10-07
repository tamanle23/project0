import type { SandboxRouteHandler, SandboxRequest } from '../types';
import { tasks as initialTasks } from '../../../features/tasks/data/tasks';
import { type Task } from '../../../features/tasks/data/schema';

class TasksSandboxRepository {
  private tasks: Task[] = [];

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.tasks = JSON.parse(JSON.stringify(initialTasks));
  }

  public getAll(): Task[] {
    return [...this.tasks];
  }

  public getById(id: string): Task | undefined {
    return this.tasks.find((t) => t.id === id);
  }

  public create(task: Task): Task {
    this.tasks.unshift(task);
    return task;
  }

  public update(id: string, patch: Partial<Task>): Task | null {
    const idx = this.tasks.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    this.tasks[idx] = { ...this.tasks[idx], ...patch };
    return this.tasks[idx];
  }

  public delete(id: string): boolean {
    const beforeLen = this.tasks.length;
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return this.tasks.length < beforeLen;
  }
}

export const tasksSandboxRepo = new TasksSandboxRepository();

export const tasksSandboxHandler: SandboxRouteHandler = {
  id: 'tasks-sandbox-handler',
  name: 'Tasks Sandbox Repository',
  description: 'In-memory CRUD mock repository for Tasks',
  priority: 80,
  matcher: (ctx) => ctx.pathname.startsWith('/api/tasks'),
  handler: async (req: SandboxRequest, ctx) => {
    const subPath = ctx.pathname.replace(/^\/api\/tasks/, '');

    // List or Create
    if (subPath === '' || subPath === '/') {
      if (req.method === 'GET') {
        return { status: 200, data: tasksSandboxRepo.getAll() };
      }
      if (req.method === 'POST') {
        const created = tasksSandboxRepo.create(req.data);
        return { status: 201, data: created };
      }
    }

    // Detail, Update, Delete
    const idMatch = subPath.match(/^\/([^/]+)$/);
    if (idMatch) {
      const id = idMatch[1];
      if (req.method === 'GET') {
        const task = tasksSandboxRepo.getById(id);
        if (!task) return { status: 404, data: { message: 'Task not found' } };
        return { status: 200, data: task };
      }
      if (req.method === 'PATCH' || req.method === 'PUT') {
        const updated = tasksSandboxRepo.update(id, req.data);
        if (!updated) return { status: 404, data: { message: 'Task not found' } };
        return { status: 200, data: updated };
      }
      if (req.method === 'DELETE') {
        const deleted = tasksSandboxRepo.delete(id);
        return { status: 200, data: { success: deleted } };
      }
    }

    return { status: 404, data: { message: 'Not found' } };
  },
};
