// pages/write-Letter/write-Letter.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      noteMaxLen: 5000, //详细地址的字数限制
      currentNoteLen: 0,

      list: '',
      upload_picture_list: []

      // img: [], //设置一个数组
    },
    chooseImage: function(e) {
      var that = this,
       upload_picture_list = that.data.upload_picture_list;
      if (upload_picture_list.length < 4) {
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: function(res) {
            var tempFilesSize = res.tempFiles[0].size; //获取图片的大小，单位B
            if (tempFilesSize <= 2000000) { //图片小于或者等于2M时 可以执行获取图片
              var tempFilePaths = res.tempFilePaths[0]; //获取图片
              that.data.img.push(tempFilePaths); //添加到数组
              that.setData({
                img: that.data.img
              })
            } else { //图片大于2M，弹出一个提示框
              wx.showToast({
                title: '上传图片不能大于2M!', //标题
                icon: 'none' //图标 none不使用图标
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '上传图片不能大于3张!',
          icon: 'none'
        })
      }
    },
    complete: function(res) {
      var tempFilePaths = res.tempFilePaths
      that.setData({
        src: tempFilePaths[0]
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
      wx.showToast({
        title: '发送成功',
        icon: 'success',
        duration: 2000
      })
    },
    /**
     * 选择上传图片
     */
    uploadpic: function(e) {
      var that = this //获取上下文
      var upload_picture_list = that.data.upload_picture_list
      //选择图片
      wx.chooseImage({
        count: 3,
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
          });

        }
      })
    },
    //点击上传事件
    uploadimage: function() {
      var page = this
      var upload_picture_list = page.data.upload_picture_list
      //循环把图片上传到服务器      
      for (var j in upload_picture_list) {
        // if (upload_picture_list[j]['upload_percent'] == 0) {
        //   //调用函数
        //   app.util.upload_file_server(app.api.up_pic, page, upload_picture_list, j)
        // }
      }
    },

    // 删除图片
    deleteImg: function(e) {
      let upload_picture_list = this.data.upload_picture_list;
      let index = e.currentTarget.dataset.index;
      upload_picture_list.splice(index, 1);
      this.setData({
        upload_picture_list: upload_picture_list
      });
    },
  }),
  function upload_file_server(url, that, upload_picture_list, j) {
    //上传返回值
    const upload_task = wx.uploadFile({

      url: url,
      filePath: upload_picture_list[j]['path'], //上传的文件本地地址    
      name: 'file',
      formData: {
        'num': j
      },
      //附近数据，这里为路径     
      success: function(res) {

        var data = JSON.parse(res.data);
        // //字符串转化为JSON  
        if (data.Success == true) {

          var filename = data.file //存储地址 显示

          upload_picture_list[j]['path_server'] = filename

        } else {
          upload_picture_list[j]['path_server'] = filename
        }
        that.setData({
          upload_picture_list: upload_picture_list
        });
        wx.setStorageSync('imgs', upload_picture_list);
      }
    })
  }