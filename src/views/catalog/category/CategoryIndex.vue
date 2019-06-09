<template>
  <div>
        <h1 class="float-left">{{ $t('catalog.category.index') }}</h1>
        <router-link  :to="{ name:'admin.category.create'}">
            <a-button class="float-right" type="primary"  icon="plus">
                Create
            </a-button>
        </router-link>
        <div class="clearfix"></div>

      <a-table
        :columns="columns"
        :rowKey="record => record.id"
        :pagination="pagination"
        @change="handleCategoryIndexChange"
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
import isEmpty from 'lodash/isEmpty';
import { filter } from 'minimatch';

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
        pagination: {},
        categories: null,
        columns,
        }
    },
    methods: {
        handleCategoryIndexChange(pagination, filters, sorter) {
            console.log(pagination, filter, sorter);
        },
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
                            app.$notification['success']({
                            message: data.deleteCategory,
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
        },
        async fetchCategoryCollection(params = {}) {
            let data = await this.$apollo.query({
                query: CATEGORY_ALL
            });
            this.loading = false;
            return data.data.allCategory;
        },  
    },
    async mounted() {
        this.categories = await this.fetchCategoryCollection();
    },    
}
</script>
