// var App = getApp();
const app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    remind: '加载中',
    angle: 0,
    userInfo: {}
  },
  goToIndex:function(){
    console.log("aaa");
    wx.login({
    success(res) {
      if (res.code) {
        console.log('code:' + res.code),
        // 发起网络请求
        wx.request({
          url: 'https://www.hukehuke.vip/login',
          data: {
            code: res.code,
             operFlag: 'getOpenid'
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res);
            wx.setStorageSync("openid", res.data.openid)
            console.log(res.data.openid);
          }
        })
      }
    }
  }),
      wx.switchTab({
        url: '../photo/photo',
      });
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
          })
        }
      })
    } else {
      that.setData({
        userInfo: userInfo
      })
    }
  },
  onLoad() {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        console.log("aaa"+res.authSetting['scope.userInfo']);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  
},
    // onShow: function() {
      
    // },
    onReady: function() {
      var that = this;
      setTimeout(function () {
        that.setData({
          remind: ''
        });
      }, 1000);
      wx.onAccelerometerChange(function (res) {
        var angle = -(res.x * 30).toFixed(1);
        if (angle > 14) {
          angle = 14;
        } else if (angle < -14) {
          angle = -14;
        }
        if (that.data.angle !== angle) {
          that.setData({
            angle: angle
          });
        }
      });
    }
})