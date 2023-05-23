import { useState } from "react"

export type CoreTypes = {
  id: string
  fullName: string
  createdAt: string
  stargazersCount: number
  language: string
  url: string
}

type FavoriteProps = {
  Get: () => Promise<CoreTypes[]>
  Delete: (params: string) => Promise<any>
  Post: (params: string) => Promise<any>
  data: CoreTypes[]
  error: string | undefined
  loading: boolean
}

export const useFavorites = (): FavoriteProps => {
  const [data, setData] = useState<CoreTypes[]>([])
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

  const Get = async () => {
    let url = `http://localhost:8080/repo/`
    setLoading(true)
    return fetch(url, { method: "GET" })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          setError(response.statusText)
          setLoading(false)
        }
      })
      .then((data) => {
        setData(data.repos)
        setLoading(false)
        return data.repos
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
        setError(error)
      })
  }


  const Post = async (params: string) => {
    let url = `http://localhost:8080/repo/`
    setLoading(true)
    fetch(url, {
      method: "POST",
      body: params,
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          setError(response.statusText)
          setLoading(false)
        }
      })
      .then((data) => {
        setData(data)
        setLoading(false)

      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
        setError(error)
      })
  }

  const Delete = async (id: string) => {
    let url = `http://localhost:8080/repo/${id}`
    console.log("URL", url);

    setLoading(true)
    fetch(url, { method: "DELETE" })
      .then((response) => {

        if (response.status === 200) {
          setData((prev) => prev.filter(o => o.id !== id.toString()))
          setLoading(false)
        } else {
          setError(response.statusText)
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
        setError(error)
      })
  }

  return { Get, Post, Delete, data, error, loading }
}