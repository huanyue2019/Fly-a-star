// pages/write-Letter/write-Letter.js
var App = getApp()
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		noteMaxLen: 5000, //详细地址的字数限制
		currentNoteLen: 0,
		list: '',
		starTime: '',
		starTitle: '',
		upload_picture_list: [],

		// img: [], //设置一个数组
	},

	onLoad: function(options) {
		console.log(options)
		var starTime = options.starTime
	},

   onLoad:function(options){
    console.log(options)
     this.setData({
       starTime: options.starTime,
       starTitle: options.starTitle
     })
    
    
   },

    input(event) {
      var value = event.detail.value,
        len = parseInt(value.length);
      let that = this;
      this.setData({
        currentNoteLen: len
      });
    },
    submit: function(event) {
      console.log(event);
      // wx.showModal({
      //   title: '发送成功',
      //   content: '',
      // })
      wx.showToast({
        title: '发送成功！',
      })
      var that = this;
      wx.uploadFile({
        url: 'https://www.hukehuke.vip/addStar',
        filePath: that.data.upload_picture_list[0].path,
        // filePath: that.data.upload_picture_list[0],
        name: 'file',
        formData: { 
          "starUser_id": wx.getStorageSync('openid'),
          "starTitle": that.data.starTitle ,
          "starTime": that.data.starTime ,
          "starContent": event.detail.value.starContent
        },
        header: {
          'content-type': 'multipart/form-data',
        },
      })
    },
    /**
     * 选择上传图片
     */
    upimg: function() {
      wx.chooseImage({
        success: function(res) {
          var data = {
            // program_id: app.jtappid
          }
          var tempFilePaths = res.tempFilePaths //图片
          wx.uploadFile({
            url: '',
            filePath: tempFilePaths[0],
            name: 'add_image', //文件对应的参数名字(key)
            formData: data, //其它的表单信息
            success: function(res) {
              // console.log(res);
              // var tempFiles = res.tempFiles
              var filepath = res.tempFilePaths
              // var that = this;
              // var _tempFilePaths = this.data._tempFilePaths;
              tempFiles[i]['upload_percent'] = 0
              tempFiles[i]['path_server'] = ''
              upload_picture_list.push(tempFiles[i])
              //显示
              that.setData({
                // upload_picture_list: upload_picture_list,
                _tempFilePaths: _tempFilePaths,
              })
            },
          })
        },
      })
    },
    uploadpic: function(e) {
      var that = this //获取上下文
      var count = 1
      var upload_picture_list = that.data.upload_picture_list
      if (upload_picture_list.length >= 1) {
        wx.showModal({
          title: '警告',
          content: '只能上传一张图片哦！',
        })
        return
      }
      count = 1 - upload_picture_list.length
      // 选择图片
      wx.chooseImage({
        count: count,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function(res) {
          var tempFiles = res.tempFiles
          //把选择的图片 添加到集合里
          for (var i in tempFiles) {
            tempFiles[i]['upload_percent'] = 0
            tempFiles[i]['path_server'] = ''
            upload_picture_list.push(tempFiles[i])
          }
          //显示
          that.setData({
            upload_picture_list: upload_picture_list,
          })
        },
      })
    },
    // 点击上传事件
    uploadimage: function() {
      var page = this
      var upload_picture_list = page.data.upload_picture_list
      //循环把图片上传到服务器
      for (var j in upload_picture_list) {
        if (upload_picture_list[j]['upload_percent'] == 0) {
          //调用函数
          // app.util.upload_file_server(app.api.up_pic, page, upload_picture_list, j)
        }
      }
    },
    NoShangchuan: function(e) {
      wx.showModal({
        title: '温馨提示',
        content: '只能上传一张图片哦~',
      })
    },
    // 删除图片
    deleteImg: function(e) {
      let upload_picture_list = this.data.upload_picture_list
      let index = e.currentTarget.dataset.index
      upload_picture_list.splice(index, 1)
      this.setData({
        upload_picture_list: upload_picture_list,
      })
    },
  }),
  function upload_file_server(url, that, upload_picture_list, j) {
    //上传返回值
    const upload_task = wx.uploadFile({
      url: '',
      filePath: upload_picture_list[j]['path'], //上传的文件本地地址
      name: 'file',
      formData: {
        num: 5,
      },
      //附近数据，这里为路径
      success: function(res) {
        var data = JSON.parse(res.data)
        // //字符串转化为JSON
        if (data.Success == true) {
          var filename = data.file //存储地址 显示
          upload_picture_list[j]['path_server'] = filename
        } else {
          upload_picture_list[j]['path_server'] = filename
        }
        that.setData({
          upload_picture_list: upload_picture_list,
        })
        wx.setStorageSync('imgs', upload_picture_list)
      },
    })
    upload_task.onProgressUpdate((res) => {
      upload_picture_list[j]['upload_percent'] = res.progress
      that.setData({
        upload_picture_list: upload_picture_list,
      })
    })
  }
