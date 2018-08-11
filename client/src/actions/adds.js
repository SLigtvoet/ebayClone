import * as request from 'superagent'

const baseUrl = 'http://localhost:4001'

export const FETCHED_DETAILED_ADD = 'FETCHED_DETAILED_ADD'
export const FETCHED_ALL_ADDS = 'FETCHED_ALL_ADDS'
export const CREATE_ADD = "CREATE_ADD"

export const fetchAdd = (addId) => (dispatch) => {
  request
    .get(`${baseUrl}/adds/${addId}`)
    .then(response => dispatch({
      type: FETCHED_DETAILED_ADD,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const fetchAllAdds = () => (dispatch) => {
  request
    .get(`${baseUrl}/adds`)
    .then(response => dispatch ({
        type: FETCHED_ALL_ADDS,
        payload: response.body.adds
    }))
    .catch(err => alert(err))
}

export const createAdd = (add) => (dispatch) => {
  request
    .post(`${baseUrl}/adds`)
    .send(add)
    .then(response => dispatch({
      type: CREATE_ADD,
      payload: response.body
    }))
}