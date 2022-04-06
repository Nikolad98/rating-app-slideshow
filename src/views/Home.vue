<template>
  <div class="home">
    <transition name="slideshow">
      <Slideshow class="slideshow" v-if="showSlideshow">
        <Slide v-for="(slide, index) in getSlides" :key="index">
          <div class="slide-info" v-show="getCurrentSlide === index + 1">
            <img :src="require(`../assets/${slide}.jpg`)" />
          </div>
        </Slide>
      </Slideshow>
    </transition>
    <transition name="slideshow">
      <div class="static" v-if="showHomeImage">
        <div class="home-img"></div>
        <button @click="startPresentation">start the presentation</button>
      </div>
    </transition>
  </div>
</template>

<script>
import Slideshow from '../components/Slideshow';
import Slide from '../components/Slide';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
export default {
  name: 'Home',
  components: { Slideshow, Slide },
  setup() {
    const store = useStore();
    const showSlideshow = ref(false);
    const showHomeImage = ref(true);
    const startPresentation = () => {
      showHomeImage.value = false;
      setTimeout(() => {
        showSlideshow.value = true;
      }, 500);
    };

    return {
      showSlideshow,
      getSlides: computed(() => store.getters.getSlides),
      getCurrentSlide: computed(() => store.getters.getCurrentSlide),
      startPresentation,
      showHomeImage,
    };
  },
};
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  width: 100%;
  background-color: #2d3038;
  display: flex;
  justify-content: center;
  align-items: center;

  .slideshow {
    position: relative;
    height: 80vh;
    width: 80%;

    .slide-info {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      img {
        min-width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .static {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .home-img {
      position: relative;
      height: 70vh;
      width: 70%;
      background-image: url('../assets/417.jpg');
      background-position: bottom bottom;
      background-size: cover;
      background-repeat: no-repeat;
    }

    button {
      margin-top: 30px;
      padding: 20px 40px;
      font-size: 25px;
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      text-transform: uppercase;
      background: transparent;
      border-radius: 5px;
      border: 2px solid whitesmoke;
      color: whitesmoke;
      cursor: pointer;
    }
  }
}
.slideshow-enter-active,
.slideshow-leave-active {
  transition: opacity 0.5s ease;
}

.slideshow-enter-from,
.slideshow-leave-to {
  opacity: 0;
}
</style>

