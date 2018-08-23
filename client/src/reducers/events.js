import { FETCHED_ALL_EVENTS, CREATE_EVENT } from "../actions/events";

export default function (state = [], action) {
    switch (action.type) {
      case FETCHED_ALL_EVENTS:
        return action.payload
      
      case CREATE_EVENT:
      return [...state, action.payload]
    
      default:
        return state
    }
  }

