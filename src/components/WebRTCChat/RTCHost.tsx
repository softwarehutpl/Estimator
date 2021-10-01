import React, { useEffect, useRef, useState } from "react";
import styles from "./WebRTCChat.module.scss";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import Peer from "peerjs";
import { InputText } from "primereact/inputtext";
import store from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { synchronizeProject } from "../../store/reducers/projectReducer";
import { Params, Project } from "../../types/Interface";
import { useParams } from "react-router-dom";
import { getProjectSelector } from "../../store/selectors/selectors";

// const tempId = "";

// function openConnection(peer.current: any) {
//   peer.current.on("open", function (id: string) {
//     console.log("My peer.current ID is: " + id);
//   });
// }

export default function RTCHost() {
  const [value, setValue] = useState("");
  const [peerId, setPeerId] = useState("");
  const [recvId, setRecvId] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const peer: any = useRef();
  const conn: any = useRef();
  const lastPeerId = useRef();
  const { projectId } = useParams<Params>();
  const dispatch = useAppDispatch();

  const project = useAppSelector(getProjectSelector(projectId));

  function initialize() {
    peer.current = new Peer(undefined, {
      debug: 3,
    });

    peer.current.on("open", function (id: any) {
      // Workaround for peer.current.reconnect deleting previous id
      if (peer.current.id === null) {
        console.log("Received null id from peer.current open");
        peer.current.id = lastPeerId.current;
      } else {
        lastPeerId.current = peer.current.id;
      }

      console.log("ID: " + peer.current.id);
      setRecvId("ID: " + peer.current.id);
      setStatus("Awaiting connection...");
    });

    peer.current.on(
      "connection",
      function (c: {
        on: (arg0: string, arg1: () => void) => void;
        send: (arg0: string) => void;
        close: () => void;
      }) {
        // Allow only a single connection
        if (conn.current && conn.current.open) {
          c.on("open", function () {
            c.send("Already connected to another client");
            setTimeout(function () {
              c.close();
            }, 500);
          });
          return;
        }

        conn.current = c;
        conn.current.on("data", function (data: Project) {
          // console.log(data);
          dispatch(
            synchronizeProject({
              synchronizeProject: data,
              projectId: projectId,
            })
          );
          // let tempList = [...messagesList.concat(data)];
        });
        console.log("Connected to: " + conn.current.peer);
        setStatus("Connected");

        //   ready();
      }
    );

    peer.current.on("disconnected", function () {
      setStatus("Connection lost. Please reconnect");
      console.log("Connection lost. Please reconnect");

      // Workaround for peer.current.reconnect deleting previous id
      peer.current.id = lastPeerId.current;
      peer.current._lastServerId = lastPeerId.current;
      peer.current.reconnect();
    });
    peer.current.on("close", function () {
      conn.current = null;
      setStatus("Connection destroyed. Please refresh");
      console.log("Connection destroyed");
    });
    peer.current.on("error", function (err: string) {
      console.log(err);
      alert("" + err);
    });
  }

  function addMessage(value: string) {
    var now = new Date();
    var h = now.getHours();
    var m = addZero(now.getMinutes());
    var s = addZero(now.getSeconds());

    if (h > 12) h -= 12;
    else if (h === 0) h = 12;

    function addZero(t: string | number) {
      if (t < 10) t = "0" + t;
      return t;
    }

    setMessage(
      '<br><span class="msg-time">' +
        h +
        ":" +
        m +
        ":" +
        s +
        "</span>  -  " +
        value
    );
    // console.log(value);
  }

  function sendMessage() {
    if (conn.current && conn.current.open) {
      // conn.current.send(value);
      // console.log("Sent: " + value);
      addMessage(value);
      conn.current.send(project);
    } else {
      console.log("Connection is closed");
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className={styles.projectChat}>
      <div className={styles.statusChat}>{`My connection ID: ${recvId}`}</div>
      <div>
        <Button
          className="p-button-sm"
          label="Open connection"
          iconPos="right"
          onClick={() => {}}
        />
        <br />
        <br />
      </div>
      {/* <InputTextarea
        className={styles.inputChat}
        rows={2}
        cols={30}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      /> */}
      <br />
      <Button
        className={styles.buttonChat}
        label="Synchronize"
        icon="pi pi-check"
        iconPos="right"
        onClick={() => sendMessage()}
      />
      <br />
      {/* <div className={styles.messagesArea}>
        <span>Text 1</span>
        <br />
        <span>Text 2</span>
        <br />
        <span>Text 3</span>
        <br />
      </div> */}
    </div>
  );
}
