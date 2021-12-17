<template>
  <div class="q-ma-md" id="vue-cards">
    <q-separator inset class="q-lt-md" />
    <q-card class="my-card">
      <q-card-section>
        <div class="row no-wrap items-center">
          <q-img :src="myDoc.imageUrl" height="200px" class="text-red-14" />
          <div class="col text-h7 text-primary ellipsis">
            {{ myDoc.category }}, Ksh {{ myDoc.price }}
          </div>
          <div
            class="
              col-auto
              text-grey-10 text-caption
              q-pt-md
              row
              no-wrap
              items-center
            "
          ></div>
        </div>

        <!-- <q-rating v-model="stars" :max="5" size="32px" /> -->
      </q-card-section>

      <q-card-section class="q-pt-none">
        <!-- <div class="text-subtitle1">$・Italian, Cafe</div> -->
        <div class="text-caption text-grey-10">
          <!-- {{ doc.description.substring(0, 150) }}... -->
        </div>
        <p class="float-right text-red-14">
          <!-- <q-icon name="phone" class="" /> {{ doc.phoneNumber }} -->
        </p>
        <br />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'InfoCard',
  props: ['myDoc'],
};
</script>

<style scoped>
.my-card {
  /* width: 100%; */
  max-width: 300px;
}
</style>
>
