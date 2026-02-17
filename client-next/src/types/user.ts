export type AuthUser = {
  id: number;
  name: string | null;
  email: string;
  country: {
    code: string;
    name: string
  } | null;
  categories: {
    world: boolean;
    politics: boolean;
    business: boolean;
    entertainment: boolean;
    sports: boolean;
    health: boolean;
    technology: boolean;
    science: boolean;
  } | null;
};

export type AuthAttributes = {
  user: AuthUser|null, 
  isAuthorized: boolean, 
  validating: boolean,
};
