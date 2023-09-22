import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { deleteSong } from "./SongService";

export const getAllArtists = async () => {
  try {
    const artists = await getDocs(collection(db, "artists"));
    return artists.docs.map(doc => ({ ...doc.data(), artistDocId: doc.id }));
  } catch (error) {
    console.log(error);
  }
};

export const getArtist = async artistDocId => {
  try {
    const artist = (await getDoc(doc(db, "artists", artistDocId))).data();

    return {
      ...artist,
      artistDocId,
      songs: await getSongsFromRefList(artist.songs),
    };
  } catch (error) {
    console.log(error);
  }
};

export const createArtist = async artistData => {
  try {
    const artist = await addDoc(collection(db, "artists"), artistData);

    return await getArtist(artist.id);
  } catch (error) {
    console.log(error);
  }
};

export const updateArtist = async (artistDocId, artistData) => {
  try {
    await updateDoc(doc(db, "artists", artistDocId), artistData);

    return await getArtist(artistDocId);
  } catch (error) {
    console.log(error);
  }
};

export const deleteArtist = async artist => {
  try {
    const songs = await getSongsFromRefList(artist.songs);

    songs.forEach(async song => {
      await deleteSong(song);
    });

    await deleteDoc(doc(db, "artists", artist.artistDocId));
  } catch (error) {
    console.log(error);
  }
};

export const getSongsFromRefList = async songsRefList => {
  try {
    songsRefList =
      !Array.isArray(songsRefList) || !songsRefList.length
        ? ["empty"]
        : songsRefList;

    const songsDocs = await getDocs(
      query(collection(db, "songs"), where(documentId(), "in", songsRefList))
    );

    return songsDocs.docs.map(doc => ({
      ...doc.data(),
      songDocId: doc.id,
    }));
  } catch (error) {
    console.log(error);
  }
};
