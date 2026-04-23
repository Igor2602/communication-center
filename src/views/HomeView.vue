<script setup lang="ts">
</script>

<template>
  <main class="home">
    <h1 class="home__title">Communication Center</h1>
  </main>
</template>

<style scoped lang="scss">
.home {
  @include flex-center;
  flex: 1;

  &__title {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
  }
}
</style>
