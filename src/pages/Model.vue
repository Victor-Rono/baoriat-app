<template>
  <div
    class="fullscreen text-center q-pa-md flex flex-center"
    v-if="this.visible"
  >
    <q-spinner-ios size="11rem" class="custom-caption2" />
  </div>

  <div class="" v-show="!this.visible"></div>
</template>

<script>
// import { ref } from 'vue';
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useQuasar } from 'quasar';
import { setTimeout } from 'timers';
// import { mapGetters, useStore } from 'vuex';

// import { useRouter, useRoute } from 'vue-router';
// import firebase from 'firebase';
// import { db, auth, storage } from '../firebase';
export default {
  setup() {
    return {
      visible: ref(true),
    };
  },

  mounted() {
    setTimeout(() => {}, $store.state.spinnerTime);
  },
};
</script>

<style></style>
