<template>
  <div>
      <h1>{{ $t('catalog.category.edit') }}</h1>
  </div>
</template>

<script>
import CATEGORY_ALL from '@/graphql/catalog/category/All.gql'

const columns = [
      {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      }, 
      {
      title: 'Slug',
      dataIndex: 'slug',
      },
      {
      title: 'Action',
      dataIndex: 'action',
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
