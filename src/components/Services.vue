<template>
  <!--Feed-->
  <div class="fullscreen text-center q-pa-md flex flex-center" v-if="visible">
    <q-spinner-ios class="q-my-xl custom-caption2" size="11rem" />
  </div>

  <div class="" v-show="!visible">
    <q-carousel
      infinite
      animated
      v-model="slide"
      height="60vh"
      transition-prev="slide-right"
      transition-next="slide-left"
      keep-alive
    >
      <q-carousel-slide
        name="first"
        img-src="https://images.unsplash.com/photo-1601783210890-d921f8d008b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=871&q=80"
      >
        <div class="absolute-bottom custom-caption">
          <div class="text-h6">
            <q-icon name="fas fa-ribbon" size="md" /><br />
            {{ this.ctgr }}
          </div>
          <!-- <div class="text-subtitle1">
            Buy or sell Land, Homes or Commercial Buildings in Uasin Gishu
            County. You can also view properties available for sale
          </div> -->
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>

  <div class="row justify-center q-mt-md q-mb-sm" v-if="!visible">
    <u class="text-h5 text-grey"
      ><y class="text-primary">{{ this.ctgr }}</y></u
    >
  </div>

  <div
    class="row justify-center"
    v-if="fromFirebase.length < 1 && networkError"
  >
    <p class="text-grey text-subtitle1 q-mt-xl">
      Couldn't find any <y class="text-bold"> {{ this.ctgr }},</y> Try again
      later.
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

  <div class="row q-pa-xs constrained" id="vue-cards-group" v-show="!visible">
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
import Card from '../pages/components/Card.vue';
// import Dialog from './components/Dialog.vue';
import Carousel from '../components/Carousel.vue';
import { defineComponent, ref, onBeforeMount } from 'vue';
// import firebase from "firebase";
// import VueScreenSize from 'vue-screen-size';
// import { db, auth, storage } from './firebase';
import { db, auth, storage } from 'src/firebase.js';

export default {
  name: 'PageHome',

  components: { Card, Carousel },
  setup() {},
  data() {
    return {
      layout: ref(false),
      ctgr: ref('Services'),
      slide: ref('first'),
      newContent: '',
      myWidth: window.innerWidth,
      fromFirebase: ref(
        this.$store.state.fromFirebase.filter(
          (item) => item.data().category == 'Service'
        )
      ),
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
    }, this.$store.state.spinnerTime);

    setTimeout(() => {
      this.networkError = true;
      if (this.fromFirebase.length < 1) {
        this.fromFirebase = this.$store.state.fromFirebase.filter(
          (item) => item.data().category == 'Service'
        );
      }
    }, 4500);

    setTimeout(() => {
      if (this.fromFirebase.length < 1) {
        this.fromFirebase = this.$store.state.fromFirebase.filter(
          (item) => item.data().category == 'Service'
        );
      }
    }, 6500);

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
