<template>
  <!--Feed-->
  <div class="fullscreen text-center q-pa-md flex flex-center" v-if="visible">
    <q-spinner-ios class="q-my-xl custom-caption2" size="11rem" />
  </div>

  <div class="" v-show="!visible">
    <Carousel />
  </div>

  <div class="row justify-center q-mt-md q-mb-sm" v-if="!visible">
    <u class="text-h5 text-grey"
      ><y class="text-primary">Assets For</y>
      <y class="text-primary text-bold"> Sale/Leasing</y></u
    >
  </div>

  <div
    class="row justify-center"
    v-if="fromFirebase.length < 1 && networkError"
  >
    <p class="text-grey text-subtitle1 q-mt-xl">
      You might have a <y class="text-bold">slow internet connection</y>
    </p>
  </div>

  <div
    class="row justify-center q-mb-xl"
    v-if="fromFirebase.length < 1 && networkError"
  >
    <q-btn
      icon="refresh"
      class="text-primary"
      size="md"
      round
      @click="refresh"
    />
  </div>

  <div
    class="row justify-center q-pa-xs constrained"
    id="vue-cards-group"
    v-show="!visible"
  >
    <div v-if="fromFirebase.length < 1 && !networkError">
      <q-spinner-ios class="q-mb-xl custom-caption2" size="11rem" />
    </div>
    <div
      class="q-ma-md"
      id="vue-cards"
      v-for="doc in fromFirebase"
      v-if="fromFirebase.length > 0"
    >
      <Card :myDoc="doc" />
    </div>
  </div>
  <!--/Feed-->
</template>

<script>
import { formatDistance, subDays } from 'date-fns';
import Card from './components/Card.vue';
import Dialog from './components/Dialog.vue';
import Carousel from '../components/Carousel.vue';
import { defineComponent, ref, onBeforeMount } from 'vue';
// import firebase from "firebase";
// import VueScreenSize from 'vue-screen-size';
// import { db, auth, storage } from './firebase';
import { db, auth, storage } from 'src/firebase.js';

export default {
  name: 'PageHome',

  components: { Card, Carousel, Dialog },
  setup() {},
  data() {
    return {
      layout: ref(false),
      newContent: '',
      myWidth: window.innerWidth,
      fromFirebase: this.$store.state.fromFirebase,
      visible: true,
      networkError: false,
    };
  },

  methods: {
    relativeDate(value) {
      return formatDistance(value, new Date());
    },

    refresh() {
      window.location.reload();
    },

    firebaseConnect() {
      // firebase.auth().createUserWithEmailAndPassword();
    },

    addNewContent() {
      let newData = {
        content: this.newContent,
        date: Date.now(),
      };
      this.listings.unshift(newData);
      this.newContent = '';
    },
  },

  mounted() {
    setTimeout(() => {
      this.visible = false;
    }, this.$store.state.spinnerTime * 2);

    setTimeout(() => {
      this.networkError = true;
    }, 10500);

    var pos = this.$route.query.q;
    window.scrollTo(0, pos);
    setTimeout(() => {}, this.$store.state.spinnerTime * 2.1);

    // db.collection('posts').onSnapshot((querySnapshot) => {
    //   // var fromFirebase = [];
    //   querySnapshot.forEach((doc) => {
    //     this.fromFirebase.unshift(doc);
    //     // this.fromFirebase.push(doc);
    //   });
    //   console.log(this.fromFirebase);
    // });
  },
};
</script>

<style scoped>
.newContent textarea {
  font-size: 16px;
  line-height: 1.4 !important;
}

.labelContent {
  white-space: pre-line;
}

/* .my-card {

  max-width: 300px;
} */
</style>
