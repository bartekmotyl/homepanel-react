import React from 'react';
import { useDispatch } from 'react-redux';
import { connect } from '@giantmachines/redux-websocket';
import { DummyDevice } from '../../components/Devices/Dummy';
import { useSelector } from 'react-redux';

import { HomepanelWebsocketDevicesState } from '../../../store/homepanelWebsocket/hpWebsocketDevicesState';
import { HP_WEBSOCKET_PREFIX } from 'store/homepanelWebsocket/hpWebsocketActionTypes';
import { TemperatureHumiditySensor } from 'devices/implementations/HomepanelXiaomiTemperatureSensor';
import { DummyTempDevice } from 'app/components/Devices/Dummy/dummyTemp';
import { doMock } from 'store/connectors/mockConnector/actions';

interface RootState {
  homepanel: HomepanelWebsocketDevicesState;
}

export function HomePanel() {
  const dispatch = useDispatch();

  const selectState = (state: RootState) => {
    return state.homepanel.connected;
  };

  const connected = useSelector(selectState);
  const myHandler = () => {
    //dispatch(connect('ws://192.168.1.111:8899', HP_WEBSOCKET_PREFIX));
    dispatch(doMock());
  };

  return (
    <>
      <div onClick={myHandler}>Click here to connect</div>
      <div>Connected: {JSON.stringify(connected)}</div>
      <DummyDevice deviceId="water-meter-main-value" source="homepanel" />
      <DummyDevice deviceId="termostat-salon" source="homepanel" />
      <DummyTempDevice deviceId="ble-sensor-4c65a8d94592" source="homepanel" />
      <DummyTempDevice deviceId="dummy-temp1" source="mock" />
    </>
  );
}
