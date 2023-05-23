import { useState } from 'react'
import { CoreTypes, useFavorites } from './useFavorites'

export type GithubTypes = {
  id: string
  full_name: string
  created_at: string
  stargazers_count: number
  language: string
  url: string
  owner: Owner
}
type Owner = {
  avatar_url?: string
}
export interface ReposTypes extends CoreTypes {
  avatarUrl: string | undefined
  isFav: boolean
}

type fetchProps = {
  input?: string
  perPage?: number
}
const token = 'your token'

export const useSearch = () => {
  const [data, setData] = useState<ReposTypes[]>([])
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const { Get } = useFavorites()

  const fetchData = async ({ input, perPage, }: fetchProps) => {

    const queryTerm = `q=` + encodeURIComponent(input || '')
    const queryPerPage = `&per_page=${perPage || 30}`
    const queryString = queryTerm + queryPerPage

    let url = `https://api.github.com/search/repositories?${queryString}`

    setLoading(true)
    const result = await Get()
    fetch(url, {
      method: 'GET', headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          setError(response.statusText)
          setLoading(false)
        }
      })
      .then((repoData) => {
        let parsedRepos: ReposTypes[] = []
        if (repoData) {
          repoData.items?.forEach((item: GithubTypes) => {
            const isFav = result.some(o => o.id == item.id)
            parsedRepos.push({
              id: item.id.toString(),
              fullName: item.full_name,
              url: item.url,
              createdAt: item.created_at,
              language: item.language,
              stargazersCount: item.stargazers_count,
              avatarUrl: item.owner.avatar_url,
              isFav: isFav
            })
          })
        } else {
          setData([])
        }
        setData(parsedRepos)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
        setError(error)
      })

  }

  return { fetchData, data, loading, error }
}