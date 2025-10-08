import api from '@/lib/axios';
import { route } from '@/services/apiEndpoints';

export const loginUser = async (payload) => {
  try {
    const res = await api.post(route['login'], payload);
    if (res?.data?.success) {
      return res?.data?.data;
    } else {
      throw res?.data;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
