import React from 'react';

const PokeCard = (props) => {
  const {imgFront, imgBack, id, name, pokeTypesArray} = props;
  return(
    <React.Fragment>
      <div className="img__wrapper">
        <img src={imgFront} alt={name} className="pokemon__img__front"/>
        {/* <img src={imgBack} alt={name} className="pokemon__img__back"/> */}
        <div className="id__wrapper">
          <p className="pokemon_id">ID/{id}</p>
        </div>
      </div>

      <div className="info__wrapper">
        <p className="pokemon__name">{name}</p>
        <div className="types__wrapper">
          {pokeTypesArray.map(pokeType => {
            return(
              <p key={`${id}_${pokeType.type.name}`} className="pokemon__type">{pokeType.type.name}</p>
            )
          })}
        </div>
      </div>
    </React.Fragment>
  )
}

export default PokeCard;