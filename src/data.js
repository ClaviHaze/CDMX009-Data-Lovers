let fetchURL = 'https://raw.githubusercontent.com/ClaviHaze/CDMX009-Data-Lovers/master/src/data/pokemon/pokemon.json';
fetch(fetchURL)
  .then(response => {
    if (!response.ok) {
      throw Error ("Data Load Error");
    }
    return response.json()
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });

  export const example = () => {
    return 'example';
  };
