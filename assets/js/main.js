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
  const typesHTML = types.map((typeInfo) => typeInfo.type.name).join(",");
  const capitalizedPokemonName = capitalizeFirstLetter(name);
  const primaryType = types[0].type.name;
  const cardClass = `type-${primaryType}`;

  const pokemonHTML = `
    <div class="card ${cardClass}">
      <h2>${capitalizedPokemonName}</h2>
      <img src="${sprites.front_default}" alt="${capitalizedPokemonName}" />
      <p>Type: ${typesHTML}</p>
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
form.reset();

const init = () => {
  form.addEventListener("submit", getPokemon);
};

init();
