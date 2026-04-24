<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
</script>

<template>
  <div class="message-skeleton">
    <div class="message-skeleton__divider">
      <Skeleton
        width="6rem"
        height="0.75rem"
        border-radius="999px"
      />
    </div>

    <!-- Incoming -->
    <div class="message-skeleton__row">
      <Skeleton
        shape="circle"
        size="2.5rem"
      />
      <div class="message-skeleton__bubble">
        <Skeleton
          width="4rem"
          height="0.75rem"
        />
        <Skeleton
          width="16rem"
          height="2.5rem"
          border-radius="12px"
        />
      </div>
    </div>

    <!-- Outgoing -->
    <div class="message-skeleton__row message-skeleton__row--outgoing">
      <div class="message-skeleton__bubble message-skeleton__bubble--right">
        <Skeleton
          width="3rem"
          height="0.75rem"
        />
        <Skeleton
          width="12rem"
          height="2.5rem"
          border-radius="12px"
        />
      </div>
      <Skeleton
        shape="circle"
        size="2.5rem"
      />
    </div>

    <!-- Incoming -->
    <div class="message-skeleton__row">
      <Skeleton
        shape="circle"
        size="2.5rem"
      />
      <div class="message-skeleton__bubble">
        <Skeleton
          width="5rem"
          height="0.75rem"
        />
        <Skeleton
          width="20rem"
          height="2.5rem"
          border-radius="12px"
        />
      </div>
    </div>

    <!-- Outgoing -->
    <div class="message-skeleton__row message-skeleton__row--outgoing">
      <div class="message-skeleton__bubble message-skeleton__bubble--right">
        <Skeleton
          width="3rem"
          height="0.75rem"
        />
        <Skeleton
          width="14rem"
          height="2.5rem"
          border-radius="12px"
        />
      </div>
      <Skeleton
        shape="circle"
        size="2.5rem"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.message-skeleton {
  @include flex-column;
  gap: $spacing-lg;
  padding: $spacing-lg;
  height: 100%;

  &__divider {
    @include flex-center;
    padding: $spacing-md 0;
  }

  &__row {
    display: flex;
    align-items: flex-start;
    gap: $spacing-sm;
  }

  &__row--outgoing {
    justify-content: flex-end;
  }

  &__bubble {
    @include flex-column;
    gap: $spacing-xs;
  }

  &__bubble--right {
    align-items: flex-end;
  }
}
</style>
