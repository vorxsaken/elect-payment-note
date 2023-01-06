import Vue from 'vue'
import Vuex from 'vuex'
import { getDocWithId, getAll, getStartAfterDescData } from '../plugins/utils';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    profilePicture: '',
    role: '',
    pembayaranListrik: [],
    totalPembayaranListrik: 0,
    lastVisiblePembayaranListrik: null,
    homeScrollPosition: 0
  },
  mutations: {
    setUserInfo(state, payload) {
      state.username = payload.name;
      state.profilePicture = payload.foto;
      state.role = payload.role;
    },
    setTotalPembayaranListrik(state, payload) {
      state.totalPembayaranListrik = payload
    },
    setPembayaranListrik(state, payload) {
      state.lastVisiblePembayaranListrik = payload[payload.length - 1].tanggal_pembayaran;
      state.pembayaranListrik = [...payload];
    },
    pushNextPembayaranListrik(state, payload) {
      state.lastVisiblePembayaranListrik = payload[payload.length - 1].tanggal_pembayaran;
      state.pembayaranListrik = [...state.pembayaranListrik, ...payload];
    },
    updateHomeScrollPosition(state, payload) {
      state.homeScrollPosition = payload
    },
    unshiftPembayaranListrik(state, payload) {
      state.pembayaranListrik = [ payload, ...state.pembayaranListrik];
    },
    filterPembayaranListrik(state, payload) {
      state.pembayaranListrik = state.pembayaranListrik.filter(doc => doc.id != payload);
    }
  },
  actions: {
    async getUser({ commit }) {
      const getUserInfo = await getDocWithId('user', localStorage.getItem('id'));
      commit('setUserInfo', getUserInfo)
    },
    async getTotalPembayaranListrik({ commit }) {
      const totalPembayaranListrik = await getAll('pembayaran_listrik');
      commit('setTotalPembayaranListrik', totalPembayaranListrik.length)
    },
    async getPembayaranListrik({ state, commit, dispatch }) {
      var payload = [];
      const getPembayaranListrik = await getAll('pembayaran_listrik', true, true, 'tanggal_pembayaran', true, 5);

      for (const doc of getPembayaranListrik) {
        if (!state.pembayaranListrik.some(dat => dat.id == doc.id)) {
          let getUsername = await getDocWithId('user', doc.id_user);
          payload.push({ username: getUsername.name, foto: getUsername.foto, ...doc });
        }
      }
      commit('setPembayaranListrik', payload);
      await dispatch('getTotalPembayaranListrik');
      // console.log('length : ', state.pembayaranListrik.length);
      // console.log('total : ', state.totalPembayaranListrik);
    },
    async getNextPembayaranListrik({ state, commit }) {
      var payload = [];
      const getNextPembayaranListrik = await getStartAfterDescData('pembayaran_listrik', state.lastVisiblePembayaranListrik, 'tanggal_pembayaran', 5);
      for (const doc of getNextPembayaranListrik) {
        if (!state.pembayaranListrik.some(dat => dat.id == doc.id)) {
          let getUsername = await getDocWithId('user', doc.id_user);
          payload.push({ username: getUsername.name, foto: getUsername.foto, ...doc });
        }
      }
      commit('pushNextPembayaranListrik', payload);
    },
    async addNewPembayaranListrik({ commit, dispatch, state }, payload) {
      const getUser = await getDocWithId('user', payload.data().id_user);
      if (!state.pembayaranListrik.some(doc => doc.id == payload.id)) {
        const data = { id: payload.id, username: getUser.name, foto: getUser.foto, ...payload.data() };
        commit('unshiftPembayaranListrik', data);
        dispatch('getTotalPembayaranListrik');
      }
    },
    async removeSavedPembayaranListrik({ commit, dispatch }, payload) {
      commit('filterPembayaranListrik', payload.id);
      dispatch('getTotalPembayaranListrik');
    }
  },
  modules: {
  }
})
