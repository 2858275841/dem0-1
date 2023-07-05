<template>
  <div>
    <el-tag  v-for="(item, index) in items" :key="item.path" :closable="item.name !== 'home'" :effect="$route.path === item.path ? 'dark' : 'plain'" @close="handleClose(index)" @click="changeMenu(item)">
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Tag',
  data() {
    return {

    }
  },
  methods: {
    // 点击tag跳转
    changeMenu(item) {
      this.$router.push({ name: item.name })
    },
    // 删除tag标签
    handleClose(index) {
      this.items.splice(index, 1)
      this.$router.push({ name: this.items[this.items.length - 1].name })
    }
  },
  computed: {
    ...mapState({
      items: state => state.tabsList
    })
  },
  mounted() {
    // console.log(this.$route)
  }
}
</script>

<style lang="less" scoped>
.el-tag--dark {
  margin-bottom: 5px;
}

.el-tag--plain{
  margin: 0 10px;
  cursor: pointer;
}
.el-tag--plain:nth-child(1){
    margin-left: 0;
}
</style>
