import * as prismic from "@prismicio/client";

// Signature
// client = prismic client
// supertype = the page you want to get the linked content from
// id = the id of the field within the page where the docs are linked
// uid = the uid of the linked type

// export async function getLinkedData(client, supertype, id, uid) {
//     const ids = supertype.data[id].map((doc) => doc[uid].id)
//     const docs = await client.getAllByIDs(ids)
//     return docs
// }

export function createClient(config = {}) {
  const client = prismic.createClient("playspark");
  return client;
}

export const predicate = prismic.predicate;
