// Inferencia -- TypeScript deduce el tipo
let mensaje = "Hola TypeScript"; // string
const activo = true;               // boolean
const cantidad = 42;               // number

let titulo: string;
titulo = "Mi primera tarea";

const ids: (string | number)[] = ["t1", "t2", "t3"];
const prioridades: Array<number> = [1, 2, 3];

const respuesta: [number, string] = [200, "OK"];

function saludar(nombre: string, saludo: string = "Hola"): string {
    return `${saludo}, ${nombre}!`;
}

function crearTarea(texto: string, asignado?: string): void {
    console.log(`Tarea: ${texto}, asignado a: ${asignado ?? "nadie"}`);
}

let formatearTitulo: (texto: string) => string;

formatearTitulo = (texto) => {
    return texto
}

type TaskStatus = "pending" | "in-progress" | "done";

interface Task {
    id: string;
    text: string;
    status: TaskStatus;
    assignedTo?: string;
}

const tarea1: Task = {
    id: "1",
    text: "Disenar la base de datos",
    status: "pending"
};

const tarea2: Task = {
    id: "2",
    text: "Revisar PRs",
    status: "in-progress",
    assignedTo: "u42"
};

interface AdminTask extends Task {
    priority: "high" | "medium" | "low";
}

const tareaAdmin: AdminTask = {
    id: "3",
    text: "Fix bug en prod",
    status: "in-progress",
    priority: "high"
};

// let input: any = "42";
// const resultado = input.toFixed(2);

let input: unknown = "125.40";

// narrowing
if (typeof input === "string") {
    const num = Number(input);
    console.log(num.toFixed(2)); // OK
}

if (typeof input === "number") {
    const num = Number(input);
    console.log(num.toFixed(2)); // OK
}

function parseId(id: string | number): string {
    if (typeof id === "number") {
        return id.toString();
    }
    return id.trim();
}