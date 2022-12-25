const API_URL = 'https://graphql.datocms.com'
const API_TOKEN = process.env.DATOCMS_READONLY_TOKEN

export default async function fetcher(
  query,
  { preview = false, variables } = {}
) {
  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.log(json.errors)
    throw new Error("Can't Fetch API...")
  }

  return json.data
}
