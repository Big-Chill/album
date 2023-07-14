import { getRequest, postRequest, deleteRequest, putRequest } from '../../Utils/api';

export const getAlbums = async () => getRequest('albums');

export const addAlbum = async (payload) => postRequest('albums', payload);

export const updateAlbum = async (payload) => putRequest(`albums/${payload.id}`, payload);

export const deleteAlbum = async (payload) => deleteRequest(`albums/${payload.id}`);
