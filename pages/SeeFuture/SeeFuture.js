// pages/SeeFuture/SeeFuture.js
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },
  // 上传图片接口
  doUpload: function () {
      var that = this
      wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: function(res){
              var filePath = res.tempFilePaths[0]
              wx.uploadFile({
                  url: config.service.ProcessImageUrl,
                  filePath: filePath,
                  name: 'process_image',
                  header: { "Content-Type": "multipart/form-data" },
                  formData: {imgPath: filePath},
                  success: function(response) {
                      console.log(response.data)
                      response = JSON.parse(response.data)
                      response = JSON.parse(response.data)
                      that.setData({
                          imgUrl: response.url
                      })
                  },
                  fail: function(e) {
                  }
              })
              // wx.request({
              //     url: config.service.ProcessImageUrl,
              //     method: 'POST',
              //     data: util.json2Form({imgPath: filePath}),
              //     header: {
              //         "Content-Type": "application/x-www-form-urlencoded"
              //     },
              //     success: function(res) {
              //         util.showSuccess('图片处理成功')
              //         console.log(res.data)
              //         res = JSON.parse(res.data.data)
              //         console.log(res)
              //         that.setData({
              //             imgUrl: res.url
              //         })
              //     },
              //     fail: function(e) {
              //         util.showModel('图片处理失败')
              //     }
              // })
          },
          fail: function(e) {
              console.error(e)
          }
      })
  }

})
