'use server';
import clientPromise from "../connect";

export const getPath = async () => {
  console.log('Getting path from MongoDB');
  try {
      const client = await clientPromise;
      const db = client.db("SVGPathGenerator");
      const path = await db.collection("commands").find({}).toArray();
      return JSON.parse(JSON.stringify(path));
  } catch (e) {
      console.error(e);
      return { props: { path: [] } };
  }
};

export const deletePath = async () => {
  console.log('Deleting old path');
  try {
    const client = await clientPromise;
    const db = client.db("SVGPathGenerator");
    const deleted = await db.collection("commands").deleteMany({});
    return JSON.parse(JSON.stringify(deleted));
  } catch (error) {
    console.log(error)
  }
};

export const addToPath = async (command) => {
  console.log('addToPath command started');
  try {
    const client = await clientPromise;
    const db = client.db("SVGPathGenerator");
    const newCommand = await db.collection("commands").insertOne({
      type: command.type,
      commandId: command.commandId,
      startPoint: command.startPoint,
      endPoint: command.endPoint,
      controlPoints: command.controlPoints?command.controlPoints:null
    });
    console.log('addToPath command completed.')
    return JSON.parse(JSON.stringify(newCommand));
  } catch (error) {
    console.log(error)
  }
};

