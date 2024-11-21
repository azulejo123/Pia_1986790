// Login Functionality
const loginContainer = document.getElementById('login-container');
const menuContainer = document.getElementById('menu-container');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const errorMessage = document.getElementById('error-message');

// User Credentials
const USERNAME = "Daniel";
const PASSWORD = "admin";

// Structures
let structure = null;
let values = [];

// Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

// Tree Structure
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
let root = null;

// Linked List
class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
let head = null;

// Login Button Event
loginBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    if (username === USERNAME && password === PASSWORD) {
        loginContainer.classList.add('hidden');
        menuContainer.classList.remove('hidden');
    } else {
        errorMessage.textContent = "Nombre de usuario o contraseña incorrectos.";
    }
});

// Select Structure
function selectStructure(selected) {
    structure = selected;
    values = [];
    root = null;
    head = null;
    updateCanvas();
    document.getElementById('info').textContent = `Estructura seleccionada: ${selected}`;
}

// Insert Value
function insertValue() {
    if (!structure) {
        alert('Seleccione una estructura primero.');
        return;
    }
    const value = prompt('Ingrese un valor a insertar:');
    if (value === null || value === "") return;

    if (structure === 'stack') {
        values.push(value);
    } else if (structure === 'queue') {
        values.push(value);
    } else if (structure === 'tree') {
        if (!root) {
            root = new TreeNode(value);
        } else {
            const parentValue = prompt('Ingrese el valor del nodo padre:');
            const direction = prompt('¿Dónde desea insertar este nodo? (izquierda/derecha):');
            insertTreeNode(root, value, parentValue, direction);
        }
    } else if (structure === 'list') {
        if (!head) {
            head = new ListNode(value);
        } else {
            let current = head;
            while (current.next) {
                current = current.next;
            }
            current.next = new ListNode(value);
        }
    }
    updateCanvas();
}

// Remove Value
function removeValue() {
    if (!structure) {
        alert('Seleccione una estructura primero.');
        return;
    }

    if (structure === 'stack') {
        if (values.length === 0) {
            alert('La pila está vacía.');
            return;
        }
        values.pop();
    } else if (structure === 'queue') {
        if (values.length === 0) {
            alert('La cola está vacía.');
            return;
        }
        values.shift();
    } else if (structure === 'tree') {
        const valueToRemove = prompt('Ingrese el valor del nodo a eliminar:');
        root = deleteTreeNode(root, valueToRemove);
    } else if (structure === 'list') {
        const valueToRemove = prompt('Ingrese el valor a eliminar:');
        head = deleteListNode(head, valueToRemove);
    }
    updateCanvas();
}

// Insert into Tree
function insertTreeNode(node, value, parentValue, direction) {
    if (!node) return false;
    if (node.value === parentValue) {
        if (direction === 'izquierda' && !node.left) {
            node.left = new TreeNode(value);
            return true;
        } else if (direction === 'derecha' && !node.right) {
            node.right = new TreeNode(value);
            return true;
        } else {
            alert('La posición está ocupada o no es válida.');
            return false;
        }
    }
    return insertTreeNode(node.left, value, parentValue, direction) || insertTreeNode(node.right, value, parentValue, direction);
}

// Delete Tree Node
function deleteTreeNode(node, value) {
    if (!node) return null;
    if (node.value === value) {
        if (!node.left && !node.right) return null;
        if (node.left && !node.right) return node.left;
        if (!node.left && node.right) return node.right;
        let successor = node.right;
        while (successor.left) successor = successor.left;
        node.value = successor.value;
        node.right = deleteTreeNode(node.right, successor.value);
        return node;
    }
    node.left = deleteTreeNode(node.left, value);
    node.right = deleteTreeNode(node.right, value);
    return node;
}

// Delete List Node
function deleteListNode(head, value) {
    if (!head) return null;
    if (head.value === value) return head.next;
    let current = head;
    while (current.next && current.next.value !== value) {
        current = current.next;
    }
    if (current.next) {
        current.next = current.next.next;
    }
    return head;
}

// Draw Tree
function drawTree(node, x, y, angle, depth, spacing) {
    if (!node) return;
    const length = 50 + depth * 10;
    const x2 = x + Math.cos(angle) * length;
    const y2 = y + Math.sin(angle) * length;

    if (node.left) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        drawTree(node.left, x2, y2, angle - spacing, depth + 1, spacing * 0.8);
    }

    if (node.right) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        drawTree(node.right, x2, y2, angle + spacing, depth + 1, spacing * 0.8);
    }

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = 'lightblue';
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.fillText(node.value, x - 10, y + 5);
}

// Update Canvas
function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (structure === 'stack') {
        for (let i = 0; i < values.length; i++) {
            ctx.fillStyle = 'lightblue';
            ctx.fillRect(350, 350 - i * 40, 100, 30);
            ctx.strokeRect(350, 350 - i * 40, 100, 30);
            ctx.fillStyle = 'black';
            ctx.fillText(values[i], 375, 370 - i * 40);
        }
    } else if (structure === 'queue') {
        for (let i = 0; i < values.length; i++) {
            ctx.fillStyle = 'lightgreen';
            ctx.fillRect(50 + i * 60, 200, 50, 30);
            ctx.strokeRect(50 + i * 60, 200, 50, 30);
            ctx.fillStyle = 'black';
            ctx.fillText(values[i], 65 + i * 60, 220);
        }
    } else if (structure === 'tree') {
        drawTree(root, canvas.width / 2, 50, Math.PI / 2, 0, Math.PI / 4);
    } else if (structure === 'list') {
        let current = head;
        let x = 50;
        while (current) {
            ctx.fillStyle = 'lightcoral';
            ctx.fillRect(x, 200, 80, 30);
            ctx.strokeRect(x, 200, 80, 30);
            ctx.fillStyle = 'black';
            ctx.fillText(current.value, x + 30, 220);
            if (current.next) {
                ctx.beginPath();
                ctx.moveTo(x + 80, 215);
                ctx.lineTo(x + 100, 215);
                ctx.stroke();
            }
            x += 100;
            current = current.next;
        }
    }
}
