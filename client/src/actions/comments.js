import * as request from 'superagent'
import {logout} from './users'
import {isExpired} from '../jwt'

const baseUrl = 'http://localhost:4001'

export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const UPDATE_TICKETS_INFO = 'UPDATE_TICKETS_INFO'



export const fetchComments = (ticketId) => (dispatch) => {

    request
        .get(`${baseUrl}/tickets/${ticketId}/comments`)
        .then(response => dispatch({
            type: FETCH_COMMENTS,
            payload: response.body
        }))
        .catch(err => console.error(err))
}

export const createComment = (ticketId, comment) => (dispatch, getState) => {
    const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt
    if (isExpired(jwt)) return dispatch(logout())
   
    request
      .post(`${baseUrl}/tickets/${ticketId}/comments`)
      .set("Authorization", `Bearer ${jwt}`)
      .send( {comment} )
      .then(response => dispatch({
          type: CREATE_COMMENT,
          payload: response.body
      }))
      .catch(err => console.error(err))
  }