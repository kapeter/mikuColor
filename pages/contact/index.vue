<template>
  <div class="push-30-t">
    <div class="box">
      <div class="box-header">
        <h3>联系我<br><span>contact me</span></h3>
      </div>
      <div class="box-content">
        <form class="mail-form" v-if="mailState.code == 0">
          <div class="form-group">
            <input type="text" name="name" placeholder="发件人 / Name" class="form-control" v-model="name.value" @blur="validate('name')">
            <div class="error-text" v-show="name.error != ''">{{ name.error }}</div>
          </div>
          <div class="form-group">
            <input type="text" name="email" placeholder="邮箱地址 / Address" class="form-control" v-model="email.value" @blur="validate('email')">
            <div class="error-text" v-show="email.error != ''">{{ email.error }}</div>
          </div>
          <div class="form-group">
            <input type="text" name="subject" placeholder="邮件主题 / Theme" class="form-control" v-model="subject.value" @blur="validate('subject')">
            <div class="error-text" v-show="subject.error != ''">{{ subject.error }}</div>
          </div>
          <div class="form-group">
            <textarea class="form-control" rows="10" name="content" placeholder="邮件内容 / Content" v-model="content.value" @blur="validate('content')">
            </textarea>
            <div class="error-text" v-show="content.error != ''">{{ content.error }}</div>
          </div>
          <div class="form-group text-center push-30-t">
            <a href="javascript:;" class="btn btn-primary" @click="submit()">提交邮件</a>
            <a href="javascript:;" class="btn btn-default" @click="reset()">重置表单</a>
          </div>
        </form>
        <div v-else-if="mailState.code == 10000" class="text-center">
          <img src="~assets/img/success.jpg" alt="Success">
          <h1 class="success-color">Success!</h1>
          <p>啦啦啦(～￣▽￣)～ 投递成功！我将尽快与你取得联系。</p>
        </div>
        <div v-else class="text-center">
          <img src="~assets/img/error.jpg" alt="Page Not Found">
          <h1 class="error-color">Error Code : {{ mailState.code }}</h1>
          <p>呜呜呜┭┮﹏┭┮ {{ mailState.message }}。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    data () {
      return {
        name: {
          value: '',
          error: ''
        },
        email: {
          value: '',
          error: ''
        },
        subject: {
          value: '',
          error: ''
        },
        content: {
          value: '',
          error: ''
        },
        mailState: {
          code: 0, // 0为初始状态，10000为成功状态，其他为异常状态
          message: ''
        }
      }
    },
    methods: {
      validate (type) {
        switch (type) {
          case 'name':
            if (this.name.value) {
              this.name.error = ''
              return true
            } else {
              this.name.error = '发件人不能为空。'
              return false
            }
          case 'email':
            let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+\.([a-zA-Z0-9_-])+/
            if (this.email.value && reg.test(this.email.value)) {
              this.email.error = ''
              return true
            } else {
              if (this.email.value) {
                this.email.error = '请输入合法的邮件地址。'
              } else {
                this.email.error = '邮件地址不能为空。'
              }
              return false
            }
          case 'subject':
            if (this.subject.value) {
              this.subject.error = ''
              return true
            } else {
              this.subject.error = '邮件主题不能为空。'
              return false
            }
          case 'content':
            if (this.content.value) {
              this.content.error = ''
              return true
            } else {
              this.content.error = '邮件内容不能为空。'
              return false
            }
        }
      },
      reset () {
        this.email.value = ''
        this.subject.value = ''
        this.content.value = ''
      },
      submit () {
        let _self = this
        if (_self.validate('name') && _self.validate('email') && _self.validate('subject') && _self.validate('content')) {
          let data = {
            name: this.name.value,
            email: this.email.value,
            subject: this.subject.value,
            content: this.content.value
          }
          axios.post('mail/send', data)
            .then(function (res) {
              if ('code' in res.data) {
                _self.mailState = res.data
              }
            })
        } else {
          return false
        }
      }
    }
  }
</script>

<style>
  .mail-form {
    width: 480px;
    margin: 0 auto;
  }
  .mail-form input {
    width: 100%;
  }
  .mail-form textarea {
    width: 100%;
    resize: none;
    font: 14px/1.42857143 'Poppins','PingFang SC',"Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif;
  }
  .mail-form .btn{
    margin: 0px 10px;
  }
  .error-text{
    color: #f4516c;
    font-size: 12px;
    margin-top: 5px;
  }
</style>
