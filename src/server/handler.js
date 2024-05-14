const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const { Firestore } = require('@google-cloud/firestore');

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { confidenceScore, label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    "id": id,
    "result": "Cancer",
    // "explanation": explanation,
    "suggestion": suggestion,
    // "confidenceScore": confidenceScore,
    "createdAt": createdAt
  }

  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data
  })
  response.code(201);
  await storeData(id, data);
  return response;
}

async function getHistoriesHandler(request, h) {
  const db = new Firestore();
  const userHistoryCollection = db.collection('predictions');
  const querySnapshot = await userHistoryCollection.get();
  const histories = [];
  querySnapshot.forEach(doc => {
    histories.push(doc.data());
  });


  const response = h.response({
    status: 'success',
    data: histories
  });
  response.code(200);
  return response;
}



module.exports = { postPredictHandler, getHistoriesHandler };
