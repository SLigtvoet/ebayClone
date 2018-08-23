import {CREATE_COMMENT, FETCH_COMMENTS} from '../actions/comments'

export default (state = [], action) => {
  switch (action.type) {
    case CREATE_COMMENT:
        return {...state,
        [action.payload.commentsPayload.id]: action.payload.commentsPayload}

    case FETCH_COMMENTS:
          return action.payload

    default:
      return state
  }
}