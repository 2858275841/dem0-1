export default {
  state: {
    isCollapse: false // 控制左侧的收起与展开
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    }
  }
}
