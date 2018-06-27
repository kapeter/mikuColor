<template>
  <div class="comment">
    <div class="comment-header">
      <h2>文章评论</h2>
    </div>
    <form class="comment-form">
      <div class="row">
        <div class="form-group col-4">
          <input type="text" name="comment_author" placeholder="* 姓名 / Name" class="form-control" v-model="commentData.comment_author" @blur="validate(commentData, 'errorText')">
        </div>
        <div class="form-group col-4">
          <input type="text" name="comment_author_email" placeholder="* 邮箱地址 / Email" class="form-control" v-model="commentData.comment_author_email" @blur="validate(commentData, 'errorText')">
        </div>
        <div class="form-group col-4">
          <input type="text" name="comment_author_url" placeholder="个人主页 / Blog" class="form-control" v-model="commentData.comment_author_url">
        </div>
      </div>
      <div class="form-group">
        <textarea class="form-control" rows="5" name="comment_content" placeholder="* 评论内容 / Content" v-model="commentData.comment_content" @blur="validate(commentData, 'errorText')">
        </textarea>
      </div>
      <div class="form-group push-15-t clearfix">
        <span class="error-text pull-left" v-if="errorText != ''">{{ errorText }}</span>
        <a href="javascript:void(0);" class="btn btn-primary pull-right" @click="submitComment()">提交评论</a>
      </div>
    </form>
    <div class="comment-body" v-if="commentList.length > 0">
      <div class="body-header">
        <h3>最新评论</h3>
      </div>
      <ul class="comment-list">
        <li v-for="(comment,index) in commentList" :key="comment.id">
          <div class="comment-info clearfix">
            <h4 class="pull-left"><a :href="comment.comment_author_url">{{ comment.comment_author }}</a> 说道：</h4>
            <a href="javascript:void(0)" class="pull-right" @click="handleReplyVisible(index)">
              {{ replyVisibles[index] ? '关闭' : '回复'}}
            </a>
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
          <div class="reply-box" v-if="replyVisibles[index]">
            <form class="comment-form">
              <div class="row">
                <div class="form-group col-4">
                  <input type="text" name="reply_author" placeholder="* 姓名 / Name" class="form-control" v-model="replyData.comment_author" @blur="validate(replyData, 'replyErrorText')">
                </div>
                <div class="form-group col-4">
                  <input type="text" name="reply_author_email" placeholder="* 邮箱地址 / Email" class="form-control" v-model="replyData.comment_author_email" @blur="validate(replyData, 'replyErrorText')">
                </div>
                <div class="form-group col-4">
                  <input type="text" name="reply_author_url" placeholder="个人主页 / Blog" class="form-control" v-model="replyData.comment_author_url">
                </div>
              </div>
              <div class="form-group">
                <textarea class="form-control" rows="5" name="reply_content" placeholder="* 评论内容 / Content" v-model="replyData.comment_content" @blur="validate(replyData, 'replyErrorText')">
                </textarea>
              </div>
              <div class="form-group push-15-t clearfix">
                <span class="error-text pull-left" v-if="errorText != ''">{{ replyErrorText }}</span>
                <div class="pull-right">
                  <a href="javascript:void(0);" class="btn btn-primary" @click="submitReply(comment.id)">提交评论</a>
                  &nbsp; &nbsp;
                  <a href="javascript:void(0);" class="btn btn-default" @click="handleReplyVisible(index)">关闭回复</a>
                </div>
              </div>
            </form>
          </div>
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
        commentData: {
          comment_author: '',
          comment_author_email: '',
          comment_author_url: '',
          comment_content: ''
        },
        replyData: {
          comment_author: '',
          comment_author_email: '',
          comment_author_url: '',
          comment_content: ''
        },
        errorText: '',
        replyErrorText: '',
        commentList: [],
        params: {},
        replyVisibles: []
      }
    },
    mounted () {
      this.params['comment_type'] = this.model
      this.params['comment_relation_id'] = this.uid
      this.params['page'] = 1
      this.params['per_page'] = 10
      this.getAuthorInfo()
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
          _self.replyVisibles = Array.apply(null, new Array(_self.commentList.length)).map(() => false)
        })
      },
      validate (obj, text) {
        for (let x in obj) {
          switch (x) {
            case 'comment_author':
              if (!obj.comment_author) {
                this[text] = '姓名不能为空。'
                return false
              }
              break
            case 'comment_author_email':
              let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+\.([a-zA-Z0-9_-])+/
              if (!obj.comment_author_email || !reg.test(obj.comment_author_email)) {
                if (obj.comment_author_email) {
                  this[text] = '请输入合法的邮件地址。'
                } else {
                  this[text] = '邮件地址不能为空。'
                }
                return false
              }
              break
            case 'comment_content':
              if (!obj.comment_content) {
                this[text] = '评论内容不能为空。'
                return false
              }
              break
          }
        }

        this[text] = ''
        return true
      },
      submitComment () {
        let _self = this
        if (_self.validate(_self.commentData, 'errorText')) {
          _self.commentData['comment_type'] = _self.model
          _self.commentData['comment_relation_id'] = _self.uid
          axios.post('comment', _self.commentData)
            .then(function (res) {
              _self.loadComments()
              _self.commentData.comment_content = ''
            })
          _self.setAuthorInfo(_self.commentData)
        }
      },
      submitReply (parentId) {
        let _self = this
        if (_self.validate(_self.replyData, 'replyErrorText')) {
          _self.replyData['comment_parent_id'] = parentId
          _self.replyData['comment_type'] = _self.model
          _self.replyData['comment_relation_id'] = _self.uid
          axios.post('comment', _self.replyData)
            .then(function (res) {
              _self.loadComments()
              _self.replyData.comment_content = ''
            })
          _self.setAuthorInfo(_self.replyData)
        }
      },
      handleReplyVisible (index) {
        this.replyVisibles.splice(index, 1, !this.replyVisibles[index])
        this.replyVisibles.forEach((val, idx) => {
          if (val && idx !== index) {
            this.replyVisibles.splice(idx, 1, false)
          }
        })
      },
      setAuthorInfo (data) {
        const storage = window.localStorage
        storage.setItem('author', data.comment_author)
        storage.setItem('author_email', data.comment_author_email)
        storage.setItem('author_url', data.comment_author_url)
        this.getAuthorInfo()
      },
      getAuthorInfo () {
        const storage = window.localStorage
        if (storage.getItem('author')) {
          this.commentData.comment_author = storage.getItem('author')
          this.commentData.comment_author_email = storage.getItem('author_email')
          this.commentData.comment_author_url = storage.getItem('author_url')
          this.replyData.comment_author = storage.getItem('author')
          this.replyData.comment_author_email = storage.getItem('author_email')
          this.replyData.comment_author_url = storage.getItem('author_url')
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
            .comment-time{
              border: 0;
              padding-bottom: 0;
            }
          }
          .comment-time{
            color: @text-sub-color;
            font-size: 12px;
            font-style: italic;
            padding: 15px 0;
            border-bottom: 1px dashed @border-color;
          }
          .reply-box{
            padding: 15px 0;
          }
        }
      }
    }
  }
</style>
