// var photoData = require('../../../data/dynamic_data.js')

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newData: "",
    ContentImage:"/images/post/classmate.jpg",
    title:"",
    userLook:"",
    userDianzan:"",
  },
 
  onBackTap: function(e) {
    // wx.redirectTo({
    //   url: 'https://www.hukehuke.vip/addDay',
    // })
    var pages = getCurrentPages(); //获取当前页面
    var prePage = pages[pages.length - 2]; //获取上一页面
    prePage.setData({
      'search.page': 1 //给上一页面的变量赋值
    })
    // prePage.getPageData(); //调用上一页面的方法（加载数据）
    wx.navigateBack({ //返回上一页面
      delta: 1,
    })
  },
  pinlun: function (event) {
    wx.navigateTo({
      url: '/pages/photo/CommentText/CommentText',
    })
  },
})