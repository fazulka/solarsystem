// solarsystem
 function draw_scene(){
 //Create the Three.js WebGL renderer
  
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight ); 
  document.body.appendChild( renderer.domElement );
  renderer.setClearColor(0x000000);
  
  // Create the Three.js scene
  var scene = new THREE.Scene();
  
  // Create a camera and set it into world space
  // This camera will provide a perspective projection
  // Arguments are (fov, aspect, near_plane, far_plane)
  
  var camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 0.1, 700000);

 //var axes = new THREE.AxisHelper( 500 );
  //scene.add(axes);  
  
  var mouseControls = new THREE.TrackballControls(camera, renderer.domElement);


  var controls = new function(){
    this.lightx = 300;
    this.lighty = 105;
    this.lightz = 200;
    this.light3x = 0;
    this.light3y = 50;
    this.light3z = 200;
    this.light2x = 200;
    this.light2y = 50;
    this.light2z = 0;
    this.visible1 = true;
    this.visible2 = true;
    this.visible3 = true;
    this.visibleamb = true;
    this.color1 = 0xffffff;
    this.color2 = 0xffffff;
    this.color3 = 0xffffff;
    //this.coloramb = 0xffffff;
    this.normalscale = 0.2;
    this.bumpscale = 0.2;
    this.camerax = 350;
    this.cameray = 50;
    this.cameraz = -350;
    
    this.updateLight1x = function (e) {               
         light.position.x = e;
         geometry.colorsNeedUpdate = true;     
    }
    this.updateLight1y = function (e) {               
         light.position.y = e;
         geometry.colorsNeedUpdate = true;     
    }
    this.updateLight1z = function (e) {               
         light.position.z = e;
         geometry.colorsNeedUpdate = true;     
    }
    this.updateLight1color = function (e) {               
         light.color.setHex(e);
    } 
    this.visibleLight1 = function (e) {
      light.visible = e;  
    }
    
    this.updateLight2x = function (e) {               
         light2.position.x = e;
         geometry.colorsNeedUpdate = true;     
    }
    this.updateLight2y = function (e) {               
         light2.position.y = e;
         geometry.colorsNeedUpdate = true;     
    }
    this.updateLight2z = function (e) {               
         light2.position.z = e;
         geometry.colorsNeedUpdate = true;     
    }
    this.updateLight2color = function (e) {               
         light2.color.setHex(e);
    } 
    this.visibleLight2 = function (e) {
      light2.visible = e; 
    }
    
    this.updateLight3x = function (e) {               
         light3.position.x = e;
         geometry.colorsNeedUpdate = true;     
    }
    this.updateLight3y = function (e) {               
         light3.position.y = e;
         geometry.colorsNeedUpdate = true;     
    }
    this.updateLight3z = function (e) {               
         light3.position.z = e;
         geometry.colorsNeedUpdate = true;     
    }
    this.updateLight3color = function (e) {               
         light3.color.setHex(e);
    } 
    this.visibleLight3 = function (e) {
      light3.visible = e; 
    }
    this.updateNormal = function (e){
     cube.material.normalScale.set(e,e);
    }
    this.updateBump = function (e){
     cube2.material.bumpScale = e;
    }
    this.updateCamx = function (e){
      camera.position.x = e;
    camera.lookAt(scene.position);
    }
    this.updateCamy = function (e){
      camera.position.y = e;
    camera.lookAt(scene.position);
    }
    this.updateCamz = function (e){
      camera.position.z = e;
    camera.lookAt(scene.position);
    }
    }

   //mercury
  /*var map1 = THREE.ImageUtils.loadTexture("mercurymap.jpg");
  var geometry1 = new THREE.SphereGeometry(0.3,32,32);
  var material1 = new THREE.MeshPhongMaterial();
  material1.map = map1;
  var mercury = new THREE.Mesh( geometry1, material1 ); 
  mercury.position.set(91.63,0,0);

  g_mercury = new THREE.Object3D();
  g_mercury.add(sol);
  g_mercury.add(mercury);
  scene.add(g_mercury);*/

 var planets = [];
 var groups = [];

 function planet(map, geometry, position){
 var map = THREE.ImageUtils.loadTexture(this.map);
 var geometry = new THREE.SphereGeometry(this.geometry);
 var material = new THREE.MeshPhongMaterial();
 material.map = map;
 var planet = new THREE.Mesh(geometry, material);
 planet.position.set(this.position);
 }

  function Planets(obj){
        for (var i = 0; i < obj.planets.lenght; i++) {
        var planet = new planet(obj[i].map, obj[i].geometry, obj[i].position);
        planets.push(planet);
    }
  };

function toScene(arr){
  for(i = 1; i < arr.length ; i++){
    group = new THREE.Object3D();
    group.add(arr[0]);
    group.add(arr[i]);
    scene.add(group);
    groups.push(group);
  }
};

Planets(data);
toScene(planets);

  var url = ["yale8.png","yale8.png","yale8.png","yale8.png","yale8.png","yale8.png",];
  var textureCube = THREE.ImageUtils.loadTextureCube( url );
  var shader = THREE.ShaderLib[ "cube" ];
  shader.uniforms[ "tCube" ].value = textureCube;

  var material = new THREE.ShaderMaterial( {
          fragmentShader: shader.fragmentShader,
          vertexShader: shader.vertexShader,
          uniforms: shader.uniforms,
          depthWrite: false,
          side: THREE.BackSide
        } );

   skycube = new THREE.Mesh( new THREE.BoxGeometry( 2000, 2000, 2000 ), material );
        
   scene.add( skycube );
   
   //get JSON object, does not work because of 
 function get_my_JSON (url) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.setRequestHeader ("Content-type", "solarsystem/json" );
    req.onreadystatechange = function(){

      if (req.readyState == 4 && req.status == 200){
        var response = JSON.parse(req.responseText);
        document.write(response.name);
      }
    }
    req.send();
  }

get_my_JSON("data.json");
 
 /*function load_Json(){
  $(document).ready(function () {
    $.getJSON("data.json", function(json){
      console.log(json);
  });
});
}*/

  
  var gui = new dat.GUI();
  var f1 = gui.addFolder('Dir Light');
  f1.add(controls, 'lightx', -100,600).onChange(controls.updateLight1x);
  f1.add(controls, 'lighty', -100,600).onChange(controls.updateLight1y);
  f1.add(controls, 'lightz', -100,600).onChange(controls.updateLight1z);
  f1.addColor(controls, 'color1').onChange(controls.updateLight1color);
  f1.add(controls, 'visible1').onChange(controls.visibleLight1);
  
  var f2 = gui.addFolder('Point Light green');
  f2.add(controls, 'light3x', -100,400).onChange(controls.updateLight2x);
  f2.add(controls, 'light3y', -100,400).onChange(controls.updateLight2y);
  f2.add(controls, 'light3z', -100,400).onChange(controls.updateLight2z);
  f2.addColor(controls, 'color2').onChange(controls.updateLight2color);
  f2.add(controls, 'visible2').onChange(controls.visibleLight2);
  
  var f3 = gui.addFolder('Point Light red');
  f3.add(controls, 'light2x', -100,400).onChange(controls.updateLight3x);
  f3.add(controls, 'light2y', -100,400).onChange(controls.updateLight3y);
  f3.add(controls, 'light2z', -100,400).onChange(controls.updateLight3z);
  f3.addColor(controls, 'color3').onChange(controls.updateLight3color);
  f3.add(controls, 'visible3').onChange(controls.visibleLight3);
  
  //var f4 = gui.addFolder('BumpScale');
  //f4.add(controls, 'bumpscale', -4, 4).onChange(controls.updateBump);
  
  var f4 = gui.addFolder('Maps');
  f4.add(controls, 'normalscale', -4, 4).onChange(controls.updateNormal);
  f4.add(controls, 'bumpscale', -4, 4).onChange(controls.updateBump);
  
  var f5 = gui.addFolder('Camera');
  f5.add(controls, 'camerax', -800,800).onChange(controls.updateCamx);
  f5.add(controls, 'cameray', 0,0).onChange(controls.updateCamy);
  f5.add(controls, 'cameraz', -800,800).onChange(controls.updateCamz);

  
  var ambientLicht = new THREE.AmbientLight(controls.coloramb);
  scene.add(ambientLicht);
  
 
  camera.position.set(controls.camerax,controls.cameray,controls.cameraz);
  
  
  camera.lookAt(scene.position);
  
  //rotation for planets around their own axis and around the sun
  function rotation(planets, groups){
    for (var i = 0; i > planets.length; i++) {
      planets[i].rotation.y -= 0.01;
    }
    for (var i = 0; i > groups.length; i++) {
      groups[i].rotation.y -= 0.08;
    }
  };
  
  function render() { 
  mouseControls.update();
  requestAnimationFrame( render );  
  //rotations
  
  /*sol.rotation.y -= 0.005;
  mercury.rotation.y -=0.01;
  venus.rotation.y -=0.01;
  earth.rotation.y -=0.01;
  mars.rotation.y -=0.01;
  jupiter.rotation.y -=0.01;
  saturn.rotation.y -=0.01;
  uranus.rotation.y -=0.01;
  neptune.rotation.y -=0.01;
 
  //group rotations
  g_mercury.rotation.y += 0.01;
  g_venus.rotation.y += 0.024;
  g_earth.rotation.y += 0.008;
  g_moon.rotation.y += 0.006;
  g_mars.rotation.y += 0.009;
  g_jupiter.rotation.y += 0.024;
  g_saturn.rotation.y += 0.015;
  g_uranus.rotation.y += 0.023;
  g_neptune.rotation.y += 0.017;*/
  
  
  rotation(planets, groups);
  renderer.render( scene, camera ); 
  } 
  
  render();
  }
