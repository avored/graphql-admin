<template>
  <div>
      <h1>{{ $t('catalog.category.create') }}</h1>
       <a-form
        :form="categoryForm"
        @submit="handleSubmit"
      >
        <category-fields />
        <a-form-item>
          <a-button type="primary" html-type="submit">
            Save
          </a-button>
          <router-link class="ml-1" :to="{ name:'admin.category.index'}">
              <a-button>
                  Cancel
              </a-button>
          </router-link>

        </a-form-item>
      </a-form>
  </div>
</template>

<script>
import CATEGORY_CREATE from '@/graphql/catalog/category/Create.gql';
import CategoryFields from '@/components/catalog/CategoryFields.vue';
import isEmpty from 'lodash/isEmpty';

export default {
  name: 'category-create',
  components: {
    'category-fields': CategoryFields
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
