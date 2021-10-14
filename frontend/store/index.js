export const state = () => ({
  lang: '',
  bigMenu: false,
  showMenu: false,
  labels: [],
})

export const getters = {
  lang: (state) => state.lang,
  bigMenu: (state) => state.bigMenu,
  showMenu: (state) => state.showMenu,
  labels: (state) => state.labels,
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

  setLabels: (state, labels) => {
    state.labels = labels
  },
}
