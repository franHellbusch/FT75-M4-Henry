import { validateTask } from "../../helpers/validateTask";
import "./TaskForm.css"
import { useState } from "react";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export interface TaskFormState {
    title: string;
    description: string;
}

interface TaskFormProps {
    onAddTask: (formData: { title: string; description: string }) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
    const [form, setForm] = useState<TaskFormState>({ title: "", description: "" });
    const [errors, setErrors] = useState<Partial<Record<keyof TaskFormState, string>>>({});
    const [status, setStatus] = useState<SubmitStatus>("idle");

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()

        const validation = validateTask(form);

        if (Object.keys(validation).length > 0) {
            setErrors(validation);
            return;
        }

        setErrors({});

        setStatus("loading");
        await new Promise(res => setTimeout(res, 600));

        onAddTask({ title: form.title.trim(), description: form.description.trim() });
        setForm({ title: "", description: "" });

        setStatus("success");
        setTimeout(() => setStatus("idle"), 2000);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <form className="task-form" onSubmit={handleSubmit} noValidate>
            <div className="task-form__field">
                <input
                    className="task-form__input"
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Titulo de la tarea"
                    disabled={status === "loading"}
                />
                {errors.title && <p className="task-form__error">{errors.title}</p>}
            </div>

            <div className="task-form__field">
                <textarea
                    className="task-form__textarea"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Descripcion (opcional)"
                    rows={2}
                    disabled={status === "loading"}
                />
                {errors.description && <p className="task-form__error">{errors.description}</p>}
            </div>
            <button
                className={`task-form__btn${status === "loading" ? " task-form__btn--loading" : ""}`}
                type="submit"
                disabled={status === "loading"}>
                Agregar tarea
            </button>
            {status === "success" && <p className="task-form__success">Tarea agregada.</p>}
        </form >
    )
}

export default TaskForm