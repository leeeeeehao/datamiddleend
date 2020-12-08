<template>
<div>
   <a-breadcrumb>
        <router-link to='/home'>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
        </router-link>
        <a-breadcrumb-item v-if="$route.meta.model">
            {{$route.meta.model}}
        </a-breadcrumb-item>
        <a-breadcrumb-item v-if="$route.meta.title">
          {{$route.meta.title}}
        </a-breadcrumb-item>
      </a-breadcrumb>
      <a-divider />
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>