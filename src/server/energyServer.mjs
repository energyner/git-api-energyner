// //SERVIDOR EXPRESS
// energyServer.mjs
import express from 'express';
import cors from 'cors';

// Importación de Controladores (Asegúrate de que las rutas de archivo sean correctas)
import { calcularConsumoEnergetico } from '../calculations/energy-consumption.mjs';
import { calcularProduccionSolar } from '../calculations/solar-production.mjs';
import { calcularHuellaCarbono } from '../calculations/carbon-footprint.mjs';
import { calcularCalorias } from '../calculations/calories-burned.mjs';
import { calcularGeneracionVapor } from '../calculations/steam-generator.mjs';


const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3002;

// --- RUTAS DEL SISTEMA ENERGYNER ---

// Delegamos la lógica completa al import correspondiente
app.post('/api/consumo-energetico', calcularConsumoEnergetico);
app.post('/api/produccion-solar', calcularProduccionSolar);

// Para Huella de Carbono y Vapor, si tus funciones aún no reciben (req, res), 
// puedes envolverlas así:
app.post('/api/huella-carbono', (req, res) => {
    const resultado = calcularHuellaCarbono(req.body);
    if (resultado.error) return res.status(400).json(resultado);
    res.json(resultado);
});

app.post('/api/calories-burned', (req, res) => {
    const { peso, duracionCaminata, cantidadPasos, metroPaso } = req.body;
    const resultado = calcularCalorias({ peso, duracionCaminata, cantidadPasos, metroPaso });
    if (resultado.error) return res.status(400).json(resultado);
    res.json(resultado);
});

app.post('/api/steam-generator', (req, res) => {
    const { flujo_vapor, entalpia, eficiencia } = req.body;
    const resultado = calcularGeneracionVapor({ flujo_vapor, entalpia, eficiencia });
    if (resultado.error) return res.status(400).json(resultado);
    res.json(resultado);
});

// --- LANZAMIENTO ---
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n============== ENERGYNER API GATEWAY ==============`);
    console.log(`✅ Servidor escuchando en: http://localhost:${PORT}`);
    console.log(`📂 Módulos cargados: Consumo, Solar, Carbono, CaloriasQuemadas, Vapor`);
    console.log(`====================================================\n`);
});