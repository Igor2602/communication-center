<script setup lang="ts">
import type { DateDividerProps } from './types'

defineProps<DateDividerProps>()
</script>

<template>
  <div
    class="date-divider"
    role="separator"
  >
    <hr class="date-divider__line">
    <span class="date-divider__label">{{ label }}</span>
    <hr class="date-divider__line">
  </div>
</template>

<style scoped lang="scss">
.date-divider {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-lg 0 $spacing-md;

  &__line {
    flex: 1;
    border: none;
    border-top: 1px solid $color-border;
  }

  &__label {
    flex-shrink: 0;
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    white-space: nowrap;
  }
}
</style>
