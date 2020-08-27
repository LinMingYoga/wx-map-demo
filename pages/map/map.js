// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "/images/dingwei.png",
      id: 0,
      latitude: 0,
      longitude: 0,
      width: 30,
      height: 30
    }],
    latitude: 0,
    longitude: 0,
    onAddress: '请选择您的上车地点',
    offAddress: '请选择您的上车地点'
  },

  getOnAddress () {
    var _this = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        _this.setData({
          onAddress: res.address
        })
      }
    })
  },
  getOffAddress () {
    // wx.chooseLocation({
    //   success: (res) => {
    //     this.setData({
    //       offAddress: res.address
    //     })
    //   },
    // })
    let data = this.getAddress()
    console.log(data);
  },

  getAddress() {
    return new Promise((resolve, reject) => {
      wx.chooseLocation({
        success: (res) => {
          resolve(res)
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        const data = _this.data.markers[0]
        data.latitude = res.latitude,
        data.longitude = res.longitude
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [data]
        })
        console.log(res, _this.data);
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.chooseLocation({
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})