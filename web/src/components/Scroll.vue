<template>
  <div>
    <div class="head">record</div>
    <div class="lotteryrecord">
      <div id="resultScroll" ref="myScrollbar" class="bg-gray-200" style="height: 300px; overflow: auto">
        <div class="list-div" v-for="item in list">
          <span>{{ item.sceneSn }}</span>
          <span>{{ item.result }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      resultList: {},  
      list: [
        { sceneSn: 1, result: 1 },
        { sceneSn: 1, result: 1 },
        { sceneSn: 1, result: 1 },
        { sceneSn: 1, result: 1 },
        { sceneSn: 1, result: 1 },
        { sceneSn: 1, result: 1 },
        { sceneSn: 1, result: 1 },
        { sceneSn: 1, result: 1 },
        { sceneSn: 1, result: 1 },
        { sceneSn: 1, result: 1 },
        { sceneSn: 1, result: 1 },
        { sceneSn: 1, result: 1 },
        { sceneSn: 1, result: 1 },
        { sceneSn: 1, result: 1 },
      ],  
      scrollTop: 0,
      tradPageNo: 1,  
    }
  },
  mounted() {
    var that = this
    
    document.getElementById('resultScroll').addEventListener('scroll', that.handleScroll, true)
  },
  methods: {
    handleScroll() {
      var that = this
      var sh = that.$refs['myScrollbar'].scrollHeight  
      var st = that.$refs['myScrollbar'].scrollTop  
      var ch = that.$refs['myScrollbar'].clientHeight  
      if (st + ch >= sh) {
        console.log('reach bottom')
        that.tradPageNo += 1
        // if (that.tradPageNo <= that.resultList.page.totalPage) {
        //   that.getResultList()
        // }
      }
    },
    getResultList() {
      var that = this
      var data = {
        pageNo: that.tradPageNo,
        pageSize: 10,
      }
      ResultList(data).then((res) => {
        if (res.errno === 0) {
          that.resultList = res.result
          that.list = that.list.concat(res.result.list)
        }
      })
    },
  },
}
</script>

<style scoped></style>
