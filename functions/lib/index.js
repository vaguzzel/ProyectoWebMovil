"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTicket = void 0;
const functions = __importStar(require("firebase-functions/v1"));
const admin = __importStar(require("firebase-admin"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
admin.initializeApp();
// Lee la config de SendGrid
const { key: SENDGRID_API_KEY, sender: SENDGRID_SENDER } = functions.config().sendgrid;
// Chequeo rápido en logs
if (!SENDGRID_API_KEY || !SENDGRID_SENDER) {
    console.error("❌ SendGrid no configurado (functions.config)");
}
mail_1.default.setApiKey(SENDGRID_API_KEY);
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:8100" }));
app.use(express_1.default.json());
app.post("/", (req, res) => {
    (async () => {
        var _a;
        const { nombre, email, telefono, tipoConsulta, prioridad, asunto, descripcion, } = req.body;
        if (!nombre || !email || !tipoConsulta ||
            !prioridad || !asunto || !descripcion) {
            return res.status(400).send("Faltan campos obligatorios");
        }
        const msg = {
            to: "matiasreyes3172@gmail.com",
            from: SENDGRID_SENDER,
            subject: `Nuevo Ticket de ${nombre}`,
            html: `
        <p><strong>De:</strong> ${nombre} &lt;${email}&gt;</p>
        <p><strong>Teléfono:</strong> ${telefono || "–"}</p>
        <p><strong>Tipo de Consulta:</strong> ${tipoConsulta}</p>
        <p><strong>Prioridad:</strong> ${prioridad}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Descripción:</strong><br/>${descripcion}</p>
      `,
        };
        try {
            await mail_1.default.send(msg);
            console.log("✉️  Correo enviado correctamente");
            return res.status(200).send("Correo enviado");
        }
        catch (error) {
            console.error("Error al enviar email:", ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.body) || error);
            return res.status(500).send("Error al enviar correo");
        }
    })().catch((err) => {
        console.error("Unexpected error in async handler:", err);
        res.status(500).send("Error interno del servidor");
    });
});
// Al final de tu archivo, tras el export:
const port = Number(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`🚀 Express escuchando en ${port}`);
});
// al final de functions/src/index.ts
exports.sendTicket = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map