<template>

<div class="row justify-center q-mt-lg" v-if="!this.$store.state.myAuth">
  <p class="q-pt-lg text-h6 text-light-blue-9">
    <q-btn class="bg-light-blue-9 text-white" to="/login" label="log in"/>
  </p>

</div>

  <q-form @submit="this.sendMessage()" class="row justify-center q-pa-md" v-if="this.$store.state.myAuth">
    <div class="q-pa-md">
      <p class="q-ma-md text-h6 text-center text-light-blue-9">
        {{ this.texter?.firstName }} {{ this.texter?.surName }}
        <p class="text-caption text-positive">{{ this.texter?.username }}</p>
      </p>

      <div flat class="q-pa-md justify-end">
        <q-card-section class="chat">

          <!-- <q-chat-message :name="message.from" :text="message.text" /> -->
        <y v-for="message in userData" class="q-pb-lg">
           <q-chat-message class="myselector" v-if="message.message.length >0  && message.from =='them'" :stamp="message.time" :name="this.texter.firstName + ' ' + this.texter.surName" :text="[message.message]" :sent="message.from == 'me'" />
            <q-chat-message class="myselector" v-if="message.message.length >0 && message.from =='me'" :stamp="message.time" :text="[message.message]" :sent="message.from == 'me'" name="You" />
          </y>


          <!-- <q-chat-message name="me" :text="['hey, how are you?']" sent />

          <q-chat-message name="me" :text="['hey, how are you?']" sent />
          <q-chat-message name="Jane" :text="['doing fine, how r you?']" />
          <q-chat-message name="me" :text="['hey, how are you?']" sent />
          <q-chat-message name="Jane" :text="['doing fine, how r you?']" /> -->
        </q-card-section>
        <div></div>

        <div class="row justify-center"></div>
      </div>

      <q-footer v-if="this.userData"
        :class="[
          this.$store.state.darkMode
            ? 'bg-white text-black row justify-center'
            : 'bg-dark text-grey-1 row justify-center ',
        ]"
        class="q-pa-md"
      >
        <div class="q-pa-md q-my-md">
          <!-- <p class="q-ma-sm text-caption text-center text-light-blue-9">
            You are chatting with {{ user }}
          </p> -->
          <q-input
            outlined
            bottom-slots
            v-model="text"
            label="Enter your message"
            maxlength=""
            color="light-blue-9"
            dense
            class="chat"
            rounded
            autofocus
          >
            <template v-slot:append>
              <q-icon
                v-if="text !== ''"
                name="close"
                @click="text = ''"
                class="cursor-pointer"
              />
            </template>

            <template v-slot:after>
              <q-btn round dense flat icon="send" class="text-light-blue-9" />
            </template>
          </q-input>

          <div class="row justify-center">
            <q-btn
              icon="arrow_back"
              class="bg-light-blue-9 text-white"
              label="back"
              @click="$router.go(-1)"
              size="sm"
            />
          </div>
        </div>
      </q-footer>
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useQuasar } from 'quasar';
import firebase from 'firebase';

import { db, auth, storage, db2 } from 'src/firebase.js';

export default {
  name: 'Chat',
  setup() {
    return {
      user: ref(undefined),
      text: ref(null),
      darkMode: ref(),
      userData: ref([]),
      texter:ref(null),
    };
  },

  data() {
    return {
      // myChats:this.$store.state.userChats
    };
  },
  mounted() {
    this.$store.dispatch('getChats');
    this.$store.dispatch('getMessages', this.$route.query.q);
    this.getMessages();
    this.user = this.$route.query.q;
    var userData1 = this.$store.state.chats.filter(item => item.key == this.$route.query.q )[0]
    var queryString = this.user;
   var keyz = Object.keys(userData1)[0]
  //  this.userData = []//this.$store.state.userChats;
  // console.log(this.$store.state.userChats)
  var queryString = this.$route.query.q;
 db.collection("users").where("uid","==", queryString).get() .then( querySnapshot=> {
                querySnapshot.forEach( doc=> {
              // console.log(doc.data())
              this.texter = doc.data();
                });
              })


// var userMessages = Object.keys(userData.messages);
    this.$store.commit("clearChats");
   if(firebase.auth().currentUser && this.userData){
 this.$store.dispatch('getMessages');
   } else{
this.$router.go(-1)
   }



  },

    methods:{
    sendMessage(text){
      var x = this.text
      var date = new Date;
      var mins = date.getMinutes();
      if(mins < 10){
        mins = "0"+ mins
      }
      var date3 = date.toDateString()+ " "+ date.getHours()+":"+ mins;
      var date2 = date3.substr(4,date3.length)
        if(x){
          this.$store.dispatch('sendMessage', {user:this.user, message:x, from:"me", time:date2});
          this.text = null;
        }
    },

  getMessages(){

if(this.$store.state.myAuth){
  var userId = this.$store.state.myAuth.id
var x = this.$route.query.q
    // messagesRef = db2.ref("chats/"+ userId+"/chats/"+userid);
   var  messagesRef = db2.ref("chats/"+ userId+"/chats/"+x).orderByChild('date');
  messagesRef.on('child_added', snapshot=>{
    var chats = snapshot.val()

    // var userId =
    chats.key = snapshot.key;
    console.log(chats.key)
    // commit("setUserChats", chats)
this.userData.push(chats)
  })
}

  },
    },


  destroyed() {
    this.$store.dispatch('killChat');
    // console.log('killed');
  },
};
</script>

<style></style>
