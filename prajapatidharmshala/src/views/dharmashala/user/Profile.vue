<template>
  <div> 
    <Modal
        v-show="isModalVisible"
        @close="closeModal"
    >
      <!-- header -->
      <template v-slot:header>
          प्रोफाइल - {{ first_name }} 
      </template>
      <!-- body -->
      <template v-slot:body>
          <div class="row justify-content-center fdiv">
            <form class="col-12" @submit.prevent="submit">
              <span class="error" v-if="showError">  {{errors.error}}</span>
              <div class="form-group row">
                 <!-- <span class="error" v-if="errors.error"> {{errors.error}}</span> -->
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
                    <select class="form-control col-sm-9" id="gender" v-model="gender" required>
                      <option value="MALE">पुरुष</option>
                      <option value="FEMALE">महिला</option>
                      <option value="OTHER">अन्य</option>
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
                    v-model="mobile" readonly required/>
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
                    <label class="col-sm-2 col-form-label"  for="address">पता</label>
                    <textarea type="text" class="form-control col-sm-10" name="address" id="address"
                    v-model="address"/>
                </div>
                 <!-- <div class="form-row form-inline col-sm-5">
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
                </div>   -->
              </div> <br>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                   <button type="submit" :class="['btn btn-primary mb-2 mr-4'] " :disabled="isDisabled">सम्पादित करें</button>
                   <button type="button" class="btn btn-primary mb-2"  @click="closeModal()">बंद करें </button>
                </div>
              </div>
            </form>
          </div>
        </template>

      <!-- footer -->
      <!-- <template v-slot:footer>
      </template> -->
    </Modal>
  </div>
</template>

<script>
import Modal from '../base/Modal'
import { api } from '../../../api.js';

export default({
    name: 'Profile',
      components: {
    Modal
  },
  data() {
    return {
      errors: [],
      isModalVisible: true,
      showError:false,
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
      role: null,
    }
  },
  created() {
    let id =  localStorage.getItem('mobile')
    api.get('/prajapatidharmashala/api/account/list/'+id).then(res => {
        console.log (JSON.stringify(res.data));
        this.insert_modal(res.data)
    }).catch( e => {
        alert (e);
        errors['error'] = e;
    })
  },
  computed: {
    isDisabled() {
      if (this.first_name == undefined || this.father == undefined 
      || this.first_name == '' || this.father == ''
      || this.last_name == undefined || this.last_name == ''
      || this.village == undefined || this.village == ''
      || this.mobile == undefined || this.mobile == ''
      || this.errors.length > 0 ) {
        return true
      } else {
        return false
      }
    },
  }, 
  methods: {
    async submit() {
      //alert('dwe');
      const user = {
        mobile: this.mobile,
        email: this.email,
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
      //console.log(JSON.stringify(user) + '----' + tok);
      await api.patch("prajapatidharmashala/api/account/update/"+this.mobile, user,
        {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+tok
        },}
      ).then(res => {
          this.$router.push("/");
      }).catch(err => {
        alert(err)
        this.showError = true
        this.errors['error'] = err
      })
    },
    showModal(id) {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.$router.push("/");
    },
    insert_modal(res) {
      //alert(res.mobile)
      this.mobile = res.mobile
      this.first_name = res.profile.first_name
      this.last_name = res.profile.last_name
      this.father = res.profile.father
      this.alt_mobile = res.profile.alt_mobile
      this.village = res.profile.village
      this.age = res.profile.age
      this.occupation = res.profile.occupation
      this.address = res.profile.address
      this.gender = res.profile.gender
    },
  }
})
</script>
<style scoped>
.fdiv {
  margin: 5px 15px;
  /* margin: 15px; */
}


.error {
  color:white;
  margin: 2px 40px;
  background: red;
}
</style>
