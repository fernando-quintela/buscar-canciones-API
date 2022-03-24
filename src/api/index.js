const consultarApi = async (artista, cancion ) => {
  try {
    const data  = await fetch(`https://api.lyrics.ovh/v1/${artista}/${cancion}`);
    const letra = await data.json();
    return letra;
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  consultarApi
}