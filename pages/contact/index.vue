<template>
  <div class="first-screen">
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
          <div class="form-group emoji-box">
            <textarea class="form-control" rows="10" name="content" placeholder="邮件内容 / Content" v-model="content.value" @blur="validate('content')">
            </textarea>
            <div class="error-text" v-show="content.error != ''">{{ content.error }}</div>
            <div class="emoji">
              <img src="~assets/img/look.png">
            </div>
          </div>
          <div class="form-group text-center push-30-t">
            <a href="javascript:;" class="btn btn-primary" @click="submit()">提交邮件</a>
            <a href="javascript:;" class="btn btn-default" @click="reset()">重置表单</a>
          </div>
        </form>
        <div v-else-if="mailState.code == 10000" class="text-center push-30-t">
          <p>
            <img src="~assets/img/success.png" alt="Success">
          </p>
          <p>啦啦啦(～￣▽￣)～ 邮件投递成功！</p>
        </div>
        <div v-else class="text-center push-30-t">
          <p>
            <img src="~assets/img/error.png" alt="Page Not Found">
          </p>
          <p>呜呜呜┭┮﹏┭┮ {{ mailState.message }}。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    head () {
      return {
        title: '联系我 / Kapeter',
        meta: [
          { hid: 'description', name: 'description', content: 'I am Kapeter, a front-end engineer.' }
        ]
      }
    },
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

<style scoped lang="less">
  @import '~assets/less/variable.less';
  
  .mail-form {
    width: 480px;
    margin: 0 auto;
    position: relative;
    input {
      width: 100%;
    }
    .emoji-box{
      position: relative;
    }
    .emoji{
      position: absolute;
      right: -108px;
      top: 52px;
    }
    .btn{
      margin: 0px 10px;
      padding: 10px 45px;      
    }
    .error-text{
      color: @error-color;
      margin-top: 5px;
      font-style: italic;
    }
  }
  @media screen and (max-width: 640px) {
    .mail-form{
      width: 100%;
      padding: 0 15px;
      box-sizing: border-box;
      .emoji{
        display: none;
      }
    }
  }
</style>
