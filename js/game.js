//***** namespace *****
var SF = {};

//set starting configuration
SF.Config = {
  gridrow: 4,
  gridcol: 5,
  startingcash: 1000,
  bankrupcy: -1000
};

//***** current running game *****
SF.Current = {
  population: 0,
  housing: 0,
  cash: 1500,
  charge: function(amount) {
    this.cash -= amount;
    if (this.cash < SF.Config.bankrupcy) {
      alert("The city is bankrupt. Sorry");
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
        switch (SF.Utils.Random(7)) {
          case 0: 
            land = new SF.Abstract.Land();
            break;
          case 1:
          case 2:
            land = new SF.Abstract.Office();
            for (var i = 0; i < SF.Utils.Random(2); i++) {
              land.upgrade();
            }
            break;
          case 3:
          case 4:
          case 5:
            land = new SF.Abstract.Residence();
            for (var i = 0; i < SF.Utils.Random(1); i++) {
              land.upgrade();
            }
            break;
          case 6:
            land = new SF.Abstract.Restaurant();
            for (var i = 0; i < SF.Utils.Random(2); i++) {
              land.upgrade();
            }
            break;
        }
        
        row_arr.push(land); 
      }
      this.Instances.push(row_arr); //change
    }
    
    var html = "";
    
    for (var row = 0; row < SF.Config.gridrow; row++) {
      for (var col = 0; col < SF.Config.gridcol; col++) {
        var location = "grid" + row + "_" + col;
        var grid = SF.Grid.Instances[row][col];
        html += '<div id="g' + location + '" class="landgrid"><div class="landitem"><img id="img' + location +  '" class="img" onclick="display(' + row + ',' + col + ')" src="' + grid.url[grid.type()] + '"></div><div class="landitem"><img id="upgrade' + location + '" class="upgrade" onclick="upgrade(' + row + ',' + col + ')" src="img/upgrade.png"></div><div class="landitem label">' + grid.name + '</div><div class="landitem"><img id="remove' + location + '" class="remove" onclick="rm(' + row + ',' + col + ')" src="img/remove.png"></div></div>';
        
      }
    }
    
//    for (var row = 0; row < SF.Config.gridrow; row++) {
//      for (var col = 0; col < SF.Config.gridcol; col++) {
//        var grid = SF.Grid.Instances[row][col];
//        if (grid.revenue == 0) {
//          console.log('Here');
//          disable(row, col);
//        }
//      }
//    }
    
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
  SF.Current.charge(calculate() * -1);
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
  calculate();
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

SF.Utils.Restaurant = function() {
  
var max1 = 20;
var max2 = 1033;
var max3 = 62;

index1 = Math.round(Math.random() * max1);      
index2 = Math.round(Math.random() * max2);
index3 = Math.round(Math.random() * max3);         

array1 = new Array("","","","","","","","","","","","","","","","","","Café ","Café ","Café ","Club ");

array2 = new Array("10,000 BC","A Day Latte","Absalom","Acacia Saint","Acapulco Gold","Achilles","Acorn","Affecté","Aftermath","Aglaya","Ahui","Al Fresco","Alcohol & Archery","Alephant","Alice","Alluvia","Amazeus","American Whey","Americana","Amigo","Amygdala","Anacho","Anavenetro","Angel Walk","Anocha","Anthill","Antimatter","Appointment","Aquacine","Aquafire","Arctica","Armadillo","Aroma Borealis","Arotika","Artichoke Alley","Artvark","AstroCoffee","Atomic Coffee","Atomic Donut","Attila","Augrés","Aura","Avalunch","Avatar","Baba Rum","Babel","Bagel Bandit","Bagel Brain","Bagel Palace","Bait","Balkan Beef","Ball Lightning","Bambi Planet","Bamboolong","Banana Cabana","Bandit","Bandits","Bandwidth","Bandwidth and Bagels","Banjo","Banjo Pancake","Banyan","Bapoon","Bar Flight","Bar None","Bard","Bard's Bench","Barn Baby","BBQ Force","Bean There","Beaudelaire","Beckett's","Bee Salt","Beef Easy","Beef Storm","Beefbelly","Beefeater","Beefworks","Beer Bunker","Beer Crazy","Before","Before Coffee","Bela Bite","Bella's","Belle' Pepper","Bellyflop","Beluga","Beluga Joe's","Benephisto","Bengal Bagel","Bennie's Fishery","Beyond","Bid and Ask","Big Bang","Big Bottom","Big Daddy's","Big Juicy","BigWay","Bindewald's","Bing Bang's","Binge","Bingo Bango","Birmingham","Bitter Plaid","Blackbeard","Blackout","Blanche","Bleeko","Blink Tank","Bliss","Bloat","Bloom","Bloomers","Bloomsbury","Blue Ball","Blue Bison","Blue Horizon","Blue Pudding","Blueberry","Bluestone","Bluez","Bomb Squad","Boo","Boogie","Bourbon","Bovine","Boy","Bravo","Breech","Brew Ha Ha ","Brewed Attitude","Brewsome Tuscon","Bring it!","Brisket","Broadway","Brood","Brunchilli","Bubbles","Buddha","Buddha Bite","Buddha Bowl","Buddha Bread","Buffalo","Burger Glory","Butter","Buttercut","Butternut","Buzz","Caboodle","Cabooze","Cacti","Caffeine Conscious","Caffeine Wall","Caffeinspiration","Cajun Sation","Caliblini ","Cambria","Campers","Camus","Candyapple","Canteen","Canton Silk","Capricorn","Carbo Lode","Carbon","Carnal","Carnivore","Carnivortex","Carrot","Caruso","Carver's Cut","Cash","Cash Cow","Castaway","Catgerwaul","Cattle Prod","Celedon","Celery","Central Pork","Centrifuge","Chain Gang","Chalk and Stars","Chance","Chap and Spur","Chateau Below","Chaucer","Chaucer's Choice","Chedder","Cheeky","Chen Soso","Chernobyl","Chevre","Chew","Chez Moi","Chin Chin","Chocolate Bondage","Chomsky","Choo Choo","Chorus","Chow Chow","Chow Mondo","Chowder","Chowdown","Chowtown","Chowville","Chrysalida","Chung King Chow","Chunk City","Chunkers","Chutney","Ciao","Ciao Buddha","Cinema","Cinnebar","Circolo","Circula","Cisco's","City of Fish","Civil Libation","Clam Chop","Claret ","Clarko","Classico","Clone","Clovis and Charley","Clown School","Clutch","Cocola","Coffee Beacon","Coffee Cat","Coffee Farm","Coffee King","Coffee Korner","Coffee Patch","Coffee Time","Colony","Coma Roma","Compadre","Conduit","Coney Island Baby","Confidante","Conscience","Constant","Conundrum","Corkers","Corks","Cornpone Castle","Corsica","Cosmo","Cosmopolis","Cosmopolitan","Crawdaddy's","Creme","Cricket","Crustacia","Crux","Cthulhu","Cubi","Cup and Chaucer","Curmudgeon","Cyclonica","Cyrano","Dagnammit","Dandelar","Dandelion","Darvane","De Jour","De Vivre","Debutante","Deep","Deep Dish","Deep Grill","Deja Brew","Deja Vu","Delicatesso","Delicto","Derail","Dervish","Descartes","Desserto","Diablo","Dijon","Dim Summit","Dimple's","Dingo","Dionysos","Dirty Laundry","Dizé","Django","Doctor Coffee","Dogtown","Dolly Random","Domina","Donut Babe","Doodlebug","Doodles","Dostoevsky","Dote","Double Felix","Double Jump","Dough Baby","Downspout","Dream","Drench","Duck Soup","Dude Ranch","Dulcinea","Dumpty's","Dune Drops","Dutch Oven","Earth Picnic","Earth Salad","Earthpure","Easy Bake","Easy Beef","Easy Street ","Echo","Einstein's","El Capitan","Electrika","Elemantra","Elephant Walk","Eleven","Elita","Elmo","Empirica","Enchanted Garden","Encino Jones","Enigma","Enjola","Ennui","Ensanada","Epicuria","Epicurious George","Equity","Eros","Escargot","Et tu Bruté","Eterna","Eternia","Eternity","Exhibit","Exo","Explode","Expo","Fabricante","Facade","Factory","Far Away","Far Horizon","Fastball","Fat Boy","Fat Joe's","Fatbelly","Feast Beast","Feast of Eden","FeedBag","Felice","Feral","Ferment","Fever","Fez","Fiddler's Fig","Figala","Filippo's","Fin","Fink","Firebelly","Firecracker","Fish Eye","Fish Stories","Fish, Fat and the Otter","Fishland","Five Continents","Five O'clock Shadow","Flagrante","Flambeau's","Flambo's","Flameboyant","Flamethrower","Flange","Flickers","Flip Out","Flipper's","Floq","Flossie","Flotasm","Flotilla","Flotsam and Jetsam","Flow ","Fly","Flybar","Flycatcher","Flying Chaucer","Flying Horse","Flying Noodle","Flying Potato","Flying Tortoise","Flypaper","Foam","Foggy Bottom","Folsom Bobs","Food Haus","Food Prompt","Foodscape","Foodstormers","Fork","Fork and Dagger","Forkista","Forna","Fort Angus","Fracas","Freakin'","Freesia","Freeze Factor","Frelika","Fresco","Fringe","Froggy Bottom","Frolic","Frolique","Fusion","Futura","Future Food","Fuzzy Logic","Gainsborough","Galaxy","Galleon","Gastrodome","Gator Taters","Geek Chicken","Gelatine","Gene Pool","Genome","Geos","Giggle's","Giotto","Glassando","Glassinni","Global Gobble","Globula","Gloss","Gnu World","Go Easy","Go Lucky","Goat and Guru","Godka","Godzilla","Gogol","Goin' South","Goldielox","Goldilocks","Good Dog, Bad Dog","Gotham","Gourmet Bay","Gourmondo","Grace","Gracie","Grand Mal","Graystone","Greaseland","Green Leafies","Green-T","Greenaway","Gretel","Grizzly","Grounds Zero","Grunion","Guilt","Guns & Booze","Guru","Hackers","Half Life","Hallowed Grounds","Hambone","Happenstance","Harbin","Hash","Heartland","Heaven Here","Hegel's","Hell Yea","Hell's","Hercules","Hey Buddha","High","Highway Ribbery","Hindenburger","Historia","Hollandaise","Homeland","Homeroom","Homestyle","Hometown","Honeybee","Hoopoo","Horse & Jockey","Hot Box","Hot Dogma","Hotshots","HotSpot","Hungry Head","Hunky Dora's","Hunky Dory","Hurdle","Huskers","Icarus","Ice Can","Idetica","Ignia","Illustrioso","Imperial Fire","In Heat","In the Drink","Indeterminacy","Indian Summer","Information Age","Intermezzo","Iron Bone","Ivridse","Jack's Place","Jackie Diamonds","Jalapeños","Janga Java","Javaddiction","Javanut","Jaws","Jazzmatazz","Jelly Roll","Jellybird","Jellybone","Jellyfish","Jen & Barry's","Jerky Jim's","Jersey","Jerseyville","Jetsam","Jetset","Jetson's","Jetstream","Jettison","Jezebel","Judgment Day","Juggernaut","Juggler's Jig","Juice Caboose","Juice Monster","Juicebar","Juju","Jujuba","Juke's Joint","Juliet's Balcony","Julio","Jump Jack","Jumpstack","Jumpstart","Jupiter Trolley","Jurassic Pork","Kaffe","Kaku","Karma","Kepler","Kettletop","Kiki","Kilroy","Kimono","Kinetica","King Chard","Kinkajou","Kismet","Kiwi","Krill","Kundalini","La Bonne Terre","La Concuna","La Di Da","Lago","Lardé","Laundromat","Lavadome","Lazy Faire","Le Bistro de Vivre","Le Bon Bon","Le Gall","Le Metro","Le Petit Chef","Le Vin","Leaf & Stalk","Leather & Chrome","Lectra","Left Bank","Left Blank","Letterback","Libertyville","Libida","Life Source","Lilly Marlene","Lilly's Pad","LillyJet","Lillypot","Limozen","Linger","Liquid Ambassador","Liquid Fire","Liquid Kitty","Liquid Life","Little Dostoevsky","Lizzie Borden's","Loaf Around","Loca Mocha","Loiter","Lolita","Lollytart","Looking Glass","Looper","Loopy","Lost","Lotus","Lunchpad","Lunchpod","Lust","Lustrio","Lyria","Lyricalia","Madam Curry","Mafia","Magma","Magpie","Maguey","Mahvellous","Main Event","Maja","Mangelica","Mango Mango","Mantiquilla","Mantis","Mantra","Mantro","Mardi Gras","Martian","Martini's","Marvane","Mashers","Masquerade","Mastodon","Matador","Matrix","Matter","Max Five","Maximum","Mazaltov","McQueen","Meat Wagon","Meaty Boy","Melting Spot","Menagerie","Merge","Meringue","Metro","Metropolis","Millennium","Mingus","Minsk Meat","Mint Dynasty","Mintal","Mississippi","Mixers","Mobster Lobster","Mocha Loco","Mockingbird","Molten Taco","Mondo","Mondo Bocci","Mongolia","Mongoose","Montauk","Monty's","Moodswingers","Moonbeam","Moose","More","Moveable Feast","Mr. Beans","Muttonchop","Myshkin","Mystic","Nada","Naïve","Naïveté","Naked Lunch","Nana Banana","Ndoor","Nectar","Nectarine","Neitsche","Neon","Neutrino","New Albion","New Science","New World","New York Minute","Nibbles","Niche","Nob Hill","Nolo Contendre","North Quark","Nos","Nuance","Nutter","Nuxa","Nylon","Oasis","Obeko","Oblivion","Ocelot","Octopus Garden","Oedipus","Okra Winfry's","Okraville","Oligarchy","Olympio","Omnium","Onazi","One Up","Opt Inn","Optique","Optyk","Orb","Orbean","Orchestria","Organica","Oronoco","Oscilla","Oulu","Ouzo's","Overtime","Ozean","Palanquin","Panache","Panda Factory","Pang","Panic Organic","Papa Jambalaya","Papa Tart","Paper Tiger","Parabola","Paradox","Parallax","Parker's Place","Pasta la Vista","Peace Meal","Peaches","Pearlessa","Peer","Pelé","Penny Arcane","Perk n' Smirk","Phaedra","Phasma","Phat Cat","Phat City","Pheast","Phobia","Pickles","Picnic","Piltdown","Pinecone","Ping Pang","Pipeline","Pippin","Pirate School","Pizzazilla","Planet X","Plastika","Plastique","Plato's Crave","Plestar","Plethora","Plexi","Plonk","Plutarch","Podium","Podunk","Poetika","Pogonip","Poi Pot","Poifect","Pomme de Terre","Pomme Juan","Pope's Nose","Porque","Port O' Prawn","Potato","Poulet","Poultry in Motion","Practical Pig","Prawn Song","Prawnbroker","Preen","Pretzel Logic","Qiao","Qimonk","Qoolqi","Quagmire","Quench","Questo","Quetzal","Quintavi","Quiza","Quoin","Rabid Rabbit","Radiant","Raja","Rancho","Random","Razzmatazz","reBar","Retro","Retroville","Rib Rage","Riddle","Ringers","Riot","Riot Grrrill","Ripper","Roadhouse","Roanoke","Robillet","Rocinante","Rockyard","Rococo","Roma Gnome","Romana","Roosterville","Royal Lush","Ruby's","Ruckus","Rumi","Rummy's","Saguaro","Salsa","Salty Dog","Salud","Salvador","Samsam","Sandu","Sanguine","Sawbuck","Scallion","SeaSky","Seconds","Sequin","Serenade","Serendipity","Serene","Serge","Sergeant Pepper's","Shakedown","Shaman Ramen","Shangrilatte","Shank","Shelf Life","Shellac","Shitaki","Shoots & Spears","Sidelines","Sidetrack","Silk","Silversword","Slingshot","Smiles","Snappers","Snark","Socrates","Soma Soba","Sonata","Spackle","Spawn ","Speakeasy","Sphere","Spigot","Spillway","Splice","Splinter","Splinx","Sponge","Spoonbeam","Spoony","Sprawl","Station House","Steak & Eddy's","Steak Out","Steaming Pile","Stone's Throw","Stool Pigeon","Storybook","Stucco","Stuff't","Stuffed Shirt","Submarine","Submerge","Sugarpine","Sunbright","Surge","Surge ","Swell","Swingle","Taco Loco","También","Tango Bango","Tarmac","Taste","Taz","Té","Terra","Terrabloom","Terrago","Terrapin","Thalia","The Broken Elbow","The Bulldog","The Defense Department","The Dining Car","The Employee Lounge","The English Department","The Golden Prawn","The Grainery","The Idiot","The Mob","The Posh Nosh","The Rail Yard","The Royal Tease","The Sacrificial Clam","The Salad Factory","The Shack","The Supreme Court","The Top Hat","The Velvet Snail","The Void","The Wellborne","Thelonius","Theory","Thor","Tiblisi","Tickle","Tiki Taco","Tildé","Ting Tang's","Tivondra","Toggle","Tokyo Yo","Tomatofish","Tonic","Top Drawer","Topeka ","Topos","Toppers","Torpor","Torque","Track 9","Trampoline","Trapper","Trasola","Triage","Trippers","Troché","Tropicava","Tropolis","Trotsky","Truffle","Tsunami","Turnpike","Tuva","Tux","Twisters","Umbria","Uncle Joe's ","Uncle Sam's","Underground","Uni","Universe","Upbear","Utopia","Vacua","Vanity Fare","Vela","Velvet","Velveteen","Venetia","Venom","Vertigo","Via","Vibe","Viking","Vilnius","Vinland","Viperia","Vitrine","Viune","Viva","Vivre","Vizia","Volta","Voltaic","Voltaire","Voodoo","Vortex","Voulu","Wallflower","Wasabi","Waterbaby","Waterbar","Wellborne","West Bank","West Blank","Wetbar","Whisper","Wolfgang's","WonderBelly","Xiix","Yammy","Yangtze Doodle","Yo Yo Tokyo","Yo'nuts","YoYo's","Zamora","Zasu","Zenka","Zentia","Zilla","Zona","Zonia","Zulu","Zutro's");

array3 = new Array("","","","","","","","","","","","","","","","","","","","","",""," Bagels"," Bar"," Bar and Grill"," Bar and Grill"," Bar and Grill"," BBQ"," Bistro"," Bistro"," Brasserie"," Café"," Café"," Café"," Café"," Cantina"," Cantina"," Coffee"," Coffee"," Deli"," Diner"," Fish & Chips"," Grill"," Kitchen"," Kitchen"," Lounge"," Lounge"," Parlor"," Pizza"," Pub"," Restaurant"," Restaurante"," Roadhouse"," Saloon"," Steakhouse"," Sushi"," Tap"," Taqueria"," Tavern"," Tavern"," Tearoom"," Trattoria"," Wine Bar");


        index1 = Math.round(Math.random() * max1);      
        index2 = Math.round(Math.random() * max2);
		index3 = Math.round(Math.random() * max3);          
		
        return array1[index1] + array2[index2] + array3[index3];

}

function upgrade(row, col) {
  event.preventDefault();
  var grid = SF.Grid.Instances[row][col];
  grid.upgrade();
  var location = row + "_" + col;
  $("#imggrid" + location).attr("src", grid.url[grid.type()]);
  display(row, col);
  calculate();
}

function display(row, col) {
  $('.selected').removeClass('selected');
  var grid = SF.Grid.Instances[row][col];
  $('#landname').html(grid.name);
  $('#landtech').html(grid.techworkers);
  $('#landpro').html(grid.professionalworkers);
  $('#landnatives').html(grid.averageworkers);
  $('#landhousing').html(grid.residents);
  $('#landtier').html(grid.tier);
  $('#landtiermax').html(grid.limit);
  $('#landtax').html(grid.revenue);
  $('#landcost').html(grid.cost);
  $('#landupgrade').html(grid.cost * 10);
  $('#ggrid' + row + '_' + col).addClass("selected");
  console.log($('#g' + row + '_' + col));
}

function calculate() {
  var tech = 0;
  var pro = 0;
  var natives = 0;
  var housing = 0;
  var revenue = 0;
  var cost = 0;
  for (var row = 0; row < SF.Config.gridrow; row++) {
    for (var col = 0; col < SF.Config.gridcol; col++) {
      var location = "grid" + row + "_" + col;
      var grid = SF.Grid.Instances[row][col];
      tech += grid.techworkers;
      pro += grid.professionalworkers;
      natives += grid.averageworkers;
      housing += grid.residents;
      revenue += grid.revenue;
      cost += grid.cost;
    }
  }
  
  $("#citytax").html(revenue);
  $("#citycash").html(SF.Current.cash);
  $("#citycost").html(cost);
  $("#citytech").html(tech);
  $("#citypro").html(pro);
  $("#citynatives").html(natives);
  $("#citycap").html(housing);
  $("#citypop").html(tech + pro + natives);
  $("#cityrent").html(Math.round(1000 * ((tech + pro + natives)/ housing)));
  return revenue - cost;
}

/*function disable(row, col) {
  var location = row + "_" + col;
  $("#upgradegrid" + location).addClass("disable");
  $("#removegrid" + location).addClass("disable");
}

function enable(row, col) {
  var location = row + "_" + col;
  $("#upgradegrid" + location).removeClass("disable");
  $("#removegrid" + location).removeClass("disable");
}*/

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
  
  window.setInterval(SF.Tick,5000);
  var count = 0;
  window.setInterval(function(){
    var output = "";
    if (count < 6) {
      for (var i = 0; i < count; i++) {
        output += "*";
      }
      count++
    } else {
      count = 1;
    }
    
    $("#timer").html(output);
  }, 1000);
  
});