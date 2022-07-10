import { IPreferance } from "../../utils/TypeScript";
import { GET_PREFERANCE, IGetPreferanceType } from "../types/preferanceType";

const inti = {
  user: "",
  country: "",
  language: [],
  interests: [],
  birthday: new Date(),
  theme: "light",
};
const preferanceReducer = (
  state: IPreferance = inti,
  action: IGetPreferanceType
): IPreferance => {
  switch (action.type) {
    case GET_PREFERANCE:
      return action.payload;

    default:
      return state;
  }
};

export default preferanceReducer;
