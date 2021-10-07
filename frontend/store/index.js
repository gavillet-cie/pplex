export const state = () => ({
  lang: '',
  bigMenu: false,
  showMenu: false,
})

export const getters = {
  lang: (state) => state.lang,
  bigMenu: (state) => state.bigMenu,
  showMenu: (state) => state.showMenu,
}

export const mutations = {
  setLang: (state, lang) => {
    state.lang = lang
  },

  setBigMenu: (state, bigMenu) => {
    state.bigMenu = bigMenu
  },

  setShowMenu: (state, showMenu) => {
    state.showMenu = showMenu
  },
}
