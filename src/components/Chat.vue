<template>

<div class="row justify-center q-mt-lg" v-if="!this.$store.state.myAuth">
  <p class="q-pt-lg text-h6 text-light-blue-9">
    <q-btn class="bg-light-blue-9 text-white" to="/login" label="log in"/>
  </p>

</div>

  <q-form @submit="this.sendMessage()" class="row justify-center q-pa-md q-mb-xl" v-if="this.$store.state.myAuth">
    <div class="q-pa-md">
      <p class="q-ma-md text-h6 text-center text-light-blue-9">
        {{ this.texter?.firstName }} {{ this.texter?.surName }}
        <p class="text-caption text-positive">{{ this.texter?.username }}</p>
      </p>

      <div flat class="q-pa-md justify-end">
        <q-card-section class="chat">

          <!-- <q-chat-message :name="message.from" :text="message.text" /> -->
        <y v-for="message in userData" class="q-pb-xl q-mb-xl">
           <q-chat-message class="myselector" v-if="message.message.length >0  && message.from =='them'" :stamp="message.time" :name="this.texter.firstName + ' ' + this.texter.surName" :text="[message.message]" :sent="message.from == 'me'" />
            <q-chat-message class="myselector" v-if="message.message.length >0 && message.from =='me'" :stamp="message.time" :text="[message.message]" :sent="message.from == 'me'" name="You" />


          </y>

          <y v-for="message in lastChat" class="q-pb-xl q-mb-xl">
           <q-chat-message class="myselector" v-if="message.message.length >0  && message.from =='them'" :stamp="message.time" :name="this.texter.firstName + ' ' + this.texter.surName" :text="[message.message]" :sent="message.from == 'me'" />
            <q-chat-message class="myselector" v-if="message.message.length >0 && message.from =='me'" :stamp="message.time" :text="[message.message]" :sent="message.from == 'me'" name="You" />


          </y>



            <!-- <y>
 <q-chat-message class="myselector" v-if="" :stamp="message.time" :text="[message.message]" :sent="message.from == 'me'" name="You" />
            </y> -->

          <!-- <q-chat-message name="me" :text="['hey, how are you?']" sent />

          <q-chat-message name="me" :text="['hey, how are you?']" sent />
          <q-chat-message name="Jane" :text="['doing fine, how r you?']" />
          <q-chat-message name="me" :text="['hey, how are you?']" sent />
          <q-chat-message name="Jane" :text="['doing fine, how r you?']" /> -->
        </q-card-section>
        <div></div>

        <div class="row justify-center">

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
              <q-btn round dense flat icon="send" @click="this.sendMessage()" class="text-light-blue-9" />
            </template>
          </q-input>

        </div>
        <div class="row justify-center q-ma-md myselector">
            <q-btn
              icon="arrow_back"
              class="bg-light-blue-9 text-white"
              label="back"
              @click="$router.go(-1)"
              size="sm"
            />
          </div>
      </div>
<y id="bottom" class=""></y>

    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useQuasar } from 'quasar';
import firebase from 'firebase';

import { db, auth, storage, db2 } from 'src/firebase.js';
import { isNull } from 'util';
var messagesRef;
export default {
  name: 'Chat',
  setup() {
    return {
      user: ref(undefined),
      text: ref(null),
      darkMode: ref(),
      userData: ref([]),
      texter:ref(false),


    };
  },

  data() {
    return {
      // myChats:this.$store.state.userChats
      lastChat:ref([]),
      loaded:ref(null),
      listening:ref(false)
    };
  },
  mounted() {
    this.$store.dispatch('chatReduce',  this.$route.query.q );
    // this.$store.dispatch('getMessages', this.$route.query.q);
    this.getMessages();
    this.user = this.$route.query.q;
    // var userData1 = this.$store.state.chats.filter(item => item.key == this.$route.query.q )[0]
    var queryString = this.user;
setTimeout(t=>{
this.bottoms()
// this.loaded = true;
}, 500)

setTimeout(t=>{
// this.bottoms()
this.loaded = true;
}, 3500)


  //  var keyz = Object.keys(userData1)[0]
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

      var recipient = `${this.texter.firstName} ${this.texter.surName}`
      var userName = `${this.texter.username}`
      var x = this.text
      var date = new Date;
      var mins = date.getMinutes();
      if(mins < 10){
        mins = "0"+ mins
      }
      var date3 = date.toDateString()+ " "+ date.getHours()+":"+ mins;
      var date2 = date3.substr(4,date3.length)
        if(x){

          this.$store.dispatch('sendMessage', {user:this.user, message:x, from:"me", time:date2, username:userName, recipient: recipient,   });
          this.text = null;
          this.userData.push({user:this.user, message:x, from:"me", time:date2, username:userName, recipient: recipient,   });
          this.userData.pop()
        }
setTimeout(x=>{
  this.bottoms()
}, 50)


    },

  getMessages(){

if(this.$store.state.myAuth ){
  var userId = this.$store.state.authId;
  // var l = this.loaded;
var x = this.$route.query.q
    // messagesRef = db2.ref("chats/"+ userId+"/chats/"+userid);
   messagesRef = db2.ref("chats/"+ userId+"/chats/"+x).orderByChild("date");
  if(7 > 1){

  messagesRef.on('child_added', snapshot=>{
    var chats = snapshot.val()

    // var userId =
    chats.key = snapshot.key;
    chats.status = "read";
    console.log(chats)

db2.ref("chats/"+ userId+"/chats/"+x+"/"+chats.key).update({"status":"read"})

    // commit("setUserChats", chats)
    // if(chats.from =="them"){
    //   this.lastChats.push(chats)
    // }


      if(!this.loaded){
      this.userData.unshift(chats);
      }else{
        this.userData.push(chats);
        this.bottoms()
      }

  })
  } else{


  }







} else{
  // console.log("NOT LOGGED IN")

}

  },

bottoms(){
  // let scrollToBottom = document.querySelector("#scroll-to-bottom")
let pageBottom = document.querySelector("#bottom")
pageBottom.scrollIntoView()
this.listening = true
},

killChat(){
  messagesRef.off("child_added")
  this.listening = false;
}



    },


  destroyed() {
    this.killChat();

  },

  beforeUnmount(){
    this.killChat()
  }
};
</script>

<style>
/* *{
  scroll-behavior: smooth;
} */

</style>
