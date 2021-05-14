// pages/personalCenter/personalCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userNmae:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options',options)
    this.setData({
      userNmae:options
    })
    console.log(this.data.userNmae)
  },
  login(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  register(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  onShow(){
    let user=wx.getStorageSync('user')
    if(user&&user.name){
      this.setData({
        loginOK:true,
        userNmae:user.name
      })
    }else{
      this.setData({
        loginOK:false
      })
    }
  },
  exit(){
    wx.setStorageSync('user', null)
    let user=wx.getStorageSync('user')
    if(user&&user.name){
      this.setData({
        loginOK:true,
        userNmae:user.name
      })
    }else{
      this.setData({
        loginOK:false
      })
    }
  },
  bindMyStudy(){
    wx.navigateTo({
      url: '/pages/mistakesSet/mistakesSet',
    })
  },
})