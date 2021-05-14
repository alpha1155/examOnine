Page({
  data: {
    userNmae:'',
    studentID:'',
    password:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  getStudentID(e){
    this.data.studentID=e.detail.value
    console.log( this.data.studentID)
  },
  getPassword(e){
    this.data.password=e.detail.value
    console.log( this.data.password)
  },
  login(){
    var studentID=this.data.studentID,password=this.data.password
    this.setData({
      studentID:this.data.studentID,
      password:this.data.password
    })
    console.log(this.data.studentID,this.data.password)
    if(studentID.length<13){
      wx.showToast({
        title: '请输入正确学号',
        icon:'none'
      })
      return
    }else if(password.length<8){
      wx.showToast({
        title: '请输入8--12位密码',
        icon:'none'
      })
      return
    }
    //登录
    wx.cloud.database().collection('user').where({
      studentID:studentID
    })
    .get({
      success(res){
        console.log("获取成功",res)
        let user=res.data[0]
        if(password==user.password){
          console.log('登录成功')
          wx.showToast({
            title: '登录成功',
            icon:'none'
          })
          // wx.navigateTo({
          //   url: '../personalCenter/personalCenter?name='+user.name,
          // })
          wx.switchTab({
            url: '../personalCenter/personalCenter',
          })
          //保存登录状态
          wx.setStorageSync('user', user)
        }else{
          console.log('登录失败')
          wx.showToast({
            title: '账号或密码错误',
            icon:'none'
          })
        }
      },
      fail(res){
        console.loh("获取失败",res)
      }
    })
  },
})

