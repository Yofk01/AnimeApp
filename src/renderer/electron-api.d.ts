export {};

declare global {
  interface Window {
    electronApi: {
      anime: {
        getAll: <TResponse>() => Promise<TResponse>;
        getById: <TResponse>(id: number) => Promise<TResponse>;
        create: <TResponse>(data: unknown) => Promise<TResponse>;
        update: <TResponse>(id: number, data: unknown) => Promise<TResponse>;
        delete: <TResponse>(id: number) => Promise<TResponse>;
      };
      genre: {
        getAll: <TResponse>() => Promise<TResponse>;
        create: <TResponse>(data: unknown) => Promise<TResponse>;
        update: <TResponse>(id: number, data: unknown) => Promise<TResponse>;
        delete: <TResponse>(id: number) => Promise<TResponse>;
      };
      studio: {
        getAll: <TResponse>() => Promise<TResponse>;
        create: <TResponse>(data: unknown) => Promise<TResponse>;
        update: <TResponse>(id: number, data: unknown) => Promise<TResponse>;
        delete: <TResponse>(id: number) => Promise<TResponse>;
      };
      stats: {
        getDashboard: <TResponse>() => Promise<TResponse>;
      };
      crud: {
        getAll: <TResponse>(table: string) => Promise<TResponse>;
        getById: <TResponse>(table: string, id: unknown) => Promise<TResponse>;
        create: <TResponse>(table: string, data: unknown) => Promise<TResponse>;
        update: <TResponse>(table: string, id: unknown, data: unknown) => Promise<TResponse>;
        delete: <TResponse>(table: string, id: unknown) => Promise<TResponse>;
      };
    };
  }
}
