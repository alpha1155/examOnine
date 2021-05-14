// pages/register/register.js
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
  getUserName(e){
    this.data.userNmae=e.detail.value
    console.log( this.data.userNmae)
  },
  getStudentID(e){
    this.data.studentID=e.detail.value
    console.log( this.data.studentID)
  },
  getPassword(e){
    this.data.password=e.detail.value
    console.log( this.data.password)
  },
  submit(){
    var  name=this.data.userNmae,studentID=this.data.studentID,password=this.data.password
    this.setData({
      userNmae:this.data.userNmae,
      studentID:this.data.studentID,
      password:this.data.password
    })
    console.log( this.data.userNmae,this.data.studentID,this.data.password)
    if(name.length<3){
      wx.showToast({
        title: '请输入3-10位用户名',
        icon:'none'
      })
      return
    }else if(studentID.length<13){
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
    wx.cloud.database().collection('user').add({
      data:{
        name:name,
        studentID:studentID,
        password:password
      },
      success(res){
        wx.showToast({
              title: '注册成功',
              icon:'none'
            })
            wx.navigateTo({
              url: '../login/login',
            })
      },
      fail(res){
        wx.showToast({
              title: '注册失败',
              icon:'none'
            })
      },
    })
    
  },
})