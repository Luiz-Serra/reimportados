document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SELEÇÃO DE CONTROLES DE ESTOQUE
    const stockControls = document.querySelectorAll('.stock-control');

    stockControls.forEach(control => {
        // Seleção mais precisa dos botões e input
        const btnMinus = control.querySelector('.btn-qty:first-child');
        const btnPlus = control.querySelector('.btn-qty:last-child');
        const input = control.querySelector('input');
        
        // Sobe até a linha da tabela para achar o badge de status correspondente
        const row = control.closest('tr');
        const badge = row.querySelector('.badge');

        // FUNÇÃO PARA ATUALIZAR O STATUS (Cores e Texto)
        const updateStatus = (value) => {
            const qty = parseInt(value);

            if (qty <= 0) {
                badge.textContent = 'Sem Estoque';
                badge.style.background = '#ffe5e5';
                badge.style.color = '#ff4d4d';
            } else if (qty < 10) {
                badge.textContent = 'Crítico';
                badge.style.background = '#fff4e5';
                badge.style.color = '#ffa500';
            } else {
                badge.textContent = 'Estável';
                badge.style.background = '#e8f8f0';
                badge.style.color = '#2ecc71';
            }
        };

        // EVENTO: Botão de Adicionar (+)
        btnPlus.addEventListener('click', () => {
            let currentValue = parseInt(input.value) || 0;
            input.value = currentValue + 1;
            updateStatus(input.value);
        });

        // EVENTO: Botão de Subtrair (-)
        btnMinus.addEventListener('click', () => {
            let currentValue = parseInt(input.value) || 0;
            if (currentValue > 0) {
                input.value = currentValue - 1;
                updateStatus(input.value);
            }
        });

        // EVENTO: Digitação manual no campo
        input.addEventListener('input', () => {
            if (input.value < 0 || input.value === "") input.value = 0;
            updateStatus(input.value);
        });
    });

    // 2. LÓGICA DOS FILTROS (CARDS DE STATUS)
    const filterCards = document.querySelectorAll('.filter-card');
    
    filterCards.forEach(card => {
        card.addEventListener('click', () => {
            // Alterna a classe 'active' visualmente
            filterCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            const filterType = card.getAttribute('data-filter');
            filterTable(filterType);
        });
    });

    // FUNÇÃO PARA FILTRAR A TABELA
    function filterTable(type) {
        const rows = document.querySelectorAll('.inventory-table tbody tr');
        
        rows.forEach(row => {
            const status = row.querySelector('.badge').textContent.toLowerCase();
            
            if (type === 'all') {
                row.style.display = '';
            } else if (type === 'low' && status === 'crítico') {
                row.style.display = '';
            } else if (type === 'out' && status === 'sem estoque') {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // 1. CONFIGURAÇÃO DO GRÁFICO DE LINHA
    const ctxLine = document.getElementById('lineChartStock').getContext('2d');
    
    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
            datasets: [
                {
                    label: 'Quant. Atual de Estoque',
                    data: [33, 30, 40, 41, 43, 46, 50],
                    borderColor: '#3b82f6',
                    backgroundColor: '#3b82f6',
                    borderWidth: 2,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#3b82f6',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    tension: 0.4, // Suaviza a linha
                    fill: false,
                },
                {
                    label: 'Estoque Ideal',
                    data: [16, 14, 20, 21, 23, 24, 26],
                    borderColor: '#2ecc71',
                    backgroundColor: '#fff',
                    borderWidth: 2,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#2ecc71',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    fill: false,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 50,
                    ticks: {
                        stepSize: 10,
                        color: '#bbb',
                        font: { size: 10 }
                    },
                    grid: { color: '#f5f5f5' }
                },
                x: {
                    ticks: {
                        color: '#777',
                        font: { size: 10 }
                    },
                    grid: { display: false }
                }
            },
            plugins: {
                legend: { display: false } // Esconde a legenda nativa para usar a nossa customizada
            }
        }
    });

    // 2. CONFIGURAÇÃO DO GRÁFICO DE PIZZA (DONUT)
    const ctxPie = document.getElementById('pieChartCategories').getContext('2d');
    
    new Chart(ctxPie, {
        type: 'doughnut',
        data: {
            labels: ['Perfumes (40%)', 'Organic (40%)', 'Refrel (20%)', 'Social (20%)'],
            datasets: [{
                data: [40, 40, 20, 20],
                backgroundColor: ['#8b5cf6', '#22c55e', '#f97316', '#3b82f6'],
                hoverOffset: 4,
                borderWidth: 0, // Remove as bordas brancas
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%', // Faz o furo central maior (Rosca)
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 10,
                        usePointStyle: true, // Bolinhas em vez de quadrados
                        padding: 15,
                        color: '#777',
                        font: { size: 10 }
                    }
                }
            }
        }
    });
});