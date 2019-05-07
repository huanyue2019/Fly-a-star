// pages/star-Album/star-Album.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleCount: 0, //标题字数
    title: '', //标题内容
  },
  chooseImage: function (e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({ src: tempFilePaths[0] })
      },
    })
  },
  // onAlbumTap: function(event){
  //     wx.navigateTo({
  //       url: 'star-Album/star-Album',
  //     })
  // }
})