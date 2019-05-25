// var APP = getApp();
Page({
	data: {
		limit: '6',
		list: '',
		load: true,
		loading: false,
		upload_picture_list: [],
		photos: '',
		hiddenmodalput: true,
		imgUrls: [
			'/images/static/swiper.png',
			'/images/static/swiper.png',
			'/images/static/swiper.png',
		],
		indicatorDots: true,
		autoplay: true,
		interval: 2000,
		duration: 1000,
		navbarActiveIndex: 0,
		navbarTitle: ['首页推荐', '最新星册', '添加星星'],
		// lastid: 0,
		Exhibition: {
			title: '',
			userDianzan: '',
			collection: '',
			author: '',
			userhead: '',
			img_url: '',
			dayTime: '',
			img_urlID: '',
		},

		NewContent: [
			{
				title: '',
				userDianzan: '',
				collection: '',
				author: '',
				userhead: '',
				img_url: '',
				dayTime: '',
				img_urlID: 0,
			},
		],
		noteMaxLen: 5000, //详细地址的字数限制
		currentNoteLen: 0,

		tempFilePaths: [],
		//用户个人信息
		userInfo: {
			avatarUrl: '', //用户头像
			nickName: '', //用户昵称
		},
	},
	onLoad(options) {
		this.fetchData()
		var that = this
		/**
		 * 获取用户信息
		 */
		wx.getUserInfo({
			success: function(res) {
				console.log(res)
				var avatarUrl = 'userInfo.avatarUrl'
				var nickName = 'userInfo.nickName'
				that.setData({
					[avatarUrl]: res.userInfo.avatarUrl,
					[nickName]: res.userInfo.nickName,
				})
			},
		})
	},
	onShow(options) {
		// this.data.Exhibition.map((e) => {
		// 	console.log(e.img_url)
		// })
		// console.log(typeof this.data.Exhibition)
	},
	/**
	 * 点赞评论
	 */
	favorclick: function(e) {
		var likeFlag = false //标志，避免多次发请求
		//避免多次点击
		if (likeFlag === true) {
			return false
		}
		var that = this
		var comment_id = e.currentTarget.dataset.id //点击当前项的id
		var index = e.currentTarget.dataset.dex
		var islike = e.currentTarget.dataset.islike
		var message = this.data.talks
		var timestamp = Date.parse(new Date())
		timestamp = timestamp / 1000
		var zanInfo = {
			// token: App.globalData.portConfig.token,
			timestamp: timestamp,
			comment_id: comment_id,
			cancel: islike,
		}
		var zanData = zanInfo
		var that = this

		wx.request({
			// url: App.globalData.portConfig.HTTP_BASE_URL + 'https://www.baidu.com', //点赞接口
			// url: 'https://www.hukehuke.vip/addDianzan'url,
			url: 'http://192.168.31.37:8080/schoolLife/addDianzan',
			// data: postzanData,
			data: {
				userId: wx.getStorageSync('openid'),
				// "userYeMianId": ,
			},
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			// method:"GET",
			// header:{
			//   'content-type':'application/json',
			// },
			success: function(res) {
				// for (let i in message) {
				//   if (i == index) {
				//     if (message[i].is_like == 0) {
				//       that.data.talks[index].is_like = 1
				//       message[i].like_num = parseInt(message[i].like_num) + 1
				//     } else {
				//       that.data.talks[index].is_like = 0
				//       message[i].like_num = parseInt(message[i].like_num) - 1
				//     }
				//   }
				// }
				// that.setData({
				//   talks: message
				// })
				console.log('点赞成功', res)
				let index = e.currentTarget.dataset.dex //获取当前点击的下标
				let item = that.data.Exhibition
				// console.log(that.data.Exhibition)
				item[index].is_like = true
				that.setData({
					Exhibition: item,
				})
			},
			complete: function(res) {
				likeFlag = false
			},
		})
	},

	onReachBottom: function() {
		var that = this
		if (that.data.load) {
			//全局标志位，方式请求未响应是多次触发
			if (that.data.list.length < that.data.count) {
				that.setData({
					load: false,
					loading: true, //加载动画的显示
				})
				wx.request({
					url: 'https://www.hukehuke.vip/listloginDay',
					data: {},
					method: 'POST',
					header: {
						'content-type': 'application/json',
					},
					success: function(res) {
						console.log(res)
						var content = that.data.list.concat(res.data.data.list) //将放回结果放入content
						that.setData({
							list: content,
							page: that.data.page * 1 + 1,
							load: true,
							loading: false,
						})
					},
					fail: function(res) {
						that.setData({
							loading: false,
							load: true,
						})
						wx.showToast({
							title: '数据异常',
							icon: 'none',
							duration: 2000,
						})
					},
					complete: function(res) {},
				})
			}
		}
	},
	// 请求后台数据
	fetchData() {
		var limit = 6
		var that = this
		var navbarActiveIndex = that.data.navbarActiveIndex
		if (navbarActiveIndex === 0 || navbarActiveIndex === 1) {
			wx.request({
				url: 'https://www.hukehuke.vip/listloginDay',
				method: 'POST',
				header: {
					'content-type': 'application/json',
				},
				success: function(res) {
					var newsList = res.data
					that.setData({
						Exhibition: newsList,
					})
					wx.stopPullDownRefresh()
				},
			})
		} else {
			// wx.request({
			//     url: 'https://www.hukehuke.vip/listloginDay',
			//     method: 'POST',
			//     header: {
			//       'content-type': 'application/json',
			//     },
			//     success: function(res) {
			//       var newsList = res.data;
			//       console.log('--------------------')
			//       console.log(newsList);
			//       that.setData({
			//         NewContent: newsList,
			//       })
		}
	},
	fabu(event) {
		var that = this
		if (
			that.data.upload_picture_list &&
			that.data.upload_picture_list.length !== 0
		) {
			wx.uploadFile({
				url: 'https://www.hukehuke.vip/addDay',
				filePath: that.data.upload_picture_list[0].path,
				name: 'file',
				method: 'post',
				formData: {
					dayId: wx.getStorageSync('openid'),
					content: event.detail.value.content,
				},
				header: {
					'content-type': 'multipart/form-data',
				},
				success(res) {
					// 判断发布是否成功
					if (res.statusCode === 200) {
						that.setData({
							navbarActiveIndex: 1,
							upload_picture_list: [],
						})
						wx.showToast({
							title: '放星成功~',
						})
					} else {
						wx.showToast({
							title: '放星失败~',
							icon: 'none',
						})
					}
				},
				fail(err) {
					wx.showToast({
						title: '放星失败~',
						icon: 'none',
					})
				},
			})
		} else {
			wx.showToast({
				title: '请添加图片!',
				icon: 'none',
			})
		}
	},
	onPullDownRefresh() {
		this.fetchData()
	},
	/**
	 * 轮播导航栏
	 */
	onNavBarTap: function(event) {
		// 获取点击的navbar的index
		let navbarTapIndex = event.currentTarget.dataset.navbarIndex
		// 设置data属性中的navbarActiveIndex为当前点击的navbar
		this.setData({
			navbarActiveIndex: navbarTapIndex,
		})
	},
	onBindAnimationFinish: function({ detail }) {
		// 设置data属性中的navbarActiveIndex为当前点击的navbar
		this.setData({
			navbarActiveIndex: detail.current,
		})
	},

	/**
	 *  // 文章绑定详情id果
	 */
	onExhibitionTap: function(event) {
		var postId = event.currentTarget.dataset.postid
		wx.request({
			url: 'https://www.baidu.com',
			date: {
				userId: wx.getStorageInfoSync('openid'),
				// userYeMianId: that.data.img_urlID,
			},
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			success: function(res) {},
		})
		wx.navigateTo({
			url: '/pages/photo/photo-detail/photo-detail',
		})
	},
	/**
	 *  输入进行评论效果
	 */
	pinlun: function(event) {
		// wx.showModal({
		//   title: '提示',
		//   content: '即将跳转至评论页面',
		//   success: function(res) {
		//     if (res.confirm) {
		//       console.log('用户点击确定')
		//     } else if (res.cancel) {
		//       console.log('用户点击取消')
		//     }
		//   }
		// })
		wx.navigateTo({
			url: '../photo/CommentText/CommentText',
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
