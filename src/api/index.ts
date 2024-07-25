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

export async function saveFavorite (pokemon: string): Promise<AxiosResponse> {
  console.log('pokemon', pokemon)
  return api.post('/api/favorito', { 'pokemon_id' : pokemon })
}
