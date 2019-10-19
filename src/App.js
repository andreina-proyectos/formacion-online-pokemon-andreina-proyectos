import React from 'react';
import './App.scss';
import PokeCard from './components/PokeCard';
import Footer from './components/Footer';
import Header from './components/Header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeInfoArray: [],
      pokeQuery:'',
    }
  }

  componentDidMount() {
    this.getMorePokemon(0);
    this.getMorePokemon(20);
    this.getMorePokemon(40);
    this.getMorePokemon(60);
    this.getMorePokemon(80);
    this.getMorePokemon(100);
    this.toggleFrontBack()
  }

  toggleFrontBack(){
    setInterval(() => {
      const backImgArray = document.querySelectorAll('.pokemon__img__back');
      for (let backPokemon of backImgArray) {
        backPokemon.classList.toggle('hidden')
      }
      const frontImgArray = document.querySelectorAll('.pokemon__img__front');
      for(let frontPokemon of frontImgArray) {
        frontPokemon.classList.toggle('hidden');
      }
     }, 1000); 
  }

  getMorePokemon(offset) {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}`;
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        console.log(data.next)
        for(let i=0; i<data.results.length; i++) {
          const pokeUrl = data.results[i].url;
          this.getPokemonInfo(pokeUrl)
        }
      })
  }

  getPokemonInfo(pokeUrl) {
    fetch(pokeUrl)
      .then(response2 => response2.json())
      .then(pokeInfo => {
        const pokeInfoArray = this.state.pokeInfoArray;
        pokeInfoArray.push(pokeInfo);
        this.setState({
          pokeInfoArray: pokeInfoArray,
        })
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
          <Header/>
          <input onChange={this.handleInputChange} type="text" className="search__input" placeholder="Filtra pokemons por nombre..."/>
          <div className="results__wrapper">
            <ul className="results__list">

                {pokeInfoArray
                .filter(pokemon => 
                  pokemon.name.toUpperCase().includes(this.state.pokeQuery.toUpperCase())
                )
                .sort((pokemona,pokemonb) => {
                  return pokemona.id - pokemonb.id;
                })
                .map(pokemon => {
                  const pokeTypesArray = pokemon.types;
                  return(
                    <li key={`${pokemon.name}_${pokemon.id}`} className="results__list__pokemon">
                      <PokeCard
                        imgFront={pokemon.sprites.front_default}
                        imgBack={pokemon.sprites.back_default}
                        id={pokemon.id}
                        name={pokemon.name}
                        pokeTypesArray={pokeTypesArray}
                      />
                    </li> 
                  )
                })}
             
            </ul>
          </div>
          <Footer/>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
