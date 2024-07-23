<template>
  <div class="container">
    <br><br><br><br>
    
    <div class="row">
    
      <div class="col-lg-6 text-center">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h4>DISPONIBILIDAD</h4>
          </div>
        </div>
        <Form ref="settingForm" @submit="handleRegister">
          <div v-if="!successful">
            <div class="form-group">
              <div class="container">
                <div class="row">
                  <div class="col-lg-6 text-left">
                    <span style="text-align:left;">Restaurante: </span>
                    <Field name="restaurantId" as="select" class="form-control">
                      <option value="" disabled selected>Restaurante: </option>
                      <option v-for="(option, index) in options" :key="index"  :value="option.id">
                        {{ option.name }}
                      </option>
                    </Field>
                      
                  </div>
                  <div class="col-lg-6 text-left">
                    <span>Setting: </span>
                    <div class="form-group">
                      <!-- <label for="password">Password</label> -->
                      <Field name="availability" type="number" class="form-control" />
                      <ErrorMessage name="availability" class="error-feedback" />
                    </div>
                  </div>
                  <div class="col-lg-6 text-left">
                    <span>Desde: </span>
                    <div class="form-group">
                      <Field name="startDate" type="date" :min="minDate" class="form-control" />
                      <ErrorMessage name="startDate" class="error-feedback" />
                    </div>
                  </div>
                  <div class="col-lg-6 text-left">
                    <span>Hasta: </span>
                    <div class="form-group">
                      <Field name="endDate" type="date" :min="minDate" class="form-control" />
                      <ErrorMessage name="endDate" class="error-feedback" />
                    </div>
                  </div>
                  <div class="col-lg-6 text-left">
                    <span style="text-align:left;">Horario: </span>
                    <Field name="schedule" as="select" class="form-control">
                      <option value="" disabled selected>Horario: </option>
                      <option value="18:00" >18:00 </option>
                      <option value="19:00" >19:00 </option>
                      <option value="20:00" >20:00 </option>
                      <option value="21:00" >21:00 </option>
                      <option value="22:00" >22:00 </option>
                      <!-- <option v-for="(option, index) in options" :key="index"  :value="option.id">
                        {{ option.name }}
                      </option> -->
                    </Field>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col-lg-12">
                    <br>
                    <div class="form-group">
                      <button class="btn btn-primary btn-block" style="background-color:rgb(73,105,144);border-color:rgb(73,105,144);" :disabled="loading">
                        <span
                          v-show="loading"
                          class="spinner-border spinner-border-sm"
                        ></span>
                        Registrar
                      </button>
                      <sub style="color:#007bff;">{{messageRegister}}</sub>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div class="col-lg-6">
        <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-12 text-center">
                <h4>REPORTE DE RESERVACIONES</h4>
              </div>
            </div>
            <Form @submit="downloadFunction">
              <div v-if="!successful">
                <div class="form-group">
                  <div class="container">
                    <div class="row justify-content-center">
                      <div class="col-lg-12 text-left">
                        <span>Desde: </span>
                        <div class="form-group">
                          <Field name="start" type="date" class="form-control" />
                          <ErrorMessage name="start" class="error-feedback" />
                        </div>
                      </div>
                      <div class="col-lg-12 text-left">
                        <span>Hasta: </span>
                        <div class="form-group">
                          <Field name="end" type="date" class="form-control" />
                          <ErrorMessage name="end" class="error-feedback" />
                        </div>
                      </div>
                    </div>
                    <div class="row justify-content-center">
                      <div class="col-lg-12">
                        <br>
                        <div class="form-group">
                          <button class="btn btn-primary btn-block" style="background-color:rgb(73,105,144);border-color:rgb(73,105,144);" :disabled="loading2">
                            <span
                              v-show="loading2"
                              class="spinner-border spinner-border-sm"
                            ></span>
                            Descargar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
      </div>
      <div class="col-lg-12 text-center">
        <div class="row">
          <div class="col-lg-6">
        <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-12 text-center">
                <br><br>
                <h4>DISPONIBILIDAD DEL RESTAURANTE</h4>
              </div>
            </div>
            <Form @submit="availabilityRestaurant">
              <div v-if="!successful">
                <div class="form-group">
                  <div class="container">
                    <div class="row justify-content-center">
                      <div class="col-lg-12">
                        <br>
                        <div class="form-group">
                          <button class="btn btn-primary btn-block" style="background-color:rgb(73,105,144);border-color:rgb(73,105,144);" :disabled="loading2">
                            <span
                              v-show="loading2"
                              class="spinner-border spinner-border-sm"
                            ></span>
                            Descargar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
      </div>
          <div class="col-lg-6">
            <div class="row">
              <div class="col-lg-12 text-center">
                <br><br>
                <h4>ELIMINAR RESERVAS</h4>
              </div>
            </div>
            <Form @submit="deleteReservation">
              <div v-if="!successful">
                <div class="form-group">
                  <div class="container">
                    <div class="row justify-content-center">
                      <div class="col-lg-12 text-left">
                        <span>Id reserva: </span>
                        <div class="form-group">
                          <Field name="id" type="number" class="form-control" />
                          <ErrorMessage name="id" class="error-feedback" />
                        </div>
                      </div>
                    </div>
                    <div class="row justify-content-center">
                      <div class="col-lg-12">
                        <br>
                        <div class="form-group">
                          <button class="btn btn-primary btn-block" style="background-color:rgb(73,105,144);border-color:rgb(73,105,144);" :disabled="loading3">
                            <span
                              v-show="loading3"
                              class="spinner-border spinner-border-sm"
                            ></span>
                            Eliminar
                          </button>
                          <sub style="color:#007bff;">{{messageDelete}}</sub>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-12 text-center">
              <br><br>
              <h4>CREAR RESERVA SIN RESTRICCIONES</h4>
            </div>
            <Form @submit="sendReservation" :validation-schema="schema2">
              <div class="form-group">
                <div class="container">
                  <div class="row justify-content-center">
                    <div class="col-lg-12">
                      <div class="row">
                        <div class="col-lg-4" style="margin-top:15px;">
                          
                            <label class="c2" for="restaurantId"> Restaurante</label>
                              <br>
                              <Field name="restaurantId" as="select"  class="form-control" >
                                <!-- <option value="" disabled>Restaurant: </option> -->
                                <option v-for="(option, index) in restaurants" :key="index"  :value="option.restaurant.id" :disabled="!option.valid">
                                  {{ option.restaurant.name }}
                                </option>
                              </Field>
                              <ErrorMessage name="restaurantId"  class="error-feedback" />
                              <!-- <Field v-slot="{ value }" name="drink" as="select" multiple>
                                <option value="" disabled>Select a drink</option>
                                <option v-for="drink in drinks" :key="drink" :value="drink" :selected="value && value.includes(drink)">{{ drink }}</option>
                              </Field> -->
                        </div>
                        <div class="col-lg-4" style="margin-top:15px;">
                          <label> Fecha de reserva</label>
                          <!-- <label class="c2" for="password">Password</label> -->
                          <!-- Fm:  -->
                          <div class="form-group">
                            <Field name="start" type="date" class="form-control" />
                            <ErrorMessage name="start" class="error-feedback" />
                          </div>
                          <!-- <Field name="reservationDate" as="select"  class="form-control" >
                            <option :value="minDate" >{{ minDate }}</option>
                            <option :value="maxDate" >{{ maxDate }}</option>
                          </Field> -->
                          <!-- <Field name="reservationDate" type="date" :min="minDate" :max="maxDate" class="form-control" /> -->
                          <ErrorMessage name="reservationDate" class="error-feedback" />
                        </div>
                        <div class="col-lg-4 text-left" style="margin-top:15px;">
                            <label>Horario </label>
                            <Field name="schedule" as="select" class="form-control">
                              <!-- <option value="" disabled>Hour: </option> -->
                              <option value="18:00" >18:00</option>
                              <option value="19:00" >19:00</option>       
                              <option value="20:00" >20:00</option>
                              <option value="21:00" >21:00</option>       
                              <option value="22:00" >22:00</option>       
                            </Field>
                            <ErrorMessage name="schedule" class="error-feedback" />
                        </div>
                        <div class="col-lg-4 text-left" style="margin-top:15px;">
                          <label>{{ $t('home.t9') }}</label>
                          <Field name="people" as="select" class="form-control">
                            <option v-for="(option, index) in people" :key="index"  :value="index+1">
                              {{ index + 1 }}
                            </option>
                          </Field>
                          <ErrorMessage name="people" class="error-feedback" />
                        </div>
                        <div class="col-lg-4 text-left" style="margin-top:15px;">
                          <label class="c2" for="email">{{ $t('home.t10') }}</label>
                          <Field name="email" type="email" class="form-control" />
                          <ErrorMessage name="email" class="error-feedback" />
                        </div>
                        <div class="col-lg-4 text-left" style="margin-top:15px;">
                          <label class="c2" for="email">Idioma:</label>
                          <Field name="email" type="email" class="form-control" />
                          <!-- <ErrorMessage name="email" class="error-feedback" /> -->
                        </div>
                        <div class="col-lg-12 text-left" style="margin-top:15px;">
                          
                          <label class="c2" for="clientNotes">{{ $t('home.t11') }}</label>
                          <!-- <textarea name="comments" type="textarea" class="form-control" rows="4" cols="50" ></textarea> -->
                          <Field name="clientNotes" as="textarea" class="form-control" rows="4" cols="50" />
                          <ErrorMessage name="clientNotes" class="error-feedback" />
                          
                          <p><sub style="color:#007bff;" >{{verifyReservationS}}</sub></p>
                          <!-- <sub style="color:#28a745;">{{verifyReservationSS}}</sub> -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row justify-content-center">
                    <div class="col-lg-3">
                      <div class="form-group">
                        <br>
                        <button  class="btn btn-primary btn-block" style="background-color:rgb(73,105,144);border-color:rgb(73,105,144);" :disabled="loading">
                          <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                          ></span>
                            {{ $t('home.t12') }}
                        </button>
                      </div>
                    </div>
                  </div> 
                  <div class="row justify-content-center">
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
              </div>
            </Form>
          </div>
          
          <!-- <strong>Token:  </strong>

          <span>{{currentUser.token}}</span>
          {{currentUser.token.substring(0, 20)}} ... {{currentUser.token.substr(currentUser.token.length - 20)}} -->
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import exportFromJSON from "export-from-json";
import * as yup from "yup";

export default {
  name: 'Profile',

  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });
    const schema2 = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });
    const schema3 = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });

    return {
      successful: false,
      loading: false,
      loading2: false,
      loading3: false,
      
      selected: "Restaurant",
      minDate: "",
      messageDelete: "",
      messageRegister: "",
      options: [],
      message: "",
      schema,
      schema2,
      schema3,
      
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    UserService.getRestaurants().then(
      (response) => {
        console.log(response.data)
        this.options = response.data;
        const today =  new Date()
        this.minDate = today.getFullYear() + "-" + (today.getMonth() + 1).toString().padStart(2, "0") + "-" + today.getDate().toString().padStart(2, "0");
            // this.maxDate = today.getFullYear() + "-" + (today.getMonth() + 1).toString().padStart(2, "0") + "-" + (today.getDate()+1).toString().padStart(2, "0");
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods: {
    availabilityRestaurant(dates) {
      // console.log(dates)
      UserService.getAvailabilityReservations(dates).then(
        (res)=> {
          // console.log("DATA: ", res.data)
           
          const arr = res.data
          const arrayReport =[]
          // console.log(arrayReport)
          
          const groupBy = (keys) => (array) =>
            array.reduce((objectsByKeyValue, obj) => {
              // console.log(keys)
              let value = keys.map((key) => obj[key]).join("/");
              // console.log(value)
              objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
              // console.log("enter", objectsByKeyValue[value])
              // console.log("enter2", objectsByKeyValue[value])
              objectsByKeyValue[value].sort((a,b) =>  b.id - a.id);
              // console.log("enter2", objectsByKeyValue[value])
              return objectsByKeyValue;
          }, {});

          const groupByBrandAndYear = groupBy(["date", "schedule",'restaurantId']);
          
          for (let [groupName, values] of Object.entries(groupByBrandAndYear(arr))) {
            const spliit = groupName.split("/")
            let nameRes = ""
            if (spliit[2] == "1"){
              nameRes = "Chianti"
            }else{
              nameRes = "Umami"
            }
            console.log(spliit[1])
            arrayReport.push(
              {
                "Fecha": spliit[0],
                "Hora": spliit[1],
                "Restaurante": nameRes,
                "Disponibilidad": values[0].counter,
              }
            )
            // console.log("counter:", values[0].counter)
            // console.log(`${groupName}: ${values.length}`);
          }
          console.log(arrayReport)
        //  const arr2 = clean.map(
        //       obj => {
        //           return {
        //               "Fecha" : obj.date,
        //               "Disponibilidad":obj.counter,
        //               "Restaurante":obj.restaurantId
        //           }
        //       }
        //   ); 
          
          // for (var i = 0; i < arrayReport.length; ++i) {
          //     if (arr2[i]['Restaurante'] === 1) {
          //         arr2[i]['Restaurante'] = 'Chianti';
          //     }else{
          //         arr2[i]['Restaurante'] = 'Umami';
          //     }
          // }

          
          arrayReport.sort((a,b) =>  new Date(b.Fecha) - new Date(a.Fecha));

          const data = arrayReport
          const fileName = "Disponibilidad";
          const exportType = exportFromJSON.types.csv;

          if (data) exportFromJSON({ data, fileName, exportType });
        },
        (err) => {
          console.log(err)
        }
      )
    },
    downloadFunction(dates) {
      UserService.getReservations(dates).then(
        (res)=> {

          const filteredData = res.data.filter(function(d){
            if (d.resDate >= dates.start && d.resDate <= dates.end){
              return d
            }
            
          });
          const data = filteredData
          const fileName = "Reservations";
          const exportType = exportFromJSON.types.csv;

          if (data) exportFromJSON({ data, fileName, exportType });
        },
        (err) => {
          console.log(err)
        }
      )
    },
    deleteReservation(idReservation) {
      this.loading3 = true
      UserService.deleteReservation(idReservation).then(
        (res)=> {
          console.log(res)
          this.loading3 = false
          this.messageDelete = "Reserva eliminada"
        },
        (err) => {
          console.log(err)
          this.loading3 = false
          this.messageDelete = "Id de reservacion inexistente"
        }
      )
    },
    handleRegister(user) {
      this.loading = true
      user.availability = Number(user.availability)
      user.restaurantId = Number(user.restaurantId)
      UserService.dateRange(user).then(
        (response) => {
          console.log(response)
          this.loading = false
          this.messageRegister = "Setting registrado"
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>