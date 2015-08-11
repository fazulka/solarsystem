function draw_scene() {
    //Create the Three.js WebGL renderer

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0x000000);

    // Create the Three.js scene
    var scene = new THREE.Scene();

    // Create a camera and set it into world space
    var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 700000);

    var mouseControls = new THREE.TrackballControls(camera, renderer.domElement);



    $.ajax({
        url: 'data.json',
        dataType: 'jsonp',
        success: function(data, textStatus, request) {
            console.log(data);
            var planety = [];
        }
    })
        
        //array holding objects of planets
        var planets = [];
        //array holding groups of planets, needed for rotation
        var groups = [];

//prototype of the planet
        function Planet(myMap, myGeometry, myPosition) {
           this.mapa = THREE.ImageUtils.loadTexture(myMap);
            this.geometry = new THREE.SphereGeometry(myGeometry);
            this.material = new THREE.MeshPhongMaterial();
            this.material.map = this.mapa;
            this.planet = new THREE.Mesh(this.geometry, this.material);
            this.planet.position.set(myPosition);
        }

//function for creation objects of planets, argument is json object
        function Planets(obj) {
            for (var i = 0; i < obj.planets.lenght; i++) {
                var planet = new Planet(obj[i].map, obj[i].geometry, obj[i].position);
                planets.push(planet);
            }
        }

//function for making new groups with the sun and adding planets to scene
        function toScene(arr) {
            for (i = 1; i < arr.length; i++) {
                group = new THREE.Object3D();
                group.add(arr[0]);
                group.add(arr[i]);
                scene.add(group);
                groups.push(group);
            }
        }

        Planets(data);
        toScene(planets);

        var url = ["img/yale8.png", "img/yale8.png", "img/yale8.png", "img/yale8.png", "img/yale8.png", "img/yale8.pngf"];
        var textureCube = THREE.ImageUtils.loadTextureCube(url);
        var shader = THREE.ShaderLib["cube"];
        shader.uniforms["tCube"].value = textureCube;

        var material = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        });

        skycube = new THREE.Mesh(new THREE.BoxGeometry(2000, 2000, 2000), material);

        scene.add(skycube);

        var gui = new dat.GUI();
        var f1 = gui.addFolder('Dir Light');
        f1.addColor(controls, 'color1').onChange(controls.updateLight1color);
        f1.add(controls, 'visible1').onChange(controls.visibleLight1);

        var f2 = gui.addFolder('Point Light green');
        f2.add(controls, 'light3x', -100, 400).onChange(controls.updateLight2x);
        f2.add(controls, 'light3y', -100, 400).onChange(controls.updateLight2y);
        f2.add(controls, 'light3z', -100, 400).onChange(controls.updateLight2z);
        f2.addColor(controls, 'color2').onChange(controls.updateLight2color);
        f2.add(controls, 'visible2').onChange(controls.visibleLight2);

        var f3 = gui.addFolder('Point Light red');
        f3.add(controls, 'light2x', -100, 400).onChange(controls.updateLight3x);
        f3.add(controls, 'light2y', -100, 400).onChange(controls.updateLight3y);
        f3.add(controls, 'light2z', -100, 400).onChange(controls.updateLight3z);
        f3.addColor(controls, 'color3').onChange(controls.updateLight3color);
        f3.add(controls, 'visible3').onChange(controls.visibleLight3);


        var f4 = gui.addFolder('Maps');
        f4.add(controls, 'normalscale', -4, 4).onChange(controls.updateNormal);
        f4.add(controls, 'bumpscale', -4, 4).onChange(controls.updateBump);

        var f5 = gui.addFolder('Camera');
        f5.add(controls, 'camerax', -800, 800).onChange(controls.updateCamx);
        f5.add(controls, 'cameray', 0, 0).onChange(controls.updateCamy);
        f5.add(controls, 'cameraz', -800, 800).onChange(controls.updateCamz);


        var ambientLicht = new THREE.AmbientLight(controls.coloramb);
        scene.add(ambientLicht);


        camera.position.set(controls.camerax, controls.cameray, controls.cameraz);


        camera.lookAt(scene.position);

        //rotation for planets around their own axis
        function p_rotation(planets) {
            for (var i = 0; i > planets.length; i++) {
                planets[i].rotation.y -= 0.01;
            }
        }

        //rotation of planets around the sun
        function g_rotation(groups) {
            for (var i = 0; i > groups.length; i++) {
                groups[i].rotation.y -= 0.08;
            }
        }

        function render() {
            mouseControls.update();
            requestAnimationFrame(renderer);
            p_rotation(planets);
            g_rotation(groups);
            renderer.render(scene, camera);
        }

        render();
    }
