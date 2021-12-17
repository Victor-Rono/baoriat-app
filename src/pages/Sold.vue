<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 15vh" class="text-light-blue-9">
        <q-icon name="check" color="positive" />
      </div>

      <div class="text-h2 text-light-blue-9">Item posted successfully</div>
      <div class="row justify-center q-pa-md q-mt-xl">
        <q-btn
          class="q-mr-md bg-positive text-white"
          to="/sell"
          label="Back"
          icon="fas fa-angle-double-left"
        />

        <q-btn
          class="q-ml-md bg-light-blue-9 text-white"
          to="/"
          label="Go Home"
          icon="fas fa-home"
        />
      </div>
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
