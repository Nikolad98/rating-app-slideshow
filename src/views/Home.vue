<template>
  <div class="home">
    <transition name="slideshow">
      <Slideshow class="slideshow" @fullscreen="toggleApi">
        <fullscreen v-model="fullscreen">
          <Slide v-for="(slide, index) in getSlides" :key="slide">
            <div class="slide-info" v-show="getCurrentSlide === index + 1">
              <img :src="require(`../assets/slide-${slide}.svg`)" />
            </div>
          </Slide>
          <Slide>
            <div
              class="slide-info static"
              v-if="getCurrentSlide === 16"
              :class="{ shake: shake }"
            >
              <div class="content">
                <p @click="startPresentation">Team: 417</p>
                <div>
                  <p class="home-text">
                    {{ homeText }}
                    <span class="typing-cursor" v-if="showCursor"></span>
                  </p>
                  <transition name="not-img">
                    <div class="not-img" v-if="showNot"></div>
                  </transition>
                </div>
              </div>
            </div>
          </Slide>
          <Slide>
            <div class="slide-info" v-show="getCurrentSlide === 17">
              <img src="../assets/slide-17.svg" />
            </div>
          </Slide>
          <Slide>
            <div class="slide-info" v-show="getCurrentSlide === 18">
              <img src="../assets/slide-18.svg" />
            </div>
          </Slide>
        </fullscreen>
      </Slideshow>
    </transition>
  </div>
</template>

<script>
import Slideshow from '../components/Slideshow';
import Slide from '../components/Slide';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ref, onMounted } from 'vue';
export default {
  name: 'Home',
  components: { Slideshow, Slide },
  methods: {
    toggleApi() {
      this.$fullscreen.toggle();
    },
  },
  setup() {
    /* DATA */
    const store = useStore();
    /* END OF DATA */

    /* START PRESENTATION */
    const showCursor = ref(false);
    const showNot = ref(false);
    const shake = ref(false);
    const fullscreen = ref(false);
    const startPresentation = () => {
      showCursor.value = true;
      setTimeout(() => {
        typeWriter();
      }, 1000);

      setTimeout(() => {
        showCursor.value = false;
        showNot.value = true;
      }, 4000);

      setTimeout(() => {
        shake.value = true;
      }, 4800);

      setTimeout(() => {
        shake.value = false;
      }, 5700);
    };
    const toggle = () => {
      fullscreen.value = !fullscreen.value;
    };
    /* END OF START PRESENTATION */

    /* WRITING ANIMATION */
    let homeText = ref('');
    let text = 'Expectation Failed';
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        homeText.value += text.charAt(i);
        i++;
        setTimeout(typeWriter, 110);
      }
    };
    /* END OF WRITING ANIMATION */

    onMounted(() => {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          startPresentation();
        }
      });
    });

    return {
      getSlides: computed(() => store.getters.getSlides),
      getCurrentSlide: computed(() => store.getters.getCurrentSlide),
      startPresentation,
      homeText,
      showNot,
      showCursor,
      shake,
      fullscreen,
      toggle,
    };
  },
};
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  width: 100%;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;

  .slideshow {
    position: relative;
    height: 100vh;
    width: 100%;

    .slide-info {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .team-slide {
      position: absolute;
      background: url('../assets/417.jpg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: top center;
    }
  }

  .static {
    position: absolute;
    background: url('../assets/417.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .content {
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .home-text {
        display: inline;
        position: relative;
      }
      .not-img {
        position: absolute;
        display: inline-block;
        background-image: url('../assets/not.png');
        background-position: center center;
        background-size: cover;
        width: 100px;
        height: 80px;
        margin-left: -100px;
        margin-top: -10px;
      }

      p {
        color: whitesmoke;
        font-size: 35px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        letter-spacing: 1px;
        padding-right: 5px;
      }
      .typing-cursor {
        display: inline-block;
        position: absolute;
        top: 10px;
        right: 0;
        width: 2px;
        height: 30px;
        background-color: whitesmoke;
        animation: cursorAnimation 0.5s infinite;
      }
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

.not-img-enter-active,
.not-img-leave-active {
  animation: notAnimation 0.8s ease-in;
}

.not-img-enter-from,
.not-img-leave-to {
  transform: scale(2);
}

@keyframes notAnimation {
  0% {
    transform: scale(2.2);
    margin-top: -200px;
  }
  90% {
    transform: scale(2.5);
    margin-top: -200px;
  }
  100% {
    transform: scale(1);
    margin-top: -10px;
  }
}
@keyframes cursorAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.shake {
  animation: shake 0.83s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>

