import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { queryClient } from './react-query-client';

const persister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'my-app-query-cache',
  throttleTime: 200, // throttle writes
  serialize: JSON.stringify,
  deserialize: JSON.parse,
});

persistQueryClient({
  queryClient,
  persister,
});
