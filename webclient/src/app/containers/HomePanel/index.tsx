import React from 'react';
import { useDispatch } from 'react-redux';
import { connect } from '@giantmachines/redux-websocket';
import { DummyDevice } from '../../components/Devices/Dummy';
import { useSelector } from 'react-redux';
import { WebsocketState } from '../../../store/websocket/websocketState';

interface RootState {
  websocket: WebsocketState;
}

export function HomePanel() {
  const dispatch = useDispatch();

  const myHandler = () => {
    alert('Connecting to web socket...');
    dispatch(connect('ws://192.168.1.111:8899'));
  };

  const selectState = (state: RootState) => {
    return state.websocket.connected;
  };

  const connected = useSelector(selectState);

  return (
    <>
      <div onClick={myHandler}>Click here to connect</div>
      <div>Connected: {JSON.stringify(connected)}</div>
      <DummyDevice deviceId="water-meter-main-value" />
      <DummyDevice deviceId="termostat-salon" />
    </>
  );
}
