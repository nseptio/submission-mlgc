const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
  const db = new Firestore();

  const predictCollection = db.collection('prediction');

  console.log(`Successfully store data with id: ${id}`);
  return predictCollection.doc(id).set(data);
}

module.exports = storeData;