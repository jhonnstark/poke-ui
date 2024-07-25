<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { storeToRefs } from 'pinia'
  import { useAppStore} from '@/stores/app'

  const { t } = useI18n()
  const appStore = useAppStore()
  const { setPokemon, addFavorite, loadNext, fetchPokemonByName } = appStore
  const { cardPokemon, search } = storeToRefs(appStore)
  const searchQuery = ref('')
  const loading = ref(false)

  async function performSearch() {
    console.log('Search query:', searchQuery.value)
    loading.value = true
    await fetchPokemonByName(searchQuery.value)
    loading.value = false
  }

  async function loadDetails(loadName: string) {
    loading.value = true
    await fetchPokemonByName(loadName)
    loading.value = false
  }

  async function toggleFavorite(pokemonId: number, isFavorite: boolean) {
    await addFavorite(pokemonId, isFavorite)
  }

  async function loadMore() {
    await loadNext()
  }

  onBeforeMount(async () => {
    await setPokemon()
  })

</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="mt-10">{{ t('title') }}</h1>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="5">
        <v-text-field
          v-model="searchQuery"
          clearable
          hide-details="auto"
          label="Buscar por nombre"
          :loading="loading"
          outlined
          prepend-icon="mdi-magnify"
          solo
          variant="underlined"
        ></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn
          color="primary"
          prepend-icon="mdi-magnify"
          variant="outlined"
          @click="performSearch"
        >
          Search
        </v-btn>
      </v-col>
    </v-row>

    <v-divider
      class="my-7"
      opacity="0"
      thickness="1"
    ></v-divider>

    <PokemonDetails v-if="search"></PokemonDetails>

    <v-row v-if="cardPokemon.length === 0 || loading">
      <v-col cols="12">
        <v-progress-linear indeterminate></v-progress-linear>
      </v-col>
    </v-row>

    <v-row v-else-if="search === '' && cardPokemon.length > 0 ">
      <v-col
        v-for="pokemon in cardPokemon"
        :key="pokemon.name"
        cols="12"
        md="4"
      >
        <v-card
          class="mx-auto"
          max-width="344"
          outlined
        >
          <template #append>
            <v-icon
              :color="pokemon.is_favorite ? 'red-accent-4' : 'red-lighten-5'"
              :icon="pokemon.is_favorite ? 'mdi-heart' : 'mdi-heart-outline'"
              @click="toggleFavorite(pokemon.id, pokemon.is_favorite)"
            ></v-icon>
          </template>

          <v-img
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            :src="pokemon.img"
          >
            <v-card-title>
              {{ pokemon.name }}
            </v-card-title>
          </v-img>

          <v-card-actions>
            <v-btn
              color="blue-lighten-3 accent-4"
              @click="loadDetails(pokemon.name)"
            >Detalles</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-btn
          append-icon="mdi-chevron-right"
          block
          color="red-lighten-2"
          elevation="8"
          text="Cargar Más"
          variant="outlined"
          @click="loadMore"
        ></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass"></style>
