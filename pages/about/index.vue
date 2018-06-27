<template>
	<section>
    <PageHeader title="关于我" sub-title="about me"></PageHeader>
		<div class="container">
			<div class="about">
				<div class="about-header">
          <img src="~assets/img/logo-lg.png">
					<h1>KaPeter</h1>
          <p>想要学设计，会点PHP的前端工程师；热爱二次元与摄影。</p>
          <ul class="clearfix">
            <li>
              <a href="https://github.com/kapeter" title="github" target="_blank">
                <i class="iconfont">&#xe691;</i>
              </a>
            </li>
            <li>
              <a href="http://note.youdao.com/noteshare?id=c800efd52739529c54b5e3d86ddc47cd" title="有道云笔记" target="_blank">
                <i class="iconfont">&#xe65a;</i>
              </a>
            </li>
            <li>
              <a href="https://tuchong.com/1669457/" title="图虫" target="_blank">
                <i class="iconfont">&#xe665;</i>
              </a>
            </li>
          </ul>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
  import PageHeader from '~/components/PageHeader'

  export default {
    components: {
      PageHeader
    },
    head () {
      return {
        title: '关于我 / Kapeter',
        meta: [
          { hid: 'description', name: 'description', content: 'I am Kapeter, a front-end engineer.' }
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/less/variable.less';
  .about{
    min-height: 255px;
    margin-bottom: 75px;
    .about-header{
      text-align: center;
      h1{
        color: @main-color;
      }
      ul{
        display: inline-block;
        li{
          float: left;
          margin: 5px;
          a{
            font-size: 24px;
          }
        }
      }
    }
  }
</style>

