<template>
  <div class="row justify-center q-mt-xl" v-if="!this.$store.state.myAuth">
    <p class="q-pt-xl text-h6 text-light-blue-9">
      <q-btn class="bg-light-blue-9 text-white" to="/login" label="log in" />
    </p>
  </div>

  <div class="row justify-center" v-if="this.$store.state.myAuth">
    <div class="q-pa-md" v-if="this.unread.length > 0">
      <p class="q-ma-md text-h6 text-center text-positive">
        <u>Unread Messages</u>
      </p>

      <q-list class="q-my-sm">
        <div
          v-for="message in this.unread"
          class="q-ma-sm rnd"
          style="border: 1px solid green"
        >
          <q-separator />
          <q-item
            class="text-positive chat"
            clickable
            :to="'/chat?q=' + message?.key"
          >
            <q-item-section avatar>
              <q-avatar color="positive" text-color="white">
                {{ message.name?.charAt(0).toUpperCase() }}
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ message?.name }}</q-item-label>
              <q-item-label caption lines="1">{{
                message?.username
              }}</q-item-label>
            </q-item-section>

            <!-- <q-item-section class="" side>
              <p v-if="message?.online" class="text-positive">
                <q-icon name="check" /> Online
              </p>
              <p v-if="!message?.online" class="">
                <q-icon name="close" /> Offline
              </p>
            </q-item-section> -->
          </q-item>
        </div>
        <!-- <q-separator /> -->
      </q-list>
    </div>
  </div>

  <div class="row justify-center" v-if="this.$store.state.myAuth">
    <p
      class="q-mt-xl q-pa-md text-h6 text-light-blue-9"
      v-if="this.firebaseMessages.length < 1 && this.unread.length < 1"
    >
      You don't currently have any messages
    </p>

    <div class="q-pa-md" v-if="this.firebaseMessages.length > 0">
      <p class="q-ma-md text-h6 text-center text-light-blue-9">
        <u>All Messages</u>
      </p>

      <q-list class="q-my-sm">
        <div
          v-for="message in this.firebaseMessages"
          class="q-ma-sm rnd"
          style="border: 1px solid #256ea7"
        >
          <q-separator />
          <q-item
            class="text-light-blue-9 chat"
            clickable
            :to="'/chat?q=' + message?.key"
          >
            <q-item-section avatar>
              <q-avatar color="light-blue-9" text-color="white">
                {{ message.name?.charAt(0).toUpperCase() }}
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ message?.name }}</q-item-label>
              <q-item-label caption lines="1">{{
                message?.username
              }}</q-item-label>
            </q-item-section>

            <!-- <q-item-section class="" side>
              <p v-if="message?.online" class="text-positive">
                <q-icon name="check" /> Online
              </p>
              <p v-if="!message?.online" class="">
                <q-icon name="close" /> Offline
              </p>
            </q-item-section> -->
          </q-item>
        </div>
        <!-- <q-separator /> -->
      </q-list>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useQuasar } from 'quasar';
import firebase from 'firebase';

import { db, auth, storage, db2 } from 'src/firebase.js';

export default {
  name: 'Messages',
  setup() {
    return {
      // prev: ref(parseInt(JSON.parse(localStorage.getItem('lastVisit')))),
    };
  },
  data() {
    return {
      firebaseMessages: ref(
        this.$store.state.chats.filter((item) => item.status == 'read')
      ),
      unread: ref(this.$store.state.unread),
    };
  },

  methods: {
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

        function upsert2(array, element) {
          // (1)
          // var prev = JSON.parse(localStorage.getItem('lastVisit'));
          const i = array.findIndex((_element) => _element.key === element.key);
          if (element.status == 'unread') {
            if (i > -1) {
              array[i] = element;
            } else {
              array.unshift(element);
            }
          }
          return array;
        }
        // var userId = snapshot.key

        // console.log(chats.date);
        upsert(this.firebaseMessages, chats);
        upsert2(this.unread, chats);
      });
    },
  },

  mounted() {
    // this.$store.dispatch('getChats');
    // localStorage.setItem('lastVisit', JSON.stringify(Date.now()));

    // console.log('previous: ' + this.prev);
    // console.log('Now: ' + Date.now());
    // console.log(this.unread);
    var id = this.$store.state.authId;
    firebase.auth().onAuthStateChanged((x) => {
      if (x) {
        this.getChats(id);
      }
    });

    if (id) {
      this.getChats(id);
    }

    setTimeout(() => {
      if (this.firebaseMessages.length < 1) {
        this.firebaseMessages = this.$store.state.chats.filter(
          (item) => item.status == 'read'
        );
      }
      if (this.unread.length < 1) {
        this.unread = this.$store.state.unread;
      }
    }, 4500);
    // // this.firebaseMess
  },
};
</script>

<style lang="css" scoped>
.rnd {
  border-radius: 3px;
}
</style>
