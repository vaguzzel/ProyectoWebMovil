import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import express, {Request, Response} from "express";
import cors from "cors";
import sgMail from "@sendgrid/mail";

admin.initializeApp();

// Lee la config de SendGrid
const {key: SENDGRID_API_KEY, sender: SENDGRID_SENDER} =
  functions.config().sendgrid;

// Chequeo rápido en logs
if (!SENDGRID_API_KEY || !SENDGRID_SENDER) {
  console.error("❌ SendGrid no configurado (functions.config)");
}

sgMail.setApiKey(SENDGRID_API_KEY);

const app = express();
app.use(cors({origin: "http://localhost:8100"}));
app.use(express.json());

app.post("/", (req: Request, res: Response) => {
  (async () => {
    const {
      nombre, email, telefono,
      tipoConsulta, prioridad,
      asunto, descripcion,
    } = req.body;

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
      await sgMail.send(msg);
      console.log("✉️  Correo enviado correctamente");
      return res.status(200).send("Correo enviado");
    } catch (error: any) {
      console.error("Error al enviar email:", error?.response?.body || error);
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
export const sendTicket = functions.https.onRequest(app);
