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
                      <Field name="schedule" type="time" class="form-control" />
<!--                     <Field name="schedule" as="select" class="form-control">
                      <option value="" disabled selected>Horario: </option>
                      <option :value="`${i}:00`" v-for="i in [12,13,14,15,16,17,18,19,20,21,22,23]" :key="i">{{`${i}:00`}}</option>
                    </Field>
 -->                  </div>
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
            <Form ref="newResForm" @submit="sendReservation" :validation-schema="schema2" v-slot="{ values, setFieldValue }">
              <div class="form-group">
                <div class="container">
                  <div class="row justify-content-center">
                    <div class="col-lg-12">
                      <div class="row">
                        <div class="col-lg-4" style="margin-top:15px;">
                          <label class="c2" for="brazalete">Brazalete</label>
                          <div class="input-group">
                            <Field name="brazalete" class="form-control" ></Field>
                            <button class="btn btn-outline-secondary" type="button" :disabled="searchLoading" @click="findRes(values.brazalete, setFieldValue)">
                                <span
                                  v-show="searchLoading"
                                  class="spinner-border spinner-border-sm"
                                  ></span>
                              Buscar
                            </button>
                          </div>
                          <!-- <ErrorMessage name="restaurantId"  class="error-feedback" /> -->
                        </div>
                        <div class="col-lg-4" style="margin-top:15px;">
                            <label class="c2" for="brazalete">ID Reserva</label>
                            <Field name="hotelReservationReference" class="form-control" readonly>
                            </Field>
                            <ErrorMessage name="hotelReservationReference"  class="error-feedback" />
                        </div>
                        <div class="col-lg-4" style="margin-top:15px;">
                            <label class="c2" for="brazalete">Nombre huesped</label>
                            <Field name="clientFirstName" class="form-control" readonly>
                            </Field>
                            <ErrorMessage name="clientFirstName"  class="error-feedback" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row justify-content-center">
                    <div class="col-lg-12">
                      <div class="row">
                        <div class="col-lg-2" style="margin-top:15px;">
                          
                            <label class="c2" for="restaurantId"> Restaurante</label>
                              <br>
                              <Field name="restaurantId" as="select"  class="form-control" v-model="newResRestaurantId">
                                <!-- <option value="" disabled>Restaurant: </option> -->
                                <option v-for="(option, index) in options" :key="index"  :value="option.id">
                                  {{ option.name }}
                                </option>
                              </Field>
                              <ErrorMessage name="restaurantId"  class="error-feedback" />
                              <!-- <Field v-slot="{ value }" name="drink" as="select" multiple>
                                <option value="" disabled>Select a drink</option>
                                <option v-for="drink in drinks" :key="drink" :value="drink" :selected="value && value.includes(drink)">{{ drink }}</option>
                              </Field> -->
                        </div>
                        <div class="col-lg-2" style="margin-top:15px;">
                          <label> Fecha de reserva</label>
                          <!-- <label class="c2" for="password">Password</label> -->
                          <!-- Fm:  -->
                          <div class="form-group">
                            <Field name="resDate" type="date" class="form-control" v-model="newResResDate"/>
                            <ErrorMessage name="resDate" class="error-feedback" />
                          </div>
                          <!-- <Field name="reservationDate" as="select"  class="form-control" >
                            <option :value="minDate" >{{ minDate }}</option>
                            <option :value="maxDate" >{{ maxDate }}</option>
                          </Field> -->
                          <!-- <Field name="reservationDate" type="date" :min="minDate" :max="maxDate" class="form-control" /> -->
                        </div>
                        <div class="col-lg-8" style="margin-top:15px;">
                          <p>Disponibilidad (24hrs)</p>
                          <span
                            v-if="newResAvailabilityLoading"
                            class="spinner-border spinner-border-sm"
                          ></span>
                          <table v-else-if="newResAvailability!=null && newResAvailability?.schedules.length>0" class="table table-bordered table-sm">
                            <tr>
                              <th v-for="(sch,i) in newResAvailability.schedules" :key="i">{{sch.schedule}}</th>
                            </tr>
                            <tr>
                              <td v-for="(sch,i) in newResAvailability.schedules" :key="i">{{sch.availability}}</td>
                            </tr>
                          </table>
                          <p v-else-if="newResAvailability!=null && newResAvailability?.schedules.length == 0" class="text-danger">No se encontró disponibilidad en ningún horario</p>
                        </div>
                        <div class="col-lg-4 text-left" style="margin-top:15px;">
                            <label>Horario </label>
                             <Field name="schedule" type="time" class="form-control" />
<!--                             <Field name="schedule" as="select" class="form-control">
                                <option :value="`${i}:00`" v-for="i in [12,13,14,15,16,17,18,19,20,21,22,23]" :key="i">{{`${i}:00`}}</option>
                            </Field>
 -->                            <ErrorMessage name="schedule" class="error-feedback" />
                        </div>
                        <div class="col-lg-4 text-left" style="margin-top:15px;">
                          <label>{{ $t('home.t9') }}</label>
                          <Field name="people" as="select" class="form-control">
                            <option v-for="(option, index) in [1,2,3,4,5,6,7,8,9,10]" :key="index"  :value="index+1">
                              {{ index + 1 }}
                            </option>
                          </Field>
                          <ErrorMessage name="people" class="error-feedback" />
                        </div>
                        <div class="col-lg-4 text-left" style="margin-top:15px;">
                          <label class="c2" for="clientEmail">{{ $t('home.t10') }}</label>
                          <Field name="clientEmail" type="email" class="form-control" />
                          <ErrorMessage name="clientEmail" class="error-feedback" />
                        </div>
                        <div class="col-lg-4 text-left" style="margin-top:15px;">
                          <label class="c2" for="email">Idioma:</label>
                          <Field name="lang" as="select" class="form-control">
                              <option value="en">English</option>
                              <option value="es">Spanish</option>
                              <option value="fr">French</option>
                              <option value="pt">Portuguese</option>
                              <option value="ru">Russia</option>
                          </Field>
                          <ErrorMessage name="lang" class="error-feedback" />
                        </div>
                        <div class="col-lg-12 text-left" style="margin-top:15px;">
                          
                          <label class="c2" for="clientNotes">{{ $t('home.t11') }}</label>
                          <!-- <textarea name="comments" type="textarea" class="form-control" rows="4" cols="50" ></textarea> -->
                          <Field name="clientNotes" as="textarea" class="form-control" rows="4" cols="50" />
                          <ErrorMessage name="clientNotes" class="error-feedback" />
                          
                          <!-- <p><sub style="color:#007bff;" >{{verifyReservationS}}</sub></p> -->
                          <!-- <sub style="color:#28a745;">{{verifyReservationSS}}</sub> -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row justify-content-center">
                    <div class="col-lg-3">
                      <div class="form-group">
                        <br>
                        <button v-if="!sendReservationSuccess"  class="btn btn-primary btn-block" style="background-color:rgb(73,105,144);border-color:rgb(73,105,144);" :disabled="sendReservationLoading">
                          <span
                            v-if="sendReservationLoading"
                            class="spinner-border spinner-border-sm"
                          ></span>
                            Crear reserva
                        </button>
                        <div v-else>
                          <h5 class="text-center">Reserva creada con exito</h5>
                          <button class="btn btn-primary btn-block" style="background-color:rgb(73,105,144);border-color:rgb(73,105,144);" @click="sendReservationSuccess = false">
                              OK
                          </button>                          
                        </div>
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
      hotelReservationReference: yup
        .string()
        .required('Obligatorio'),
      clientFirstName: yup
        .string()
        .required('Obligatorio'),
      restaurantId: yup
        .string()
        .required('Obligatorio'),
      clientEmail: yup
        .string()
        .required('Obligatorio')
        .email(),
      resDate: yup
        .string()
        .required('Obligatorio'),
      schedule: yup
        .string()
        .required('Obligatorio'),
      people: yup
        .string()
        .required('Obligatorio'),
      lang: yup
        .string()
        .required('Obligatorio'),
      nores: yup
        .string(),
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
      searchLoading : false,
      sendReservationLoading : false,
      sendReservationSuccess : false,
      newResRestaurantId:"",
      newResResDate:"",
      newResAvailability:null,
      newResAvailabilityLoading : false,
      // newResSchedule:null,
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
      }
    ).catch(err => {
      if(err?.response?.status == 401){
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      }
    });
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  watch : {
    newResResDate(val){
      this.findRestAv(this.newResRestaurantId, val)
    },
    newResRestaurantId(val){
      this.findRestAv(val, this.newResResDate)
    },
  },
  methods: {
    findRestAv(restaurantId, resDate){
      if(restaurantId && resDate){
        this.newResAvailabilityLoading = true
        UserService.getAvailability({          
          startDate: resDate,
          endDate: resDate,
          restaurantId,
        }).then(res => {
          this.newResAvailability = res.data[0]
          this.newResAvailabilityLoading = false
        })
      }
    },
    findRes(brazalete, setFieldValue){
      this.searchLoading = true
      UserService.checkAvailability({hotelReservationReference: brazalete}).then(res => {
        this.searchLoading = false
        if(res.data){
          setFieldValue('clientFirstName',res.data.client.name)
          setFieldValue('hotelReservationReference',res.data.hotelReservation.Code)
        }
      }).catch(() => {
        this.searchLoading = false
      })
    },
    sendReservation(values, { resetForm }){

      let aux = {...values}
      delete aux['brazalete']
      aux.status = 'active'
      aux.clientLastName = '.'

      this.sendReservationLoading = true
      UserService.createReservation(aux).then(() => {
        resetForm()
        this.sendReservationLoading = false
        this.sendReservationSuccess = true

      }).catch(() => {
        this.sendReservationLoading = false
      })

    },
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