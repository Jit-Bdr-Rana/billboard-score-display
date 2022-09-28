import {
  AdditionalTime,
  MatchTime,
  ScoreInterface,
} from "../interface/global.interface";

const saveTeamAndScore = (team: ScoreInterface) => {
  localStorage.setItem("vsTeam", JSON.stringify(team));
};

const saveTime = (time: MatchTime) => {
  localStorage.setItem("matchTime", JSON.stringify(time));
};
const getTime = () => {
  return JSON.parse(localStorage.getItem("matchTime") as string);
};

const saveAdditionlTime = (time: AdditionalTime) => {
  localStorage.setItem("additionalMatchTime", JSON.stringify(time));
};
const getAdditinalTime = (): AdditionalTime => {
  return JSON.parse(
    localStorage.getItem("additionalMatchTime") as string
  ) as AdditionalTime;
};

const removeTime = () => {
  localStorage.removeItem("matchTime");
};
const removeTeamAndScore = () => {
  localStorage.removeItem("vsTeam");
};
const removeAdditionlTime = () => {
  localStorage.removeItem("additionalMatchTime");
};
export {
  saveTeamAndScore,
  saveTime,
  getTime,
  removeTime,
  removeTeamAndScore,
  saveAdditionlTime,
  removeAdditionlTime,
  getAdditinalTime,
};
