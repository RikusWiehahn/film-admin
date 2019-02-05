import axios from 'axios';
import { SERVER } from '../../config/Keys';
import {
  GET_TEAM_INFO,
  GET_TEAM_INFO_FAILED,
  GET_STAFF_MEMBER_INFO,
  GET_STAFF_MEMBER_INFO_FAILED
} from '../../config/ActionTypes';

export const getTeamInfo = ({ token }, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${SERVER}/v1/get-team-info`,
        method: 'post',
        headers: {'X-Requested-With': 'XMLHttpRequest', authorization: token, },
        data: null 
      });
      dispatch({ type: GET_TEAM_INFO, payload: data });
      callback({ failed: false, message: null });
    } catch (e) {
      console.log(e);
      dispatch({ type: GET_TEAM_INFO_FAILED });
      callback({ failed: true, message: e.message });
    }
  }
}

export const getStaffMemberInfo = ({ token }, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: `${SERVER}/v1/get-staff-member-info`,
        method: 'post',
        headers: {'X-Requested-With': 'XMLHttpRequest', authorization: token, },
        data: null 
      });
      
      dispatch({ type: GET_STAFF_MEMBER_INFO, payload: data });
      callback();
    } catch (e) {
      console.log(e);
      dispatch({ type: GET_STAFF_MEMBER_INFO_FAILED });
      callback();
    }
  }
}