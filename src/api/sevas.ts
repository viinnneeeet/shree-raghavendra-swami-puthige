import api from '@/lib/axios';
import { route } from '@/services/apiEndpoints';

export const fetchSevaDetails = async ({ queryKey }) => {
  const [
    _key,
    { page = 1, limit = 10, filters = {}, search = undefined } = {},
  ] = queryKey;
  const cleanParams = Object.fromEntries(
    Object.entries({
      page,
      limit,
      ...filters,
      search,
    }).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ''
    )
  );
  try {
    const res = await api.get(route['getSevaDetails'], {
      params: cleanParams,
    });
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

export const saveSevaDetails = async (payload) => {
  try {
    const res = await api.post(route['createSevaDetails'], payload);
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

export const updateSevaDetails = async (payload) => {
  try {
    const res = await api.post(route['updateSevaDetails'], payload);
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
