/** 
* Written by Gilad Barkan, October, 2017 
* Covered by the "Do whatever the heck you want with it" licence, 
* the full text of which is: Do whatever the heck you want with it. 
* [Attributed to http://stackoverflow.com/users/14860/paxdiablo]
*   
* var a = HashedDoublyLinkedList([['a',5],['b',3]], {onError: message => console.log('Logging error message: ' + message)})
* a.append
* a.prepend
* a.get(KEY)
* a.remove(KEY)
* a.size
**/ 

var HashedDoublyLinkedList = function(arr=[], opts={}){
	function Node(key, val){
		this.key = key;
		this.value = val;
		this.next = null;
		this.prev = null;
	}
  
	var obj = {
    	list: {},
    	head: null,
    	last: null,
    	size: 0,
    	
    	onError: opts.onError || function(errorMessage){
    		console.error(errorMessage);
    		return;
    	},
    	
    	append: function(key, val, overwrite=false){
    		if (obj.list[key] && !overwrite){
    			obj.onError('HashedDoublyLinkedList.append error: key already exists. Key: ' + key);
    		}
    		
    		obj.list[key] = new Node(key, val);
    		
    		// List is not empty
    		if (obj.last){
    			obj.last.next = obj.list[key];
    			obj.list[key].prev = obj.last;
    			
    		// List is empty
    		} else {
    			obj.head = obj.list[key];
    		}
    		
    		obj.last = obj.list[key];
    		obj.size++;
    		
    		return obj.last;
    	}, 
    	
    	prepend: function(key, val, overwrite=false){
    		if (obj.list[key] && !overwrite){
    			console.error('HashedDoublyLinkedList.prepend error: key already exists. Key: ' + key);
    			return;
    		}
    		
    		obj.list[key] = new Node(key, val);
    		
    		// List is not empty
    		if (obj.head){
    			obj.head.prev = obj.list[key];
    			obj.list[key].next = obj.head;
    			
    		// List is empty
    		} else {
    			obj.last = obj.list[key];
    		}
    		
    		obj.head = obj.list[key];
    		obj.size++;
    		
    		return obj.head;
    	},
    	
    	remove: function(key){
    		if (!obj.list[key]){
    			obj.onError('HashedDoublyLinkedList.remove error: key does not exist. Key: ' + key);
    			return;
    		}
    		
    		if (obj.list[key].next){
    			if (obj.list[key].prev)
    				obj.list[key].next.prev = obj.list[key].prev.key;
    			else
    				obj.list[key].next.prev = null;
    				
    		} else {
				if (obj.list[key].prev)
    				obj.last = obj.list[key].prev;
    			else
    				obj.last = null;
    		}
    			
    		if (obj.list[key].prev){
    			if (obj.list[key].next)
    				obj.list[key].prev.next = obj.list[key].next.key;
    			else
    				obj.list[key].prev.next = null;
    				
    		} else {
    			if (obj.list[key].next)
    				obj.head = obj.list[key].next;
    			else
    				obj.head = null;
    		}
    			
    		let toReturn = obj.list[key];
    		delete obj.list[key];
    		obj.size--;
    		return toReturn;
    	},
    	
    	get: function(key){
    		return obj.list[key];
    	}
	}
	
	for (let i=0; i<arr.length; i++){
		obj.append(arr[i][0], arr[i][1]);
	}
	
	return obj;
}
