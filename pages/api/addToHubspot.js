// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const addRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer pat-na1-7a3e5b61-cfb6-4385-ab61-dc518568eef4`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        email: req.body.email,
        company: "PlaySpark",
        lifecyclestage: "marketingqualifiedlead",
      },
    }),
  });
  const addOut = await addRes.json();
  const vid = addOut?.id;
  await fetch("https://api.hubapi.com/contacts/v1/lists/82/add", {
    method: "POST",
    headers: {
      Authorization: `Bearer pat-na1-7a3e5b61-cfb6-4385-ab61-dc518568eef4`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      vids: [vid],
    }),
  });
  res.status(200).json({ status: "success" });
}
