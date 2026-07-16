interface GreetingProps {
    name: string;
    message?: string; // prop opcional
}

function Greeting({ name, message = "Bienvenido" }: GreetingProps) {
    return (
        <div>
            <h2>Hola, {name}</h2>
            <p>{message}</p>
        </div>
    );
}

export default Greeting