<template>
  <q-card class="q-pt-md" style="">
    <!-- <q-card-actions align="right" class="fi">
      <q-btn
        v-close-popup
        flat
        color="primary"
        size="md"
        class="q-mr-lg"
        round
        icon="close"
      />
    </q-card-actions> -->

    <q-carousel
      mobile-arrows
      infinite
      autoplay
      arrows
      animated
      v-model="slide"
      height="70vh"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      keep-alive
      :fullscreen="fullScreen"
      @dblclick="toggleFullScreen"
      class="extra-constrained2"
    >
      <q-carousel-slide name="first" :img-src="myDoc?.data().imageUrl">
      </q-carousel-slide>
      <q-carousel-slide name="second" :img-src="myDoc?.data().imageUrl2">
      </q-carousel-slide>
      <q-carousel-slide name="third" :img-src="myDoc?.data().imageUrl3">
      </q-carousel-slide>
      <q-carousel-slide name="fourth" :img-src="myDoc?.data().imageUrl4">
      </q-carousel-slide>
      <q-carousel-slide name="fifth" :img-src="myDoc?.data().imageUrl5">
      </q-carousel-slide>
    </q-carousel>

    <div class="q-pa-md extra-constrained">
      <div class="row justify-center">
        👉🏼👉🏼 Double tap image for full screen
      </div>
      <q-card-section>
        <q-avatar size="4rem">
          <img :src="myDoc?.data().profilePhoto" />
        </q-avatar>

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis text-primary">
            @{{ myDoc?.data().username }}
          </div>
          <div
            class="
              col-auto
              text-grey text-caption
              q-pt-md
              row
              no-wrap
              items-center
            "
          ></div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1 text-light-blue-9">
          <u v-if="myDoc?.data().category != 'Service'">{{
            myDoc?.data().category + ': ' + myDoc?.data().purpose
          }}</u>
          <u v-if="myDoc?.data().category == 'Service'">{{
            myDoc?.data().category + ': ' + myDoc?.data().profession
          }}</u>
        </div>
        <div class="text-subtitle1">
          {{ myDoc?.data().description }}
        </div>
        <y class="text-h6 text-primary" @click="copyPhone">
          <q-icon name="phone" /> {{ myDoc?.data().phoneNumber }}
        </y>

        <div class="text-subtitle1 q-my-md">
          You can copy this link and share it on whatsapp, facebook, instagram
          etc... <br />
          <q-btn
            class="bg-light-blue-9 text-white"
            icon="fas fa-copy"
            label="Copy link"
            @click="this.copyLink"
            v-if="!this.copied"
          />

          <q-btn
            class="text-positive"
            icon="check"
            label="link copied"
            v-if="this.copied"
            flat
          />
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn label="close" v-close-popup icon="close" color="primary" />
      </q-card-section>

      <q-card
        v-if="this.myDoc.data().userId == $store.state.myAuth?.data().uid"
        class="q-pa-md"
        bordered
        style="border: 1px solid red"
      >
        <div class="q-ma-md" v-if="!deletion">
          <p class="">NOTE: Once a post is deleted it cannot be restored</p>
          <div class="row">
            <q-btn
              @click="this.deletion = true"
              label="DELETE THIS POST"
              icon="fas fa-trash"
              class="bg-primary text-white"
            />
          </div>
        </div>
        <div class="q-ma-md" v-if="deletion">
          <p>Are you sure you want to delete this post?</p>

          <div class="row">
            <q-btn
              class="bg-primary text-white q-mr-md"
              @click="this.deleteDoc(myDoc)"
              label="Yes"
              icon="fas fa-trash"
            />
            <q-btn
              class="bg-light-blue-9 text-white q-ml-md"
              round
              icon="close"
              @click="this.deletion = false"
            />
          </div>
        </div>
      </q-card>
    </div>
    <q-separator />
  </q-card>
</template>

<script>
import { ref } from 'vue';
import firebase from 'firebase';
import { db, auth, storage } from '../firebase';
export default {
  name: 'Asset',
  setup() {
    var img1 = 'https://cdn.quasar.dev/img/mountains.jpg';

    var img2 =
      'https://images.unsplash.com/photo-1486328228599-85db4443971f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80';

    var img3 =
      'https://images.pexels.com/photos/1486785/pexels-photo-1486785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

    var img4 =
      'https://images.unsplash.com/photo-1601783210890-d921f8d008b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=871&q=80';

    var img5 =
      'https://images.unsplash.com/photo-1564868480822-32f714a0e763?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80';

    return {
      slide: ref('first'),
      img1,
      img2,
      img3,
      img4,
      img5,
      visible: ref(true),
      fullScreen: ref(false),
      myDoc: ref(null),
      copied: ref(false),
    };
  },

  mounted() {
    setTimeout(() => {
      this.visible = false;
    }, this.$store.state.spinnerTime * 2);

    // this.$route.query.t
    var id = this.$route.query.t;
    db.collection('posts')
      .doc(id)
      .get()
      .then((result) => {
        console.log(result.data());
        this.myDoc = result;
      })
      .catch((err) => {});
  },

  methods: {
    toggleFullScreen() {
      this.fullScreen = !this.fullScreen;
    },
  },
};
</script>

<style lang="css" scoped>
.custom-caption {
  text-align: center;
  padding: 12px;
  color: rgb(196, 248, 9);
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
