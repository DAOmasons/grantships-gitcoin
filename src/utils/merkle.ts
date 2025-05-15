import { Address } from 'viem';
import { API } from './config';

export const getUserProof = async (address: Address) => {
  const res = await fetch(`${API}/api/proof/${address}`, {
    method: 'GET',
    headers: {
      'X-API-Key': import.meta.env.VITE_API_KEY,
    },
  });

  const json = await res.json();

  if (!res.ok && res.status === 404) {
    return [];
  }

  if (!json.success) {
    console.error('Error fetching proof:', json.error);
    return;
  }

  return json.data.proof;
};
