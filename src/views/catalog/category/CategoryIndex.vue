<template>
  <div>
      <h1>{{ $t('catalog.category.index') }}</h1>
      <a-table :columns="columns"
        :rowKey="record => record.id"
        :loading="loading"
        :dataSource="categories"
      >
        <template slot="action" slot-scope="action, record">
            <router-link  :to="{ name:'admin.category.edit', params:{id:record.id} }">
                <a-icon type="edit"></a-icon> 
            </router-link>
            <a @click="deleteCategory(record)">
                 <a-icon type="delete" />
            </a>
        </template>
  </a-table>
  </div>
</template>

<script>
import CATEGORY_ALL from '@/graphql/catalog/category/All.gql'
import CATEGORY_DELETE from '@/graphql/catalog/category/Delete.gql'
import UserAuth from '@/graphql/UserAuth.gql';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
    },{
        title: 'Slug',
        dataIndex: 'slug',
        sorter: true,
    },{
        title: 'Action',
        dataIndex: 'action',
        width: '10%',
        scopedSlots: { customRender: 'action' },
    }
  ];

export default {
  name: 'category-index',
  components: {
  },
  data() {
    return {
      loading: true,
      categories: null,
      columns,
    }
  },
  methods: {
      deleteCategory(record) {
          var app = this;
          this.$confirm({
              title: 'Do you want to delete this record?',
              onOk() {
                return app.$apollo.mutate({
                    mutation: CATEGORY_DELETE,
                    variables: {
                      id: record.id
                    },
                  }).then(({data}) => {
                        console.log(data);
                        app.$notification['success']({
                           message: data.delete_category,
                        });
                        app.$router.push('/admin/catalog/category');
                  }).catch((error) => {
                      app.$notification['error']({
                           message: error.message,
                       });
                      return;
                  });
              }
          });
      }
  },
  mounted() {

  },
  apollo: {
      categories: {
        query: CATEGORY_ALL,
        update ({ all_category }) {
            this.loading = false;
            return all_category
		},
      },
  }
}
</script>
