const queData = [
  {title:'1骂你想',
  answer:'A',
  options:[
    {code:'A',option:'cao'},
    {code:'B',option:'cao'},
    {code:'C',option:'cao'},
    {code:'D',option:'cao'},
  ]},
  {title:'2骂你想',
  answer:'A',
  options:[
    {code:'A',option:'艹'},
    {code:'B',option:'cao'},
    {code:'C',option:'cao'},
    {code:'D',option:'cao'},
  ]},
  {title:'3骂你想',
  answer:'A',
  options:[
    {code:'A',option:'cao'},
    {code:'B',option:'cao'},
    {code:'C',option:'cao'},
    {code:'D',option:'cao'},
  ]},
  {title:'4骂你想',
  answer:'A',
  options:[
    {code:'A',option:'cao'},
    {code:'B',option:'cao'},
    {code:'C',option:'cao'},
    {code:'D',option:'cao'},
  ]}
]
let errQuestions=[]
const app=getApp()
Page({
  data:{
    serial:1,
    subject:null,
    questionid:0,
    percent:0,
    total:4,
    userSelect:'',
    userScore:0,
    totalScore:0,
    totalError:0,
    isSelected:false
  },
  //初始化题目
  onLoad(){
    let subject=queData[this.data.questionid]
    this.setData({
      subject:subject
    })
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
      percent:((num-1)/4*100).toFixed(0),
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
    wx.navigateTo({
      url: '/pages/checkMistakes/checkMistakes?options='+errQuestions,
    })
  }
})