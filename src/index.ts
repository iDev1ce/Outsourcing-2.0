import app from "./shared/infra/http/server"

app.listen(8080, () => {
    console.log("Servidor startado")
})