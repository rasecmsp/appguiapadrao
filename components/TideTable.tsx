import React, { useState } from 'react';
import { ArrowLeftIcon } from './Icons';

interface TideTableProps {
    onBack: () => void;
}

const TideTable: React.FC<TideTableProps> = ({ onBack }) => {
    // URL amigável para mobile e info completa
    const externalUrl = "https://tabuademares.com/br/bahia/ilha-de-boipeba";

    return (
        <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto flex flex-col">
            <header className="bg-cyan-600 text-white p-4 shadow-md sticky top-0 z-10 flex items-center shrink-0">
                <button
                    onClick={onBack}
                    className="mr-4 p-2 -ml-2 hover:bg-cyan-700 rounded-full transition-colors"
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold">Tábua de Maré</h1>
            </header>

            <div className="flex-1 flex flex-col items-center justify-start p-4 bg-white">
                <div className="w-full max-w-md bg-blue-50 border border-blue-100 rounded-xl p-6 text-center shadow-sm mb-6">
                    <h2 className="text-lg font-semibold text-blue-900 mb-2">Previsão Completa</h2>
                    <p className="text-sm text-blue-700 mb-4">
                        Visualize marés, ondas, sol e lua para Ilha de Boipeba, Bahia.
                    </p>
                    <a
                        href={externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm w-full"
                    >
                        Abrir Tábua de Marés
                    </a>
                    <p className="text-xs text-gray-400 mt-2">Abre em nova janela (Fonte: tabuademares.com)</p>
                </div>

                {/* WeatherWidget.io para Boipeba */}
                <div className="w-full max-w-4xl border border-gray-200 rounded-xl overflow-hidden shadow-sm relative bg-gray-100 p-2">
                    <a
                        className="weatherwidget-io"
                        href="https://forecast7.com/pt/n13d58n38d92/boipeba/"
                        data-label_1="BOIPEBA"
                        data-label_2="BAHIA"
                        data-font="Roboto"
                        data-icons="Climacons Animated"
                        data-mode="Current"
                        data-days="5"
                        data-theme="pure"
                        style={{ display: 'block', pointerEvents: 'none' }}
                    >
                        BOIPEBA BAHIA
                    </a>
                </div>
            </div>
        </div>
    );
};

// Inject script for widget
const useScript = (url: string) => {
    React.useEffect(() => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.id = 'weatherwidget-io-js';
        if (!document.getElementById('weatherwidget-io-js')) {
            document.body.appendChild(script);
        }
        return () => {
        }
    }, [url]);
};

// Wrapper compatible with React.FC
const TideTableWithScript: React.FC<TideTableProps> = (props) => {
    useScript('https://weatherwidget.io/js/widget.min.js');
    return <TideTable {...props} />;
}

export default TideTableWithScript;
