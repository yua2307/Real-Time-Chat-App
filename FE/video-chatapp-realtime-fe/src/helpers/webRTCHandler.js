import store from '../store/store';
import { setLocalStream, setRemoteStreams } from '../store/actions/roomAction';
import { openAlertMessage } from '../store/actions/alertNotificationActions';
import Peer from 'simple-peer';
import { emitPeerData } from '../services/socket';
import { typeAlert } from '../store/constants/alertNotification';
import { showBackDrop } from '../store/actions/alertNotificationActions';

const defaultConstraints = {
  video: true,
  audio: true,
};

const getConfiguration = () => {
  const turnIceServers = null;

  if (turnIceServers) {
    // TODO use TURN server credentials
  } else {
    console.warn('Using only STUN server');
    return {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    };
  }
};

export const getLocalStreamPreview = (onlyAudio = false, callbackFunc) => {
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      callbackFunc();
    })
    .catch((err) => {
      store.dispatch(showBackDrop(false));
      store.dispatch(
        openAlertMessage(
          `Can't get connection to your webcam.
           Please give us permission to access camera and microphone`,
          typeAlert.ERROR
        )
      );
      console.error(err);
    });
};

let peers = {};

export const prepareNewPeerConnection = (connUserSocketId, isStarter) => {
  const localStream = store.getState().room.localStream;

  if (isStarter) {
    console.log('Preparing new connection connection as starter');
  } else {
    console.log('Preparing new connection connection not as starter');
  }

  peers[connUserSocketId] = new Peer({
    initiator: isStarter,
    config: getConfiguration(),
    stream: localStream,
  });

  peers[connUserSocketId].on('signal', (data) => {
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };
    emitPeerData(signalData);
  });

  peers[connUserSocketId].on('stream', (remoteStream) => {
    console.log('remote stream came from ', remoteStream);
    console.log('direct connection has been established');
    remoteStream.connUserSocketId = connUserSocketId;

    addNewRemoteStream(remoteStream);
  });
};

export const handleSignalData = (data) => {
  const { connUserSocketId, signal } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
  }
};

const addNewRemoteStream = (newRemoteStream) => {
  const remoteStreamList = store.getState().room.remoteStreams;
  const newRemoteSteamList = [...remoteStreamList, newRemoteStream];
  store.dispatch(setRemoteStreams(newRemoteSteamList));
};

export const closeAllConnections = () => {
  Object.keys(peers).forEach((key) => {
    if (peers[key]) {
      peers[key].destroy();
      delete peers[key];
    }
  });
};

export const handleUserLeaveRoom = (socketIdUserLeaveRoom) => {
  if (peers[socketIdUserLeaveRoom]) {
    peers[socketIdUserLeaveRoom].destroy();
    delete peers[socketIdUserLeaveRoom];
  }

  const remoteStreams = store.getState().room.remoteStreams;

  const newRemoteStreams = remoteStreams.filter(
    (stream) => stream.connUserSocketId !== socketIdUserLeaveRoom
  );

  store.dispatch(setRemoteStreams(newRemoteStreams));
};

export const switchOutgoingTracks = (stream) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};
