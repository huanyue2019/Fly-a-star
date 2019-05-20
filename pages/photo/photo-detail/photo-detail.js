//获取应用实例
const app = getApp()
// var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    ContentImage: "",
    title: "",
    userLook: "",
    userDianzan: "",
    plContent:""
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
  // pinlun: function(event) {
  //   wx.navigateTo({
  //     url: '/pages/photo/CommentText/CommentText',
  //   })
  // },
  /**
   * 评论的js
   */
  //授权登录
  login: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        // if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo),
                that.setData({
                  nickName: res.userInfo.nickName,
                  avatarUrl: res.userInfo.avatarUrl,
                })
            }
          })
        // }
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },


  formSubmit: function(e) {
    wx.showToast({
      title: '已评论',
      icon: 'success'
    })
    var that = this;
    var liuyantext = e.detail.value.liuyantext; //获取表单所有name=liuyantext的值 
    var nickName = e.detail.value.nickname; //获取表单所有name=nickName的值 
    var headimg = e.detail.value.headimg; //获取表单所有name=headimg的值 
    wx.request({
      url: 'https://www.hukehuke.vip/addPinlun?liuyu=' + liuyantext + '&nickname=' + nickName + '&headimg=' + headimg,
      // url:'https://www.hukehuke.vip/addPinlun',
      data: {
        // plContent,
        puserId:wx.getStorageSync("openid"),
        plYeMianId: " ",
        plContent: e.detail.value.plContent

      },
      method: "post",
      header: {
        // 'Content-Type':'application/x-www-form-urlencoded'
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          re: res.data,
        })
        wx.hideToast();
      }
    })
  },

  onPullDownRefresh: function() {
    wx.showNavigationBarLoading();
    var that = this
    wx.request({
      url: 'https://www.hukehuke.vip/listPinlun',
      method: "post",
      headers: {
        // 'Content-Type':'application/x-www-form-urlencoded'
        'Content-Type': 'application/json'
      },
      success: function(res) {
        //将获取到的json数据，存在名字叫list的这个数组中
        that.setData({
          liuyanlist: res.data,
          //res代表success函数的事件对，data是固定的，liuyanlist是数组
        })
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },

  //加载最新数据
  onLoad: function() {
    var that = this
    wx.request({
      url: 'https://www.hukehuke.vip/listPinlun',
      method:"POST",
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'
      },
      success: function(res) {
        //将获取到的json数据，存在名字叫list的这个数组中
        that.setData({
          liuyanlist: res.data,
          //res代表success函数的事件对，data是固定的，liuyanlist是数组
        })
      }
    })
  }
})