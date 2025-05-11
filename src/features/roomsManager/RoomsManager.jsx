import { memo, useCallback, useState } from "react";
import ContactLink from "../../entity/contactItem/ContactLink";
import Button from "../../shared/ui/button/Button";
import Input from "../../shared/ui/input/input";
import style from "./RoomsManager.module.css";

const RoomsManager = ({ handleJoinRoom }) => {
    const [roomName, setRoomName] = useState("");
    const [rooms, setRooms] = useState(["general"]);

    const handleAddLocalRoom = useCallback((roomName) => {
        if (rooms.includes(roomName) || !roomName.trim()) return
        const newRoom = roomName.trim();
        setRooms([...rooms, newRoom]);
        setRoomName("")
    });

    return (
        <div className={style.container}>
            <div>CREATE&JOIN ROOM</div>
            <Input placeholder="Название комнаты" className={style.input} type="text" value={roomName} onChange={(e) => { setRoomName(e.currentTarget.value) }} />
            <Button onClick={() => { handleJoinRoom(roomName, false) }}>Join</Button>
            <Button onClick={() => { handleAddLocalRoom(roomName) }}>Create</Button>
            {rooms.map((room) => <ContactLink
                key={room}
                name={room}
                isPrivate={false}
                onClick={() => { handleJoinRoom(room, false) }} />)}
        </div>
    );
};

export default memo(RoomsManager);