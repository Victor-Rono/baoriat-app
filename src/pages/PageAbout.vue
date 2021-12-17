<template>
  <div class="fullscreen text-center q-pa-md flex flex-center" v-if="visible">
    <q-spinner-ios class="q-mt-xl custom-caption2" size="11rem" />
  </div>

  <q-page class="q-pa-lg extra-constrained2" v-if="!visible">
    <h4 class="text-light-blue-9 q-mt-none q-mb-xs" id="about">
      <u>About Us</u>
    </h4>
    <div class="text-body1">
      <y class="text-primary text-bold">Baoriat</y> is a term derived from Kalenjin Community which means <b>“to
      witness”.</b> Baoriat Agencies therefore is a <b>Real estate Company</b> situated in
      <y class="text-light-blue-9">Uasin Gishu County</y> at the heart of Eldoret town <b>(along Oginga Odinga
      Street in Juma Hajee Building).</b> Our Core Mission as a Company is to
      <b>connect the seller and the buyer</b> of the Shamba, plot, houses and other
      related services in Uasin Gishu County. We have a variety of services that
      we offer to our clients including:
      <br />

      <ul id="_list_">
        <br />
        <li>Buying and selling of land.</li>
        <br />
        <li>Lease land for both crop and poultry farming.</li>
        <br />
        <li>Renting residential houses.</li>
        <br />
        <li>Connect buyers of property to seller.</li>
        <br />
        <li>
          Educate our clients on various types of farming through our blog
          platform.
        </li>
        <br />
      </ul>


     	<p>
			<b>	We seek a win/win for all the parties involved</b> in the transaction of any real estate activities/services. Baoriat agencies
				 strive to develop long-lasting relationships that are built on trust with our customers. We do not compromise on our reputation,
				  values, or ethics to get results.
				As a matter of fact, we make professionalism our philosophy to conduct business by putting into place the best industry practices
				 and boost integrity in all our work.
				</p>
				<p>
				Our innovation values enables us to always look for ways that will make life easier for our staff, clients, investors, and
				suppliers. We achieve this by applying the most effective tactics to challenges in the industry. In addition, we have always gone
				extra miles in order to look for ways which can change the real estate industry in Uasin Gishu County for better.
				When it comes to customer service, we prioritize our customers’ interest always. Thus, we ensure that we communicate
				with them frequently concerning our products and give them variety of options to choose from the market. Through the use of technology,
				training and collecting feedback from our clients, we are able to improve as Baoriat Agencies as time goes by.
				</p>

				<p>

				<b id="why" class="text-light-blue-9"><u>Why is Baoriat Agencies an exemplary Real Estate Company?</u></b>

					<ul id="_list_">
					<li>We offer first class customer experience.</li><br />
					<li>You can easily trust us because we follow the legal procedures</li><br />
					<li>We create a lasting relationship with our clients.</li><br />
					<li>Our affairs are done in a professional way.</li><br />
					<li>Our products and services are affordable.</li> <br />
					<li>We help you find a perfect workplace, property or somewhere to call home.</li>
					</ul>
				</p>


				Indeed it is clearly evident that Baoriat Agencies is the place you will never regret to be as a property owner.
				 In fact, partnering with
				 us will not only make you feel home but also you’ll feel proud as a Real Estate investor.

<div id="lastCard">
	<br />
<h7> <strong class="text-primary">Baoriat Agencies</strong> is committed to helping you find the best place for you to settle in Uasin Gishu
	County and its surrounding sister counties. We walk you through the entire process of <strong>acquiring your own property</strong>
	&nbsp;in Uasin Gishu County and its surrounding sister counties until it has been transferred into your hands
</h7>


<h6>Call Us Now: <y class="text-primary"><strong><q-icon name="fas fa-phone" size="md"></q-icon>0721-554-937</strong></y></h6>

<h6 class="text-primary"></h6>

</div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageAbout',
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
};
</script>

<style lang="scss" scoped>
#about {
  display: flex;
  justify-content: center;
}
</style>
