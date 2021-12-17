<template onbeforeunload="HandleBackFunctionality()">
  <q-card
    class="my-card"
    style="width: 90vw"
    v-ripple
    bordered
    @click="detectHistory"
  >
    <q-card-section>
      <div class="q-py-none q-my-none">
        <q-avatar size="lg">
          <img
            :src="myDoc.data()?.profilePhoto"
            style="object-fit: cover"
            v-if="myDoc.data()?.profilePhoto"
          />

          <img
            :src="myDoc.data()?.imageUrl"
            style="object-fit: cover"
            v-if="!myDoc.data()?.profilePhoto"
          />
          <!-- <q-icon name="home" /> -->
        </q-avatar>
        <tag class="q-ml-md text-primary text-caption text-bold"
          >@{{ myDoc.data()?.username }}</tag
        >
      </div>
    </q-card-section>

    <q-img :src="myDoc.data()?.imageUrl" height="245px" />

    <q-card-section class="q-py-md">
      <div class="row no-wrap items-center">
        <div class="col text-body1 text-light-blue-9 ellipsis q-mb-none">
          <y v-if="myDoc.data()?.category != 'Service'"
            >{{ myDoc.data().category + ': ' + myDoc.data().purpose }}
            <y v-if="myDoc.data().fullDate" class="text-positive text-bold">
              {{ myDoc.data()?.fullDate }}</y
            ></y
          >
          <y v-if="myDoc.data().category == 'Service'"
            >{{ myDoc.data().category + ': ' + myDoc.data().profession }}
            <y v-if="myDoc.data().fullDate" class="text-positive text-bold">
              {{ myDoc.data()?.fullDate }}</y
            ></y
          >
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-caption">
        {{ myDoc.data().description.substring(0, 20)
        }}<y class="text-light-blue-9">...see more</y>
      </div>
    </q-card-section>
    <div class="text-caption text-positive" v-if="myDoc.data().fullDate"></div>
    <q-card-section> </q-card-section>
    <q-dialog maximized v-model="layout">
      <q-card class="" style="">
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
          mobile-arrows
          infinite
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
          style="border: 1px solid grey"
          class="q-ma-xs extra-constrained2"
        >
          <q-carousel-slide name="first" :img-src="myDoc.data().imageUrl">
          </q-carousel-slide>
          <q-carousel-slide name="second" :img-src="myDoc.data().imageUrl2">
          </q-carousel-slide>
          <q-carousel-slide name="third" :img-src="myDoc.data().imageUrl3">
          </q-carousel-slide>
          <q-carousel-slide name="fourth" :img-src="myDoc.data().imageUrl4">
          </q-carousel-slide>
          <q-carousel-slide name="fifth" :img-src="myDoc.data().imageUrl5">
          </q-carousel-slide>
        </q-carousel>

        <div class="q-pa-md extra-constrained">
          <div class="row justify-center">
            👉🏼👉🏼 Double tap image for full screen
          </div>
          <q-card-section>
            <q-avatar size="4rem">
              <img
                :src="myDoc.data()?.profilePhoto"
                style="object-fit: cover"
                v-if="myDoc.data()?.profilePhoto"
              />

              <img
                :src="myDoc.data()?.imageUrl"
                style="object-fit: cover"
                v-if="!myDoc.data()?.profilePhoto"
              />
            </q-avatar>

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis text-primary">
                @{{ myDoc.data().username }}
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
              <u v-if="myDoc.data().category != 'Service'">{{
                myDoc.data().category + ': ' + myDoc.data().purpose
              }}</u>
              <u v-if="myDoc.data().category == 'Service'">{{
                myDoc.data().category + ': ' + myDoc.data().profession
              }}</u>
            </div>
            <div class="text-subtitle1">
              {{ myDoc.data().description }}
            </div>

            <div v-if="myDoc.data().fullDate" class="text-positive q-mb-md">
              Uploaded on:
              <y class="text-bold">{{ myDoc.data()?.fullDate }}</y>
            </div>

            <div class="q-py-md">
              <y
                class="text-h6 text-primary"
                v-if="!this.copiedPhone"
                @click="copyPhone"
              >
                <q-icon name="phone" /> {{ myDoc.data().phoneNumber }}
              </y>

              <y v-if="this.copiedPhone">
                <q-btn
                  class="text-positive"
                  icon="check"
                  label="Phone number copied"
                  flat
                />
              </y>

              <q-btn
                v-if="
                  this.myDoc.data().userId != $store.state.myAuth?.data().uid &&
                  !this.copiedPhone &&
                  !this.loginFirst
                "
                color="light-blue-9"
                icon="message"
                class="q-ml-md"
                label="send message"
                @click="this.openLink()"
              />

              <q-btn
                v-if="
                  this.myDoc.data().userId == $store.state.myAuth?.data().uid &&
                  !this.copiedPhone &&
                  !this.loginFirst
                "
                color="grey"
                icon="message"
                class="q-ml-md"
                label="send message"
                disable
              />

              <q-btn
                v-if="
                  this.myDoc.data().userId != $store.state.myAuth?.data().uid &&
                  !this.copiedPhone &&
                  this.loginFirst
                "
                class="bg-positive text-white q-ml-lg"
                icon="fas fa-user"
                label="Log In / Sign Up"
                to="/login"
                flat
              />
            </div>

            <div class="text-subtitle1 q-my-md">
              You can copy this link and share it on whatsapp, facebook,
              instagram etc... <br />
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
    </q-dialog>

    <q-dialog v-model="confirmDialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            :icon="this.dialogIcon"
            :color="dialogColor"
            class="text-white"
            size="sm"
          />
          <span class="q-ml-sm">{{ this.dialogMessage }}</span>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            flat
            label="OK"
            class="bg-light-blue-9 text-white"
            v-close-popup
          />
          <!-- <q-btn
                  flat
                  label="No"
                  class="bg-light-blue-9 text-white"
                  color=""
                  v-close-popup
                /> -->
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useQuasar } from 'quasar';
// const $q = useQuasar();
import Dialog from './Dialog.vue';
import { db, auth, storage } from '../../firebase';
// import { log } from 'console';
// import { setTimeout } from 'timers';
export default {
  name: 'Card',
  props: ['myDoc'],
  components: {
    Dialog,
  },
  setup() {
    // const $q = useQuasar();

    return {
      layout: ref(false),
      copied: ref(false),
      copiedPhone: ref(false),
      drawer: ref(false),
      drawerR: ref(false),
      slide: ref('first'),
      confirmDialog: ref(false),
      dialogMessage: ref(''),
      dialogIcon: ref(''),
      dialogColor: ref(''),
      myLink: ref(null),
      visible: ref(true),
      fullScreen: ref(false),
      deletion: ref(false),
      loginFirst: ref(false),
    };
  },

  data() {
    return {
      position: ref(this.$store.state.position),
    };
  },

  methods: {
    openLink() {
      if (this.$store.state.myAuth) {
        this.$router.push({
          path: 'chat',
          query: { q: this.myDoc.data().userId },
        });
      } else {
        // this.copiedPhone = true;
        this.loginFirst = true;
        setTimeout(() => {
          this.loginFirst = false;
        }, 19800);
      }
    },

    replaceRoute() {
      this.$router.push({ path: 'asset', query: { item: this.myDoc.id } });
    },
    formatted_date(x) {
      var result = '';
      var d = x;
      result +=
        d.getDate() +
        '/' +
        (d.getMonth() + 1) +
        '/' +
        d.getFullYear() +
        ' ' +
        d.getHours() +
        ':' +
        d.getMinutes();
      return result;
    },
    detectHistory() {
      // localStorage.setItem('position', JSON.stringify(window.pageYOffset));
      this.$store.commit('changePosition', window.pageYOffset);

      console.log(window.pageYOffset);
      var yOffset = window.pageYOffset;
      this.layout = true;
      // window.history.pushState({ id: 1 }, null, '?=' + yOffset);
      window.history.pushState({ id: 1 }, null, null);
    },

    deleteDoc(doc) {
      if (navigator.onLine) {
        this.$store.dispatch('deletePost', doc);
        this.$store.commit('modifyArray', doc);
        this.message('Deleting post....', 'check', 'positive');
        setTimeout(() => {
          this.refresh();
        }, 300);
      } else {
        this.message('No Internet', 'close', 'primary');
      }

      // db.collection('posts')
      //   .doc(doc.id)
      //   .delete()
      //   .then(() => {
      //     storage.refFromURL(doc.data().imageUrl).delete().
      //     storage.refFromURL(doc.data().imageUrl2).delete();
      //     storage.refFromURL(doc.data().imageUrl3).delete();
      //     storage.refFromURL(doc.data().imageUrl4).delete();
      //     storage.refFromURL(doc.data().imageUrl5).delete();
      //     this.message('Post Deleted Successfully', 'check', 'positive');
      //     // window.location.reload();
      //   })
      //   .catch((error) => {});
    },

    copyLink() {
      var link = 'https://baoriat.com/#/asset?t=' + this.myDoc.id;
      navigator.clipboard.writeText(link);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 1800);
    },

    copyPhone() {
      var phone = this.myDoc.data().phoneNumber;
      navigator.clipboard.writeText(phone);
      this.copiedPhone = true;
      setTimeout(() => {
        this.copiedPhone = false;
      }, 1800);
    },

    numberWithCommas(x) {
      if (!x) {
        return;
      }
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    message(m, n, o) {
      this.dialogMessage = m;
      this.dialogIcon = n;
      this.dialogColor = o;
      this.confirmDialog = true;
      this.layout = false;
    },

    refresh() {
      window.location.assign('/#/deleted');
    },

    toggleFullScreen() {
      this.fullScreen = !this.fullScreen;
    },
  },

  mounted() {
    var post = this.myDoc;
    this.myLink = 'https://baoriat.com/#/chat?q=' + this.myDoc.data().userId;
    function HandleBackFunctionality() {
      if (window.event) {
        if (window.event.clientX < 40 && window.event.clientY < 0) {
          alert('Browser back button is clicked...');
        } else {
          alert('Browser refresh button is clicked...');
        }
      } else {
        if (event.currentTarget.performance.navigation.type == 1) {
          alert('Browser refresh button is clicked...');
        }
        if (event.currentTarget.performance.navigation.type == 2) {
          alert('Browser back button is clicked...');
        }
      }
    }

    window.addEventListener('popstate', () => {
      var pos = this.$store.state.position;
      if (pos) {
        console.log(pos);
        window.scrollTo(0, pos);
      } else {
        console.log('false');
      }
    });
  },

  updated() {},
};
</script>

<style scoped>
* {
  cursor: pointer;
}
</style>
