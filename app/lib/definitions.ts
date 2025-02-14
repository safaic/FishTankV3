export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type FishTable = {
  id: string;
  name: string;
  species: string;
};

export type PeramTable = {
  id: number;
  date: Date;
  peram: "alk" | "mag" | "ca";
  level: number;
};
