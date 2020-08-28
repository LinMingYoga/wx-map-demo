var amapFile = require('../../libs/amap-wx');
Page({
  data: {
    key: 'd52e2bc9790f5508203e5308636a5335',
    show: false,
    currentLo : null,
    currentLa : null,
    newCurrentLo : null,
    newCurrentLa : null,
    distance : 0,
    duration : 0,
    markers : null,
    scale: 16,
    polyline: null,
    statusType: 'car',
    includePoints:[],
    getOnAddress: '',
    getOffAddress: ''
  },
  onLoad(){
    var _this = this;
    wx.getLocation({
      success(res){
        _this.setData({ 
          currentLo: res.longitude, 
          currentLa: res.latitude,
          includePoints: [{
            longitude: res.longitude,
            latitude: res.latitude
          }],
          markers: [{
            id: 0,
            longitude: res.longitude,
            latitude: res.latitude,
            title: res.address,
            iconPath: '../../images/dingwei.png',
            width: 32,
            height: 32
          }]
        });
      }
    })
  },
  getAddress(e){
    var that = this
    wx.chooseLocation({
      success(res){
        console.log('上车', res);
        var markers = that.data.markers;
        markers.push({
          id: 1,
          longitude: res.longitude,
          latitude: res.latitude,
          title: res.address,
          iconPath: '../../images/dingwei.png',
          width: 32,
          height: 32
        });

        var points = that.data.includePoints;
        points.push({
          longitude: res.longitude,
          latitude: res.latitude
        });
        that.setData({
          newCurrentLo: res.longitude,
          newCurrentLa: res.latitude,
          includePoints: points,
          markers: markers,
          show:false,
          getOnAddress: res.name
        });
        that.getPolyline(that.data.statusType);
      }
    });
  },
  getOffAddress(e) {
    var that = this
    wx.chooseLocation({
      success(res){
        console.log('下车', res);
        var markers = that.data.markers;
        markers.push({
          id: 0,
          longitude: res.longitude,
          latitude: res.latitude,
          title: res.address,
          iconPath: '../../images/dingwei.png',
          width: 32,
          height: 32
        });

        var points = that.data.includePoints;
        points.push({
          longitude: res.longitude,
          latitude: res.latitude
        });
        that.setData({
          newCurrentLo: res.longitude,
          newCurrentLa: res.latitude,
          includePoints: points,
          markers: markers,
          show:true,
          getOffAddress: res.name
        });
        that.getPolyline(that.data.statusType);
      }
    });
  },
  drawPolyline(self,color){
    return {
      origin: this.data.currentLo + ',' + this.data.currentLa,
      destination: this.data.newCurrentLo + ',' + this.data.newCurrentLa,
      success(data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        self.setData({
          distance: data.paths[0].distance,
          duration: parseInt(data.paths[0].duration/60),
          polyline: [{
            points: points,
            color: color,
            width: 6,
            arrowLine: true
          }]
        });
      }
    }
  },
  getPolyline(){
    var amap = new amapFile.AMapWX({ key: this.data.key });
    var self = this;
    amap.getDrivingRoute(this.drawPolyline(self,"#0091ff"));
    // switch (_type){
    //   case 'car':
    //     amap.getDrivingRoute(this.drawPolyline(this,"#0091ff"));
    //     break;
    //   case 'walk':
    //     amap.getWalkingRoute(this.drawPolyline(this, "#1afa29"));
    //     break;
    //   case 'ride':
    //     amap.getRidingRoute(this.drawPolyline(this, "#1296db"));
    //     break;
    //   default:
    //     return false;
    // }
  },
  goTo(e){
    // var _type = 'car';
    // this.setData({statusType : _type});
    this.getPolyline(this.data.statusType);
  }
})