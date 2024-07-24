// Utilities
import { Pokemon, PokemonItem } from '@/types/pokemon'
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchPokemon } from '@/api';

export const useAppStore = defineStore('app', () => {
  const pokemon = ref([])
  const next = ref(null)
  const previous = ref(null)
  const cardPokemon = computed(() => {
    return pokemon.value.map((poke: Pokemon): PokemonItem => {
      const id = poke.url.split('/')[6].padStart(3, '0')
      const imageUrl = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${id}.png`
      // const proxyUrl = `http://localhost/image-proxy?url=${encodeURIComponent(imageUrl)}`;
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
    console.log('response', response.data.data);
    pokemon.value = response.data.data.results
    next.value = response.data.data.next
    previous.value = response.data.data.previous
  }

  return { pokemon, setPokemon, cardPokemon, next, previous }
});
