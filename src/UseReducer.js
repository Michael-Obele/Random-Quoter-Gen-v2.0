import { LightColors, DarkColors } from './Colors';

export const initialState = {
  count: 0,
  loading: true,
  text: 'black',
  randNum: Math.floor(Math.random() * LightColors.length),
  Darkmode: false,
  Authors: [],
  freeQuote: [],
  zenquotes: [],
  display: false,
  Search: false,
};
export const Actions = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  LOADING: 'LOADING',
  RESET: 'RESET',
  RANDOM: 'RANDOM',
  ADDQUOTES: 'ADDQUOTES',
  SWITCHMODE: 'SWITCHMODE',
  MERGEQUOTES: 'MERGEQUOTES',
  SETAUTHORS: 'SETAUTHORS',
  DISPLAY: 'DISPLAY',
  SEARCH_QUOTES: 'SEARCH_QUOTES',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.INCREMENT:
      return { ...state, count: state.count + action.payload };
    case Actions.DECREMENT:
      return { ...state, count: state.count - action.payload };
    case Actions.RESET:
      return { ...state, count: 0 };
    case Actions.LOADING:
      return { ...state, loading: false };
    case Actions.RANDOM:
      return { ...state, randNum: action.payload };
    case Actions.SWITCHMODE:
      return {
        ...state,
        Darkmode: !state.Darkmode,
        text: state.Darkmode ? 'black' : 'white',
      };
    case Actions.ADDQUOTES:
      return { ...state, [action.name]: action.payload };
    case Actions.SETAUTHORS:
      return { ...state, Authors: state.Authors.concat(action.payload) };
    case Actions.DISPLAY:
      return { ...state, display: true };
    case Actions.SEARCH_QUOTES:
      return { ...state, Search: true };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
