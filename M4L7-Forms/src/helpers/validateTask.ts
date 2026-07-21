import type { TaskFormState } from "../components/TaskForm/TaskForm";

export function validateTask(form: TaskFormState): Partial<Record<keyof TaskFormState, string>> {
    const errors: Partial<Record<keyof TaskFormState, string>> = {};

    if (!form.title.trim()) {
        errors.title = "El titulo es obligatorio.";
    } else if (form.title.trim().length < 3) {
        errors.title = "Minimo 3 caracteres.";
    }

    if (form.description.length > 200) {
        errors.description = "Maximo 200 caracteres.";
    }

    return errors
}