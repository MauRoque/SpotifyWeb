import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export const registerProfile = (profile, db) => {
  return addDoc(collection(db, "profiles"), {
    ...profile,
  });
};

export const getProfile = (email, db) => {
  const profiles = collection(db, "profiles");

  const q = query(profiles, where("email", "==", email));
  return getDocs(q);
};
