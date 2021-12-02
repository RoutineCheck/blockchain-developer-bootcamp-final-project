

const Application = PIXI.Application;

const app = new Application({
    width: 500,
    height: 500,
    transparent: false,
    antialias: true,
});

app.renderer.backgroundColor = 0x23395D;

app.renderer.resize(window.innerWidth, window.innerHeight);

app.renderer.view.style.position = 'absolute';



document.body.appendChild(app.view);

const Graphics = PIXI.Graphics;

const rectangle = new Graphics();
rectangle.beginFill(0xAA33BB)
.lineStyle(4, 0xFFEA00, 1)
.drawRect(200, 200, 100, 120)
.endFill();

app.stage.addChild(rectangle);

const poly = new Graphics();
poly.beginFill(0xFF66FF)
.lineStyle(5, 0xFFEA00, 1)
.drawPolygon([
    600, 50,
    800, 150,
    900, 300,
    400, 400
])
.endFill();



const circle = new Graphics();
circle.beginFill(0x22AACC)
.drawCircle(440, 200, 80)
.endFill();

app.stage.addChild(circle);
app.stage.addChild(poly); 

const line = new Graphics();
line.lineStyle(5, 0xFFEA00, 1)
.moveTo(1500, 100)
.lineTo(1500, 800);

app.stage.addChild(line);

const torus = new Graphics();
torus.beginFill(0xFFFDDD)
.drawTorus(100, 700, 80, 100, 0, Math.PI/2)
.endFill();

app.stage.addChild(torus);

const star = new Graphics();
star.beginFill(0xADADAD)
.drawStar(900, 700, 30, 80)
.endFill();

app.stage.addChild(star);



const style = new PIXI.TextStyle({
    fontFamily: 'Montserrat',
    fontSize: 48,
    fill: 'deepskyblue',
    stroke: '#ffffff',
    strokeThickness: 4,
    dropShadow: true,
    dropShadowDistance: 10,
    dropShadowAngle: Math.PI / 2,
    dropShadowBlur: 4,
    dropShadowColor: '#000000'
});

const myText = new PIXI.Text('Hello World!', style);
app.stage.addChild(myText);

myText.text = 'Text Changed!';

myText.style.wordWrap = true;
myText.style.wordWrapWidth = 100;
myText.style.align = 'center';


// app.ticker.add(delta => loop(delta));

// function loop(delta) {

//     // char1Sprite.x += 1;

//     // char1Sprite.rotation += 0.01;

//     // const rect = new Graphics();
//     // rect.beginFill(0xFFFFFF)
//     // .lineStyle(4, 0xFFEA00, 1)
//     // .drawRect(Math.random() * app.screen.width, Math.random() * app.screen.height, 10, 10)
//     // .endFill();

//     // app.stage.addChild(rect);


// }

// const char1Texture = PIXI.Texture.from('../Game Files/Animations/Sprite Animations/SeaweedFinalFade.gif');
// const char1Sprite = new PIXI.Sprite(char1Texture);

const char1Sprite = PIXI.Sprite.from('../Game Files/Animations/Sprite Animations/SeaweedFinalFade.gif');
app.stage.addChild(char1Sprite);

// char1Sprite.width = 100;
// char1Sprite.height = 200;


// char1Sprite.scale.x = 1.5;
// char1Sprite.scale.y = 1.5;
// char1Sprite.scale.set(2, 2);

// char1Sprite.x = 200;
// char1Sprite.y = 400;
char1Sprite.position.set(800, 400);

// char1Sprite.rotation = 1;

// char1Sprite.anchor.x = 0.5;
// char1Sprite.anchor.y = 0.5;

char1Sprite.anchor.set(0.5, 0.5);

char1Sprite.interactive = true;
char1Sprite.buttonMode = true;

char1Sprite.on('pointerdown', function() {
    char1Sprite.scale.x += 0.1;
    char1Sprite.scale.y += 0.1;
})

document.addEventListener('keydown', function(e) {
    if(e.key === 'ArrowRight')
        char1Sprite.x += 10;
    if(e.key === 'ArrowLeft')
        char1Sprite.x -= 10;
})

// const container = new PIXI.Container();

// const char2Sprite = PIXI.Sprite.from('../Game Files/Animations/Sprite Animations/BlueFishFinal4.gif');
// container.addChild(char2Sprite);

// const char3Sprite = PIXI.Sprite.from('../Game Files/Sprites/backgroundItems/BackgroundItems/Final/coralReef2.png');
// container.addChild(char3Sprite);

// app.stage.addChild(container);

// char2Sprite.position.set(1000, 500);

// console.log(char3Sprite.x);
// console.log(char3Sprite.getGlobalPosition());

// console.log(container.children);

const particleContainer = new PIXI.ParticleContainer(1000, {
    position: true,
    rotation: true,
    vertices: true,
    tint: true,
    uvs: true,
});

const loader = PIXI.Loader.shared;

// loader.add([ '../Game Files/Sprites/backgroundItems/BackgroundItems/Final/RaggedRock.png', '../Game Files/Sprites/backgroundItems/BackgroundItems/Final/foliage.png' ])
// // .add('char5Texture', '../Game Files/Sprites/backgroundItems/BackgroundItems/Final/foliage.png')
// .load(setup);

// function setup(loader, resources) {
// const char4Sprite = new PIXI.Sprite(
//     // resources.char4Texture.texture
//     resources['../Game Files/Sprites/backgroundItems/BackgroundItems/Final/RaggedRock.png'].texture
// );
// char4Sprite.y = 400;
// app.stage.addChild(char4Sprite);

// }

// loader.onLoad.add(function () {
//     console.log('on load');

// })

// loader.onError.add(function () {
//     console.log('on error');
    
// })

// loader.onProgress.add(function () {
//     console.log('on progress');
    
// })

// loader.add('tileset', '../Game Files/Animations/Sprite Animations/SeaweedFFTP/SFFSpriteSheet.json')
// .load(setup);
// function setup(loader, resources) {
//     const frame_00Texture = PIXI.Texture.from('frame_0_delay-0.04s.gif');
//     const frame_00Sprite = new PIXI.Sprite(frame_0Texture);
//     frame_0Sprite.position.set(800, 300);
//     // frame_0Texture.scale.set(1,1);
//     app.stage.addChild(frame_0Sprite);

//     // const texture1 = resources.tileset.texture;
//     // const rect1 = new PIXI.Rectangle(0, 0, 400, 100);
//     // texture1.frame = rect1;
//     // const spr1 = new PIXI.Sprite(texture1);
//     // // spr1.scale.set(2, 2);
//     // app.stage.addChild(spr1);

//     // const texture2 = new PIXI.Texture(resources.tileset.texture);
//     // const rect2 = new PIXI.Rectangle(400, 0, 400, 100);
//     // texture1.frame = rect2;
//     // const spr2 = new PIXI.Sprite(texture2);
//     // // spr2.scale.set(2, 2);
//     // spr2.position.set(400, 0);
//     // app.stage.addChild(spr2);
// }

loader.add('tileset', '../Game Files/Animations/Sprite Animations/SeaweedFFTP/SFFSpriteSheet.json')
.load(setup);
function setup(loader, resources) {
    const textures = [];
    for (let i = 0; i < 42; i++) {
        const texture = PIXI.Texture.from(`frame_${i}_delay-0.04s.gif`);
        textures.push(texture);
    }
   const seaweedf = new PIXI.AnimatedSprite(textures);
   seaweedf.position.set(800, 300);
    seaweedf.scale.set(1,1);
    app.stage.addChild(seaweedf);
    seaweedf.play();
    seaweedf.animationSpeed = 0.5;

    const blurFilter = new PIXI.filters.BlurFilter(4);
    seaweedf.filters = [blurFilter];
    blurFilter.blur = 2;
   
}

const grass1Texture = PIXI.Texture.from('../Game Files/Sprites/backgroundItems/BackgroundItems/Final/Shadows/foliageShadow.png');
const grass1Sprite = new PIXI.TilingSprite(
    grass1Texture,
    app.screen.width,
    app.screen.height
    );

    app.ticker.add(function() {
        grass1Sprite.tilePosition.x += 1;
        grass1Sprite.tilePosition.y = 1;
    });
grass1Sprite.tileScale.set(0.5, 0.5);
app.stage.addChild(grass1Sprite);

const sound = new Howl({
    src: ['../Game Files/Music/mixkit-sinking-in-the-sea-1178-loop.wav'],
    loop:true
});

sound.play();