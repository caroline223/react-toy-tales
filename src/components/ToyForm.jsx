import React, { Component } from 'react';

class ToyForm extends Component {

  state = {
    toyName: "",
    toyImg: "",
    toyLikes: 0
  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();

    let createdToy = {
      name: this.state.toyName,
      image: this.state.toyImg,
      likes: this.state.toyLikes
    }

    let configObject = {
      method: 'POST',
      headers: {'Content-type' : 'application/json'},
      body:JSON.stringify(createdToy)
    }

    fetch('http://localhost:3000/toys', configObject)
    .then(response => response.json())
    .then(createdToy => {
      this.props.addNewToy(createdToy)
    })

    

  }

  

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="add-toy-form">
          <h3>Create a toy!</h3>
          <input onChange={(event) => this.setState({toyName: event.target.value})} type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input onChange={(event) => this.setState({toyImg: event.target.value})} type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
