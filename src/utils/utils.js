
export default {
  // 单位换算
  conversion: function (playCount) {

  	if (playCount>=100000000) {
  		if (playCount%100000000<10000000) {
  			playCount=(playCount/100000000).toFixed(0)+'亿';
  		}else{
  			playCount=(playCount/100000000).toFixed(1)+'亿';
  		}
  	}else if (playCount>=10000) {
    	playCount=(playCount/10000).toFixed(0)+'万'
    }
    return playCount
  },
  // 格式化时间
  formatTime: function (time) {
    let m=Math.floor(time/60);
    let s=Math.floor(time%60);
      s=s>=10?s:'0'+s;
      if (m<=0) {
        m=='00'
      }else if(m>0&&m<10){
        m='0'+m
      }
      return m+':'+s
  },
  toTime () {
    
  }
 }
