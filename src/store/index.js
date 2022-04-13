import { createStore } from 'vuex';

export default createStore({
  state: {
    slides: 15,
    currentSlide: 1,
  },
  mutations: {
    showNext(state) {
      if (state.currentSlide === 18) {
        return;
      } else {
        state.currentSlide++;
      }
    },
    showPrevious(state) {
      if (state.currentSlide === 1) {
        return;
      } else {
        state.currentSlide--;
      }
    },
    toExactSlide(state, slidePosition) {
      state.currentSlide = slidePosition;
    },
  },
  actions: {
    showNext({ commit }) {
      commit('showNext');
    },
    showPrevious({ commit }) {
      commit('showPrevious');
    },
    toExactSlide({ commit }, slidePosition) {
      commit('toExactSlide', slidePosition);
    },
  },
  modules: {},
  getters: {
    getSlides(state) {
      return state.slides;
    },
    getCurrentSlide(state) {
      return state.currentSlide;
    },
    getSlidesLength(state) {
      return state.slides.length;
    },
  },
});

