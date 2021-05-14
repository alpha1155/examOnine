const app=getApp()
Page({
  data:{
    serial:1,
    subject:[],
    questionid:0,
    percent:0,
    total:4,
    userSelect:'',
    userScore:0,
    totalScore:0,
    totalError:0,
    isSelected:false,
    mistakesNum:true
  },
  onLoad(){
    // 1. 取数据
    let arr=wx.getStorageSync('errs')
    console.log(arr)
    // 全局
    // console.log(app.globalData.globalErrorOptions)
    this.data.subject=arr[this.data.questionid]
    this.setData({
      subject:this.data.subject,
      total:arr.length
    })
    if(arr.length>0){}else{
      this.setData({
        mistakesNum:false
      })
      wx.showToast({
        title: '本次挑战没有错题',
        icon:'none'
      })
    }
  },
  //上一题
  preMistakes(){
    let arr=wx.getStorageSync('errs')
    var num=this.data.questionid
    if(num==0){
      wx.showToast({
        title: '第一题',
        icon:'none'
      })
    }else{
      num--
    }
    this.setData({
      questionid:num,
      subject:arr[num]
    })
  },
  //下一题
  nextMistakes(){
    let arr=wx.getStorageSync('errs')
    console.log(arr.length)
    var num=this.data.questionid
    if(num+1==arr.length){
      wx.showToast({
        title: '最后一题',
        icon:'none'
      })
    }else{
      num++
    }
    this.setData({
      questionid:num,
      subject:arr[num]
    })
  },
  goto(){
    wx.switchTab({
      url: '/pages/personalCenter/personalCenter',
    })
  }
})