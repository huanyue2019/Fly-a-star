Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: null,
    endTime: null,
    selected: { "monday": false, "tuesday": false, "friday": false, "wednesday": false, "thursday": false, "sunday": false, "saturday": false },
    // selected内放对应的用来判断class的布尔json
  },
  bindTimeChange: function (e) {
    if (e.currentTarget.id == "startTime") {
      this.setData({ startTime: e.detail.value });
    } else if (e.currentTarget.id == "endTime") {
      this.setData({ endTime: e.detail.value });
    }
  },
  checkboxChange: function (e) {
    var selectedList = e.detail.value;
    var date = ["monday", "tuesday", "friday", "wednesday", "thursday", "sunday", "saturday"];//包含所有日期的数组
    var selected = this.data.selected;//先获取data中的值，好用来赋值
    for (var i = 0; i < date.length; i++) {
      if (selectedList.indexOf(date[i]) != -1) { //判断所有的日期date在所选择的列表中是否存在，存在则给class
        selected[date[i]] = true;
      } else {
        selected[date[i]] = false;
      }
    }
    this.setData({ selected: selected });
  },
  formSubmit: function (e) {
    //提交后台
    console.log(e);
  },
})