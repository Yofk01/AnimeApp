import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronApi', {
  anime: {
    getAll: <TResponse>(): Promise<TResponse> => {
      return ipcRenderer.invoke('anime:getAll') as Promise<TResponse>;
    },
    getById: <TResponse>(id: number): Promise<TResponse> => {
      return ipcRenderer.invoke('anime:getById', { id }) as Promise<TResponse>;
    },
    create: <TResponse>(data: unknown): Promise<TResponse> => {
      return ipcRenderer.invoke('anime:create', data) as Promise<TResponse>;
    },
    update: <TResponse>(id: number, data: unknown): Promise<TResponse> => {
      return ipcRenderer.invoke('anime:update', { id, data }) as Promise<TResponse>;
    },
    delete: <TResponse>(id: number): Promise<TResponse> => {
      return ipcRenderer.invoke('anime:delete', { id }) as Promise<TResponse>;
    }
  },
  genre: {
    getAll: <TResponse>(): Promise<TResponse> => {
      return ipcRenderer.invoke('genre:getAll') as Promise<TResponse>;
    },
    create: <TResponse>(data: unknown): Promise<TResponse> => {
      return ipcRenderer.invoke('genre:create', data) as Promise<TResponse>;
    },
    update: <TResponse>(id: number, data: unknown): Promise<TResponse> => {
      return ipcRenderer.invoke('genre:update', { id, data }) as Promise<TResponse>;
    },
    delete: <TResponse>(id: number): Promise<TResponse> => {
      return ipcRenderer.invoke('genre:delete', { id }) as Promise<TResponse>;
    }
  },
  studio: {
    getAll: <TResponse>(): Promise<TResponse> => {
      return ipcRenderer.invoke('studio:getAll') as Promise<TResponse>;
    },
    create: <TResponse>(data: unknown): Promise<TResponse> => {
      return ipcRenderer.invoke('studio:create', data) as Promise<TResponse>;
    },
    update: <TResponse>(id: number, data: unknown): Promise<TResponse> => {
      return ipcRenderer.invoke('studio:update', { id, data }) as Promise<TResponse>;
    },
    delete: <TResponse>(id: number): Promise<TResponse> => {
      return ipcRenderer.invoke('studio:delete', { id }) as Promise<TResponse>;
    }
  },
  stats: {
    getDashboard: <TResponse>(): Promise<TResponse> => {
      return ipcRenderer.invoke('stats:getDashboard') as Promise<TResponse>;
    }
  },
  crud: {
    getAll: <TResponse>(table: string): Promise<TResponse> => {
      return ipcRenderer.invoke('crud:getAll', table) as Promise<TResponse>;
    },
    getById: <TResponse>(table: string, id: unknown): Promise<TResponse> => {
      return ipcRenderer.invoke('crud:getById', { table, id }) as Promise<TResponse>;
    },
    create: <TResponse>(table: string, data: unknown): Promise<TResponse> => {
      return ipcRenderer.invoke('crud:create', { table, data }) as Promise<TResponse>;
    },
    update: <TResponse>(table: string, id: unknown, data: unknown): Promise<TResponse> => {
      return ipcRenderer.invoke('crud:update', { table, id, data }) as Promise<TResponse>;
    },
    delete: <TResponse>(table: string, id: unknown): Promise<TResponse> => {
      return ipcRenderer.invoke('crud:delete', { table, id }) as Promise<TResponse>;
    }
  }
});
