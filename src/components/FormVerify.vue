<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <br><br><br>
        <Form @submit="checkAvailability2" :validation-schema="sche">
          <div v-if="!successful">
            <div class="row justify-content-center">
              <div class="col-lg-4">
                <div class="form-group">
                  <label for="hotelReservationReference"> {{ $t('home.t1') }}</label>
                  <Field name="hotelReservationReference" type="text" class="form-control" />
                  <ErrorMessage name="hotelReservationReference" class="error-feedback" />
                  <sub style="color:red;">{{verifyReservation}}</sub>
                </div>
              </div>
            </div>
            <div>
            </div>
            <div class="row justify-content-center">
              <div class="col-lg-4">
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
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Home",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const sche = yup.object().shape({
      hotelReservationReference: yup
        .string()
        .required("#Bracelet or Reserve is necessary")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
    });
    return {
      sche,
    };

  },
  methods: {
    checkAvailability2(user) {
      this.loading = true
      console.log(user)
    },
  }
}
</script>
<style scoped>
.error-feedback {
  color: red;
}
</style>
