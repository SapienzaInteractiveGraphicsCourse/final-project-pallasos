import * as THREE from 'three';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import {OrbitControls} from './jsm/controls/OrbitControls.js';
import { DragControls } from './jsm/controls/DragControls.js'

var start = false; //flag for the animation
var flagL = true; //flag for the light
var flagG = false; //flag for the grab
var spotLight, spotLight2, spotLight3, spotLight4;
var tween1;
var testaG, spallaDG, spallaSG, manoDG, gambaSG, polSG, gambaDG; //goku body
var testaZ, spallaDZ, spallaSZ, manoDZ, gambaSZ, polSZ, gambaDZ, polDZ, abraccioDZ, abraccioSZ ,braccioSZ, braccioDZ; //zoro body
var testaH, fianchiH, bustoH, busto_2H, busto_3H, spallaSH, braccioSH, abraccioSH, manoSH, spallaDH, gambaSH, gambaDH, polSH, polDH, piedeDH; //human body
var testaH2, fianchiH2, bustoH2, busto_2H2, busto_3H2, spallaSH2, braccioSH2, abraccioSH2, manoSH2, spallaDH2, gambaSH2, gambaDH2, polSH2, polDH2, piedeDH2; //human2 body
var testaH3, fianchiH3, bustoH3, busto_2H3, busto_3H3, spallaSH3, braccioSH3, abraccioSH3, manoSH3, spallaDH3, gambaSH3, gambaDH3, polSH3, polDH3, piedeDH3; //human3 body
var testaH4, fianchiH4, bustoH4, busto_2H4, busto_3H4, spallaSH4, braccioSH4, abraccioSH4, manoSH4, spallaDH4, gambaSH4, gambaDH4, polSH4, polDH4, piedeDH4; //human4 body
var leftArm, rightArm, hips; //dj body
var song;
var canzone1 = "./js/music/music.mp3";
var canzone2 = "./js/music/music2.mp3";
var canzone3 = "./js/music/music3.mp3";
 
const scene = new THREE.Scene();
//texture e cubi
// Texture Loading
var crateBumpMap, crateNormalMap;
var textureLoader = new THREE.TextureLoader();
crateBumpMap = textureLoader.load("./textures/bump.jpg");
crateNormalMap = textureLoader.load("./textures/bump.jpg");

// Create mesh with these textures
var crate;
crate = new THREE.Mesh(
    new THREE.BoxGeometry(2.2,2.2,2.2),
    new THREE.MeshPhongMaterial({
        color:0x0fffff,
        bumpMap:crateBumpMap,
        normalMap:crateNormalMap
    })
);
scene.add(crate);
crate.position.set(3, 1, -2);
crate.receiveShadow = true;
crate.castShadow = true;

// Create mesh with these textures
var cube;
cube = new THREE.Mesh(
    new THREE.BoxGeometry(2.2,2.2,2.2),
    new THREE.MeshPhongMaterial({
        color:0x00ffff,
        bumpMap:crateBumpMap,
        normalMap:crateNormalMap
    })
);
scene.add(cube);
cube.position.set(-1, 1, 6);
cube.receiveShadow = true;
cube.castShadow = true;


function djboard() {

    const loader = new GLTFLoader();
    loader.load('model/djboard/scene.gltf', function (gltf) {
        gltf.scene.position.y = 4.85;
        gltf.scene.position.z = 22.5;
        gltf.scene.position.x = 0;
        gltf.scene.scale.set(0.015, 0.015, 0.015);
        gltf.scene.traverse(function (node) {

            if (node.isMesh) { node.castShadow = true; }

        });
        scene.add(gltf.scene);
        
    }, undefined, function (error) {

        console.error(error);
        //end loader
    });
}

//this is the function that generates zoro
function zoro(){
    //start loader
    const loader = new GLTFLoader();
    loader.load( 'model/zoro/scene.gltf', function ( gltf ) { //model in the folder

        gltf.scene.position.y=2;
        gltf.scene.position.z=-2;
        gltf.scene.position.x=3;
        gltf.scene.scale.set(2.5,2.5,2.5);
        gltf.scene.rotation.y=Math.PI;
        gltf.scene.traverse( function( node ) {

            if ( node.isMesh ) { node.castShadow = true; }
            //console.log(node.name);
            
            if(node.name ==="Bip001_Head_041") testaZ = node;           
            else if(node.name==="Bip001_R_Clavicle_013") spallaDZ = node;           
            else if(node.name==="Bip001_R_Hand_016") manoDZ = node;           
            else if(node.name==="Bip001_R_Thigh_03") gambaDZ = node;            
            else if(node.name==="Bip001_R_Calf_04") polDZ = node;            
            else if(node.name==="Bip001_L_Clavicle_026") spallaSZ = node;
            else if(node.name==="Bip001_L_Thigh_07") gambaSZ = node;
            else if(node.name==="Bip001_L_Calf_08") polSZ = node;
            else if(node.name==="Bip001_R_Forearm_015") abraccioDZ = node;
            else if(node.name==="Bip001_L_Forearm_028") abraccioSZ = node;
            else if(node.name==="Bip001_R_UpperArm_014") braccioDZ = node;
            else if(node.name==="Bip001_L_UpperArm_027") braccioSZ = node;
             
        })

        testaZ.rotation.z = -0.5;
        spallaDZ.rotation.y = 2;
        spallaSZ.rotation.x = 2.3;
        abraccioDZ.rotation.x=-1;
        abraccioSZ.rotation.x=1;
        braccioSZ.rotation.y=5.5;
        gambaSZ.rotation.x=3;

        scene.add( gltf.scene );
        //objects.push(gltf.scene);

    }, undefined, function ( error ) {

    console.error( error );
    //end loader

    } );
}

function goku(){
    //start loader
    const loader = new GLTFLoader();

    loader.load( 'model/goku/scene.gltf', function ( gltf ) { //model in the folder

        gltf.scene.position.y=2.15;
        gltf.scene.position.z=6;
        gltf.scene.position.x=-1;
        gltf.scene.rotation.y=Math.PI;
        gltf.scene.scale.set(1.5,1.5,1.5);
        gltf.scene.traverse( function( node ) {
            node.color = 0x0000ff;
            //console.log(node.name);
            if(node.name==="mixamorigHead_06") testaG = node;
            else if(node.name==="mixamorigLeftShoulder_08") spallaSG = node;
            else if(node.name==="mixamorigRightShoulder_032") spallaDG = node;
            else if(node.name==="mixamorigRightHand_035") manoDG = node;
            else if(node.name==="mixamorigLeftUpLeg_056") gambaSG = node;
            else if(node.name==="mixamorigLeftLeg_00") polSG = node;
            else if(node.name==="mixamorigRightUpLeg_060") gambaDG = node;
            if ( node.isMesh ) { node.castShadow = true; }
        })
        
        testaG.rotation.y = 0;  
        spallaSG.rotation.y = 6;  
        spallaDG.rotation.y = 7;  
        manoDG.rotation.x = 6; 
        gambaSG.rotation.x = -8;
        polSG.rotation.x = -7;
        gambaDG.rotation.z = 3.2;

        
        scene.add( gltf.scene );
        //objects.push(gltf.scene);

    }, undefined, function ( error ) {

    console.error( error );
    //end loader

    } );
}

function human(){
    const loader = new GLTFLoader();

    loader.load( 'model/human/scene.gltf', function ( gltf ) { //model in the folder

        gltf.scene.position.y=0;
        gltf.scene.position.z=0;
        gltf.scene.position.x=-2;
        gltf.scene.scale.set(1.5,1.5,1.5);
        gltf.scene.traverse( function( node ) {
            
            if ( node.isMesh ) { node.castShadow = true; }
            //console.log(node.name);

            if(node.name === "mixamorigHead_06") testaH = node;
            else if(node.name === "mixamorigHips_01") fianchiH = node;
            else if(node.name === "mixamorigSpine_02") bustoH = node;
            else if(node.name === "mixamorigSpine1_03") busto_2H = node;
            else if(node.name === "mixamorigSpine2_04") busto_3H = node;
            else if(node.name === "mixamorigLeftShoulder_08") spallaSH = node;
            else if(node.name === "mixamorigLeftArm_09") braccioSH = node;
            else if(node.name === "mixamorigLeftForeArm_010") abraccioSH = node;
            else if(node.name === "mixamorigLeftHand_011") manoSH = node;
            else if(node.name === "mixamorigRightShoulder_016") spallaDH = node;
            else if(node.name === "mixamorigLeftUpLeg_024") gambaSH = node;
            else if(node.name === "mixamorigRightUpLeg_00") gambaDH = node;
            else if(node.name === "mixamorigLeftLeg_025") polSH = node;
            else if(node.name === "mixamorigRightLeg_029") polDH = node;
            else if(node.name === "mixamorigRightFoot_030") piedeDH = node;
        })

        fianchiH.rotation.y=1;
        spallaSH.rotation.y=1;
        spallaDH.rotation.y=-1;
        abraccioSH.rotation.x=-0.5;
        manoSH.rotation.z=0.5;
        gambaSH.rotation.y=0.5;
        gambaSH.rotation.z=-3;
        polSH.rotation.x = -0.3;
        gambaDH.rotation.y=-0.5;
        
        scene.add( gltf.scene );
        objects.push(gltf.scene);

    }, undefined, function ( error ) {

    console.error( error );
    //end loader

    } );
}

function human2(){
    const loader = new GLTFLoader();

    loader.load( 'model/human/scene.gltf', function ( gltf ) { //model in the folder

        gltf.scene.position.y=0;
        gltf.scene.position.z=5;
        gltf.scene.position.x=2;
        gltf.scene.scale.set(1.5,1.5,1.5);
        gltf.scene.traverse( function( node ) {
            
            if ( node.isMesh ) { node.castShadow = true; }
            //console.log(node.name);

            if(node.name === "mixamorigHead_06") testaH2 = node;
            else if(node.name === "mixamorigHips_01") fianchiH2 = node;
            else if(node.name === "mixamorigSpine_02") bustoH2 = node;
            else if(node.name === "mixamorigSpine1_03") busto_2H2 = node;
            else if(node.name === "mixamorigSpine2_04") busto_3H2 = node;
            else if(node.name === "mixamorigLeftShoulder_08") spallaSH2 = node;
            else if(node.name === "mixamorigLeftArm_09") braccioSH2 = node;
            else if(node.name === "mixamorigLeftForeArm_010") abraccioSH2 = node;
            else if(node.name === "mixamorigLeftHand_011") manoSH2 = node;
            else if(node.name === "mixamorigRightShoulder_016") spallaDH2 = node;
            else if(node.name === "mixamorigLeftUpLeg_024") gambaSH2 = node;
            else if(node.name === "mixamorigRightUpLeg_00") gambaDH2 = node;
            else if(node.name === "mixamorigLeftLeg_025") polSH2 = node;
            else if(node.name === "mixamorigRightLeg_029") polDH2 = node;
            else if(node.name === "mixamorigRightFoot_030") piedeDH2 = node;
        })

        fianchiH2.rotation.y=1;
        spallaSH2.rotation.y=1;
        spallaDH2.rotation.y=-1;
        abraccioSH2.rotation.x=-0.5;
        manoSH2.rotation.z=0.5;
        gambaSH2.rotation.y=0.5;
        gambaSH2.rotation.z=-3;
        polSH2.rotation.x = -0.3;

        gambaDH2.rotation.y=-0.5;

        
        scene.add( gltf.scene );
        objects.push(gltf.scene);

    }, undefined, function ( error ) {

    console.error( error );
    //end loader

    } );
}

function human3(){
    const loader = new GLTFLoader();

    loader.load( 'model/human/scene.gltf', function ( gltf ) { //model in the folder

        gltf.scene.position.y=0;
        gltf.scene.position.z=10;
        gltf.scene.position.x=0;
        gltf.scene.scale.set(1.5,1.5,1.5);
        gltf.scene.traverse( function( node ) {
            
            if ( node.isMesh ) { node.castShadow = true; }
            //console.log(node.name);

            if(node.name === "mixamorigHead_06") testaH3 = node;
            else if(node.name === "mixamorigHips_01") fianchiH3 = node;
            else if(node.name === "mixamorigSpine_02") bustoH3 = node;
            else if(node.name === "mixamorigSpine1_03") busto_2H3 = node;
            else if(node.name === "mixamorigSpine2_04") busto_3H3 = node;
            else if(node.name === "mixamorigLeftShoulder_08") spallaSH3 = node;
            else if(node.name === "mixamorigLeftArm_09") braccioSH3 = node;
            else if(node.name === "mixamorigLeftForeArm_010") abraccioSH3 = node;
            else if(node.name === "mixamorigLeftHand_011") manoSH3 = node;
            else if(node.name === "mixamorigRightShoulder_016") spallaDH3 = node;
            else if(node.name === "mixamorigLeftUpLeg_024") gambaSH3 = node;
            else if(node.name === "mixamorigRightUpLeg_00") gambaDH3 = node;
            else if(node.name === "mixamorigLeftLeg_025") polSH3 = node;
            else if(node.name === "mixamorigRightLeg_029") polDH3 = node;
            else if(node.name === "mixamorigRightFoot_030") piedeDH3 = node;
        })

        fianchiH3.rotation.y=1;
        spallaSH3.rotation.y=1;
        spallaDH3.rotation.y=-1;
        abraccioSH3.rotation.x=-0.5;
        manoSH3.rotation.z=0.5;
        gambaSH3.rotation.y=0.5;
        gambaSH3.rotation.z=-3;
        polSH3.rotation.x = -0.3;
        gambaDH3.rotation.y=-0.5;

        
        scene.add( gltf.scene );
        objects.push(gltf.scene);

    }, undefined, function ( error ) {

    console.error( error );
    //end loader

    } );
}

function human4(){
    const loader = new GLTFLoader();

    loader.load( 'model/human/scene.gltf', function ( gltf ) { //model in the folder

        gltf.scene.position.y=2.3;
        gltf.scene.position.z=5;
        gltf.scene.position.x=-10;
        gltf.scene.scale.set(1.2,1.2,1.2);
        gltf.scene.traverse( function( node ) {
            
            if ( node.isMesh ) { node.castShadow = true; }
            //console.log(node.name);

            if(node.name === "mixamorigHead_06") testaH4 = node;
            else if(node.name === "mixamorigHips_01") fianchiH4 = node;
            else if(node.name === "mixamorigSpine_02") bustoH4 = node;
            else if(node.name === "mixamorigSpine1_03") busto_2H4 = node;
            else if(node.name === "mixamorigSpine2_04") busto_3H4 = node;
            else if(node.name === "mixamorigLeftShoulder_08") spallaSH4 = node;
            else if(node.name === "mixamorigLeftArm_09") braccioSH4 = node;
            else if(node.name === "mixamorigLeftForeArm_010") abraccioSH4 = node;
            else if(node.name === "mixamorigLeftHand_011") manoSH4 = node;
            else if(node.name === "mixamorigRightShoulder_016") spallaDH4 = node;
            else if(node.name === "mixamorigLeftUpLeg_024") gambaSH4 = node;
            else if(node.name === "mixamorigRightUpLeg_00") gambaDH4 = node;
            else if(node.name === "mixamorigLeftLeg_025") polSH4 = node;
            else if(node.name === "mixamorigRightLeg_029") polDH4 = node;
            else if(node.name === "mixamorigRightFoot_030") piedeDH4 = node;
        })

        fianchiH4.rotation.y=1;
        spallaSH4.rotation.y=1;
        spallaDH4.rotation.y=-1;
        abraccioSH4.rotation.x=-0.5;
        manoSH4.rotation.z=0.5;
        gambaSH4.rotation.y=0.5;
        gambaSH4.rotation.z=-3;
        polSH4.rotation.x = -0.3;
        gambaDH4.rotation.y=-0.5;

        
        scene.add( gltf.scene );
        objects.push(gltf.scene);

    }, undefined, function ( error ) {

    console.error( error );
    //end loader

    } );
}

function humandj(){
    const loader = new GLTFLoader();

    loader.load( 'model/human/scene.gltf', function ( gltf ) { //model in the folder

        gltf.scene.position.y=2.2;
        gltf.scene.position.z=23.5;
        gltf.scene.position.x=0;
        gltf.scene.scale.set(1.3,1.3,1.3);
        gltf.scene.traverse( function( node ) {
            
            if ( node.isMesh ) { node.castShadow = true; }
            //console.log(node.name);

            if(node.name === "mixamorigLeftArm_09") leftArm = node;
            if(node.name === "mixamorigRightArm_017") rightArm = node;
            if(node.name === "mixamorigHips_01") hips=node;
        })

        leftArm.rotation.z = -5;
        leftArm.rotation.y = + 0.13;
        rightArm.rotation.z = 5;
        rightArm.rotation.y = - 0.13;
        hips.rotation.y = 0.008;
        
        scene.add( gltf.scene );
        objects.push(gltf.scene);

    }, undefined, function ( error ) {

    console.error( error );
    //end loader

    } );
}


function house(){
    const loader = new GLTFLoader();

    loader.load( 'model/disco/scene.gltf', function ( gltf ) { //model in the folder

        gltf.scene.position.y=0;
        gltf.scene.position.z=0;
        gltf.scene.position.x=0;
        gltf.scene.scale.set(1.5,1.5,1.5);
        gltf.scene.traverse( function( node ) {

            if ( node.isMesh ) { node.receiveShadow = true; }
    
        } );
        scene.add( gltf.scene );
        //objects.push(gltf.scene);

    }, undefined, function ( error ) {

    console.error( error );
    //end loader

    } );
}


function light(){
    const alight = new THREE.AmbientLight( 0xff00ff,0.8); 
    scene.add( alight );

    //spotlight on the roof

    spotLight = new THREE.SpotLight( 0xffffff, 0.6);
    spotLight.position.set( 0, 20, 0 );

    spotLight.castShadow = true;
    spotLight.angle = Math.PI/6.9;

    spotLight.shadow.mapSize.width = 512;
    spotLight.shadow.mapSize.height = 512;

    spotLight.shadow.camera.near = 5.2;
    spotLight.shadow.camera.far = 21;

    scene.add( spotLight );

    spotLight2 = new THREE.SpotLight( 0xffffff, 0.6);
    spotLight2.position.set( 0, 20, -25 );

    spotLight2.castShadow = true;
    spotLight2.angle = Math.PI/7.9;

    spotLight2.shadow.mapSize.width = 512;
    spotLight2.shadow.mapSize.height = 512;

    spotLight2.shadow.camera.near = 5.2;
    spotLight2.shadow.camera.far = 28;

    scene.add(spotLight2);

    spotLight3 = new THREE.SpotLight( 0xffffff, 0.6);
    spotLight3.position.set( 0, 20, 25 );

    spotLight3.castShadow = true;
    spotLight3.angle = Math.PI/7.9;

    spotLight3.shadow.mapSize.width = 512;
    spotLight3.shadow.mapSize.height = 512;

    spotLight3.shadow.camera.near = 5.2;
    spotLight3.shadow.camera.far = 28;

    scene.add(spotLight3);

    spotLight4 = new THREE.SpotLight( 0x0000ff, 2);
    spotLight4.position.set( 0, 20, 23 );

    spotLight4.castShadow = true;
    spotLight4.angle = Math.PI/7.9;

    spotLight4.shadow.mapSize.width = 512;
    spotLight4.shadow.mapSize.height = 512;

    spotLight4.shadow.camera.near = 5.2;
    spotLight4.shadow.camera.far = 28;

    scene.add(spotLight4);

    var spotTarget = new THREE.Object3D(); // spotlight target
    spotTarget.position.set(0,0,23);
    spotLight4.target = spotTarget; // set spotLight target for spotLight
    scene.add(spotTarget);

}

function animation(){
    tween1= new TWEEN.Tween(final)
        .to({y: 180.5}, 80)
        //.delay(600)
        .easing(TWEEN.Easing.Linear.Out)
        .onUpdate(function(){
            //GOKU
            testaG.rotation.y = 0;  
            spallaSG.rotation.y = 6;  
            spallaDG.rotation.y = 7;  
            manoDG.rotation.x = 6; 
            gambaSG.rotation.x = -8;

            //ZORO
            testaZ.rotation.z = -0.5;
            abraccioDZ.rotation.x=-1;
            abraccioSZ.rotation.x=1;
            braccioSZ.rotation.y=5.5;
            gambaSZ.rotation.x=3;

            //HUMAN
            fianchiH.rotation.y=1;
            bustoH.rotation.y=0;
            busto_2H.rotation.y=0;
            busto_3H.rotation.y=0;
            abraccioSH.rotation.x=-0.5;
            manoSH.rotation.z=0.5;
            gambaSH.rotation.y=0.5;
            gambaDH.rotation.y=-0.5;
            gambaDH.rotation.x = 0; 
            piedeDH.rotation.x=1.1; 
            polDH.rotation.x=0;

            //HUMAN2
            fianchiH2.rotation.y=1;
            bustoH2.rotation.y=0;
            busto_2H2.rotation.y=0;
            busto_3H2.rotation.y=0;
            abraccioSH2.rotation.x=-0.5;
            manoSH2.rotation.z=0.5;
            gambaSH2.rotation.y=0.5;
            gambaDH2.rotation.y=-0.5;
            gambaDH2.rotation.x = 0; 
            piedeDH2.rotation.x=1.1; 
            polDH2.rotation.x=0;

            //HUMAN3
            fianchiH3.rotation.y=1;
            bustoH3.rotation.y=0;
            busto_2H3.rotation.y=0;
            busto_3H3.rotation.y=0;
            abraccioSH3.rotation.x=-0.5;
            manoSH3.rotation.z=0.5;
            gambaSH3.rotation.y=0.5;
            gambaDH3.rotation.y=-0.5;
            gambaDH3.rotation.x = 0; 
            piedeDH3.rotation.x=1.1; 
            polDH3.rotation.x=0;

            //HUMANDJ
            hips.rotation.y = 0.08;

            //HUMAN4
            fianchiH4.rotation.y=1;
            bustoH4.rotation.y=0;
            busto_2H4.rotation.y=0;
            busto_3H4.rotation.y=0;
            abraccioSH4.rotation.x=-0.5;
            manoSH4.rotation.z=0.5;
            gambaSH4.rotation.y=0.5;
            gambaDH4.rotation.y=-0.5;
            gambaDH4.rotation.x = 0; 
            piedeDH4.rotation.x=1.1; 
            polDH4.rotation.x=0;
            
    });
    var tween2= new TWEEN.Tween(final)
        .to({y: 180.5}, 80)
        //.delay(600)
        .easing(TWEEN.Easing.Linear.Out)
        .onUpdate(function(){
            //GOKU
            testaG.rotation.y = -0.2;
            spallaSG.rotation.y = 5.9;  
            spallaDG.rotation.y = 6.9;  
            manoDG.rotation.x = 5.8;    
            gambaSG.rotation.x = -7.9;   
            
            //ZORO
            testaZ.rotation.z = -0.4;
            abraccioDZ.rotation.x=-1.2;
            abraccioSZ.rotation.x=1.2;  
            braccioSZ.rotation.y=5.6;  
            gambaSZ.rotation.x=2.8;

            //HUMAN
            fianchiH.rotation.y=1.1;
            bustoH.rotation.y=0.1;
            busto_2H.rotation.y=0.1;
            busto_3H.rotation.y=0.1;
            abraccioSH.rotation.x=-0.4;
            manoSH.rotation.z=0.6;
            gambaSH.rotation.y=0.6;
            gambaDH.rotation.y=-0.4;
            gambaDH.rotation.x = -0.1; 
            piedeDH.rotation.x=1; 
            polDH.rotation.x=-0.1;
            
            //HUMAN2
            fianchiH2.rotation.y=1.1;
            bustoH2.rotation.y=0.1;
            busto_2H2.rotation.y=0.1;
            busto_3H2.rotation.y=0.1;
            abraccioSH2.rotation.x=-0.4;
            manoSH2.rotation.z=0.6;
            gambaSH2.rotation.y=0.6;
            gambaDH2.rotation.y=-0.4;
            gambaDH2.rotation.x = -0.1; 
            piedeDH2.rotation.x=1 
            polDH2.rotation.x=-0.1 

            //HUMAN3
            fianchiH3.rotation.y=1.1;
            bustoH3.rotation.y=0.1;
            busto_2H3.rotation.y=0.1;
            busto_3H3.rotation.y=0.1;
            abraccioSH3.rotation.x=-0.4;
            manoSH3.rotation.z=0.6;
            gambaSH3.rotation.y=0.6;
            gambaDH3.rotation.y=-0.4;
            gambaDH3.rotation.x = -0.1; 
            piedeDH3.rotation.x=1; 
            polDH3.rotation.x=-0.1;

            //HUMANDJ
            hips.rotation.y = 0.06;
            
            //HUMAN4
            fianchiH4.rotation.y=1.1;
            bustoH4.rotation.y=0.1;
            busto_2H4.rotation.y=0.1;
            busto_3H4.rotation.y=0.1;
            abraccioSH4.rotation.x=-0.4;
            manoSH4.rotation.z=0.6;
            gambaSH4.rotation.y=0.6;
            gambaDH4.rotation.y=-0.4;
            gambaDH4.rotation.x = -0.1; 
            piedeDH4.rotation.x=1; 
            polDH4.rotation.x=-0.1;
    });
    var tween3= new TWEEN.Tween(final)
        .to({y: 180.5}, 80)
        //.delay(600)
        .easing(TWEEN.Easing.Linear.Out)
        .onUpdate(function(){
            //GOKU
            testaG.rotation.y = -0.4;    
            spallaSG.rotation.y = 5.8;
            spallaDG.rotation.y = 6.8;  
            manoDG.rotation.x = 5.6;   
            gambaSG.rotation.x = -7.8;  
            
            //ZORO
            testaZ.rotation.z = -0.3;
            abraccioDZ.rotation.x=-1.4;
            abraccioSZ.rotation.x=1.4;
            braccioSZ.rotation.y=5.7;
            gambaSZ.rotation.x=2.6;

            //HUMAN
            fianchiH.rotation.y=1.2;
            bustoH.rotation.y=0.2;
            busto_2H.rotation.y=0.2;
            busto_3H.rotation.y=0.2;
            abraccioSH.rotation.x=-0.3;
            manoSH.rotation.z=0.7;
            gambaSH.rotation.y=0.7;
            gambaDH.rotation.y=-0.3;
            gambaDH.rotation.x = -0.2;
            piedeDH.rotation.x=0.9;
            polDH.rotation.x=-0.2;

            //HUMAN2
            fianchiH2.rotation.y=1.2;
            bustoH2.rotation.y=0.2;
            busto_2H2.rotation.y=0.2;
            busto_3H2.rotation.y=0.2;
            abraccioSH2.rotation.x=-0.3;
            manoSH2.rotation.z=0.7;
            gambaSH2.rotation.y=0.7;
            gambaDH2.rotation.y=-0.3;
            gambaDH2.rotation.x = -0.2;
            piedeDH2.rotation.x=0.9;
            polDH2.rotation.x=-0.2;

            //HUMAN3
            fianchiH3.rotation.y=1.2;
            bustoH3.rotation.y=0.2;
            busto_2H3.rotation.y=0.2;
            busto_3H3.rotation.y=0.2;
            abraccioSH3.rotation.x=-0.3;
            manoSH3.rotation.z=0.7;
            gambaSH3.rotation.y=0.7;
            gambaDH3.rotation.y=-0.3;
            gambaDH3.rotation.x = -0.2;
            piedeDH3.rotation.x=0.9;
            polDH3.rotation.x=-0.2;

            //HUMANDJ
            hips.rotation.y = 0.04;

            //HUMAN4
            fianchiH4.rotation.y=1.2;
            bustoH4.rotation.y=0.2;
            busto_2H4.rotation.y=0.2;
            busto_3H4.rotation.y=0.2;
            abraccioSH4.rotation.x=-0.3;
            manoSH4.rotation.z=0.7;
            gambaSH4.rotation.y=0.7;
            gambaDH4.rotation.y=-0.3;
            gambaDH4.rotation.x = -0.2;
            piedeDH4.rotation.x=0.9;
            polDH4.rotation.x=-0.2;
    });
    var tween4= new TWEEN.Tween(final)
        .to({y: 180.5}, 80)
        //.delay(600)
        .easing(TWEEN.Easing.Linear.Out)
        .onUpdate(function(){
            //GOKU
            testaG.rotation.y = -0.6;   
            spallaSG.rotation.y = 5.7; 
            spallaDG.rotation.y = 6.7;  
            manoDG.rotation.x = 5.4;     
            gambaSG.rotation.x = -7.7;  
            
            //ZORO
            testaZ.rotation.z = -0.2;
            abraccioDZ.rotation.x=-1.6;
            abraccioSZ.rotation.x=1.6;
            braccioSZ.rotation.y=5.8;
            gambaSZ.rotation.x=2.4;

            //HUMAN
            fianchiH.rotation.y=1.3;
            bustoH.rotation.y=0.3;
            busto_2H.rotation.y=0.3;
            busto_3H.rotation.y=0.3;
            abraccioSH.rotation.x=-0.2;
            manoSH.rotation.z=0.8;
            gambaSH.rotation.y=0.8;
            gambaDH.rotation.y=-0.2;
            gambaDH.rotation.x = -0.3;
            piedeDH.rotation.x=0.8;
            polDH.rotation.x=-0.3;

            //HUMAN2
            fianchiH2.rotation.y=1.3;
            bustoH2.rotation.y=0.3;
            busto_2H2.rotation.y=0.3;
            busto_3H2.rotation.y=0.3;
            abraccioSH2.rotation.x=-0.2;
            manoSH2.rotation.z=0.8;
            gambaSH2.rotation.y=0.8;
            gambaDH2.rotation.y=-0.2;
            gambaDH2.rotation.x = -0.3;
            piedeDH2.rotation.x=0.8;
            polDH2.rotation.x=-0.3;

            //HUMAN3
            fianchiH3.rotation.y=1.3;
            bustoH3.rotation.y=0.3;
            busto_2H3.rotation.y=0.3;
            busto_3H3.rotation.y=0.3;
            abraccioSH3.rotation.x=-0.2;
            manoSH3.rotation.z=0.8;
            gambaSH3.rotation.y=0.8;
            gambaDH3.rotation.y=-0.2;
            gambaDH3.rotation.x = -0.3;
            piedeDH3.rotation.x=0.8;
            polDH3.rotation.x=-0.3;

            //HUMANDJ
            hips.rotation.y = 0.02;

            //HUMAN4
            fianchiH4.rotation.y=1.3;
            bustoH4.rotation.y=0.3;
            busto_2H4.rotation.y=0.3;
            busto_3H4.rotation.y=0.3;
            abraccioSH4.rotation.x=-0.2;
            manoSH4.rotation.z=0.8;
            gambaSH4.rotation.y=0.8;
            gambaDH4.rotation.y=-0.2;
            gambaDH4.rotation.x = -0.3;
            piedeDH4.rotation.x=0.8;
            polDH4.rotation.x=-0.3;
    });
    var tween5= new TWEEN.Tween(final)
        .to({y: 180.5}, 80)
        //.delay(600)
        .easing(TWEEN.Easing.Linear.Out)
        .onUpdate(function(){
            //GOKU
            testaG.rotation.y = -0.8; 
            spallaSG.rotation.y = 5.6; 
            spallaDG.rotation.y = 6.6; 
            manoDG.rotation.x = 5.2;    
            gambaSG.rotation.x = -7.6;  
            
            //ZORO
            testaZ.rotation.z = -0.1;
            abraccioDZ.rotation.x=-1.8;
            abraccioSZ.rotation.x=1.8;
            braccioSZ.rotation.y=5.9;
            gambaSZ.rotation.x=2.2;

            //HUMAN
            fianchiH.rotation.y=1.4;
            bustoH.rotation.y=0.4;
            busto_2H.rotation.y=0.4;
            busto_3H.rotation.y=0.4;
            abraccioSH.rotation.x=-0.1;
            manoSH.rotation.z=0.9;
            gambaSH.rotation.y=0.9;
            gambaDH.rotation.y=-0.1;
            gambaDH.rotation.x = -0.4;
            piedeDH.rotation.x=0.7;
            polDH.rotation.x=-0.4;

            //HUMAN2
            fianchiH2.rotation.y=1.4;
            bustoH2.rotation.y=0.4;
            busto_2H2.rotation.y=0.4;
            busto_3H2.rotation.y=0.4;
            abraccioSH2.rotation.x=-0.1;
            manoSH2.rotation.z=0.9;
            gambaSH2.rotation.y=0.9;
            gambaDH2.rotation.y=-0.1;
            gambaDH2.rotation.x = -0.4;
            piedeDH2.rotation.x=0.7;
            polDH2.rotation.x=-0.4;

            //HUMAN3
            fianchiH3.rotation.y=1.4;
            bustoH3.rotation.y=0.4;
            busto_2H3.rotation.y=0.4;
            busto_3H3.rotation.y=0.4;
            abraccioSH3.rotation.x=-0.1;
            manoSH3.rotation.z=0.9;
            gambaSH3.rotation.y=0.9;
            gambaDH3.rotation.y=-0.1;
            gambaDH3.rotation.x = -0.4;
            piedeDH3.rotation.x=0.7;
            polDH3.rotation.x=-0.4;

            //HUMANDJ
            hips.rotation.y = 0.01;

            //HUMAN4
            fianchiH4.rotation.y=1.4;
            bustoH4.rotation.y=0.4;
            busto_2H4.rotation.y=0.4;
            busto_3H4.rotation.y=0.4;
            abraccioSH4.rotation.x=-0.1;
            manoSH4.rotation.z=0.9;
            gambaSH4.rotation.y=0.9;
            gambaDH4.rotation.y=-0.1;
            gambaDH4.rotation.x = -0.4;
            piedeDH4.rotation.x=0.7;
            polDH4.rotation.x=-0.4;
    });
    var tween6= new TWEEN.Tween(final)
        .to({y: 180.5}, 80)
        //.delay(600)
        .easing(TWEEN.Easing.Linear.Out)
        .onUpdate(function(){
            //GOKU
            testaG.rotation.y = -1;  
            spallaSG.rotation.y = 5.5; 
            spallaDG.rotation.y = 6.5; 
            manoDG.rotation.x = 5;   
            gambaSG.rotation.x = -7.5; 
            
            //ZORO
            testaZ.rotation.z = 0;
            abraccioDZ.rotation.x=-2;
            abraccioSZ.rotation.x=2;
            braccioSZ.rotation.y=6;
            gambaSZ.rotation.x=2;

            //HUMAN
            fianchiH.rotation.y=1.5;
            bustoH.rotation.y=0.5;
            busto_2H.rotation.y=0.5;
            busto_3H.rotation.y=0.5;
            abraccioSH.rotation.x=0;
            manoSH.rotation.z=1;
            gambaSH.rotation.y=1;
            gambaDH.rotation.y=0;
            gambaDH.rotation.x = -0.5; 
            piedeDH.rotation.x=0.6;
            polDH.rotation.x=-0.5;

            //HUMAN2
            fianchiH2.rotation.y=1.5;
            bustoH2.rotation.y=0.5;
            busto_2H2.rotation.y=0.5;
            busto_3H2.rotation.y=0.5;
            abraccioSH2.rotation.x=0;
            manoSH2.rotation.z=1;
            gambaSH2.rotation.y=1;
            gambaDH2.rotation.y=0;
            gambaDH2.rotation.x = -0.5; 
            piedeDH2.rotation.x=0.6;
            polDH2.rotation.x=-0.5;

            //HUMAN3
            fianchiH3.rotation.y=1.5;
            bustoH3.rotation.y=0.5;
            busto_2H3.rotation.y=0.5;
            busto_3H3.rotation.y=0.5;
            abraccioSH3.rotation.x=0;
            manoSH3.rotation.z=1;
            gambaSH3.rotation.y=1;
            gambaDH3.rotation.y=0;
            gambaDH3.rotation.x = -0.5; 
            piedeDH3.rotation.x=0.6;
            polDH3.rotation.x=-0.5;

            //HUMANDJ
            hips.rotation.y = 0.01;

            //HUMAN4
            fianchiH4.rotation.y=1.5;
            bustoH4.rotation.y=0.5;
            busto_2H4.rotation.y=0.5;
            busto_3H4.rotation.y=0.5;
            abraccioSH4.rotation.x=0;
            manoSH4.rotation.z=1;
            gambaSH4.rotation.y=1;
            gambaDH4.rotation.y=0;
            gambaDH4.rotation.x = -0.5; 
            piedeDH4.rotation.x=0.6;
            polDH4.rotation.x=-0.5;
    });
    var tween7= new TWEEN.Tween(final)
        .to({y: 180.5}, 80)
        //.delay(600)
        .easing(TWEEN.Easing.Linear.Out)
        .onUpdate(function(){
            //GOKU
            testaG.rotation.y = -0.8;   
            spallaSG.rotation.y = 5.6; 
            spallaDG.rotation.y = 6.6; 
            manoDG.rotation.x = 5.2;     
            gambaSG.rotation.x = -7.6; 
            
            //ZORO
            testaZ.rotation.z = -0.1;
            abraccioDZ.rotation.x=-1.8;
            abraccioSZ.rotation.x=1.8;
            braccioSZ.rotation.y=5.9;
            gambaSZ.rotation.x=2.2;

            //HUMAN
            fianchiH.rotation.y=1.4;
            bustoH.rotation.y=0.4;
            busto_2H.rotation.y=0.4;
            busto_3H.rotation.y=0.4;
            abraccioSH.rotation.x=-0.1;
            manoSH.rotation.z=0.9;
            gambaSH.rotation.y=0.9;
            gambaDH.rotation.y=-0.1;
            gambaDH.rotation.x = -0.4;
            piedeDH.rotation.x=0.7;
            polDH.rotation.x=-0.4;

            //HUMAN2
            fianchiH2.rotation.y=1.4;
            bustoH2.rotation.y=0.4;
            busto_2H2.rotation.y=0.4;
            busto_3H2.rotation.y=0.4;
            abraccioSH2.rotation.x=-0.1;
            manoSH2.rotation.z=0.9;
            gambaSH2.rotation.y=0.9;
            gambaDH2.rotation.y=-0.1;
            gambaDH2.rotation.x = -0.4;
            piedeDH2.rotation.x=0.7;
            polDH2.rotation.x=-0.4;

            //HUMAN3
            fianchiH3.rotation.y=1.4;
            bustoH3.rotation.y=0.4;
            busto_2H3.rotation.y=0.4;
            busto_3H3.rotation.y=0.4;
            abraccioSH3.rotation.x=-0.1;
            manoSH3.rotation.z=0.9;
            gambaSH3.rotation.y=0.9;
            gambaDH3.rotation.y=-0.1;
            gambaDH3.rotation.x = -0.4;
            piedeDH3.rotation.x=0.7;
            polDH3.rotation.x=-0.4;

            //HUMANDJ
            hips.rotation.y = 0.02;

            //HUMAN4
            fianchiH4.rotation.y=1.4;
            bustoH4.rotation.y=0.4;
            busto_2H4.rotation.y=0.4;
            busto_3H4.rotation.y=0.4;
            abraccioSH4.rotation.x=-0.1;
            manoSH4.rotation.z=0.9;
            gambaSH4.rotation.y=0.9;
            gambaDH4.rotation.y=-0.1;
            gambaDH4.rotation.x = -0.4;
            piedeDH4.rotation.x=0.7;
            polDH4.rotation.x=-0.4;

    });
    var tween8= new TWEEN.Tween(final)
        .to({y: 180.5}, 80)
        //.delay(600)
        .easing(TWEEN.Easing.Linear.Out)
        .onUpdate(function(){
            //GOKU
            testaG.rotation.y = -0.6;  
            spallaSG.rotation.y = 5.7; 
            spallaDG.rotation.y = 6.7;  
            manoDG.rotation.x = 5.4; 
            gambaSG.rotation.x = -7.7; 
            
            //ZORO
            testaZ.rotation.z = -0.2;
            abraccioDZ.rotation.x=-1.6;
            abraccioSZ.rotation.x=1.6;
            braccioSZ.rotation.y=5.8;
            gambaSZ.rotation.x=2.4;

            //HUMAN
            fianchiH.rotation.y=1.3;
            bustoH.rotation.y=0.3;
            busto_2H.rotation.y=0.3;
            busto_3H.rotation.y=0.3;
            abraccioSH.rotation.x=-0.2;
            manoSH.rotation.z=0.8;
            gambaSH.rotation.y=0.8;
            gambaDH.rotation.y=-0.2;
            gambaDH.rotation.x = -0.3;
            piedeDH.rotation.x=0.8;
            polDH.rotation.x=-0.3;

            //HUMAN2
            fianchiH2.rotation.y=1.3;
            bustoH2.rotation.y=0.3;
            busto_2H2.rotation.y=0.3;
            busto_3H2.rotation.y=0.3;
            abraccioSH2.rotation.x=-0.2;
            manoSH2.rotation.z=0.8;
            gambaSH2.rotation.y=0.8;
            gambaDH2.rotation.y=-0.2;
            gambaDH2.rotation.x = -0.3;
            piedeDH2.rotation.x=0.8;
            polDH2.rotation.x=-0.3;

            //HUMAN3
            fianchiH3.rotation.y=1.3;
            bustoH3.rotation.y=0.3;
            busto_2H3.rotation.y=0.3;
            busto_3H3.rotation.y=0.3;
            abraccioSH3.rotation.x=-0.2;
            manoSH3.rotation.z=0.8;
            gambaSH3.rotation.y=0.8;
            gambaDH3.rotation.y=-0.2;
            gambaDH3.rotation.x = -0.3;
            piedeDH3.rotation.x=0.8;
            polDH3.rotation.x=-0.3;

            //HUMANDJ
            hips.rotation.y = 0.04;

            //HUMAN4
            fianchiH4.rotation.y=1.3;
            bustoH4.rotation.y=0.3;
            busto_2H4.rotation.y=0.3;
            busto_3H4.rotation.y=0.3;
            abraccioSH4.rotation.x=-0.2;
            manoSH4.rotation.z=0.8;
            gambaSH4.rotation.y=0.8;
            gambaDH4.rotation.y=-0.2;
            gambaDH4.rotation.x = -0.3;
            piedeDH4.rotation.x=0.8;
            polDH4.rotation.x=-0.3;
    });
    var tween9= new TWEEN.Tween(final)
        .to({y: 180.5}, 80)
        //.delay(600)
        .easing(TWEEN.Easing.Linear.Out)
        .onUpdate(function(){
            //GOKU
            testaG.rotation.y = -0.4;   
            spallaSG.rotation.y = 5.8; 
            spallaDG.rotation.y = 6.8;  
            manoDG.rotation.x = 5.6; 
            gambaSG.rotation.x = -7.8;  
            
            //ZORO
            testaZ.rotation.z = -0.3;
            abraccioDZ.rotation.x=-1.4;
            abraccioSZ.rotation.x=1.4;
            braccioSZ.rotation.y=5.7;
            gambaSZ.rotation.x=2.6;

            //HUMAN
            fianchiH.rotation.y=1.2;
            bustoH.rotation.y=0.2;
            busto_2H.rotation.y=0.2;
            busto_3H.rotation.y=0.2;
            abraccioSH.rotation.x=-0.3;
            manoSH.rotation.z=0.7;
            gambaSH.rotation.y=0.7;
            gambaDH.rotation.y=-0.3;
            gambaDH.rotation.x = -0.2;
            piedeDH.rotation.x=0.9;
            polDH.rotation.x=-0.2;

            //HUMAN2
            fianchiH2.rotation.y=1.2;
            bustoH2.rotation.y=0.2;
            busto_2H2.rotation.y=0.2;
            busto_3H2.rotation.y=0.2;
            abraccioSH2.rotation.x=-0.3;
            manoSH2.rotation.z=0.7;
            gambaSH2.rotation.y=0.7;
            gambaDH2.rotation.y=-0.3;
            gambaDH2.rotation.x = -0.2;
            piedeDH2.rotation.x=0.9;
            polDH2.rotation.x=-0.2;

            //HUMAN3
            fianchiH3.rotation.y=1.2;
            bustoH3.rotation.y=0.2;
            busto_2H3.rotation.y=0.2;
            busto_3H3.rotation.y=0.2;
            abraccioSH3.rotation.x=-0.3;
            manoSH3.rotation.z=0.7;
            gambaSH3.rotation.y=0.7;
            gambaDH3.rotation.y=-0.3;
            gambaDH3.rotation.x = -0.2;
            piedeDH3.rotation.x=0.9;
            polDH3.rotation.x=-0.2;

            //HUMANDJ
            hips.rotation.y = 0.06;

            //HUMAN4
            fianchiH4.rotation.y=1.2;
            bustoH4.rotation.y=0.2;
            busto_2H4.rotation.y=0.2;
            busto_3H4.rotation.y=0.2;
            abraccioSH4.rotation.x=-0.3;
            manoSH4.rotation.z=0.7;
            gambaSH4.rotation.y=0.7;
            gambaDH4.rotation.y=-0.3;
            gambaDH4.rotation.x = -0.2;
            piedeDH4.rotation.x=0.9;
            polDH4.rotation.x=-0.2;
    });
    var tween10= new TWEEN.Tween(final)
        .to({y: 180.5}, 80)
        //.delay(600)
        .easing(TWEEN.Easing.Linear.Out)
        .onUpdate(function(){
            //GOKU
            testaG.rotation.y = -0.2; 
            spallaSG.rotation.y = 5.9; 
            spallaDG.rotation.y = 6.9; 
            manoDG.rotation.x = 5.8; 
            gambaSG.rotation.x = -7.9;  
            
            //ZORO
            testaZ.rotation.z = -0.4;
            abraccioDZ.rotation.x=-1.2;
            abraccioSZ.rotation.x=1.2;
            braccioSZ.rotation.y=5.6;
            gambaSZ.rotation.x=2.8;

            //HUMAN
            fianchiH.rotation.y=1.1;
            bustoH.rotation.y=0.1;
            busto_2H.rotation.y=0.1;
            busto_3H.rotation.y=0.1;
            abraccioSH.rotation.x=-0.4;
            manoSH.rotation.z=0.6;
            gambaSH.rotation.y=0.6;
            gambaDH.rotation.y=-0.4;
            gambaDH.rotation.x = -0.1;
            piedeDH.rotation.x=1;
            polDH.rotation.x=-0.1;

            //HUMAN2
            fianchiH2.rotation.y=1.1;
            bustoH2.rotation.y=0.1;
            busto_2H2.rotation.y=0.1;
            busto_3H2.rotation.y=0.1;
            abraccioSH2.rotation.x=-0.4;
            manoSH2.rotation.z=0.6;
            gambaSH2.rotation.y=0.6;
            gambaDH2.rotation.y=-0.4;
            gambaDH2.rotation.x = -0.1;
            piedeDH2.rotation.x=1;
            polDH2.rotation.x=-0.1;

            //HUMAN3
            fianchiH3.rotation.y=1.1;
            bustoH3.rotation.y=0.1;
            busto_2H3.rotation.y=0.1;
            busto_3H3.rotation.y=0.1;
            abraccioSH3.rotation.x=-0.4;
            manoSH3.rotation.z=0.6;
            gambaSH3.rotation.y=0.6;
            gambaDH3.rotation.y=-0.4;
            gambaDH3.rotation.x = -0.1;
            piedeDH3.rotation.x=1;
            polDH3.rotation.x=-0.1;

            //HUMANDJ
            hips.rotation.y = 0.07;

            //HUMAN4
            fianchiH4.rotation.y=1.1;
            bustoH4.rotation.y=0.1;
            busto_2H4.rotation.y=0.1;
            busto_3H4.rotation.y=0.1;
            abraccioSH4.rotation.x=-0.4;
            manoSH4.rotation.z=0.6;
            gambaSH4.rotation.y=0.6;
            gambaDH4.rotation.y=-0.4;
            gambaDH4.rotation.x = -0.1;
            piedeDH4.rotation.x=1;
            polDH4.rotation.x=-0.1;
    });
    var tween11= new TWEEN.Tween(final)
        .to({y: 180.5}, 80)
        //.delay(600)
        .easing(TWEEN.Easing.Linear.Out)
        .onUpdate(function(){
            //GOKU
            testaG.rotation.y = 0;    
            spallaSG.rotation.y = 6; 
            spallaDG.rotation.y = 7;   
            manoDG.rotation.x = 6;   
            gambaSG.rotation.x = -8;   
            
            //ZORO
            testaZ.rotation.z = -0.5;
            abraccioDZ.rotation.x=-1;
            abraccioSZ.rotation.x=1;
            braccioSZ.rotation.y=5.5;
            gambaSZ.rotation.x=3;

            //HUMAN
            fianchiH.rotation.y=1;
            bustoH.rotation.y=0;
            busto_2H.rotation.y=0;
            busto_3H.rotation.y=0;
            abraccioSH.rotation.x=-0.5;  
            manoSH.rotation.z=0.5;
            gambaSH.rotation.y=0.5;
            gambaDH.rotation.y=-0.5;
            gambaDH.rotation.x = 0;
            piedeDH.rotation.x=1.1;
            polDH.rotation.x=0;

            //HUMAN2
            fianchiH2.rotation.y=1;
            bustoH2.rotation.y=0;
            busto_2H2.rotation.y=0;
            busto_3H2.rotation.y=0;
            abraccioSH2.rotation.x=-0.5;  
            manoSH2.rotation.z=0.5;
            gambaSH2.rotation.y=0.5;
            gambaDH2.rotation.y=-0.5;
            gambaDH2.rotation.x = 0;
            piedeDH2.rotation.x=1.1;
            polDH2.rotation.x=0;

            //HUMAN3
            fianchiH3.rotation.y=1;
            bustoH3.rotation.y=0;
            busto_2H3.rotation.y=0;
            busto_3H3.rotation.y=0;
            abraccioSH3.rotation.x=-0.5;  
            manoSH3.rotation.z=0.5;
            gambaSH3.rotation.y=0.5;
            gambaDH3.rotation.y=-0.5;
            gambaDH3.rotation.x = 0;
            piedeDH3.rotation.x=1.1;
            polDH3.rotation.x=0;

            //HUMAN4
            fianchiH4.rotation.y=1;
            bustoH4.rotation.y=0;
            busto_2H4.rotation.y=0;
            busto_3H4.rotation.y=0;
            abraccioSH4.rotation.x=-0.5;  
            manoSH4.rotation.z=0.5;
            gambaSH4.rotation.y=0.5;
            gambaDH4.rotation.y=-0.5;
            gambaDH4.rotation.x = 0;
            piedeDH4.rotation.x=1.1;
            polDH4.rotation.x=0;

            //HUMANDJ
            hips.rotation.y = 0.08;
    });

    
    
    tween1.chain(tween2);
    tween2.chain(tween3);
    tween3.chain(tween4);
    tween4.chain(tween5);
    tween5.chain(tween6);
    tween6.chain(tween7);
    tween7.chain(tween8);
    tween8.chain(tween9);
    tween9.chain(tween10);
    tween10.chain(tween11);
    tween11.chain(tween1);
}


scene.background = new THREE.TextureLoader().load( "textures/sky.webp" );
const camera = new THREE.PerspectiveCamera( 
    50, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000 );
const renderer = new THREE.WebGLRenderer();
const objects = [];
const controls = new DragControls( objects, camera, renderer.domElement );
controls.enabled = false;


renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = false;
document.body.appendChild( renderer.domElement );

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(10, 40, -62);

orbit.update();

house();

//moon
const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry, material );
sphere.scale.set(0.1,0.1,0.1);
sphere.position.set(-18,32,0)
scene.add( sphere );

var final = {x: 18};
var initial	= { x: -18 };
var tweenHead	= new TWEEN.Tween(initial)
		.to({x: 18}, 10000)
		.delay(200)
		.easing(TWEEN.Easing.Linear.Out)
		.onUpdate(function(){
            sphere.position.x = initial.x;
        });
// build the tween to go backward
var tweenBack	= new TWEEN.Tween(final)
    .to({x: -18}, 10000)
    .delay(200)
    .easing(TWEEN.Easing.Linear.Out)
    .onUpdate(function(){
        sphere.position.x = final.x;
    });

// after tweenHead do tweenBack
tweenHead.chain(tweenBack);
// after tweenBack do tweenHead, so it is cycling
tweenBack.chain(tweenHead);

// start the first
tweenHead.start();


//luffy();
zoro();
goku();
light();
animation();
djboard();
human();
human2();
human3();
human4();
humandj();


//the page is responsive
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//button of start animation
song=canzone1;
var music = new Audio(song);
var rad = document.form.song;
var prev = null;
for (var i = 0; i < rad.length; i++) {
    rad[i].addEventListener('change', function() {
        if(this !== prev) {
            prev=this;
            music.pause();
        }
        if(this.value == 1) {
            song=canzone1;
            music = new Audio(song);
            if(start) music.play();
        }
        else if(this.value == 2) {
            song=canzone2;
            music = new Audio(song);
            if(start) music.play();
        }
        else if(this.value == 3) {
            song=canzone3;
            music = new Audio(song);
            if(start) music.play();
        }
    });
}

document.getElementById("start").onclick = function(event){
    if(!start){
        document.getElementById("start").innerText = "Stop";
        start = true;  
        music.play();
        tween1.start(); 
        
    }
    else{
        start = false;
        document.getElementById("start").innerText = "Start";
        music.pause();
        tween1.stop(); 

    }
}

//button light
document.getElementById("light").onclick = function(event){
    if(flagL){
        scene.remove(spotLight);
        scene.remove(spotLight2);
        scene.remove(spotLight3);
        scene.remove(spotLight4);
        flagL=!flagL;
        document.getElementById("light").innerText = "Turn on light";
    }
    else {
        scene.add(spotLight);
        scene.add(spotLight2);
        scene.add(spotLight3);
        scene.add(spotLight4);
        flagL=!flagL;
        document.getElementById("light").innerText = "Turn off light";
    }
}

//button of selected
document.getElementById("grab").onclick = function(event){
    if(flagG){
        //window.alert("GRAB OFF");
        controls.enabled = false;
        flagG=!flagG;
        document.getElementById("grab").innerText = "Selected: Off";
    }
    else {
        //window.alert("GRAB ON");
        controls.enabled = true;
        controls.addEventListener( 'dragstart', function ( event ) {

            event.object.material.emissive.set( 0xaaaaaa );
        
        } );
        controls.addEventListener( 'dragend', function ( event ) {

            event.object.material.emissive.set( 0x000000 );
        
        } );
        flagG=!flagG;
        document.getElementById("grab").innerText = "Selected: On";
    }
}

function animate(time) {
    objects.forEach(function(object) {
        //object.rotation.x = time / 1000;
        //object.rotation.z = time / 1000;
        //object.position.y = 0.5 + 0.5 * Math.abs(Math.sin(time / 1000));
        object.rotation.y = Math.PI;
    });
    TWEEN.update(time);
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);