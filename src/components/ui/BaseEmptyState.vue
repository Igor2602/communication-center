<script setup lang="ts">
defineProps<{
  icon?: string
  title: string
  description?: string
}>()
</script>

<template>
  <div class="empty-state">
    <i v-if="icon" :class="icon" class="empty-state__icon" aria-hidden="true" />
    <h2 class="empty-state__title">{{ title }}</h2>
    <p v-if="description" class="empty-state__description">{{ description }}</p>
  </div>
</template>

<style scoped lang="scss">
.empty-state {
  @include flex-center;
  @include flex-column;
  gap: $spacing-sm;
  height: 100%;
  padding: $spacing-xl;
  text-align: center;

  &__icon {
    font-size: 3rem;
    color: $color-border;
    margin-bottom: $spacing-sm;
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
  }

  &__description {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    max-width: 280px;
    line-height: $line-height-base;
  }
}
</style>
