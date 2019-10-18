import React from 'react';

const PokeCard = (props) => {
  const {img, id, name, pokeTypesArray} = props;
  return(
    <React.Fragment>
      <img src={img} alt={name} className="pokemon__img"/>
      <p className="pokemon_id">ID/{id}</p>
      <p className="pokemon__name">{name}</p>

      {pokeTypesArray.map(pokeType => {
        return( 
          <p className="pokemon__type">{pokeType.type.name}</p>
        )
      })}
    </React.Fragment>
  )
}

export default PokeCard;