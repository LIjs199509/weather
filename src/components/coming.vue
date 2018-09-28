<template>
  <div class="news">
    <span class="autotitle">今日资讯</span>
    <ul class="mui-table-view">
    <li class="mui-table-view-cell mui-media" v-for="item in auto" :key="item.docid">
      <router-link :to="'/newsInfo/'  +  item.docid">
        <img class="mui-media-object mui-pull-right" :src="item.picInfo[0].url">
        <div class="mui-media-body">
          <p class="mui-ellipsis" style="color:black">{{item.digest}}{{item.title}}</p>
          <p>发自：{{item.ptime}}&nbsp;&nbsp;{{item.source}}</p>
        </div>
      </router-link>
    </li>
    <li class="mui-table-view-cell mui-media" v-for="techNews in tech" :key="techNews.docid">
      <router-link :to="'/newsInfo/'  +  techNews.docid">
        <img class="mui-media-object mui-pull-right" :src="techNews.picInfo[0].url">
        <div class="mui-media-body">
          <p class="mui-ellipsis" style="color:black">{{techNews.digest}}{{techNews.title}}</p>
          <p>发自：{{techNews.ptime}}&nbsp;&nbsp;{{techNews.source}}</p>
        </div>
      </router-link>
    </li>
  </ul>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
export default {
  data(){
    return{
      auto:[],
      tech:[],
      id:[]
    }
  },
  created(){
    this.xinwen();
  },
  methods:{
    xinwen(){
      Indicator.open({text:'正在更新。。',spinnerType:'double-bounce'});
      this.$http.get('https://www.apiopen.top/journalismApi').
      then(res => {
        this.auto = eval( '(' +res.bodyText +')').data.auto;
        this.tech = eval( '(' +res.bodyText +')').data.sports;
        var allid = new Array();
        for (let i = 0; i < 8; i++) {
          allid.push(this.auto[i].docid)
        }
        for (let i = 0; i < 8; i++) {
          allid.push(this.tech[i].docid)
        }
        this.id = allid;
        console.log(allid);
        console.log(this.auto[0].picInfo[0]);
        Indicator.close();
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.news{
  background-color: lightgreen;
  padding-bottom: 50px;
  overflow: hidden;
  ul{
    border-radius: 10px;
    margin: 3px;
  }
  .autotitle{
    display: block;
    text-align: center;
    margin: 25px 0 10px 0;
  }
  h1{
    font-size: 12px;
    font-weight: bold;
    position: absolute;
    width: 0;
    font-size: 15px;
    top: 50%;
    margin-top: 0px;
    opacity: .6;
    letter-spacing: 0px;
  }
  p{
    font-size: 12px;
  }
  button{
    position: fixed;
    top: 2px;
    left: 2px;
    z-index: 999;

    a{
      display: flex;
      color: #fff;
    }
    h1{
      font-size: 14px;
      font-weight: 300;
    }
    span{
      margin: 4px 0 6px 0;
    }
  }
}
</style>
