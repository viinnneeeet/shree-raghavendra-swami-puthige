import api from '@/lib/axios';
import { route } from '@/services/apiEndpoints';

export const fetchGallery = async () => {
  try {
    const res = await api.get(route['getGalleryData']);
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

export const saveGalleryDetails = async (payload) => {
  try {
    const res = await api.post(route['saveGalleryData'], payload);
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

export const updateGalleryDetails = async (payload) => {
  try {
    const res = await api.post(route['updateGalleryDetails'], payload);
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
