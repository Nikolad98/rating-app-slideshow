<template>
  <div class="slideshow">
    <slot />
    <div class="navigate">
      <div class="toggle-page left">
        <img src="../assets/left.svg" @click="showPrevious" />
      </div>
      <div class="toggle-page right">
        <img src="../assets/right.svg" @click="showNext" />
      </div>
    </div>
    <div class="pagination">
      <span
        @click="toExactSlide(index + 1)"
        v-for="(slide, index) in getSlidesLength"
        :key="index"
        :class="{ active: index + 1 === getCurrentSlide }"
      ></span>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  setup() {
    const store = useStore();

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
.navigate {
  padding: 0 16px;
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  .toggle-page {
    display: flex;
    flex: 1;
  }

  .right {
    justify-content: flex-end;
  }

  img {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    color: white;
  }
}
.pagination {
  position: absolute;
  bottom: 24px;
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;

  span {
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
  }
  .active {
    background-color: rgb(157, 214, 240);
  }
}
</style>
