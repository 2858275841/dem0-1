<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <!-- 左边侧边栏 -->
        <Left></Left>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 头部区域 -->
          <Header></Header>
          <!-- <Home></Home> -->
        </el-header>
        <el-main>
          <Tag></Tag>
          <!-- 子路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Left from '@/components/Left.vue'
import Header from '@/components/Head.vue'
import Tag from '@/components/Tag.vue'
export default {
  name: 'Main',
  components: {
    Left,
    Header,
    Tag
  }
}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
  // border: 0;
}
.el-main {
  padding-bottom: 0;
}
</style>
