<template>
  <div class="q-mb-md">
    <q-carousel
      autoplay
      infinite
      arrows
      animated
      v-model="slide"
      height="60vh"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      keep-alive
      :fullscreen="fullScreen"
      @dblclick="toggleFullScreen"
    >
      <q-carousel-slide name="first" :img-src="this.img1">
        <div class="absolute-bottom custom-caption">
          <div class="text-h6">
            <q-icon name="fas fa-handshake" size="md" /><br />
            WELCOME TO BAORIAT AGENCIES
          </div>
          <div class="text-subtitle1">
            Buy or sell Land, Homes or Commercial Buildings in Uasin Gishu
            County. You can also view properties available for sale
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="second" :img-src="this.img2">
        <div class="absolute-bottom custom-caption">
          <div class="text-h6">
            <q-icon name="fas fa-seedling" size="md" /> <br />
            LAND
          </div>
          <div class="text-subtitle1">
            Buy or sell land from farmers and other agents within Uasin-Gishu
            County
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="third" :img-src="this.img3">
        <div class="absolute-bottom custom-caption">
          <div class="text-h6">
            <q-icon name="fas fa-home" size="md" /> <br />
            HOMES
          </div>
          <div class="text-subtitle1">
            Buy or rent an exquisite home from owners or real-estate agents in
            Uasin-Gishu county
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="fourth" :img-src="this.img4">
        <div class="absolute-bottom custom-caption">
          <div class="text-h6">
            <q-icon name="fas fa-building" size="md" /> <br />
            COMMERCIAL BUIDINGS
          </div>
          <div class="text-subtitle1">
            Acquire, sell or view commercial buildings within Uasin Gishu county
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="fifth" :img-src="this.img5">
        <div class="absolute-bottom custom-caption">
          <div class="text-h6">
            <q-icon name="fas fa-ribbon" size="md" /> <br />
            PROFESSIONAL SERVICES
          </div>
          <div class="text-subtitle1">
            We can connect you to a broad range of professionals in the real
            estate sector within Uasin Gishu county like surveyors, Extension
            officers and real estate agents.
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="sixth" :img-src="this.img6">
        <div class="absolute-bottom custom-caption">
          <div class="text-h6">
            <q-icon name="eva-gift-outline" size="md" /> <br />
            BUSINESSES
          </div>
          <div class="text-subtitle1">
            For the entrepreneurs, you can acquire a business premise or sell
            your own business to other entrepreneurs all aroud Uasin Gishu
            county.
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="seventh" :img-src="this.img7">
        <div class="absolute-bottom custom-caption">
          <div class="text-h6">
            <q-icon name="fas fa-edit" size="md" /> <br />
            SELL AN ASSET
          </div>
          <div class="text-subtitle1">
            You can sell any home, business, commercial building or piece of
            land within Uasin Gishu county and find buyers on our website
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="eighth" :img-src="this.img8">
        <div class="absolute-bottom custom-caption">
          <div class="text-h6">
            <q-icon name="fas fa-blog" size="md" /> <br />
            OUR BLOG
          </div>
          <div class="text-subtitle1">
            Visit our blog and read the articles our team as written
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
  <div class="q-mt-md">
    <q-separator color="" />
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
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

    var img6 =
      'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80';

    var img7 =
      'https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YnVzaW5lc3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';

    var img8 =
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80';

    console.log(img1);

    return {
      slide: ref('first'),
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      fullScreen: ref(false),
    };
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
