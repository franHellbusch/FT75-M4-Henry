interface EstadoTareaProps {
    completada: boolean
}

function EstadoTarea({ completada }: EstadoTareaProps) {
    return <div>
        {/* Ternario: muestra una cosa u otra */}
        <span>{completada ? "Completada" : "Pendiente"}</span>

        {/* && : muestra solo si la condicion es verdadera */}
        {completada && <span>Bien hecho!</span>}
    </div>
}

export default EstadoTarea