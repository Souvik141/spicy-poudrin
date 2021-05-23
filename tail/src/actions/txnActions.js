import axios from 'axios'

export const listTxns = () => async (
  dispatch
) => {
  try {
    dispatch({ type: 'TXN_LIST_REQUEST' })

    const { data } = await axios.get(
      `/api/txn/txnList`
    )
    dispatch({
      type: 'TXN_LIST_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'TXN_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}