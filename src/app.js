import express from 'express'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import {CLAVE} from './config.js'
import cors from "cors"

import indexRoutes from './routes/index.routes.js'
import adminRoutes from './routes/admin.routes.js' 
import loginRoutes from './routes/login.routes.js'
import registerRoutes from './routes/register.routes.js'
import miPerfilRoutes from './routes/mi.perfil.routes.js'
import quienesSomosRoutes from './routes/quienes.somos.routes.js'
import contactoRoutes from './routes/contacto.routes.js'
import vistaProductosRoutes from './routes/vista.productos.routes.js'
import comprasRoutes from './routes/compras.routes.js'


const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
//console.log(__dirname)
app.use(morgan('dev'))
app.use(express.static(join(__dirname, 'public')))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended: true, limit: '50mb', parameterLimit:50000}))

app.use(
	cors({
		origin: ["https://grupo-22.vercel.app/", "http://localhost:8080", "https://api.imgur.com/3/image"],
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
        allowedHeaders: ['Content-Type']
	})
)

app.use(cookieParser(CLAVE))

app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'))

app.use(loginRoutes)
app.use(registerRoutes)
app.use(adminRoutes) 
app.use(indexRoutes)
app.use(miPerfilRoutes)
app.use(quienesSomosRoutes)
app.use(contactoRoutes)
app.use(vistaProductosRoutes)
app.use(comprasRoutes)

app.get('/logout', (req, res) => {
    res.clearCookie("idUser");
    res.redirect('/')
})

app.use((req, res, next)=> {
    res.send('Página solicitada no encontrada')
    next()
})

export default app