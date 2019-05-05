<template>
    <div>
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
    </div>
</template>

<script>
export default {
    name: 'category-fields',
}
</script>
