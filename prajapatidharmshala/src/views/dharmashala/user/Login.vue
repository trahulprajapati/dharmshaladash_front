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
            <!-- <div  class="col-12">
              <h5>प्रजापति धर्मशाला लॉगिन पेज में आपका स्वागत है </h5><br>
            </div> -->

            <form class="col-12">
              <div class="form-group row">
                 <span class="error" v-if="errors.error"> {{errors.error}}</span>
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-2 col-form-label"  for="mobile" required>मोबाइल*</label>
                    <input type="text" class="form-control col-sm-9" name="mobile" id="mobile"
                    v-model="mobile" required/>
                    <span class="error" v-if="errors.mobile"> {{errors.mobile}}</span>
                </div>
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-3 col-form-label" for="password">पासवर्ड*</label>
                    <input type="text" class="form-control col-sm-9" name="password" id="password"
                    v-model="password" required/>
                    <span class="error" v-if="errors.password"> {{errors.password}}</span>
                </div>
              </div> <br>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                   <button type="submit" :class="['btn btn-primary mb-2 mr-4']">सम्पादित करें</button>
                   <button type="button" class="btn btn-primary mb-2"  @click="closeModal()">बंद करें </button>
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
                <li> धर्मशाला की जानकारी की सम्पूर्ण एक्सेस के लिए लॉगिन करना आवश्यक है  </li>
              </ul> 
            </div>
          </div>
      </template>
      <!-- footer -->
      <!-- <template v-slot:footer>
        रजिस्ट्रेश के लिए एडमिन से संपर्क करे  
      </template> -->
    </Modal>
  </div>
</template>

<script>
import Modal from '../base/Modal'
import { api } from '../../../api.js';

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
      password: null
    }
  },
  watch: {
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
    password(value) {
      this.password = value;
      this.require_check('father', value, 'Father');
    }
  },
  methods: {
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
  }
})
</script>
<style scoped>
.fdiv {
  margin: 7px 15px;
  /* margin: 15px; */
}
</style>
