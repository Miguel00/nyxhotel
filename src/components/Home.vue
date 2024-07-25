<template >
  <div class="container-fluid" :class="!successful ? 'bg-image': 'bg-image2' " style="min-height: 1000px;">
    <div class="row">
      <div class="col-lg-12" style="">
        <br><br><br><br><br><br>
        <PopUp v-if="popupTriggers.buttonTrigger" :TogglePopup="() => TogglePopup('buttonTrigger')" >
          <p style="margin:0px;" class="f25">{{ $t('home.t23') }} {{ nameClin }} {{ $t('home.t24') }}</p>
        </PopUp>
        <PopUp v-if="popupTriggers.timedTrigger">
          <h1>My Timed PopUp</h1>
        </PopUp>
        <Form @submit="checkAvailability" :validation-schema="schema">
          <div v-if="!successful">
            <div class="row justify-content-center">
              <div class="col-lg-4 my-auto">
                <div class="form-group my-auto">
                  <label class="c2" for="hotelReservationReference"> {{ $t('home.t1') }} {{minDate2}}</label>
                  <Field name="hotelReservationReference" type="text" class="form-control" />

                  <ErrorMessage name="hotelReservationReference" class="error-feedback " />
                  
                  <p><sub style="color:red;">{{verifyReservation}}</sub></p>
                </div>
              </div>
            </div>
            <div>
            </div>
            <div class="row justify-content-center">
              <div class="col-lg-4 my-auto">
                <div class="form-group">
                  <button class="btn btn-primary btn-block" style="background-color:rgb(73,105,144);border-color:rgb(73,105,144);"  :disabled="loading">
                    <span
                      v-show="loading"
                      class="spinner-border spinner-border-sm"
                    ></span>
                    {{ $t('home.t2') }}
                  </button>
                </div>
              </div>
            </div>          
          </div>
        </Form>
        
        <Form v-if="successful" @submit="checkAvailabilityRestaurants" :validation-schema="schema2" >
            <div class="form-group">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-4">
                    <div class="row">

                      <div class="col-lg-12 text-left" style="margin-top:15px;">
                        <p class="c2" style="font-size:20px!important;" for="restaurantId"> {{ $t('home.t23') }} {{ nameClin }}</p>
                        <label>{{ $t('home.t7') }} </label>
                        <!-- <label class="c2" for="password">Password</label> -->
                        <!-- Fm:  -->
                        <Field name="reservationDate" as="select"  class="form-control" @change="resetDayAv">
                          <option :value="minDate" >{{ minDate }}</option>
                          <option :value="maxDate" >{{ maxDate }}</option>
                        </Field>
                        <!-- <Field name="reservationDate" type="date" :min="minDate" :max="maxDate" class="form-control" /> -->
                        <ErrorMessage name="reservationDate" class="error-feedback" />
                      </div>

                      <div class="col-lg-12 text-left" style="margin-top:15px;">
                        <label>{{ $t('home.t9') }}</label>
                        <Field name="people" as="select" class="form-control" @change="resetDayAv">
                          <option v-for="(option, index) in totalOccupation" :key="index"  :value="index+1">
                            {{ index + 1 }}
                          </option>
                        </Field>
                        <ErrorMessage name="people" class="error-feedback" />
                      </div>


                      <!-- <div class="col-lg-12" style="margin-top:15px;">
                          
                          <label class="c2" for="restaurantId"> {{ $t('home.t4') }}</label>
                            <br>
                            <Field name="restaurantId" as="select"  class="form-control" >
                              <option v-for="(option, index) in restaurants" :key="index"  :value="option.restaurant.id" :disabled="!option.valid">
                                {{ option.restaurant.name }}
                              </option>
                            </Field>
                            <ErrorMessage name="restaurantId"  class="error-feedback" />
                      </div>

                      <div class="col-lg-12 text-left" style="margin-top:15px;">
                          <label>{{ $t('home.t8') }} </label>
                          <Field name="schedule" as="select" class="form-control">
                            <option value="18:00" >18:00</option>
                            <option value="19:00" >19:00</option>
                            <option value="20:00" >20:00</option>
                            <option value="21:00" >21:00</option>
                            <option value="22:00" >22:00</option>       
                          </Field>
                          <ErrorMessage name="schedule" class="error-feedback" />
                      </div> -->
                    </div>
                  </div>
                </div>
                <div class="row justify-content-center" >
                  <div class="col-lg-3">
                    <div class="form-group">
                      <br>
                      <button type="submit" class="btn btn-primary btn-block" style="background-color:rgb(73,105,144);border-color:rgb(73,105,144);" :disabled="checkAvailabilityRestaurantsLoading">
                        <span
                          v-show="checkAvailabilityRestaurantsLoading"
                          class="spinner-border spinner-border-sm"
                        ></span>
                          {{ $t('home.t12') }}
                      </button>
                    </div>
                  </div>
                </div> 
              </div>
            </div>
        </Form>
        <Form  v-if="successful && dateAvailability.valid" @submit="sendReservation" :validation-schema="schema3" v-slot="{ values, setFieldValue }">
            <div class="container">
              <h4 class="text-center text-white my-3">Selecciona el restaurante y horario disponible</h4>
              <div class="row justify-content-center">
                <div class="col-md-3 col-6 my-2" v-for="av in dateAvailability.availability" :key="av.restaurant.id">
                  <h3 class="text-white text-center">{{av.restaurant.name}}</h3>
                  <div v-for="(schedule,i) in av.schedules" :key="i">
                    <button 
                      type="button" 
                      style="width: 100px;" 
                      :class="{active:values.schedule == schedule.schedule && values.restaurantId == av.restaurant.id}"
                      class="mx-auto btn btn-primary btn-aux btn-small btn-block mb-2" 
                      @click="() => {setFieldValue('schedule', schedule.schedule); setFieldValue('restaurantId', av.restaurant.id)}"
                      v-if="people <= schedule.availability"
                      >
                        {{schedule.schedule}} <font-awesome-icon v-if="values.schedule == schedule.schedule && values.restaurantId == av.restaurant.id" icon="check" />
                    </button>                    
                  </div>
                </div>
              </div>
              <div class="text-center">
                <ErrorMessage name="schedule" class="error-feedback" />
              </div>
              <div class="row justify-content-center">
                <div class="col-lg-4">
                  <div class="text-left" style="margin-top:15px;">
                    <label class="c2" for="email">{{ $t('home.t10') }}</label>
                    <Field name="email" type="email" class="form-control" />
                    <ErrorMessage name="email" class="error-feedback" />
                  </div>

                  <div class="text-left" style="margin-top:15px;">
                    <label class="c2" for="clientNotes">{{ $t('home.t11') }}</label>
                    <Field name="clientNotes" as="textarea" class="form-control" rows="4" cols="50" />
                    <ErrorMessage name="clientNotes" class="error-feedback" />
                    
                  </div>
                </div>
              </div>
              <div class="row justify-content-center" >
                  <div class="col-lg-3">
                    <div class="form-group">
                      <br>
                      <button type="submit" class="btn btn-primary btn-block" style="background-color:rgb(73,105,144);border-color:rgb(73,105,144);" :disabled="loading">
                        <span
                          v-show="loading"
                          class="spinner-border spinner-border-sm"
                        ></span>
                          {{ $t('home.t27') }}
                      </button>
                    </div>
                  </div>
                </div> 
                <p class="mt-0 text-center" style="color:#007bff;">{{verifyReservationS}}</p>

              <div class="row justify-content-center mt-5">
                <div class="col-lg-6" style="color:white;">
                  <ul>
                    <li>{{ $t('home.t19') }}</li>
                    <li>{{ $t('home.t20') }}</li>
                    <li>{{ $t('home.t21') }}</li>
                  </ul>
                  <p style="color:white;"></p>
                </div>
              </div>
            </div>
        </Form>
        
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from 'vue';
import PopUp from "./PopUp.vue"
import * as yup from "yup";

export default {
  name: "Home",
  components: {
    Form,
    Field,
    ErrorMessage,
    PopUp
    // FormVerify
  },
  setup (){
    const popupTriggers = ref({
      buttonTrigger: false,
      timedTrigger: false
    });

    const TogglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger]
    }

    return { PopUp, popupTriggers, TogglePopup  }
  },
  data() {
     const schema = yup.object().shape({
      hotelReservationReference: yup
        .string()
        .required(() => this.$t('home.t3'))
    });
    const schema2 = yup.object().shape({
      reservationDate: yup
        .string()
        .required(() => this.$t('home.t3')),
      people: yup
        .string()
        .required(() => this.$t('home.t3')),
    });
    const schema3 = yup.object().shape({
      restaurantId: yup
        .string()
        .required(() => this.$t('home.t3')),
      schedule: yup
        .string()
        .required(() => this.$t('home.t3')),
      email: yup
        .string()
        .required(() => this.$t('home.t3'))
        .email("Email is invalid!"),
      clientNotes: yup
        .string(),

    });
    return {
      content: "",
      successful: false,
      nameClin: "",
      restaurants: [],
      verifyReservation: "",
      verifyReservationS: "",
      verifyReservationSS: "",
      people: 0,
      minDate: "",
      minDate2: "",
      maxDate: "",
      message: "",
      code: "",
      schema,
      schema2,
      schema3,
      loading: false,
      dateToday:[],
      dateTomorrow:[],
      dateAvailability:{valid:false},
      dateAvailabilityLoaded: false,
      checkAvailabilityRestaurantsLoading:false,
      reservationDate:null,
    };
  },
  mounted() {
    // UserService.getPublicContent().then(
    //   (response) => {
    //     this.content = response.data;
    //   },
    //   (error) => {
    //     this.content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
  },
  methods: {
    resetDayAv(){
      this.dateAvailability = {valid:false}
      this.dateAvailabilityLoaded = false      
    },
    checkAvailabilityRestaurants(values){
      this.checkAvailabilityRestaurantsLoading = true
      this.people = values.people
      this.reservationDate = values.reservationDate
      this.resetDayAv()

      UserService.preCheckAvailability(
        {
          "hotelReservationReference": this.code,
          "reservationDate": values.reservationDate
        }
      ).then(
        (response) => {
          this.checkAvailabilityRestaurantsLoading = false
          this.dateAvailabilityLoaded = true
          this.dateAvailability = response.data
        }
      );
    },
    checkAvailability(user) {
      this.loading = true
      // this.$bvModal.show("my-modal")
      UserService.checkAvailability(user).then(
        (response) => {
          this.loading = false
          const data = response.data
          
          // console.log(data.hotelReservation.Code)
          
          if(data === null){
            this.loading = false
            this.verifyReservation = this.$t('home.t5')
          }else if( data == 10 ){
            this.loading = false
            this.verifyReservation = this.$t('home.t6')
          }else if( data == 20 ){
            this.loading = false
            this.verifyReservation = this.$t('home.t25')
          }else if( data == 30 ){
            this.loading = false
            this.verifyReservation = this.$t('home.t26')
          }
          // const res = data.restaurants.filter(restaurant => restaurant.valid == true)
          else if( data.restaurants.filter(restaurant => restaurant.valid == true) <= 0 ){

            this.loading = false
            this.verifyReservation = this.$t('home.t6')

          }else{
            // localStorage.setItem("hotelReservation", data.hotelReservation.occupation);
            localStorage.setItem("hotelReservationReference", user.hotelReservationReference);
            localStorage.setItem("clientFirstName", data.client.name);
            this.nameClin = data.client.name
            this.totalOccupation = Number(data.hotelReservation.occupation)
            this.people = Number(data.hotelReservation.occupation)
            this.restaurants = data.restaurants
            this.successful = true
            this.code = data.hotelReservation.Code
          
            const today =  new Date()
            let tomorrow = new Date();

            tomorrow.setDate(tomorrow.getDate() + 1);
            const a = tomorrow.toLocaleDateString().split("/")[0].padStart(2, "0")
            const b = tomorrow.toLocaleDateString().split("/")[1].padStart(2, "0")

            this.minDate = today.getFullYear() + "-" + (today.getMonth() + 1).toString().padStart(2, "0") + "-" + today.getDate().toString().padStart(2, "0")
            this.maxDate = today.getFullYear() + "-" + b + "-" + a

            
            // this.verifyFormSchedule(this.minDate, this.maxDate)
            
          
          }
          
        },
        (error) => {
          console.log(error)
        }
      );
      
    },
    // verifyFormSchedule(date1, date2){


      // {
      //   "hotelReservationReference": this.code,
      //   "reservationDate": date1
      // }

      // let preCheckDayOne2 = {
      //   "hotelReservationReference": this.code,
      //   "reservationDate": date2
      // }

      // UserService.preCheckAvailability(preCheckDayOne1).then(
      //   (response) => {
      //     // console.log(response.data.availability[0])
      //     for (const num of response.data.availability){
      //       console.log("HI:", num.schedules)
      //     }
      //   }
      // );
      // UserService.preCheckAvailability(preCheckDayOne2).then(
      //   (response) => {
      //     console.log(response.data.availability)
      //     for (const num of response.data.availability){
      //       console.log(".")          
      //       num.schedules["restaurant"] = num.restaurant.name
      //       console.log("HI:", num.schedules)
      //     }
      //   }
      // );

      // UserService.preCheckAvailability(preCheckDayTwo).then(
      //   (response) => {
      //     // console.log(response.data.availability)
      //     console.log("hola1:", this.dateTomorrow[0])
      //     this.dateTomorrow = response.data.availability
      //     console.log("hola2:", this.dateTomorrow[1])
      //   }
      // );

     
      

    // },
    sendReservation(reservation) {
      this.loading = true
      this.verifyReservationS = ''
      const today =  new Date()
      const today2 = today.getFullYear() + "-" + (today.getMonth() + 1).toString().padStart(2, "0") + "-" + today.getDate().toString().padStart(2, "0");
      
      reservation.reservationDate = this.reservationDate
      reservation.people = this.people

      const resDatee = reservation.reservationDate
      if(today2 == reservation.reservationDate){
        
        const hour = today.getHours()
        if(hour < 14){
          console.log("Hola12: ", reservation)
          reservation.clientFirstName = localStorage.getItem("clientFirstName");
          reservation.hotelReservationReference = localStorage.getItem("hotelReservationReference");
          reservation.clientLastName = "."
          reservation.status = "active"
          reservation.restaurantId = Number(reservation.restaurantId)
          reservation.people = Number(reservation.people)
          reservation.Code = this.code
          reservation['reservationDate'] = reservation['resDate']
          delete reservation['resDate'];
          reservation.reservationDate = resDatee
          console.log("here2xc: ", reservation)
          // console.log(reservation)
          UserService.verifyReservation(reservation).then(
            (response) => {
              
              reservation['resDate'] = reservation['reservationDate']
              // delete reservation['reservationDate'];
              reservation['clientEmail'] = reservation['email']
              // delete reservation['email'];
              if(response.data.valid){
                // console.log("hereE: ", reservation)
                reservation.lang = this.$i18n.locale
                UserService.createReservation(reservation).then(
                  (response) => {
                    // console.log("Jiji1: ", response)
                    const {data} = response
                    this.verifyReservationS = this.$t('home.t13')
                    this.loading = false
                    this.popupTriggers.buttonTrigger = true
                    this.successful = false
                    console.log(data)
                  },
                  (error) => {
                    console.log(error)
                    this.verifyReservationS = this.$t('home.t14')
                  }
                );
              }else if(response.data.validCode == 20){
                    this.loading = false
                    this.verifyReservationS = this.$t('home.t15')
              }else if(response.data.validCode == 30){
                    this.loading = false
                    this.verifyReservationS = this.$t('home.t16')
              }else if(response.data.validCode == 40){
                    this.loading = false
                    this.verifyReservationS = this.$t('home.t14')
              }
            },
            (error) => {
              console.log(error)
              this.loading = false
              this.verifyReservationS = this.$t('home.t14')
            }
          );
        }else{
          this.loading = false
          this.verifyReservationS = this.$t('home.t17')
        }
      }else{
        console.log(reservation)
        reservation.clientFirstName = localStorage.getItem("hotelReservation");
        reservation.clientFirstName = localStorage.getItem("clientFirstName");
        reservation.hotelReservationReference = this.code
        reservation.clientLastName = "."
        reservation.status = "active"
        reservation.restaurantId = Number(reservation.restaurantId)
        reservation.people = Number(reservation.people)
        reservation['reservationDate'] = reservation['resDate']
        delete reservation['resDate'];
        reservation.reservationDate = resDatee
        reservation.lang = this.$i18n.locale
        console.log(reservation)
        UserService.verifyReservation(reservation).then(
          (response) => {
            // console.log(response.data.valid)
            if(response.data.valid){
              reservation['resDate'] = reservation['reservationDate']
              delete reservation['reservationDate'];
              reservation['clientEmail'] = reservation['email']
              delete reservation['email'];
              console.log(reservation)
              UserService.createReservation(reservation).then(
                (res) => {
                  const {data} = res
                  this.verifyReservationS = this.$t('home.t13')
                  this.loading = false
                  this.popupTriggers.buttonTrigger = true
                  this.successful = false
                  console.log(data)
                },
                (err) => {
                  console.log(err)
                  this.verifyReservationS = "Error"
                }
              );
            }else if(response.data.validCode == 20){
                  this.loading = false
                  this.verifyReservationS = this.$t('home.t15')
            }else if(response.data.validCode == 30){
                  this.loading = false
                  this.verifyReservationS = this.$t('home.t16')
            }else if(response.data.validCode == 40){
                    this.loading = false
                    this.verifyReservationS = this.$t('home.t14')
            }
          },
          (error) => {
            console.log(error)
            this.loading = false
            this.verifyReservationS = "Ya cuenta con una reserva para esa fecha3"
          }
        );
      }
      // console.log("Aqui: ", new Date().getMonth())

    },
  }
};
</script>
<style scoped>
.f25{font-size:20px!important;}
.error-feedback {
  color: red;
  font-size: 13px;
}
.bg-image{background-image: url('../assets/imgdesktop.png');background-size: 100% 100%;height: 100vh;width:100%;}
.bg-image2{background-image: url('../assets/imgdesktop.png');background-size: 100% 100%;height: 100%;}
label {color:white;font-weight: 600;}
span {font-weight: 600;}
.form-group .c2{color:white;font-weight: 600;}
@media(max-width:767px){
  .bg-image{background-image: url('../assets/motorbg3.png');height: 100vh;background-size:100% 100%;}
  .bg-image2{background-image: url('../assets/motorbg3.png');height: 100%;background-size:100% 100%;}
}
.btn-aux{
  background-color:rgb(73,105,144);border-color:rgb(73,105,144);
}
</style>
