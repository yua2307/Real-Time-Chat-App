import store from '../store/store';
import {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
  setLocalStream,
  setRemoteStreams,
  setScreenSharingStream,
  setOpenRoomPrivate,
} from '../store/actions/roomAction';
import { showBackDrop } from '../store/actions/alertNotificationActions';
import { createRoom } from '../services/socket';
import * as socketConnection from '../services/socket';
import { getLocalStreamPreview, closeAllConnections } from './webRTCHandler';

export const createNewRoom = () => {
  store.dispatch(showBackDrop(true));

  const sucessCallBack = () => {
    store.dispatch(showBackDrop(false));
    store.dispatch(setOpenRoom(true, true));
    createRoom();
  };
  const onlyAudio = store.getState().room.audioOnly;
  getLocalStreamPreview(onlyAudio, sucessCallBack);
};

export const createNewRoomPrivateWithUser = (friendSocketID) => {
  store.dispatch(showBackDrop(true));

  const sucessCallBack = () => {
    store.dispatch(showBackDrop(false));
    store.dispatch(setOpenRoomPrivate(true, true));
    createRoom(friendSocketID);
  };
  const onlyAudio = store.getState().room.audioOnly;
  getLocalStreamPreview(onlyAudio, sucessCallBack);
};

export const handleEventNewRoomCreated = (data) => {
  const { roomDetails } = data;
  store.dispatch(setRoomDetails(roomDetails));
};

export const handleEventSetActiveRoom = (data) => {
  const { activeRooms } = data;
  if (activeRooms.length > 0) {
    const friends = store.getState().friends.friends;
    const rooms = [];
    const userId = store.getState().auth.userDetails?._id;

    activeRooms.forEach((room) => {
      const isRoomCreatedByMe = room.roomCreator.userId === userId;

      if (isRoomCreatedByMe) {
        rooms.push({ ...room, creatorUsername: 'Me' });
      } else {
        friends.forEach((f) => {
          if (f.id.toString() === room.roomCreator.userId.toString()) {
            rooms.push({ ...room, creatorUsername: f.username });
          }
        });
      }
    });

    store.dispatch(setActiveRooms(rooms));
  } else {
    store.dispatch(setRoomDetails(null));
    store.dispatch(setActiveRooms([]));
    store.dispatch(setOpenRoom(false, false));
    store.dispatch(setOpenRoomPrivate(false, false));
    leaveRoom();
  }
};

export const joinRoom = (roomId) => {
  const sucessCallBack = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(setOpenRoom(false, true));
    socketConnection.joinRoom({ roomId });
  };

  const onlyAudio = store.getState().room.audioOnly;

  getLocalStreamPreview(onlyAudio, sucessCallBack);
};

export const leaveRoom = () => {
  try {
    const roomId = store.getState().room.roomDetails?.roomId;

    // clear all tracking stream
    const localStream = store.getState().room.localStream;
    const sharingStream = store.getState().room.screenSharingStream;

    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      store.dispatch(setLocalStream(null));
    }
    if (sharingStream) {
      sharingStream.getTracks().forEach((track) => track.stop());
      store.dispatch(setScreenSharingStream(null));
    }

    store.dispatch(setRemoteStreams([]));
    closeAllConnections();

    if (roomId) {
      socketConnection.leaveRoom({ roomId });
      store.dispatch(setRoomDetails(null));
      store.dispatch(setOpenRoom(false, false));
      store.dispatch(setOpenRoomPrivate(false, false));
    }
  } catch (error) {
    console.err(error);
  }
};
