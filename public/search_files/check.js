/* 
	�ַ�������
	 1���Ƿ�������				isInt(str,bEmpty)		bEmpty�Ƿ�Ϊ��
	 2���Ƿ��Ǹ�����			isFloat(str,bEmpty)		
	 3���Ƿ������ַ�Ϊ��������	isNumber(str,bEmpty)		bEmpty�Ƿ�Ϊ��
	 4���Ƿ�Ϊ��				isNull(str)
	 5���Ƿ������� xxxx-xx-xx	xxxx/xx/xx     ������
	 							isDate(str,bEmpty)
	 6���Ƿ���EMAIL				isEmail(str,bEmpty)
	 7���Ƿ��ǵ绰����			isTelNo(str,bEmpty)
	 8���Ƿ���������ַ�		isASCII(str,bEmpty)
	 9���ü��ַ���				trim(str,flag)
	 10�������ַ�������			strlen(str)
	11���������ַ��������ڸ�ʽ	concatDate(year,month,day)
	12���Ƚ������ַ����Ƿ����	equals(str1,str2,length)
	13���Ƚ�������ֵ�Ĵ�С,str1����str2����-1�� ���ڷ���0�� С�ڷ���1
								compareFloat(str1,str2)
	14���Ƿ���������ַ�(~`!@#$%^&*()-+=|{}[]:";'<>,./?)
	        					hasSpecSymbol(str,bEmpty) 
	15.�õ��ı����ֽ��� getStringByteLength(str)
	�ؼ�����
	 1���Ƿ��ǻس���			isEnterKey()
	 2���۽�����һ���ؼ�		keyEnter(keyCode,nextControl) 
	 3���Ƿ�������				isIntCtrl(ctrl, bEmpty)
	 4���Ƿ��Ǹ�����			isFloatCtrl(ctrl,bEmpty)
	 5���Ƿ�Ϊ��				isNullCtrl(ctrl,bEmpty)
	 6���Ƿ���������ַ�		isASCIICtrl(ctrl,bEmpty)
	 7���Ƿ������ڸ�ʽ			isDateCtrl(ctrl,bEmpty)
	 8���Ƿ���EMAIL				isEmailCtrl(ctrl,bEmpty)
	 9���Ƿ��ǵ绰����			isTelNoCtrl(ctrl,bEmpty)
	10�����ؼ������Ƿ����		equalsCtrl(ctrl1,ctrl2,bEmpty,length)
	11��ȡ��textarea�ؼ��ĸ߶�  getTextareaHigh(textarea)	
	12��covertDate(strDate) �����ڸ�ʽΪ"2003-08-21"���ַ�����Ϊ���ڶ���Date		
	13��compareDate(strStartDate, strEndDate) �ж��Ƿ���ʼ����С�ڵ��ڽ�������	
	14��getLocation(lc) �ڸ��������������ʱ�������	
	15���Ƿ���������ַ�(~`!@#$%^&*()-+=|{}[]:";'<>,./?)
								hasSpecSymbolCtrl(ctrl,bEmpty)
	16������ҽ���С���ⲻ����0��ͷ  IsZeroStart(num)
	
	2008-12-22�¼�
	//�Ƿ����ʱ�
	function isChinaCode
	//�Ƿ����ʱ�2 isPostId(str)
	�Ƿ��Ǻ��� checkIsChinese(str)   
 	*/
	function   checkIsChinese(str)   
  {   
	  //���ֵΪ�գ�ͨ��У��
	  if (str   ==   "")   
	    return   true;   
	  var pattern   =   /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])*$/gi;   
	  if (pattern.test(str))   
	      return   true;   
	  else   
	      return   false;   
  }
	
	
	function isInt(str,bEmpty){
		if(str==null||trim(str)=="")
		{
			return bEmpty;
		}	
	
	  if(trim(str) == "0"){
	    return false;
	  }
	  
		var ch = str.substring(0,1);
		
		if (ch == "0" && trim(str) != "0"){
			return false;
		}
		
		for (var i=0; i<str.length ; i++){
			var s = str.substring(i, i+1);
			if (!(s >= "0" && s <="9"))
			{
				return false;
			}
		}
		return true;
	}
	//�Ƿ����ʱ�
	function isChinaCode(str,bEmpty,checkLength){
		if(str == null || trim(str) == "" || trim(str) == '' || str=='undefine'){
			return bEmpty;
		}
		
	  var strLength = str.length;
	  if(strLength != checkLength){
	    return false;
	  }
	  
		for (var i=0; i<str.length; i++){
			var s = str.substring(i, i+1);
			if (!(s >= "0" && s <="9")){
				return false;
			}
		}
		return true;
	}
	//�Ƿ����ʱ�2
	function isPostId(str){
		var reg=/^\d{6}$/;
		return reg.test(str);
	
	}
	
	function isFloat(checkstr, bEmpty, tcount)
	{
		if(checkstr==null||trim(checkstr)=="")
		{
			return bEmpty;
		}	
	
		var str	= trim(checkstr);
		if(str.substring(0,1)==".")
		{
			return false;		
		}
		var temp=0;
		for(var i=0;i<str.length;i++)
		{
			var ch=str.substring(i,i+1);		
			if(!((ch>="0" && ch<="9") || ch=="."))
			{
				return false;		
			}
			if(ch==".")
				temp++;
			if(temp>1)
			{
				return false;		
			}
		}	
			
		if(tcount != null && tcount > 0)
		{
			if(str.indexOf(".") != -1 && str.length - (str.indexOf(".")+1) > tcount)
			{				
				return false;
			}	
		}
						
		var start1 = checkstr.substring(0,1);
		var start2 = checkstr.substring(1,2);
		if(start1 == 0 && start2!=".")
		{
		    for(var i=0;i<str.length;i++)
		    {
		     var ch=str.substring(i,i+1);
		     if (ch==0)
		     temp++;
		     }
		   if (temp == str.length)
		    {
		      return true;
		    }
		    return false;
		  }
		
		
		return true;
	}
	
	function isNumber(str,bEmpty)
	{
		if(str==null||trim(str)=="")
		{
			return bEmpty;
		}
	
		for (var i=0; i<str.length ; i++)
		{
			var s = str.substring(i, i+1);
			if (!(s >= "0" && s <="9"))
			{
				return false;
			}
		}
		return true;
	}
	
	function isNull(str)
	{
		if (str == null || trim(str) == "")
		{
			return true;
		}
		return false;
	}
	
	function isDate(str,bEmpty)
	{
		if (str == null)
		{
			return bEmpty;
		}
		if (trim(str).length != 10 )
		{
			return (false);
		}
		for (var i=0; i<str.length; i++ )
		{
			var ch = str.substring(i, i+1);
			
			if (i ==4 || i ==7)
			{
				if (!(ch != "-" || ch != "/"))
				{
					return (false);
				}
			} else {
				if (!(ch >= "0" && ch<="9"))
				{
					return false;
				}
			}
			if ( (i==5 && ch>'1')||(i==8 && ch>'3') ) {
				return (false);
			}
		}
		return true;
	}

//�жϵ绰��ʽΪ:010-12345678 �� 0472-0987654
	function isTelNo(str,bEmpty){
		if(str==null||trim(str)=="")
			return bEmpty;
			
    //var re=/^(\d{3,4}-)?\d{7,8}$/g;
    var pattern =/^(\d{3,4}-)?(\d{7,8})(-(\d{1,5}))?$/;
    var tel=tel;
    if(!pattern.test(str)){
    	return false;
    }
    return true;
	}
	
	function isMobile(str,bEmpty)
	{
		if(bEmpty == null) {
			bEmpty = true;
		}
		
		if(str==null||trim(str)=="")
			return bEmpty;		
			
    var str	= trim(str);
		//�õ� ^(1)(\d){10}$ �����µİ���186 188��
  	//var myphone=/^(13[0-9]|15[0|3|6|7|8|9]|18[6|8|9])\d{8}$/; 
  	//���޸ĵģ�1��ͷ������10λ
  	var myphone=/^(1[0-9])\d{9}$/; 
  	if(myphone.test(str) && str.length > 6 && str.length < 15) return true;
  	
  	return false;
  }	
  
	function isASCII(str, bEmpty)
	{ 
		if(str==null||trim(str)=="")
			return bEmpty;		//alert(name+"�����δ��д��");
			
		var str	= trim(str);
		
		for (var i = 0; i < str.length; i++) { 
			var ch = str.charAt(i); 
			if (!((ch >= "A" && ch <= "z" ) || (ch >="0" && ch <="9"))) { 
				return false; 
			} 
		} 
		
	    return true; 
	} 
	
	function hasSpecSymbol(str,bEmpty){
		if(str==null||trim(str)=="")
			return bEmpty;		//alert(name+"�����δ��д��");
			
		var str	= trim(str);
		
		for (var i = 0; i < str.length; i++) { 
			var ch = str.charAt(i); 
			if ((ch == "`" )|| (ch == "~" )||(ch == "!" )||(ch == "@" )||
				(ch == "#" )||(ch == "%" )||(ch == "^" )||(ch == "&" )||
				(ch == "*" )||(ch == "(" )||(ch == ")" )||(ch == "-" )||
				(ch == "+" )||(ch == "=" )||(ch == "|" )||(ch == "{" )||
				(ch == "}" )||(ch == "[" )||(ch == "]" )||(ch == ":" )||
				(ch == ";" )||(ch == "'" )||(ch == '"' )||(ch == "<" )||
				(ch == ">" )||(ch == "," )||(ch == "." )||(ch == "?" )||
				(ch == "/" )||(ch == "��")) { 
				return true; 
			} 
		} 		
	    return false; 		
	}
	
	function hasSpecRegSymbol(str,bEmpty){
		if(str==null||trim(str)=="")
			return bEmpty;		//alert(name+"�����δ��д��");
			
		var str	= trim(str);
		
		for (var i = 0; i < str.length; i++) { 
			var ch = str.charAt(i); 
			if ((ch == "`" )|| (ch == "~" )||(ch == "!" )||(ch == "��" )||(ch == "$" )||(ch == "��" )||
				(ch == "#" )||(ch == "%" )||(ch == "^" )||(ch == "&" )||(ch == "\\" )||(ch == "��" )||
				(ch == "*" )||(ch == "(" )||(ch == ")" )||(ch == "-" )||(ch == "��" )||(ch == "��" )||
				(ch == "+" )||(ch == "=" )||(ch == "|" )||(ch == "{" )||(ch == "��" )||(ch == "��" )||
				(ch == "}" )||(ch == "[" )||(ch == "]" )||(ch == ":" )||(ch == "��" )||(ch == "��" )||
				(ch == ";" )||(ch == "'" )||(ch == '"' )||(ch == "<" )||(ch == "��" )||(ch == "��" )||
				(ch == ">" )||(ch == "," )||(ch == "." )||(ch == "?" )||(ch == "��" )||(ch == "��" )||
				(ch == "/" )||(ch == "��")||(ch == "��") ) { 
				return true; 
			} 
		} 		
	    return false; 		
	}
	
	
	function checkRegSymbl(str,bEmpty){
		if(str==null||trim(str)=="")
			return bEmpty;		//alert(name+"�����δ��д��");
			
		var str	= trim(str);
		
		for (var i = 0; i < str.length; i++) { 
			var ch = str.charAt(i); 
			if ((ch == "`" )|| (ch == "~" )||(ch == "!" )||(ch == "��" )||(ch == "$" )||(ch == "��" )||
				(ch == "#" )||(ch == "%" )||(ch == "^" )||(ch == "&" )||(ch == "\\" )||(ch == "��" )||(ch == "��" )||
				(ch == "*" )||(ch == "(" )||(ch == ")" )||(ch == "-" )||(ch == "��" )||(ch == "��" )||
				(ch == "+" )||(ch == "=" )||(ch == "|" )||(ch == "{" )||(ch == "��" )||(ch == "��" )||
				(ch == "}" )||(ch == "[" )||(ch == "]" )||(ch == ":" )||(ch == "��" )||(ch == "��" )||
				(ch == ";" )||(ch == "'" )||(ch == '"' )||(ch == "<" )||(ch == "��" )||(ch == "��" )||
				(ch == ">" )||(ch == "," )||(ch == "." )||(ch == "?" )||(ch == "��" )||(ch == "��" )||
				(ch == "/" )||(ch == "��")||(ch == "��") ) { 
				return true; 
			} 
		} 		
	    return false; 		
	}
	
	//Function trim a string
	function trim(Str , Flag)
	{
	
		Str	= ""+Str;
		if( Flag == "l" || Flag == "L" )/*trim left side only*/
		{
			RegularExp	= /^\s+/gi;
			return Str.replace( RegularExp,"" );
		}
		else if( Flag == "r" || Flag == "R" )/*trim right side only*/
		{
			RegularExp	= /\s+$/gi;
			return Str.replace( RegularExp,"" );
		}
		else/*defautly, trim both left and right side*/
		{
			RegularExp	= /^\s+|\s+$/gi;
			return Str.replace( RegularExp,"" );
		}
	}
	
	function strlen(str)
	{
		return str.length;
	}
	
	
	function concatDate(year,month,day)
	{
		if (year == null||trim(year == "")) 
			return false;//alert
		if (month == null||trim(month == "")) 
			return false;//alert
		if (day == null||trim(day == "")) 
			return false;//alert
	
		var y = trim(year);
		var m = trim(month);
		var d = trim(day);
	
		var str = "";
		var yearNum = parseInt(y);
		var monthNum = parseInt(m);
		var dayNum = parseInt(d);
	
		if (monthNum < 10)
			var yS = "0" + yearNum;
		else 
			var yS = "" + yearNum;
		if (dayNum < 10)
			var yS = "0" + yearNum;
		else 
			var yS = "" + yearNum;	
	
		str+=yearNum;
		str+=month1;
		str+=day1;	
		
		return str;	
	}
	

	function equals(str1,str2,length)
	{
		if (str1 == null && str2 ==null)
		{
			return true;
		}
		
		if (str1 == str2)
		{
			return true;
		}
		
		return false;
	}
	
	function equals(str1,str2,minlength,maxlength)
	{
		if (str1.length < minlength ||str1.length > maxlength  )
		{
			return false
		}
		
		if (str1 == str2)
		{
			return true;
		}
		
		return false;
	}
	
								
								
	/**
	 *�Ƚ�������ֵ�Ĵ�С,str1����str2����-1�� ���ڷ���0�� С�ڷ���1
	 */
	function compareFloat(str1, str2)
	{	
		str1 = trim(str1);
		str2 = trim(str2);
		var float1 = parseFloat(str1);
		var float2 = parseFloat(str2);				
		if(float1 < float2) return 1;
		else if(float1 > float2) return -1;
		else if(float1 == float1)
		return 0;		
	}
	
	
	//Move Control's Focus Through Put Down One Key
	function keyEnter(keyCode,nextControl) 
	{
		var srcElement=window.event.srcElement;
		var iKeyCode = window.event.keyCode;
		
		if(iKeyCode != keyCode)
		{
			return true;
		}
		
		if(nextControl == null)
		{
			var i = 0;
			while (srcElement!=srcElement.form.elements[i])
			{
				i++;
			}
			if(!srcElement.form.elements[i+1].disabled)
				srcElement.form.elements[i+1].focus();
				if(srcElement.form.elements[i+1].type == "text"||srcElement.form.elements[i+1].type == "textarea"||srcElement.form.elements[i+1].type == "checkbox")
				      srcElement.form.elements[i+1].select();
			else
			{
			    do
			    {
			      	i++;
			    }while(srcElement.form.elements[i+1].disabled)
				srcElement.form.elements[i+1].focus();
				if(srcElement.form.elements[i+1].type == "text"||srcElement.form.elements[i+1].type == "textarea"||srcElement.form.elements[i+1].type == "checkbox")
				  srcElement.form.elements[i+1].select();
		       }
		}
		else
		{
			nextControl.focus();
			if(nextControl.type == "text"||nextControl.type == "textarea"||nextControl.type == "checkbox")
		           nextControl.select();		
		}
		return false;
	}
	
	function isIntCtrl(ctrl, bEmpty)
	{
		var flag = isInt(ctrl.value, bEmpty);
		if (flag == false)
		{
			alert("����������������");
			ctrl.focus();
			return false;
		}
		
		return true;
	}
	
	function isFloatCtrl(ctrl,bEmpty,tcount)
	{
	  if(tcount == null) tcount = '2' ;
		var flag = isFloat(ctrl.value, bEmpty,tcount);
		if (flag == false)
		{
			alert("����С��λС��" + tcount + "������");			
			ctrl.focus();
			return false;
		}
		
		return true;
	}
	
	function isNumberCtrl(ctrl, bEmpty)
	{
		var flag = isNumber(ctrl.value, bEmpty);
		if (flag == false)
		{
			alert("������0-9֮�������");
			ctrl.focus();
			return false;
		}
		
		return true;
	}
	
	function isNullCtrl(ctrl,bEmpty)
	{
		var flag = isNull(ctrl.value, bEmpty);
		if (flag)
		{
			alert("�����ַ�����Ϊ��");
			ctrl.focus();
			return false;
		}
		
		return true;
	}
	
	function isASCIICtrl(ctrl,bEmpty)
	{
		var flag = isASCII(ctrl.value, bEmpty);
		if (flag == false)
		{
			alert("���ܰ��������ַ�");
			ctrl.focus();
			return false;
		}
		
		return true;
	}
	
	
	function hasSpecSymbolCtrl(ctrl,bEmpty){
		var flag = hasSpecSymbol(ctrl.value, bEmpty);
		if (flag == false)
		{
			alert("���ܰ��������ַ�");
			ctrl.focus();
			return false;
		}
		
		return true;		
		
	}
	
	function isDateCtrl(ctrl,bEmpty)
	{
		var flag = isDate(ctrl.value, bEmpty);
		if (flag == false)
		{
			alert("��������ȷ����������");
			ctrl.focus();
			return false;
		}
		
		return true;
	}
	
	function isEmailCtrl(ctrl,bEmpty)
	{
		var flag = isEmail(ctrl.value, bEmpty);
	
		if (flag == false)
		{
			alert("��������ȷ���ʼ���ַ");
			ctrl.focus();
			return false;
		}
		
		return true;
	}
	
	function isTelNoCtrl(ctrl,bEmpty)
	{
		var flag = isTelNo(ctrl.value, bEmpty);
		if (flag == false)
		{
			alert("��������ȷ�ĵ绰����, ����0-9��-��+ ��(��)��/��");
			ctrl.focus();
			return false;
		}
		
		return true;
	}
	
	function test_name(str) {
		var pattern = /[_\-a-zA-Z0-9\@\.]{4,20}$/;
		if(pattern.test(str)) return true;
		return false;
 	}
	
	function equalsCtrl(ctrl1, ctrl2, bEmpty, length)
	{
		if (ctrl1 ==  null || ctrl1.value.length < length)
		{
			alert("���Ȳ���С��"+ length +"!");
			ctrl1.focus();
			return false;
		}		
		
		if (ctrl2 ==  null || ctrl2.value.length < length)
		{
			alert("���Ȳ���С��"+ length +"!");
			ctrl2.focus();
			return false;
		}		
		
		if (!bEmpty) {		
			if (ctrl1 ==  null || ctrl1.value.length < 1) {
				alert("���벻��Ϊ��!");
				ctrl1.focus();
				return false;
			}
			
			if (ctrl2 ==  null || ctrl2.value.length < 1) {
				alert("���벻��Ϊ��!");
				ctrl2.focus();
				return false;
			}
		}			
		
		var flag = equals(ctrl1.value, ctrl2.value, length);
	
		if (flag == false)
		{
			alert("��������ȵ�����");
			ctrl2.focus();
			return false;
		}
		
		return true;
	}
	
	function getStrLen(str)
	{
		if(str==null) return 0;
		
		//var len;
		//len = document.TestApplet.getStrByteLen(str);      				
		
	  	var size = 0;
	  	for (var i = 0; i < str.length; i++) { 
	  		var ch = str.charAt(i); 
	  		if ( ch <= "\x7f" ){
	  			size = size + 1;
	  		}
	  		if ("\x80"< ch){
	  			size = size + 2;
	  		}
	  	}
	  	
	  	return size;
	}

	function getTextareaHigh(textarea)
	 { 
	  var textareaWidth = textarea.cols;
	  var str = textarea.value;	  
	  var totalHigh = 0;
	  var rnLoc = str.indexOf("\r\n");
	  var tempString =str ;
	 
		if(rnLoc!= -1){
		   while (rnLoc != -1)
		   {
			   var s = tempString.substring(0, rnLoc);   
			   totalHigh = totalHigh  + getLineNum(s, textareaWidth);   
			   tempString = tempString.substring(rnLoc+2, tempString.length);			  
			   rnLoc = tempString.indexOf("\r\n");       
		   }
		}
		  
		if (rnLoc== -1 && tempString.length > 0)
		{  
			totalHigh = totalHigh + getLineNum(tempString, textareaWidth);
		}
	       
	  	if (totalHigh == 0)
	   		totalHigh = 1; 
		return totalHigh;	   		  	  	
 	}
 
 function getLineNum(str, lineLen)
 {   
 	  if(str==null) return 0;  
 	  
  	var cols = 1;
    var size = 0;
  	var deltaSize = 1;
    for (var i = 0; i < str.length; i++) { 
   		var ch = str.charAt(i); 
     	if ( ch <= "\x7f" ){
   			deltaSize = 1;
     	}
     	if ("\x80"< ch){
    		deltaSize = 2;
     	}
   		size = size + deltaSize;   
   		
      	if(size > lineLen*cols){
	    	//����ϸ�˫�ֽ��ַ�ʹ�ַ������У���ʹsize���һ���Բ���textarea�Զ����ж���Ŀ�λ
	    	if(deltaSize == 2) size++;
   		}
   		
   		if(size == lineLen*cols && str.charAt(i+1)<= "\x7f" && str.charAt(i+1)!= ""){
   		   var needPatch = "false";
           for(var k = lineLen*(cols-1);k < (lineLen*cols -1); k++) {
	           if(str.charAt(k) > "\x80") {
			     needPatch = "true";
	             break; 	
	           }
   	       }
   		   	
   		   if(needPatch == "true"){
   		   	 var pos = size;
   		   
   		     //�ҵ�ǰ�������˫�ֽ��ַ�
   		     for(var j = i;str.charAt(j-1)<= "\x7f" && pos>(lineLen*(cols-1)) ;j--) {
   		   	    pos--; 	
   		     }
 		     size = size + (lineLen*cols - pos) + 1;
 		   }
 		   
   		}
   		cols = Math.ceil(size/lineLen);

   		
    }

    return cols;
 }




    var	totalStr = ""; 	
	function printLengthCrtl(str,len)
	{
		var rnLoc = str.indexOf("\r\n");
		if(rnLoc>-1)
		{
			if(rnLoc>len)
			{
				var str1 = str.substring(0,len);
				totalStr +=str1+"\r\n";
				str = str.substring(len);
				
				printLengthCrtl(str,len);
			}
			else
			{
				totalStr += str.substring(0,rnLoc) + "\r\n";
				str = str.substring(rnLoc+2);
				alert(str);
				printLengthCrtl(str,len);   
			}
		}else{
			if(str.length>len)
			{
				var str1 = str.substring(0,len);
				totalStr +=str1+"\r\n";
				str = str.substring(len);
				alert(str);
				printLengthCrtl(str,len);
			}else{
				totalStr +=str;
			}
		}
		return totalStr;
	}
	       
	function printLengthCrtl(str,len)
	{
		 var totalStr = "";
		 var rnLoc = str.indexOf("\r\n");
		 if(rnLoc>-1)
		 {
		  if(rnLoc>len)
		  {
		   var str1 = str.substring(0,len);
		   var cutpos = str1.lastIndexOf(" ");
		   if(cutpos>-1)
		   {
		    totalStr += str1.substring(0,cutpos)+"\r\n";
		    str = str.substring(cutpos+1);
		   }
		   else
		   {
		    totalStr +=str1+"\r\n";
		    str = str.substring(len);
		   }
		   printLengthCrtl(str,len);
		  }
		  else
		  {
		   totalStr +=str.substring(0,rnLoc+2);
		   str = str.substring(rnLoc+2);
		   printLengthCrtl(str,len);   
		  }
		 }else{
		  if(str.length>len)
		  {
		   var str1 = str.substring(0,len);
		   var cutpos = str1.lastIndexOf(" ");
		   if(cutpos>-1)
		   {
		    totalStr += str1.substring(0,cutpos)+"\r\n";
		    str = str.substring(cutpos+1);
		   }
		   else
		   {
		    totalStr +=str1+"\r\n";
		    str = str.substring(len);
		   }
		   printLengthCrtl(str,len);
		  }else{
		   totalStr +=str;
		  }
		 }
		 return totalStr;
	}
	
	
	//�����ڸ�ʽΪ"2003-08-21"���ַ�����Ϊ���ڶ���Date
	function covertDate(strDate)
	{					
		tempStr = strDate;
		var i = tempStr.indexOf("-");					
		if(i > -1)
			var strYear = tempStr.substring(0, i);					
		tempStr = tempStr.substring(i+1, tempStr.length);
		i = tempStr.indexOf("-");					
		if(i > -1)
			var strMonth = tempStr.substring(0, i);						
		strDay = tempStr.substring(i+1, tempStr.length);					
		tempStr = tempStr.substring(i+1, tempStr.length);																									
		var date = new Date(strYear, strMonth, strDay);															
		return date;
	}
	
	//�ж��Ƿ���ʼ����С�ڵ��ڽ�������
	function compareDate(strStartDate, strEndDate)
	{
		if(trim(strStartDate) == "" || trim(strEndDate) == "" )
			return true;					  
		var startDate = covertDate(strStartDate);
		var endDate = covertDate(strEndDate);
		if(startDate.getTime() > endDate.getTime())
			return false;
		else 
			return true;
	}
	
	
	function getLocation(lc)
	{
		var date = new Date();						
		var s = lc + "";						
		var i = s.indexOf("?");
		if(i > -1)
		{
			lc = lc + "&amp;time=" + date.getTime();
		}					
		else
		{
			lc = lc + "?time=" + date.getTime();
		}
		return lc;
	}
	
	//��HTML�༭��
  var formID;
  function openscriphtml(textareaname){
    formID = textareaname;
    if (navigator.appName!="Microsoft Internet Explorer")
      alert("�˹��� Netscape �û�����ʹ�ã�")
    else {   
      newwin=window.open('../../../EbizResourceSet/htmleditor/editor.html','','width=640,height=450,status=1');
      newwin.focus();
      //newwin.execScript("var formID='CompanyNewsMaint_FormCompanyNews.CompanyNewsMaint_CompanyNewsContent';");
     }
  }
	
	//ҳ�����ָ��input�����еĳ��ı��е�ָ�����ȵ��ַ�
	//input - ָ��input����
	//showCharNumber - ָ������
	function printPartTextInLongText(input, showCharNumber){
    var str = input.value;
    var reg = /<[a-z]*[A-Z]*(\s[a-z]*[A-Z]*\=((\"(.*)\")*|(\#\w{6})*))*\/?>|<\/[a-z]*[A-Z]*>/g;
    var regSpace = /\s/g;
    var regSpace1 = /&nbsp;/g;
    var str1 = str.replace(reg,"");
    var moveSpace = str1.replace(regSpace,"");
    var laststr = moveSpace.replace(regSpace1,"");
    var str_Description = laststr.substr(0,showCharNumber) + "...";
    document.write(str_Description);            
	}	
function SetHome(){
 var LocationStr = new String(window.location);
 var NumStr = LocationStr.indexOf("\?");
  //alert(NumStr);
 var SetHomeStr;
 if(NumStr == -1){
  	SetHomeStr = LocationStr;
  }else{
	  SetHomeStr = LocationStr.substring(0,NumStr)}
	  document.getElementsByName('SetHomeA')[0].style.behavior="url(#default#homepage)";
	  document.getElementsByName('SetHomeA')[0].setHomePage(SetHomeStr);
    return false;
}	


	  
	  //У��email
	  function isEmail(str,bEmpty){
	  	if(bEmpty == null) {
	  		bEmpty = true;
	  	}
			
			if (str == null || trim(str) == "" || trim(str) == '' || str=='undefine')
			{
				return bEmpty;
			}
			//У��������hxu@sitechasia.com���ʼ�
			pattern1="^[a-zA-Z0-9_.\-]+[@]{1}[a-zA-Z0-9_\-]+[.]{1,5}[a-zA-Z0-9_\-]+";
		  //У��������huanxu@yahoo.com.cn���ʼ�
		  pattern2="^[a-zA-Z0-9_.\-]+[@]{1}[a-zA-Z0-9_\-]+[.]{1,5}[a-zA-Z0-9_\-]+[.]{1,5}[a-zA-Z0-9_\-]";
			
		  if(str.match(pattern1) || str.match(pattern2) ){
				return true;
			}
	      return false;
		}

		
		//15 �õ��ı����ֽ�����һ�������������ֽڣ����һ������ռ�����ֽڣ�Ҳ�������ֽ�
		function getStringByteLength(s) {
      var totalLength = 0;
      var i;
      var charCode;
      for (i = 0; i < s.length; i++) {
        charCode = s.charCodeAt(i);
        if (charCode < 0x007f) {
          totalLength = totalLength + 1;
        } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
          totalLength += 2;
        } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
        	//��ʱ�ĺ�����ռ�������ֽڵģ�Ϊ�˼򻯾��������ֽ�
          totalLength += 2;
        }
      }
      //alert(totalLength);
      return totalLength;
    } 
		
		
		function hiddenAllSelect() {
			var selects = document.getElementsByTagName("select");
			
			if(selects != null && selects.length > 0) {
				for(i=0; i<selects.length; i++) {
					var sel = selects[i];
					
					sel.style.display = 'none';
				}
			}
		}

		function displayAllSelect() {
			var selects = document.getElementsByTagName("select");
			
			if(selects != null && selects.length > 0) {
				for(i=0; i<selects.length; i++) {
					var sel = selects[i];
					
					sel.style.display = '';
				}
			}
		}
		
	//check ������Ƿ��ǺϷ�����ַ
 function isLinkUrl(str) {
		pattern1="^(http://){1}+";
		 if(trim(str).match(pattern1))
		 return true;
		return false;
 	}
 
 //ͼƬ��ʽ��֤
 function checkImageFile(ctrl) {
 		var fileName =ctrl.value;
		if((fileName!=null)&&(fileName!="")){
			if(fileName.lastIndexOf(".")!=-1){
				var fileType=fileName.substring(fileName.lastIndexOf(".")+1,fileName.length);
				fileType = fileType.toLowerCase()
				if((fileType=="gif")||(fileType=="bmp")||(fileType=="jpg") || (fileType=="jpeg") || (fileType=="png")){
					return true;
				}
			}
		}
		return false;
 	}
 	
var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// ��Ȩ����   
var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// ���֤��֤λֵ.10����X   
function IdCardValidate(idCard) {   
    idCard = trim(idCard.replace(/ /g, ""));   
    if (idCard.length == 15) {   
        return isValidityBrithBy15IdCard(idCard);   
    } else if (idCard.length == 18) {   
        var a_idCard = idCard.split("");// �õ����֤����   
        if(isValidityBrithBy18IdCard(idCard)&&isTrueValidateCodeBy18IdCard(a_idCard)){   
            return true;   
        }else {   
            return false;   
        }   
    } else {   
        return false;   
    }   
}   
/**  
 * �ж����֤����Ϊ18λʱ������֤λ�Ƿ���ȷ  
 * @param a_idCard ���֤��������  
 * @return  
 */  
function isTrueValidateCodeBy18IdCard(a_idCard) {   
    var sum = 0; // ������Ȩ��ͱ���   
    if (a_idCard[17].toLowerCase() == 'x') {   
        a_idCard[17] = 10;// �����λΪx����֤���滻Ϊ10�����������   
    }   
    for ( var i = 0; i < 17; i++) {   
        sum += Wi[i] * a_idCard[i];// ��Ȩ���   
    }   
    valCodePosition = sum % 11;// �õ���֤����λ��   
    if (a_idCard[17] == ValideCode[valCodePosition]) {   
        return true;   
    } else {   
        return false;   
    }   
}   
/**  
 * ͨ�����֤�ж�������Ů  
 * @param idCard 15/18λ���֤����   
 * @return 'female'-Ů��'male'-��  
 */  
function maleOrFemalByIdCard(idCard){   
    idCard = trim(idCard.replace(/ /g, ""));// �����֤���������������ַ����пո�   
    if(idCard.length==15){   
        if(idCard.substring(14,15)%2==0){   
            return 'female';   
        }else{   
            return 'male';   
        }   
    }else if(idCard.length ==18){   
        if(idCard.substring(14,17)%2==0){   
            return 'female';   
        }else{   
            return 'male';   
        }   
    }else{   
        return null;   
    }   
//  �ɶԴ����ַ�ֱ�ӵ�������������   
// if(idCard.length==15){   
// alert(idCard[13]);   
// if(idCard[13]%2==0){   
// return 'female';   
// }else{   
// return 'male';   
// }   
// }else if(idCard.length==18){   
// alert(idCard[16]);   
// if(idCard[16]%2==0){   
// return 'female';   
// }else{   
// return 'male';   
// }   
// }else{   
// return null;   
// }   
}   
 /**  
  * ��֤18λ�����֤�����е������Ƿ�����Ч����  
  * @param idCard 18λ�����֤�ַ���  
  * @return  
  */  
function isValidityBrithBy18IdCard(idCard18){   
    var year =  idCard18.substring(6,10);   
    var month = idCard18.substring(10,12);   
    var day = idCard18.substring(12,14);   
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
    // ������getFullYear()��ȡ��ݣ�����ǧ�������   
    if(temp_date.getFullYear()!=parseFloat(year)   
          ||temp_date.getMonth()!=parseFloat(month)-1   
          ||temp_date.getDate()!=parseFloat(day)){   
            return false;   
    }else{   
        return true;   
    }   
}   
  /**  
   * ��֤15λ�����֤�����е������Ƿ�����Ч����  
   * @param idCard15 15λ�����֤�ַ���  
   * @return  
   */  
  function isValidityBrithBy15IdCard(idCard15){   
      var year =  idCard15.substring(6,8);   
      var month = idCard15.substring(8,10);   
      var day = idCard15.substring(10,12);   
      var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
      // ���������֤�е����������迼��ǧ��������ʹ��getYear()����   
      if(temp_date.getYear()!=parseFloat(year)   
              ||temp_date.getMonth()!=parseFloat(month)-1   
              ||temp_date.getDate()!=parseFloat(day)){   
                return false;   
        }else{   
            return true;   
        }   
  }   
//ȥ���ַ���ͷβ�ո�   
function trim(str) {   
    return str.replace(/(^\s*)|(\s*$)/g, "");   
}

//�ж��Ƿ��������ַ�
function checkstrips(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~��@#������&*����&mdash;��|{}��������������'��������]");
    return pattern.test(str);
		    
}