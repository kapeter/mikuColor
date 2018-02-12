<template>
	<div class="about">
        <img src="~assets/img/avatar.jpg" class="avatar">
        <div class="info">
        	<h1>Kapeter</h1>
        	<p>想要学设计，会点PHP的前端工程师。</p>
        	<p>热爱二次元，本命是初音未来。</p>
        	<ul class="clearfix">
        		<li><a href="https://github.com/kapeter" title="github"><i class="iconfont">&#xeee2;</i></a></li>
            <li><a href="http://note.youdao.com/noteshare?id=c800efd52739529c54b5e3d86ddc47cd" title="有道云笔记"><i class="iconfont">&#xe621;</i></a></li>
        	</ul>
        </div>
    </div>
</template>

<style>
.about{
	position: relative;
	padding: 30px;
	margin-bottom: 45px;
	text-align: center;
	border: 1px solid #ddd;
}
.about .avatar{
	display: inline-block;
	width: 120px;
	height: 120px;
	border-radius: 50%;
}
.about .info > h1{
	color: #333;
	font-size: 24px;
}
.about .info > p{
	color: #999;
	text-align: left;
}
.about .info > ul {
	display: inline-block;
  margin-top: 15px;
}
.about .info > ul li {
  float: left;
  margin: 0px 5px;
}
.about .info > ul > li > a{
	font-size: 28px;
	color: #999;
}
.about .info > ul > li > a:hover{
	color: #39c5bb;
}
</style>
