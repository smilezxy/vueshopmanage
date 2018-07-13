<template>
    <div class="user">
      <el-row>
        <el-col :span="24">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <!--el-input是个组件  若绑定原生事件的话  需要一个.native修饰符  -->
          <el-input placeholder="请输入内容" class="search-input" v-model="query" @keydown.native.enter="initList">
            <el-button slot="append" icon="el-icon-search" @click="initList"></el-button>
          </el-input>
          <el-button type="success" plain @click="addDialogFormVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" style="width: 100%">
        <el-table-column  type="index"  width="50">
        </el-table-column>
        <el-table-column  prop="username"  label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column label="用户状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="changeUserState(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="showEditDialog(scope.row)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
            <el-button size="mini" type="warning" icon="el-icon-check" plain></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
      </div>
      <!-- 添加用户对话框 -->
      <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
        <el-form :model="addForm" label-width="80px" :rules="rules" ref="addUserForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUserSubmit('addUserForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑用户对话框 -->
      <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
        <el-form :model="editForm" label-width="80px" :rules="rules" ref="editUserForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserSubmit('editUserForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import {getUserList, changeUserState, addUser, getUserById, editUser} from '@/api/index.js'
export default {
  data () {
    return {
      userList: [],
      value3: '',
      query: '',
      total: 0,
      pagesize: 1,
      pagenum: 1,
      addDialogFormVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editDialogFormVisible: false,
      editForm: {
        username: '',
        email: '',
        mobile: '',
        id: 0
      },
      // 添加用户的表单验证
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        mobile: [
          { required: true, message: '电话不能为空' }
        ]
      }
    }
  },
  created () {
    this.initList()
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.initList()
    },
    // 初始化表格数据
    initList () {
      getUserList({params: {query: this.query, pagenum: this.pagenum, pagesize: this.pagesize}}).then(res => {
        // console.log(res)
        this.userList = res.data.users
        this.total = res.data.total
      })
    },
    // 改变用户状态
    changeUserState (row) {
      console.log(row)
      changeUserState({uid: row.id, type: row.mg_state}).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '修改用户状态成功'
          })
        } else {
          this.$message({
            type: 'warning',
            message: 'res.meta.msg'
          })
        }
      })
    },
    // 添加用户
    addUserSubmit (formName) {
      this.$refs[formName].validate(valide => {
        if (valide) {
          // 验证通过执行添加用户
          addUser(this.addForm).then(res => {
            console.log(res)
            if (res.meta.status === 201) {
              this.$message({
                type: 'success',
                message: '添加用户成功'
              })
            }
            this.addDialogFormVisible = false
            this.initList()
            this.addForm = {username: '', password: '', email: '', mobile: ''}
          })
        }
      })
    },
    // 显示编辑用户对话框
    showEditDialog (row) {
      console.log(row)
      getUserById(row.id).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.editDialogFormVisible = true
          this.editForm.username = res.data.username
          this.editForm.email = res.data.email
          this.editForm.mobile = res.data.mobile
          this.editForm.id = res.data.id
        }
      })
    },
    // 编辑用户提交
    editUserSubmit (formName) {
      this.$refs[formName].validate(valide => {
        if (valide) {
          editUser(this.editForm).then(res => {
            if (res.meta.status === 200) {
              console.log(res)
              this.$message({
                type: 'success',
                message: '编辑成功'
              })
              this.editDialogFormVisible = false
              this.initList()
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.user {
  .search-input {
    width: 300px;
  }
  .page {
    padding: 5px 0;
    background-color: #D3DCE6;
  }
}
</style>
