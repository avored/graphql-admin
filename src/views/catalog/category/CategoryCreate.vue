<template>
  <div>
      <h1>{{ $t('catalog.category.create') }}</h1>
       <a-form
        :form="categoryForm"
        @submit="handleSubmit"
      >
        <a-form-item label="Name">
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: 'Please enter name for an category' }]}
            ]"
          />
        </a-form-item>

        <a-form-item label="Slug">
          <a-input
            v-decorator="[
              'slug',
              {rules: [{ required: true, message: 'Please enter slug for an category' }]}
            ]"
          />
        </a-form-item>

        <a-form-item label="Meta Title">
          <a-input 
            v-decorator="[
              'meta_title',
              {rules: [{ required: false }]}
            ]"
            />
        </a-form-item>

        <a-form-item label="Meta Description">
          <a-input 
            v-decorator="[
              'meta_description',
              {rules: [{ required: false }]}
            ]"
            />
        </a-form-item>
       

        <a-form-item>
          <a-button type="primary" html-type="submit">
            Save
          </a-button>

        </a-form-item>
      </a-form>
  </div>
</template>

<script>
import CATEGORY_CREATE from '@/graphql/catalog/category/Create.gql';
import isEmpty from 'lodash/isEmpty';

export default {
  name: 'category-create',
  components: {
  },
  data() {
      return {
        categoryForm: this.$form.createForm(this),
      }
  },
  methods: {
      handleSubmit (e) {
        e.preventDefault();
        var app = this;
        this.categoryForm.validateFields((err, values) => {
          if (!err) {
              this.$apollo.mutate({
                mutation: CATEGORY_CREATE,
                variables: values,
              }).then(({data}) => {
                  app.$notification['success']({
                      message: app.$t('catalog.category.create_success'),
                  });
                  app.$router.push('/admin/catalog/category');
              }).catch(({message, debugMessage}) => {
                   if (!isEmpty(message)) {
                          app.$notification['error']({
                               message: message,
                           });
                      }
                      if (!isEmpty(debugMessage)) {
                          app.$notification['error']({
                               message: debugMessage,
                           });
                      }
                      return;
              });
          }
        });
      }
  },
  mounted() {
  }
}
</script>
