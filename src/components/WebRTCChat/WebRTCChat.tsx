import React, { useEffect, useState } from "react";
import styles from "./WebRTCChat.module.scss";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import Peer from "peerjs";

// const tempId = "";

// function openConnection(peer: any) {
//   peer.on("open", function (id: string) {
//     console.log("My peer ID is: " + id);
//   });
// }

export default function WebRTCChat() {
  const [value, setValue] = useState("");
  const [peerId, setPeerId] = useState("");
  const [reload, setReload] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const peer = new Peer();

  function openConnection(peer: Peer) {
    peer.on("open", function (id: string) {
      console.log("My peer ID is: " + id);
      setPeerId(() => id);
    });
  }

  return (
    <div className={styles.projectChat}>
      <div className={styles.statusChat}>
        Status: <br /> {`My connection ID: ${peerId}`} <br /> Status: sdasd
      </div>
      <div>
        <button onClick={() => openConnection(peer)}>Open connection</button>
      </div>
      <InputTextarea
        className={styles.inputChat}
        rows={2}
        cols={30}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        className={styles.buttonChat}
        label="Send message"
        icon="pi pi-check"
        iconPos="right"
      />
      <div className={styles.messagesArea}>
        <span>Text 1</span>
        <br />
        <span>Text 2</span>
        <br />
        <span>Text 3</span>
        <br />
        <span>Text 1</span>
        <br />
        <span>Text 2</span>
        <br />
        <span>Text 3</span>
        <br />
        <span>Text 1</span>
        <br />
        <span>Text 2</span>
        <br />
        <span>Text 3</span>
        <br />
        <span>Text 1</span>
        <br />
        <span>Text 2</span>
        <br />
        <span>Text 3</span>
      </div>
    </div>
  );
}
