import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  ShieldCheck, 
  Zap, 
  Settings, 
  Server, 
  ChevronDown, 
  Info, 
  Activity,
  Clock,
  Layers,
  Thermometer,
  Droplets,
  Waves,
  Power,
  CheckCircle2
} from 'lucide-react';

const tiers = [
  {
    id: 1,
    title: "Tier I: Infraestructura Básica",
    availability: "99.671%",
    downtime: "28.8 horas/año",
    redundancy: "N (Sin redundancia)",
    gradient: "from-blue-600 to-cyan-500",
    shadow: "shadow-blue-500/20",
    border: "border-blue-500/30",
    icon: <Server className="w-7 h-7 text-blue-100" />,
    description: "Nivel inicial para pequeñas oficinas. Una sola vía de energía y enfriamiento sin componentes de respaldo.",
    details: [
      "Requiere apagado total para mantenimiento.",
      "Vulnerable a fallas inesperadas de equipo.",
      "Protección básica contra errores humanos."
    ]
  },
  {
    id: 2,
    title: "Tier II: Componentes Redundantes",
    availability: "99.741%",
    downtime: "22 horas/año",
    redundancy: "N+1",
    gradient: "from-emerald-500 to-teal-400",
    shadow: "shadow-emerald-500/20",
    border: "border-emerald-500/30",
    icon: <Layers className="w-7 h-7 text-emerald-100" />,
    description: "Añade redundancia en componentes críticos (enfriadores, UPS, generadores) para mejorar la resiliencia.",
    details: [
      "Mantenimiento parcial: se pueden retirar componentes sin apagar todo.",
      "Sigue teniendo una sola ruta de distribución de energía.",
      "Mejor protección contra fallos inesperados de hardware."
    ]
  },
  {
    id: 3,
    title: "Tier III: Mantenimiento Simultáneo",
    availability: "99.982%",
    downtime: "1.6 horas/año",
    redundancy: "N+1",
    gradient: "from-amber-500 to-orange-400",
    shadow: "shadow-amber-500/20",
    border: "border-amber-500/30",
    icon: <Settings className="w-7 h-7 text-amber-100" />,
    description: "Cero paradas por mantenimiento programado. Posee múltiples rutas de distribución de energía y enfriamiento.",
    details: [
      "Cualquier pieza puede repararse sin impactar la operación de IT.",
      "No requiere cierres programados para mantenimiento preventivo.",
      "Altamente resiliente a fallas en la infraestructura principal."
    ]
  },
  {
    id: 4,
    title: "Tier IV: Tolerante a Fallas",
    availability: "99.995%",
    downtime: "26.3 min/año",
    redundancy: "2N+1",
    gradient: "from-rose-500 to-red-600",
    shadow: "shadow-red-500/20",
    border: "border-red-500/30",
    icon: <ShieldCheck className="w-7 h-7 text-rose-100" />,
    description: "El estándar de oro. Sistemas independientes y aislados que soportan cualquier falla sin interrupción.",
    details: [
      "Tolerancia total a fallas planeadas y no planeadas.",
      "Enfriamiento continuo para estabilidad térmica garantizada.",
      "Sistemas físicamente separados para evitar fallos en cascada."
    ]
  }
];

const environmentalFactors = [
  { name: "Temperatura", desc: "Monitorea el calor para evitar el sobrecalentamiento de servidores y procesadores.", icon: <Thermometer className="w-8 h-8"/>, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30", glow: "shadow-orange-500/10" },
  { name: "Humedad", desc: "Previene la corrosión de equipos (si es alta) y la electricidad estática (si es baja).", icon: <Droplets className="w-8 h-8"/>, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", glow: "shadow-cyan-500/10" },
  { name: "Detección de Agua", desc: "Alerta sobre inundaciones o fugas en tuberías y sistemas de aire acondicionado.", icon: <Waves className="w-8 h-8"/>, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", glow: "shadow-blue-500/10" },
  { name: "Falla de Energía", desc: "Detecta cortes eléctricos para activar módulos UPS y generadores de respaldo.", icon: <Power className="w-8 h-8"/>, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30", glow: "shadow-yellow-500/10" }
];

const TierPyramidLayer = ({ tier }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Clases dinámicas para crear la forma de pirámide escalonada
  const pyramidWidths = {
    4: "w-[90%] md:w-[50%]",
    3: "w-[95%] md:w-[65%]",
    2: "w-[100%] md:w-[85%]",
    1: "w-full",
  };

  return (
    <motion.div 
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${pyramidWidths[tier.id]} bg-[#131B2A]/80 backdrop-blur-xl rounded-2xl overflow-hidden border ${tier.border} transition-all duration-300 group ${isHovered ? `shadow-2xl ${tier.shadow} scale-[1.01]` : 'shadow-lg'}`}
    >
      <motion.div layout className={`bg-gradient-to-r ${tier.gradient} p-4 md:p-6 flex flex-col xl:flex-row justify-between items-center cursor-default transition-transform group-hover:brightness-110 gap-4`}>
        <div className="flex items-center gap-4 text-center xl:text-left">
          <div className="bg-white/20 p-2 md:p-3 rounded-xl shadow-inner backdrop-blur-md shrink-0">
            {tier.icon}
          </div>
          <h2 className="text-lg md:text-2xl font-bold text-white tracking-wide">{tier.title}</h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm text-white/90 font-medium">
          <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full"><Activity className="w-3.5 h-3.5" /> {tier.availability}</span>
          <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full"><Clock className="w-3.5 h-3.5" /> {tier.downtime}</span>
        </div>
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 md:p-8 bg-gradient-to-b from-[#1A2333]/50 to-[#0F172A]/50 border-t border-white/5">
              <p className="text-slate-300 mb-8 text-base md:text-lg leading-relaxed font-light border-l-4 pl-4 border-slate-600">
                {tier.description}
              </p>
              
              <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 md:gap-8">
                <div className="xl:col-span-3 bg-black/20 p-5 md:p-6 rounded-2xl border border-white/5">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Info className="w-4 h-4" /> Conceptos Clave
                  </h4>
                  <ul className="space-y-4">
                    {tier.details.map((detail, i) => (
                      <li key={i} className="text-sm md:text-base text-slate-200 flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 text-white/60`} />
                        <span className="leading-snug">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="xl:col-span-2 bg-black/20 p-5 md:p-6 rounded-2xl border border-white/5 flex flex-col justify-center items-center text-center">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Redundancia</span>
                  <span className={`text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r ${tier.gradient}`}>
                    {tier.redundancy}
                  </span>
                  <div className="mt-6 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(tier.id / 4) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${tier.gradient}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  // Ordenar de Tier 4 (punta) a Tier 1 (base)
  const pyramidTiers = [...tiers].sort((a, b) => b.id - a.id);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-slate-100 font-sans selection:bg-blue-500/30 relative overflow-hidden">
      
      {/* Fondo de red de puntos estilo Data Center */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      
      {/* Luces de fondo (Glows) */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/20 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10">
        <header className="pt-24 pb-16 px-6 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold mb-6 uppercase tracking-wider">
              <Zap className="w-4 h-4" /> Arquitectura Crítica
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
              Clasificación de <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
                Resiliencia Tiering
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
              Niveles de redundancia y resiliencia para garantizar la alta disponibilidad en infraestructuras modernas de centros de datos. <br/> <strong className="text-blue-300">Pasa el ratón sobre cada nivel de la pirámide para descubrir su funcionamiento.</strong>
            </p>
          </motion.div>
        </header>

        <main className="max-w-6xl mx-auto p-6 md:pb-24">
          
          {/* Tarjetas de Tiers - Formato Pirámide */}
          <LayoutGroup>
            <div className="flex flex-col items-center w-full mb-28 gap-3 md:gap-4 relative">
              {pyramidTiers.map((tier) => (
                <TierPyramidLayer key={tier.id} tier={tier} />
              ))}
            </div>
          </LayoutGroup>

          {/* Factores Ambientales (Fuera de la pirámide) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Monitoreo Ambiental Crítico</h2>
              <p className="text-slate-400 max-w-2xl mx-auto font-light text-lg">
                Elementos vitales a controlar para garantizar el estado óptimo del hardware y prevenir caídas no planificadas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {environmentalFactors.map((factor, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`flex flex-col items-center text-center p-8 rounded-3xl bg-[#131B2A]/80 backdrop-blur-xl border ${factor.border} transition-all duration-300 shadow-xl ${factor.glow}`}
                >
                  <div className={`p-5 rounded-2xl mb-6 ${factor.bg} ${factor.color} ring-1 ring-inset ${factor.border}`}>
                    {factor.icon}
                  </div>
                  <h4 className={`text-xl font-bold ${factor.color} mb-3`}>{factor.name}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed font-light">{factor.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Resumen Comparativo Final (Fuera de la pirámide) */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#131B2A]/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <h3 className="text-3xl font-bold mb-10 text-center text-white">Resumen Comparativo</h3>
            
            <div className="overflow-x-auto relative z-10">
              <table className="w-full text-left text-slate-300 min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-6 text-slate-400 font-semibold uppercase tracking-wider text-sm">Característica</th>
                    <th className="pb-6 text-center text-slate-400 font-semibold uppercase tracking-wider text-sm">Tier I</th>
                    <th className="pb-6 text-center text-slate-400 font-semibold uppercase tracking-wider text-sm">Tier II</th>
                    <th className="pb-6 text-center text-slate-400 font-semibold uppercase tracking-wider text-sm">Tier III</th>
                    <th className="pb-6 text-center text-slate-400 font-semibold uppercase tracking-wider text-sm">Tier IV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="transition-colors hover:bg-white/[0.02]">
                    <td className="py-6 font-medium text-white">Redundancia</td>
                    <td className="py-6 text-center text-slate-400">N</td>
                    <td className="py-6 text-center text-emerald-400 font-medium">N+1</td>
                    <td className="py-6 text-center text-amber-400 font-bold">N+1</td>
                    <td className="py-6 text-center text-rose-400 font-black">2N+1</td>
                  </tr>
                  <tr className="transition-colors hover:bg-white/[0.02]">
                    <td className="py-6 font-medium text-white">Mantenimiento</td>
                    <td className="py-6 text-center text-slate-400 text-sm">Apagado Total</td>
                    <td className="py-6 text-center text-sm">Parcial</td>
                    <td className="py-6 text-center text-emerald-400 font-medium text-sm">Simultáneo</td>
                    <td className="py-6 text-center text-emerald-400 font-medium text-sm">Simultáneo</td>
                  </tr>
                  <tr className="transition-colors hover:bg-white/[0.02]">
                    <td className="py-6 font-medium text-white">Tiempo Inactivo/Año</td>
                    <td className="py-6 text-center font-mono">28.8 hrs</td>
                    <td className="py-6 text-center font-mono">22 hrs</td>
                    <td className="py-6 text-center font-mono">1.6 hrs</td>
                    <td className="py-6 text-center font-mono font-bold text-white text-lg">26.3 min</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

        </main>

        <footer className="py-12 text-center text-slate-500 border-t border-white/5">
          <p className="text-sm font-semibold tracking-wide uppercase">Módulo: Operación y Monitoreo de Centros de Datos</p>
          <p className="text-xs mt-2 font-light">Ingeniería de Alta Disponibilidad & Infraestructura Crítica</p>
        </footer>
      </div>
    </div>
  );
}