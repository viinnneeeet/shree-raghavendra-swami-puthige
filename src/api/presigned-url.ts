import api from '@/lib/axios';
import { route } from '@/services/apiEndpoints';

export const handlePresignedUrl = async (payload) => {
  const uploadData = new FormData();

  uploadData.append('file', payload.file);
  uploadData.append('filePath', payload?.filePath);
  try {
    const res = await api.post(route['presignedUrl'], uploadData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res?.data;
  } catch (err) {
    return err;
  }
};
