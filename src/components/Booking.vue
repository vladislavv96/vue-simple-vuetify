<template>
  <v-container>
    <v-row>
      <v-col lg="8" offset-lg="2">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">
              Choose destination
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">
              Choose flight
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">
              Final information
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-container>
                <v-row>
                  <v-col lg="4">
                    <v-form ref="destinationForm">
                      <v-autocomplete
                        v-model="destination"
                        :items="destinations"
                        auto-select-first
                        rounded
                        solo
                        label="Destination"
                        :rules="destinationRules"
                      ></v-autocomplete>
                      <v-row>
                        <v-col>
                          <v-text-field
                            :rules="dateStartRules"
                            :value="dates[0]"
                            label="start"
                            outlined
                            rounded
                            dense
                            readonly
                            @click="dateDialog = true"
                          />
                        </v-col>
                        <v-col>
                          <v-text-field
                            :rules="dateEndRules"
                            :value="dates[1]"
                            label="end"
                            outlined
                            rounded
                            dense
                            readonly
                            @click="dateDialog = true"
                          />
                        </v-col>
                      </v-row>
                      <v-btn color="primary" @click="search">
                        Continue
                      </v-btn>
                    </v-form>
                    <v-dialog v-model="dateDialog" width="500">
                      <div class="d-flex flex-column">
                        <v-date-picker
                          :allowed-dates="allowdedDates"
                          v-model="dates"
                          range
                        >
                        </v-date-picker>
                        <v-btn
                          class=""
                          @click="dateDialog = false"
                          color="primary"
                          >Submit</v-btn
                        >
                      </div>
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-container>
            </v-stepper-content>

            <v-stepper-content step="2">
              <div v-if="flightID !== null">
                <v-list-item class="primary rounded-lg">
                  <v-list-item-avatar>
                    <v-img :src="selectedFlight.image"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-title class="white--text">{{
                    selectedFlight.title
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="white--text">{{
                    `${selectedFlight.dates[0]} – ${selectedFlight.dates[1]}`
                  }}</v-list-item-subtitle>
                </v-list-item>
              </div>
              <v-list>
                <v-virtual-scroll
                  :bench="10"
                  :items="flightsList"
                  height="500"
                  item-height="80"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                      two-line
                      :key="item.id"
                      @click="flightID = item.id"
                    >
                      <v-list-item-avatar>
                        <v-img :src="item.image"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                          `${item.dates[0]} – ${item.dates[1]}`
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action v-if="item.id === flightID">
                        <v-icon color="primary">mdi-check</v-icon>
                      </v-list-item-action>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </v-list>
              <v-row class="mb-1">
                <v-col>
                  <v-btn block rounded dense @click="e1 = 1">Cancel</v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    block
                    rounded
                    dense
                    color="primary"
                    :disabled="flightID === null"
                    @click="e1 = 3"
                    >Next</v-btn
                  >
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card class="mb-3" outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="overline mb-4">
                      YOUR FLIGHT TO THE {{ destination }}
                    </div>
                    <v-list-item-title class="headline mb-1">
                      {{ selectedFlight.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{
                        `Start: ${selectedFlight.dates[0]} End: ${selectedFlight.dates[1]}`
                      }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-avatar rounded="50" size="80" color="grey">
                    <v-img :src="selectedFlight.image"> </v-img>
                  </v-list-item-avatar>
                </v-list-item>
              </v-card>
              <v-btn color="primary" @click="e1 = 1">
                Confirm
              </v-btn>

              <v-btn text @click="e1 = 2">
                Cancel
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fakeList } from "@/helpers/fakeData";
export default {
  name: "Booking",
  data() {
    return {
      e1: 1,
      value: "",
      destinations: ["Mars", "Moon"],
      destination: "",
      destinationRules: [(v) => !!v || "Destination is required"],
      dateStartRules: [(d) => !!d || "No start date"],
      dateEndRules: [(d) => !!d || "No end date"],
      dateDialog: false,
      dates: [],
      flightID: 0,
    };
  },
  methods: {
    search() {
      const isValid = this.$refs.destinationForm.validate();
      if (!isValid) return;
      this.e1 = 2;
    },
    allowdedDates: (val) => Date.parse(val) >= Date.now(),
  },
  computed: {
    flightsList() {
      return fakeList(["2019-01-01", "2019-05-27"], 30);
    },
    selectedFlight() {
      return this.flightsList.filter((f) => f.id === this.flightID)[0];
    },
  },
};
</script>

<style scoped>
.list-flights {
  height: 60vh;
  overflow-y: auto;
}</style
>>
