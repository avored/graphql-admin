<template>
  <div>
      <h1>{{ $t('catalog.category.edit') }}</h1>
       <a-form
        :form="categoryForm"
        @submit="handleSubmit"
      >
        <a-form-item style="display:none" label="Id">
            <a-input
              v-decorator="[
                'id',
                {rules: [{ required: true, message: 'Please enter id for an category' }]}
              ]"
            />
        </a-form-item>
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
import CATEGORY_FETCH from '@/graphql/catalog/category/Fetch.gql';
import CATEGORY_UPDATE from '@/graphql/catalog/category/Update.gql';
import CategoryFields from '@/components/catalog/CategoryFields.vue';
import pick from 'lodash/pick';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';

export default {
  name: 'category-edit',
  components: {
    'category-fields': CategoryFields
  },
  data() {
      return {
        category: {},
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
                mutation: CATEGORY_UPDATE,
                variables: values,
              }).then(({data}) => {
                  app.$notification['success']({
                      message: app.$t('catalog.category.update_success'),
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
     
   
  },
  apollo: {
      category: {
          query: CATEGORY_FETCH,
          variables() {
            return { id: this.$route.params.id };
          },
          update ({fetchCategory}) {
            window.x = this.categoryForm;
              this.categoryForm.getFieldDecorator('id', {});
              this.categoryForm.getFieldDecorator('name', {});
              this.categoryForm.getFieldDecorator('slug', {});
              this.categoryForm.getFieldDecorator('meta_title', {});
              this.categoryForm.getFieldDecorator('meta_description', {});

              this.categoryForm.setFieldsValue(pick(fetchCategory, ['id', 'name', 'slug', 'meta_title', 'meta_description']));
              return fetchCategory
          },
      },
  }
}
</script>
