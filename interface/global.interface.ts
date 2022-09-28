export interface TeamInterface {
  name: string;
  playerList: {
    name: string;
    captain: boolean;
    playerNumber: number;
  }[];
}

export interface ScoreInterface {
  teamA: string;
  goalA: number;
  teamB: string;
  goalB: number;
}
export interface MatchTime {
  initialMin: number;
  initialSec: number;
  finalMin: number;
  finalSec: number;
  status?: boolean;
  restart?: boolean;
}
