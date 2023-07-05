<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
    active-text-color="#ffd04b" router :collapse="isCollapse">
    <h3 class="h3" v-if="isCollapse === false">通用后台管理系统</h3>
    <h3 class="h3" v-if="isCollapse === true">后台</h3>
    <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.path" @click="clickMenu(item)">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="item in item.children" :key="item.name">
        <router-link :to="item.path">
          <el-menu-item :index="item.name">{{ item.label }}</el-menu-item>
        </router-link>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Left',
  created() {
  },
  data() {
    return {
      // isCollapse: false,
      menuData: [
        {
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          path: '/home/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'video-play',
          url: 'MallManage/MallManage'
        },
        {
          path: '/home/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/home/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/home/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        }
      ]
    }
  },
  methods: {
    clickMenu(item) {
      // console.log(item)
      this.$store.commit('selectMenu', item)
    }
  },
  // 计算属性
  computed: {
    // 没有子菜单
    noChildren() {
      return this.menuData.filter((item) => !item.children)
    },
    // 有子菜单
    hasChildren() {
      return this.menuData.filter((item) => item.children)
    },
    ...mapState(['isCollapse'])
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  // overflow: hidden;
}

.el-menu {
  height: 125vh;
  color: #fff;
  border-right: 0;

  .h3 {
    text-align: center;
  }

  a {
    color: #fff;
    text-decoration: none;
  }
}
</style>
