<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore} from '@/stores/app'

const appStore = useAppStore()
const { search } = storeToRefs(appStore)

function goHome() {
  console.log('Go to Home')
}
</script>

<template>
  <v-container>
    <v-row v-if="search.name">
      <v-col cols="12" md="6">
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            :src="search.img"
          >
            <v-card-title>{{ search.name }}</v-card-title>
          </v-img>
          <v-card-text>
            <v-card-subtitle>Types:</v-card-subtitle>
            <v-chip v-for="type in search.types" :key="type">
              {{ type.type.name }}
            </v-chip>
            <div>Height: {{ search.height }} m</div>
            <div>Weight: {{ search.weight }} kg</div>

            <div v-for="ability in search.abilities" :key="ability">
              {{ ability }}
            </div>
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
