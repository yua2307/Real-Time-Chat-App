import { roomActions } from '../actions/roomAction';

const initialState = {
  isUserInRoom: false,
  isUserInRoomPrivate: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: null,
  remoteStreams: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
  isUserJoinedWithOnlyAudio: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case roomActions.OPEN_ROOM:
      return {
        ...state,
        isUserInRoom: action.isUserInRoom,
        isUserRoomCreator: action.isUserRoomCreator,
      };
    case roomActions.OPEN_ROOM_PRIVATE:
      return {
        ...state,
        isUserInRoomPrivate: action.isUserInRoomPrivate,
        isUserRoomCreator: action.isUserRoomCreator,
      };

    case roomActions.SET_ROOM_DETAILS:
      return {
        ...state,
        roomDetails: action.roomDetails,
      };
    case roomActions.SET_ACTIVE_ROOMS:
      return {
        ...state,
        activeRooms: action.activeRooms,
      };
    case roomActions.SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.localStream,
      };
    case roomActions.SET_AUDIO_ONLY:
      return {
        ...state,
        audioOnly: action.audioOnly,
      };
    case roomActions.SET_REMOTE_STREAMS:
      return {
        ...state,
        remoteStreams: action.remoteStreamList,
      };
    case roomActions.SET_SCREEN_SHARE_STREAM:
      return {
        ...state,
        screenSharingStream: action.screenSharingStream,
        isScreenSharingActive: action.isScreenSharingActive,
      };

    default:
      return state;
  }
};

export default reducer;
