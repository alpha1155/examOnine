let errQuestions=[]
let queData=[]
Page({
  data:{
    serial:1,
    subject:[],
    questionid:0,
    percent:0,
    total:0,
    userSelect:'',
    userScore:0,
    totalScore:0,
    totalError:0,
    isSelected:false,
    queNumber:3,
    userMistakesSet:[],
  },
  //初始化题目
  onLoad(){
    wx.cloud.database().collection('questions')
    .limit(this.data.queNumber)
    .where({
      type:"判断"
    })
    .get()
    .then(res=>{
      console.log('题库数据',res)
      queData=res.data
      console.log('题库数据',queData)
      this.data.subject=queData[this.data.questionid]
      this.setData({
        subject:this.data.subject,
        total:queData.length
      });
      
    });
  },
  radioChange(e){
    this.setData({
      userSelect:e.detail.value
    })
  },
  submit(){
    wx.showToast({
      icon:"none",
      title: '分数'+this.data.userScore,
    })
  },
  next(){

    //判断对错
    if(this.data.subject.answer.indexOf(this.data.userSelect)>-1){
      console.log("答对了第",this.data.serial,"题")
      this.data.userScore++
      this.setData({
        userScore:this.data.userScore,
        totalScore:(this.data.userScore/this.data.total*100).toFixed(0)
      })
    }else{
      //错了
      let subjectNow= this.data.subject
      subjectNow.userSelect=this.data.userSelect
      console.log("错题",subjectNow)
      errQuestions.push(subjectNow)
      // 修改用户错题数据
      let user=wx.getStorageSync('user')
      wx.cloud.database().collection('user')
      .where({
        _id:user._id
      })
      .get()
      .then(res=>{
        console.log('个人中心',res)
        this.data.userMistakesSet=res.data[0].mistakesSet
        console.log('个人中心',this.data.userMistakesSet)
        this.setData({
          userMistakesSet:this.data.userMistakesSet,
        });
        console.log(subjectNow._id)
          this.data.userMistakesSet.push(subjectNow._id)
            wx.cloud.database().collection('user')
                  .where({
                    _id:user._id
                  })
                    .update({
                      data:{
                        mistakesSet:this.data.userMistakesSet
                      }
                    })
        });
    }
    //下一题
    let num =this.data.serial
    if(num+1>queData.length){
      wx.showToast({
        icon:"none",
        title: '已经是最后一题',
      })
      
    }else{
      console.log('当前第',num,'题')
      console.log('下一题是',1+num,'题')
      this.setData({
        questionid:++this.data.questionid,
        subject:queData[this.data.questionid],
        isSelected:false
      })
    }
    num++
    this.setData({
      percent:((num-1)/3*100).toFixed(0),
      serial:num
    })
    console.log("答对了",this.data.userScore)
  },
  showMistakes(){
    console.log('')
    // 1.跳页之前存储数据
    wx.setStorageSync('errs', errQuestions)
    //2.app全局变量
    // app.globalData.globalErrorOptions=errQuestions
    // console.log(app.globalData.globalErrorOptions)
    //跳页
    // wx.switchTab({
    //   url: '/pages/checkMistakes/checkMistakes',
    // })
    wx.navigateTo({
      url: '/pages/checkMistakes/checkMistakes',
    })
  }
})