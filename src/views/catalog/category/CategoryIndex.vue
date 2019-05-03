<template>
  <div>
      <h1>{{ $t('catalog.category.index') }}</h1>
      <a-table :columns="columns"
        :rowKey="record => record.login.uuid"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template slot="name" slot-scope="name">
          {{name.first}} {{name.last}}
        </template>
  </a-table>
  </div>
</template>

<script>
import axios from 'axios';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  width: '20%',
  scopedSlots: { customRender: 'name' },
}, {
  title: 'Gender',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
  ],
  width: '20%',
}, {
  title: 'Email',
  dataIndex: 'email',
}];


export default {
  name: 'category-index',
  components: {
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns,
    }
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    },
    fetch (params = {}) {
      console.log('params:', params);
      this.loading = true
      axios({
        url: 'https://randomuser.me/api',
        data: {
          results: 10,
          ...params,
        },
        method: 'get',
        type: 'json',
      }).then((data) => {
        console.log(data);
        const pagination = { ...this.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 200;
        this.loading = false;
        this.data = data.results;
        this.pagination = pagination;
      });
    }
  },
  mounted() {
    this.fetch({});
  }
}
</script>

<style lang="less" scoped>
   
</style>
