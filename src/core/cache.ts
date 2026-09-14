export class Cache<T> {
  private readonly data = new Map<string, T>();
  get(key: string): T | undefined { return this.data.get(key); }
  set(key: string, value: T): void { this.data.set(key, value); }
  has(key: string): boolean { return this.data.has(key); }
  get size(): number { return this.data.size; }
}
