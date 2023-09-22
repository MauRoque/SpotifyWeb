import { getProfile } from "./FirestoreUtilities";

export const validateUserHasAdditionalInfo = async (user, db) => {
  try {
    const profileDocs = await getProfile(user.email, db);
    const profileDoc = profileDocs.docs[0];
    const profile = profileDoc.data();
    return profile.fullname ? true : false;
  } catch (error) {
    console.log(error);
  }
};
