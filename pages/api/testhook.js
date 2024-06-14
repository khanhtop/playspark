const slackWebhookUrl =
  "https://hooks.slack.com/services/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";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload = req.body;
    const slackMessage = {
      text: `\`\`\`${JSON.stringify(payload, null, 2)}\`\`\``, // Stringifies the entire payload and formats it as a code block
    };

    const response = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slackMessage),
    });

    console.log(response);

    if (!response.ok) {
      const errorData = await response.text();
      return res.status(response.status).json({ error: errorData });
    }

    const responseData = await response.json();
    return res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
