# afclean-higienizacao
afclean-agendamentos
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AF Clean - Sistema de Gestão</title>
    <link rel="manifest" href="data:application/json;base64,eyJuYW1lIjoiQUYgQ2xlYW4iLCJzaG9ydF9uYW1lIjoiQUZDbGVhbiIsInN0YXJ0X3VybCI6Ii4iLCJkaXNwbGF5Ijoic3RhbmRhbG9uZSIsImJhY2tncm91bmRfY29sb3IiOiIjZTBmN2ZmIiwidGhlbWVfY29sb3IiOiIjMGE4ZmRkIn0=">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: #0a8fdd;
            --primary-light: #4fc3f7;
            --secondary: #ffd54f;
            --accent: #00bcd4;
            --glass: rgba(255, 255, 255, 0.85);
            --shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #e0f7ff 0%, #b3e5fc 50%, #81d4fa 100%);
            min-height: 100vh;
            overflow-x: hidden;
        }

        /* Animação de bolhas no fundo */
        .bubbles {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            pointer-events: none;
            overflow: hidden;
            z-index: 0;
        }

        .bubble {
            position: absolute;
            bottom: -100px;
            background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(79, 195, 247, 0.3));
            border-radius: 50%;
            animation: rise 15s infinite ease-in;
            box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5);
        }

        @keyframes rise {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }

        .app-container {
            position: relative;
            z-index: 1;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Header */
        .header {
            background: var(--glass);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: var(--shadow);
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .logo-section {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .logo {
            width: 80px;
            height: 80px;
            background: radial-gradient(circle at 30% 30%, #e0f7ff, #4fc3f7);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            font-weight: bold;
            color: var(--primary);
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            box-shadow: 0 4px 15px rgba(10, 143, 221, 0.3);
            position: relative;
            overflow: hidden;
        }

        .logo::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
        }

        .logo-text h1 {
            color: var(--primary);
            font-size: 24px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .logo-text span {
            color: var(--secondary);
            font-weight: 800;
        }

        .logo-text p {
            color: #666;
            font-size: 12px;
            margin-top: 2px;
        }

        .install-btn {
            background: linear-gradient(135deg, var(--primary), var(--accent));
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(10, 143, 221, 0.4);
        }

        .install-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(10, 143, 221, 0.6);
        }

        /* Navigation */
        .nav-tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            overflow-x: auto;
            padding-bottom: 5px;
        }

        .nav-tab {
            background: var(--glass);
            border: none;
            padding: 15px 25px;
            border-radius: 15px;
            cursor: pointer;
            font-weight: 600;
            color: #555;
            transition: all 0.3s;
            backdrop-filter: blur(5px);
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .nav-tab:hover {
            background: rgba(255, 255, 255, 0.95);
            transform: translateY(-2px);
        }

        .nav-tab.active {
            background: linear-gradient(135deg, var(--primary), var(--accent));
            color: white;
            box-shadow: 0 4px 15px rgba(10, 143, 221, 0.4);
        }

        /* Content Sections */
        .content-section {
            display: none;
            animation: fadeIn 0.5s;
        }

        .content-section.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .card {
            background: var(--glass);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 25px;
            margin-bottom: 20px;
            box-shadow: var(--shadow);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .card h2 {
            color: var(--primary);
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        /* Forms */
        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #555;
            font-weight: 600;
            font-size: 14px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid rgba(10, 143, 221, 0.2);
            border-radius: 12px;
            font-size: 14px;
            transition: all 0.3s;
            background: rgba(255, 255, 255, 0.9);
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(10, 143, 221, 0.1);
        }

        .form-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }

        .btn {
            background: linear-gradient(135deg, var(--primary), var(--accent));
            color: white;
            border: none;
            padding: 14px 28px;
            border-radius: 12px;
            cursor: pointer;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 15px rgba(10, 143, 221, 0.3);
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(10, 143, 221, 0.4);
        }

        .btn-secondary {
            background: linear-gradient(135deg, #ffd54f, #ffb300);
            color: #333;
        }

        .btn-success {
            background: linear-gradient(135deg, #66bb6a, #43a047);
        }

        /* Client List */
        .client-list {
            display: grid;
            gap: 15px;
        }

        .client-item {
            background: rgba(255, 255, 255, 0.9);
            padding: 20px;
            border-radius: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s;
            border-left: 4px solid var(--primary);
            cursor: pointer;
        }

        .client-item:hover {
            transform: translateX(5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .client-info h3 {
            color: var(--primary);
            margin-bottom: 5px;
        }

        .client-info p {
            color: #666;
            font-size: 13px;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .client-status {
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }

        .status-pending {
            background: #fff3cd;
            color: #856404;
        }

        .status-progress {
            background: #cce5ff;
            color: #004085;
        }

        .status-completed {
            background: #d4edda;
            color: #155724;
        }

        /* Photo Upload */
        .photo-upload {
            border: 3px dashed var(--primary-light);
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
            background: rgba(255, 255, 255, 0.5);
        }

        .photo-upload:hover {
            background: rgba(255, 255, 255, 0.9);
            border-color: var(--primary);
        }

        .photo-upload i {
            font-size: 48px;
            color: var(--primary);
            margin-bottom: 10px;
        }

        .photo-preview {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .photo-preview img {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        /* Signature Pad */
        .signature-container {
            background: white;
            border: 2px solid #ddd;
            border-radius: 10px;
            margin: 20px 0;
        }

        #signaturePad {
            width: 100%;
            height: 200px;
            cursor: crosshair;
        }

        .signature-actions {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }

        /* Payment Section */
        .payment-methods {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 10px;
            margin: 20px 0;
        }

        .payment-method {
            padding: 15px;
            border: 2px solid rgba(10, 143, 221, 0.2);
            border-radius: 12px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
            background: rgba(255, 255, 255, 0.9);
        }

        .payment-method:hover {
            border-color: var(--primary);
            transform: translateY(-2px);
        }

        .payment-method.selected {
            border-color: var(--primary);
            background: rgba(10, 143, 221, 0.1);
        }

        .payment-method i {
            font-size: 24px;
            color: var(--primary);
            margin-bottom: 5px;
            display: block;
        }

        /* Reminder Badge */
        .reminder-badge {
            background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(5px);
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            animation: slideUp 0.3s;
        }

        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .header {
                flex-direction: column;
                text-align: center;
                gap: 15px;
            }

            .nav-tabs {
                justify-content: flex-start;
            }

            .form-row {
                grid-template-columns: 1fr;
            }
        }

        /* Loading Animation */
        .loader {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Success Check */
        .success-check {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #66bb6a, #43a047);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px auto;
            animation: scaleIn 0.5s;
        }

        .success-check i {
            color: white;
            font-size: 40px;
        }

        @keyframes scaleIn {
            0% { transform: scale(0); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }

        .stat-card {
            background: var(--glass);
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .stat-card i {
            font-size: 32px;
            color: var(--primary);
            margin-bottom: 10px;
        }

        .stat-card h3 {
            color: #333;
            font-size: 24px;
            margin-bottom: 5px;
        }

        .stat-card p {
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <!-- Animação de bolhas -->
    <div class="bubbles" id="bubbles"></div>

    <div class="app-container">
        <!-- Header -->
        <div class="header">
            <div class="logo-section">
                <div class="logo">AF</div>
                <div class="logo-text">
                    <h1>AF <span>Clean</span></h1>
                    <p>Higienização de estofados em geral</p>
                </div>
            </div>
            <button class="install-btn" onclick="installApp()">
                <i class="fas fa-download"></i> Instalar App
            </button>
        </div>

        <!-- Navigation -->
        <div class="nav-tabs">
            <button class="nav-tab active" onclick="showSection('dashboard')">
                <i class="fas fa-home"></i> Dashboard
            </button>
            <button class="nav-tab" onclick="showSection('agendamento')">
                <i class="fas fa-calendar-plus"></i> Novo Agendamento
            </button>
            <button class="nav-tab" onclick="showSection('clientes')">
                <i class="fas fa-users"></i> Clientes
            </button>
            <button class="nav-tab" onclick="showSection('servicos')">
                <i class="fas fa-clipboard-check"></i> Serviços
            </button>
            <button class="nav-tab" onclick="showSection('relatorios')">
                <i class="fas fa-chart-bar"></i> Relatórios
            </button>
        </div>

        <!-- Dashboard Section -->
        <div id="dashboard" class="content-section active">
            <div class="stats-grid">
                <div class="stat-card">
                    <i class="fas fa-calendar-day"></i>
                    <h3 id="stat-today">0</h3>
                    <p>Serviços Hoje</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-clock"></i>
                    <h3 id="stat-pending">0</h3>
                    <p>Pendentes</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-check-circle"></i>
                    <h3 id="stat-completed">0</h3>
                    <p>Concluídos</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-money-bill-wave"></i>
                    <h3 id="stat-revenue">R$ 0</h3>
                    <p>Receita do Mês</p>
                </div>
            </div>

            <div class="card">
                <h2><i class="fas fa-bell"></i> Lembretes de Retorno (6 meses)</h2>
                <div id="reminders-list" class="client-list">
                    <!-- Preenchido via JS -->
                </div>
            </div>
        </div>

        <!-- Agendamento Section -->
        <div id="agendamento" class="content-section">
            <div class="card">
                <h2><i class="fas fa-user-plus"></i> Novo Agendamento</h2>
                <form id="agendamentoForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nome do Cliente</label>
                            <input type="text" id="clientName" required placeholder="Nome completo">
                        </div>
                        <div class="form-group">
                            <label>Telefone</label>
                            <input type="tel" id="clientPhone" required placeholder="(11) 99999-9999">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Endereço</label>
                        <input type="text" id="clientAddress" required placeholder="Rua, número, bairro, cidade">
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Data do Serviço</label>
                            <input type="date" id="serviceDate" required>
                        </div>
                        <div class="form-group">
                            <label>Horário</label>
                            <input type="time" id="serviceTime" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Localização (Google Maps)</label>
                        <div style="display: flex; gap: 10px;">
                            <input type="text" id="mapsLink" placeholder="Cole
