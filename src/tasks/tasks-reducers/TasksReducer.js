import {
  GET_TASKS_LIST,
  GET_TASKS_LIST_FAILED,
  GET_TASK,
  GET_TASK_FAILED,
} from '../../config/ActionTypes';

const INITIAL_STATE = { 
  tasksList: [],
  task: null
};

export default (state = INITIAL_STATE, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_TASKS_LIST_FAILED: return { ...state };
    case GET_TASKS_LIST: return { ...state, 
      tasksList: payload.tasksList
    };
    case GET_TASK_FAILED: return { ...state };
    case GET_TASK: return { ...state, 
      tasksList: payload.tasksList
    };
    default:
    return state;
  }
}