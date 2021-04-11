<template>
<div align="center">
  <br><br>
    <div class="container">
        <div class="col-sm-9 bg-white text-dark border">
          <div class="row frow header border">
              <h4><strong class="col-sm-9"> नया सदस्य जोड़ें </strong></h4>
          </div>
          <br>
          <div class="row frow d-flex justify-content-center">
            <form class="col-12">
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-2 col-form-label"  for="first_name">नाम</label>
                    <input type="text" class="form-control col-sm-9" name="first_name" id="first_name"
                    v-model="first_name"/>
                </div>
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-3 col-form-label" for="last_name">सरनेम</label>
                    <input type="text" class="form-control col-sm-9" name="last_name" id="last_name"
                    v-model="last_name"/>
                </div>
              </div>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-2 col-form-label"  for="gender">लिंग</label>
                    <select class="form-control col-sm-9" id="gender" v-model="gender">
                      <option value="male">पुरुष</option>
                      <option value="female">महिला</option>
                      <option value="other">अन्य</option>
                    </select>
                    <!-- <input type="text" class="form-control col-sm-9" name="first_name" id="first_name"
                    v-model="first_name"/> -->
                </div>
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-3 col-form-label" for="father">पिता</label>
                    <input type="text" class="form-control col-sm-9" name="father" id="father"
                    v-model="father"/>
                </div>
              </div>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-2 col-form-label"  for="age">उम्र</label>
                    <input type="text" class="form-control col-sm-9" name="age" id="age"
                    v-model="age"/>
                </div>
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-3 col-form-label" for="village">गाँव</label>
                    <input type="text" class="form-control col-sm-9" name="village" id="village"
                    v-model="village"/>
                </div>
              </div>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-2 col-form-label"  for="mobile">मोबाइल</label>
                    <input type="text" class="form-control col-sm-9" name="mobile" id="mobile"
                    v-model="mobile"/>
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
                </div>
              </div>
               <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                    <label class="col-sm-2 col-form-label"  for="address">पता</label>
                    <textarea type="text" class="form-control col-sm-10" name="address" id="address"
                    v-model="address"/>
                </div>
              </div>
              <div class="form-group row">
                <div class="form-row form-inline col-sm-5">
                   <button type="submit" class="btn btn-primary mb-2 mr-4 ">जोड़े</button>
                   <button type="submit" class="btn btn-primary mb-2">रिसेट</button>
                </div>
              </div>
            </form>
          </div>
        </div>
    </div>
</div>

</template>

<script>
export default {
  name: 'Register'
}
</script>

<style scoped>
.header {
  padding: 60px;
  text-align: center;
  background: rgb(67, 140, 182);
  color: white;
  font-size: 30px;
}

.frow {
  padding: 7px;
}
</style>