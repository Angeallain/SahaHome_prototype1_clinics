function getRandomPriority() {
    const priorities = ['urgent', 'instant', 'rendezvous']; 
    const randomIndex = Math.floor(Math.random() * priorities.length);
    return priorities[randomIndex];
}


function getPriorityDisplay(key) {
    const priorityMap = {
        'urgent': { text: '🚨 URGENT', cssClass: 'priority-urgent' },
        'instant': { text: '⚡ Intervention Instantanée', cssClass: 'priority-instant' },
        'rendezvous': { text: '🗓️ Rendez-vous', cssClass: 'priority-rendezvous' },
    };
    return priorityMap[key] || priorityMap['instant']; 
}


let requestsData = [
    {
        id: 'REQ-2024-001',
        type: 'Soins infirmiers',
        service: 'Pansements et soins',
        patient: 'Mme Fatima Djelali',
        location: 'Rue des Martyrs, Oued Smar',
        distance: '1.2 km',
        time: 'Il y a 2 min',
        // Priorité aléatoire (peut être urgent, instantané ou rendez-vous)
        priority: getRandomPriority(), 
        details: 'Pansement post-opératoire, changement quotidien requis',
        // Ajout d'une heure de RDV pour le test si c'est un RDV
        appointmentTime: 'Jeudi 26/09 à 10:00'
    },
    {
        id: 'REQ-2024-002',
        type: 'Consultation',
        service: 'Consultation générale',
        patient: 'M. Karim Benaissa',
        location: 'Cité 500 logements, Oued Smar',
        distance: '2.1 km',
        time: 'Il y a 15 min',
        priority: getRandomPriority(),
        details: 'Consultation de contrôle, patient âgé avec mobilité réduite',
        appointmentTime: null
    },
    {
        id: 'REQ-2024-003',
        type: 'Kinésithérapie',
        service: 'Séance de rééducation',
        patient: 'M. Youcef Hamidi',
        location: 'Boulevard de l\'Independence, Dar El Beida',
        distance: '3.5 km',
        time: 'Il y a 45 min',
        priority: getRandomPriority(), 
        details: 'Rééducation suite à fracture, 3ème séance',
        // Ajout d'une heure de RDV pour le test si c'est un RDV
        appointmentTime: 'Vendredi 27/09 à 14:30'
    }
];


let activeRequestsCount = 1;


function updateActiveRequestsBadge() {
    const badge = document.getElementById('activeRequestsBadge');
    if (badge) {
        badge.textContent = activeRequestsCount;
    }
}

function addActiveRequest(request) {
    const container = document.getElementById('activeRequestsContainer');
    
    const now = new Date();
    const eta = new Date(now.getTime() + 30 * 60000);
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const etaString = `${eta.getHours().toString().padStart(2, '0')}:${eta.getMinutes().toString().padStart(2, '0')}`;

    const newActiveRequestHtml = `
        <div class="active-request new-active-service" data-id="${request.id}">
            <div class="active-request-status" style="color: #2c7a7b; font-weight: 600; animation: pulse 2s infinite;">
                ✅ Accepté - Préparation du service
            </div>
            <div style="color: #4a5568; font-size: 13px; margin-bottom: 4px;">
                ${request.patient} - ${request.service} (${request.type})
            </div>
            <div style="color: #4a5568; font-size: 13px; margin-bottom: 4px;">
                📍 ${request.location}
            </div>
            <div style="color: #718096; font-size: 12px; margin-top: 8px;">
                Départ estimé: ${timeString} - ETA: ${etaString}
            </div>
        </div>
    `;

    // Ajoute le nouveau service au début de la liste
    container.insertAdjacentHTML('afterbegin', newActiveRequestHtml);
    
    // Met à jour le compteur et le badge
    activeRequestsCount++;
    updateActiveRequestsBadge();
}


function initServiceEvolutionChart() {
    const ctx = document.getElementById('serviceEvolutionChart');

    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['J-29', 'J-24', 'J-19', 'J-14', 'J-9', 'J-4', 'Aujourd\'hui'],
                datasets: [{
                    label: 'Nombre de Services',
                    data: [8, 12, 10, 15, 13, 18, 16],
                    backgroundColor: 'rgba(44, 122, 123, 0.1)', // Light teal
                    borderColor: '#2c7a7b', // Teal
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#2c7a7b',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 6,
                    pointRadius: 4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f0f4f8'
                        },
                        ticks: {
                            stepSize: 2
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}
// END NEW SERVICE EVOLUTION CHART INITIALIZATION FUNCTION


function initRevenueChart() {
    const ctx = document.getElementById('revenueChart');

    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep'],
                datasets: [{
                    label: 'Revenus (DA)',
                    data: [150000, 185000, 200000, 195000, 220000, 245600, 250000, 230000, 245600],
                    backgroundColor: [
                        '#667eea', 
                        '#764ba2',
                        '#667eea', 
                        '#764ba2',
                        '#667eea', 
                        '#764ba2',
                        '#667eea',
                        '#764ba2',
                        '#667eea',
                    ],
                    borderRadius: 5,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}


function login() {
    const clinicName = document.getElementById('clinicName').value;
    if (clinicName.trim()) {
        document.getElementById('dashboardClinicName').textContent = clinicName;
    }
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').classList.add('active');
    loadRequests();
    startNotificationSimulation();
    // 3. CALL BOTH CHART FUNCTIONS HERE
    initRevenueChart(); 
    initServiceEvolutionChart(); 
    updateActiveRequestsBadge(); // Initialise le badge au chargement
}


function showSection(sectionName, event) {
    event.preventDefault();
    
    
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.remove('active');
    });
    
    
    let targetId = sectionName + '-section';
    
  
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.closest('.nav-link').classList.add('active');
    
    
    const titles = {
        'dashboard': 'Dashboard',
        'planning': 'Planning',
        'patients': 'Patients', 
        'services': 'Services',
        'rapports': 'Rapports',
        'messagerie': 'Messagerie',
        'finances': 'Finances',
        'parametres': 'Paramètres'
    };
    document.querySelector('.page-title').textContent = titles[sectionName] || 'Dashboard';
}


function loadRequests() {
    const requestsList = document.getElementById('requestsList');
    
    if (requestsData.length === 0) {
        requestsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <div>Aucune demande en attente</div>
                <div style="font-size: 14px; margin-top: 5px;">Les nouvelles demandes apparaîtront ici automatiquement</div>
            </div>
        `;
        return;
    }

    requestsList.innerHTML = requestsData.map((request, index) => {
        // Utilise la fonction de mapping pour obtenir l'affichage correct
        const displayInfo = getPriorityDisplay(request.priority);
        
        // NOUVEAU: Affichage de l'heure de RDV si la priorité est 'rendezvous'
        let timeDetail = '';
        if (request.priority === 'rendezvous' && request.appointmentTime) {
            timeDetail = `
                <div class="request-detail" style="font-weight: 600; color: #4c51bf;">
                    <span>🗓️</span> Heure du RDV: ${request.appointmentTime}
                </div>
            `;
        }

        return `
            <div class="request-card ${index === 0 ? 'new' : ''}" data-id="${request.id}">
                <div class="request-header">
                    <div class="request-id">${request.id}</div>
                    <div class="request-time">${request.time}</div>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                    <span class="priority-badge ${displayInfo.cssClass}">
                        ${displayInfo.text}
                    </span>
                    <span class="request-type" style="margin-bottom: 0;">${request.type}</span>
                </div>
                
                <div class="request-details">
                    <div class="request-detail">
                        <span>👤</span> <strong>${request.patient}</strong>
                    </div>
                    <div class="request-detail">
                        <span>🔧</span> ${request.service}
                    </div>
                    ${timeDetail} <div class="request-detail">
                        <span>📍</span> <span class="request-location">${request.location}</span>
                        <span class="distance-badge">${request.distance}</span>
                    </div>
                    <div class="request-detail" style="font-size: 13px; color: #666; margin-top: 8px;">
                        💬 ${request.details}
                    </div>
                </div>
                <div class="request-actions">
                    <button class="btn btn-reject" onclick="rejectRequest('${request.id}')">
                        ❌ Refuser
                    </button>
                    <button class="btn btn-accept" onclick="acceptRequest('${request.id}')">
                        ✅ Accepter
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function acceptRequest(requestId) {
    // 1. Trouver l'objet requête AVANT de le retirer
    const acceptedRequest = requestsData.find(req => req.id === requestId);
    
    // 2. L'ajouter à la liste des Services en cours
    if (acceptedRequest) {
        addActiveRequest(acceptedRequest);
    }
    
    // 3. Retirer de la liste des requêtes en attente
    requestsData = requestsData.filter(req => req.id !== requestId);
    loadRequests();
    
    // 4. Mise à jour des stats et notifications
    updateStats();
    showNotification('✅ Demande acceptée! Le patient a été notifié et le service est en cours de préparation.', 'success');
    updateRequestsBadge();
}

function rejectRequest(requestId) {
    requestsData = requestsData.filter(req => req.id !== requestId);
    loadRequests();
    showNotification('ℹ️ Demande refusée. Elle sera proposée à d\'autres cliniques.', 'info');
    updateRequestsBadge();
}

function updateStats() {
    const todayElement = document.getElementById('todayRequests');
    todayElement.textContent = parseInt(todayElement.textContent) + 1;
}

function updateRequestsBadge() {
    const badge = document.getElementById('requestsBadge');
    badge.textContent = requestsData.length;
    if (requestsData.length === 0) {
        badge.style.display = 'none';
    } else {
         badge.style.display = 'inline-flex';
    }
}

function toggleAvailability() {
    const toggle = document.getElementById('availabilityToggle');
    const status = document.querySelector('.online-status');
    
    if (toggle.checked) {
        status.innerHTML = '🟢 En ligne - Oued Smar, Alger';
        status.style.color = '#48bb78';
        showNotification('✅ Vous êtes maintenant en ligne et recevrez les demandes.', 'success');
    } else {
        status.innerHTML = '🔴 Hors ligne';
        status.style.color = '#e53e3e';
        showNotification('⏸️ Vous êtes hors ligne. Aucune nouvelle demande ne sera reçue.', 'info');
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : '#319795'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 1000;
        max-width: 300px;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function startNotificationSimulation() {
    setTimeout(() => {
        const priority = getRandomPriority(); // Utilise la nouvelle fonction
        
        const newRequest = {
            id: 'REQ-2024-004',
            type: 'Analyses',
            service: 'Prise de sang à domicile',
            patient: 'Mme Aicha Boudjelal',
            location: 'Résidence El Wahat, Oued Smar',
            distance: '0.8 km',
            time: 'Maintenant',
            priority: priority, 
            details: 'Analyses de routine, patient diabétique',
            // Ajout conditionnel de l'heure du RDV
            appointmentTime: (priority === 'rendezvous' ? 'Lundi 30/09 à 09:00' : null)
        };
        
        requestsData.unshift(newRequest);
        loadRequests();
        updateRequestsBadge();
        showNotification('🔔 Nouvelle demande reçue!', 'info');
    }, 10000);
}

function showAddAppointmentModal() {
    showNotification('💡 Fonctionnalité en développement - Modal d\'ajout de RDV', 'info');
}

function showAddPatientModal() {
    showNotification('💡 Fonctionnalité en développement - Modal d\'ajout de patient', 'info');
}

function showAddServiceModal() {
    showNotification('💡 Fonctionnalité en développement - Modal d\'ajout de service', 'info');
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
