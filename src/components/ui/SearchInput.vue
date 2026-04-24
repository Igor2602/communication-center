<script setup lang="ts">
withDefaults(defineProps<{
  placeholder?: string
  ariaLabel?: string
}>(), {
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
  gap: 7px;
  height: 33px;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  background-color: #f3f7fb;
  padding: 0 $spacing-md;

  &__icon {
    font-size: 14px;
    color: #475569;
    flex-shrink: 0;
  }

  &__field {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-family: $font-family-base;
    font-size: 14px;
    font-weight: $font-weight-medium;
    line-height: 100%;
    letter-spacing: 0;
    color: $color-text-primary;
    padding: 0;

    &::placeholder {
      color: #475569;
    }
  }
}
</style>
