<template>
  <v-app>
    <v-app-bar app color="secondary" dark>
      <div class="d-flex align-center">
        <v-icon size="40">mdi-bed</v-icon>
        <div class="ml-2 text-h4">DaBooking</div>
      </div>
    </v-app-bar>

    <v-main>
      <Booking />
    </v-main>
  </v-app>
</template>

<script>
import Booking from "@/components/Booking";
export default {
  name: "App",

  components: {
    Booking,
  },

  data: () => ({
    //
  }),
};
</script>
