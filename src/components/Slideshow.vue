<template>
  <div class="slideshow">
    <slot />
    <div class="pagination">
      <span
        @click="toExactSlide(index + 1)"
        v-for="(slide, index) in 18"
        :key="index"
        :class="{ active: index + 1 === getCurrentSlide }"
      ></span>
      <img
        v-show="!fullscreen"
        @click="$emit('fullscreen')"
        class="fullscreen"
        src="../assets/full-screen.svg"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          store.dispatch('showNext');
        } else if (e.key === 'ArrowLeft') {
          store.dispatch('showPrevious');
        }
      });
    });

    return {
      showNext: () => store.dispatch('showNext'),
      showPrevious: () => store.dispatch('showPrevious'),
      toExactSlide: (index) => store.dispatch('toExactSlide', index),
      leftSlide: () => store.dispatch('leftSlide'),
      rightSlide: () => store.dispatch('rightSlide'),
      getSlidesLength: computed(() => store.getters.getSlidesLength),
      getCurrentSlide: computed(() => store.getters.getCurrentSlide),
    };
  },
};
</script>

<style scoped lang="scss">
.pagination {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  opacity: 0.8;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;

  &:hover {
    background-color: lightgray;

    .fullscreen {
      opacity: 1;
    }
    /* span {
      opacity: 1;
    } */
  }

  span {
    cursor: pointer;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: rgb(129, 129, 129);
    opacity: 0.7;
  }
  .active {
    background-color: rgb(35, 38, 43);
  }
  .fullscreen {
    position: absolute;
    top: 25px;
    right: 35px;
    cursor: pointer;
    opacity: 0;
  }
}
</style>
