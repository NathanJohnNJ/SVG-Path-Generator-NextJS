'use server';
import clientPromise from "../connect";

// export const getConfig = async () => {
//   try {
//       const client = await clientPromise;
//       const db = client.db("SVGPathGenerator");
//       const config = await db.collection("config").find({}).toArray();
//       // console.log('Config from "getConfig": ', config)
//       return JSON.parse(JSON.stringify(config));
//   } catch (e) {
//       console.error(e);
//       return { props: { config: [] } };
//   }
// };

// export const getAllConfig = async () => {
//   console.log('getAllConfig')
//   try {
//       const client = await clientPromise;
//       const db = client.db("SVGPathGenerator");
//       const stroke = await db.collection("config").find({name: "stroke"}).toArray();
//       const s = JSON.parse(JSON.stringify(stroke));
//       const fill = await db.collection("config").find({name: "fill"}).toArray();
//       const f = JSON.parse(JSON.stringify(fill));
//       const control = await db.collection("config").find({name: "control"}).toArray();
//       const c = JSON.parse(JSON.stringify(control));
//       const end = await db.collection("config").find({name: "end"}).toArray();
//       const e = JSON.parse(JSON.stringify(end));
//       const config = {
//         stroke: s,
//         fill: f,
//         control: c,
//         end: e
//       };
//       console.log('getConfig function')
//       console.log(config.stroke[0].properties[0].colour)
//       return config;
//   } catch (e) {
//       console.error(e);
//       return { props: { config: [] } };
//   }
// };

export const getConfig = async (type) => {
  try {
      const client = await clientPromise;
      const db = client.db("SVGPathGenerator");
      const response = await db.collection("config").find({name: type}).toArray();
      const config = JSON.parse(JSON.stringify(response));
      return config[0].properties;
  } catch (e) {
      console.error(e);
      return { props: { config: [] } };
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
    console.log("updateConfig command updated: ", updatedConfig)
    return JSON.parse(JSON.stringify(updatedConfig));
  } catch (error) {
    console.log(error)
  }
};

