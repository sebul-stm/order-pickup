export default async function handler(req, res) {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwCZ7ks6MGrKtTW7aw0NU5bcu8rxVyYLb051UZBvAvz3omTlPyEP5u_nfgBn18IzKcJgw/exec";

  try {
    if (req.method === "POST") {
      const post = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      const result = await post.json();
      return res.status(200).json(result);
    }

    const get = await fetch(GOOGLE_SCRIPT_URL);
    const data = await get.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Relay Error:", err);
    return res.status(500).json({ error: "Relay Failed", details: err.message });
  }
}
