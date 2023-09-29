// import React from "react";

// class NewRoomForm extends React.Component{
//     constructor(){
//         super()
//         this.state = {
//             roomName:''
//         }
//         this.handleChange = this.handleChange.bind(this)
//         this.handleSubmit = this.handleSubmit.bind(this)
//     }
//     handleChange(e){
//         this.setState({
//             roomName: e.target.value
//         })
//     }
//     handleSubmit(e){
//         e.preventDefault()
//         this.props.createRoom(this.state.roomName)
//         this.setState({roomName:''})
//     }
//     render(){
//         return(
//             <div className="new-room-form">
//                 <form onSubmit={this.handleSubmit}>
//                     <input
//                     value={this.state.roomName}
//                     onChange={this.handleChange}
//                     type="text"
//                     placeholder="NewRoomForm"
//                     required />
//                     <button id="create-room-btn" type="submit">+</button>
//                 </form>
//             </div>
//         );
//     }
// }
// export default NewRoomForm;
import React, { Component } from 'react';
 
class NewRoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      host: '',
      topic: '',
    };
  }
 
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
 
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, host, topic } = this.state;
    
    // Prepare the data in the required format
    const chatRoomData = {
      name,
      description,
      host: parseInt(host), // Convert to integer
      topic: parseInt(topic), // Convert to integer
      participants: [],
    };
 
    // Make a POST request to the API endpoint
    fetch('http://127.0.0.1:8000/api/room/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chatRoomData),
    })
    .then(response => {
      if (response.status === 201) {
        // Chat room created successfully, you can handle the response here
        console.log('Chat room created successfully');
        this.setState({
          name: '',
          description: '',
          host: '',
          topic: '',
        });
      } else {
        // Handle error cases here
        console.error('Failed to create chat room');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
 
  render() {
    const { name, description, host, topic } = this.state;
 
    return (
      <div cdclassName="new-room-form">
        <h2>Create a Chat Room</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="host">Host ID:</label>
            <input
              type="number"
              id="host"
              name="host"
              value={host}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="topic">Topic ID:</label>
            <input
              type="number"
              id="topic"
              name="topic"
              value={topic}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit">Create Chat Room</button>
        </form>
      </div>
    );
  }
}
 
export default NewRoomForm;