Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList:[],
    item:[],
    title:'',
    desc:'',
    itemIndex:null
    
  },
  onShow:function(){
    
    var configs=wx.getStorageSync('configs');
    var itemList=[];
    var item=[];
    var first=true;
    for(var i in configs){
       var config=configs[i];
       if(config.state){
         if(first){
           var desc=config.desc.replace(/@/g,config.time+'秒');
           this.setData({title:config.name,desc:desc});
           first=false;
         }
         var desc = config.desc.replace(/@/g, config.time + '秒');
         itemList.push(config.name);
         item.push({name:config.name,id:config.id,desc:desc})
       }
    
    }
    this.setData({itemList:itemList});
    this.setData({item:item});
    
  },
  actinSheet:function(){
     var thispage=this
    wx.showActionSheet({
      itemList: this.data.itemList,
      success: function (res) {
        //console.log(res.tapIndex)
        var itemIndex=res.tapIndex;
       thispage.setData({itemIndex:itemIndex});
      
       thispage.setData({title:thispage.data.item[itemIndex].name});
       thispage.setData({ desc: thispage.data.item[itemIndex].desc})
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    }) 
    
  }
})