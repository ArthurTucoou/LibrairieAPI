<template>
  <FormLivre @addL="addLivre" />

  <h3>Liste des livres</h3>
  <ul>
    <li v-for="livre in listeLivres" :key="[livre.id]">
      {{ livre.titre }} (quantité : {{ livre.qtestock }})
      <button @click="ajouterLivre(livre)">+</button>
      <button
        @click="
          livre.qtestock == 1 ? deleteLivre(livre.id) : retirerLivre(livre)
        "
      >
        -
      </button>
      <button @click="deleteLivre(livre.id)">Supprimer</button>
    </li>
  </ul>
</template>

<script setup>
import { reactive, watch } from "vue";
import Livre from "../Livre.js";
import FormLivre from "./FormLivre";
// const props = defineProps(["pcritere"]);
const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/4/livres";
const listeLivres = reactive([]);

// watch(props, (newprops) => {
//   searchLivres();
// });

function searchLivres() {
  const fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      listeLivres.splice(0, listeLivres.length);
      dataJSON.forEach((livre) => {
        listeLivres.push(
          new Livre(livre.id, livre.titre, livre.qtestock, livre.prix)
        );
      });
      console.log(listeLivres);
    })
    .catch((error) => {
      console.log(error);
    });
}

function addLivre(l) {
  console.log(l);

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      titre: l.titre,
      qtestock: l.qtestock,
      prix: l.prix,
    }),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      searchLivres();
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteLivre(index) {
  const fetchOptions = { method: "DELETE" };
  fetch(url + "/" + index, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      searchLivres();
    })
    .catch((error) => {
      console.log(error);
    });
}

function ajouterLivre(livre) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({
      id: livre.id,
      titre: livre.titre,
      qtestock: livre.qtestock + 1,
      prix: livre.prix,
    }),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      searchLivres();
    })
    .catch((error) => {
      console.log(error);
    });
}

function retirerLivre(livre) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({
      id: livre.id,
      titre: livre.titre,
      qtestock: livre.qtestock - 1,
      prix: livre.prix,
    }),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      searchLivres();
    })
    .catch((error) => {
      console.log(error);
    });
}

searchLivres();
</script>