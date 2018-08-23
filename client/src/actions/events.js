import * as request from 'superagent'
import {logout} from './users'
import {isExpired} from '../jwt'

const baseUrl = 'http://localhost:4001'

export const FETCHED_DETAILED_EVENT = 'FETCHED_DETAILED_EVENT'
export const FETCHED_ALL_EVENTS = 'FETCHED_ALL_EVENTS'
export const CREATE_EVENT = "CREATE_EVENT"


export const fetchEvent = (eventId) => (dispatch) => {
  request
    .get(`${baseUrl}/events/${eventId}`)
    .then(response => dispatch({
      type: FETCHED_DETAILED_EVENT,
      payload: response.body
    }))
    .catch(err => alert(err))
}

export const fetchAllEvents = () => (dispatch) => {
  request
    .get(`${baseUrl}/events`)
    .then(response => dispatch ({
        type: FETCHED_ALL_EVENTS,
        payload: response.body.events
    }))
    .catch(err => alert(err))
}

export const createEvent = (event) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt
  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/events`)
    .set("Authorization", `Bearer ${jwt}`)
    .send(event)
    .then(response => dispatch({
      type: CREATE_EVENT,
      payload: response.body
    }))
}
