import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";

export const addSongToArtist = async (artistDocId, songData) => {
  try {
    const song = await createSong(songData);
    await updateDoc(doc(db, "artists", artistDocId), {
      songs: arrayUnion(doc(db, `songs/${song.songDocId}`)),
    });

    return song;
  } catch (error) {
    console.log(error);
  }
};

export const createSong = async songData => {
  try {
    const song = await addDoc(collection(db, "songs"), songData);

    return await getSong(song.id);
  } catch (error) {
    console.log(error);
  }
};

export const getSong = async songDocId => {
  try {
    const song = (await getDoc(doc(db, "songs", songDocId))).data();

    return {
      ...song,
      songDocId,
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateSong = async (songDocId, songData, previousFilePath) => {
  try {
    if (songData.filePath !== previousFilePath) {
      await deleteObject(ref(storage, previousFilePath));
    } else {
      songData = {
        name: songData.name,
        album: songData.album,
      };
    }

    await updateDoc(doc(db, "songs", songDocId), songData);

    return await getSong(songDocId);
  } catch (error) {
    console.log(error);
  }
};

export const deleteSong = async (song, artistDocId) => {
  try {
    if (song.filePath) {
      await deleteObject(ref(storage, song.filePath));
    }

    await updateDoc(doc(db, "artists", artistDocId), {
      songs: arrayRemove(doc(db, `songs/${song.songDocId}`)),
    });

    await deleteDoc(doc(db, "songs", song.songDocId));
  } catch (error) {
    console.log(error);
  }
};
