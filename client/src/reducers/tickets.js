import { CREATE_TICKET, FETCH_DETAILED_TICKET, FETCH_EVENT_TICKETS, EDIT_TICKET } from "../actions/tickets";

export default function (state = [], action) {
    switch (action.type) {
      case FETCH_DETAILED_TICKET:
        return action.payload
              
      case CREATE_TICKET:
      return {...state, 
        [action.payload.ticketPayload.id]: action.payload.ticketPayload
      }
      case FETCH_EVENT_TICKETS:
        return action.payload

      case EDIT_TICKET: 
      return action.payload
    
      default:
        return state
    }
  }

