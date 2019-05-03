<template>
  <div>
      <h1>{{ $t('catalog.category.index') }}</h1>
      <a-table :columns="columns"
        :rowKey="record => record.id"
        :loading="loading"
        :dataSource="categories"
      >
        <template slot="name" slot-scope="name">
          {{ name }}
        </template>
  </a-table>
  </div>
</template>

<script>
import axios from 'axios';
import CATEGORY_ALL from '@/graphql/catalog/category/AllCategory.gql'

const columns = [
      {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      width: '20%',
      scopedSlots: { customRender: 'name' },
      }, 
      {
      title: 'Slug',
      dataIndex: 'slug',
      },
      {
      title: 'Meta Title',
      dataIndex: 'meta_title',
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
