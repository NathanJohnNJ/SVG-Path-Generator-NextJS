'use server';
import clientPromise from "../connect";

export const getConfig = async (type) => {
  try {
      const client = await clientPromise;
      const db = client.db("SVGPathGenerator");
      const response = await db.collection("config").find({name: type}).toArray();
      const config = JSON.parse(JSON.stringify(response[0].properties[0]));
      return config;
  } catch (e) {
      console.error('Error fetching config:', e);
      throw new Error('Failed to fetch configuration');
  }
}

export const updateConfig = async (name, toUpdate, newValue) => {
  try {
    const client = await clientPromise;
    const db = client.db("SVGPathGenerator");
    const updatedConfig = await db.collection("config").updateOne( 
      { name: name },
      { $set: { "properties.$[property]": newValue } },
      { arrayFilters: [ { "property": toUpdate } ] }
     );
    return JSON.parse(JSON.stringify(updatedConfig));
  } catch (error) {
    console.log(error)
  }
};

