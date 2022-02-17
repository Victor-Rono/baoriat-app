<!--quasar build -m cordova -T android --release -- --packageType=bundle-->
<template>
  <q-layout view="hHh LpR fFf">
    <q-header
      class="text-primary"
      id="topNav"
      :class="[darkMode ? 'bg-white text-black' : 'bg-dark text-grey-1 ']"
      elevated
    >
      <q-toolbar class="constrained">
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
          class="text-primary"
        />

        <q-toolbar-title
          class="text-primary"
          style="cursor: pointer"
          @click="home"
        >
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar> -->

          <div class="row myselector">
            <div class="col">Baoriat</div>
            <div class="col">
              <q-btn
                icon="phone"
                class="small-screen-only"
                color="positive"
                flat
                dense
                round
                no-caps
                @click="
                  this.confirmDialog(
                    'Do you want to call Baoriat Agencies now?',
                    'phone',
                    'primary',
                    'call'
                  )
                "
              />

              <q-btn
                icon="phone"
                class="large-screen-only"
                color="positive"
                flat
                dense
                label="Call Us"
                no-caps
                @click="
                  this.confirmDialog(
                    'Do you want to call Baoriat Agencies now?',
                    'phone',
                    'primary',
                    'call'
                  )
                "
              />
            </div>
          </div>
        </q-toolbar-title>

        <q-btn
          v-if="$route.fullPath != '/search'"
          round
          flat
          icon="search"
          size="md"
          class="q-mr-md text-primary"
          to="/search"
        />

        <q-btn
          v-if="$route.fullPath == '/search'"
          round
          flat
          icon="fas fa-arrow-left"
          size="md"
          class="q-mr-md text-primary"
          @click="$router.go(-1)"
        />

        <q-btn
          size="md"
          flat
          class="q-mr-md"
          round
          icon="far fa-user"
          @click="toggleRightDrawer"
          v-if="
            $route.fullPath != '/signup' &&
            $route.fullPath != '/login' &&
            !this.$store.state.myAuth
          "
        />

        <q-avatar
          size="lg"
          flat
          class="q-mr-md"
          round
          @click="toggleRightDrawer"
          v-if="
            $route.fullPath != '/signup' &&
            $route.fullPath != '/login' &&
            this.$store.state.myAuth
          "
        >
          <img :src="this.$store.state.myAuth.data().profilePhoto" />
        </q-avatar>
        <y
          v-if="this.$store.state.myAuth && this.$store.state.unread.length > 0"
          @click="assignedTo('messages')"
        >
          <q-icon
            name="eva-message-circle-outline"
            color="positive"
            size="sm"
            round
            flat
          />x {{ this.$store.state.unread.length }}
        </y>

        <y
          v-if="this.$store.state.myAuth && this.$store.state.unread.length < 1"
          @click="assignedTo('messages')"
        >
          <q-icon
            name="eva-message-circle-outline"
            color="light-blue-9"
            size="sm"
            round
            flat
          />
        </y>
        <q-btn
          class="q-ml-lg"
          icon="eva-moon"
          @click="modeToggle"
          round
          size="md"
          v-if="this.darkMode"
          flat
          dense
        />
        <q-btn
          class="q-ml-lg"
          icon="eva-sun-outline"
          @click="modeToggle"
          color="grey-1"
          round
          size="md"
          v-if="!this.darkMode"
          flat
          dense
        />
      </q-toolbar>

      <!-- <q-tabs align="right" class="lt-sm" v-if="searchMenu">
        <q-btn
          size="md"
          flat
          class="q-mx-md text-red-14"
          icon="fas fa-arrow-left"
          @click="searchMenuToggle"
        />

        <q-input
          type="text"
          v-model="searchInput"
          label="search"
          maxlength="30"
          class="q-pb-sm q-ml-lg"
          dense
          clearable
          autofocus
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-tabs> -->
      <q-tabs
        dense
        v-if="$route.fullPath != '/search'"
        align="center"
        class="text-body1 large-screen-only constrained"
      >
        <y v-for="tab in this.myTabs">
          <q-route-tab :to="tab.to" :label="tab.label" :icon="tab.icon" />
        </y>
        <a
          href="https://baoriat.blogspot.com"
          target="blank"
          class="text-light-blue-8"
          style="text-decoration: none"
          ><q-route-tab label="blog" icon="fas fa-blog"
        /></a>
      </q-tabs>

      <q-tabs
        dense
        v-if="$route.fullPath != '/search'"
        align="center"
        class="small-screen-only constrained"
        no-caps
        mobile-arrows
      >
        <y v-for="tab in this.myTabs">
          <q-route-tab :to="tab.to">
            <q-icon :name="tab.icon" size="xs" />
            {{ tab.label }}
          </q-route-tab>
        </y>
        <a
          href="https://baoriat.blogspot.com"
          target="blank"
          class="text-light-blue-8"
          style="text-decoration: none"
          ><q-route-tab label="blog" icon="fas fa-blog"
        /></a>
      </q-tabs>
    </q-header>

    <!-- left drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      behavior="mobile"
      elevated
      :width="230"
    >
      <!-- drawer content -->
      <div class="q-pa-md" style="max-width: 350px">
        <q-toolbar-title class="text-primary">
          <q-btn
            class="text-primary"
            icon="menu"
            @click="this.toggleLeftDrawer"
            flat
          />

          <y @click="home" style="cursor: pointer">Baoriat</y>
        </q-toolbar-title>
        <q-list class="q-mt-xl">
          <y v-for="tab in this.myTabs">
            <q-item clickable v-ripple :to="tab.to" class="">
              <q-item-section avatar>
                <q-icon color="" :name="tab.icon" size="sm" />
              </q-item-section>

              <q-item-section>{{ tab.label }}</q-item-section>
            </q-item>
          </y>

          <a
            href="https://baoriat.blogspot.com"
            target="blank"
            style="text-decoration: none"
            class="text-light-blue-9"
          >
            <q-item clickable v-ripple class="">
              <q-item-section avatar>
                <q-icon color="" name="fas fa-blog" size="sm" />
              </q-item-section>

              <q-item-section>Blog</q-item-section>
            </q-item>
          </a>
        </q-list>
      </div>
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      behavior="mobile"
      elevated
      class=""
    >
      <!-- drawer content -->
      <div class="row justify-center q-my-md">
        <div v-if="this.$store.state.myAuth" class="q-pa-md" @click="profile">
          <div class="profile">
            <q-img
              class="profile-pic2"
              :src="this.$store.state.myAuth.data().profilePhoto"
            />

            <div class="row justify-center q-pa-xs">
              <p class="text-light-blue-9 text-h6">
                {{
                  this.$store.state.myAuth.data().firstName +
                  ' ' +
                  this.$store.state.myAuth.data().surName
                }}
              </p>
            </div>

            <div class="row justify-center q-pb-xs">
              <p class="text-primary text-caption">
                @{{ this.$store.state.myAuth.data().username }}
              </p>
            </div>
          </div>
        </div>

        <q-btn
          v-if="this.$store.state.myAuth"
          class="myselector bg-primary text-white"
          icon="fas fa-user"
          label="logout"
          @click="this.$store.dispatch('logout')"
        />

        <q-btn
          v-if="
            !this.$store.state.myAuth &&
            $route.fullPath != '/signup' &&
            $route.fullPath != '/login'
          "
          class="myselector bg-light-blue-9 text-white"
          icon="fas fa-user"
          label="login"
          to="/login"
        />

        <div class="q-ma-md">
          <!-- {{ $store.state?.myAuth }} -->
        </div>
      </div>
    </q-drawer>

    <q-page-container class="q-pb-xl">
      <!-- <keep-alive> -->
      <router-view />
      <!-- </keep-alive> -->
    </q-page-container>

    <!-- footer -->
    <!-- <q-footer elevated class="bg-white lt-sm">
      <q-toolbar>
        <q-item-section class="q-pl-xl">
          <q-input
          type="text"
            v-model="searchInput"
            label="search"
            maxlength="30"
            class="q-py-sm"
            rounded
            outlined
            dense
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-item-section>
      </q-toolbar>
    </q-footer> -->
  </q-layout>

  <q-dialog v-model="confirm" position="top">
    <q-card>
      <q-card-section class="row justify-center">
        <q-avatar
          :icon="this.dialogIcon"
          :color="this.dialogColor"
          text-color="white"
        />
        <span class="q-ml-sm text-center">{{ this.dialogMessage }}</span>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          flat
          icon="check"
          class="bg-positive text-white q-mr-lg"
          @click="callUs()"
          v-close-popup
        />
        <q-btn
          flat
          icon="close"
          class="bg-negative text-white q-ml-lg"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
// import { ref } from 'vue';
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useQuasar } from 'quasar';
import { mapGetters, useStore } from 'vuex';

import { useRouter, useRoute } from 'vue-router';
import firebase from 'firebase';
import { db, auth, storage, db2 } from '../firebase';

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    var isTabOpen = ref(false);
    var searchMenu = ref(false);
    // var Mypath = ref($route.fullPath);
    // this.$router.currentRoute.query.id
    const user = firebase.auth().currentUser;
    const profilePhoto = '';
    // console.log($store.state.name);
    const $q = useQuasar();
    const search = ref(false);

    $q.dark.set(!JSON.parse(localStorage.getItem('darkMode')));

    //Routes
    const router = useRouter();
    const route = useRoute();

    // onBeforeMount(() => {
    //   firebase.auth().onAuthStateChanged((user) => {
    //     if (!user && $route.fullPath != '/search') {
    //       router.replace('/');
    //     }
    //   });
    // });

    return {
      prompt: ref(false),
      // unread: ref([]),
      searchInput: '',

      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      qTab() {
        this.isTabOpen = !this.isTabOpen;
        console.log(isTabOpen);
      },
      darkMode: ref(JSON.parse(localStorage.getItem('darkMode'))),
      toggleValue: ref(!JSON.parse(localStorage.getItem('darkMode'))),
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
        // this.searchInput = '';
      },
    };
  },

  computed: {
    tasks() {
      return this.$store.state('tasks');
      console.log(this.$store.state('tasks'));
    },
  },

  data() {
    return {
      myPath: this.$route.fullPath,
      unread: ref(false),
      dialogMessage: ref(false),
      dialogIcon: ref(false),
      dialogColor: ref(false),
      dialogMethod: ref(false),
      confirm: ref(false),
      myTabs: [
        {
          to: '/about',
          label: 'About us',
          icon: 'fas fa-question',
          className: '',
        },
        {
          to: '/sell',
          label: 'sell',
          icon: 'fas fa-edit',
          className: '',
        },

        {
          to: '/land',
          label: 'land',
          icon: 'fas fa-seedling',
          className: '',
        },
        {
          to: '/homes',
          label: 'homes',
          icon: 'fas fa-home',
          className: '',
        },

        {
          to: '/buildings',
          label: 'buildings',
          icon: 'fas fa-building',
          className: '',
        },
        {
          to: '/services',
          label: 'services',
          icon: 'fas fa-ribbon',
          className: '',
        },

        {
          to: '/businesses',
          label: 'businesses',
          icon: 'eva-gift-outline',
          className: '',
        },

        {
          to: '/privacy',
          label: 'Privacy',
          icon: 'fas fa-lock',
          className: '',
        },
      ],
    };
  },

  methods: {
    qTab() {
      console.log('FFF');
    },

    callUs() {
      var phone = '+254721554937';
      // console.log(phone)
      window.location.assign('tel:' + phone);
      // console.log("+254")
    },

    confirmDialog(a, b, c, d) {
      this.dialogMessage = a;
      this.dialogIcon = b;
      this.dialogColor = c;
      this.dialogMethod = d;
      this.confirm = true;
    },

    assignedTo(x) {
      this.$router.push(x);
    },
    profile() {
      window.location.assign('/#/profile');
    },
    logout() {
      auth.signOut().then((res) => {
        // console.log(res);
        // this.$store.commit('authenticator', null);
      });
      this.$store.commit('authenticator');
    },

    home() {
      window.location.assign('/#/');
      // console.log('');
    },

    clearSearch() {
      this.searchInput = '';
    },

    toggleDark() {
      this.$q.dark.toggle();
      this.darkMode = !this.darkMode;
      this.toggleValue = !this.toggleValue;
      this.$store.dispatch('darkMode', this.darkMode);
      //start

      // Put the object into storage
      localStorage.setItem('darkMode', JSON.stringify(this.darkMode));

      // Retrieve the object from storage
    },

    modeToggle() {
      this.$q.dark.toggle();
      this.darkMode = !this.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
      this.$store.commit('darkMode', this.darkMode);
    },

    getChats(x) {
      // console.log("chats")
      db2.ref('chats/' + x + '/chats').on('child_added', (snapshot) => {
        var chats = snapshot.val();
        var last = Object.keys(chats).length - 1;
        chats.key = snapshot.key;
        chats.name = chats[Object.keys(chats)[0]].recipient;
        chats.username = chats[Object.keys(chats)[0]].username;
        chats.status = chats[Object.keys(chats)[last]].status;

        function upsert(array, element) {
          // (1)
          const i = array.findIndex((_element) => _element.key === element.key);
          if (i > -1) {
            array[i] = element;
          } else {
            array.unshift(element);
          }
          return array;
        }

        // var userId = snapshot.key
        const i = this.unread.findIndex(
          (_element) => _element.key === chats.key
        );
        if (chats.status == 'unread') {
          console.log(chats);
          if (i > -1) {
            this.unread[i] = chats;
          } else {
            this.unread.unshift(chats);
            // this.$store.dispatch('pushChat', element);
            // this.unread += 1;
            // console.log(element);
          }
        }
        // return array;
        // console.log(chats.date);
        // upsert(this.unread, chats);
        // upsert2(this.unread, chats);
      });
    },
  },

  mounted() {
    if (JSON.parse(localStorage.getItem('notFirstTime')) === null) {
      localStorage.setItem('darkMode', JSON.stringify(false));
      localStorage.setItem('notFirstTime', JSON.stringify(false));
      this.toggleDark();
      console.log('TOGGLED');
    }

    // db2.ref('chats').on('child_added', (snapshot) => {
    //   var chats = snapshot.val;
    //   console.log('chats');
    //   console.log(chats);
    // });
    setInterval((t) => {
      // this.getChats(this.$store.state.authId);
      this.$store.dispatch('getChats', this.$store.state.authId);
      // this.unread = this.$store.state.unread;
      // console.log(this.$store.state.unread.length);
    }, 65000);
    this.$store.dispatch('getChats', this.$store.state.authId);

    this.$store.dispatch('getData');
    this.$store.dispatch('getPosts');
    var chats = this.$store.state.unread;
    // console.log(chats[0].key);
    this.getChats(this.$store.state.authId);
    // this.$store.dispatch('darkMode', this.darkMode);
    // firebase.auth().onAuthStateChanged((x) => {
    //   if (x) {
    //     // User is signed in.
    //     this.user = x.uid;

    //     db.collection('users')
    //       .where('uid', '==', x.uid)
    //       .get()
    //       .then(function (querySnapshot) {
    //         querySnapshot.forEach(function (doc) {
    //           // doc.data() is never undefined for query doc snapshots
    //           console.log(doc.id, ' => ', doc.data());

    //           localStorage.setItem('myAuth', JSON.stringify(doc.data()));
    //         });
    //       })

    //       .catch(function (error) {
    //         console.log('Error getting documents: ', error);
    //       });
    //   } else {
    //     // User is signed out.
    //     this.user = x;
    //   }
    // });
  },
};
</script>

<style scoped>
#topNav {
  position: fixed;
  top: 0;
}
</style>
