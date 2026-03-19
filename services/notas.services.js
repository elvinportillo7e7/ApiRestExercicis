import { notas } from "../data/notas.js";

// Valida campos mínimos notas
function validateStudent(obj) {
    if (!obj || typeof obj !== "object") return "Body inválido";
    if (!obj.id || !obj.studentId || !obj.modulo || !obj.nota) return "Faltan campos: id, studentId, modulo";
    else return null;
}
// Comprueba si el id de notas ya existe
const existsId = (id) => notas.some(s => s.id === id);
export function getAll() {
    return notas;
}
export function getById(id) {
    return notas.find(s => s.id === id);
}
export function create(notaNew) {
    const validationMsg = validateStudent(notaNew);
    if (validationMsg) return { error: validationMsg };

    if (existsId(notaNew.id)) return { error: "id ya existe", status: 409 };

    notas.push({ id: notaNew.id, studentId: notaNew.studentId, modulo: notaNew.modulo, nota: notaNew.nota });
    return { data: notaNew };
}

export function update(id, payload) {
    const idx = notas.findIndex(s => s.id === id);
    if (idx === -1) return null;

    if (payload && typeof payload === "object") {
        if (payload.studentId !== undefined) notas[idx].studentId = payload.studentId;
        if (payload.modulo !== undefined) notas[idx].modulo = payload.modulo;
        if (payload.id !== undefined) notas[idx].id = payload.id;
        if (payload.nota !== undefined) notas[idx].nota = payload.nota;


    }

    return notas[idx];
}

export function removeNotas(studentId) {
    const before = notas.length;
    const filtered = notas.filter(s => s.studentId !== studentId);

    if (filtered.length === before) return false;

    notas.length = 0;
    notas.push(...filtered);
    return true;
}

