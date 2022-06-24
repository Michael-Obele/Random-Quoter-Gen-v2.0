import { bColor } from './Colors';
var quoteArrays = [];

export const initialState = {
  count: 0,
  loading: true,
  text: 'black',
  randNum: Math.floor(Math.random() * bColor.length) + 1,
  Darkmode: false,
  freeQuote: [],
  zenquotes: [],
};
export const Actions = {
  INCREMENT: 'INCREMENT',
  LOADING: 'LOADING',
  RESET: 'RESET',
  RANDOM: 'RANDOM',
  ADDQUOTES: 'ADDQUOTES',
  SWITCHMODE: 'SWITCHMODE',
  MERGEQUOTES: 'MERGEQUOTES',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.INCREMENT:
      return { ...state, count: state.count + action.payload };
    case Actions.RESET:
      return { ...state, count: 0 };
    case Actions.LOADING:
      return { ...state, loading: !state.loading };
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
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

console.log(quoteArrays);
