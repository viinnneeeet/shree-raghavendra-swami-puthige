import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { queryClient } from './react-query-client';
import { secureStorage } from '@/utils/secureStorage';

const persister = createSyncStoragePersister({
  storage: {
    setItem: secureStorage.set,
    getItem: secureStorage.get,
    removeItem: secureStorage.remove,
  },
  key: 'my-app-query-cache',
  throttleTime: 200, // throttle writes
  serialize: JSON.stringify,
  deserialize: JSON.parse,
});

persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60 * 2,
});
