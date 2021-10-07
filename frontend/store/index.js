export const state = () => ({
  lang: '',
  bigMenu: false,
})

export const getters = {
  lang: (state) => state.lang,
  bigMenu: (state) => state.bigMenu,
}

export const mutations = {
  setLang: (state, lang) => {
    state.lang = lang
  },

  setBigMenu: (state, bigMenu) => {
    state.bigMenu = bigMenu
  },
}
