import { useState, useEffect } from "react";
import "./TimerDemo.css";

function TimerDemo() {
    const [segundos, setSegundos] = useState<number>(0);

    useEffect(() => {
        const id = setInterval(() => {
            setSegundos(s => s + 1);
        }, 1000);

        return () => {
            clearInterval(id);
            console.log("Intervalo eliminado");
        }
    }, [])

    return <p className="timer-count">Segundos desde que abriste: {segundos}</p>;
}

export default TimerDemo