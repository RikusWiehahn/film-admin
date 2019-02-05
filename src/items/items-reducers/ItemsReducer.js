import {
  GET_ITEMS_LIST,
  GET_ITEMS_LIST_FAILED,
  GET_ITEM,
  GET_ITEM_FAILED
} from '../../config/ActionTypes';

const INITIAL_STATE = { 
  itemsList: [],
  item: null
};

export default (state = INITIAL_STATE, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_ITEMS_LIST_FAILED: return { ...state };
    case GET_ITEMS_LIST: return { ...state, 
      itemsList: payload.itemsList
    };
    case GET_ITEM_FAILED: return { ...state };
    case GET_ITEM: return { ...state, 
      itemsList: payload.itemsList
    };
    default:
    return state;
  }
}