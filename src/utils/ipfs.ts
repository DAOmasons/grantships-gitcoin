import { IpfsJsonStore } from './localForage';

export type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

export const PRIVATE_GATEWAY =
  'https://plum-genetic-marlin-657.mypinata.cloud/ipfs/';

export const getGatewayUrl = (cid: string) => {
  return `${PRIVATE_GATEWAY}${cid}?pinataGatewayToken=${import.meta.env.VITE_GATEWAY_KEY}`;
};

export const pinJSONToIPFS = async (content: Json) => {
  const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_PINATA_API_KEY}`, // Replace [TOKEN] with your actual token
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  });
  return await res.json();
};

export const getJsonFromGateway = async (cid: string) => {
  const res = await fetch(getGatewayUrl(cid));
  const data = await res.json();
  return data;
};

export const getIpfsJson = async (cid: string) => {
  // Check storage first
  try {
    const dataFromStorage = await IpfsJsonStore.get(cid);
    if (dataFromStorage) {
      return dataFromStorage;
    } else {
      const dataFromGateway = await getJsonFromGateway(cid);
      await IpfsJsonStore.set(cid, dataFromGateway);
      return dataFromGateway;
    }
  } catch (error) {
    console.error('Error fetching ipfs data', error);
  }
  // If not found, fetch from gateway
};
