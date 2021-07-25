<template>
<CRow>
    <div class="container">
        <div class="col-sm-12 bg-white text-dark border">
          <div class="row frow header border">
              <h5><strong class="col-sm-9"> सदस्य जोड़ें </strong></h5>
          </div>
          <br>
          <div class="row frow d-flex justify-content-center">
            <form class="col-12" @submit.prevent="submit">
              <span class="error" v-if="showError">  {{errors.error}}</span>
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
                      <option value="MALE">पुरुष</option>
                      <option value="FEMALE">महिला</option>
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
                    <label class="col-sm-3 col-form-label" for="email">ई-मेल</label>
                    <input type="text" class="form-control col-sm-9" name="email" id="email"
                    v-model="email"/>
                    <span class="error" v-if="errors.email"> {{errors.email}}</span>
                </div>
              </div>
               <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-2 col-form-label"  for="address">पता*</label>
                    <textarea type="text" class="form-control col-sm-9" name="address" id="address"
                    v-model="address"/>
                    <span class="error" v-if="errors.address"> {{errors.address}}</span>
                </div>
                 <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-3 col-form-label"  for="role">पद</label>
                    <select class="form-control col-sm-9" id="role" v-model="role">
                      <option value="male">अध्यक्ष</option>
                      <option value="female">उपाध्यक्ष</option>
                      <option value="other">सचिव</option>
                      <option value="male">उप-सचिव</option>
                      <option value="female">कोषाध्यक्ष</option>
                      <option value="other">समिति सदस्य</option>
                      <option value="other">अन्य</option>
                    </select>
                </div>  
              </div>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                   <button type="submit" :class="['btn btn-primary mb-2 mr-4']" :disabled="isDisabled">सम्पादित करें</button>
                   <button type="submit" class="btn btn-primary mb-2" @click="reset_form">रिसेट</button>
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
const users = {}
const email = {}
export default {
  name: 'Register',
  data() {
    return {
      errors: [],
      showError:false,
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
      role: null
    }
  },
  created() {
    //alert("hihih");
    api.get('/prajapatidharmashala/api/account/list/').then(res => {
      this.get_users(res.data);
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

      //check if mobile number is already exist
      if (users[value]) {
        this.errors['mobile'] = 'यह मोबाइल नंबर पहले से रजिस्टर है '

      }
    },
    village(value) {
      this.village = value;
      this.require_check('village', value, 'Village');
    },
    address(value) {
      this.address = value;
      this.require_check('address', value, 'Address');
    },
    email (value) {
      // var mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
      // if(value.match(mailformat)) {
      //   this.errors['email'] = '';
      // } else {
      //   this.errors['email'] = 'Invalid Email';
      // }

      if (email[value]){
        this.errors['email'] = 'यह ई-मेल पहले से रजिस्टर है '
      } else {
        this.errors['email'] = '';
      }
    }

  },
  computed:{
    isDisabled() {
      if (this.first_name == undefined || this.father == undefined 
      || this.first_name == '' || this.father == ''
      || this.last_name == undefined || this.last_name == ''
      || this.village == undefined || this.village == ''
      || this.mobile == undefined || this.mobile == ''
      || this.address == undefined || this.address == ''
      || users[this.mobile]
      || this.errors.length > 0 ) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    require_check(prop, val, p) {
      if (!val) {
        this.errors[prop] = p+' is required';
      } else {
        this.errors[prop] = '';
      }
    },
    get_users (res) {
      res.forEach((item) => {
        users[item.mobile] = item.mobile;
        email[item.email] = item.email;
      })
      //alert(JSON.stringify(users))
    },
    reset_form(){
      this.first_name = ''
      this.last_name = ''
      this.mobile = ''
      this.alt_mobile = ''
      this.age = ''
      this.village = ''
      this.occupation = ''
      this.email = ''
      this.role = ''
      this.address = ''
      this.errors.error=''
      this.errors = []
    },

    async submit() {
      //alert('dwe');
      const user = {
        mobile: this.mobile,
        email: this.email,
        password: '12345',
        profile: {
          first_name: this.first_name,
          last_name: this.last_name,
          village: this.village,
          father: this.father,
          alt_mobile: this.alt_mobile,
          occupation: this.occupation,
          gender: this.gender,
          address: this.address,
          age: this.age
        }
      }

      //let o =  this.$store.getters.isAuthenticated;
      let tok = localStorage.getItem('token')
      console.log(JSON.stringify(user) + '----' + tok);
      await api.post("/prajapatidharmashala/api/account/register", user,
        {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+tok
        },}
      ).then(res => {
          alert(JSON.stringify(res.data))
          this.reset_form();
          //this.$router.push("/dharmashala/user/list");
      }).catch(err => {
        //alert(err)
        //alert(JSON.stringify(err.response.data))
        this.showError = true
        this.errors['error'] = err+JSON.stringify(err.response.data)
      })
    },
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