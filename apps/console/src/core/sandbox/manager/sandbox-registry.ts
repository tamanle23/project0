import type { SandboxRouteHandler } from '../types';

export class SandboxRegistry {
  private static instance: SandboxRegistry;
  private handlers: Map<string, SandboxRouteHandler> = new Map();

  private constructor() {}

  public static getInstance(): SandboxRegistry {
    if (!SandboxRegistry.instance) {
      SandboxRegistry.instance = new SandboxRegistry();
    }
    return SandboxRegistry.instance;
  }

  /**
   * Registers a domain sandbox handler. If a handler with the same ID exists, it is overwritten.
   */
  public register(handler: SandboxRouteHandler): void {
    this.handlers.set(handler.id, handler);
  }

  /**
   * Unregisters a handler by ID.
   */
  public unregister(id: string): boolean {
    return this.handlers.delete(id);
  }

  /**
   * Clears all registered handlers (used in testing).
   */
  public clear(): void {
    this.handlers.clear();
  }

  /**
   * Returns registered handlers sorted by priority (descending).
   */
  public getHandlers(): SandboxRouteHandler[] {
    return Array.from(this.handlers.values()).sort(
      (a, b) => (b.priority ?? 0) - (a.priority ?? 0)
    );
  }

  /**
   * Finds the first handler whose matcher satisfies the request context.
   */
  public findHandler(
    url: string,
    method: string,
    headers: Record<string, string> = {}
  ): { handler: SandboxRouteHandler; context: any } | null {
    let pathname = url;
    let searchParams = new URLSearchParams();

    try {
      // Normalise URL to extract pathname and query parameters
      const parsed = new URL(url, 'http://localhost');
      pathname = parsed.pathname;
      searchParams = parsed.searchParams;
    } catch {
      // url was relative, split on ?
      const parts = url.split('?');
      pathname = parts[0];
      if (parts[1]) {
        searchParams = new URLSearchParams(parts[1]);
      }
    }

    const context = {
      url,
      method: method.toUpperCase(),
      headers,
      pathname,
      searchParams,
    };

    for (const h of this.getHandlers()) {
      if (h.matcher(context)) {
        return { handler: h, context };
      }
    }

    return null;
  }
}

export const sandboxRegistry = SandboxRegistry.getInstance();
