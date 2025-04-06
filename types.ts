export type News = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export type Player = {
  id: string;
  name: string;
  elo: string;
  age: number;
  favoriteChampion: string;
  favoriteFood: string;
};

export type RootStackParamList = {
  Home: undefined;
  News: undefined;
  NewsDetails: { newsId: string };
  Lineup: undefined;
  PlayerDetails: { playerId: string };
  Games: undefined;
  Donate: undefined;
  DonateDetails: { type: 'PIX' | 'Nano' };
  PointsScreen: undefined;
};