<template>
  <div  class="container">
    <div class="ftl">
      <div class="row">
        <div class="col-sm-2">
          <h5>नाम द्वारा खोजे</h5>
          </div>
        <div class="col-sm-10">
          <input class="form-control col-sm-3" type="search" v-model="filter">
        </div>
      </div>
      <div class="row">
         <div class="col-sm-10">
           <!-- <p> sort={{currentSort}}, dir={{currentSortDir}}, page={{currentPage}} </p> -->
           <p>sort={{currentSort}},  page={{currentPage}} </p>
         </div>
         <div class="col-sm-2">
          <button class="btn btn-primary mb-2 mr-2" @click="prevPage">पीछे</button>
          <button class="btn btn-primary mb-2" @click="nextPage">आगे</button>
         </div>
      </div>
    </div>
    <table class="table table-striped table-bordered tbl" id="user">
      <thead class="thead-dark">
        <tr>
          <th v-for="(obj, ind) in config" :key="ind"  @click="sort(obj.key)">
                {{ obj.title }} 
                <img src="../../../../public/img/avatars/ascdsc1.jpg" class="img" style="width:13px;height:15px;">
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in sortedData" :key="index">
          <td v-for="(obj, ind) in config" :key="ind">
            <span v-if="obj.key === 'id'">
               <button @click="showModal(row[obj.key])">
                 <img src="../../../../public/img/avatars/edit.jpg" style="width:25px;height:20px;" >
               </button>
              <!-- <a class="icon" href="#"><img src="../../../../public/img/avatars/edit.jpg" style="width:25px;height:20px;" @click="$refs.editModal.openModal()"></a> -->
              <a href="#"><img src="../../../../public/img/avatars/delete.jpg" style="width:20px;height:20px;"></a>{{row[obj.id]}}
            </span>
            <span v-else>{{row[obj.key]}}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- MODAL  -->
     <Modal
        v-show="isModalVisible"
        @close="closeModal"
      >
        <template v-slot:header>
          सदस्य अपडेट
        </template>

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

        <template v-slot:footer>
          This is a new modal footer.
        </template>
      </Modal>

  </div>
</template> 

<script>
//import Modal from "../Moda"
import Modal from '../base/Modal.vue'
import { api } from '../../../api.js';
export default {
  name: 'DTable',
  components: {
    Modal
  },
  //props: ['theData', 'config'], 
  props: {
    theData: {
      type: Array,
    },
    config: {
      type: Array,
    },
    pageSize: {
      type: Number,
      default: 9,
    }
  },
   data() {
    return {
      currentPage: 1,
      filter: '',
      currentSort: 'name',
      currentSortDir: 'asc',
      isModalVisible: false,
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
      role: null
    }
  },
  watch: {
    filter() {
      console.log('reset to p1 due to filter');
      this.currentPage = 1;
    },
    first_name(value) {
      //showError = false
      this.first_name = value;
      this.require_check('first_name', value, 'Name');
    },
    last_name(value) {
      //showError = false
      this.last_name = value;
      this.require_check('last_name', value, 'Surname');
    },
    gender(value) {
      //showError = false
      this.gender = value;
      this.require_check('gender', value, 'Gender');
    },
    father(value) {
      //showError = false
      this.father = value;
      this.require_check('father', value, 'Father');
    },
    village(value) {
      this.village = value;
      this.require_check('village', value, 'Village');
    },
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
    isLoggedIn: function() {
      //tkn = this.$store.getters.isAuthenticated
      return this.$store.getters.isAuthenticated;
    },
    filteredData() {
      return this.theData.filter(c => {
        if(this.filter == '') return true;
        return c.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
      })
    },
    sortedData() {
      return this.filteredData.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
    }
  },
  methods: {
    sort:function(s) {
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.filteredData.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    },
    showModal(id) {
      //alert(id)
      api.get('/prajapatidharmashala/api/account/list/'+id).then(res => {
        console.log (JSON.stringify(res.data));
        this.insert_modal(res.data)
      }).catch( e => {
        alert (e);
        errors['error'] = e;
      })
      this.isModalVisible = true;
    },
    closeModal() {
      //this.errors['error'] = ''
      this.isModalVisible = false;
    },

    // update methods
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
    require_check(prop, val, p) {
      if (!val) {
        this.errors[prop] = p+' is required';
      } else {
        this.errors[prop] = '';
      }
    },
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
          this.$router.push("/dharmashala/user/list");
      }).catch(err => {
        alert(err)
        this.showError = true
        this.errors['error'] = err
      })
    },
  }
}

</script>

<style scoped>
.overflow-hidden {
  overflow: hidden;
}
.tbl {
  margin: 20px;
  width: 100.1%;
  border-collapse: collapse;
}

.error {
  color: red;
}

.img {
  margin-right: 5px;
  margin-left: 5px;
}

.icon {
  margin-right: 30px;
  margin-left: 15px;
}
.ftl {  
  margin-right: 20px;
  margin-left: 20px;
}

.frow {
  padding: 7px;
}

.fdiv {
  margin: 7px 15px;
  /* margin: 15px; */
}
</style>