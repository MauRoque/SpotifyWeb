import { getAllArtists, getArtist } from "../services/ArtistService";

export const refreshArtists = async setArtists => {
  const artists = await getAllArtists();
  setArtists(artists);
};

export const refreshArtist = async (artistDocId, setArtist) => {
  const artist = await getArtist(artistDocId);
  setArtist(artist);
};
