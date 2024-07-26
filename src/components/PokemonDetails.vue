<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore} from '@/stores/app'

const appStore = useAppStore()
const { search } = storeToRefs(appStore)

function goHome() {
  search.value = ''
}
</script>

<template>
  <v-container>
    <v-row v-if="search.name">
      <v-col cols="6" md="6">
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            :src="search.img"
          >
            <v-card-title class="text-capitalize">{{ search.name }}</v-card-title>
          </v-img>
          <v-card-subtitle class="mt-3">Types:</v-card-subtitle>
          <v-card-text>
            <v-chip v-for="type in search.types" :key="type" color="blue-lighten-5">
              {{ type.type.name }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="6">
        <v-card class="mx-auto" max-width="400" variant="elevated">
          <v-card-text>
            <p class="text-subtitle-1 text-light-green-darken-1">Height: </p>
            <div class="text-h5 mb-2"> {{ search.height }} m</div>
            <div class="text-subtitle-1 text-light-green-darken-1">Weight: </div>
            <div class="text-h5 mb-4">{{ search.weight }} kg</div>

            <div class="text-subtitle-1 text-blue-lighten-1">Abilities</div>
            <p v-for="ability in search.abilities" :key="ability" class="text-h5 mb-2 text-capitalize">
              {{ ability.ability.name }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else class="text-center">
      <v-col cols="12">
        <h1 class="my-5" variant="h1">
          404
        </h1>
        <h5 class="mb-5" variant="h5">
          Page Not Found
        </h5>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col cols="12">
        <v-btn
          color="primary"
          prepend-icon="mdi-arrow-left"
          variant="outlined"
          @click="goHome">
          Regresar a todos los Pokemon
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass">

</style>
