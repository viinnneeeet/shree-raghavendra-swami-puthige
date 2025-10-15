import api from '@/lib/axios';
import { route } from '@/services/apiEndpoints';

export const fetchContactDetails = async ({ queryKey }) => {
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
    const res = await api.get(route['getContactUsLists'], {
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

export const submitContactDetails = async (payload) => {
  try {
    const res = await api.post(route['contactUsSubmit'], payload);
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

export const replyContact = async (payload) => {
  try {
    const res = await api.post(route['replyContact'], payload);
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
