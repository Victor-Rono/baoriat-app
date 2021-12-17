<template>
  <div
    class="fullscreen text-center q-pa-md flex flex-center"
    v-if="this.visible"
  >
    <q-spinner-ios class="custom-caption2 q-mt-xl" size="11rem" />
  </div>

  <q-page class="q-ma-md q-pt-md" v-show="!this.visible">
    <div class="row justify-center">
      <q-card class="slimmed q-pa-md q-my-md" bordered>
        <div class="row justify-around text-h6 text-light-blue-9">
          <y class="text-blue-8">
            <q-icon name="fas fa-user" size="sm" />&nbsp; Log in</y
          >
          <q-btn class="bg-positive text-white" to="/signup"> Sign Up</q-btn>
        </div>

        <div class="row justify-center q-my-md">
          <q-input
            type="email"
            label-color=""
            color="blue-8"
            label="email"
            class="myselector"
            dense
            outlined
            v-model="username"
          />
        </div>

        <div class="row justify-center q-my-md">
          <q-input
            type="password"
            label-color=""
            color="blue-8"
            label="password"
            class="myselector"
            dense
            outlined
            v-model="password"
          />
        </div>

        <div class="row justify-center q-my-md" v-if="!this.spinning">
          <q-btn
            class="bg-light-blue-10 text-white myselector"
            label="Log In"
            @click="login"
          />
        </div>

        <div class="row justify-center q-my-md" v-if="this.spinning">
          <q-spinner-ios size="3rem" color="light-blue-9" />
        </div>

        <div class="row justify-center myselector q-my-md text-subtitle2">
          Forgot password?? &nbsp;
          <u
            no-caps
            no-wrap
            @click="reset"
            flat
            class="text-blue-7"
            style="cursor: pointer"
          >
            Click Here
          </u>
        </div>
      </q-card>
    </div>

    <!-- delete dialog -->
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
  </q-page>
</template>

<script lang="js">
import { defineComponent, ref } from 'vue';
import firebase from 'firebase';
import { db, auth, storage } from '../firebase';

export default {
  name: 'Login',
  setup() {

    return {
      username: ref(''),
      password: ref(''),
      visible:ref(true),
      confirmDialog:ref(false),
      dialogMessage:ref(""),
      dialogColor:ref(""),
      dialogIcon:ref(""),
      spinning:ref(false),
    };
  },
  data() {
    return {};
  },

  methods:{
    reset(){
window.location.assign("/#/reset")
    },

    toggleDialog(m,n,o){
      this.dialogMessage = m;
      this.dialogIcon = n;
      this.dialogColor = o;
   this.confirmDialog = true;
   this.spinning = false;

},

login(){
  this.spinning = true;
 if(navigator.onLine){
    firebase.auth().signInWithEmailAndPassword(this.username, this.password).then((result) => {
      // this.$store.dispatch("addUser")

    // console.log(result)
     this.toggleDialog("Login Successful","check","positive");


    setTimeout(() => {
      window.location.assign("/#/")
    }, 1500);
  }).catch((err) => {
    // console.log(err)
    this.toggleDialog("Wrong email or password","warning","primary");

  });
 } else{
   this.toggleDialog("NO INTERNET","warning","primary");

 }
}

  },

  mounted() {
      setTimeout(() => {
        this.visible = false;
      }, this.$store.state.spinnerTime);
  }
};
</script>

<style></style>
