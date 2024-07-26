<script setup lang="ts">

</script>

<template>
  <v-app-bar app :elevation="12">
    <v-app-bar-title>
      <v-img
        class=""
        contain
        height="40px"
        src="@/assets/pokeapi.png"
      ></v-img>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only">
      <v-btn router text="Home" to="/">Home</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<style scoped lang="sass">

</style>
