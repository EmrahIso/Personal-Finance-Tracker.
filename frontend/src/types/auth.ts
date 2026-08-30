type RegisterData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginData = {
  email: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export { type RegisterData, type LoginData, type User };
