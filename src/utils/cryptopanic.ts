import axios from "axios";

const BASE_URL = "https://cryptopanic.com/api/v1/posts/";

export async function getSocialPosts(symbol: string) {
  const res = await axios.get(BASE_URL, {
    params: {
      auth_token: process.env.CRYPTOPANIC_API_KEY,
      currencies: symbol
    }
  });

  return res.data?.results ?? [];
}
