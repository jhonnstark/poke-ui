// Utilities
import { Pokemon, PokemonItem } from '@/types/pokemon'
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchPokemon, saveFavorite } from '@/api';

export const useAppStore = defineStore('app', () => {
  const pokemon = ref([])
  const next = ref(null)
  const previous = ref(null)
  const cardPokemon = computed(() => {
    return pokemon.value.map((poke: Pokemon): PokemonItem => {
      const id = poke.url.split('/')[1]
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      return {
        name: poke.name,
        url: poke.url,
        img: imageUrl,
        id
      }
    })
  })

  async function setPokemon() {
    const response = await fetchPokemon()
    console.log('response', response)
    pokemon.value = response.data.results
    next.value = response.data.next
    previous.value = response.data.previous
  }

  async function addFavorite(pokemon: string) {
    const response = await saveFavorite(pokemon)
    console.log('response', response)
  }

  return { pokemon, setPokemon, cardPokemon, next, previous, addFavorite }
});
