import api from '@/lib/axios';
import { route } from '@/services/apiEndpoints';

export const fetchEvents = async ({ queryKey }) => {
  const [_key, { page = 1, limit = 10, filters = {} } = {}] = queryKey;
  const cleanParams = Object.fromEntries(
    Object.entries({
      page,
      limit,
      ...filters,
    }).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ''
    )
  );
  try {
    const res = await api.get(route['getEventsData'], {
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

export const saveEventsDetails = async (payload) => {
  try {
    const res = await api.post(route['saveEventsData'], payload);
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

export const updateEventsDetails = async (payload) => {
  try {
    const res = await api.post(route['updateEventDetails'], payload);
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
