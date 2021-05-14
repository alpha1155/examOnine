// pages/mistakesSet/mistakesSet.js
Page({

  data: {
    subject:'',
    questionList:[],
    answer:false
  },

  onLoad: function (options) {
    this.data.questionList=[];
    let user=wx.getStorageSync('user')
    wx.cloud.database().collection('user')
    .limit(5)
    .where({
      _id:user._id
    })
    .get()
    .then(res=>{
      console.log('题库数据',res)
      let queData=res.data
      console.log('题库数据',queData)
      this.data.subject=queData[0]
      console.log('个人错题',this.data.subject.mistakesSet)
      for(var i=0;i<this.data.subject.mistakesSet.length;i++){
        wx.cloud.database().collection('questions')
        .where({
          _id:this.data.subject.mistakesSet[i]
        })
          .get()
          .then(res=>{
            console.log(res)
            this.data.questionList.push(res.data[0])
            console.log(this.data.questionList)
            this.setData({
              questionList:this.data.questionList,
            })
          })
      }
    });
  },

  //移除
  remove(e){
    console.log(e.target.id)
    let user=wx.getStorageSync('user')
    wx.cloud.database().collection('user')
    .limit(5)
    .where({
      _id:user._id
    })
    .get()
    .then(res=>{
      console.log('题库数据',res)
      let queData=res.data
      console.log('题库数据',queData)
      this.data.subject=queData[0]
      let arr=this.data.subject.mistakesSet
      console.log('个人错题',arr)
      console.log(arr.indexOf(e.target.id, 0))
      if(arr.indexOf(e.target.id, 0)>-1){
        arr.splice(arr.indexOf(e.target.id, 0), 1);
        console.log(arr)
        wx.cloud.database().collection('user')
          .where({
            _id:user._id
          })
            .update({
              data:{
                mistakesSet:arr
              }
            })
        this.onLoad()

      }else{
        wx.showToast({
          title: '移除失败',
          icon:"none"
        })
      }
    });
  },


  update(){
    
    let user=wx.getStorageSync('user')
    wx.cloud.database().collection('user')
    .limit(5)
    .where({
      _id:user._id
    })
    .get()
    .then(res=>{
      console.log('题库数据',res)
      let queData=res.data
      console.log('题库数据',queData)
      this.data.subject=queData[0]
      console.log('个人错题',this.data.subject.mistakesSet)
      for(var i=0;i<this.data.subject.mistakesSet.length;i++){
        wx.cloud.database().collection('questions')
        .where({
          _id:this.data.subject.mistakesSet[i]
        })
          .get()
          .then(res=>{
            console.log(res)
            this.data.questionList.push(res.data[0])
            console.log(this.data.questionList)
            this.setData({
              questionList:this.data.questionList,
            })
          })
      }
    });
    
  }
})