
//***** UI elements *****
SF.UI = {};

//***** button base *****
/*
SF.UI.Button = function(label, color, clickevent) {
  this.label = label;
  if (!color) { color = "#FFF"; }

  var text = new createjs.Text(label, "10px Arial", "#000");
  text.textBaseline = "top";
  text.textAlign = "center";

  this.background = new createjs.Shape();
  this.background.graphics.beginFill(color).drawRoundRect(0,0,75,25,10);

  text.x = 75/2;
  text.y = 8;

  this.addChild(this.background,text);
  if (clickevent)
  {
    this.on("click", clickevent);
  }

  this.mouseChildren = false;
}

SF.UI.Button.prototype = new createjs.Container();

//***** image button *****
SF.UI.ImageButton = function(url, color, clickevent) {
  this.url = url;
  if (!color) {
    color = "#FFF";
  }

  var img = new createjs.Bitmap(url);

  this.background = new createjs.Shape();
  this.background.graphics.beginFill(color).drawRoundRect(0,0,250,250,0);

  this.addChild(img);
  if (clickevent)
  {
    this.on("click", clickevent);
  }

  this.mouseChildren = false;
}

SF.UI.ImageButton.prototype = new createjs.Container();

*/

//***** land UI blocks *****
SF.UI.Land = function(land, y, x) {
  var startx = 12;
  var starty = 12;
  this.land = land;
  this.x = x;
  this.y = y;
  
  //background image
  this.background = new createjs.Shape();
  this.background.graphics.beginFill("white").drawRoundRect(x * 150 + startx, y * 150 + starty, 125, 125, 5);
  
  //icon
  this.image = new createjs.Bitmap(land.url[land.type()]);
  this.image.x = x * 150 + startx;
  this.image.y = y * 150 + starty;
  
  //upgrade button
  this.upgrade = new createjs.Bitmap(SF.Files.getResult('upgrade'));
  this.upgrade.x = x * 150 + startx;
  this.upgrade.y = y * 150 + 100 + starty;
  this.upgradebg = new createjs.Shape();
  this.upgradebg.graphics.beginFill("#27ae60").drawRoundRect(x * 150 + startx, y * 150 + 100 + starty, 25, 25, 5);
  
  //text label
  this.label = new createjs.Text(land.name, "10px Arial", "#000");
  this.label.textBaseline = "top";
  this.label.textAlign = "center";
  this.label.x = x * 150 + 126/2 + startx;
  this.label.y = y * 150 + 100 + 8 + starty;
  
  //remove button
  this.remove = new createjs.Bitmap(SF.Files.getResult('upgrade'));
  this.remove.x = x * 150 + 100 + startx;
  this.remove.y = y * 150 + 100 + starty;
  this.removebg = new createjs.Shape();
  this.removebg.graphics.beginFill("#c0392b").drawRoundRect(x * 150 + startx + 100, y * 150 + starty + 100, 25, 25, 5);
  
  
  this.addChild(this.background, this.image, this.upgradebg, this.upgrade, this.label, this.remove);
}

SF.UI.Land.prototype = new createjs.Container();