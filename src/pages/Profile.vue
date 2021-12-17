<template>
  <div
    class="fullscreen text-center q-pa-md flex flex-center"
    v-if="this.visible"
  >
    <q-spinner-ios class="custom-caption2 q-mt-xl" size="11rem" />
  </div>

  <q-page class="q-ma-md q-pt-sm" v-if="!this.visible">
    <div class="row justify-center">
      <q-card class="my-card q-py-sm q-pa-md" style="width: 90vw" flat>
        <p class="q-ma-xs text-h6 text-primary row justify-center">
          <u>
            {{
              $store.state.myAuth?.data().firstName +
              ' ' +
              $store.state.myAuth?.data().surName
            }}</u
          >
        </p>
        <!-- Profile Pic -->
        <p class="q-ma-md text-h6 text-light-blue-9 row justify-center">
          Update Profile Picture
        </p>

        <div class="row justify-center">
          <q-img
            v-if="!this.filePicked"
            :src="$store.state.myAuth?.data().profilePhoto"
            class="round profile-pic q-my-md"
          />

          <q-img
            v-if="this.filePicked"
            :src="this.images.data"
            class="round profile-pic q-my-md"
          />
        </div>

        <div class="row justify-center">
          <q-btn
            icon="fas fa-camera"
            @click="selectImage"
            class="bg-blue-8 text-white"
            size="lg"
            round
          >
            <input
              hidden
              ref="fileInput"
              type="file"
              @input="pickFile"
              accept="image/*"
            />
          </q-btn>
        </div>

        <div class="row justify-center q-ma-md" v-if="images && !spinning">
          <q-btn
            class="bg-positive text-white q-mr-md"
            v-if="!this.spinning"
            icon="check"
            @click="addProfile(this.images.photo)"
            size="sm"
          />

          <q-btn
            icon="fas fa-trash"
            class="bg-primary text-white q-ml-lg"
            @click="this.confirm = true"
            size="sm"
          />
        </div>

        <div class="row justify-center q-ma-md" v-if="images && spinning">
          <q-spinner-ios color="light-blue-9" size="3rem" />
        </div>

        <!-- delete dialog -->
        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="fas fa-trash" color="" class="" />
              <span class="q-ml-sm">Delete photo?</span>
            </q-card-section>

            <q-card-actions align="center">
              <q-btn
                flat
                label="Yes"
                color="red-14"
                v-close-popup
                @click="this.removePhoto"
              />
              <q-btn
                flat
                label="No"
                class="bg-blue-8 text-white"
                color=""
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card>
    </div>

    <div class="row justify-center q-pa-md extra-constrained2">
      <div class="">
        <div class="justify-center text-h6 text-primary">
          <u>Your Uploads:</u> {{ this.fromFirebase.length }}
        </div>
      </div>
    </div>

    <div
      class="row justify-center q-pa-xs constrained"
      id="vue-cards-group"
      v-show="!visible"
    >
      <div v-if="fromFirebase.length < 1 && !networkError">
        <q-spinner-ios class="q-mb-xl custom-caption2" size="11rem" />
      </div>

      <div
        class="row justify-center"
        v-if="fromFirebase.length < 1 && networkError"
      >
        <p class="text-grey text-subtitle1 q-mt-xl">
          All the assets <y class="text-bold"> you upload</y> will be shown here
        </p>
      </div>

      <div
        class="q-ma-md"
        id="vue-cards"
        v-for="doc in fromFirebase"
        v-if="this.fromFirebase.length > 0"
      >
        <Card :myDoc="doc" />
      </div>
    </div>

    <!-- delete dialog -->
    <q-dialog v-model="confirmDialog">
      <q-card>
        <q-card-section class="row items-center text-primary">
          <q-avatar icon="warning" color="" class="" />
          <span class="q-ml-sm">{{ this.dialogMessage }}</span>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="OK" color="light-blue-9" v-close-popup />
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

    <q-dialog v-model="messageDialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            :icon="this.dialogIcon"
            :color="this.dialogColor"
            class="text-white"
            size="sm"
          />
          <span class="q-ml-sm">{{ this.dialogMessage }}</span>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            label="OK"
            color=""
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
import Compressor from "compressorjs";
import * as imageConversion from 'image-conversion';
import firebase from 'firebase';
import { db, auth, storage } from '../firebase';
import Card from './components/Card.vue';

export default {
  name: 'Signup',
  components:{Card},
  setup() {

//load effect
const progress = ref([
      { loading: false, percentage: 0 },
      { loading: false, percentage: 0 },
      { loading: false, percentage: 0 }
    ])

    const intervals = [ null, null, null ]

    function startComputing (id) {
      progress.value[ id ].loading = true
      progress.value[ id ].percentage = 0

      intervals[ id ] = setInterval(() => {
        progress.value[ id ].percentage += Math.floor(Math.random() * 8 + 10)
        if (progress.value[ id ].percentage >= 100) {
          clearInterval(intervals[ id ])
          progress.value[ id ].loading = false
        }
      }, 400)
    }
//load effect

    return {

       firstName: ref(''),
       filePicked:ref(false),
       surName:ref(''),
       email: ref(''),
      username: ref(''),
      phone:ref(''),
      password: ref(''),
      confirm:ref(''),
      setProfile:ref(false),
      images:ref(""),
      confirm:ref(false),
      progress,
      startComputing,
      file:ref(null),
      imageUrl:ref(null),
      id:ref(null),
      visible:ref(true),
      dialogMessage:ref(""),
      confirmDialog:ref(false),
      messageDialog:ref(false),
      dialogIcon:ref(""),
      dialogMessage:ref(""),
      dialogColor:ref(""),
      spinning:ref(false),
      networkError:ref(false),



    };
  },

mounted(){
  setTimeout(() => {
    this.visible = false;
  }, this.$store.state.spinnerTime);
// images: this.pickFile( this.$store.state.myAuth?.data().profilePhoto);
  setTimeout(() => {
      this.networkError = true;
    }, 4500);

},



  data() {
    return {
// fromFirebase: ref(this.$store.state.fromFirebase),
fromFirebase: ref(
        this.$store.state.fromFirebase.filter(
          (item) => item.data().userId == this.$store.state.myAuth.data().uid
        ))
    };
  },


  methods:{
    reset(){
window.location.assign("/#/reset")
    },

    removePhoto(){
      this.images = '';
       this.filePicked = false;
    },

    message(x,y,z){
      this.dialogMessage = x;
      this.dialogIcon = y;
      this.dialogColor = z;
      this.messageDialog = true;
      this.spinning= false;
    },

  alert (title,message) {
      $q.dialog({
        title: title,
        message: message
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },

  addProfile(file) {
      var img = file;
if(navigator.onLine){
  this.spinning= true;
            new Compressor(img, {
                        quality: 0.5, // 0.6 can also be used, but its not recommended to go below.
                        success: (compressedResult) => {
console.log("compressed")
                          const image = compressedResult
  const path = storage.ref("/profile/" + image.name);
  const user = firebase.auth().currentUser;
var myId = this.$store.state.myAuth.id;

  path.put(image).then((snapshot) => {

 snapshot.ref.getDownloadURL().then(url => {
   console.log(url)
this.imageUrl = url;

db.collection("users").doc(myId).update(
              {profilePhoto: url}
                ).then(res=>{
                  // if(this.$store.state.myAuth.data().profilePhoto !=""){
                  //   storage.refFromURL(this.$store.state.myAuth.data().profilePhoto).delete();
                  // }
                    this.message("Profile photo added successfully","check","positive")
                    setTimeout(() => {
                      window.location.reload();
                    }, 1800);
                    }).catch(err=>{
                      console.log(err)
                      this.message("Failed, try again later","warning","primary")
                    })

    })

},(error)=>{
                                        console.log(error);
                                    },()=>{

});


                        },
                      });
} else{
this.message("No Internet","close","primary")
}


  },

    compressImage(x){
      imageConversion.compress(x,0.5).then(res=>{
    console.log(res);
    return res;
  })





    },




toggleDialog(m){
   this.confirmDialog = true;
  this.dialogMessage = m;
},

blobCreationFromURL(dataURI) {

  var byteString = atob(dataURI.split(',')[1]);


  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]


  var ab = new ArrayBuffer(byteString.length);


  var ia = new Uint8Array(ab);


  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }


  var blob = new Blob([ab], {type: mimeString});
  return blob;


    },


    blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}
,

selectImage() {
      this.$refs.fileInput.click();
    },


 pickFile() {
      let input = this.$refs.fileInput;
      let files = input.files;
      // console.log(file);
      if (files && files[0]) {
       let reader = new FileReader();
         let  file = files[0];

          // this.compressImage(file)
// let file2 = this.compressImage(file)

          // console.log(file);

          reader.onload = (e) => {
            this.previewImage = e.target.result;
                 this.images = ({
              id: Date.now(),
              data: this.previewImage,
              photo:file,
              photo1: this.compressImage(file)

              // photo1: new Compressor(file, {quality: 0.5, sucess(result){return result}} )
            });





            // this.images.photo1.name = Date.now()+".jpg"
            // console.log(this.images.photo);
            // console.log("Separator")
            // console.log(this.images.photo1);
          };
          reader.readAsDataURL(file);
          this.$emit('input', file);
          this.filePicked = true;
      }
    },

  toggleProfile(){
    this.setProfile = !this.setProfile;
  }

  }
};
</script>

<style></style>
