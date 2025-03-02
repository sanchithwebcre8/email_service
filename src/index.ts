//@ts-nocheck
import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import { sendEmail } from "./emailService";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.post("/send-email", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { from, to, name, phone, businessType} = req.body;

    if (!from || !to || !name || !phone || !businessType) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const result = await sendEmail(from, to, name, phone, businessType);

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(result);
    }
  } catch (error) {
    next(error);
  }
});

// Global Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start the server
const PORT = Bun.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
