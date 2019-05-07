// pages/advice/advice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteMaxLen: 5000, //详细地址的字数限制
  },
  submit: function (event) {
    wx.showModal({
      title: '放星团队',
      content: '感谢您的反馈！',
    })
    wx.request({
      url: '',
      method:'GET',
      data:{
        "fanKuiId":wx.getStorageSync("openid"),
        "fanKuiContent":event.detail.value.fanKuiContent

      },
      header:{
        'content-type':'application/json'
      }
      
    })
  },
 
})