<template>
  <div>
    <el-card shadow="always">
      <div class="login_text">
        <p>系统登录</p>
      </div>
      <el-form ref="loginInfo" :inline="true" :rules="rules" :model="loginInfo">
        <el-form-item label="账号" prop="user">
          <el-input
            type="tetx"
            v-model="loginInfo.user"
            placeholder="请输入账号"
            style="width: 221px"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            show-password
            v-model="loginInfo.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <div class="login_button">
          <el-button type="primary" @click="loginGo">登录</el-button>
          <el-button type="warning" @click="reset">重置</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loginInfo: {
        user: '',
        password: ''
      },
      rules: {
        user: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 5,
            max: 18,
            message: '长度在 5 到 18 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 5,
            max: 16,
            message: '长度在 5 到 16 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 登录业务
    loginGo() {
      this.$refs.loginInfo.validate((valid) => {
        if (valid) {
          this.$axios
            .get('/api/login', {
              params: {
                username: this.loginInfo.user,
                password: this.loginInfo.password
              }
            })
            .then((res) => {
              // console.log(res)
              if (res.data.code === 400) {
                // 登录失败
                this.$message({
                  showClose: true,
                  message: '登录失败,请检查账号和密码！',
                  type: 'error',
                  duration: 2000,
                  center: true
                })
              } else {
                // eslint-disable-next-line no-unused-vars
                const cookie = localStorage.setItem('aa_cookie', 'aa-bb-cc')
                // 登录成功
                this.$message({
                  showClose: true,
                  message: '登录成功！',
                  type: 'success',
                  duration: 2000,
                  center: true
                })
                this.$router.push('/home')
              }
            })
            .catch(() => {
              console.log('接口请求失败')
            })
        } else {
          return false
        }
      })
    },
    // 重置业务
    reset() {
      this.$refs.loginInfo.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  width: 350px;
  height: 250px;
  margin: 150px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_text {
    width: 100px;
    height: 30px;
    margin: auto;
    margin-bottom: 10px;
  }

  .login_button {
    width: 150px;
    height: 50px;
    margin: auto;
  }
}
</style>
