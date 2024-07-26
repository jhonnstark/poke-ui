// Utilities
import { Pokemon, PokemonItem, PokemonDetails } from '@/types/pokemon'
import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  deleteFavorite,
  fetchPokemon,
  loadMore,
  loadPokemonByName,
  saveFavorite
} from '@/api';

export const useAppStore = defineStore('app', () => {
  const pokemon: Ref<Pokemon[]> = ref([])
  const next = ref(null)
  const previous = ref(null)
  const search: Ref<PokemonDetails | string> = ref('')

  const cardPokemon = computed(() => {
    return pokemon.value.map((poke: Pokemon): PokemonItem => {
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`
      return {
        name: poke.name,
        url: poke.url,
        img: imageUrl,
        id: poke.id,
        is_favorite: poke.is_favorito,
      }
    })
  })

  async function setPokemon() {
    const response = await fetchPokemon()
    pokemon.value = response.data.results
    next.value = response.data.next
    previous.value = response.data.previous
  }

  async function addFavorite(pokemonId: number, isFavorite: boolean) {
    let response;
    if (!isFavorite) {
      response = await saveFavorite(pokemonId)
    } else {
      response = await deleteFavorite(pokemonId)
    }
    pokemon.value = pokemon.value.map((poke: Pokemon) => {
      if (poke.id === pokemonId) {
        poke.is_favorito = !poke.is_favorito
      }
      return poke
    })
    console.log('response', response.data)
  }

  async function loadNext() {
    try {
      const response = await loadMore(next.value)
      pokemon.value = response.data.results
      next.value = response.data.next
      previous.value = response.data.previous
    } catch (error) {
      console.error('error', error)
    }
  }

  async function fetchPokemonByName(pokemonName: string) {
    pokemonName = pokemonName.toLowerCase()
    console.log('pokemonName', pokemonName)
    try {
      const response = await loadPokemonByName(pokemonName)
      search.value = response.data.data
      console.log('search', search.value)
    } catch (error) {
      search.value = 'Not found'
      console.error('error', error)
    }
  }

  return {
    pokemon,
    search,
    cardPokemon,
    next,
    previous,
    setPokemon,
    addFavorite,
    loadNext,
    fetchPokemonByName
  }
});
