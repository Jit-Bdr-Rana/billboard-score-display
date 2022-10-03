export interface TeamInterface {
  name: string;
  playerList: Player[];
}
export interface Player {
  name: string;
  captain?: boolean;
  goalkepper?: boolean;
  extra?: boolean;
  playerNumber: number;
}
export interface ScoreInterface {
  teamA: string;
  goalA: number;
  teamB: string;
  goalB: number;
  tournamentName: string;
}
export interface MatchTime {
  initialMin: number;
  initialSec: number;
  finalMin: number;
  finalSec: number;
  status?: boolean;
  restart?: boolean;
}
export type AdditionalTime = Omit<
  MatchTime,
  "initialMin" | "initialSec" | "restart"
>;

export enum ScreenType {
  scoreAndTimer = "Score And Timer",
  playerList = "PlayerList",
}
