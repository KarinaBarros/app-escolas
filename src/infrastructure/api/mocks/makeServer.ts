import { createServer, Model, Response } from "miragejs";
import { Escola, Turma } from "../../../types/escola";
import { seeds } from "./seeds";

type NovaEscola = Omit<Escola, "id" | "turmas">;
type NovaTurma = Omit<Turma, "id">;

export function makeServer() {
    return createServer({
        models: {
            escola: Model,
            turma: Model,
        },

        seeds(server) {
            seeds(server);
        },

        routes() {
            this.namespace = "";

            this.get("/schools", (schema) => {
                return schema.all("escola").models.map((e) => e.attrs);
            });

            this.get("/schools/:id", (schema, request) => {
                const model = schema.find("escola", request.params.id);

                if (!model) {
                    return new Response(404, {}, { error: "Escola não encontrada" });
                }

                return model.attrs;
            });

            this.post("/schools", (schema, request) => {
                const data: NovaEscola = JSON.parse(request.requestBody);

                const escola = schema.create("escola", {
                    id: Date.now().toString(),
                    nome: data.nome,
                    endereco: data.endereco,
                    turmas: [],
                } satisfies Escola);

                return escola.attrs;
            });

            this.put("/schools/:id", (schema, request) => {
                const model = schema.find("escola", request.params.id);

                if (!model) {
                    return new Response(404);
                }

                const data: Partial<Escola> = JSON.parse(request.requestBody);

                model.update(data);

                return model.attrs;
            });

            this.delete("/schools/:id", (schema, request) => {
                const model = schema.find("escola", request.params.id);

                if (!model) {
                    return new Response(404);
                }

                model.destroy();

                return new Response(200);
            });

            this.get("/classes", (schema) => {
                return schema.all("turma").models.map((e) => e.attrs);
            });

            this.post("/classes", (schema, request) => {
                const data: NovaTurma = JSON.parse(request.requestBody);

                if (!data.nome || !data.turno || !data.anoLetivo || !data.escolaId) {
                    return new Response(400, {}, { error: "Dados inválidos" });
                }

                const turma = schema.create("turma", {
                    id: Date.now().toString(),
                    ...data,
                } satisfies Turma);

                const escolaModel = schema.find("escola", data.escolaId);

                if (escolaModel) {
                    const escola = escolaModel.attrs as Escola;

                    escolaModel.update({
                        turmas: [...escola.turmas, turma.attrs as Turma],
                    });
                }

                return turma.attrs;
            });

            this.put("/classes/:id", (schema, request) => {
                const model = schema.find("turma", request.params.id);

                if (!model) {
                    return new Response(404);
                }

                const data: Partial<Turma> = JSON.parse(request.requestBody);

                model.update(data);

                return model.attrs;
            });

            this.delete("/classes/:id", (schema, request) => {
                const model = schema.find("turma", request.params.id);

                if (!model) {
                    return new Response(404);
                }

                model.destroy();

                return new Response(200);
            });
        },
    });
}