import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = ({toys, heartToy, deleteToy}) => {

  let createToys = (toys) => {
      return toys.map((currentToy) => <ToyCard key={currentToy.id} toy={currentToy} heartToy={heartToy} deleteToy={deleteToy}/>)
  }
  return(
    <div id="toy-collection">
      {createToys(toys)}
    </div>
  );
}

export default ToyContainer;
