<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <div class="date-divider" role="separator">
    <span class="date-divider__label">{{ label }}</span>
  </div>
</template>

<style scoped lang="scss">
.date-divider {
  @include flex-center;
  padding: $spacing-md 0;

  &__label {
    padding: $spacing-xs $spacing-md;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
    background-color: $color-bg-tertiary;
    border-radius: $radius-full;
  }
}
</style>
