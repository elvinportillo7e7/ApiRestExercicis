import * as notasService from '../services/notas.services.js';

export function getAll(req, res) {
 res.json(notasService.getAll());
}
export function getById(req, res) {
 const nota = notasService.getById(req.params.id);

 if (!nota) return res.status(404).json({ message: "Not Found" });
 res.json(nota);
}

export function create(req, res) {
 const result = notasService.create(req.body);

 if (result.error) {
   const status = result.status || 400;
   return res.status(status).json({ message: result.error });
 }

 res.status(201).json({ message: "Created", nota: result.data });
}

export function update(req, res) {
 const updated = notasService.update(req.params.id, req.body);

 if (!updated) return res.status(404).json({ message: "Not Found" });
 res.json(updated);
}

export function remove(req, res) {
 const deleted = notasService.removeNotas(req.params.id);

 if (!deleted) return res.status(404).json({ message: "Not Found" });
 res.sendStatus(204);
}
