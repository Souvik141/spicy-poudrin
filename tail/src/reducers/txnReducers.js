export const txnReducer = (state = {}, action) => {
  switch (action.type) {
    case "TXN_LIST_REQUEST":
      return { loading: true };
    case "TXN_LIST_SUCCESS":
      return { loading: false, txnList: action.payload };
    case "TXN_LIST_FAIL":
      return { loading: false, error: action.payload };
    case "TXN_LIST_RESET":
      return {};
    default:
      return state;
  }
};
