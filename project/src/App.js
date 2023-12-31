import React from "react";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import RoomList from "./components/RoomList";
import NewRoomForm from "./components/NewRoomForm";
import "./style.css";

import { tokenUrl } from "./config";

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      roomId:null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
  }

  // componentDidMount () {
  //   // const chatManager = new Chatkit.ChatManager({
  //   //         instanceLocator,
  //   //         userId: "perborgen",
  //       //     tokenProvider: new Chatkit.TokenProvider({
  //       //         url: tokenUrl
  //       // })
  //   })

//     chatManager.connect()
//     .then(currentUser => {
//       this.currentUser = currentUser
//       this.getRooms()
     
  
//   })
//   .catch(err => console.log('error on connecting: ',err))
// }
getRooms(){
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/rooms/'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data); // Handle the API data here
    } catch (error) {
      console.error('Error:', error);
    }
  };
  this.currentUser.getJoinableRooms()
  .then(joinableRooms => {
    this.setState({
      joinableRooms,
      joinedRooms:this.currentUser.rooms
    })
  })
  .catch(err => console.log('error on joinnableRooms: ',err))
}
subscribeToRoom(roomId){
  this.setState.messages({
    messages:[]
  })
  this.currentUser.subscribeToRoom({
    roomId: roomId,
    hooks:{
      onNewMessage: message => {
        this.setState({
          messages: [...this.state.messages,message]
        })
      }
    }       
})
  .then(room =>{
    this.setState({
      roomId: room.id
    })
    this.getRooms()
  })
  .catch(err => console.log("error on subscribing to room: ",err))
}
sendMessage(text){
  this.currentUser.sendMessage({
    text:text,
    roomId: this.state.roomId
  })
}
  createRoom(name){
    this.currentUser.createRoom({
      name
    })
    .then(room =>this.subscribeToRoom(room.id))
    .catch(err => console.log('error with createRoom: ', err))
  }
  render (){
    return(
      <div className="app">
        <RoomList 
        roomId={this.state.roomId}
        subscribeToRoom={this.subscribeToRoom}
        rooms={[...this.state.joinableRooms,...this.state.joinedRooms]}/>
        <MessageList 
        roomId = {this.state.messages}
        messages={this.state.messages}/>
        <SendMessageForm
        disabled={!this.state.roomId}
        sendMessage={this.sendMessage} />
        <NewRoomForm createRoom={this.createRoom}/>
      </div>
    );
  }
 
}

export default App
