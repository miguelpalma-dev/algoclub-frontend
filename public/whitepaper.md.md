<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QUEES Algo Club - White Paper v2.0</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-main: #06102B;
            --accent: #FF6B1A;
            --bg-secondary: #081638;
            --text-main: #FFFFFF;
            --text-secondary: #A0AEC0;
            --text-dark: #2D3748;
            --border-color: rgba(255, 255, 255, 0.1);
            --border-dark: #E2E8F0;
            --callout-bg: #FFF5F0;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: #555;
            color: var(--text-dark);
            line-height: 1.7;
            font-size: 11pt;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }

        /* Contenedor principal de visualización tipo PDF */
        .document-container {
            max-width: 210mm;
            margin: 20px auto;
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        /* Estilos de Página A4 */
        .page {
            width: 210mm;
            min-height: 297mm;
            padding: 25mm 20mm;
            position: relative;
            background: #FFFFFF;
            page-break-after: always;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        /* Página de Portada */
        .page.cover {
            background-color: var(--bg-main);
            color: var(--text-main);
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 40mm 20mm;
        }

        .cover-content {
            max-width: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .logo-container {
            width: 120px;
            height: 120px;
            background-color: var(--accent);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Montserrat', sans-serif;
            font-weight: 800;
            font-size: 64px;
            color: white;
            margin-bottom: 40px;
            box-shadow: 0 10px 25px rgba(255, 107, 26, 0.4);
        }

        .cover h1 {
            font-family: 'Montserrat', sans-serif;
            font-weight: 800;
            font-size: 54px;
            line-height: 1.1;
            margin-bottom: 20px;
            color: var(--text-main);
        }

        .cover h2 {
            font-family: 'Inter', sans-serif;
            font-weight: 400;
            font-size: 20px;
            color: var(--text-secondary);
            margin-bottom: 30px;
        }

        .cover-divider {
            width: 80px;
            height: 4px;
            background-color: var(--accent);
            margin: 20px 0 40px 0;
            border-radius: 2px;
        }

        .cover-meta {
            font-size: 13px;
            color: var(--text-secondary);
            margin-top: 20px;
            letter-spacing: 0.5px;
        }

        .asset-badge {
            margin-top: 15px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border-color);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 13px;
            color: var(--text-secondary);
        }

        .asset-badge span {
            color: var(--accent);
            font-weight: 600;
        }

        /* Encabezado y Pie de página interior */
        .page-header {
            font-size: 10pt;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 1px solid var(--border-dark);
            padding-bottom: 8px;
            margin-bottom: 25px;
            display: flex;
            justify-content: space-between;
        }

        .page-footer {
            font-size: 9pt;
            color: var(--text-secondary);
            border-top: 1px solid var(--border-dark);
            padding-top: 10px;
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        /* Tipografía y Secciones */
        .section-header {
            display: flex;
            align-items: baseline;
            gap: 12px;
            margin-bottom: 20px;
            margin-top: 10px;
        }

        .section-number {
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            font-size: 28px;
            color: var(--accent);
            line-height: 1;
        }

        .section-title {
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            font-size: 22px;
            color: var(--bg-main);
        }

        h3 {
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            font-size: 15px;
            color: var(--bg-main);
            margin-top: 18px;
            margin-bottom: 8px;
        }

        p {
            margin-bottom: 12px;
            color: var(--text-dark);
            text-align: justify;
        }

        ul {
            margin-bottom: 15px;
            padding-left: 20px;
        }

        li {
            margin-bottom: 6px;
            color: var(--text-dark);
        }

        li::marker {
            color: var(--accent);
        }

        /* Tablas Profesionales */
        table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            margin: 20px 0;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid var(--border-dark);
            font-size: 10.5pt;
        }

        th {
            background-color: var(--bg-main);
            color: white;
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            text-align: left;
            padding: 12px 16px;
        }

        td {
            padding: 10px 16px;
            border-bottom: 1px solid var(--border-dark);
            color: var(--text-dark);
        }

        tr:last-child td {
            border-bottom: none;
        }

        tr:nth-child(even) {
            background-color: #F7FAFC;
        }

        tr:nth-child(odd) {
            background-color: #FFFFFF;
        }

        /* Callouts / Destacados */
        .callout {
            background-color: var(--callout-bg);
            border-left: 4px solid var(--accent);
            padding: 16px 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }

        .callout p {
            margin-bottom: 0;
            color: #C0392B;
            font-weight: 500;
        }

        a {
            color: var(--accent);
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        /* Botón de Descarga Flotante */
        .download-btn-container {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 1000;
        }

        .download-btn {
            background-color: var(--accent);
            color: white;
            border: none;
            padding: 14px 28px;
            border-radius: 30px;
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            font-size: 15px;
            cursor: pointer;
            box-shadow: 0 6px 20px rgba(255, 107, 26, 0.4);
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
        }

        .download-btn:hover {
            background-color: #e55a10;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 107, 26, 0.6);
        }

        /* Configuración de Impresión */
        @media print {
            body {
                background: none;
            }
            .document-container {
                box-shadow: none;
                margin: 0;
                max-width: 100%;
            }
            .download-btn-container {
                display: none;
            }
            .page {
                margin: 0;
                border: initial;
                border-radius: initial;
                width: 100vw;
                min-height: 100vh;
                page-break-after: always;
                page-break-inside: avoid;
            }
            .page.cover {
                background-color: var(--bg-main) !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }
    </style>
</head>
<body>

    <!-- Botón de Descarga / Impresión -->
    <div class="download-btn-container">
        <button class="download-btn" onclick="window.print()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Descargar como PDF
        </button>
    </div>

    <div class="document-container">

        <!-- PÁGINA 1: PORTADA -->
        <div class="page cover">
            <div class="cover-content">
                <div class="logo-container">Q</div>
                <h1>QUEES Algo Club</h1>
                <h2>Token de Utilidad Comunitaria en Algorand</h2>
                <div class="cover-divider"></div>
                <div class="asset-badge">Asset ID: <span>3730071622</span></div>
                <div class="cover-meta">Versión 2.0 &nbsp;|&nbsp; Octubre 2026 &nbsp;|&nbsp; Algorand MainNet</div>
            </div>
        </div>

        <!-- PÁGINA 2: RESUMEN EJECUTIVO Y PROBLEMA -->
        <div class="page">
            <div>
                <div class="page-header">
                    <span>QUEES Algo Club · White Paper v2.0</span>
                    <span>Secciones 1 y 2</span>
                </div>

                <div class="section-header">
                    <span class="section-number">1.</span>
                    <span class="section-title">Resumen Ejecutivo</span>
                </div>
                <p>QUEES Algo Club es una comunidad guatemalteca dedicada a la educación sobre Algorand, blockchain y tokenización. Nuestro objetivo es simple: que cualquier persona en Guatemala pueda entender y usar la tecnología Web3 de forma práctica.</p>
                <p>El token QUEES es la herramienta que hace posible este objetivo. Los miembros aprenden a través de quizzes y misiones, y reciben QUEES como recompensa por su participación. Estos tokens les permiten votar en decisiones del club y acceder a contenido exclusivo.</p>
                <p>QUEES Algo Club es el piloto. Es la primera fase de una visión más grande: la tokenización de Guatemala. Este proyecto demuestra que la educación, la comunidad y la tecnología blockchain pueden unirse para crear valor real.</p>

                <div class="section-header" style="margin-top: 30px;">
                    <span class="section-number">2.</span>
                    <span class="section-title">El Problema</span>
                </div>
                <p>Guatemala enfrenta varias barreras para adoptar tecnología blockchain:</p>
                <ul>
                    <li><strong>Falta de educación accesible:</strong> La mayoría de la población no sabe qué es blockchain, cómo funciona o para qué sirve.</li>
                    <li><strong>Desconfianza en criptomonedas:</strong> La falta de información genera miedo y desconfianza.</li>
                    <li><strong>Exclusión financiera:</strong> Millones de guatemaltecos no tienen acceso a servicios financieros tradicionales.</li>
                    <li><strong>Fuga de talento:</strong> Profesionales buscan alternativas, pero no encuentran caminos claros hacia la tecnología.</li>
                </ul>
            </div>

            <div class="page-footer">
                <span>algoclub.algo.xyz</span>
                <span>Página 2</span>
            </div>
        </div>

        <!-- PÁGINA 3: LA SOLUCIÓN Y QUÉ ES ALGORAND -->
        <div class="page">
            <div>
                <div class="page-header">
                    <span>QUEES Algo Club · White Paper v2.0</span>
                    <span>Secciones 3 y 4</span>
                </div>

                <div class="section-header">
                    <span class="section-number">3.</span>
                    <span class="section-title">La Solución: Educación con Recompensa</span>
                </div>
                <p>QUEES Algo Club resuelve estos problemas con un modelo simple pero poderoso:</p>
                
                <h3>3.1 Aprende</h3>
                <ul>
                    <li>Quizzes interactivos sobre Algorand, blockchain y tokenización.</li>
                    <li>Misiones que profundizan el conocimiento.</li>
                    <li>Contenido educativo en español, adaptado a la realidad guatemalteca.</li>
                </ul>

                <h3>3.2 Gana</h3>
                <ul>
                    <li>Recompensas en QUEES por cada logro completado.</li>
                    <li>Niveles de miembro según la participación.</li>
                    <li>Acceso a contenido exclusivo para miembros activos.</li>
                </ul>

                <h3>3.3 Construye</h3>
                <ul>
                    <li>Gobernanza comunitaria: Los miembros votan decisiones del club.</li>
                    <li>Tesorería transparente: Todos los fondos son auditables on-chain.</li>
                    <li>Comunidad activa: Un espacio para aprender y crecer juntos.</li>
                </ul>

                <div class="section-header" style="margin-top: 25px;">
                    <span class="section-number">4.</span>
                    <span class="section-title">¿Qué es Algorand?</span>
                </div>
                <p>Para entender QUEES Algo Club, primero hay que entender Algorand.</p>
                <h3>4.1 La Blockchain de Algorand</h3>
                <p>Algorand es una blockchain de tercera generación diseñada para ser rápida, barata, segura y sostenible mediante Prueba de Participación Pura (PPoS).</p>
            </div>

            <div class="page-footer">
                <span>algoclub.algo.xyz</span>
                <span>Página 3</span>
            </div>
        </div>

        <!-- PÁGINA 4: ALGORAND CONTINUACIÓN Y TOKEN -->
        <div class="page">
            <div>
                <div class="page-header">
                    <span>QUEES Algo Club · White Paper v2.0</span>
                    <span>Secciones 4 y 5</span>
                </div>

                <h3>4.2 ¿Por qué Algorand?</h3>
                <ul>
                    <li><strong>Escalabilidad:</strong> Puede procesar miles de transacciones por segundo.</li>
                    <li><strong>Finalidad inmediata:</strong> Las transacciones se confirman en segundos, sin reversiones.</li>
                    <li><strong>Estándar ASA:</strong> Crear tokens es fácil y económico.</li>
                    <li><strong>Comunidad:</strong> Un ecosistema creciente de desarrolladores y proyectos.</li>
                </ul>

                <h3>4.3 Algorand en el Mundo Real</h3>
                <ul>
                    <li>Pagos y remesas (transferencias internacionales baratas).</li>
                    <li>Tokenización de activos (bienes raíces, arte, créditos de carbono).</li>
                    <li>Identidad digital (credenciales verificables).</li>
                    <li>Aplicaciones de IA (agentes autónomos que pagan por servicios).</li>
                </ul>

                <div class="section-header" style="margin-top: 25px;">
                    <span class="section-number">5.</span>
                    <span class="section-title">¿Qué es un Token?</span>
                </div>
                <p>Un token es un activo digital que vive en una blockchain. Puede representar valor, utilidad, propiedad o identidad.</p>
                
                <h3>5.1 Tokens en Algorand (ASA)</h3>
                <p>Algorand usa el estándar ASA (Algorand Standard Asset). Crear un token cuesta menos de $0.01 USD, tarda segundos y es accesible para cualquiera.</p>

                <h3>5.2 ¿Para qué Sirven los Tokens?</h3>
                <ul>
                    <li><strong>Recompensar:</strong> Pagar a personas por su trabajo o participación.</li>
                    <li><strong>Gobernar:</strong> Votar decisiones de una comunidad.</li>
                    <li><strong>Acceder:</strong> Desbloquear contenido o servicios.</li>
                    <li><strong>Representar:</strong> Tokenizar activos del mundo real.</li>
                </ul>
            </div>

            <div class="page-footer">
                <span>algoclub.algo.xyz</span>
                <span>Página 4</span>
            </div>
        </div>

        <!-- PÁGINA 5: TOKENIZACIÓN Y TOKEN QUEES -->
        <div class="page">
            <div>
                <div class="page-header">
                    <span>QUEES Algo Club · White Paper v2.0</span>
                    <span>Secciones 6 y 7</span>
                </div>

                <div class="section-header">
                    <span class="section-number">6.</span>
                    <span class="section-title">¿Qué es la Tokenización?</span>
                </div>
                <p>La tokenización es el proceso de convertir algo del mundo real en un token digital en la blockchain (dinero, propiedad, servicios, datos, creatividad).</p>
                
                <h3>6.1 ¿Por qué Tokenizar?</h3>
                <ul>
                    <li><strong>Transparencia:</strong> Todo queda registrado y es auditable.</li>
                    <li><strong>Accesibilidad:</strong> Cualquiera puede participar sin bancos.</li>
                    <li><strong>Eficiencia:</strong> Transacciones rápidas y baratas.</li>
                    <li><strong>Propiedad:</strong> Tú controlas tus activos, no un intermediario.</li>
                </ul>

                <div class="section-header" style="margin-top: 25px;">
                    <span class="section-number">7.</span>
                    <span class="section-title">El Token QUEES</span>
                </div>
                <h3>7.1 Datos Técnicos</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Parámetro</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Nombre</td><td>QueEsAlgo</td></tr>
                        <tr><td>Símbolo</td><td>QUEES</td></tr>
                        <tr><td>Asset ID</td><td>3730071622</td></tr>
                        <tr><td>Red</td><td>Algorand MainNet</td></tr>
                        <tr><td>Suministro Total</td><td>1,000,000 QUEES</td></tr>
                        <tr><td>Decimales</td><td>0</td></tr>
                        <tr><td>Estándar</td><td>Algorand Standard Asset (ASA)</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="page-footer">
                <span>algoclub.algo.xyz</span>
                <span>Página 5</span>
            </div>
        </div>

        <!-- PÁGINA 6: DISTRIBUCIÓN Y ROADMAP -->
        <div class="page">
            <div>
                <div class="page-header">
                    <span>QUEES Algo Club · White Paper v2.0</span>
                    <span>Secciones 7 y 8</span>
                </div>

                <h3>7.2 Distribución del Suministro</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Destino</th>
                            <th>Cantidad</th>
                            <th>%</th>
                            <th>Propósito</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Fundador</td><td>250,000</td><td>25%</td><td>Reserva estratégica con vesting</td></tr>
                        <tr><td>Pool de Liquidez</td><td>250,000</td><td>25%</td><td>Liquidez en Tinyman (par QUEES/ALGO)</td></tr>
                        <tr><td>Recompensas</td><td>250,000</td><td>25%</td><td>Quizzes, misiones y gobernanza</td></tr>
                        <tr><td>Reserva Futura</td><td>250,000</td><td>25%</td><td>Desarrollo de proyectos futuros</td></tr>
                        <tr><td><strong>TOTAL</strong></td><td><strong>1,000,000</strong></td><td><strong>100%</strong></td><td>—</td></tr>
                    </tbody>
                </table>

                <div class="section-header" style="margin-top: 20px;">
                    <span class="section-number">8.</span>
                    <span class="section-title">Hoja de Ruta (Roadmap)</span>
                </div>
                <ul>
                    <li><strong>Fase 1 — Q4 2026 (Fundación - COMPLETADA):</strong> Creación del token QUEES en MainNet, dominio algoclub.algo (NFD), landing page y conexión de wallets.</li>
                    <li><strong>Fase 2 — Q1 2027 (Educación):</strong> Sistema de quizzes/misiones, distribución inicial a miembros, creación del grupo oficial y primeros eventos en Guatemala.</li>
                    <li><strong>Fase 3 — Q2 2027 (Comunidad):</strong> Gobernanza activa (votaciones on-chain), expansión nacional y alianzas en LATAM.</li>
                    <li><strong>Fase 4 — Q3 2027 (El Futuro):</strong> Este es el piloto. Lo que viene, lo construiremos juntos. Tokenicemos Guatemala.</li>
                </ul>
            </div>

            <div class="page-footer">
                <span>algoclub.algo.xyz</span>
                <span>Página 6</span>
            </div>
        </div>

        <!-- PÁGINA 7: VISIÓN, EQUIPO Y RECURSOS -->
        <div class="page">
            <div>
                <div class="page-header">
                    <span>QUEES Algo Club · White Paper v2.0</span>
                    <span>Secciones 9, 10 y 11</span>
                </div>

                <div class="section-header">
                    <span class="section-number">9.</span>
                    <span class="section-title">Visión a Largo Plazo</span>
                </div>
                <p>QUEES Algo Club es el primer paso de una visión más grande: tokenizar Guatemala. Creemos que la blockchain transforma cómo aprenden, trabajan, transaccionan y construyen los guatemaltecos.</p>
                <div class="callout">
                    <p>Quedate atento. Esto apenas comienza. Tokenicemos Guatemala.</p>
                </div>

                <div class="section-header" style="margin-top: 20px;">
                    <span class="section-number">10.</span>
                    <span class="section-title">Equipo</span>
                </div>
                <p><strong>Miguel Palma — Fundador</strong><br>
                Creador del proyecto QUEES Algo Club | Desarrollador Web3 autodidacta | Apasionado por la educación y la tokenización en Guatemala.<br>
                Contacto: <a href="mailto:contacto@algoclub.algo">contacto@algoclub.algo</a></p>

                <div class="section-header" style="margin-top: 20px;">
                    <span class="section-number">11.</span>
                    <span class="section-title">Enlaces y Recursos</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Recurso</th>
                            <th>Enlace</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Web Oficial</td><td><a href="https://algoclub.algo.xyz" target="_blank">https://algoclub.algo.xyz</a></td></tr>
                        <tr><td>GitHub</td><td><a href="https://github.com/miguelpalma-dev/algoclub-frontend" target="_blank">miguelpalma-dev/algoclub-frontend</a></td></tr>
                        <tr><td>Explorador de Token</td><td><a href="https://explorer.perawallet.app/asset/3730071622" target="_blank">Ver Asset ID 3730071622</a></td></tr>
                        <tr><td>NFD</td><td><a href="https://app.nf.domains/name/algoclub.algo" target="_blank">algoclub.algo</a></td></tr>
                    </tbody>
                </table>
            </div>

            <div class="page-footer">
                <span>algoclub.algo.xyz</span>
                <span>Página 7</span>
            </div>
        </div>

        <!-- PÁGINA 8: AVISO LEGAL Y FIN -->
        <div class="page">
            <div>
                <div class="page-header">
                    <span>QUEES Algo Club · White Paper v2.0</span>
                    <span>Sección 12</span>
                </div>

                <div class="section-header">
                    <span class="section-number">12.</span>
                    <span class="section-title">Aviso Legal</span>
                </div>
                <p>Este documento es informativo y no constituye una oferta de valores, inversión o asesoría financiera. QUEES es un token de utilidad diseñado para uso dentro del ecosistema QUEES Algo Club. Los usuarios deben realizar su propia investigación antes de adquirir o usar QUEES.</p>
                <p>El proyecto se encuentra en fase de desarrollo. Las funcionalidades descritas pueden cambiar o evolucionar.</p>

                <div style="margin-top: 80px; text-align: center; border-top: 1px dashed var(--border-dark); padding-top: 40px;">
                    <h3 style="font-family: 'Montserrat', sans-serif; font-size: 18px; color: var(--bg-main); margin-bottom: 10px;">Fin del White Paper</h3>
                    <p style="text-align: center; color: var(--text-secondary); font-size: 10pt;">Versión 2.0 — Octubre 2026</p>
                </div>
            </div>

            <div class="page-footer">
                <span>algoclub.algo.xyz</span>
                <span>Página 8</span>
            </div>
        </div>

    </div>

</body>
</html>