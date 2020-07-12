import React, { Component, createRef } from 'react';
import './App.css';
import io from 'socket.io-client';

class App extends Component {
  constructor() {
    super();
    this.localVideo = createRef();
    this.remoteVideo = createRef();
    this.socket = createRef();
    this.startCallButton = createRef();
    this.acceptCallButton = createRef();
    this.endCallButton = createRef();
    this.holdCallButton = createRef();
    this.peerConnection = createRef();
    this.localICECandidates = createRef([]);
    this.connected = createRef(false);
  }

  state = {
    username: '',
    callerName: '',
    users: {},
    localStream: null,
    remoteStream: null,
    offer: null
  }
  componentDidMount() {
    let name;
    do {
      name = prompt('please enter your name?', '');
    }
    while (!name);
    this.socket.current = io.connect('https://uwem-signal-server.herokuapp.com');
    navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      this.setState((prevState) => ({
        ...prevState,
        localStream: stream,
        username: name
      }));
      this.onMediaStream(stream);
      this.endCallButton.current.onclick = this.onEndCall;
      this.holdCallButton.current.onclick = this.onHoldCall;
    })
    .catch((error) => {
      console.log(error);
    });
  }

  onMediaStream = (stream) => {
    const { username } = this.state;
    this.localVideo.current.srcObject = stream;
    this.localVideo.current.volume = 0;
    const info = { room: 'test', username };
    this.socket.current.emit('join', JSON.stringify(info));
    this.socket.current.on('user', this.onUser);
    this.socket.current.on('ready', () => {
      this.startCallButton.current.removeAttribute('disabled');
      this.startCallButton.current.onclick = this.onStartCall;
    });
    this.socket.current.on('offer', this.onOffer);
    this.socket.current.on('end', this.onEnd);
  }

  onUser = (userString) => {
    const user = JSON.parse(userString);
    this.setState((prevState) => ({
      ...prevState,
      users: {
        user
      }
    }))
  }

  onStartCall = (event) => {
    this.startCallButton.current.setAttribute('disabled', 'disabled');
    this.endCallButton.current.removeAttribute('disabled');
    this.socket.current.emit('token');
    this.socket.current.on('token', this.onToken(this.createOffer));
  }

  onOffer = (offer) => {
    this.setState((prevState) => ({
      ...prevState,
      offer
    }));
    this.startCallButton.current.setAttribute('disabled', 'disabled');
    this.endCallButton.current.removeAttribute('disabled');
    this.acceptCallButton.current.removeAttribute('disabled');
    this.acceptCallButton.current.onclick = this.onAcceptCall
  }

  onAcceptCall = () => {
    const { offer } = this.state;
    this.socket.current.on('token', this.onToken(this.createAnswer(offer)));
    this.socket.current.emit('token');
    this.acceptCallButton.current.setAttribute('disabled', 'disabled');
  }

  onHoldCall = () => {
    this.peerConnection.current.removeTrack();
  }

  onEndCall = () => {
    this.socket.current.emit('end');
    this.socket.current.disconnect();
    const senders = this.peerConnection.current.getSenders();
    senders.forEach((sender) => {
      this.peerConnection.current.removeTrack(sender);
    });
    this.endCallButton.current.setAttribute('disabled', 'disabled');
  }

  onEnd = () => {
    this.socket.current.disconnect();
    const senders = this.peerConnection.current.getSenders();
    senders.forEach((sender) => {
      this.peerConnection.current.removeTrack(sender);
    });
    this.endCallButton.current.setAttribute('disabled', 'disabled');
  }

  createAnswer = (offer) => () => {
    this.connected.current = true;
    const rtcOffer = new RTCSessionDescription(JSON.parse(offer));
    this.peerConnection.current.setRemoteDescription(rtcOffer);
    this.peerConnection.current.createAnswer(
      (answer) => {
        this.peerConnection.current.setLocalDescription(answer);
        this.socket.current.emit('answer', JSON.stringify(answer));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onToken = (callback) => (token) => {
    this.peerConnection.current = new RTCPeerConnection({
      iceServers: token.iceServers
    });
    this.peerConnection.current.addStream(this.state.localStream);
    this.peerConnection.current.onicecandidate = this.onIceCandiate;
    this.peerConnection.current.onaddstream = this.onAddStream;
    this.socket.current.on('candidate', this.onCandidate);
    this.socket.current.on('answer', this.onAnswer);
    callback();
  }

  onAddStream = (event) => {
    this.remoteVideo.current.srcObject = event.stream;
  }

  onCandidate = (candidate) => {
    const rtcCandidate = new RTCIceCandidate(JSON.parse(candidate));
    this.peerConnection.current.addIceCandidate(rtcCandidate);
  }

  onAnswer = (answer) => {
    const rtcAnswer = new RTCSessionDescription(JSON.parse(answer));
    this.peerConnection.current.setRemoteDescription(rtcAnswer);
    this.connected.current = true;
    this.localICECandidates.current.forEach((candidate) => {
      this.socket.current.emit('candidate', JSON.stringify(candidate));
    });
    this.localICECandidates.current = [];
  }

  createOffer = () => {
    this.peerConnection.current.createOffer(
      (offer) => {
        this.peerConnection.current.setLocalDescription(offer);
        this.socket.current.emit('offer', JSON.stringify(offer));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onIceCandiate = (event) => {
    if (event.candidate) {
      if (this.connected.current) {
        this.socket.current.emit('candidate', JSON.stringify(event.candidate));
      } else {
        this.localICECandidates.current = [];
        this.localICECandidates.current.push(event.candidate);
      }
    }
  }
  
  render() {
    return (
      <>
        <h1>Video Chat</h1>
        <video ref={this.localVideo} muted id="local-video" height="300" autoPlay></video>
        <video ref={this.remoteVideo} id="remote-video" height="300" autoPlay></video>
        <div>
          <button type="button" disabled ref={this.startCallButton} id="startCall">Call</button>
          <button type="button" disabled ref={this.acceptCallButton} id="acceptCall">Accept</button>
          <button type="button" disabled ref={this.endCallButton} id="endCall">End</button>
          <button type="button" disabled ref={this.holdCallButton} id="holdCall">Hold</button>
        </div>
      </>
    );
  }
}

export default App;