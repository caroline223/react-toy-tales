import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys:[]
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  //To get the toys to display on the page

  componentDidMount = () => {
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toyInfo => this.setState({toys: toyInfo}))
  }

  
  // adding a new toy to the container
  
  addNewToy = (addToy) => {
    this.setState({toys: [...this.state.toys], addToy})
  }

  //deleting a toy from the container

  deleteToy = (minusToy) => {
    this.setState({
      toys: this.state.toys.filter((toy) => toy !== minusToy)})
    
    fetch('http://localhost:3000/toys' + minusToy.id, {
      method: "DELETE"
    })
  }

  heartToy = (likedToy) => {
    let toys = this.state.toys.filter((toy) => toy !== likedToy)
    likedToy.likes += 1
    this.setState({
      toys: [...toys, likedToy]
    })

    let configObject = {
      headers: {"Content-Type" : "application/json"},
      method: "PATCH",
      body: JSON.stringify(likedToy)
    }
      

    fetch("http://localhost:3000/toys/" + likedToy.id, configObject)
  
  }


  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addNewToy={this.addNewToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer heartToy={this.heartToy} deleteToy={this.deleteToy} toys={this.state.toys}/>
      </>
    );
  }

}

export default App;
