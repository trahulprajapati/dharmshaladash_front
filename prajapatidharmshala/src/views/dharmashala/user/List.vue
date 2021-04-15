<template>
<CRow>
    <div class="container">
        <div class="col-sm-12 bg-white text-dark border">
          <div class="row frow header border">
              <h4><strong class="col-sm-12">  सदस्य सूची </strong></h4>
          </div>
          <br>
          <div class="row frow d-flex justify-content-center">
            
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