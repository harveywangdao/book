App({
  onLaunch: function () {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success: res => {
        console.log(res.code)
      },
      fail: res => {
        console.log('login fail')
      }
    })

    wx.getSetting({
      success: res => {
        console.log('authSetting:', res.authSetting)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo

              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }

        if (res.authSetting['scope.userLocation']){
          wx.getLocation({
            type: 'wgs84',
            success: res => {
              console.log(res)
              this.globalData.posInfo = {
                latitude: res.latitude,
                longitude: res.longitude
              }
              
              if (this.posInfoReadyCallback) {
                this.posInfoReadyCallback(res)
              }
            }
          })
        }
      },
      
      fail: res => {
        console.log('getSetting fail')
      }
    })
  },

  globalData: {
    userInfo: null,
    posInfo: null
  }
})