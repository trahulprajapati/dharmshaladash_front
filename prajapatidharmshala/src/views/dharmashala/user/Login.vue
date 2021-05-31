<template>
  <div> 
    <Modal
        v-show="isModalVisible"
        @close="closeModal"
    >
      <!-- header -->
      <template v-slot:header>
          लॉगिन   
      </template>
      <!-- body -->
      <template v-slot:body>
          <div class="row  fdiv">
            <form class="col-6 lform"   @submit.prevent="submit">
              <img src="../../../../public/img/avatars/loginlogo1.jpeg" class="imgbtn" style="width:180px;height:150px;" >
              <div class="form-group ">
                 <!-- <span class="error" v-if="errors.error"> {{errors.error}}</span> -->
                <div class="form-row form-inline col-sm-10">
                    <label class="col-sm-3 col-form-label"  for="mobile" required>मोबाइल*</label>
                    <input type="text" class="form-control col-sm-9" name="mobile" id="mobile"
                    v-model="mobile" required/>
                    <span class="error subtn" v-if="errors.mobile"> {{errors.mobile}}</span>
                </div>
              </div>
              <div class="form-group ">
                <div class="form-row form-inline col-sm-10">
                    <label class="col-sm-3 col-form-label" for="password">पासवर्ड*</label>
                    <input type="text" class="form-control col-sm-9" name="password" id="password"
                    v-model="password" required/>
                    <span class="error" v-if="errors.password"> {{errors.password}}</span>
                </div>
                <!-- <p v-if="errors.password" id="error">Username or Password is incorrect</p> -->
                <span class="error" v-if="showError"> यूजरनाम या पासवर्ड गलत है  {{errors.error}}</span>
              </div> 
              <div class="form-group fdiv">
                <!-- <span class="error" v-if="showError"> यूजरनाम या पासवर्ड गलत है  {{errors.error}}</span> -->
                <div class="form-row form-inline col-sm-10 subtn">
                   <button type="submit" :class="['btn btn-primary mb-3 mr-4 col-sm-10']" :disabled="isDisabled">लॉगिन</button>
                   <!-- <button type="button" class="btn btn-primary mb-2"  @click="closeModal()">बंद करें </button> -->
                </div>
              </div>
            </form>
            <div  class="col-12">
              <h6> <strong> नोट : </strong> </h6>
               <ul>
                 <li>केवल रजिस्टर्ड मोबाइल से ही लॉगिन हो पायेगा  </li>
                <li>केवल धर्मशाला समिति सदस्य ही लॉगिन कर सकते हैं </li>
                <li>यदि आप धर्मशाला समिति सदस्य और लॉगिन नहीं कर पाते है तो तो एडमिन से संपर्क करे </li>
                <li>एडमिन की जानकारी के लिए सदस्य सूचि पेज पर जाएं </li>
                <!-- <li> धर्मशाला की जानकारी की सम्पूर्ण एक्सेस के लिए लॉगिन करना आवश्यक है  </li> -->
              </ul> 
            </div>
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
import { mapActions } from "vuex"

export default({
    name: 'Login',
      components: {
    Modal
  },
  data() {
    return {
      errors: [],
      isModalVisible: true,
      mobile: null,
      password: null,
      showError:false
    }
  },
  computed: {
    isDisabled() {
      if (this.mobile == undefined || this.password == undefined 
      || this.mobile == '' || this.password == ''
      || this.errors.length > 0 ) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    mobile(value) {
      this.showError = false
      this.mobile = value;
      this.require_check('mobile', value, 'Mobile');

      //mobile number validation
      // var phoneno = /^\d{10}$/;
      // if (value.match(phoneno)) {
      //   this.errors['mobile'] = '';
      // } else {
      //   this.errors['mobile'] = 'Mobile Number is Invalid';
      // }
    },
    password(value) {
      this.showError = false
      this.password = value;
      this.require_check('father', value, 'Father');
    }
  },
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      const User = {
        mobile: this.mobile,
        password: this.password
      };
      // User.append("mobile", this.mobile);
      // User.append("password", this.password);
      try {
          await this.LogIn(User);
          this.$router.push("/");
      } catch (error) {
        this.showError = true
        // this.$router.push("/");
        this.errors['error'] = error
      }
    },
    showModal(id) {
      //alert(id)
      // api.get('/prajapatidharmashala/api/account/list/'+id).then(res => {
      //   console.log (JSON.stringify(res.data));
      //   this.insert_modal(res.data)
      // }).catch( e => {
      //   alert (e);
      //   errors['error'] = e;
      // })
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.$router.push("/");
    },
    require_check(prop, val, p) {
      if (!val) {
        this.errors[prop] = p+' is required';
      } else {
        this.errors[prop] = '';
      }
    },
    validateForm() {

    }
  }
})
</script>
<style scoped>
.fdiv {
  margin: 5px 15px;
  /* margin: 15px; */
}
.lform {
  /* margin: 5px 70px 5px 250px; */
  margin: 5px 50px 5px 200px;
  text-align: center;
  /* padding: 2%; */
  border: solid;
  border-width:1px;
  border-color: rgb(175, 172, 172);
  /*   */
}

.subtn {
  margin: 2px 5px 10px 55px;
}

.imgbtn {
  margin: 5px 50px 5px 50px;
}

.error {
  color:white;
  margin: 2px 40px;
  background: red;
}
</style>
