type ApiProps = {
  path: string;
  options?: RequestInit;
};

const API_URL = import.meta.env.VITE_API_URL;

const api = async <T>({ path, options }: ApiProps): Promise<T> => {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    ...options,
  });

  if (!response.ok) {
    throw new Error('Something went wrong.');
  }

  return await response.json();
};

export default api;
