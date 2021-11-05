export const state = () => ({
  lang: '',
  bigMenu: false,
  showMenu: false,
  menuState: false,
  labels: [],
  pageTitle: '',
  error: false,
})

export const getters = {
  lang: (state) => state.lang,
  bigMenu: (state) => state.bigMenu,
  showMenu: (state) => state.showMenu,
  labels: (state) => state.labels,
  isMenuSmall: (state) => !state.bigMenu || state.menuState,
  pageTitle: (state) => state.pageTitle,
  error: (state) => state.error,
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

  setMenuState: (state, menuState) => {
    state.menuState = menuState
  },

  setPageTitle: (state, pageTitle) => {
    state.pageTitle = pageTitle
  },

  setError: (state, error) => {
    state.error = error
  },
}
