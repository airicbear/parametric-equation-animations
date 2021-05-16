const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const WIDTH = canvas.getAttribute('width');
const HEIGHT = canvas.getAttribute('height');
const x0 = WIDTH / 2;
const y0 = HEIGHT / 2;
let id = 0;
let r = 100;
let t = 0;
let a = 1;
let b = 6;
let c = 14;
var dt = 0.025;

function stop() {
    window.cancelAnimationFrame(id);
    reset();
    clear();
}

function reset() {
    t = 0;
}

function defaults() {
    clear();
    reset();
    r = 100;
    dt = 0.100;
    document.getElementById('r').value = '100';
    document.getElementById('dt').value = '0.025';
    updateRLabel();
    updateDtLabel();
}

function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = '#3057E1';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    drawGrid();
}

function updateRLabel() {
    document.getElementById('label_r').innerHTML = `r = ${document.getElementById("r").value}`;
}

function updateDtLabel() {
    document.getElementById('label_dt').innerHTML = `&Delta;t = ${document.getElementById("dt").value}`;
}

function updateALabel() {
    document.getElementById('label_a').innerHTML = `a = ${document.getElementById("a").value}`;
}

function updateBLabel() {
    document.getElementById('label_b').innerHTML = `b = ${document.getElementById("b").value}`;
}

function updateCLabel() {
    document.getElementById('label_c').innerHTML = `c = ${document.getElementById("c").value}`;
}

function updateR() {
    clear();
    reset();
    r = Number(document.getElementById("r").value);
    updateRLabel();
}

function updateDt() {
    clear();
    reset();
    dt = Number(document.getElementById("dt").value);
    updateDtLabel();
}

function updateA() {
    clear();
    reset();
    a = Number(document.getElementById("a").value);
    updateALabel();
}

function updateB() {
    clear();
    reset();
    b = Number(document.getElementById("b").value);
    updateBLabel();
}

function updateC() {
    clear();
    reset();
    c = Number(document.getElementById("c").value);
    updateCLabel();
}

function highlight(id) {
    document.getElementById("equations").childNodes.forEach(function (element) {
        element.style = "background-color: none;";
    });
    document.getElementById(id).style = "background-color: #4A6DE5;";
}

function init() {
    clear();
    drawEQ1();
    highlight('eq1');
    updateRLabel();
    updateDtLabel();
    updateALabel();
    updateBLabel();
    updateCLabel();
    katex.render("x(t) = r\\cos{(at)}; \\quad y(t) = r\\sin{(at)}", document.getElementById('eq1'), { throwOnError: false });
    katex.render("x(t) = r\\cos^2{(at)}; \\quad y(t) = r\\sin^2{(at)}", document.getElementById('eq2'), { throwOnError: false });
    katex.render("x(t) = r\\cos^3{(at)}; \\quad y(t) = r\\sin^3{(at)}", document.getElementById('eq3'), { throwOnError: false });
    katex.render("x(t) = r\\sin{(t)} \\left(e^{\\cos{(t)}} - 2 \\cos{(4t)} - \\sin^5{\\left(\\frac{t}{12}\\right)}\\right) \\\\ y(t) = r\\cos{(t)} \\left(e^{\\cos{(t)}} - 2 \\cos{(4t)} - \\sin^5{\\left(\\frac{t}{12}\\right)}\\right)", document.getElementById('eq4'), { throwOnError: false });
    katex.render("x(t) = r\\left(\\cos{(at)} + \\frac{\\cos{(bt)}}{2} + \\frac{\\sin{(ct)}}{3}\\right) \\\\ y(t) = r\\left(\\sin{(at)} + \\frac{\\sin{(bt)}}{2} + \\frac{\\cos{(ct)}}{3}\\right)", document.getElementById('eq5'), { throwOnError: false });
}

function drawGrid(ndivs = 15) {
    ctx.strokeStyle = '#4A6DE5';
    
    for (let i = 0; i < ndivs; i++) {
        ctx.beginPath();
        ctx.moveTo(i * (WIDTH / ndivs), 0);
        ctx.lineTo(i * (WIDTH / ndivs), HEIGHT);
        ctx.stroke();
    }
    for (let i = 0; i < ndivs; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * (WIDTH/ndivs));
        ctx.lineTo(WIDTH, i * (WIDTH/ndivs));
        ctx.stroke();
    }
}

function plot(x, y) {
    ctx.strokeStyle = '#CED8F7';
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0 + x, y0 - y);
    ctx.stroke();
    t += dt;
}

// Circle
function drawEQ1() {
    let x = r * Math.cos(a*t);
    let y = r * Math.sin(a*t);

    plot(x, y);

    id = window.requestAnimationFrame(drawEQ1);
}

// Right triangle
function drawEQ2() {
    let x = r * Math.pow(Math.cos(a*t), 2);
    let y = r * Math.pow(Math.sin(a*t), 2);

    plot(x, y);

    id = window.requestAnimationFrame(drawEQ2);
}

// x(t) = r cos^3(t)
// y(t) = r sin^3(t)
function drawEQ3() {
    let x = r * Math.pow(Math.cos(a*t), 3);
    let y = r * Math.pow(Math.sin(a*t), 3);
    
    plot(x, y);

    id = window.requestAnimationFrame(drawEQ3);
}

// Butterfly
function drawEQ4() {
    let x = r * Math.sin(t) * (Math.exp(Math.cos(t)) - 2*Math.cos(4*t) - Math.pow(Math.sin(t/12), 5));
    let y = r * Math.cos(t) * (Math.exp(Math.cos(t)) - 2*Math.cos(4*t) - Math.pow(Math.sin(t/12), 5));

    plot(x, y);

    id = window.requestAnimationFrame(drawEQ4);
}

function drawEQ5() {
    let x = r * (Math.cos(a*t) + Math.cos(b*t)/2 + Math.sin(c*t)/3);
    let y = r * (Math.sin(b*t) + Math.sin(b*t)/2 + Math.cos(c*t)/3);

    plot(x, y);

    id = window.requestAnimationFrame(drawEQ5);
}

init();
