import app from "./app";

const port = Number(process.env.PORT ?? 5000);

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend running on port ${port}`);
});
