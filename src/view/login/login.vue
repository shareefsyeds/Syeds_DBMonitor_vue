<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in"
            title="Welcome to login"
            :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">Please enter the account password</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
          this.$Message.success({
            content: 'Log in successfully',
            duration: 3
          })
        }).catch(err => {
          this.$Message.error(`Error accessing personal information ${err}`)
        })
      }).catch(err => {
        this.$Message.error(`The user name or password error ${err}`)
      })
    }
  }
}
</script>

<style>
</style>
