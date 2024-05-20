let contenedor = document.querySelector(".contenedor");

let pokemon = prompt("Ingrese el número o nombre de Pokémon deseado");

const getPokemon = async () => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    if (!response.ok) {
      throw new Error("Pokemon no encontrado");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const templatePokemon = (pokemon) => {
  const { name, sprites, types, height, weight } = pokemon;
  const primaryType = types.map((typeInfo) => typeInfo.type.name).join("-");
  const PokemonName = capitalizeFirstLetter(name);
  const cardClass = `type-${primaryType}`;

  const pokemonHTML = `
    <div class="card ${primaryType}">
    <h2>${PokemonName}</h2>
      <img src="${sprites.front_default}" alt="${PokemonName}" />
      <p>Type: ${primaryType}</p>
      <p>Height: ${height / 10} Mts</p>
      <p>Weight: ${weight / 10} Kg</p>
    </div>
  `;
  contenedor.innerHTML += pokemonHTML;
};

const renderPokemon = async () => {
  try {
    const pokemon = await getPokemon();
    if (pokemon) {
      templatePokemon(pokemon);
    }
  } catch (error) {
    console.error(error);
  }
};

renderPokemon();
