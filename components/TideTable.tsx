import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, WavesIcon, SunIcon, MoonIcon, WindIcon, ThermometerIcon } from './Icons';

interface TideTableProps {
    onBack: () => void;
}

interface MarineData {
    wave_height?: number;
    wave_direction?: number;
}

interface WeatherData {
    temperature_2m?: number;
    wind_speed_10m?: number;
    sunrise?: string;
    sunset?: string;
}

const TideDashboard: React.FC<TideTableProps> = ({ onBack }) => {
    // Coordenadas de Boipeba
    const LAT = -13.5786;
    const LON = -38.9208;

    const [marine, setMarine] = useState<MarineData>({});
    const [weather, setWeather] = useState<WeatherData>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data from Open-Meteo (Free, No API Key)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch Marine Data (Waves)
                const marineRes = await fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${LAT}&longitude=${LON}&hourly=wave_height&timezone=America%2FSao_Paulo&forecast_days=1`);
                const marineJson = await marineRes.json();

                // Fetch Weather Data (Temp, Wind, Sun)
                const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,wind_speed_10m&daily=sunrise,sunset&timezone=America%2FSao_Paulo&forecast_days=1`);
                const weatherJson = await weatherRes.json();

                // Process Current Values
                const currentHour = new Date().getHours();
                const waveHeight = marineJson.hourly?.wave_height ? marineJson.hourly.wave_height[currentHour] : undefined;

                const currentTemp = weatherJson.current?.temperature_2m;
                const currentWind = weatherJson.current?.wind_speed_10m;
                const sunrise = weatherJson.daily?.sunrise ? weatherJson.daily.sunrise[0] : '';
                const sunset = weatherJson.daily?.sunset ? weatherJson.daily.sunset[0] : '';

                setMarine({ wave_height: waveHeight });
                setWeather({
                    temperature_2m: currentTemp,
                    wind_speed_10m: currentWind,
                    sunrise,
                    sunset
                });

            } catch (err) {
                console.error("Failed to fetch weather data", err);
                setError("Não foi possível carregar os dados online no momento.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Calculate Moon Phase (Simple algorithm)
    const getMoonPhase = (date: Date) => {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 3) {
            year--;
            month += 12;
        }

        const a = Math.floor(year / 100);
        const b = 2 - a + Math.floor(a / 4);
        const jd = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
        const daysSinceNew = jd - 2451549.5;
        const cycles = daysSinceNew / 29.53;
        const currentCycle = cycles - Math.floor(cycles);

        // 0 = New Moon, 0.5 = Full Moon
        const phase = currentCycle * 29.53;

        if (phase < 1.84566) return { name: "Lua Nova", icon: "🌑" };
        else if (phase < 5.53699) return { name: "Lua Crescente", icon: "🌒" };
        else if (phase < 9.22831) return { name: "Quarto Crescente", icon: "🌓" };
        else if (phase < 12.91963) return { name: "Crescente Gibosa", icon: "🌔" };
        else if (phase < 16.61096) return { name: "Lua Cheia", icon: "🌕" };
        else if (phase < 20.30228) return { name: "Minguante Gibosa", icon: "🌖" };
        else if (phase < 23.99361) return { name: "Quarto Minguante", icon: "🌗" };
        else if (phase < 27.68493) return { name: "Lua Minguante", icon: "🌘" };
        return { name: "Lua Nova", icon: "🌑" };

    };

    const moon = getMoonPhase(new Date());

    const formatTime = (isoString?: string) => {
        if (!isoString) return '--:--';
        return new Date(isoString).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto flex flex-col">
            <header className="bg-cyan-600 text-white p-4 shadow-md sticky top-0 z-10 flex items-center shrink-0">
                <button
                    onClick={onBack}
                    className="mr-4 p-2 -ml-2 hover:bg-cyan-700 rounded-full transition-colors"
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold">Condições em Boipeba</h1>
            </header>

            <div className="flex-1 p-4 pb-24 max-w-lg mx-auto w-full">

                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                    <h2 className="text-gray-500 font-medium mb-4 text-center uppercase tracking-wide text-xs">Agora em Boipeba</h2>

                    {loading ? (
                        <div className="animate-pulse space-y-4">
                            <div className="h-20 bg-gray-200 rounded-xl"></div>
                            <div className="h-20 bg-gray-200 rounded-xl"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-4">{error}</div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {/* Temperature */}
                            <div className="bg-orange-50 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                                <ThermometerIcon className="w-8 h-8 text-orange-500 mb-2" />
                                <span className="text-2xl font-bold text-gray-800">{weather.temperature_2m}°C</span>
                                <span className="text-xs text-gray-500">Temperatura</span>
                            </div>

                            {/* Wind */}
                            <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                                <WindIcon className="w-8 h-8 text-blue-500 mb-2" />
                                <span className="text-2xl font-bold text-gray-800">{weather.wind_speed_10m}<span className="text-sm font-normal"> km/h</span></span>
                                <span className="text-xs text-gray-500">Vento</span>
                            </div>

                            {/* Waves */}
                            <div className="bg-teal-50 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                                <WavesIcon className="w-8 h-8 text-teal-600 mb-2" />
                                <span className="text-2xl font-bold text-gray-800">{marine.wave_height}<span className="text-sm font-normal"> m</span></span>
                                <span className="text-xs text-gray-500">Ondas (Altura)</span>
                            </div>

                            {/* Moon */}
                            <div className="bg-indigo-50 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                                <span className="text-4xl mb-1">{moon.icon}</span>
                                <span className="text-sm font-bold text-gray-800">{moon.name}</span>
                                <span className="text-xs text-gray-500">Fase da Lua</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sun Schedule */}
                {!loading && !error && (
                    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 flex items-center justify-between">
                        <div className="flex flex-col items-center">
                            <SunIcon className="w-8 h-8 text-yellow-500 mb-1" />
                            <span className="text-xs text-gray-400">Nascer do Sol</span>
                            <span className="font-bold text-gray-800">{formatTime(weather.sunrise)}</span>
                        </div>
                        <div className="h-10 w-px bg-gray-200"></div>
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <SunIcon className="w-8 h-8 text-orange-500 mb-1" />
                                <div className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full opacity-50"></div>
                            </div>
                            <span className="text-xs text-gray-400">Pôr do Sol</span>
                            <span className="font-bold text-gray-800">{formatTime(weather.sunset)}</span>
                        </div>
                    </div>
                )}

                {/* Tide Forecast Widget via Iframe - Tideschart is often cleaner */}
                <div className="bg-white rounded-2xl shadow-sm p-2 mb-6 overflow-hidden">
                    <div className="w-full h-[600px] relative">
                        {/* Overlay to hide header/footer somewhat if needed, but difficult with cross-origin */}
                        <iframe
                            src="https://pt.tideschart.com/Brazil/Bahia/Camamu-Bay/Ilha-de-Boipeba/Weekly/"
                            className="w-full h-full border-0"
                            title="Tábua de Marés Semanal"
                            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        />
                    </div>
                    <div className="text-center p-2 text-xs text-gray-400">
                        Fonte: TidesChart.com
                    </div>
                </div>

                {/* Tide Table External Link (Fallback) */}
                <div className="bg-linear-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-lg p-6 text-white text-center relative overflow-hidden mb-8">
                    <div className="relative z-10">
                        <WavesIcon className="w-12 h-12 text-white/90 mx-auto mb-3" />
                        <h2 className="text-xl font-bold mb-2">Tábua Oficial</h2>

                        <a
                            href="https://tabuademares.com/br/bahia/ilha-de-boipeba"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                        >
                            Ver Tabela Completa
                        </a>
                    </div>
                    {/* Decoration bubbles */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400">
                        Dados meteorológicos fornecidos por Open-Meteo.com<br />
                        Dados de maré via tabuademares.com
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TideDashboard;
