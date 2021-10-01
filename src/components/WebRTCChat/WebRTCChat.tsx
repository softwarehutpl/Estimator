import React, { useEffect, useState } from "react";
import styles from "./WebRTCChat.module.scss";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import Peer from "peerjs";
import { InputText } from "primereact/inputtext";
import RTCGuest from "./RTCGuest";
import RTCHost from "./RTCHost";

// const tempId = "";

// function openConnection(peer: any) {
//   peer.on("open", function (id: string) {
//     console.log("My peer ID is: " + id);
//   });
// }

export default function WebRTCChat() {
  const [visibility, setVisibility] = useState(false);
  const [guest, setGuest] = useState(false);
  const [host, setHost] = useState(false);

  return (
    <div className={styles.projectChat}>
      {guest === false && host === false ? (
        <div className={styles.buttonsChat}>
          <span className={styles.infoChat}>What you want to do? :)</span>
          <br />
          <Button
            className="p-button-sm"
            label="Join connection"
            iconPos="right"
            onClick={() => setGuest(true)}
          />
          <br />
          <Button
            className="p-button-sm"
            label="Open connection"
            iconPos="right"
            onClick={() => setHost(true)}
          />
        </div>
      ) : null}
      {guest === true ? <RTCGuest /> : null}
      {host === true ? <RTCHost /> : null}
    </div>
  );
}
