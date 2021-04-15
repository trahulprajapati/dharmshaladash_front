<template>
<CRow>
    <div class="container">
        <div class="col-sm-10 bg-white text-dark border">
          <div class="row frow header border">
              <h4><strong class="col-sm-9"> सदस्य जोड़ें </strong></h4>
          </div>
          <br>
          <div class="row frow d-flex justify-content-center">
            <form class="col-12">
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-2 col-form-label"  for="first_name" required>नाम *</label>
                    <input type="text" class="form-control col-sm-9" name="first_name" id="first_name"
                    v-model="first_name" required/>
                    <span class="error" v-if="errors.first_name"> {{errors.first_name}}</span>
                </div>
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-3 col-form-label" for="last_name">सरनेम *</label>
                    <input type="text" class="form-control col-sm-9" name="last_name" id="last_name"
                    v-model="last_name" required/>
                    <span class="error" v-if="errors.last_name"> {{errors.last_name}}</span>
                </div>
              </div>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-2 col-form-label"  for="gender">लिंग *</label>
                    <select class="form-control col-sm-9" id="gender" v-model="gender">
                      <option value="male">पुरुष</option>
                      <option value="female">महिला</option>
                      <option value="other">अन्य</option>
                    </select>
                    <span class="error" v-if="errors.gender"> {{errors.gender}}</span>
                </div>
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-3 col-form-label" for="father">पिता *</label>
                    <input type="text" class="form-control col-sm-9" name="father" id="father"
                    v-model="father" required/>
                    <span class="error" v-if="errors.father"> {{errors.father}}</span>
                </div>
              </div>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-2 col-form-label"  for="age">उम्र </label>
                    <input type="text" class="form-control col-sm-9" name="age" id="age"
                    v-model="age"/>
                </div>
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-3 col-form-label" for="village">गाँव *</label>
                    <input type="text" class="form-control col-sm-9" name="village" id="village"
                    v-model="village" required/>
                    <span class="error" v-if="errors.village"> {{errors.village}}</span>
                </div>
              </div>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-2 col-form-label"  for="mobile">मोबाइल *</label>
                    <input type="text" class="form-control col-sm-9" name="mobile" id="mobile"
                    v-model="mobile" required/>
                    <span class="error" v-if="errors.mobile"> {{errors.mobile}}</span>
                </div>
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-3 col-form-label" for="alt_mobile">अतिरिक्त  मोबाइल</label>
                    <input type="text" class="form-control col-sm-9" name="alt_mobile" id="alt_mobile"
                    v-model="alt_mobile"/>
                </div>
              </div>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-2 col-form-label"  for="occupation">व्यवसाय</label>
                    <input type="text" class="form-control col-sm-9" name="occupation" id="occupation"
                    v-model="occupation"/>
                </div>
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-3 col-form-label" for="email">ईमेल</label>
                    <input type="text" class="form-control col-sm-9" name="email" id="email"
                    v-model="email"/>
                    <span class="error" v-if="errors.email"> {{errors.email}}</span>
                </div>
              </div>
               <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-2 col-form-label"  for="address">पता</label>
                    <textarea type="text" class="form-control col-sm-10" name="address" id="address"
                    v-model="address"/>
                </div>
                 <!-- <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-2 col-form-label"  for="role">पद</label>
                    <select class="form-control col-sm-9" id="role" v-model="role">
                      <option value="male">पुरुष</option>
                      <option value="female">महिला</option>
                      <option value="other">अन्य</option>
                    </select>
                </div>   -->
              </div>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                   <button type="submit" :class="['btn btn-primary mb-2 mr-4', (canSubmit == true ? 'disable' : '')]">जोड़े</button>
                   <button type="submit" class="btn btn-primary mb-2">रिसेट</button>
                </div>
              </div>
            </form>
          </div>
        </div>
    </div>
</CRow>

</template>

<script>
//import { api } from  '../../../'
import { api } from '../../../api.js';
export default {
  name: 'Register',
  data() {
    return {
      errors: [],
      first_name: null,
      last_name: null,
      gender: null,
      father: null,
      age: null,
      village: null,
      mobile: null,
      alt_mobile: null,
      occupation: null,
      email: null,
      address: null,
    }
  },
  created() {
    //alert("hihih");
    api.get('/prajapatidharmashala/api/account/list/').then(res => {
      //alert(res.data);
    }).catch( e => {
      //alert(e)
    })
  },
  watch: {
    first_name(value) {
      this.first_name = value;
      this.require_check('first_name', value, 'Name');
    },
    last_name(value) {
      this.last_name = value;
      this.require_check('last_name', value, 'Surname');
    },
    gender(value) {
      this.gender = value;
      this.require_check('gender', value, 'Gender');
    },
    father(value) {
      this.father = value;
      this.require_check('father', value, 'Father');
    },
    mobile(value) {
      this.mobile = value;
      this.require_check('mobile', value, 'Mobile');

      //mobile number validation
      var phoneno = /^\d{10}$/;
      if (value.match(phoneno)) {
        this.errors['mobile'] = '';
      } else {
        this.errors['mobile'] = 'Mobile Number is Invalid';
      }
    },
    village(value) {
      this.village = value;
      this.require_check('village', value, 'Village');
    },
    // email (value) {
    //   var mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    //   if(value.match(mailformat)) {
    //     this.errors['email'] = '';
    //   } else {
    //     this.errors['email'] = 'Invalid Email';
    //   }
    // }

  },
  cumputed:{
    // canSubmit () {
    //   alert('sdd')
    //   //if (Object.keys(this.errors).length > 0) {}
    //   return Object.keys(this.errors).length > 0;
    // }
  },
  methods: {
    require_check(prop, val, p) {
      if (!val) {
        this.errors[prop] = p+' is required';
      } else {
        this.errors[prop] = '';
      }
    },
    canSubmit () {
      alert('sdd')
      //if (Object.keys(this.errors).length > 0) {}
      return Object.keys(this.errors).length > 0;
    }
  }
}
</script>

<style scoped>
.header {
  padding: 60px;
  text-align: center;
  background: rgb(99, 110, 117);
  color: white;
  font-size: 30px;
}

.error {
  color: red;
}

.frow {
  padding: 7px;
}
</style>