<template>
  <div class="fullscreen text-center q-pa-md flex flex-center" v-if="visible">
    <q-spinner-ios class="custom-caption2 q-my-xl" size="11rem" />
  </div>

  <div class="fullscreen text-center q-pa-md flex flex-center" v-if="!visible">
    <div>
      <div style="font-size: 15vh" class="text-light-blue-9">Error 404</div>

      <div class="text-h2" style="opacity: 0.4">
        Page temporarily unavailable...
      </div>

      <q-btn
        class="q-mt-xl bg-positive text-white myselector"
        @click="$router.go(-1)"
        label="Go Back"
        icon="fas fa-angle-double-left"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Error404',

  data() {
    return {
      visible: true,
    };
  },

  mounted() {
    setTimeout(() => {
      this.visible = false;
    }, this.$store.state.spinnerTime);
  },
});
</script>
