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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors[0].msg || 'Something went wrong.');
  }

  return data;
};

export default api;
