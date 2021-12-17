<template>
  <q-card class="extra-constrained2" style="">
    <q-card-actions align="right" class="fi">
      <q-btn
        v-close-popup
        flat
        color="primary"
        size="md"
        class="q-mr-lg"
        round
        icon="close"
      />
    </q-card-actions>
    <q-carousel
      autoplay
      infinite
      arrows
      animated
      v-model="slide"
      height="63vh"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      keep-alive
      :fullscreen="fullScreen"
      @dblclick="toggleFullScreen"
      class="extra-constrained2"
    >
      <q-carousel-slide name="first" :img-src="this.img1"> </q-carousel-slide>
      <q-carousel-slide name="second" :img-src="this.img2"> </q-carousel-slide>
      <q-carousel-slide name="third" :img-src="this.img3"> </q-carousel-slide>
      <q-carousel-slide name="fourth" :img-src="this.img4"> </q-carousel-slide>
      <q-carousel-slide name="fifth" :img-src="this.img5"> </q-carousel-slide>
    </q-carousel>

    <div class="q-pa-md extra-constrained2">
      <q-card-section>
        <!-- <q-btn
          fab
          color="primary"
          icon="place"
          style="top: 0; right: 12px; transform: translateY(-50%)"
        /> -->

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis"></div>
          <div
            class="
              col-auto
              text-grey text-caption
              q-pt-md
              row
              no-wrap
              items-center
            "
          >
            <!-- <q-icon name="place" />
            250 ft -->
          </div>
        </div>

        <q-rating v-model="stars" :max="5" size="32px" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          {{ myDoc.data().category + ':' + myDoc.data().purpose }}
        </div>
        <div class="text-subtitle1">
          {{ myDoc.descriptipon }}
        </div>
      </q-card-section>
    </div>
    <q-separator />
  </q-card>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'Dialog',
  props: ['post'],
  setup() {
    console.log(post);
    var img1 = 'https://cdn.quasar.dev/img/mountains.jpg';

    var img2 =
      'https://images.unsplash.com/photo-1486328228599-85db4443971f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80';

    var img3 =
      'https://images.pexels.com/photos/1486785/pexels-photo-1486785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

    var img4 =
      'https://images.unsplash.com/photo-1601783210890-d921f8d008b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=871&q=80';

    var img5 =
      'https://images.unsplash.com/photo-1564868480822-32f714a0e763?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80';
    const moreContent = ref(true);

    return {
      moreContent,
      contentSize: computed(() => (moreContent.value ? 150 : 5)),
      drawer: ref(false),
      drawerR: ref(false),
      slide: ref('first'),
      img1,
      img2,
      img3,
      img4,
      img5,
      visible: ref(true),
      fullScreen: ref(false),

      lorem:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!',
    };
  },

  methods: {
    toggleFullScreen() {
      this.fullScreen = !this.fullScreen;
    },

    data() {
      return {
        img: this.post.imgUrl,
      };
    },
  },
};
</script>
