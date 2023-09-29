import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function RoomList() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/rooms/')
        .then((response) => response.json())
        .then((responseData) => {
          setData(responseData);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, []);
  
    return (
      <div className="rooms-list">
        <ul>
        <h3>List of Rooms</h3>
          {data.map((room) => (
            <li key={room.id}>
              <h2>{room.name}</h2>
              <p>{room.description}</p>
              <p>Participants: {room.participants.length}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default RoomList;
