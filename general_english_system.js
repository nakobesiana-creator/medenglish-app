// ========== GENERAL ENGLISH SYSTEM A2→B2 ==========
// Sistema completo per la gestione del percorso A2→B2

// Inizializza il sistema General English
function initializeGeneralEnglish() {
    console.log('Initializing General English System...');
    updateGeneralProgress();
    updateLevelAccess();
    checkMedicalSectionAccess();
}

// Aggiorna il progresso generale
function updateGeneralProgress() {
    const currentLevelData = window.GeneralEnglishDatabase[window.currentGeneralLevel];
    if (!currentLevelData) {
        console.log('No data for level:', window.currentGeneralLevel);
        return;
    }
    
    const topics = Object.keys(currentLevelData.topics);
    const completedTopics = topics.filter(topicId => {
        const key = `${window.currentGeneralLevel}-${topicId}`;
        return (window.generalTopicProgress[key] || 0) >= 80;
    }).length;
    
    const levelProgress = Math.round((completedTopics / topics.length) * 100);
    window.generalLevelProgress[window.currentGeneralLevel] = levelProgress;
    
    // Salva progresso
    localStorage.setItem('generalLevelProgress', JSON.stringify(window.generalLevelProgress));
    localStorage.setItem('currentGeneralLevel', window.currentGeneralLevel);
    
    // Aggiorna UI
    const currentLevelDisplay = document.getElementById('currentGeneralLevelDisplay');
    const progressText = document.getElementById('generalProgressText');
    const progressBar = document.getElementById('generalProgressBar');
    
    if (currentLevelDisplay) currentLevelDisplay.textContent = window.currentGeneralLevel;
    if (progressText) progressText.textContent = `${levelProgress}%`;
    if (progressBar) progressBar.style.width = `${levelProgress}%`;
    
    const levelDisplay = document.getElementById('currentLevelDisplay');
    const detailProgress = document.getElementById('levelDetailProgress');
    const detailBar = document.getElementById('levelDetailProgressBar');
    
    if (levelDisplay) levelDisplay.textContent = window.currentGeneralLevel;
    if (detailProgress) detailProgress.textContent = `Progresso: ${levelProgress}%`;
    if (detailBar) detailBar.style.width = `${levelProgress}%`;
    
    // Aggiorna progresso per ogni livello
    ['A2', 'B1', 'B2'].forEach(level => {
        const progress = window.generalLevelProgress[level] || 0;
        const progressElement = document.getElementById(`progress${level}`);
        if (progressElement) {
            progressElement.textContent = `${progress}% completato`;
        }
    });
}
    
    // Aggiorna UI
    const currentLevelDisplay = document.getElementById('currentGeneralLevelDisplay');
    const progressText = document.getElementById('generalProgressText');
    const progressBar = document.getElementById('generalProgressBar');
    
    if (currentLevelDisplay) currentLevelDisplay.textContent = currentGeneralLevel;
    if (progressText) progressText.textContent = `${levelProgress}%`;
    if (progressBar) progressBar.style.width = `${levelProgress}%`;
    
    const levelDisplay = document.getElementById('currentLevelDisplay');
    const detailProgress = document.getElementById('levelDetailProgress');
    const detailBar = document.getElementById('levelDetailProgressBar');
    
    if (levelDisplay) levelDisplay.textContent = currentGeneralLevel;
    if (detailProgress) detailProgress.textContent = `Progresso: ${levelProgress}%`;
    if (detailBar) detailBar.style.width = `${levelProgress}%`;
    
    // Aggiorna progresso per ogni livello
    ['A2', 'B1', 'B2'].forEach(level => {
        const progress = generalLevelProgress[level] || 0;
        const progressElement = document.getElementById(`progress${level}`);
        if (progressElement) {
            progressElement.textContent = `${progress}% completato`;
        }
    });
}

// Aggiorna accesso ai livelli
function updateLevelAccess() {
    const levels = ['A2', 'B1', 'B2'];
    
    levels.forEach((level, index) => {
        const card = document.getElementById(`levelCard${level}`);
        const status = document.getElementById(`status${level}`);
        const accessBtn = document.getElementById(`access${level}`);
        const levelNode = document.getElementById(`level${level}`);
        
        if (!card) return;
        
        let canAccess = false;
        let statusText = '';
        let statusColor = '#666';
        
        if (level === 'A2') {
            canAccess = true;
            statusText = '✅ Disponibile';
            statusColor = '#28a745';
        } else {
            const previousLevel = levels[index - 1];
            const previousProgress = window.generalLevelProgress[previousLevel] || 0;
            
            if (previousProgress >= 80) {
                canAccess = true;
                statusText = '✅ Sbloccato';
                statusColor = '#28a745';
            } else {
                canAccess = false;
                statusText = `🔒 Richiede ${previousLevel} (80%)`;
                statusColor = '#666';
            }
        }
        
        // Aggiorna UI
        card.style.opacity = canAccess ? '1' : '0.5';
        card.style.pointerEvents = canAccess ? 'auto' : 'none';
        
        if (status) {
            status.textContent = statusText;
            status.style.color = statusColor;
        }
        
        if (accessBtn) {
            accessBtn.disabled = !canAccess;
            accessBtn.style.opacity = canAccess ? '1' : '0.5';
        }
        
        if (levelNode) {
            if (canAccess) {
                const progress = window.generalLevelProgress[level] || 0;
                if (progress >= 80) {
                    levelNode.style.background = '#28a745';
                } else if (level === window.currentGeneralLevel) {
                    levelNode.style.background = '#007bff';
                } else {
                    levelNode.style.background = '#ffc107';
                }
                levelNode.style.color = 'white';
            } else {
                levelNode.style.background = '#e0e0e0';
                levelNode.style.color = '#666';
            }
        }
    });
}

// Controlla accesso alla sezione medica
function checkMedicalSectionAccess() {
    const medicalSection = document.getElementById('medicalSection');
    if (!medicalSection) return;
    
    const b2Progress = window.generalLevelProgress['B2'] || 0;
    
    if (b2Progress >= window.MEDICAL_ACCESS_THRESHOLD) {
        medicalSection.style.opacity = '1';
        medicalSection.style.pointerEvents = 'auto';
        
        const heading = medicalSection.querySelector('h5');
        if (heading) {
            heading.textContent = '🏥 Medical English (Sbloccato!)';
            heading.style.color = '#28a745';
        }
        
        const statusDiv = medicalSection.querySelector('div[style*="font-size: 11px"]');
        if (statusDiv) {
            statusDiv.innerHTML = '✅ <strong>Congratulazioni!</strong> Hai sbloccato i contenuti medici';
            statusDiv.style.color = '#28a745';
        }
        
        if (!localStorage.getItem('medicalSectionUnlocked')) {
            setTimeout(() => {
                showMedicalUnlockedNotification();
                localStorage.setItem('medicalSectionUnlocked', 'true');
            }, 1000);
        }
    } else {
        medicalSection.style.opacity = '0.3';
        medicalSection.style.pointerEvents = 'none';
        
        const heading = medicalSection.querySelector('h5');
        if (heading) {
            heading.textContent = `🏥 Medical English (Richiede B2 ${window.MEDICAL_ACCESS_THRESHOLD}%)`;
            heading.style.color = '#666';
        }
        
        const statusDiv = medicalSection.querySelector('div[style*="font-size: 11px"]');
        if (statusDiv) {
            statusDiv.innerHTML = `🔒 Completa B2 General English (${b2Progress}/${window.MEDICAL_ACCESS_THRESHOLD}%)`;
            statusDiv.style.color = '#666';
        }
    }
}

// Seleziona un livello generale
function selectGeneralLevel(level) {
    console.log('Selecting level:', level);
    
    // Prima mostra la sezione general-english
    if (typeof showLesson === 'function') {
        showLesson('general-english');
    }
    
    if (level !== 'A2') {
        const levels = ['A2', 'B1', 'B2'];
        const levelIndex = levels.indexOf(level);
        const previousLevel = levels[levelIndex - 1];
        const previousProgress = window.generalLevelProgress[previousLevel] || 0;
        
        if (previousProgress < 80) {
            showLevelAccessDenied(level, previousLevel, previousProgress);
            return;
        }
    }
    
    window.currentGeneralLevel = level;
    localStorage.setItem('currentGeneralLevel', level);
    
    const levelContent = document.getElementById('levelContent');
    if (levelContent) {
        levelContent.classList.remove('hidden');
        levelContent.style.display = 'block';
    }
    
    const levelData = window.GeneralEnglishDatabase[level];
    const titleElement = document.getElementById('selectedLevelTitle');
    const descElement = document.getElementById('selectedLevelDescription');
    
    if (titleElement) titleElement.textContent = `${level} - ${levelData.name}`;
    if (descElement) descElement.textContent = levelData.description;
    
    generateTopicButtons(level);
    
    if (levelContent) {
        levelContent.scrollIntoView({ behavior: 'smooth' });
    }
    
    updateGeneralProgress();
}
    
    updateGeneralProgress();
}

// Genera pulsanti per i topic
function generateTopicButtons(level) {
    const levelData = window.GeneralEnglishDatabase[level];
    const topicButtons = document.getElementById('topicButtons');
    
    if (!topicButtons) return;
    
    topicButtons.innerHTML = '';
    
    Object.keys(levelData.topics).forEach(topicId => {
        const topic = levelData.topics[topicId];
        const key = `${level}-${topicId}`;
        const progress = window.generalTopicProgress[key] || 0;
        
        const button = document.createElement('button');
        button.className = 'foundation-topic-btn';
        button.onclick = () => loadGeneralTopic(level, topicId);
        
        let bgColor = '#f8f9fa';
        let borderColor = '#dee2e6';
        let statusText = '🔒 Da completare';
        let statusColor = '#666';
        
        if (progress >= 80) {
            bgColor = '#d4edda';
            borderColor = '#28a745';
            statusText = '✅ Completato';
            statusColor = '#28a745';
        } else if (progress > 0) {
            bgColor = '#fff3cd';
            borderColor = '#ffc107';
            statusText = `🔄 In corso (${progress}%)`;
            statusColor = '#856404';
        }
        
        button.style.cssText = `
            padding: 15px; 
            background: ${bgColor}; 
            border: 2px solid ${borderColor}; 
            border-radius: 8px; 
            cursor: pointer; 
            text-align: left;
            transition: all 0.3s ease;
        `;
        
        button.innerHTML = `
            <strong>${topic.title}</strong><br>
            <small style="color: #666;">5 domande per testare le competenze</small>
            <div style="font-size: 11px; font-weight: bold; color: ${statusColor}; margin-top: 5px;">${statusText}</div>
        `;
        
        topicButtons.appendChild(button);
    });
}

// Carica un topic generale
function loadGeneralTopic(level, topicId) {
    console.log('Loading topic:', level, topicId);
    
    window.currentGeneralLevel = level;
    window.currentGeneralTopic = topicId;
    window.currentGeneralQuestionIndex = 0;
    
    const topic = window.GeneralEnglishDatabase[level].topics[topicId];
    if (!topic) {
        console.error('Topic not found:', level, topicId);
        return;
    }
    
    const questionArea = document.getElementById('questionArea');
    if (questionArea) {
        questionArea.style.display = 'block';
    }
    
    loadGeneralQuestion();
    
    if (questionArea) {
        questionArea.scrollIntoView({ behavior: 'smooth' });
    }
}

// Carica una domanda generale
function loadGeneralQuestion() {
    if (!window.currentGeneralLevel || !window.currentGeneralTopic) {
        console.error('No level or topic selected');
        return;
    }
    
    const topic = window.GeneralEnglishDatabase[window.currentGeneralLevel].topics[window.currentGeneralTopic];
    const question = topic.questions[window.currentGeneralQuestionIndex];
    
    if (!question) {
        completeGeneralTopic();
        return;
    }
    
    const questionElement = document.getElementById('generalQuestion');
    if (questionElement) {
        questionElement.innerHTML = `
            <h3>${topic.title} - Domanda ${window.currentGeneralQuestionIndex + 1}/${topic.questions.length}</h3>
            <p>${question.question}</p>
        `;
    }
    
    const optionsElement = document.getElementById('generalOptions');
    if (optionsElement) {
        optionsElement.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option';
            button.textContent = option;
            button.onclick = () => checkGeneralAnswer(button, index === question.correct, question.explanation);
            optionsElement.appendChild(button);
        });
    }
    
    const feedback = document.getElementById('generalFeedback');
    const nextBtn = document.getElementById('generalNextBtn');
    
    if (feedback) feedback.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
}

// Controlla risposta generale
function checkGeneralAnswer(element, isCorrect, explanation) {
    const options = element.parentNode.querySelectorAll('.option');
    options.forEach(opt => opt.disabled = true);
    
    const key = `${window.currentGeneralLevel}-${window.currentGeneralTopic}`;
    
    if (isCorrect) {
        element.classList.add('correct');
        showGeneralFeedback(`✅ Corretto! ${explanation}`, 'success');
        
        if (!window.generalTopicProgress[key]) {
            window.generalTopicProgress[key] = 0;
        }
        window.generalTopicProgress[key] += 20;
        
        if (typeof wordsLearned !== 'undefined') {
            wordsLearned += 3;
        }
        if (typeof updateProgress === 'function') {
            updateProgress();
        }
    } else {
        element.classList.add('incorrect');
        options.forEach(opt => {
            if (opt.onclick.toString().includes('true')) {
                opt.classList.add('correct');
            }
        });
        showGeneralFeedback(`❌ Non corretto. ${explanation}`, 'error');
    }
    
    const nextBtn = document.getElementById('generalNextBtn');
    if (nextBtn) nextBtn.style.display = 'inline-block';
    
    localStorage.setItem('generalTopicProgress', JSON.stringify(window.generalTopicProgress));
}

// Mostra feedback generale
function showGeneralFeedback(message, type) {
    const feedback = document.getElementById('generalFeedback');
    if (feedback) {
        feedback.innerHTML = message;
        feedback.className = `feedback ${type}`;
        feedback.style.display = 'block';
    }
}

// Prossima domanda generale
function nextGeneralQuestion() {
    window.currentGeneralQuestionIndex++;
    loadGeneralQuestion();
}

// Completa topic generale
function completeGeneralTopic() {
    const key = `${window.currentGeneralLevel}-${window.currentGeneralTopic}`;
    const score = window.generalTopicProgress[key] || 0;
    const topic = window.GeneralEnglishDatabase[window.currentGeneralLevel].topics[window.currentGeneralTopic];
    
    let message = '';
    
    if (score >= 80) {
        message = `🎉 Eccellente! Hai completato "${topic.title}" con ${score}% di successo!`;
        
        if (typeof wordsLearned !== 'undefined') {
            wordsLearned += 10;
        }
        if (typeof lessonsCompleted !== 'undefined') {
            lessonsCompleted += 1;
        }
    } else {
        message = `📚 Hai completato "${topic.title}" con ${score}%. Riprova per migliorare il punteggio!`;
    }
    
    const questionElement = document.getElementById('generalQuestion');
    if (questionElement) {
        questionElement.innerHTML = `
            <h3>Topic Completato!</h3>
            <p>${message}</p>
            <div style="margin: 20px 0;">
                <button class="btn" onclick="retryGeneralTopic()" style="margin-right: 10px;">
                    🔄 Riprova Topic
                </button>
                <button class="btn btn-success" onclick="backToGeneralMenu()">
                    📚 Torna al Menu
                </button>
            </div>
        `;
    }
    
    const optionsElement = document.getElementById('generalOptions');
    const feedback = document.getElementById('generalFeedback');
    const nextBtn = document.getElementById('generalNextBtn');
    
    if (optionsElement) optionsElement.innerHTML = '';
    if (feedback) feedback.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    
    updateGeneralProgress();
    updateLevelAccess();
    checkMedicalSectionAccess();
    if (typeof updateProgress === 'function') {
        updateProgress();
    }
    
    const levelData = window.GeneralEnglishDatabase[window.currentGeneralLevel];
    const topics = Object.keys(levelData.topics);
    const completedTopics = topics.filter(topicId => {
        const topicKey = `${window.currentGeneralLevel}-${topicId}`;
        return (window.generalTopicProgress[topicKey] || 0) >= 80;
    }).length;
    
    if (completedTopics === topics.length) {
        setTimeout(() => {
            showLevelCompletedNotification(window.currentGeneralLevel);
        }, 1000);
    }
}

// Riprova topic generale
function retryGeneralTopic() {
    const key = `${window.currentGeneralLevel}-${window.currentGeneralTopic}`;
    window.currentGeneralQuestionIndex = 0;
    window.generalTopicProgress[key] = 0;
    localStorage.setItem('generalTopicProgress', JSON.stringify(window.generalTopicProgress));
    loadGeneralQuestion();
    generateTopicButtons(window.currentGeneralLevel);
}

// Torna al menu generale
function backToGeneralMenu() {
    const questionArea = document.getElementById('questionArea');
    if (questionArea) {
        questionArea.style.display = 'none';
    }
    window.currentGeneralTopic = null;
    window.currentGeneralQuestionIndex = 0;
    generateTopicButtons(window.currentGeneralLevel);
}

// Mostra notifica livello completato
function showLevelCompletedNotification(level) {
    const nextLevels = { 'A2': 'B1', 'B1': 'B2', 'B2': 'Medical English' };
    const nextLevel = nextLevels[level];
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        color: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 3000;
        text-align: center;
        max-width: 500px;
        animation: bounceIn 0.8s ease;
    `;
    
    notification.innerHTML = `
        <div style="font-size: 5em; margin-bottom: 20px;">🎓</div>
        <h2 style="margin: 0 0 15px 0;">${level} Completato!</h2>
        <p style="font-size: 1.2em; margin-bottom: 20px;">
            Congratulazioni! Hai sbloccato <strong>${nextLevel}</strong>!
        </p>
        <p style="margin-bottom: 30px; opacity: 0.9;">
            ${level === 'B2' ? 
                'Ora puoi accedere a tutti i contenuti medici specializzati!' : 
                `Continua il tuo percorso verso il livello ${nextLevel}.`
            }
        </p>
        <button onclick="this.parentElement.remove(); ${level === 'B2' ? 'if(typeof showLesson === \'function\') showLesson(\'vocabulary\')' : `selectGeneralLevel('${nextLevel}')`}" 
                style="background: white; color: #28a745; border: none; padding: 15px 30px; border-radius: 10px; cursor: pointer; font-size: 16px; font-weight: bold; margin-right: 10px;">
            ${level === 'B2' ? '🚀 Vai ai Contenuti Medici' : `📚 Inizia ${nextLevel}`}
        </button>
        <button onclick="this.parentElement.remove()" 
                style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px 30px; border-radius: 10px; cursor: pointer; font-size: 16px;">
            Continua Più Tardi
        </button>
    `;
    
    document.body.appendChild(notification);
}

// Mostra notifica sezione medica sbloccata
function showMedicalUnlockedNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ffc107 0%, #ff8f00 100%);
        color: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 3000;
        text-align: center;
        max-width: 500px;
        animation: bounceIn 0.8s ease;
    `;
    
    notification.innerHTML = `
        <div style="font-size: 5em; margin-bottom: 20px;">🏥</div>
        <h2 style="margin: 0 0 15px 0;">Medical English Sbloccato!</h2>
        <p style="font-size: 1.2em; margin-bottom: 20px;">
            Hai raggiunto il <strong>B2</strong>! Ora puoi accedere ai contenuti medici specializzati!
        </p>
        <p style="margin-bottom: 30px; opacity: 0.9;">
            Grammatica medica, vocabolario clinico, conversazioni AI, roleplay medici e molto altro ti aspettano!
        </p>
        <button onclick="this.parentElement.remove(); if(typeof showLesson === 'function') showLesson('vocabulary')" 
                style="background: white; color: #ff8f00; border: none; padding: 15px 30px; border-radius: 10px; cursor: pointer; font-size: 16px; font-weight: bold; margin-right: 10px;">
            🚀 Inizia Sezione Medica
        </button>
        <button onclick="this.parentElement.remove()" 
                style="background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 15px 30px; border-radius: 10px; cursor: pointer; font-size: 16px;">
            Continua Più Tardi
        </button>
    `;
    
    document.body.appendChild(notification);
}

// Mostra messaggio accesso negato al livello
function showLevelAccessDenied(level, previousLevel, previousProgress) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 2500;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 15px;
        max-width: 500px;
        text-align: center;
        box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    `;
    
    content.innerHTML = `
        <div style="font-size: 4em; margin-bottom: 20px;">🔒</div>
        <h3 style="color: #dc3545; margin-bottom: 15px;">Livello ${level} Bloccato</h3>
        <p style="margin-bottom: 20px; line-height: 1.6;">
            Per accedere al livello <strong>${level}</strong>, devi prima completare il 
            <strong>${previousLevel}</strong> con almeno 80% di successo.
        </p>
        <p style="margin-bottom: 25px; color: #666;">
            Progresso ${previousLevel} attuale: <strong>${previousProgress}%</strong>
        </p>
        <div>
            <button onclick="this.closest('[style*=\"position: fixed\"]').remove(); selectGeneralLevel('${previousLevel}')" 
                    style="background: #007bff; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin-right: 10px;">
                📚 Vai a ${previousLevel}
            </button>
            <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" 
                    style="background: #6c757d; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                Chiudi
            </button>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Mostra messaggio accesso negato alla sezione medica
function showMedicalAccessDenied() {
    const b2Progress = window.generalLevelProgress['B2'] || 0;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 2500;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 15px;
        max-width: 500px;
        text-align: center;
        box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    `;
    
    content.innerHTML = `
        <div style="font-size: 4em; margin-bottom: 20px;">🔒</div>
        <h3 style="color: #dc3545; margin-bottom: 15px;">Sezione Medica Bloccata</h3>
        <p style="margin-bottom: 20px; line-height: 1.6;">
            Per accedere ai contenuti medici specializzati, devi prima completare il 
            <strong>B2 General English</strong> con almeno ${MEDICAL_ACCESS_THRESHOLD}% di successo.
        </p>
        <p style="margin-bottom: 25px; color: #666;">
            Progresso B2 attuale: <strong>${b2Progress}%</strong>
        </p>
        <div>
            <button onclick="this.closest('[style*=\"position: fixed\"]').remove(); if(typeof showLesson === 'function') showLesson('general-english')" 
                    style="background: #007bff; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin-right: 10px;">
                📚 Vai al General English
            </button>
            <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" 
                    style="background: #6c757d; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                Chiudi
            </button>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Accede a un livello generale (dalla sidebar)
function accessGeneralLevel(level) {
    selectGeneralLevel(level);
}

console.log('General English System loaded successfully');
