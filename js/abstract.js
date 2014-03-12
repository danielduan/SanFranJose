//***** holds all game object classes *****
SF.Abstract = {};

//***** land base object *****
SF.Abstract.Land = function() {
  this.techworkers = 0;
  this.professionalworkers = 0;
  this.averageworkers = 1;
  this.residents = 0;
  this.revenue = 0;
  this.cost = 10;
  this.name = 'Land';
  this.increment = 0;
  this.url = ['img/land.png'];
};

SF.Abstract.Land.prototype = {
  constructor: SF.Abstract.Land,
  compute: function() {
    SF.Current.charge(this.cost);
  },
  upgrade: function() {
    this.techworkers *= 2;
    this.professionalworkers *= 2;
    this.averageworkers *= 2;
    this.residents *= 2;
    this.revenue *= 2;
    this.cost *= 2;
    this.tier++;
  },
  build: function(type) {
    if (this.tier !== 0) {
      console.log("can't build bro");
      return;
    }
    switch (type) {
      case "office":
        //this = new SF.Abstract.Office();
        break;
      case "residence":
        //this = new SF.Abstract.Residence();
        break;
      case "food":
        //this = new SF.Abstract.Restaurant();
        break;
      default:
        console.log("wtf you doing");
        break;
    }
  },
  stage: function() {
    //add to the stage
  },
  type: function() {
    return 0;
  }
};

//***** office inherits from land *****
SF.Abstract.Office = function() {
  this.techworkers = 2;
  this.professionalworkers = 1;
  this.averageworkers = 1;
  this.residents = 0;
  this.revenue = 15;
  this.cost = 10;
  this.name = SF.Utils.Company();
  this.tier = 1;
  this.url = ['img/land.png','img/land.png','img/land.png'];
  //startup name generator
};

SF.Abstract.Office.prototype = Object.create(SF.Abstract.Land.prototype);

SF.Abstract.Office.prototype.type = function() {
  if (this.tier < 5) {
    return 0;
  } else if (this.tier < 10) {
    return 1;
  } else {
    return 2;
  }
}

//***** restaurant inherits from land *****
SF.Abstract.Restaurant = function() {
  this.techworkers = 0;
  this.professionalworkers = 1;
  this.averageworkers = 2;
  this.residents = 0;
  this.revenue = 10;
  this.cost = 10;
  this.name = 'Sombrero Taco';
  this.tier = 1;
  this.url = ['img/land.png','img/land.png','img/land.png'];
  //startup name generator
};

SF.Abstract.Restaurant.prototype = Object.create(SF.Abstract.Land.prototype);

SF.Abstract.Restaurant.prototype.type = function() {
  if (this.tier < 5) {
    return 0;
  } else if (this.tier < 10) {
    return 1;
  } else {
    return 2;
  }
}

//***** residence inherits from land *****
SF.Abstract.Residence = function() {
  this.techworkers = 0;
  this.professionalworkers = 1;
  this.averageworkers = 2;
  this.residents = 0;
  this.revenue = 10;
  this.cost = 10;
  this.name = 'Pacifico House';
  this.tier = 1;
  this.url = ['img/land.png','img/land.png','img/land.png'];
  //startup name generator
};

SF.Abstract.Residence.prototype = Object.create(SF.Abstract.Land.prototype);

SF.Abstract.Residence.prototype.type = function() {
  if (this.tier < 3) {
    return 0;
  } else if (this.tier < 6) {
    return 1;
  } else {
    return 2;
  }
}