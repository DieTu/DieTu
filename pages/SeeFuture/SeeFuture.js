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
      var img_sucai_Path = []
      wx.chooseImage({
          count: 2,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: function(res){
              wx.uploadFile({
                  url: config.service.UploadFileUrl,
                  filePath: res.tempFilePaths[0],
                  name: 'process_image',
                  header: { "Content-Type": "multipart/form-data" },
                  success: function(response) {
                      response = JSON.parse(response.data)
                      response = JSON.parse(response.data)
                      console.log(response)
                      img_sucai_Path.push(response.imgPath)
                      wx.uploadFile({
                          url: config.service.UploadFileUrl,
                          filePath: res.tempFilePaths[1],
                          name: 'process_image',
                          header: { "Content-Type": "multipart/form-data" },
                          success: function(response) {
                              response = JSON.parse(response.data)
                              response = JSON.parse(response.data)
                              console.log(response)
                              img_sucai_Path.push(response.imgPath)
                              console.log(img_sucai_Path)
                              wx.request({
                                  url: config.service.ProcessImageUrl,
                                  method: 'POST',
                                  data: util.json2Form({imgPath1: img_sucai_Path[0], imgPath2: img_sucai_Path[1]}),
                                  header: {
                                      "Content-Type": "application/x-www-form-urlencoded"
                                  },
                                  success: function(res) {
                                      util.showSuccess('图片处理成功')
                                      console.log(res.data)
                                      res = JSON.parse(res.data.data)
                                      console.log(res)
                                      that.setData({
                                          imgUrl: res.url
                                      })
                                  },
                                  fail: function(e) {
                                      util.showModel('图片处理失败')
                                  }
                              })
                          },
                          fail: function(e) {
                          }
                      })
                  },
                  fail: function(e) {
                  }
              })
          },
          fail: function(e) {
              console.error(e)
          }
      })
  }

})
