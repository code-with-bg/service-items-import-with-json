var num=0;
var select=document.querySelectorAll('.nav ul li')
var contactconatiner=document.querySelector('.grid-info');
var current=document.getElementsByClassName('active');

// /main function with json importing
 select.forEach(function(s,index){
            s.addEventListener('click',function(e){
                var value = e.target.innerHTML;
                current[0].className=current[0].className.replace('active','');
                this.className+='active';
                Main(value)
            })
    })
window.addEventListener('load',Main());
function Main(search){

var xml =new XMLHttpRequest();
xml.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
        var json=JSON.parse(this.responseText);

        var Sfilter =json.filter(function(item,index){
            var regex = new RegExp(`^${search}`,'i');
            return json[index].heading.match(regex);
        })

        Sfilter.forEach(function(item){            
            var HTML =` <div>
            <img src="${item.image}" width="100%" heght="100%">
            </div>
            <div class="detail-down">
            <h4>${item.heading}</h4>
            <ul class="list">         
            </ul>
            </div>`            
        document.querySelector('.grid-info').innerHTML =HTML;
        for(var a= 0; a<item.list.length;a++){
            var li = document.createElement('li');
            li.innerHTML = item.list[a];
            document.querySelector('.list').append(li);
        }
        })
        
    }

}
xml.open('GET','service.json',true);
xml.send();
}
