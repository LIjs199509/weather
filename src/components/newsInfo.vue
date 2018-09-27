<template>
<div class="newContent">
  <button type="button" class="mui-btn mui-btn-outlined jia">
    <a href="javascript:history.back(-1)">
      <span class="mui-icon mui-icon-undo"></span>
    </a>
  </button>
  <span class="autotitle">资讯详情</span>
  <div class="newNeirong">
    <h3>由于此为外链，为了安全暂不提供。</h3>
  </div>

  <h1>{{ id }}</h1>
</div>

</template>

<script>
export default {
  data(){
    return{
      id: this.$route.params.id
    }
  }
}
</script>

<style lang="scss" scoped>
.newContent{
  background-color: lightgreen;
  padding-bottom: 50px;
  height: 100%;
  position: absolute;
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
  }
  .autotitle{
    display: block;
    text-align: center;
    padding: 25px 0 10px 0;
  }
}
</style>
