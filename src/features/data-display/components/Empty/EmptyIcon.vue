<script setup lang="ts">
  defineOptions({
    name: 'VetroEmptyIcon',
  });
</script>

<template>
  <div data-slot="empty-icon">
    <slot>
      <span class=":uno: i-ghost block size-12" />
    </slot>
  </div>
</template>
