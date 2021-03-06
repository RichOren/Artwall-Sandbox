 window.onload = function() {

        var maxSpeed = 5;
        var accel = 0.2;
        var speed = 0;
        var viewport = new Viewport(document.getElementById("canvas"));//
        var world = new World(viewport);
        var keyState = {
            forward: false,
            backward: false,
            strafeLeft: false,
            strafeRight: false
        }
        var pointer = {
            x: 0,
            y: 0
        };

        function buildCube(colour, w, h, d, x, y, z, rx, ry, rz) {

            world.addPlane(new Plane(colour, h, w, x, y, z, 0, 180, 90));
            world.addPlane(new Plane(colour, w, d, x, y, z, 90, 0, 0));
            world.addPlane(new Plane(colour, d, h, x, y, z, 0, 270, 0));
            world.addPlane(new Plane(colour, d, h, x + w, y, z + d, 0, 90, 0));
            world.addPlane(new Plane(colour, w, d, x + w, y + h, z, 90, 180, 0));
            world.addPlane(new Plane(colour, w, h, x, y, z + d, 0, 0, 0));
        }

        // floor
        world.addPlane(new Plane("url(wood.jpg)", 800, 800, -400, 400, 53, 180, 0, 0));
        // Ceiling
        world.addPlane(new Plane("url(1.jpg)", 800, 800, 400, 400, -447, 180, 180, 0));

        // walls
        world.addPlane(new Plane("url(wall_custom.jpg?3)", 800, 500, 400, -400, -447, 270, 0, 180));
        world.addPlane(new Plane("url(A023.jpg?3)", 800, 500, -400, -400, -447, 270, 90, 180));
        world.addPlane(new Plane("url(wall_custom.jpg?3)", 800, 500, -400, 400, -447, 90, 0, 0, 0));
        world.addPlane(new Plane("url(wall_custom.jpg?3)", 800, 500, 400, 400, -447, 90, 270, 0));

        // // rug
        // world.addPlane( new Plane("url(rug.jpg)", 200, 340, 100, -170, 52,0,180,0));

        // // table
        // buildCube("url(desk.jpg)", 10, 10, 100, -50, -100, -49);
        // buildCube("url(desk.jpg)", 10, 10, 100, 50, -100, -49);
        // buildCube("url(desk.jpg)", 10, 10, 100, -50, 100, -49);
        // buildCube("url(desk.jpg)", 10, 10, 100, 50, 100, -49);
        // buildCube("url(desk.jpg)", 130, 250, 15, -60, -120, -65);

        // // chair
        // buildCube("url(desk.jpg)", 10, 10, 55, 135, -30, -4);
        // buildCube("url(desk.jpg)", 10, 10, 55, 135, 30, -4);
        // buildCube("url(desk.jpg)", 10, 10, 55, 75, -30, -4);
        // buildCube("url(desk.jpg)", 10, 10, 55, 75, 30, -4);
        // buildCube("#111", 60, 70, 15, 75, -30, -20);
        // buildCube("#111", 10, 70, 95, 135, -30, -100);

        // // mac
        // buildCube("#eee", 10, 120, 85, -30, -60, -170);
        // buildCube("#ccc", 40, 50, 2, -50, -25, -67);
        // world.addPlane( new Plane("url(osx.jpg)", 110, 65,-19,-55,-165,90,90,0));

        // //buildCube("#ddd", 2, 50, 50, -50, -25, -118);
        // world.addPlane( new Plane("#bbb", 2, 50,-33,-25,-115,90,0,20));
        // world.addPlane( new Plane("#999", 50, 50,-33,-25,-115,0,250,0));
        // world.addPlane( new Plane("#bbb", 2, 50,-31,25,-115,90,180,340));
        // world.addPlane( new Plane("#eee", 50, 50,-48,-25,-68,0,70,0));
        // world.addPlane( new Plane("#ddd", 2, 50,-30,-25,-115,0,160,0));

        // // keyboard
        // buildCube("url(mac-keybd.png)", 31, 70, 1, 10, -35, -67);

        // // mouse
        // buildCube("#eee", 20, 12, 2, 20, 60, -69);

        // // bookshelf
        // buildCube("url(desk.jpg)", 10, 50, 300, -350, 345, -250);
        // buildCube("url(desk.jpg)", 10, 50, 300, -150, 345, -250);
        // buildCube("url(desk.jpg)", 190, 50, 10, -340, 345, -250); // shelf
        // buildCube("url(desk.jpg)", 190, 50, 10, -340, 345, -160); // shelf
        // buildCube("url(desk.jpg)", 190, 50, 10, -340, 345, -65); // shelf
        // buildCube("url(desk.jpg)", 190, 50, 10, -340, 345, 30); // shelf

        // // artwork
        // world.addPlane( new Plane("url(art.png)", 424, 174, -398,-240,-300,90,90,0));

        viewport.camera.position.x = -250
        viewport.camera.position.y = 50
        viewport.camera.position.z = 50
        viewport.camera.rotation.x = 270
        viewport.camera.rotation.y = 0
        viewport.camera.rotation.z = -60
        viewport.camera.update();

        window.addEventListener("devicemotion", function(ev) {
            keyState.forward = ev.accelerationIncludingGravity.z < -6;
            keyState.backward = ev.accelerationIncludingGravity.z > 3;
        }, false);

        document.addEventListener("touchstart", function(ev) {
            pointer.x = ev.targetTouches[0].pageX;
            pointer.y = ev.targetTouches[0].pageY;
            ev.preventDefault();
        }, false);

        document.addEventListener("touchmove", function(ev) {
            viewport.camera.rotation.x -= (ev.targetTouches[0].pageY - pointer.y) / 2;
            viewport.camera.rotation.z += (ev.targetTouches[0].pageX - pointer.x) / 2;
            pointer.x = ev.targetTouches[0].pageX;
            pointer.y = ev.targetTouches[0].pageY;
            ev.preventDefault();
        }, false);

        document.addEventListener("mouseover", function(ev) {
            pointer.x = ev.pageX;
            pointer.y = ev.pageY;
            document.removeEventListener("mouseover", arguments.callee)
        }, false);

        document.addEventListener("mousemove", function(ev) {
            viewport.camera.rotation.x -= (ev.pageY - pointer.y) / 2;
            viewport.camera.rotation.z += (ev.pageX - pointer.x) / 2;
            pointer.x = ev.pageX;
            pointer.y = ev.pageY;

            //viewport.camera.rotation.x = -ev.pageY/2;
            //viewport.camera.rotation.z = ev.pageX/2;
        }, false);


        document.addEventListener("keydown", function(e) {
            //console.log(e.keyCode);
            switch (e.keyCode) {
                case 87:
                    keyState.forward = true;
                    break;
                case 83:
                    keyState.backward = true;
                    break;
            }
        }, false);

        document.addEventListener("keyup", function(e) {
            switch (e.keyCode) {
                case 87:
                    keyState.forward = false;
                    break;
                case 83:
                    keyState.backward = false;
                    break;
            }
        }, false);



        // Game Loop

        // (function() {
        //     if (keyState.backward) {
        //         if (speed > -maxSpeed) speed -= accel;
        //     } else if (keyState.forward) {
        //         if (speed < maxSpeed) speed += accel;
        //     } else if (speed > 0) {
        //         speed = Math.max(speed - accel, 0);
        //     } else if (speed < 0) {
        //         speed = Math.max(speed + accel, 0);
        //     } else {
        //         speed = 0;
        //     }
        //     var xo = Math.sin(viewport.camera.rotation.z * 0.0174532925);
        //     var yo = Math.cos(viewport.camera.rotation.z * 0.0174532925);
        //     viewport.camera.position.x -= xo * speed;
        //     viewport.camera.position.y -= yo * speed;
        //     viewport.camera.update();

        //     setTimeout(arguments.callee, 15);

        // })();
    }