self.onmessage = messageHandler;

function messageHandler(e) {
    var start = e.data.start;
    var end = e.data.end;
    start = parseInt(start);
    end = parseInt(end);
    var result = 0;
    if (start != null && end !=null){
        for (var i = start; i <= end; i++){
            result += i;
            
        }
        self.postMessage({'start': start, 'end':end, 'result': result});
    }   
   
    
}
