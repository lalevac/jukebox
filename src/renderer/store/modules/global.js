const state = {
  accessToken: null,
  refreshToken: null,
  expirationDate: null
}

const mutations = {
  setTokens (state, payload) {
    state.accessToken = payload.accessToken
    state.refreshToken = payload.refreshToken
    state.expirationDate = new Date().getTime() + (payload.expiresIn * 1000)
  },
  refreshToken (state, payload) {
    state.accessToken = payload.accessToken
    state.expirationDate = new Date().getTime() + (payload.expiresIn * 1000)
  }
}

const actions = { }

export default {
  state,
  mutations,
  actions
}
