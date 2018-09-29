const state = {
  accessToken: null,
  refreshToken: null
}

const mutations = {
  setTokens (state, payload) {
    state.accessToken = payload.accessToken
    state.refreshToken = payload.refreshToken
  }
}

const actions = { }

export default {
  state,
  mutations,
  actions
}
