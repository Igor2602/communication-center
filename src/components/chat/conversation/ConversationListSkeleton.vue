<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
</script>

<template>
  <div class="conversation-skeleton">
    <div
      v-for="i in 6"
      :key="i"
      class="conversation-skeleton__item"
    >
      <Skeleton
        shape="circle"
        size="3rem"
      />
      <div class="conversation-skeleton__content">
        <div class="conversation-skeleton__top">
          <Skeleton
            width="60%"
            height="0.875rem"
          />
          <Skeleton
            width="2.5rem"
            height="0.75rem"
          />
        </div>
        <Skeleton
          width="80%"
          height="0.75rem"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.conversation-skeleton {
  padding: $spacing-xs 0;

  &__item {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    padding: $spacing-md $spacing-lg;
  }

  &__content {
    @include flex-column;
    flex: 1;
    gap: $spacing-sm;
  }

  &__top {
    @include flex-between;
  }
}
</style>
