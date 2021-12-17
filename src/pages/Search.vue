<template>
  <q-form class="constrained" @submit="this.searchItem">
    <div class="row justify-center text-light-blue-9">
      <q-input
        type="text"
        v-model="searchInput"
        label="search words, phone, username etc"
        maxlength="30"
        class="myselector q-mt-lg"
        outlined
        dense
        rounded
        color="light-blue-9"
      >
        <template v-slot:append>
          <!-- <q-icon name="close" @click="clearSearch" /> -->
          <q-icon @click="searchItem" name="search" color="light-blue-9" />
        </template>
      </q-input>
      <!-- <q-btn label ="close" @click="clearSearch" /> -->
    </div>
    <div class="row justify-center">
      <!-- <q-btn
        flat
        bordered
        class="q-mx-lg q-mt-sm text-blue-8"
        @click="toggleFilter"
        icon="menu"
        label="filters"
        color=""
        v-if="!showFilters"
      /> -->

      <q-btn
        class="q-mt-sm"
        @click="$router.go(-1)"
        icon="fas fa-arrow-left"
        color="primary"
        size="md"
        flat
        label="GO BACK"
      />
    </div>

    <div class="q-pa-md q-gutter-sm row justify-center" v-if="showFilters">
      <div class="q-gutter-sm">
        <!-- <q-radio
          dense
          v-model="category"
          @click="searchItem"
          val="All"
          label="All"
        /> -->
        <!-- <q-radio
          dense
          v-model="category"
          @click="searchItem"
          val="Land"
          label="Land"
        /> -->
        <!-- <q-radio
          dense
          v-model="category"
          @click="searchItem"
          val="Home"
          label="Homes"
        /> -->
        <!-- <q-radio
          dense
          v-model="category"
          @click="searchItem"
          val="Commercial Buildings"
          label="Commercial Buildings"
        /> -->
        <!-- <q-radio
          dense
          v-model="category"
          @click="searchItem"
          val="Services"
          label="Services"
        /> -->

        <!-- <q-radio
          dense
          v-model="category"
          @click="searchItem"
          val="Businesses"
          label="Businesses"
        /> -->

        <!-- <q-radio
          dense
          v-model="category"
          @click="searchItem"
          val="Users"
          label="Users"
        /> -->

        <!-- <q-icon
          @click="toggleFilter"
          name="close"
          color="primary"
          size="md"
          class="q-mx-lg"
          v-if="showFilters"
        /> -->
      </div>
    </div>

    <div class="row justify-center" v-if="this.searchResults.length > 0">
      <y class="text-subtitle1"
        >You searched for
        <y class="text-light-blue-9 text-bold text-h6">{{
          this.searchDisplay
        }}</y
        >, {{ this.searchResults.length }} result(s)</y
      >
    </div>

    <!--Feed-->
    <div class="row q-pa-xs" id="vue-cards-group">
      <div
        class="q-ma-md"
        id="vue-cards"
        v-for="doc in searchResults"
        :v-bind="searchResults"
      >
        <Card :myDoc="doc" />
      </div>
    </div>
    <!--/Feed-->
    <q-separator v-if="this.searchResults.length > 0" />
    <div
      id="back-arrow"
      class="row justify-center q-mb-md"
      v-if="this.searchResults.length > 2"
    ></div>

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
  </q-form>
</template>

<script>
import { ref } from 'vue';
import Card from './components/Card.vue';
import { db, auth, storage } from 'src/firebase.js';
export default {
  components: { Card },
  data() {
    return {
      searchInput: '',
      searchResults: [],
      confirmDialog: ref(false),
      dialogIcon: ref(''),
      dialogColor: ref(''),
      dialogMessage: ref(''),
      searchDisplay: ref(''),
    };
  },
  setup() {
    var showFilters = ref(false);
    return {
      showFilters,
      category: ref(false),
      toggleFilter() {
        showFilters.value = !showFilters.value;
      },
    };
  },

  methods: {
    searchItem() {
      if (navigator.onLine) {
        if (this.searchInput.length >= 3) {
          this.searchResults = [];
          var arr = this.$store.state.fromFirebase;
          var query = this.searchInput;
          this.searchDisplay = this.searchInput;
          if (this.category) {
            var results = this.$store.state.fromFirebase.filter(
              (result) =>
                result.data()?.description.toLowerCase().indexOf(query) > -1 ||
                result.data()?.category.toLowerCase().indexOf(query) > -1 ||
                result.data()?.phoneNumber.toLowerCase().indexOf(query) > -1 ||
                result.data()?.profession.toLowerCase().indexOf(query) > -1 ||
                // result.data().purpose?.toLowerCase().indexOf(query) > -1 ||
                result.data()?.username?.toLowerCase().indexOf(query) > -1
            );
          } else {
            var results = this.$store.state.fromFirebase.filter(
              (result) =>
                result.data().description.toLowerCase().indexOf(query) > -1 ||
                result.data().category.toLowerCase().indexOf(query) > -1 ||
                result.data().phoneNumber.toLowerCase().indexOf(query) > -1 ||
                result.data().profession?.toLowerCase().indexOf(query) > -1 ||
                // result.data().purpose?.toLowerCase().indexOf(query) > -1 ||
                result.data().username.toLowerCase().indexOf(query) > -1
            );
          }

          if (results.length > 0) {
            this.searchResults = results;
          } else {
            this.message(
              `Could not find anything that matches ${this.searchInput}`,
              'close',
              'primary'
            );
          }
        } else {
          if (this.searchInput.length === 0) {
            this.message(`Search cannot be empty`, 'close', 'primary');
          } else {
            this.message(
              `Your search is too short, it must be at least 3 characters long`,
              'close',
              'primary'
            );
          }
        }
      } else {
        this.message('No internet', 'warning', 'primary');
      }
    },

    message(x, y, z) {
      this.dialogMessage = x;
      this.dialogIcon = y;
      this.dialogColor = z;
      this.confirmDialog = true;
    },

    clearSearch() {
      this.$refs.searchInput.reset();
    },
  },
};
</script>

<style>
#back-arrow {
  bottom: 0;
  position: fixed;
  width: 100%;
  background: transparent;
}

#padded {
  padding-right: 30px;
}
</style>
