export class StorageService {
  constructor(protected Storage: any) {}

  public getItem(key: string): any {
    return this.Storage.getItem(key);
  }

  public setItem(key: string, item: any): void {
    return this.Storage.setItem(key, item);
  }

  public getObj(key: string, safe = true): any {
    try {
      const item = this.getItem(key);
      return JSON.parse(item);
    } catch (e) {
      if (!safe) {
        throw e;
      }
    }
  }

  public setObj(key: string, item: any): void {
    return this.setItem(key, JSON.stringify(item));
  }

  public removeItem(key: string): void {
    this.Storage.removeItem(key);
  }

  public clear(): void {
    this.Storage.clear();
  }
}
