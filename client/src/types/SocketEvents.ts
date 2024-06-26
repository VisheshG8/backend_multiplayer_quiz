export enum SocketEvents {
  CONNECT = 'connect',
  ON_CONNECT = 'on_connect',
  LEAVE_ROOM = 'leave_room',
  NEW_ROOM_AVAILABLE = 'new_room_available',
  ROOM_DELETED = 'room_deleted',
  JOIN_ROOM = 'join_room',
  OPPONENT_JOINED = 'opponent_joined',
  SEND_QUESTIONS = 'send_questions',
  RECEIVE_QUESTIONS = 'receive_questions',
  CLEAN_UP_QUESTIONS = 'clean_up_questions',
  SEND_ANSWER = 'send_answer',
  UPDATE_SCORE_AND_STATE = 'update_score_and_state',
  OPPONENT_UPDATE_STATE = 'opponent_update_state',
  CREATE_ROOM = 'create_room',
}
