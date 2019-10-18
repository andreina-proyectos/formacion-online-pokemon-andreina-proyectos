import React from 'react';
import './App.css';
import PokeCard from './PokeCard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeInfoArray: [],
      pokeQuery:'',
    }
  }

  componentDidMount() {
    const endpoint = 'https://pokeapi.co/api/v2/pokemon';
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        let pokeInfoArray = [];

        for(let i=0; i<data.results.length; i++) {
          const pokeUrl = data.results[i].url;
          fetch(pokeUrl)
            .then(response2 => response2.json())
            .then(pokeInfo => {
              pokeInfoArray.push(pokeInfo);
              this.setState({
                pokeInfoArray: pokeInfoArray,
              })
            })
        }
      })
  }

  handleInputChange = (event) => {
    const pokemonSearched = event.currentTarget.value;
    this.setState({
      pokeQuery:pokemonSearched
    })
  }

  render() {
    const {pokeInfoArray} = this.state;
    return (
      <div className="App">
        <React.Fragment>
          <input onChange={this.handleInputChange} type="text" className="search__input"/>
          <div className="results__wrapper">
            <ul className="results__list">

                {pokeInfoArray
                .filter(pokemon => 
                  pokemon.name.toUpperCase().includes(this.state.pokeQuery.toUpperCase())
                )
                .map(pokemon => {
                  const pokeTypesArray = pokemon.types;
                  return(
                    <li key={`${pokemon.name}_${pokemon.id}`} className="results__list__pokemon">
                      <PokeCard
                      img={pokemon.sprites.front_default}
                      id={pokemon.id}
                      name={pokemon.name}
                      pokeTypesArray={pokeTypesArray}
                      />
                    </li> 
                  )
                })}
             
            </ul>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
