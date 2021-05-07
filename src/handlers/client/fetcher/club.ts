export const fetchClub = async (): Promise<{}> => {

  const data = await fetch(`/api/database/fetchClub`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({action: "fetchClub"}),
    credentials: 'include'
  })

  const res = await data.json()

  return res

}

export const fetchAClub = async (clubID: string): Promise<{}> => {

  const data = await fetch(`/api/database/fetchClub`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({action: "fetchAClub", clubID: clubID}),
    credentials: 'include'
  })

  const res = await data.json()

  return res

}