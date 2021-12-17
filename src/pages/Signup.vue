<template>
  <div
    class="fullscreen text-center q-pa-md flex flex-center"
    v-if="this.visible"
  >
    <q-spinner-ios class="custom-caption2 q-mt-xl" size="11rem" />
  </div>

  <q-page class="q-ma-md q-pt-sm" v-if="!this.visible">
    <div class="row justify-center">
      <q-card class="slimmed q-pa-md q-my-md" bordered v-if="!this.setProfile">
        <div class="row justify-around text-h6 text-light-blue-9">
          <y class="text-blue-8">
            <q-icon name="fas fa-user" size="sm" />&nbsp;Sign Up</y
          >
          <q-btn class="bg-positive text-white" to="/login"> Log in</q-btn>
        </div>

        <div class="row justify-center q-my-md">
          <q-input
            type="text"
            label-color=""
            color="blue-8"
            label="First Name"
            class="myselector"
            dense
            outlined
            v-model="firstName"
          />
        </div>

        <div class="row justify-center q-my-md">
          <q-input
            type="text"
            label-color=""
            color="blue-8"
            label="Surname"
            class="myselector"
            dense
            outlined
            v-model="surName"
          />
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
            v-model="email"
          />
        </div>

        <div class="row justify-center q-my-md">
          <q-input
            type="text"
            label-color=""
            color="blue-8"
            label="username"
            class="myselector"
            dense
            outlined
            v-model="username"
          />
        </div>

        <div class="row justify-center q-my-md">
          <q-input
            type="tel"
            label-color=""
            color="blue-8"
            label="Phone, start with 07 or 01"
            class="myselector"
            dense
            outlined
            v-model="phone"
            maxlength="10"
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

        <div class="row justify-center q-my-md">
          <q-input
            type="password"
            label-color=""
            color="blue-8"
            label="Confirm password"
            class="myselector"
            dense
            outlined
            v-model="confirm"
          />
        </div>

        <div
          class="row justify-center text-primary myselector"
          v-if="
            phone.length != 10 || !firstName || !surName || !email || !username
          "
        >
          No field should be empty, and your phone number must have 10
          characters
        </div>
        <div class="row justify-center q-my-md" v-if="this.spinning">
          <q-spinner-ios size="3rem" color="light-blue-9" />
        </div>
        <div class="row justify-center q-my-md" v-if="!this.spinning">
          <q-btn
            v-if="
              phone.length === 10 && firstName && surName && email && username
            "
            :loading="progress[2].loading"
            :percentage="progress[2].percentage"
            class="bg-light-blue-10 text-white myselector"
            label="sign up"
            style="width: 100px"
            @click="signup"
          />

          <q-btn
            v-if="
              phone.length != 10 ||
              !firstName ||
              !surName ||
              !email ||
              !username
            "
            disable
            class="bg-light-blue-5 text-white myselector"
            label="sign up"
            style="width: 100px"
          />
        </div>

        <div class="row justify-center myselector q-my-md text-subtitle2">
          Forgot your password?? &nbsp;
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

      <q-card class="slimmed q-pa-md q-my-sm" flat v-if="this.setProfile">
        <div class="row justify-around text-h6 text-light-blue-9 q-my-sm">
          <y class="text-blue-8"> Add a Profile Picture</y>
          <!-- <q-btn class="bg-positive text-white" to="/login"> Log in</q-btn> -->
        </div>

        <div class="row justify-center q-mx-none">
          <q-card bordered class="my-card myselector q-py-sm">
            <!-- Profile Pic -->

            <div class="row justify-center">
              <q-img
                :src="this.images.data"
                class="round profile-pic q-my-md"
              />
            </div>

            <div class="row justify-center">
              <q-btn
                icon="fas fa-camera"
                @click="selectImage"
                class="bg-blue-8 text-white"
              >
                <input
                  hidden
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  @input="pickFile"
                  capture="camera"
                />
              </q-btn>

              <q-btn
                v-if="images"
                icon="fas fa-trash"
                class="text-red-14 q-ml-lg"
                @click="this.confirm = true"
                round
                flat
                size="sm"
              />
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
                    @click="this.images = ''"
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

          <div class="row justify-center q-my-md">
            <q-btn
              class="bg-grey text-white q-mr-md"
              v-if="!this.images && !this.spinning"
              label="Add photo"
              disable
            />
            <q-btn
              class="bg-light-blue-9 text-white q-mr-md"
              v-if="this.images && !this.spinning"
              label="Add photo"
              @click="addProfile()"
            />
            <q-btn
              v-if="!this.spinning"
              class="bg-primary text-white q-ml-md"
              label="skip"
              @click="window.location.assign('/#/')"
            />

            <q-spinner color="light-blue-9" size="3rem" v-if="this.spinning" />
          </div>
        </div>
        <!-- Profile Pic -->

        <!-- card -->
      </q-card>
    </div>

    <q-dialog v-model="confirmDialog2">
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


export default {
  name: 'Signup',
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
       surName:ref(''),
       email: ref(''),
      username: ref(''),
      phone:ref(''),
      password: ref(''),
      confirm:ref(''),
      setProfile:ref(false),
      images:ref(''),
      confirm:ref(false),
      progress,
      startComputing,
      file:ref(null),
      imageUrl:ref(null),
      id:ref(null),
      visible:ref(true),
      dialogMessage:ref(""),
      confirmDialog:ref(false),
       confirmDialog2:ref(false),
      messageDialog:ref(false),
      dialogIcon:ref(""),
      dialogMessage:ref(""),
      dialogColor:ref(""),
      spinning:ref(false),



    };
  },

mounted(){
  setTimeout(() => {
    this.visible = false;
  }, this.$store.state.spinnerTime);
},


  data() {
    return {};
  },

  methods:{
    reset(){
window.location.assign("/#/reset")
    },

    message(x,y,z){
      this.dialogMessage = x;
      this.dialogIcon = y;
      this.dialogColor = z;
      this.messageDialog = true;
      this.spinning = false;
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

  addProfile() {
if(navigator.onLine){
      var img =this.images.photo;
            new Compressor(img, {
                        quality: 0.7, // 0.6 can also be used, but its not recommended to go below.
                        success: (compressedResult) => {

                          const image = compressedResult
  const path = storage.ref("/profile/" + image.name);
  const user = firebase.auth().currentUser;


  path.put(image).then((snapshot) => {
  console.log('Uploaded a blob or file!');
  console.log(snapshot)
 snapshot.ref.getDownloadURL().then(url => {
this.imageUrl = url;
    db.collection("users").where("uid","==", this.id).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              //save user info locally including url




              db.collection("users").doc(doc.id).update(
              {profilePhoto: url}
                ).then(res=>{
                    this.message("Profile photo added successfully","check","positive")
                    setTimeout(() => {
                      window.location.assign("/#/")
                    }, 1800);
                    }).catch(err=>{
                      this.message("Failed, try again later","warning","primary")
                    })
            });
          })



    })

},(error)=>{
                                        console.log(error);
                                    },()=>{
  //  storage
  // .ref("/profile/")
  // .child(image)
  // .getDownloadURL()
  // .then((urls)=>{
  //   //update profile photo

  // })
});


                        },
                      });


} else{
this.message("No Internet","warning","primary")
}
  },

    compressImage(x){
      imageConversion.compress(x,0.5).then(res=>{
    console.log(res);
    return res;
  })





    },

    signup(){

if(navigator.onLine){
 if(this.email != this.username){
  if(this.phone.match(/^\d+$/) && (this.phone.substring(0, 2) === '07' || this.phone.substring(0, 2) === '01' )){

if(this.password === this.confirm){
this.spinning = true;
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((result) => {
        this.startComputing(2);
         this.$store.dispatch("addUser")
    this.id = result.user.uid;
    db.collection("users")
              .add({
                uid: result.user.uid,
                phoneNumber: this.phone,
                firstName: this.firstName,
                surName:this.surName,
                date: Date.now(),
                profilePhoto:"",
                username: this.username


              }).then((result) => {
                console.log(result)
                this.message("You have signed up successfully","check","positive");
                setTimeout(() => {
                  this.confirmDialog2 = false;
                 window.location.assign("/#/profile");
                }, 1200);

              }).catch((err) => {
            this.message("Sign up failed, try again","warning","primary");

              });
  }).catch((err) => {
    if(err.message =="The email address is badly formatted."){
      this.message("The email address is badly formatted.","warning","primary")

    } else{
      this.message("Sign up failed, try again","warning","primary")
    }
  });
} else{
  this.message("Passwords do not match","warning","primary")
}
} else{
  //No internet
 this.message("Phone number should start with 07 or 01","warning", "primary");
}
 } else{
   this.message("Email and username cannot be the same","warning","primary");
 }
   }else{
     this.message("NO INTERNET","warning", "primary");
   }

},

toggleDialog(m){
   this.confirmDialog = true;
  this.dialogMessage = m;
},

    message(m,n,o){
      this.dialogMessage = m;
      this.dialogIcon = n;
      this.dialogColor = o;
   this.confirmDialog2 = true;
   this.spinning = false;

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
      }
    },

  toggleProfile(){
    this.setProfile = !this.setProfile;
  }

  }
};
</script>

<style></style>
