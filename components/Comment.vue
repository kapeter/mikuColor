<template>
  <div class="comment">
    <div class="comment-header">
      <h2>文章评论</h2>
    </div>
    <form class="comment-form">
      <div class="row">
        <div class="form-group col-4">
          <input type="text" name="comment_author" placeholder="* 姓名 / Name" class="form-control" v-model="replyData.comment_author" @blur="validate('comment_author')">
        </div>
        <div class="form-group col-4">
          <input type="text" name="comment_author_email" placeholder="* 邮箱地址 / Email" class="form-control" v-model="replyData.comment_author_email" @blur="validate('comment_author_email')">
        </div>
        <div class="form-group col-4">
          <input type="text" name="comment_author_url" placeholder="个人主页 / Blog" class="form-control" v-model="replyData.comment_author_url">
        </div>
      </div>
      <div class="form-group">
        <textarea class="form-control" rows="5" name="comment_content" placeholder="* 评论内容 / Content" v-model="replyData.comment_content" @blur="validate('comment_content')">
        </textarea>
      </div>
      <div class="form-group push-15-t clearfix">
        <span class="error-text pull-left" v-if="errorText != ''">{{ errorText }}</span>
        <a href="javascript:void(0);" class="btn btn-primary pull-right" @click="submit()">提交评论</a>
      </div>
    </form>
    <div class="comment-body" v-if="commentList.length > 0">
      <div class="body-header">
        <h3>最新评论</h3>
      </div>
      <ul class="comment-list">
        <li v-for="comment in commentList" :key="comment.id">
          <div class="comment-info clearfix">
            <h4 class="pull-left"><a :href="comment.comment_author_url">{{ comment.comment_author }}</a> 说道：</h4>
            <a href="javascript:void(0)" class="pull-right">回复</a>
          </div>
          <div>{{ comment.comment_content }}</div>
          <div class="comment-parent" v-if="comment.parent">
            <div class="comment-info">
              <h4>{{ comment.parent.comment_author }} 说道：</h4>
            </div>
            <div>{{ comment.parent.comment_content }}</div>
            <div class="comment-time">发布于 {{ comment.parent.created_at }}</div>
          </div>
          <div class="comment-time">发布于 {{ comment.created_at }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    props: {
      model: {
        type: String,
        required: true
      },
      uid: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        replyData: {
          comment_author: '',
          comment_author_email: '',
          comment_author_url: '',
          comment_content: ''
        },
        errorText: '',
        commentList: [],
        params: {}
      }
    },
    mounted () {
      this.params['comment_type'] = this.model
      this.params['comment_relation_id'] = this.uid
      this.params['page'] = 1
      this.params['per_page'] = 10
      this.loadComments()
    },
    methods: {
      // 载入评论数据
      loadComments () {
        let _self = this
        axios.get('comment', {
          params: _self.params
        }).then((res) => {
          _self.commentList = res.data.data
        })
      },
      validate (type) {
        switch (type) {
          case 'comment_author':
            if (this.replyData.comment_author) {
              this.errorText = ''
              return true
            } else {
              this.errorText = '姓名不能为空。'
              return false
            }
          case 'comment_author_email':
            let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+\.([a-zA-Z0-9_-])+/
            if (this.replyData.comment_author_email && reg.test(this.replyData.comment_author_email)) {
              this.errorText = ''
              return true
            } else {
              if (this.replyData.comment_author_email) {
                this.errorText = '请输入合法的邮件地址。'
              } else {
                this.errorText = '邮件地址不能为空。'
              }
              return false
            }
          case 'comment_content':
            if (this.replyData.comment_content) {
              this.errorText = ''
              return true
            } else {
              this.errorText = '评论内容不能为空。'
              return false
            }
        }
      },
      submit (parentId = 0) {
        let _self = this
        if (_self.validate('comment_author') && _self.validate('comment_author_email') && _self.validate('comment_content')) {
          _self.replyData['comment_parent_id'] = parentId
          _self.replyData['comment_type'] = _self.model
          _self.replyData['comment_relation_id'] = _self.uid
          axios.post('comment', _self.replyData)
            .then(function (res) {
              _self.loadComments()
              _self.replyData.comment_content = ''
            })
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~assets/less/variable.less';
  .comment{
    .comment-header{
      position: relative;
      padding-top: 15px;
      margin-bottom: 30px;
      &:before{
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        width: 80px;
        height: 2px;
        background: @main-color;
        content: '';
      }
      h2{
        color: @main-color;
        letter-spacing: 0.5px;
      }
    }
    .comment-form{
      input{
        width: 100%;
      }
      .btn{
        padding: 8px 30px;
      }
      .error-text{
        color: @error-color
      }
    }
    .comment-body{
      margin-top: 30px;
      .body-header{
        position: relative;
        padding-left: 15px;
        margin-bottom: 15px;
        &:before{
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          width: 2px;
          height: 100%;
          background: @main-color;
        }
      }
      .comment-list{
        li{
          padding:15px 0;
          border-bottom: 1px dashed @border-color;
          &:last-child{
            border-bottom:0;
          }
          .comment-info{
            margin-bottom: 15px;
            a{
              color: @main-color;
              &:hover{
                text-decoration: underline;
              }
            }
          }
          .comment-parent{
            margin-left: 30px;
            margin-top: 15px;
            padding: 15px;
            background: #f1f1f1;
            border: 1px solid @border-color;
          }
          .comment-time{
            color: @text-sub-color;
            font-size: 12px;
            font-style: italic;
            margin-top: 15px;
          }
        }
      }
    }
  }
</style>
