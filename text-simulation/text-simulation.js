let engine;
let canvas;
let particles = [];
let boxes = [];
let letter;
let fontSize = 40;
let font;
let bbox;
let world;

const { Engine, World, Bodies, Mouse, MouseConstraint, Runner } = Matter;

class Particle {
    constructor(letter, body) {
        this.letter = letter;
        this.body = body;
    }
}

function preload() {
    font = loadFont('assets/ChakraPetch-Bold.ttf');
}

function setup() {
    // setup canvas to fill page background
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    // canvas.style('position', 'fixed');
    canvas.style('z-index', '-1');
    canvas.id('canvas-words')
    let mouseField = document.querySelector('body');



    // create an engine
    engine = Engine.create();
    world = engine.world;


    var canvasmouse = Matter.Mouse.create(mouseField); // canvas.elt
    canvasmouse.pixelRatio = pixelDensity();
    var options = {
        mouse: canvasmouse
    }

    mConstraint = Matter.MouseConstraint.create(engine, options);
    Matter.World.add(world, mConstraint)

    world.gravity.y = .1;
    world.gravity.y = .1;
    // world.gravity.y = .3;

    // Add particles
    generateParticles();

    options = {
        bodyA: particles[0].body,
        bodyB: particles[1].body,
    }
    constraint = Matter.Constraint.create(options)
    Matter.World.add(world, constraint)

    // Add walls
    ground = Bodies.rectangle(width / 2, height, windowWidth, 10, { isStatic: true });
    World.add(world, ground);

    stroke(255);
    top = Bodies.rectangle(width / 2, windowHeight, windowWidth, 10, { isStatic: true });
    World.add(world, top);

    leftWall = Bodies.rectangle(0, height / 2, 10, windowHeight, { isStatic: true });
    World.add(world, leftWall);

    rightWall = Bodies.rectangle(width, height / 2, 30, windowHeight, { isStatic: true });
    World.add(world, rightWall);

    // run the engine
    Runner.run(engine);
}

function draw() {
    background('#dcdcdc');

    fill('red');
    rect(width / 2, windowHeight, windowWidth, 100);



    textSize(fontSize);
    textFont(font);
    textAlign(CENTER, CENTER)
    for (let particle of particles) {
        push()
        translate(particle.body.position.x, particle.body.position.y)
        rotate(particle.body.angle)
        bbox = font.textBounds(particle.letter, 0, 0, fontSize);
        noStroke()
        fill('white')
        rect(bbox.x, bbox.y, bbox.w, bbox.h);

        fill(0)

        text(particle.letter, 0, 0);
        pop()
    }
}

function generateParticles() {

    for (let i = 0; i < 150; i++) {
        let letter = random(["React", "CSS", "JavaScript", "Front-End", "TypeScript", "Next.js", "Vue.js", "Angular", "RxJs", "Node.js", "Express", "Next", "p5.js"]);
        let bounds = font.textBounds(letter, random(width), random(height), fontSize);

        let body = Bodies.rectangle(
            bounds.x + bounds.w / 2,
            bounds.y + bounds.h / 2,
            bounds.w,
            bounds.h);

        body.restitution = 1;

        // let velocity = Matter.Vector.create(0, random(-1, 1))
        // Matter.Body.setVelocity(body, velocity)

        Matter.World.add(engine.world, body);

        let particle = new Particle(letter, body)

        particles.push(particle)
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}