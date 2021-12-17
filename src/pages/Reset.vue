<template>
  <div class="fullscreen text-center q-pa-md flex flex-center" v-if="visible">
    <q-spinner-ios class="q-my-xl custom-caption2" size="11rem" />
  </div>

  <q-page class="q-ma-md q-pt-md" v-if="!visible">
    <div class="row justify-center">
      <q-card class="slimmed q-pa-md q-my-md" bordered>
        <div class="row justify-around text-h6 text-light-blue-9">
          <y class="text-blue-8">
            <q-icon name="fas fa-user" size="sm" />&nbsp; Reset Password</y
          >
          <q-btn class="bg-positive text-white" to="/login">Log In</q-btn>
        </div>

        <div class="row justify-center q-my-md">
          <q-input
            type="email"
            label-color=""
            color="blue-8"
            label="enter your email"
            class="myselector"
            dense
            outlined
            v-model="email"
          />
        </div>

        <!-- <div class="row justify-center q-my-md">
          <q-input
            type="tel"
            label-color=""
            color="blue-8"
            label="Your phone number"
            class="myselector"
            dense
            outlined
            v-model="phone"
          />
        </div> -->

        <!-- <div class="row justify-center q-my-md">
          <q-input
            type="text"
            label-color=""
            color="blue-8"
            label="New password"
            class="myselector"
            dense
            outlined
            v-model="password"
          />
        </div> -->

        <!-- <div class="row justify-center q-my-md">
          <q-input
            type="text"
            label-color=""
            color="blue-8"
            label="Confirm password"
            class="myselector"
            dense
            outlined
            v-model="confirm"
          />
        </div> -->

        <div class="row justify-center q-my-md">
          <q-btn
            v-if="this.email"
            class="bg-light-blue-10 text-white myselector"
            label="Reset"
            @click="reset"
          />

          <q-btn
            v-if="!this.email"
            class="bg-light-blue-5 text-white myselector"
            label="Reset"
            disable
          />
        </div>

        <div class="row justify-center myselector q-my-md text-subtitle2">
          Need an account?? &nbsp;
          <u
            no-caps
            no-wrap
            @click="this.signup"
            flat
            class="text-blue-7"
            style="cursor: pointer"
          >
            Sign Up
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
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="js">
import { defineComponent, ref } from 'vue';
import firebase from 'firebase';
import{db, auth, storage} from "../firebase";
export default {
  name: 'Reset',
  setup() {
    return {
      email: ref(''),
      password: ref(''),
      confirm:ref(''),
      phone:ref(''),
      visible:ref(true),
      confirmDialog:ref(false),
       dialogColor:ref(""),
      dialogIcon:ref(""),
      dialogMessage:ref("")

    };
  },
  data() {
    return {};
  },

  methods:{
    reset(){
       if(navigator.onLine){

         auth.sendPasswordResetEmail(this.email).then((result) => {
           this.toggleDialog(`A password reset link has been sent to ${this.email}`,"check","positive");
           setTimeout(() => {
             window.location.assign("/")
           }, 2000);
         }).catch((err) => {
            // console.log(err)
            if(err.message == "The email address is badly formatted."){
              this.toggleDialog("The email address is badly formatted.","close", "primary");
            } else{
              this.toggleDialog(`${this.email} does not exist in our records or may have been deleted. Check that your email is spelled correctly`,"close","primary")
            }
         });

       } else{
         this.toggleDialog("NO INTERNET", "warning","primary")
       }
    },
     signup(){
        window.location.assign("/#/signup")
    },

      toggleDialog(m, n, o){

   this.dialogIcon = n;
   this.dialogColor = o;
  this.dialogMessage = m;
     this.confirmDialog = true;
},

  },

  mounted(){
    setTimeout(() => {
      this.visible = false;
    }, this.$store.state.spinnerTime);
  }
};
</script>

<style></style>
