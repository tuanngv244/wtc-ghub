import { ETag } from "./common";

export interface IGame {
  name: string;
  url: string;
  minPlayers: number;
  maxPlayers: number;
  minTimes: number;
  maxTimes: number;
  years: number;
  types: string[];
  description: string;
  tag?: ETag;
  providers: {
    name: string;
    url: string;
    rank?: number;
    id: number;
  }[];
}
