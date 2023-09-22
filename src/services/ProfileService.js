import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { getSongsFromRefList } from "./ArtistService";

export const getAllProfiles = async () => {
  try {
    const profiles = await getDocs(collection(db, "profiles"));
    return profiles.docs.map(doc => ({ ...doc.data(), userDocId: doc.id }));
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async profileDocId => {
  try {
    const profile = (await getDoc(doc(db, "profiles", profileDocId))).data();

    return {
      ...profile,
      profileDocId,
      favoriteSongs: await getSongsFromRefList(profile.favoriteSongs),
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchEmailByUser = async user => {
  try {
    const profileDocs = await getProfile(user.email, db);
    if (profileDocs.docs.length === 0) {
      return null;
    }
    const profileDoc = profileDocs.docs[0];
    const profile = profileDoc.data();
    return { ...profile, profileDocId: profileDoc.id };
  } catch (error) {
    console.log(error);
  }
};
