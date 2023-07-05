<template>
  <div class="manage">
    <el-dialog title="新增用户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model.number="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择" style="width: 93%;">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-col :span="20">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.birth"
              style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <!-- <span>这是一段信息</span> -->

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="tableAdd">
        + 新增
      </el-button>
      <el-form :inline="true" :model="userForm" class="userRefer">
        <el-form-item>
          <el-input v-model="userForm.name" placeholder="请输入查询的用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableDate" stripe style="width: 100%" height="69%">
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="age" label="年龄">
      </el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.sex == 1 ? '男' : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="birth" label="出生日期">
      </el-table-column>
      <el-table-column prop="addr" label="地址">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span></span>
          <el-button size="small" @click="tbaleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="tbaleDle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="total" @current-change="tableDatePag">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: ''
      },
      thisItem: '',
      open: 0, // 0表示新增，1表示编辑
      // 表单校验
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        birth: [
          { required: true, message: '请选择出生日期', trigger: 'blur' }

        ],
        addr: [
          { required: true, message: '请输入地址', trigger: 'blur' }

        ]
      },
      tableDate: [
        {
          name: '张三',
          age: 18,
          sex: 1,
          birth: '2020-01-01',
          addr: '江西省南昌市'
        },
        {
          name: '李四',
          age: 20,
          sex: 1,
          birth: '2020-05-01',
          addr: '福建省厦门市'
        },
        {
          name: '小美',
          age: 19,
          sex: 0,
          birth: '2020-09-01',
          addr: '江苏省苏州市'
        },
        {
          name: '老五',
          age: 21,
          sex: 1,
          birth: '2020-10-01',
          addr: '北京市'
        },
        {
          name: '苏',
          age: 19,
          sex: 1,
          birth: '2021-10-01',
          addr: '长沙'
        },
        {
          name: '刘',
          age: 40,
          sex: 1,
          birth: '2001-10-01',
          addr: '湖南'
        },
        {
          name: '张',
          age: 21,
          sex: 1,
          birth: '2020-10-01',
          addr: '上海'
        },
        {
          name: '肖',
          age: 21,
          sex: 1,
          birth: '2020-10-01',
          addr: '江西'
        },
        {
          name: '兰',
          age: 21,
          sex: 1,
          birth: '2020-10-01',
          addr: '新疆'
        },
        {
          name: '岚',
          age: 21,
          sex: 1,
          birth: '2020-10-01',
          addr: '秋叶原'
        },
        {
          name: '京阿尼',
          age: 21,
          sex: 1,
          birth: '2020-10-01',
          addr: '日本'
        }
      ],
      tableDate1: [
        {
          name: '张三',
          age: 18,
          sex: 1,
          birth: '2020-01-01',
          addr: '江西省南昌市'
        },
        {
          name: '李四',
          age: 20,
          sex: 1,
          birth: '2020-05-01',
          addr: '福建省厦门市'
        },
        {
          name: '小美',
          age: 19,
          sex: 0,
          birth: '2020-09-01',
          addr: '江苏省苏州市'
        },
        {
          name: '老五',
          age: 21,
          sex: 1,
          birth: '2020-10-01',
          addr: '北京市'
        },
        {
          name: '苏',
          age: 19,
          sex: 1,
          birth: '2021-10-01',
          addr: '长沙'
        },
        {
          name: '刘',
          age: 40,
          sex: 1,
          birth: '2001-10-01',
          addr: '湖南'
        },
        {
          name: '张',
          age: 21,
          sex: 1,
          birth: '2020-10-01',
          addr: '上海'
        },
        {
          name: '肖',
          age: 21,
          sex: 1,
          birth: '2020-10-01',
          addr: '江西'
        },
        {
          name: '兰',
          age: 21,
          sex: 1,
          birth: '2020-10-01',
          addr: '新疆'
        },
        {
          name: '岚',
          age: 21,
          sex: 1,
          birth: '2020-10-01',
          addr: '秋叶原'
        },
        {
          name: '京阿尼',
          age: 21,
          sex: 1,
          birth: '2020-10-01',
          addr: '日本'
        }
      ],
      // 分页的总数目
      total: 0,
      userForm: {
        name: ''
      }
    }
  },
  methods: {
    // 点击新增逻辑
    tableAdd() {
      this.dialogVisible = true
    },
    // 用户点击提交触发
    submit() {
      // 校验表单数据
      this.$refs.form.validate((valId) => {
        if (valId) {
          // 判断是编辑还是提交
          if (this.open === 0) {
            this.tableDate.unshift(this.form)
          } else {
            const index = this.tableDate.findIndex(item => item.name === this.form.name)
            this.tableDate.splice(index, 1, this.form)
          }
          this.$nextTick(() => {
            // 重置表单数据
            // this.$refs.form.resetFields()
          })
          this.dialogVisible = false
        }
      })
    },
    // 点击取消业务
    handleClose() {
      // 重置表单数据
      // this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    // 点击编辑业务
    tbaleEdit(row) {
      this.open = 1
      this.dialogVisible = true
      // 使用深拷贝不影响原数据
      this.form = JSON.parse(JSON.stringify(row))
    },
    // 点击删除业务
    tbaleDle(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.tableDate.findIndex(item => item.name === row.name)
        this.tableDate.splice(index, 1)
        this.$message(
          {
            type: 'success',
            message: '删除成功!'
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 分页逻辑
    tableDatePag(val) {
      if (val === 1) {
        this.tableDate = this.tableDate1
      } else {
        val = (10 - 0)
        this.tableDate = this.tableDate.slice(val)
      }
    },
    // 查询业务
    onSubmit() {
      this.tableDate = this.tableDate.filter(item => { return item.name === this.userForm.name })
    }
  },
  mounted() {
    // 总数据长度
    this.total = this.tableDate.length
  }
}
</script>
<style lang="less" scoped>
.manage {
  height: 90%;

  .el-pagination {
    display: flex;
    justify-content: flex-end;
    position: relative;
    left: -70px;
  }
}

.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-button {
    margin-top: 10px;
  }

  .userRefer {
    display: flex;
    align-items: self-end;
    position: relative;
    top: 10px;
  }
}
</style>
