import axios from "axios";

export default async function exchangeCodeForGithubUser(code) {
  axios.defaults.headers.common.accept = "application/json";
  const { data } = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
      client_secret: process.env.github_client_secret,
      code,
    }
  );
  return (
    await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${data.access_token}` },
    })
  ).data;
}
