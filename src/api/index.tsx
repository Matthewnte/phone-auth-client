import config from '../config'

type ProfileInfo = {
  name: string
  phoneNumber: string
  email: string
}

export const fetcher = async (url: string, token: string) => {
  console.log(config.api.baseUrl)
  const res = await fetch(`${config.api.baseUrl}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    throw new Error(`This is an HTTP error: The status is ${res.status}`)
  }
  return res.json()
}

// post data to api
export const postData = async (url: string, data: any) => {
  const res = await fetch(`${config.api.baseUrl}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error(`This is an HTTP error: The status is ${res.status}`)
  }
  return res.json()
}

export const updateData = async (
  url: string,
  data: Partial<ProfileInfo>,
  token: string,
) => {
  const res = await fetch(`${config.api.baseUrl}${url}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error(`This is an HTTP error: The status is ${res.status}`)
  }
  return res.json()
}
