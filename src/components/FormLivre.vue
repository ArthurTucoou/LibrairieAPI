<template>
  <form @submit.prevent="$emit('addL', livre)">
    Ajouter un livre :
    <input type="text" v-model="livre.titre" placeholder="Le titre" />
    <input type="number" v-model="livre.qtestock" placeholder="La quantité" />
    <input type="number" v-model="livre.prix" placeholder="Le prix" />

    <input type="submit" value="Valider" />
  </form>
</template>
<script setup>
import { reactive } from "vue";
import Livre from "../Livre.js";
const livre = reactive(Livre);
</script>