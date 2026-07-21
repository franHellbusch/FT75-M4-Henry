import { useState, useEffect } from "react";

interface Joke {
    value: string;
}

function FetchOnMount() {
    const [joke, setJoke] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchJoke = async () => {
            try {
                const res = await fetch("https://api.chucknorris.io/jokes/random", {
                    signal: controller.signal,
                });
                if (!res.ok) throw new Error("Error al obtener el chiste");
                const data: Joke = await res.json();
                setJoke(data.value);
                setLoading(false);
            } catch (err) {
                if (err instanceof DOMException && err.name === "AbortError") return;
                setError((err as Error).message)
                setLoading(false);
            }
        }

        fetchJoke()

        return () => {
            controller.abort();
        }
    }, [])

    if (loading) return <p className="joke-loading">Cargando...</p>;
    if (error) return <p className="joke-error">Error: {error}</p>;
    return <p className="joke-text">{joke}</p>;
}

export default FetchOnMount