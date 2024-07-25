<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { storeToRefs } from 'pinia'
  import { useAppStore} from '@/stores/app'

  const { t } = useI18n()
  const appStore = useAppStore()
  const { setPokemon, addFavorite } = appStore
  const { cardPokemon } = storeToRefs(appStore)

  async function toggleFavorite(pokemon: string) {
    console.log('toggleFavorite', pokemon)
    await addFavorite(pokemon)
  }

  onBeforeMount(async () => {
    console.log('PokemonList mounted')
    await setPokemon()
  })

</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>{{ t('title') }}</h1>
      </v-col>
    </v-row>

    <v-row v-if="cardPokemon.length == 0">
      <v-col cols="12">
        <v-progress-linear indeterminate></v-progress-linear>
      </v-col>
    </v-row>

    <v-row v-else>
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
          <template v-slot:append>
            <v-icon
              color="red-lighten-1"
              icon="mdi-heart-outline"
              @click="toggleFavorite(pokemon.id)"
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
            <v-btn color="blue-lighten-3 accent-4">Detalles</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass"></style>
