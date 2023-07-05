<template>
  <div class="header-container">
    <!-- 左边 -->
    <div class="l-conten">
      <el-row style="display: flex;align-self: center;">
        <el-button icon="el-icon-menu" size="small" @click="handleMenu"></el-button>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in tags" :key="item.name" :to="{ path: item.path }">{{ item.label
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </div>
    <!-- 右边 -->
    <div class="r-conten">
      <el-row class="block-col-2">
        <el-dropdown  @command="handleCommand">
          <span class="el-dropdown-link">
            <div class="block"><el-avatar :size="50" :src="img_src"></el-avatar><i
                class="el-icon-arrow-down el-icon--right"></i>
            </div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user-solid">个人资料</el-dropdown-item>
            <el-dropdown-item icon="el-icon-error" command="x">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'myHeader',
  methods: {
    ...mapMutations(['collapseMenu', 'getImgsrc']),
    handleMenu() {
      this.collapseMenu()
    },
    handleCommand() {
      localStorage.removeItem('aa_cookie')
      this.$message({ showClose: true, message: '退出成功', type: 'success', duration: 2000, center: true })
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapState({
      img_src: 'img_src',
      tags: state => state.tabsList
    })
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  padding-top: 10px;
}

.header-container {
  height: 60px;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-button {
    margin-left: 20px;
  }

  .el-dropdown-link {
    cursor: pointer;
  }

  .el-breadcrumb {
    margin-left: 10px;
  }

  .l-conten {
    /deep/.el-breadcrumb__inner {
      // color: #666;
      font-weight: normal;

      &.is-link {
        color: #666;
      }

    }

    /deep/span:last-child {
      .el-breadcrumb__inner {
        color: #fff;
      }
    }
  }

}</style>
