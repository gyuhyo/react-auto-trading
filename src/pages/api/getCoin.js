import { call, put, select, flush, delay } from "redux-saga/effects";
import { eventChannel, buffers } from "redux-saga";
import { SUCCESS } from "../../store/reducers/coin";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const { w3cwebsocket } = require("websocket");

const createSocket = () => {
  const client = new w3cwebsocket("wss://api.upbit.com/websocket/v1");
  client.binaryType = "arraybuffer";

  return client;
};

const connectSocket = (socket, connectType, action, buffer) => {
  return eventChannel((emit) => {
    socket.onopen = () => {
      socket.send(
        JSON.stringify([
          { ticket: "test-api" },
          { type: connectType, codes: "KRW-BTC" },
        ])
      );
    };

    socket.onmessage = (evt) => {
      const enc = new TextDecoder("utf-8");
      const arr = new Uint8Array(evt.data);
      const data = JSON.parse(enc.decode(arr));

      emit(data);
    };

    socket.onerror = (evt) => {
      emit(evt);
    };

    const unsubscribe = () => {
      socket.close();
    };

    return unsubscribe;
  }, buffer || buffers.none());
};

export default function createConnectSocketSaga(connectType) {
  //const dispatch = useDispatch();

  return function* (action = {}) {
    const client = yield call(createSocket);
    const clientChannel = yield call(
      connectSocket,
      client,
      connectType,
      action,
      buffers.expanding(500)
    );

    while (true) {
      try {
        const datas = yield flush(clientChannel);
        const state = yield select();

        if (datas.length) {
          const sortedObj = {};
          datas.forEach((data) => {
            if (sortedObj[data.code]) {
              sortedObj[data.code] =
                sortedObj[data.code].timestamp > data.timestamp
                  ? sortedObj[data.code]
                  : data;
            } else {
              sortedObj[data.code] = data;
            }
          });

          const sortedData = Object.keys(sortedObj).map(
            (data) => sortedObj[data]
          );

          //yield put(dispatch(SUCCESS(sortedData)));
          console.log(sortedData);
        }

        yield delay(500);
      } catch (e) {
        throw e;
      }
    }
  };
}
