export const configReducer = (state = {}, action) => {
  switch (action.type) {
    case "NAVIGATION_REQUEST":
      return { loading: true };
    case "NAVIGATION_SUCCESS":
      return { loading: false, navigation: action.payload };
    case "NAVIGATION_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
