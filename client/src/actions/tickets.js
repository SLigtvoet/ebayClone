import * as request from 'superagent'
import {logout} from './users'
import {isExpired} from '../jwt'

const baseUrl = 'http://localhost:4001'

export const FETCH_DETAILED_TICKET = 'FETCH_DETAILED_TICKET'
export const CREATE_TICKET = 'CREATE_TICKET'
export const FETCH_EVENT_TICKETS = 'FETCH_EVENT_TICKETS'
export const EDIT_TICKET = 'EDIT_TICKET'

export const fetchTicket = (ticketId) => (dispatch) => {
    request
      .get(`${baseUrl}/tickets/${ticketId}`)
      .then(response => dispatch({
        type: FETCH_DETAILED_TICKET,
        payload: response.body
      }))
      .catch(err => alert(err))
  }

export const fetchEventTickets = (eventId) => (dispatch) => {
  request
    .get(`${baseUrl}/events/${eventId}/tickets`)
    .then(response => dispatch({
      type: FETCH_EVENT_TICKETS,
      payload: response.body.tickets
    }))
    .catch(err => alert(err))
}

export const createTicket = (eventId, description, price, thumbnail) => (dispatch, getState) => {
  const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt
    if (isExpired(jwt)) return dispatch(logout())
  
    request
      .post(`${baseUrl}/events/${eventId}/tickets`)
      .set("Authorization", `Bearer ${jwt}`)
      .send({description, price, thumbnail})
      .then(response => dispatch({
        type: CREATE_TICKET,
        payload: response.body
      }))
      .catch(err => alert(err))
  }

export const editTicket = (ticketId,  update ) => (dispatch, getState) => {

    const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt
  
    if (isExpired(jwt)) return dispatch(logout())
    request
      .patch(`${baseUrl}/tickets/${ticketId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send( update )
      .then (response => dispatch ({
        type: EDIT_TICKET,
        payload: response.body
      }))
      .catch(err => alert(err))
  }