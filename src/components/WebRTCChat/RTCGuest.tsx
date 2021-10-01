import React, { useEffect, useState, useRef } from "react";
import styles from "./WebRTCChat.module.scss";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import Peer from "peerjs";
import { InputText } from "primereact/inputtext";
import store from "../../store/store";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProjectSelector } from "../../store/selectors/selectors";
import { Params, Project } from "../../types/Interface";
import { synchronizeProject } from "../../store/reducers/projectReducer";

// const tempId = "";

// function openConnection(peer: any) {
//   peer.on("open", function (id: string) {
//     console.log("My peer ID is: " + id);
//   });
// }

export default function RTCGuest() {
  const [value, setValue] = useState("");
  const [inputId, setInputId] = useState("");
  const [peerId, setPeerId] = useState("");
  const [recvId, setRecvId] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState(["Initial message"]);
  const peer: any = useRef();
  const conn: any = useRef();
  const { projectId } = useParams<Params>();
  const lastPeerId = useRef();
  const dispatch = useAppDispatch();

  const project = useAppSelector(getProjectSelector(projectId));

  function initialize() {
    peer.current = new Peer();

    peer.current.on("open", function (id: any) {
      // Workaround for peer.current.reconnect deleting previous id
      //   if (peer.id === null) {
      //     console.log("Received null id from peer open");
      //     peer.id = lastPeerId;
      //   } else {
      //     lastPeerId = peer.id;
      //   }
      //   peer.id = inputId;

      console.log("ID: " + peer.id);
    });

    peer.current.on(
      "connection",
      function (c: {
        on: (arg0: string, arg1: () => void) => void;
        send: (arg0: string) => void;
        close: () => void;
      }) {
        // Disallow incoming connections
        c.on("open", function () {
          c.send("Sender does not accept incoming connections");
          setTimeout(function () {
            c.close();
          }, 500);
        });
      }
    );

    peer.current.on("disconnected", function () {
      setStatus("Connection lost. Please reconnect");
      console.log("Connection lost. Please reconnect");

      // Workaround for peer.reconnect deleting previous id
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

  function join() {
    // Close old connection
    if (conn.current) {
      conn.current.close();
    }

    // Create connection to destination peer specified in the input field
    console.log("in jooin: " + conn.current);
    console.log("inputId jooin: " + inputId);
    conn.current = peer.current.connect(inputId, {
      reliable: true,
    });

    conn.current.on("open", function () {
      setStatus("Connected to: " + conn.current.peer);
      console.log("Connected to: " + conn.current.peer);

      // Check URL params for comamnds that should be sent immediately
      var command = getUrlParam("command");
      if (command) conn.current.send(command);
    });
    // Handle incoming data (messages only since this is the signal sender)
    conn.current.on("data", function (data: Project) {
      // addMessage(data);
      // // let tempList = [...messagesList.concat(data)];
      // setMessagesList((prevState) => [...prevState, data]);
      dispatch(
        synchronizeProject({
          synchronizeProject: data,
          projectId: projectId,
        })
      );
    });
    conn.current.on("close", function () {
      setStatus("Connection closed");
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

    console.log(value);
  }

  function getUrlParam(name: string) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) return null;
    else return results[1];
  }

  function sendMessage() {
    if (conn.current && conn.current.open) {
      // conn.current.send(value);
      conn.current.send(project);
      // console.log("Sent: " + value);
      console.log(project);
      // addMessage(value);
    } else {
      console.log("Connection is closed");
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className={styles.projectChat}>
      <div className={styles.statusChat}>
        <span className="p-float-label">
          <InputText
            id="username"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
          />
          <label htmlFor="username">Connection Id</label>
        </span>
      </div>
      <div>
        <Button
          className="p-button-sm"
          label="Join to"
          iconPos="right"
          onClick={() => {
            join();
          }}
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
        {messagesList.map((message) => {
          return (
            <span key={message}>
              {message} <br />
            </span>
          );
        })}
      </div> */}
    </div>
  );
}
