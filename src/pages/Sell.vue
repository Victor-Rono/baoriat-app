<template>
  <div class="fullscreen text-center q-pa-md flex flex-center" v-if="visible">
    <q-spinner-ios class="q-mt-xl custom-caption2" size="11rem" />
  </div>

  <div class="q-mt-xl" v-if="!visible && !this.$store.state.myAuth">
    <q-card class="slimmed rounded-box q-ma-md q-pa-md" bordered>
      <div class="row justify-center">
        <p class="myselector text-h5 text-grey-7 text-center">
          Log in or sign up to sell
        </p>
      </div>

      <div class="row justify-center">
        <q-btn
          label="login"
          class="myselector bg-light-blue-9 text-white"
          to="/login"
        />
      </div>
    </q-card>
  </div>

  <!-- <div class="q-py-md q-pa-md">
    <q-card
      v-if="!accepted && this.$store.state.myAuth && !visible"
      class="slimmed rounded-box q-ma-md"
      bordered
    >
      <div class="row justify-center q-mt-md">
        <p class="text-h7 text-light-blue-9">
          <q-icon name="fas fa-edit" size="sm" /> &nbsp;&nbsp;&nbsp;<y
            class="q-pt-sm"
            >Sell an asset
          </y>
        </p>
      </div>
      <div class="row justify-center q-ma-sm">
        <q-item tag="" class="myselector" v-ripple>
          <q-item-section>
            <q-item-label class="text-light-blue-9 text-h6">
              We value Honesty, Transparency and Integrity at Baoriat
              Agencies</q-item-label
            >
            <q-item-label class="q-pt-md">
              <y class="text-primary text-bold"
                >To post any asset/service, you should agree to the terms
                below:</y
              ><br /><br />
              I hereby declare that I am a
              <y class="text-bold">rightful owner</y> or
              <y class="text-bold">broker</y> or
              <y class="text-bold">authorized agent/ agency</y> of all the
              assets/businesses or services that I post on the Baoriat Agencies
              website or app and that
              <y class="text-bold">I can provide proof of ownership</y>
              (e.g title deed) when requested to do so.<br /><br />
              I also declare that the assets/businesses or services that I post
              on the Baoriat Agencies website or app
              <y class="text-bold">are legitimate</y> and
              <y class="text-bold">recognized by the relevant authorities</y>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <div class="row justify-center">
        <div class="myselector q-pa-sm">
          <q-checkbox v-model="agreed" val="agreed" color="light-blue-9" /> I
          agree
        </div>
      </div>

      <div class="row justify-center" v-if="agreed">
        <div class="q-pa-md">
          <q-btn
            label="proceed"
            class="bg-light-blue-9 text-white myselector"
            icon-right="fas fa-angle-double-right"
            @click="this.agree()"
          />
        </div>
      </div>
    </q-card>
  </div> -->

  <q-form class="slimmed q-pa-md" v-if="!visible && this.$store.state.myAuth">
    <q-card class="q-mt-sm q-pa-sm rounded-box" bordered>
      <div class="row justify-center">
        <p class="text-h7 text-light-blue-9">
          <q-icon name="fas fa-edit" size="sm" /> &nbsp;&nbsp;&nbsp;<y
            class="q-pt-sm"
            >Sell an asset
          </y>
        </p>
      </div>

      <!--  -->
      <div class="q-pa-md row justify-center" @click="this.reset">
        <q-select
          outlined
          transition-show="flip-up"
          transition-hide="flip-down"
          bg-color=""
          label-color=""
          color="light-blue-9"
          v-model="group"
          :options="options"
          label="Choose a category"
          options-selected-class="text-light-blue-9"
          class="myselector"
          dense
          style="width: auto"
          :rules="[(val) => val || 'Cannot be empty']"
          v-if="showPics"
        >
          <template v-slot:option="scope" @click="this.reset">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon :name="scope.opt.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>

      <!-- q-select landOptions -->
      <div
        class="row justify-center"
        v-if="this.group.label == 'Land' && showPics"
      >
        <q-select
          required
          outlined
          transition-show="flip-up"
          transition-hide="flip-down"
          bg-color=""
          label-color=""
          color="text-light-blue-9"
          class="myselector text-light-blue-9"
          v-model="landPurpose"
          :options="landOptions"
          label="For sale or leasing?"
          options-selected-class="text-light-blue-9"
          dense
          style="width: auto"
          :rules="[(val) => val || 'Cannot be empty']"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon :name="scope.opt.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>

      <!-- q-select houseOptions -->
      <div
        class="row justify-center q-my-sm text-light-blue-9"
        v-if="
          (this.group.label == 'Homes' ||
            this.group.label == 'Commercial Buildings' ||
            this.group.label == 'Businesses') &&
          showPics
        "
      >
        <q-select
          required
          outlined
          transition-show="flip-up"
          transition-hide="flip-down"
          bg-color=""
          label-color=""
          color="light-blue-9"
          class="myselector text-light-blue-9"
          v-model="landPurpose"
          :options="houseOptions"
          label="For sale or renting?"
          options-selected-class="text-light-blue-9"
          dense
          style="width: auto"
          :rules="[(val) => val || 'Cannot be empty']"
          :lazy-rules="true"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon :name="scope.opt.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>

      <!-- <div class="row justify-center" v-if="landPurpose == '' && group">
        <y class="myselector text-primary text-caption">
          ⚠️⚠️ select one of the options above ☝🏼☝🏼
        </y>
      </div> -->

      <!-- card -->
      <div
        class="row justify-center"
        v-if="this.group.label == 'Services' && showPics"
      >
        <p class="text-subtitle2 myselector">
          <u class="text-light-blue-9 text-bold"
            >Name of the service you offer:</u
          ><br />
          e.g surveyor, real estate agent, extension officer, veterinarian
          (vet), etc...👇🏼👇🏼
        </p>
      </div>

      <div
        class="row justify-center q-mx-none q-mt-xs q-mb-md"
        v-if="this.group.label == 'Services' && showPics"
      >
        <q-input
          type="text"
          color="light-blue-9"
          class="myselector text-light-blue-9"
          label="Name of your service"
          dense
          outlined
          v-model="profession"
        />
      </div>

      <div class="row justify-center q-mx-none">
        <q-card
          bordered
          class="my-card myselector q-py-sm"
          v-if="showPics && group && (landPurpose || profession)"
        >
          <div class="row justify-center">
            <q-btn
              icon="fas fa-camera"
              @click="selectImage"
              class="bg-light-blue-9 text-white"
              v-if="images.length < 5"
            >
              <input
                hidden
                ref="fileInput"
                type="file"
                @input="pickFile"
                multiple
                accept="image/*"
              />
              &nbsp;: {{ images.length }}
            </q-btn>

            <q-btn
              icon="fas fa-camera"
              @click="selectImage"
              class="bg-light-blue-6 text-white"
              v-if="images.length >= 5"
              disable
              :label="images.length"
            />

            <q-btn
              v-if="images.length > 0 && showPics"
              icon="fas fa-trash"
              class="text-red-14 q-ml-lg"
              @click="this.confirm = true"
              round
              flat
              size="sm"
            />
          </div>

          <q-card-section class="q-py-xs row justify-center">
            <y class=""
              ><y v-if="images.length <= 4">
                ⚠️
                <y class="text-primary text-subtitle2"> Select 5 photos</y>
                🖐🏼
              </y>
            </y>

            <y v-if="images.length > 4">
              👍🏼👍🏼
              <y class="text-positive text-subtitle2"
                >{{ images.length }} photos selected</y
              >
            </y>
          </q-card-section>

          <!-- delete dialog -->
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="fas fa-trash" color="" class="" />
                <span class="q-ml-sm">Delete all photos?</span>
              </q-card-section>

              <q-card-actions align="center">
                <q-btn
                  flat
                  label="Yes"
                  color="red-14"
                  v-close-popup
                  @click="this.images = []"
                />
                <q-btn
                  flat
                  label="No"
                  class="bg-light-blue-9 text-white"
                  color=""
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <div class="row justify-center q-my-sm">
            <q-btn
              dense
              label="see photos"
              @click="this.showPhotos"
              v-if="images.length > 0 && !this.seePhotos"
            />
          </div>

          <q-scroll-area
            class="scroll q-py-sm"
            v-if="images.length > 0 && showPics === true && this.seePhotos"
          >
            <div class="row">
              <div class="col col-9 q-ma-md" v-for="image in images">
                <div>
                  <q-img :src="image.data" width="380" />
                  <!-- <q-avatar rounded size="270px" class="">

                  </q-avatar> -->

                  <q-btn
                    icon="fas fa-trash"
                    color="red-14"
                    class=""
                    flat
                    round
                    dense
                    size="sm"
                    @click="removeFile(image.id)"
                  />
                </div>
              </div>
            </div>
            <div class="row justify-center q-my-sm" v-if="this.seePhotos">
              <q-btn dense label="hide photos" @click="this.showPhotos" />
            </div>
          </q-scroll-area>
        </q-card>
      </div>
      <!-- card -->

      <div class="row justify-center q-my-md" v-if="showPics">
        <q-btn
          v-if="
            images.length > 4 &&
            showPics &&
            group &&
            (landPurpose || profession)
          "
          class="bg-light-blue-9 myselector"
          flat
          size="md"
          color="white"
          icon="fas fa-angle-double-right"
          label="Next"
          @click="togglePics"
        />

        <q-btn
          v-if="showPics && (images.length <= 4 || !group)"
          class="bg-blue-4 myselector"
          disable
          flat
          size="md"
          color="white"
          icon="fas fa-angle-double-right"
          label="Next"
        />
      </div>

      <tag class="q-mx-none" v-if="!showPics && group">
        <div class="row justify-center">
          <div
            class="
              text-white
              bg-light-blue-9
              q-py-xs q-px-sm
              rounded-box
              myselector
            "
          >
            <div class="">
              👍🏼👍🏼
              <y class="q-mt-xs text-subtitle2"
                >{{ images.length }} photos selected</y
              >
              <q-btn
                flat
                round
                icon="fas fa-arrow-left"
                size="md"
                class="bg-blue-5 text-white q-ml-xl"
                @click="togglePics"
                dense
              />
            </div>
          </div>
        </div>

        <div class="row justify-center q-my-md">
          <div class="myselector text-subtitle2">
            <u class="text-light-blue-9">Description:</u><br />
            {{ this.group.example }}
          </div>
        </div>

        <div class="row justify-center q-my-md">
          <div class="myselector text-light-blue-9">
            <q-input
              v-model="text"
              type="textarea"
              outlined
              label="Description"
            >
            </q-input>
          </div>
        </div>

        <!-- <div class="row justify-center q-mt-sm q-mb-lg">
          <y class="text-subtitle2 myselector">
            👉🏼👉🏼TIP: To see an example of a good description,
            <u
              class="text-light-blue-9"
              style="cursor: pointer"
              @click="toggleExample(this.group.value, this.landPurpose.type)"
            >
              Click here</u
            >
          </y>
        </div> -->

        <div class="row justify-center q-mt-md text-light-blue-9">
          <q-input
            type="tel"
            v-model="phone"
            label="phone, start with 07 or 01"
            class="myselector"
            outlined
            dense
            maxlength="10"
          />
        </div>

        <!-- <div class="row justify-center q-ma-md text-light-blue-9">
          <q-input
            required
            v-model="location"
            label="location"
            :dense="dense"
            class="col col-xs-7 myselector"
          >


            <template v-slot:append>
              <q-btn
                round
                dense
                flat
                icon="room"
                color="light-blue-9"
                @click="getLocation"
              />
            </template>
          </q-input>
        </div> -->

        <div class="row justify-center q-ma-md">
          <q-btn
            unelevated
            disable
            v-if="
              !this.submitting &&
              (this.text.length < 3 || this.phone.length < 10)
            "
            class="bg-light-blue-5 text-white myselector"
            label="Submit"
            @click="submit(this.images)"
          />

          <q-btn
            v-if="
              !this.submitting &&
              this.text.length >= 8 &&
              this.phone.length === 10
            "
            class="bg-light-blue-9 text-white myselector"
            label="Submit"
            @click="submit(this.images)"
          />
        </div>

        <div class="row justify-center q-ma-md" v-if="this.submitting">
          <q-spinner-ios color="light-blue-9" size="3rem" />
        </div>
        <div class="row justify-center q-ma-md" v-if="this.submitting">
          <p class="text-caption">
            {{ this.loadMessage }}
          </p>
        </div>
      </tag>
    </q-card>
    <q-dialog v-model="confirmDialog">
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

    <q-dialog v-model="exampleDialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            :icon="this.group.icon"
            color="light-blue-9"
            class=""
            size="md"
          />
        </q-card-section>

        <q-card-section class="row items-center">
          <span class="q-ml-sm">{{ this.examples.Land.sale }}</span>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="OK" color="positive" v-close-popup />
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
  </q-form>

  <!-- <q-uploader
        style="max-width: 300px"
        url="http://localhost:4444/upload"
        label="Restricted to images"
        multiple
        accept=".jpg, image/*"
        @rejected="onRejected"
      /> -->
</template>

<script lang="js">
import { defineComponent, ref } from 'vue';
import Compressor from "compressorjs";
import {uid} from 'quasar';
import {db, auth, storage} from "../firebase"
export default {
  name: 'Camera',
  setup(){
    return{




    }
  },

  data() {
    return {
        submitting:ref(false),
        exampleMessage:ref(""),
        exampleDialog:ref(false),
        agreed:ref(false),
        accepted:ref(JSON.parse(localStorage.getItem('agreed'))),
        confirmDialog:ref(false),
        dialogMessage:ref(""),
        dialogColor:ref("positive"),
        dialogIcon:ref("check"),
       caption: ref(''),
       price:ref(''),
       confirm:ref(false),
      location: ref(''),
      photos:[],
      seePhotos:ref(false),
      phone:ref(''),
      text:ref(''),
      visible:ref(true),
      // canvases:[],
      previewImage: null,
      images: [],
      imageCaptured:ref(false),
      hidden:ref(true),
      hasCamera: ref(false),
      showPics: ref(true),
      group: ref(''),
      loadMessage:ref("Uploading..."),
        units:ref(false),
        size:ref(''),
        rate:ref(''),
      imageUrls:ref([]),
        examples:{
            Land:{
             Sale: "For sale:1 acre land in Kapkorio Village in Ndalat Ward in Mosop Sub-County in Nandi county in Kenya..... The land has its Own Title deed.... arable... selling price Ksh 1m.... Access via Eldoret-Ndalat Road.... Serious Buyer or buyers to Call Us on 07** *** *** Now.",
            Leasing:"Lease a fertile 3 acre piece of land in Kapkorio Village in Ndalat Ward in Mosop Sub-County in Nandi county in Kenya..... The land has its Own Title deed.... arable... selling price Ksh 1m.... Access via Eldoret-Ndalat Road.... Serious Buyer or buyers to Call Us on 07** *** *** Now.",
            },
            Home:{
             Sale: "For sale: 3-bedroom house in Annex, Eldoret, Opposite Moi University. The home has good plumbing, electricity and Wi-fi and sits on a 3-acre piece of land. Selling price, Ksh 12 Million. Serious buyers to call Us on 07** *** *** Now.",
            Renting:"Chorwet Apartments Ltd. Rental houses available in Kokwas Shopping Centre. 2-bedrooms @17k monthly, One-bedroom @12k monthly and Bed-sitters @7k per month. All houses are self-contained with ceramic tile floors. Call Us on 07** *** *** Now.",
            },
            Commercial_Building:{
             Sale: "For sale: Kendrick Plaza, located at Moi Avenue in Eldoret Town next to safaricom Shop. 4-storeys tall, well-furnished and maintained, rooms in very high demand. Selling price, Ksh 120 Million. Serious buyers to call Us on 07** *** *** Now.",
            Renting:"Kendrick Plaza, located at Moi Avenue in Eldoret Town next to safaricom Shop. 4-storeys tall, well-furnished and maintained, rooms in very high demand.. Call Us on 07** *** *** Now.",
            },
             Business:{
             Sale: "For sale: Ken's Bakery, located along Waiganjo street in Eldoret Town. We sell over 2000 loaves of bread and 1500 queen cakes among other products daily. well-furnished and maintained, sale goes to the highest bidder. Starting price, Ksh 17 Million. Serious buyers to call Us on 07** *** *** Now.",
            Renting:"Ken's Bakery, located along Waiganjo street in Eldoret Town. We sell over 2000 loaves of bread and 1500 queen cakes among other products daily. well-furnished and maintained, leased at Ksh 1.3 million per year. Call Us on 07** *** *** Now.",
            },

            Service:{
             Sale: "Kemboi's Vetinary Services, located at Moiben Shopping Center. We offer a broad range of services for your domestic animals including vaccinations, animal feeds, Artificial insemination etc. Our attendants are all professional veterinarians with certifications from recognized institutions in Kenya. Call Us on 07** *** *** Now.",
            x:"Kemboi's Vetinary Services, located at Moiben Shopping Center. We offer a broad range of services for your domestic animals including vaccinations, animal feeds, Artificial insemination etc. Our attendants are all professional veterinarians with certifications from recognized institutions in Kenya. Call Us on 07** *** *** Now.",
            false:"Kemboi's Vetinary Services, located at Moiben Shopping Center. We offer a broad range of services for your domestic animals including vaccinations, animal feeds, Artificial insemination etc. Our attendants are all professional veterinarians with certifications from recognized institutions in Kenya. Call Us on 07** *** *** Now."
            },


        },


       options: [
          {
          label: 'Land',
          value: 'Land',
          description: 'Sell or lease land',
          icon: 'fas fa-seedling',
          example: 'Give useful information e.g size of the land, price per acre/point, precise location e.g town, village, ward, distance from nearest town/center, whether it has a title deed, is it fertile? etc...👇🏼👇🏼'

        },

        {
          label: 'Homes',
          value: 'Home',
          description: 'Sell or rent out a house',
          icon: 'fas fa-home',
          example:'Useful information might include where the house or rental home is located, price, number of rooms, is it self-contained? distance from nearest town/center, etc..👇🏼👇🏼'


        },
        {
          label: 'Commercial Buildings',
          value: 'Commercial_Building',
          description: 'Sell or rent out commercial buildings',
          icon: 'fas fa-building',
          example:'Give important details like the name of the commercial building, precise location e.g town, village, ward etc, its price, number of floors, title deed etc...👇🏼👇🏼'

        },
        {
          label: 'Services',
          value: 'Service',
          description: 'Offer a professional service',
          icon: 'fas fa-ribbon',
          example: 'Some useful information might include the name of your profession, what it involves, who might need it, how much you charge, where you are located, whether you are licensed, when you are available etc...👇🏼👇🏼'
        },
        {
          label: 'Businesses',
          value: 'Business',
          description: 'Sell or rent out your business',
          icon: 'eva-gift-outline',
          example: 'Include useful details like the name of your business, what it involves, price, how much profit it makes per day/month/year, precise location e.g town, village, ward etc..👇🏼👇🏼'
        },



      ],
        landPurpose: ref(false),
        profession:ref(false),
        description: ref("Give a brief and accurate description of your land"),
        landOptions: [
          {
          label: 'For Sale',
          type: 'Sale',
          value: 'For Sale',
          description: 'Sell your land',
          icon: 'fas fa-seedling',
        },

        {
          label: 'Leasing',
          type: 'Leasing',
          value: 'For Leasing',
          description: 'Lease your land',
          icon: 'fas fa-tractor',
        },

      ],

    housePurpose: ref(""),
        houseOptions: [
        {
          label: 'For Sale',
          value: 'For Sale',
          type: 'Sale',
          description: 'Sell your house /  business / commercial building',
          icon: 'fas fa-home',
        },

       {
          label: 'Renting',
          value: 'For Renting',
          type: 'Renting',
          description: 'Rent your house / business / commercial building',
          icon: 'fas fa-building'
        },


      ]


    };
  },

  methods: {
message(m, n, o){
  this.dialogMessage = m;
  this.dialogIcon = n;
  this.dialogColor = o;
  this.confirmDialog = true;
  this.submitting= false;
},

toggleExample(x,y){
  console.log(x)
  console.log(y)
  if(x == "Service"){
    y = "Sale"
  }
  // this.exampleMessage = this.examples.x.y;

  this.exampleDialog= true;
},

agree(){
  this.accepted = true;
  this.agreed = true;
   localStorage.setItem('agreed', JSON.stringify(true));
},

test(){
  console.log("test")
this.submiting = !this.submitting;
},

leo(){
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var hh = String(today.getHours());
var mins = String(today.getMinutes());
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy ;
return today;
},

submit(images){
var i = 0;
var j =0;
//upload all 5 images:



 this.submitting = true;
if(navigator.onLine){

            if(this.phone.match(/^\d+$/) && (this.phone.substring(0, 2) === '07' || this.phone.substring(0, 2) === '01' )){
//block
for( i = 0; i <= (images.length -1); i++){
new Compressor(images[i].photo, {
  quality: 0.5, // 0.6 can also be used, but its not recommended to go below.
  success: (compressedResult) => {
  //  this.photos.push(compressedResult)
  //  console.log(this.photos.length)

//firebase upload
 const image = compressedResult
 const path = storage.ref("/test/" + image.name);

  path.put(image).then((snapshot) => {
  // console.log('Uploaded a blob or file!');
  // console.log(snapshot)
 snapshot.ref.getDownloadURL().then(url => {
  this.imageUrls.push(url)
  //  console.log(this.imageUrls)
this.loadMessage = `Uploading images ${this.imageUrls.length/5 * 100}%.`

  if(this.imageUrls.length >4){
this.loadMessage = "Uploaded 100%"

var profilePic = false;
    if(this.$store.state.myAuth.data().profilePhoto !=""){
profilePic = this.$store.state.myAuth?.data().profilePhoto
    }
var Purpose = false;

if(this.landPurpose.value){
Purpose = this.landPurpose.value;
    }




console.log(Purpose);
    db.collection("posts").add({
      category: this.group.value,

      imageUrl:this.imageUrls[0],
      imageUrl2:this.imageUrls[1],
      imageUrl3:this.imageUrls[2],
      imageUrl4:this.imageUrls[3],
      imageUrl5:this.imageUrls[4],
      description:this.text,
      phoneNumber:this.phone,
      username:this.$store.state.myAuth.data().username,
      profession:this.profession,
      purpose:Purpose,
      profilePhoto:profilePic,
      userId:this.$store.state.authId,
      date:Date.now(),
      fullDate: this.leo()
    })
    .then((result) => {
          this.message("Uploaded successfully", "check", "positive");

          setTimeout(() => {
this.refresh();
          }, 300);

    }).catch((err) => {
console.log(err)

        this.message("Upload failed, try again later","close","primary")
    });

//block
setTimeout(() => {
  this.message("Upload taking too long, try again later","close","primary")
}, 60*20*1000);

  }



    })

},(error)=>{ console.log(error);},()=>{});

//firebase upload
  }})
}


            } else{
              this.submitting = false;
                this.message("phone number must start with 07 or 01", "warning", "primary")
            }

} else{
   this.submitting = false;
  this.message("No Internet", "warning", "primary")
}

},

compressImage(img){
 new Compressor(img, {
  quality: 0.5, // 0.6 can also be used, but its not recommended to go below.
  success: (compressedResult) => {
    return compressedResult;
  }})
},


    reset(){
      this.landPurpose = '';
       this.profession = '';

    },

showPhotos(){
this.seePhotos = !this.seePhotos;
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

selectImage() {
      this.$refs.fileInput.click();
    },



    pickFile() {
      let input = this.$refs.fileInput;
      let files = input.files;
      // console.log(file);
      if (files && files[0]) {
        for (var i = 0; i <= files.length; i++) {
          let reader = new FileReader();
          let file = files[i];
          // console.log(file);

          reader.onload = (e) => {
            this.previewImage = e.target.result;

           if(this.images.length <5){
              this.images.push({
              id: Date.now(),
              data: this.previewImage,
              photo: file,

            });
            // this.photos.push(file);
           }
            console.log(this.images.photo);
          };
          reader.readAsDataURL(file);
          this.$emit('input', file);
        }
      }
    },

    removeFile(f) {
      this.images = this.images.filter((item) => {
        return item.id !== f;

      });
    },

    togglePics(){

      if(this.seePhotos){
        this.seePhotos = false;
      }
       setTimeout(() => {
         this.showPics = !this.showPics
       }, 200);

    },

    toggleGroup(){
      this.group = ''
       console.log(this.group.label)
    },


    getLocation(){
      navigator.geolocation.getCurrentPosition(position =>{
        this.getCityAndCountry(position)
        console.log(position)
      }, err=>{
        console.log(err)
      }, {timeout: 7000})
    },

     getCityAndCountry(position){

       let apiURL = `${position.coords.latitude}, ${position.coords.longitude}`;

      this.$axios.get(apiURL).then(result =>{
            this.locationSuccess(result);
      }).catch(err=>{
        console.log(err);
      })

     },

     locationSuccess(result){
       var city = result.data.city ;
       if(result.data.country ){

       }
     },

    confirmDialogman () {

      var title=

      $q.dialog({
        title: 'Confirm',
        message: 'Would you like to turn on the wifi?',
        cancel: true,
        persistent: false
      }).onOk(() => {
        // console.log('>>>> OK')
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },

    refresh(){
      window.location.assign("/#/sold");
    }





  },

   mounted() {
    setTimeout(() => {
      this.visible = false;
    }, this.$store.state.spinnerTime);

  if(this.agreed === null){
    this.agreed= false;
  }
},




}
</script>

<style scoped>
.camera-frame {
  border: 2px solid rgb(66, 66, 66);
  border-radius: 10px;
}

/* .my-card {
  width: auto;
} */

.myImage {
  max-height: 200px;
}
.scroll {
  width: 300px;
  height: 300px;
}

#form {
  border: 1px solid rgb(168, 168, 168);
  border-radius: 19px;
  padding: auto;
}
</style>
