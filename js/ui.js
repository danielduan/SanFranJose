
//***** UI elements *****
SF.UI = {};

//***** button base *****
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

//***** land UI blocks *****
SF.UI.Land = function(land, x, y) {
  this.x = x;
  this.y = y;
  this.image = new createjs.Bitmap(land.url[land.type()]);
  this.image.x = x * 150;
  this.image.y = y * 150;
  this.upgrade = new createjs.Bitmap(SF.Files.getResult('upgrade'));
  this.upgrade.x = x * 150;
  this.upgrade.y = y * 150 + 100;
  //var label = new SF.UI.Button(land.name);
  
  this.label = new createjs.Text(land.name, "10px Arial", "#000");
  this.label.textBaseline = "top";
  this.label.textAlign = "center";
  this.label.x = x * 150 + 126/2;
  this.label.y = y * 150 + 100 + 8;
  
  this.background = new createjs.Shape();
  this.background.graphics.beginFill("white").drawRoundRect(28,100,75,20,1);
  
  this.remove = new createjs.Bitmap(SF.Files.getResult('upgrade'));
  this.remove.x = x * 150 + 100;
  this.remove.y = y * 150 + 100;
  this.addChild(this.background, this.image, this.upgrade, this.label, this.remove);
}

SF.UI.Land.prototype = new createjs.Container();