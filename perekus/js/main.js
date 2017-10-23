var category = JSON.parse(categories);
var good = JSON.parse(goods);

var categoryList = document.getElementById("categories-list");
var goodDiv = document.getElementById("goods");
var titleGood = document.getElementById("titleGood");
var busketMap = [];

//goods count-goods
countGoods = document.getElementById("count-goods");
countGoods.innerHTML = "Количество товаров: <span>" + good.length + "</span>";

//_______________________________________________categoryList
for(var i = category.length - 1; i >= 0; i--){

  var li = document.createElement('LI');
  var img = document.createElement('IMG');
  img.src = "img/" + category[i].img;
  li.innerHTML = "<span>" + category[i].name + "</span>";
  li.setAttribute("onclick", "goodCreate("+ category[i].catId +", this)");
  categoryList.appendChild(li);
  li.appendChild(img);

}

//_______________________________________________gooods end start
var mapGoods = function () {
  for(var i = good.length - 1; i >= 0; i--){

    var div = document.createElement('DIV');
    var price = document.createElement('DIV');
    var img = document.createElement('IMG');
    var h3 = document.createElement('H3');

    div.className = "good";
    price.className = "price";
    img.src = "img" + good[i].img;
    h3.innerHTML = good[i].name;
    price.innerHTML = "Цена: <span>" + good[i].price + "</span>р.";
    div.setAttribute("onclick", "addToBusket("+ good[i].goodId +", this)");
    div.setAttribute("data-id", good[i].goodId);

    goodDiv.appendChild(div);
    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(price);

  }
}

var catGoods = function(num){
  var count = 0;
  for(var i = 0; i < good.length; i++){
    if(good[i].category == num){
      count ++;
      var div = document.createElement('DIV');
      var price = document.createElement('DIV');
      var img = document.createElement('IMG');
      var h3 = document.createElement('H3');

      div.className = "good";
      price.className = "price";
      img.src = "img" + good[i].img;
      h3.innerHTML = good[i].name;
      price.innerHTML = "Цена: <span>" + good[i].price + "</span>р.";
      div.setAttribute("onclick", "addToBusket("+ good[i].goodId +", this)");

      goodDiv.appendChild(div);
      div.appendChild(img);
      div.appendChild(h3);
      div.appendChild(price);
      countGoods.innerHTML = "Количество товаров: <span>" + count + "</span>";
      titleGood.innerHTML = titleGoods(good[i].category);
    }
  }
}

var titleGoods = function (e) {
  for(var i = 0; i < category.length; i++){
    if(category[i].catId == e){
      return category[i].name;
    }
  }
}

var removeActive = function () {
  var active = document.getElementsByTagName('li');
  for(var i=0;i<active.length;i++){
    if(active[i].className == "active"){
      active[i].className = "";
    }
  }
}

var goodCreate = function(catID, ths){
  var elem = ths;
  var num = catID;
  goodDiv.innerHTML = "";
  removeActive();
  if(catID){
    elem.className = "active";
    return catGoods(num);
  }else {
    return mapGoods();
  }
};
goodCreate();
//_______________________________________________gooods end

//_______________________________________________total_sum
var totalSumBut = document.getElementById("total-sum");
var totalSumButClose = document.getElementById("close");

totalSumBut.onclick = function(){
  document.body.className = "total_sum";
  var table = document.getElementById('table');//.rows[1].cells[1]
  var tr = document.createElement("TR");
  var ths = document.createElement("TR");
  var price = document.getElementById("countSum");
  var time = document.getElementById("time");
  var tableMap = "";
  var date = new Date();

  //timeline
  var day = (+date.getDay()+1);
  var month = (+date.getMonth() + 1);
  if(day < 10) day = "0" + day;
  if(month < 10) day = "0" + month;
  time.innerHTML = date.getHours() + ":" + date.getMinutes() + " " + day +"."+ month +"."+ date.getFullYear();

  for (var i = 0; i < busketMap.length; i++) {
    if(busketMap[i].count > 1){
      tableMap = tableMap + "<tr><td>" + busketMap[i].name + "</td><td></td><td> " + busketMap[i].count + "*" + busketMap[i].price + "р. = " + (+busketMap[i].count)*(+busketMap[i].price) + " р." +" </td></tr>";
    }else {
      tableMap = tableMap + "<tr><td>" + busketMap[i].name + "</td><td></td><td> " + busketMap[i].price + " р." +" </td></tr>";
    }
  }
  tr.innerHTML = "<td></td><td><b>Итого</b></td><td><b>" + price.innerHTML + " р.</b></td>";
  ths.innerHTML = "<td colspan='3' class='center'>Спасибо за покупку!</td>";
  table.innerHTML = tableMap;
  if(!busketMap.length == 0){
    table.appendChild(tr);
    table.appendChild(ths);
  }else {
    ths.innerHTML = "<td colspan='3' class='center'>Ваша корзина пуста!</td>";
    table.appendChild(ths);
  }
}
totalSumButClose.onclick = function(){
  document.body.classList.remove("total_sum");
}
//_______________________________________________total_sum

//_______________________________________________busket start

var addToBusket = function(goodID, elem) {
  var ths = elem;
  var num = goodID;
  for(var i=0;i<good.length;i++){
    if(good[i].goodId == num){

      if(good[i].count < 1){
        good[i].count++;
        busketMap.push(good[i]);
        busketList(num,good[i].count);
        return busketCount(good[i].price);
      }else {
        var count = addBusketCount(num);
        busketCount(good[i].price);
        return busketList(num,count);
      }

    }
  }
}


var addBusketCount = function (id) {
  for(var i=0;i<busketMap.length;i++){
    if(busketMap[i].goodId == id){
      busketMap[i].count++;
      return busketMap[i].count;
    }
  }
  return clearGoodCount(id);
}

var clearGoodCount = function(id) {
  for(var i=0;i<good.length;i++){
    if(good[i].goodId == id){
      good[i].count = 0;
      return good[i].count;
    }
  }
}

var busketCount = function (money) {
  var span = document.getElementById("countSize");
  var circleCount = document.getElementById("circleCount");
  var totalCount = 0;
  //price
  var sum = 0;
  var price = document.getElementById("countSum");

  for(var i = 0; i < busketMap.length; i++){
    totalCount += (+busketMap[i].count);
    sum += (+busketMap[i].count) * (+busketMap[i].price);
  }
  span.innerHTML = totalCount;
  circleCount.innerHTML = totalCount;

  price.innerHTML = sum;
}

var busketList = function(num,count){
  var ul = document.getElementById("busket-list");
  var counts = count;

  for(var i = 0; i < busketMap.length; i++){
    if ((busketMap[i].goodId == num) && !(busketMap[i].count>1)) {
        var li = document.createElement('LI');
        var price = document.createElement('DIV');
        var count = document.createElement('DIV');
        var h3 = document.createElement('H3');

        li.className = "good";
        price.className = "price";
        count.innerHTML = "Кол-во: " + "<b>" + counts + "</b>";
        h3.innerHTML = busketMap[i].name;
        price.innerHTML = "Цена: <span>" + busketMap[i].price + "</span>р.";
        li.setAttribute("onclick", "removeToBusket("+ busketMap[i].goodId +", this)");
        li.setAttribute("data-id", busketMap[i].goodId);

        ul.appendChild(li);
        li.appendChild(h3);
        li.appendChild(price);
        li.appendChild(count);

    }else{
      changeGoodCount(num,count);
    }

  }
}

var changeGoodCount = function (num,count) {
  var ul = document.getElementById("busket-list");
  for(var j=0;j<ul.childNodes.length;j++){
    if (ul.childNodes[j].getAttribute("data-id") == num) {
      var item = ul.childNodes[j];
      item.childNodes[2].innerHTML = "Кол-во: " + "<b>" + (+count) + "</b>";
    }
  }
}

var removeToBusket = function(goodID, elem) {
  var ths = elem;
  var num = goodID;
  var ul = document.getElementById("busket-list");
  for(var i=0;i<busketMap.length;i++){
    if(busketMap[i].goodId == num){

      for(var j=0;j<ul.childNodes.length;j++){
        if (ul.childNodes[j].getAttribute("data-id") == busketMap[i].goodId) {
          var item = ul.childNodes[j];
          ul.removeChild(item);
          clearGoodCount(busketMap[i].goodId);
        }
      }

      var money = busketMap[i].price;
      busketMap.splice(i,1);
      return busketCount(-money);

    }
  }
}

//_______________________________________________busket end

//_______________________________________________dragdrop start

var DragManager = new function() {

  /**
   * составной объект для хранения информации о переносе:
   * {
   *   elem - элемент, на котором была зажата мышь
   *   avatar - аватар
   *   downX/downY - координаты, на которых был mousedown
   *   shiftX/shiftY - относительный сдвиг курсора от угла элемента
   * }
   */
  var dragObject = {};

  var self = this;

  function onMouseDown(e) {

    if (e.which != 1) return;

    var elem = e.target.closest('.good');
    if (!elem) return;

    dragObject.elem = elem;
    dragObject.goodID = elem.getAttribute("data-id");

    // запомним, что элемент нажат на текущих координатах pageX/pageY
    dragObject.downX = e.pageX;
    dragObject.downY = e.pageY;

    return false;
  }

  function onMouseMove(e) {
    if (!dragObject.elem) return; // элемент не зажат

    if (!dragObject.avatar) { // если перенос не начат...
      var moveX = e.pageX - dragObject.downX;
      var moveY = e.pageY - dragObject.downY;

      // если мышь передвинулась в нажатом состоянии недостаточно далеко
      if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
        return;
      }

      // начинаем перенос
      dragObject.avatar = createAvatar(e); // создать аватар
      if (!dragObject.avatar) { // отмена переноса, нельзя "захватить" за эту часть элемента
        dragObject = {};
        return;
      }

      // аватар создан успешно
      // создать вспомогательные свойства shiftX/shiftY
      var coords = getCoords(dragObject.avatar);
      dragObject.shiftX = dragObject.downX - coords.left;
      dragObject.shiftY = dragObject.downY - coords.top;

      startDrag(e); // отобразить начало переноса
    }

    // отобразить перенос объекта при каждом движении мыши
    dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
    dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

    return false;
  }

  function onMouseUp(e) {
    if (dragObject.avatar) { // если перенос идет
      finishDrag(e);
    }

    // перенос либо не начинался, либо завершился
    // в любом случае очистим "состояние переноса" dragObject
    dragObject = {};
  }

  function finishDrag(e) {
    var dropElem = findDroppable(e);

    if (!dropElem) {
      self.onDragCancel(dragObject);
    } else {
      self.onDragEnd(dragObject, dropElem, dragObject.goodID, self);
    }
  }

  function createAvatar(e) {

    // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
    var avatar = dragObject.elem;
    var old = {
      parent: avatar.parentNode,
      nextSibling: avatar.nextSibling,
      position: avatar.position || '',
      left: avatar.left || '',
      top: avatar.top || '',
      zIndex: avatar.zIndex || ''
    };

    // функция для отмены переноса
    avatar.rollback = function() {
      old.parent.insertBefore(avatar, old.nextSibling);
      avatar.style.position = old.position;
      avatar.style.left = old.left;
      avatar.style.top = old.top;
      avatar.style.zIndex = old.zIndex
    };

    return avatar;
  }

  function startDrag(e) {
    var avatar = dragObject.avatar;

    // инициировать начало переноса
    document.body.appendChild(avatar);
    avatar.style.zIndex = 9999;
    avatar.style.position = 'absolute';
  }

  function findDroppable(event) {
    // спрячем переносимый элемент
    dragObject.avatar.hidden = true;

    // получить самый вложенный элемент под курсором мыши
    var elem = document.elementFromPoint(event.clientX, event.clientY);

    // показать переносимый элемент обратно
    dragObject.avatar.hidden = false;

    if (elem == null) {
      // такое возможно, если курсор мыши "вылетел" за границу окна
      return null;
    }

    return elem.closest('.basket');
  }

  document.onmousemove = onMouseMove;
  document.onmouseup = onMouseUp;
  document.onmousedown = onMouseDown;

  this.onDragEnd = function(dragObject, dropElem) {};
  this.onDragCancel = function(dragObject) {};

};


function getCoords(elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}
DragManager.onDragCancel = function(dragObject) {
  dragObject.avatar.rollback();
};

DragManager.onDragEnd = function(dragObject, dropElem, id, ths) {
  dragObject.avatar.rollback();
  return addToBusket(id, ths);
};
//_______________________________________________dragdrop end
