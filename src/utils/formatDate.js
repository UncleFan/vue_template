/*
 * @Description: 时间格式化
 * @Date: 2021-06-04 16:59:45
 * @page: formatDate.js
 */
const userAgent = navigator.userAgent;

// 系统平台
const platform = {
    isAndroid: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1,
    isIOS: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isWindows: userAgent.indexOf('windows NT') > -1
}

// 数字转换，小于10前面加0
const formatNumbers = (t) => {
    if(t < 10){
        return '0' + t
    }
    return t
}


const times = {
    /**
     * @description: 格式化13位时间戳为YYYY-MM-DD hh:mm:ss
     * @param {*timesStamp} 传入的参数，必须为13位数的时间戳
     * @param {*symbol} 传入的参数，为字符串符号
     */
    formatTimesStamp(timesStamp, symbol){
        let copyTime = undefined;
        if(!symbol || symbol === undefined) symbol = "-";
        if(typeof timesStamp === 'number'){
            copyTime =  timesStamp.toString();
            if(copyTime.length != 13){
                return console.log("timesStamp必须为13位数字")
            }
        }
        
        let Y = new Date(timesStamp).getFullYear();
        let M = formatNumbers(new Date(timesStamp).getMonth() + 1);
        let D = formatNumbers(new Date(timesStamp).getDate());
        let H = formatNumbers(new Date(timesStamp).getHours());
        let m = formatNumbers(new Date(timesStamp).getMinutes());
        let s = formatNumbers(new Date(timesStamp).getSeconds());
        
        return `${Y + symbol + M + symbol + D} ${H}:${m}:${s}`
    },
   
    /**
     * @description: 标准时间格式转换为时间戳
     * @param {*datestr} 传入的标准格式时间YYYY-MM-DD HH:mm:ss字符串
     */ 
    formatDateStamp(date){
        return Date.parse(date);
    },

    /**
     * @description: 计算时间差
     * @param {*startTime} 开始时间
     * @param {*endTime} 结束时间
     */
    getFormatTimeCalculate(startTime,endTime){
        if(
            (typeof startTime === 'number' && !window.isNaN(startTime))
            ||
            (typeof +startTime === 'number' && !window.isNaN(+startTime) && startTime.length === 13)
        ){
            // 非NaN的标准时间戳
        }
        // 时间戳形式的时间差

        // 标准形式的时间差

    },


}
console.log(platform, times)

export default times

