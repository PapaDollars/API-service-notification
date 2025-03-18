import NodeCache from "node-cache";

const tempStorage = new NodeCache({ stdTTL: 300 });

// Stocker les données temporaires
export const storeTempUserData = async (email, data) => {
  tempStorage.set(email, data);
};

// Récupérer les données temporaires
export const getTempUserData = async (email) => {
  return tempStorage.get(email);
};

// Supprimer les données temporaires
export const deleteTempUserData = async (email) => {
  tempStorage.del(email);
};