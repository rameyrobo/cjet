export async function GET() {
  try {
    const resp = await fetch(
      "https://api.dexscreener.com/token-pairs/v1/solana/GP5AWXs8F3MKa5hXkJ4k3w6KKrbeiNwFDBmcjxhppump"
    )
    const data = await resp.json()
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch CJET price" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}