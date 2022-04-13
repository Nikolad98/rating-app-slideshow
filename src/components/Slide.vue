<template>
  <div class="slide">
    <transition name="slide">
      <slot />
    </transition>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.8s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>
