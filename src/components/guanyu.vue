<template>
  <div class="newContent">
    <button type="button" class="mui-btn mui-btn-outlined jia">
      <a href="javascript:history.back(-1)">
        <span class="mui-icon mui-icon-undo"></span>
      </a>
    </button>
    <span class="autotitle">资讯详情</span>
    <div class="newNeirong">
      <h4>使用Wepack构建Vue为基础，使用Vue-resource进行网络请求，使用的是免费API，功能都比较简陋，
        界面布局部分使用Mint-Ui和MUI进行布局,使用Vue-Router进行路由设置，从而实现
        类模块化的设计。
      </h4>
      <h5>具体实现过程：用户进入页面时获取用户的IP地址，通过用户的IP地址获得
        用户所处的具体地址，然后再用该地址信息请求具体天气以及6天的天气预报。
      </h5>
      <h5>有雨天气背景色为<span style="color:lightblue">蓝色</span>，
      反之为<span style="color:lightsalmon">橙色</span>。</h5>
      <div class="wo"><span>--- 李劲松·Qwest</span></div>

    </div>

  </div>
</template>

<style lang="scss" scoped>
.newContent{
  background-color: lightgreen;
  padding-bottom: 50px;
  height: 100%;
  position: absolute;
  h4{
    line-height: 20px;
    text-indent: .72rem;
  }
  h5{
    margin-top: 10px;
    line-height: 18px;
    text-indent: .72rem;
  }
  .wo{
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: #F8F8F8;
  }
  .jia{
			position: absolute;
			left: 0;
			top: 0;
      margin: 17px 10px 10px 0;
      border:1px solid lightgreen;
      font-size: 0.37rem;
      a{
        color: #000;
      }
		}
  .newNeirong{
    background-color: #fff;
    border-radius: 10px;
    margin: 3px 3px 100% 3px;
    padding: 10px;
    height: 70%;
    position: relative;
  }
  .autotitle{
    display: block;
    text-align: center;
    padding: 25px 0 10px 0;
  }
}
</style>
