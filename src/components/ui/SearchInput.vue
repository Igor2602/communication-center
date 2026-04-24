<script setup lang="ts">
import type { SearchInputProps } from './types'

withDefaults(defineProps<SearchInputProps>(), {
  placeholder: 'Buscar',
  ariaLabel: 'Buscar',
})

const modelValue = defineModel<string>({ default: '' })
</script>

<template>
  <div class="search-input">
    <i class="pi pi-search search-input__icon" />
    <input
      v-model="modelValue"
      type="search"
      class="search-input__field"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
    >
  </div>
</template>

<style scoped lang="scss">
.search-input {
  position: relative;
  display: flex;
  align-items: center;
  gap: $button-gap;
  height: $search-input-height;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  background-color: $color-bg-hover;
  padding: 0 $spacing-md;

  &__icon {
    font-size: $icon-size-sm;
    color: $color-text-muted;
    flex-shrink: 0;
  }

  &__field {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-family: $font-family-base;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    line-height: 100%;
    letter-spacing: 0;
    color: $color-text-primary;
    padding: 0;

    &::placeholder {
      color: $color-text-muted;
    }
  }
}
</style>
