/*
* @Author: Tinphic
* @Date:   2018-12-05 16:48:52
* @Last Modified by:   Tinphic
* @Last Modified time: 2018-12-06 14:51:03
*/

let sse = (item, arr, check) =>{
	let cname = 'TSQ_SH',isHas = false
	if(item.OuterCode.slice(0,1) != 3&&item.OuterCode.slice(0,1) != 0){
		cname += (''+item.OuterCode)
	}else{
		cname = 'TSQ_SZ'+item.OuterCode
	}
	for (let i= 0; i< arr.length; i++) {
		if(arr[i].name == item.ShortName){
			isHas = true
			break
		}
	}
	if(isHas){
		return
	}
	let source = new EventSource(('http://89.push1.eastmoney.com/sse?cb=icomet_cb_1543818985726_0&cname='+cname+'&seq=849987&noop=0&token=&_=1543818985727'));
    let obj = {
        name: item.ShortName,
        price: 0,
        kpPrice: 0,
        rise: '0.00%',
        zsPrice: 0,
        chaj: 0,
        buy: 0,
        sale: 0
    }
    source.onmessage = function(e){
        if(JSON.parse(e.data).content){
	        let content = JSON.parse(JSON.parse(e.data).content)
	        // console.log(content)
	        content['43']?obj.price = cont(content['43']): ''
		    content['58']?obj.name = content['58']: ''
	        content['40']?obj.sale = content['40']: ''
	        content['20']?obj.buy = content['20']: ''
	        content['46']?obj.kpPrice = cont(content['46']): ''
	        content['60']?obj.zsPrice = cont(content['60']): ''
	        if(obj.zsPrice != 0){
	        	let cj = ((obj.price-obj.zsPrice)/obj.zsPrice)*100
	        	obj.chaj = (obj.price-obj.zsPrice).toFixed(2)
	        	obj.rise = cj.toFixed(2)+'%'
	        }
	        // if(item.ShortName == '亚普股份'){
	        // 	console.log(content)
	        // }
        }
        // console.log(check)
        if(!check[item.ShortName]){
            arr.push(obj)
        }
      	check[item.ShortName] = true
    };
    function cont(num){
    	let contNum = num.toString().slice(0,-2)+'.'+num.toString().slice(-2)
    	return contNum
    }
}
export default sse;