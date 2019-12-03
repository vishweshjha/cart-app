const defaultState = {
  isToastActive: false,
  toastMessage: '',
};

export default function toastReducer(state = defaultState, action) {
  switch (action.type) {
    case 'TOAST':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
