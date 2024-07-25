import { api } from '@/plugins/axios'
import { AxiosResponse } from 'axios'

export async function fetchPokemon (offset = 0): Promise<AxiosResponse> {
  console.log('fetchPokemon baseURL', api.defaults.baseURL)
  const pokeResponse = await api.get('/api/pokemon', {
    params: {
      limit: 30,
      offset
    }
  })
  console.log('pokeResponse.status', pokeResponse.status);
  return pokeResponse
}

export async function saveFavorite (pokemon: number): Promise<AxiosResponse> {
  return api.post('/api/favorito', { 'pokemon_id' : pokemon })
}

export async function deleteFavorite (pokemon: number): Promise<AxiosResponse> {
  return api.delete('/api/favorito', { data: { 'pokemon_id' : pokemon } })
}

export async function loadMore(next: string | null): Promise<AxiosResponse<any, any>> {
  if (!next) return Promise.reject(new Error('No more'))
  return api.get(next)
}

export async function loadPokemonByName(name: string): Promise<AxiosResponse> {
  return api.get(`/api/pokemon/${name}`)
}
