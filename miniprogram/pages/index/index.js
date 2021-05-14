// pages/index/index.js
Page({
  singleChoice(){
    wx.navigateTo({
      url: '/pages/singleChoice/singleChoice',
    })
  },
  multipleChoice(){
    wx.navigateTo({
      url: '/pages/multipleChoice/multipleChoice',
    })
  },
  judge(){
    wx.navigateTo({
      url: '/pages/judge/judge',
    })
  },
  random(){
    wx.navigateTo({
      url: '/pages/random/random',
    })
  },
})