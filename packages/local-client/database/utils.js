const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://urtheaman:7279856900@cluster0.qlwoo.mongodb.net/js-notebook?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let notebooks;
const connection = async () => {
  await client.connect();
  notebooks = client.db("js-notebook").collection("notebooks");
};

const insertDoc = async (doc) => {
  // const x = "Finding the best result twice".toLowerCase().replaceAll(" ", "-");
  if (!notebooks) await connection();
  const insertedId = await notebooks
    .insertOne(doc)
    .then((res) => res.insertedId);
  return insertedId;
};

const readDoc = async (docId) => {
  if (!notebooks) await connection();
  const doc = await notebooks.findOne({ _id: docId }).then((res) => res);
  return doc;
};

const checkExistOrNot = async (docId) => {
  if (!notebooks) await connection();
  return await notebooks.count({ _id: docId }, { limit: 1 }).then((res) => res);
};

module.exports = { connection, insertDoc, readDoc, checkExistOrNot };