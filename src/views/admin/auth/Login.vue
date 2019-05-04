<template>
 <div>
  <a-row type="flex" align="middle">
      <a-col :span="12">
          <a-row type="flex">
          <a-col :span="20" :offset="2">
              <a-card title="AvoRed Login Cart">
                   <a-form
                      :form="loginForm"
                      method="post"
                      action="#"
                      @submit.prevent="handleSubmit"
                  >
                     
                      <a-form-item      
                         
                          label="Email Address">
                            <a-input
                          :auto-focus="true"
                          name="email"
                          
                          v-decorator="[
                          'email',
                          {rules: 
                              [
                                  {   required: true, 
                                      message: '' 
                                  }
                              ]
                          }
                          ]"
                      />
                      </a-form-item>
                      
                      <a-form-item 
                         
                          label="Password">
                          <a-input
                              name="password"
                              type="password"
                              v-decorator="[
                              'password',
                              {rules: [{ required: true, message: '' }]}
                              ]"
                          />
                      </a-form-item>
                      
                      <a-form-item>
                          <a-button
                              type="primary"
                              html-type="submit"
                          >
                              Login
                          </a-button>
                      </a-form-item>
                  </a-form>
              </a-card>
          </a-col>
          </a-row>
      </a-col>
      <a-col :span="12">
          <div class="h-100 bg-primary">
          </div>
      </a-col>
  </a-row>
</div>
         
</template>
<script>

import gql from 'graphql-tag';
import UserAuth from '@/graphql/UserAuth.gql';
import isNil from 'lodash/isNil';
import {AUTH_TOKEN} from '@/constants';

export default {
  name: 'admin-login',
  components: {
    
  },
  data() {
    return {
        loginForm: this.$form.createForm(this),
        email: '',
        password: ''
    }
  },
 
  methods: {
    async handleSubmit() {
      var result = await this.authMutation()
      if (!isNil(result.data.auth.access_token)) {
        localStorage.setItem(AUTH_TOKEN, result.data.auth.access_token);
        this.$router.push('/')
      }
    },

    async authMutation() {
        this.$apollo.client = "auth";

        return this.$apollo.mutate({
            // Query
            mutation: UserAuth,
            clientId: 'auth',
            // Parameters
            variables: {
              email: "admin@admin.com",
              password: "admin123",
            },
          }).then((data) => {
              return data;
          }).catch((error) => {
              console.error(error);
          });
    }
  }
}
</script>
