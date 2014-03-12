//***** namespace *****
var SF = {};

//set starting configuration
SF.Config = {
  gridrow: 4,
  gridcol: 5,
  startingcash: 10000,
  bankrupcy: -10000
};

//***** current running game *****
SF.Current = {
  population: 0,
  housing: 0,
  cash: 0,
  charge: function(amount) {
    this.cash -= amount;
    if (this.cash < this.Config.bankrupcy) {
      //game over
    }
  }
}

//***** stores the grid of the game *****
SF.Grid = {
  init: function() {
    for (var row = 0; row < SF.Config.gridrow; row++) {
      var row_arr = [];
      for (var col = 0; col < SF.Config.gridcol; col++) {
        var land = {};
        switch (SF.Utils.Random(4)) {
          case 0: 
            land = new SF.Abstract.Land();
            break;
          case 1:
            land = new SF.Abstract.Office();
            break;
          case 2:
            land = new SF.Abstract.Residence();
            break;
          case 3:
            land = new SF.Abstract.Restaurant();
            break;
        }
        
        row_arr.push(land); 
      }
      this.Instances.push(row_arr); //change
    }
    
    var html = "";
    
    for (var row = 0; row < SF.Config.gridrow; row++) {
      for (var col = 0; col < SF.Config.gridcol; col++) {
        var location = "grid" + col + "_" + row;
        var grid = SF.Grid.Instances[row][col];
        html += '<div class="landgrid"><div class="landitem"><img id="img' + location +  '" onclick="display(' + row + ',' + col + ')" src="' + grid.url[0] + '"></div><div class="landitem"><img id="upgrade' + location + '" class="upgrade" onclick="upgrade(' + row + ',' + col + ')" src="img/upgrade.png"></div><div class="landitem label">' + grid.name + '</div><div class="landitem"><img id="remove' + location + '" class="remove" onclick="rm(' + row + ',' + col + ')" src="img/upgrade.png"></div></div>';
        
      }
    }
    
    $('#game').html(html);
  },
  Instances: [],
  Views: [],
  get: function(x, y) {
    return this.Instances[y][x];
  },
  set: function(x, y, obj) {
    SF.Grid.Instances[y][x] = obj;
  },
  upgrade: function(x, y) {
    SF.Grid.get(x, y).upgrade();
  }
}

//***** moves 1 instance *****
SF.Tick = function() {
  SF.DebugOutput();
};

//***** debugging only *****
SF.DebugOutput = function() {
  console.log(SF.Grid.Instances);
};

//***** setup stage *****
SF.Stage = new createjs.Stage('gameCanvas');

//***** initialize game variables *****
SF.Init = function() {
  SF.Grid.init();
};

//***** renders stage *****
SF.Render = {
  Update: function() {
    //SF.Stage.update();
    
    
  }
};

//***** misc generators *****
SF.Utils = {
  Random: function(max) {
    return Math.floor(Math.random() * max );
  },
  Company: function() {
    var partA = new Array( "Babble", "Buzz", "Blog", "Blue", "Brain", "Bright", "Browse", "Bubble", "Chat", "Chatter", "Dab", "Dazzle", "Dev", "Digi", "Edge", "Feed", "Five", "Flash", "Flip", "Gab", "Giga",  "Inno", "Jabber", "Jax", "Jet", "Jump", "Link", "Live", "My", "N", "Photo", "Pod", "Real", "Riff", "Shuffle", "Snap", "Skip", "Tag", "Tek", "Thought", "Top", "Topic", "Twitter", "Word", "You", "Zoom");

    var partB = new Array( "bean", "beat", "bird", "blab", "box", "bridge", "bug", "buzz", "cast", "cat", "chat", "club", "cube", "dog", "drive", "feed", "fire", "fish", "fly", "ify", "jam", "links", "list", "lounge", "mix", "nation", "opia", "pad", "path", "pedia", "point", "pulse", "set", "space", "span", "share", "shots", "sphere", "spot", "storm",  "ster", "tag", "tags", "tube", "tune", "type", "verse", "vine", "ware", "wire", "works", "XS", "Z", "zone", "zoom" );

    // these are not complete words:

    var partC = new Array( "Ai", "Aba", "Agi", "Ava", "Cami", "Centi", "Cogi", "Demi", "Diva", "Dyna", "Ea", "Ei", "Fa", "Ge", "Ja", "I", "Ka", "Kay", "Ki", "Kwi", "La", "Lee", "Mee", "Mi", "Mu", "My", "Oo", "O", "Oyo", "Pixo", "Pla", "Qua", "Qui", "Roo", "Rhy", "Ska", "Sky", "Ski", "Ta", "Tri", "Twi", "Tru", "Vi", "Voo", "Wiki", "Ya", "Yaki", "Yo", "Za", "Zoo" );

    var partD = new Array( "ba", "ble", "boo", "box", "cero", "deo", "del", "do", "doo", "gen", "jo", "lane", "lia", "lith", "loo", "lium", "mba", "mbee", "mbo", "mbu", "mia", "mm", "nder", "ndo", "ndu", "noodle", "nix", "nte", "nti", "nu", "nyx", "pe", "re", "ta", "tri", "tz", "va", "vee", "veo", "vu", "xo", "yo", "zz", "zzy", "zio", "zu");

    var lastName = "";

    var rand = this.Random(2);
    var A = "";
    var B = "";

    if (rand === 0) {
        A = partA[ this.Random(partA.length) ];
        B = partB[ this.Random(partB.length) ];
    } else {
        A = partC[ this.Random(partC.length) ];
        B = partD[ this.Random(partD.length) ];    
    }
    var name = A + B;
    
    rand = this.Random(6);
    
    if (rand == 3) {
      name += "ly";
    }
  
    rand = this.Random(6);
    
    if (rand == 3) {
      name += ".io";
    }
    
    return name;
  }
}

SF.Files = {};

//***** starts game when browser ready *****
$( document ).ready(function() {
   //precache files
/*   SF.Files = new createjs.LoadQueue();
   SF.Files.on("complete", handleComplete, this);
   SF.Files.loadManifest([
       {id: "upgrade", src:"img/upgrade.png"},
       {id: "land", src:"img/land.png"}
   ]);
   
   function handleComplete() {
       SF.Init();
       SF.Render.Update();
   }*/
  
  SF.Init()
  
  
});