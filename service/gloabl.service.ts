import { MatchTime, ScoreInterface } from "../interface/global.interface";

const saveTeamAndScore = (team: ScoreInterface) => {
  localStorage.setItem("vsTeam", JSON.stringify(team));
};

const saveTime = (time: MatchTime) => {
  console.log(time);
  localStorage.setItem("matchTime", JSON.stringify(time));
};
const removeTime = () => {
  localStorage.removeItem("matchTime");
};
const removeTeamAndScore = () => {
  localStorage.removeItem("vsTeam");
};
export { saveTeamAndScore, saveTime, removeTime, removeTeamAndScore };
