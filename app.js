        // Inizializza l'app con il database
        const app = new MedEnglishApp();
        
        // Variabili globali per il progresso
        let currentLevel = app.currentUser.level;
        let overallProgress = app.currentUser.progress || 25;
        let streakDays = app.currentUser.streak || 7;
        let wordsLearned = app.currentUser.totalPoints / 10 || 342;
        let lessonsCompleted = app.currentUser.progress || 28;
        
        // NUOVO: Sistema di sblocco progressivo B2
        let foundationCompleted = localStorage.getItem('foundationCompleted') === 'true' || false;
        let foundationProgress = parseInt(localStorage.getItem('foundationProgress')) || 0;
        let currentGeneralLevel = localStorage.getItem('currentGeneralLevel') || 'A2';
        let generalLevelProgress = JSON.parse(localStorage.getItem('generalLevelProgress')) || {
            A2: 0, B1: 0, B2: 0
        };
        const MEDICAL_ACCESS_LEVEL = 'B2'; // Livello richiesto per accesso medico
        const MEDICAL_ACCESS_THRESHOLD = 80; // Punteggio minimo B2 per sbloccare medico
        
        // PREMIUM SYSTEM
        app.currentUser.subscription = localStorage.getItem('userSubscription') || 'free'; // 'free' or 'premium'

        function checkPremiumAccess(featureName) {
            if (app.currentUser.subscription === 'premium') return true;
            
            showPremiumModal(featureName);
            return false;
        }

        function showPremiumModal(featureName) {
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content-base premium-modal">
                    <div class="premium-icon">👑</div>
                    <h3 class="premium-title">Upgrade to MedEnglish Pro</h3>
                    <p class="premium-text">
                        The <strong>${featureName}</strong> feature is available only for Premium members.
                    </p>
                    <ul class="premium-features-list">
                        <li>🤖 Unlimited AI Medical Chat</li>
                        <li>🎭 Advanced Clinical Roleplays</li>
                        <li>📸 Full Medical Imaging Library</li>
                        <li>🎓 C1/C2 Advanced Research Papers</li>
                    </ul>
                    <button onclick="upgradeToPremium()" class="btn-premium-action">
                        🚀 Upgrade Now - $9.99/mo
                    </button>
                    <button onclick="this.closest('.modal-overlay').remove()" class="modal-close-btn">
                        Maybe Later
                    </button>
                </div>
            `;
            document.body.appendChild(modal);
        }

        function upgradeToPremium() {
            // Simulate payment processing
            const btn = document.querySelector('.btn-premium-action');
            btn.textContent = 'Processing...';
            btn.disabled = true;
            
            setTimeout(() => {
                app.currentUser.subscription = 'premium';
                localStorage.setItem('userSubscription', 'premium');
                document.querySelector('.modal-overlay').remove();
                showMicrolearningNotification("🎉 Welcome to Premium! All features unlocked.", "success");
                updatePremiumUI();
            }, 1500);
        }

        function updatePremiumUI() {
            const statusBadge = document.getElementById('subscriptionStatus');
            if (statusBadge) {
                if (app.currentUser.subscription === 'premium') {
                    statusBadge.textContent = '👑 Premium Member';
                    statusBadge.className = 'badge badge-premium';
                } else {
                    statusBadge.textContent = 'Free Plan';
                    statusBadge.className = 'badge badge-free';
                }
            }
            
            // Unlock visual elements
            document.querySelectorAll('.premium-lock-icon').forEach(icon => {
                if (app.currentUser.subscription === 'premium') {
                    icon.style.display = 'none';
                } else {
                    icon.style.display = 'inline-block';
                }
            });
        }

        
        // Dizionario medico completo dal database
        const medicalDictionary = {};

        // Helper function for progress bars
        function updateProgressBar(elementId, percentage) {
            const bar = document.getElementById(elementId);
            if (bar) {
                bar.style.width = `${percentage}%`;
                bar.setAttribute('aria-valuenow', percentage);
                bar.setAttribute('aria-valuemin', '0');
                bar.setAttribute('aria-valuemax', '100');
            }
        }
        
        // NUOVO: Database General English Completo (A2→B2)
        const GeneralEnglishDatabase = {
            A2: {
                name: "Elementary English",
                description: "Fondamenti della comunicazione inglese",
                topics: {
                    'grammar-basics': {
                        title: 'Grammar Basics',
                        questions: [
                            {
                                question: "Choose the correct form: 'I _____ a doctor.'",
                                options: ["am", "is", "are", "be"],
                                correct: 0,
                                explanation: "'I am' is the correct form of the verb 'to be' with the first person singular."
                            },
                            {
                                question: "Complete: 'She _____ to work every day.'",
                                options: ["go", "goes", "going", "went"],
                                correct: 1,
                                explanation: "With third person singular (she), we add 's' to the verb in present simple."
                            },
                            {
                                question: "Choose the correct article: '_____ apple a day keeps the doctor away.'",
                                options: ["A", "An", "The", "No article"],
                                correct: 1,
                                explanation: "We use 'an' before words that start with a vowel sound."
                            },
                            {
                                question: "Past tense of 'eat':",
                                options: ["eated", "ate", "eaten", "eating"],
                                correct: 1,
                                explanation: "'Ate' is the simple past form of the irregular verb 'eat'."
                            },
                            {
                                question: "Complete: 'There _____ many people in the hospital.'",
                                options: ["is", "are", "was", "be"],
                                correct: 1,
                                explanation: "We use 'are' with plural subjects like 'many people'."
                            }
                        ]
                    },
                    'everyday-vocabulary': {
                        title: 'Everyday Vocabulary',
                        questions: [
                            {
                                question: "What do you call the person who treats sick people?",
                                options: ["Teacher", "Doctor", "Engineer", "Lawyer"],
                                correct: 1,
                                explanation: "A doctor is a medical professional who treats patients."
                            },
                            {
                                question: "Where do you go when you're very sick?",
                                options: ["School", "Hospital", "Restaurant", "Cinema"],
                                correct: 1,
                                explanation: "A hospital is where people go for medical treatment."
                            },
                            {
                                question: "What do you take when you have a headache?",
                                options: ["Food", "Medicine", "Water", "Rest"],
                                correct: 1,
                                explanation: "Medicine (like aspirin) is taken to treat symptoms like headaches."
                            },
                            {
                                question: "The opposite of 'healthy' is:",
                                options: ["Happy", "Sick", "Strong", "Young"],
                                correct: 1,
                                explanation: "'Sick' is the opposite of 'healthy' - it means not well."
                            },
                            {
                                question: "What do you call the place where you buy medicine?",
                                options: ["Pharmacy", "Bakery", "Library", "Bank"],
                                correct: 0,
                                explanation: "A pharmacy (or drugstore) is where you buy medicines and health products."
                            }
                        ]
                    },
                    'basic-conversation': {
                        title: 'Basic Conversation',
                        questions: [
                            {
                                question: "How do you greet someone in the morning?",
                                options: ["Good night", "Good morning", "Good bye", "Good luck"],
                                correct: 1,
                                explanation: "'Good morning' is the appropriate greeting for the morning hours."
                            },
                            {
                                question: "How do you ask someone's name politely?",
                                options: ["What's your name?", "Who are you?", "Tell me your name!", "What do you call yourself?"],
                                correct: 0,
                                explanation: "'What's your name?' is the most common and polite way to ask someone's name."
                            },
                            {
                                question: "How do you respond to 'How are you?'",
                                options: ["I'm 25 years old", "I'm fine, thank you", "I'm a doctor", "I'm from Italy"],
                                correct: 1,
                                explanation: "'I'm fine, thank you' is the standard polite response to 'How are you?'"
                            },
                            {
                                question: "How do you ask for help politely?",
                                options: ["Help me!", "Can you help me, please?", "I need help now!", "You must help me!"],
                                correct: 1,
                                explanation: "'Can you help me, please?' is polite and uses the modal verb 'can' for requests."
                            },
                            {
                                question: "How do you say goodbye formally?",
                                options: ["Bye!", "See ya!", "Goodbye", "Later!"],
                                correct: 2,
                                explanation: "'Goodbye' is the most formal way to say farewell."
                            }
                        ]
                    }
                }
            },
            B1: {
                name: "Intermediate English",
                description: "Comunicazione intermedia e strutture complesse",
                topics: {
                    'intermediate-grammar': {
                        title: 'Intermediate Grammar',
                        questions: [
                            {
                                question: "Choose the correct form: 'If I _____ you, I would see a doctor.'",
                                options: ["am", "was", "were", "will be"],
                                correct: 2,
                                explanation: "In second conditional, we use 'were' for all persons after 'if'."
                            },
                            {
                                question: "Complete: 'The patient _____ by the doctor yesterday.'",
                                options: ["examined", "was examined", "has examined", "examines"],
                                correct: 1,
                                explanation: "Passive voice in past simple: was/were + past participle."
                            },
                            {
                                question: "Choose the correct form: 'I have _____ working here for five years.'",
                                options: ["been", "being", "be", "was"],
                                correct: 0,
                                explanation: "Present perfect continuous: have/has + been + -ing form."
                            },
                            {
                                question: "Complete: 'The medicine _____ be taken with food.'",
                                options: ["can", "should", "must", "might"],
                                correct: 1,
                                explanation: "'Should' expresses recommendation or advice."
                            },
                            {
                                question: "Choose the correct relative pronoun: 'The doctor _____ treated me was very kind.'",
                                options: ["which", "who", "where", "when"],
                                correct: 1,
                                explanation: "'Who' is used for people in relative clauses."
                            }
                        ]
                    },
                    'professional-vocabulary': {
                        title: 'Professional Vocabulary',
                        questions: [
                            {
                                question: "What do you call a detailed examination of a patient?",
                                options: ["Assessment", "Treatment", "Prescription", "Appointment"],
                                correct: 0,
                                explanation: "An assessment is a thorough evaluation of a patient's condition."
                            },
                            {
                                question: "What is the term for written instructions for medication?",
                                options: ["Recipe", "Prescription", "Description", "Inscription"],
                                correct: 1,
                                explanation: "A prescription is a doctor's written order for medication."
                            },
                            {
                                question: "What do you call the predicted course of a disease?",
                                options: ["Diagnosis", "Prognosis", "Analysis", "Synopsis"],
                                correct: 1,
                                explanation: "Prognosis is the likely course and outcome of a disease."
                            },
                            {
                                question: "What is a 'side effect'?",
                                options: ["Main benefit", "Unwanted reaction", "Primary action", "Intended result"],
                                correct: 1,
                                explanation: "A side effect is an unwanted or unexpected reaction to medication."
                            },
                            {
                                question: "What does 'chronic' mean in medical terms?",
                                options: ["Severe", "Long-lasting", "Painful", "Infectious"],
                                correct: 1,
                                explanation: "Chronic refers to conditions that persist for a long time."
                            }
                        ]
                    },
                    'workplace-communication': {
                        title: 'Workplace Communication',
                        questions: [
                            {
                                question: "How do you politely disagree in a professional setting?",
                                options: ["You're wrong", "I don't think so", "I see it differently", "That's stupid"],
                                correct: 2,
                                explanation: "'I see it differently' is diplomatic and professional."
                            },
                            {
                                question: "How do you ask for clarification professionally?",
                                options: ["What?", "Could you clarify that?", "I don't get it", "Explain better"],
                                correct: 1,
                                explanation: "'Could you clarify that?' is polite and professional."
                            },
                            {
                                question: "How do you express uncertainty professionally?",
                                options: ["I don't know", "I'm not entirely sure", "No idea", "Maybe"],
                                correct: 1,
                                explanation: "'I'm not entirely sure' shows thoughtfulness and honesty."
                            },
                            {
                                question: "How do you make a suggestion in a meeting?",
                                options: ["You should do this", "I suggest we consider", "Do this now", "This is better"],
                                correct: 1,
                                explanation: "'I suggest we consider' is collaborative and respectful."
                            },
                            {
                                question: "How do you interrupt politely?",
                                options: ["Stop talking", "Excuse me, may I add", "Wait", "Listen to me"],
                                correct: 1,
                                explanation: "'Excuse me, may I add' is polite and professional."
                            }
                        ]
                    }
                }
            },
            B2: {
                name: "Upper-Intermediate English",
                description: "Comunicazione avanzata e competenze professionali",
                topics: {
                    'advanced-grammar': {
                        title: 'Advanced Grammar',
                        questions: [
                            {
                                question: "Choose the correct form: 'Had the patient _____ earlier, the outcome would have been different.'",
                                options: ["come", "came", "comes", "coming"],
                                correct: 0,
                                explanation: "In third conditional with inversion, we use the base form after 'had'."
                            },
                            {
                                question: "Complete: 'The research suggests that patients _____ more involved in their care.'",
                                options: ["are", "be", "being", "to be"],
                                correct: 1,
                                explanation: "After 'suggest that', we use the subjunctive (base form)."
                            },
                            {
                                question: "Choose the correct form: 'Not only _____ the treatment effective, but it's also affordable.'",
                                options: ["the treatment is", "is the treatment", "was the treatment", "the treatment was"],
                                correct: 1,
                                explanation: "After 'not only' at the beginning, we use inversion."
                            },
                            {
                                question: "Complete: 'The patient, _____ condition was critical, was transferred immediately.'",
                                options: ["who", "whose", "which", "that"],
                                correct: 1,
                                explanation: "'Whose' shows possession in relative clauses."
                            },
                            {
                                question: "Choose the correct form: 'I wish I _____ more about this condition.'",
                                options: ["know", "knew", "have known", "will know"],
                                correct: 1,
                                explanation: "After 'I wish', we use past tense for present situations."
                            }
                        ]
                    },
                    'academic-writing': {
                        title: 'Academic Writing',
                        questions: [
                            {
                                question: "Which phrase introduces a contrasting idea?",
                                options: ["Furthermore", "However", "Moreover", "Additionally"],
                                correct: 1,
                                explanation: "'However' introduces a contrast or opposing viewpoint."
                            },
                            {
                                question: "How do you express cause and effect formally?",
                                options: ["Because of this", "Consequently", "So", "That's why"],
                                correct: 1,
                                explanation: "'Consequently' is formal and shows clear cause-effect relationship."
                            },
                            {
                                question: "Which phrase shows emphasis in academic writing?",
                                options: ["It's really important", "It is crucial to note", "This is very big", "Everyone knows"],
                                correct: 1,
                                explanation: "'It is crucial to note' is formal and emphasizes importance."
                            },
                            {
                                question: "How do you introduce supporting evidence?",
                                options: ["This proves", "Research indicates", "Everyone says", "It's obvious"],
                                correct: 1,
                                explanation: "'Research indicates' is objective and academic."
                            },
                            {
                                question: "Which phrase concludes an argument effectively?",
                                options: ["So, that's it", "In conclusion", "The end", "Finally"],
                                correct: 1,
                                explanation: "'In conclusion' formally signals the end of an argument."
                            }
                        ]
                    },
                    'complex-communication': {
                        title: 'Complex Communication',
                        questions: [
                            {
                                question: "How do you express a nuanced opinion?",
                                options: ["I think", "While I generally agree, I have some reservations", "Yes or no", "Maybe"],
                                correct: 1,
                                explanation: "This shows sophisticated thinking and balanced judgment."
                            },
                            {
                                question: "How do you handle a difficult conversation?",
                                options: ["Avoid the topic", "I understand your concerns, let's explore this", "Change subject", "Ignore it"],
                                correct: 1,
                                explanation: "This acknowledges concerns while moving toward resolution."
                            },
                            {
                                question: "How do you present complex information clearly?",
                                options: ["It's complicated", "Let me break this down into key components", "You wouldn't understand", "It's simple"],
                                correct: 1,
                                explanation: "This shows ability to organize and present complex ideas."
                            },
                            {
                                question: "How do you negotiate professionally?",
                                options: ["Take it or leave it", "What if we considered alternative approaches?", "My way only", "Do what I say"],
                                correct: 1,
                                explanation: "This opens dialogue and shows collaborative problem-solving."
                            },
                            {
                                question: "How do you give constructive feedback?",
                                options: ["This is wrong", "I appreciate your effort, and here's how we might improve", "Bad job", "Try harder"],
                                correct: 1,
                                explanation: "This balances recognition with specific improvement suggestions."
                            }
                        ]
                    }
                }
            }
        };
        
        // Tracciamento progresso per livelli generali
        let generalTopicProgress = JSON.parse(localStorage.getItem('generalTopicProgress')) || {};
        let currentGeneralTopic = null;
        let currentGeneralQuestionIndex = 0;
        
        // Popola il dizionario con tutti i livelli
        Object.keys(MedEnglishDatabase.vocabulary).forEach(level => {
            MedEnglishDatabase.vocabulary[level].forEach(item => {
                medicalDictionary[item.term] = item.definition;
            });
        });
        
        // Inizializzazione
        document.addEventListener('DOMContentLoaded', function() {
            updateProgress();
            updateWordCount();
            loadLevelContent();
            checkDailyGoals();
            initializeMicrolearning();
            initializePhotoMode();
            initializeSpeechSynthesis(); // Inizializza il sistema audio
            initializeGeneralEnglish(); // Inizializza il sistema General English A2→B2
        });
        
        // Carica contenuto basato sul livello
        function loadLevelContent() {
            loadGrammarContent();
            loadVocabularyContent();
            loadConversationContent();
            loadReadingContent();
            loadWritingContent();
            updateLevelInfo();
        }
        
        // Carica contenuto conversazione
        function loadConversationContent() {
            // Carica la prima situazione
            loadNewConversationSituation();
        }
        
        // Carica contenuto grammatica per il livello corrente
        function loadGrammarContent() {
            const grammarContent = app.getContentForLevel('grammar', currentLevel);
            if (grammarContent.length > 0) {
                const currentQuestion = grammarContent[0];
                updateGrammarQuestion(currentQuestion);
            }
        }
        
        function updateGrammarQuestion(question) {
            const grammarSection = document.getElementById('grammar');
            const questionDiv = grammarSection.querySelector('.question');
            const optionsDiv = grammarSection.querySelector('.options');
            
            questionDiv.innerHTML = `
                <h3>${question.title}</h3>
                <p>${question.question}</p>
            `;
            
            optionsDiv.innerHTML = '';
            question.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'option';
                button.textContent = option;
                button.onclick = () => checkGrammarAnswer(button, index === question.correct, question.explanation);
                optionsDiv.appendChild(button);
            });
        }
        
        function checkGrammarAnswer(element, isCorrect, explanation) {
            const options = element.parentNode.querySelectorAll('.option');
            options.forEach(opt => opt.disabled = true);
            
            if (isCorrect) {
                element.classList.add('correct');
                showFeedback(`Corretto! 🎉 ${explanation}`, 'success');
                app.calculateScore('grammar', true);
                wordsLearned += 2;
                updateProgress();
            } else {
                element.classList.add('incorrect');
                options.forEach(opt => {
                    if (opt.onclick.toString().includes('true')) {
                        opt.classList.add('correct');
                    }
                });
                showFeedback(`Non è corretto. ${explanation}`, 'error');
                app.calculateScore('grammar', false);
            }
        }
        
        // Carica contenuto vocabolario
        function loadVocabularyContent() {
            const vocabContent = app.getContentForLevel('vocabulary', currentLevel);
            if (vocabContent.length > 0) {
                const currentTerm = vocabContent[0];
                updateVocabularyQuestion(currentTerm);
            }
        }
        
        function updateVocabularyQuestion(term) {
            const vocabSection = document.getElementById('vocabulary');
            const questionDiv = vocabSection.querySelector('.question');
            
            questionDiv.innerHTML = `
                <h3>Medical Term Definition</h3>
                <p>What does <strong>"${term.term}"</strong> mean?</p>
                <button class="pronunciation-btn" onclick="pronounce('${term.term}')">🔊 ${term.pronunciation}</button>
            `;
            
            // Aggiorna l'esempio di contesto
            const contextDiv = vocabSection.querySelector('.medical-context:last-child');
            contextDiv.innerHTML = `
                <h4>📖 Esempio in Contesto</h4>
                <p><em>"${term.example}"</em></p>
                <p><strong>Categoria:</strong> ${term.category}</p>
            `;
        }
        
        // Carica contenuto reading
        function loadReadingContent() {
            const readingContent = app.getContentForLevel('reading', currentLevel);
            if (readingContent.length > 0) {
                const currentReading = readingContent[0];
                updateReadingContent(currentReading);
            }
        }
        
        function updateReadingContent(reading) {
            const readingSection = document.getElementById('reading');
            const questionDivs = readingSection.querySelectorAll('.question');
            
            // Aggiorna il testo
            questionDivs[0].innerHTML = `
                <h3>${reading.title}</h3>
                <p class="reading-text">${reading.text}</p>
            `;
            
            // Aggiorna la domanda
            if (reading.questions && reading.questions.length > 0) {
                const question = reading.questions[0];
                questionDivs[1].innerHTML = `<p><strong>Question:</strong> ${question.question}</p>`;
                
                const optionsDiv = readingSection.querySelector('.options');
                optionsDiv.innerHTML = '';
                question.options.forEach((option, index) => {
                    const button = document.createElement('button');
                    button.className = 'option';
                    button.textContent = option;
                    button.onclick = () => checkAnswer(button, index === question.correct);
                    optionsDiv.appendChild(button);
                });
            }
        }
        
        // Carica contenuto writing
        function loadWritingContent() {
            const writingContent = app.getContentForLevel('writing', currentLevel);
            if (writingContent.length > 0) {
                const currentWriting = writingContent[0];
                updateWritingContent(currentWriting);
            }
        }
        
        function updateWritingContent(writing) {
            const writingSection = document.getElementById('writing');
            const questionDiv = writingSection.querySelector('.question');
            
            questionDiv.innerHTML = `
                <h3>Writing Task: ${writing.prompt.split(':')[0]}</h3>
                <p>${writing.prompt}</p>
                <p><strong>Requirements:</strong> ${writing.requirements.join(', ')}</p>
            `;
        }
        
        // Aggiorna informazioni livello
        function updateLevelInfo() {
            const levelData = MedEnglishDatabase.levels[currentLevel];
            document.getElementById('currentLevel').textContent = currentLevel;
            
            // Aggiorna la descrizione del livello
            const levelIndicator = document.querySelector('.level-indicator');
            levelIndicator.innerHTML = `
                <strong>Livello Attuale: ${currentLevel}</strong>
                <br><small>${levelData.description}</small>
                <span id="levelProgress">${overallProgress}%</span>
            `;
        }
        
        // Verifica obiettivi giornalieri
        function checkDailyGoals() {
            const today = new Date().toDateString();
            const lastStudy = localStorage.getItem('lastStudyDate');
            
            if (lastStudy !== today) {
                // Nuovo giorno di studio
                localStorage.setItem('lastStudyDate', today);
                
                // Verifica se è consecutivo
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                
                if (lastStudy === yesterday.toDateString()) {
                    streakDays += 1;
                } else if (lastStudy !== null) {
                    streakDays = 1; // Reset streak
                }
                
                updateProgress();
            }
        }
        
        // Funzioni per la navigazione
        function showLesson(lessonType) {
            // Check Premium features
            const premiumFeatures = ['ai-chat', 'roleplay', 'photo-mode'];
            if (premiumFeatures.includes(lessonType)) {
                if (!checkPremiumAccess(lessonType.replace('-', ' ').toUpperCase())) return;
            }

            // Check Medical Access for specific types
            const medicalTypes = ['grammar', 'vocabulary', 'conversation', 'ai-chat', 'roleplay', 'reading', 'writing', 'listening', 'photo-mode'];
            if (medicalTypes.includes(lessonType)) {
                const b2Progress = (typeof generalLevelProgress !== 'undefined' && generalLevelProgress['B2']) ? generalLevelProgress['B2'] : 0;
                const threshold = (typeof MEDICAL_ACCESS_THRESHOLD !== 'undefined') ? MEDICAL_ACCESS_THRESHOLD : 75;
                
                if (b2Progress < threshold) {
                    if (typeof showMedicalAccessDenied === 'function') {
                        showMedicalAccessDenied();
                    }
                    return;
                }
            }

            // Nascondi tutte le lezioni
            const lessons = document.querySelectorAll('.lesson-type');
            lessons.forEach(lesson => lesson.classList.remove('active'));
            
            // Mostra la lezione selezionata
            const lessonElement = document.getElementById(lessonType);
            if (lessonElement) {
                lessonElement.classList.add('active');
            }
        }
        
        function setLevel(level) {
            currentLevel = level;
            app.currentUser.level = level;
            document.getElementById('currentLevel').textContent = level;
            
            // Aggiorna i bottoni del livello
            const levelBtns = document.querySelectorAll('.level-btn');
            levelBtns.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            // Aggiorna il progresso basato sul livello
            const levelProgress = {
                'A2': 25,
                'B1': 40,
                'B2': 60,
                'C1': 80,
                'C2': 100
            };
            
            overallProgress = levelProgress[level];
            app.currentUser.progress = overallProgress;
            
            // Carica nuovo contenuto per il livello
            loadLevelContent();
            updateProgress();
            app.saveUserData();
            
            // Mostra messaggio di cambio livello
            showFeedback(`Livello cambiato a ${level}! Nuovo contenuto caricato. 🎯`, 'success');
        }
        
        function updateProgress() {
            updateProgressBar('overallProgress', overallProgress);
            document.getElementById('progressText').textContent = overallProgress + '%';
            document.getElementById('levelProgress').textContent = overallProgress + '%';
            document.getElementById('streakDays').textContent = streakDays;
            document.getElementById('wordsLearned').textContent = wordsLearned;
            document.getElementById('lessonsCompleted').textContent = lessonsCompleted;
            
            // Verifica achievements
            const newAchievements = app.checkAchievements();
            if (newAchievements.length > 0) {
                showAchievements(newAchievements);
            }
            
            // Verifica progressione di livello
            const nextLevel = app.checkLevelProgression();
            if (nextLevel) {
                showLevelUpNotification(nextLevel);
            }
            
            // Aggiorna suggerimenti adattivi
            updateAdaptiveTips();
        }
        
        function showAchievements(achievements) {
            achievements.forEach(achievement => {
                const notification = document.createElement('div');
                notification.className = 'achievement-notification';
                notification.innerHTML = `
                    <div class="achievement-icon">${achievement.icon}</div>
                    <h3>Achievement Unlocked!</h3>
                    <p><strong>${achievement.name}</strong></p>
                    <p>${achievement.description}</p>
                    <p>+${achievement.points} punti!</p>
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 5000);
            });
        }
        
        function showLevelUpNotification(nextLevel) {
            const notification = document.createElement('div');
            notification.className = 'level-up-notification';
            notification.innerHTML = `
                <div class="level-up-icon">🎉</div>
                <h2>Congratulazioni!</h2>
                <p>Sei pronto per il livello <strong>${nextLevel}</strong>!</p>
                <button onclick="this.parentElement.remove(); setLevel('${nextLevel}')" 
                        class="level-up-btn">
                    Avanza al ${nextLevel}!
                </button>
            `;
            
            document.body.appendChild(notification);
        }
        
        function updateAdaptiveTips() {
            const tips = app.getAdaptiveTips();
            if (tips.length > 0) {
                const tipElement = document.querySelector('.medical-context p');
                if (tipElement && Math.random() < 0.3) { // 30% chance di mostrare tip
                    const randomTip = tips[Math.floor(Math.random() * tips.length)];
                    tipElement.innerHTML = `<strong>💡 Tip Personalizzato:</strong> ${randomTip}`;
                }
            }
        }
        
        // Funzioni per le risposte
        function checkAnswer(element, isCorrect) {
            const options = element.parentNode.querySelectorAll('.option');
            options.forEach(opt => opt.disabled = true);
            
            if (isCorrect) {
                element.classList.add('correct');
                showFeedback('Corretto! Ottimo lavoro! 🎉', 'success');
                wordsLearned += 2;
                updateProgress();
            } else {
                element.classList.add('incorrect');
                // Mostra la risposta corretta
                options.forEach(opt => {
                    if (opt.onclick.toString().includes('true')) {
                        opt.classList.add('correct');
                    }
                });
                showFeedback('Non è corretto. Studia la spiegazione e riprova! 📚', 'error');
            }
        }
        
        function showFeedback(message, type) {
            const activeLesson = document.querySelector('.lesson-type.active');
            const feedback = activeLesson.querySelector('.feedback');
            feedback.textContent = message;
            feedback.className = `feedback ${type} active`;
        }
        
        // Funzioni per le frasi quotidiane (anti-blocco)
        function checkConversationAnswer(element, isCorrect, explanation) {
            const options = element.parentNode.querySelectorAll('.option');
            options.forEach(opt => opt.disabled = true);
            
            if (isCorrect) {
                element.classList.add('correct');
                showConversationFeedback(`✅ ${explanation}`, 'success');
                app.calculateScore('vocabulary', true); // Usa stesso punteggio del vocabolario
                wordsLearned += 3; // Meno punti perché sono frasi, non singole parole
                updateProgress();
                
                // Carica nuova situazione dopo 3 secondi
                setTimeout(() => {
                    loadNewConversationSituation();
                }, 3000);
            } else {
                element.classList.add('incorrect');
                // Mostra le risposte corrette
                options.forEach(opt => {
                    if (opt.onclick.toString().includes('true')) {
                        opt.classList.add('correct');
                    }
                });
                showConversationFeedback(`❌ ${explanation}`, 'error');
                app.calculateScore('vocabulary', false);
            }
        }
        
        function showConversationFeedback(message, type) {
            const feedback = document.getElementById('conversationFeedback');
            feedback.innerHTML = message;
            feedback.className = `feedback ${type} active`;
        }
        
        function loadNewConversationSituation() {
            const situations = [
                {
                    title: "Iniziare una Conversazione Professionale",
                    scenario: "Vuoi parlare con un collega di un progetto importante",
                    question: "Come inizi la conversazione in modo professionale?",
                    options: [
                        { text: "Hey, what's up?", correct: false, explanation: "Troppo informale per un contesto professionale." },
                        { text: "I wanted to talk to you about the new protocol", correct: true, explanation: "Perfetto! Diretto ma professionale, introduce subito l'argomento." },
                        { text: "Can I ask you something about the patient data?", correct: true, explanation: "Ottima scelta! Educato e specifico." },
                        { text: "We need to talk", correct: false, explanation: "Suona troppo serio o minaccioso. Meglio essere più specifici." }
                    ],
                    phrases: [
                        "I wanted to talk to you about...",
                        "Can I ask you something about...?",
                        "I was wondering if we could discuss...",
                        "Do you have a moment to talk about...?"
                    ]
                },
                {
                    title: "Gestire una Telefonata Difficile",
                    scenario: "Un paziente arrabbiato ti chiama per lamentarsi del servizio",
                    question: "Come gestisci la situazione mantenendo la calma?",
                    options: [
                        { text: "I understand your frustration, let me see how I can help", correct: true, explanation: "Perfetto! Empatia + azione concreta." },
                        { text: "That's not my fault", correct: false, explanation: "Difensivo e poco professionale." },
                        { text: "You need to calm down", correct: false, explanation: "Peggiorerà la situazione. Mai dire a qualcuno di calmarsi." },
                        { text: "Let me transfer you to someone else", correct: false, explanation: "Evita il problema invece di risolverlo." }
                    ],
                    phrases: [
                        "I understand your concern...",
                        "Let me see what I can do...",
                        "I appreciate you bringing this to my attention...",
                        "Would it help if I...?"
                    ]
                },
                {
                    title: "Presentare Dati Complessi",
                    scenario: "Devi spiegare risultati di uno studio a colleghi non esperti",
                    question: "Come semplifichi senza perdere accuratezza?",
                    options: [
                        { text: "It's complicated, you wouldn't understand", correct: false, explanation: "Condiscendente e inutile." },
                        { text: "Let me break this down into simpler terms", correct: true, explanation: "Ottimo! Mostra rispetto e volontà di aiutare." },
                        { text: "The data shows statistical significance in the primary endpoint", correct: false, explanation: "Troppo tecnico per non esperti." },
                        { text: "Basically, it works", correct: false, explanation: "Troppo semplificato, perde credibilità." }
                    ],
                    phrases: [
                        "Let me break this down...",
                        "In simple terms...",
                        "What this means is...",
                        "Think of it this way..."
                    ]
                },
                {
                    title: "Gestire un Errore",
                    scenario: "Ti accorgi di aver fatto un errore in un report importante",
                    question: "Come comunichi l'errore al tuo supervisore?",
                    options: [
                        { text: "I made a mistake and here's how I'll fix it", correct: true, explanation: "Onesto, diretto e orientato alla soluzione." },
                        { text: "It wasn't really my fault because...", correct: false, explanation: "Evita responsabilità, poco professionale." },
                        { text: "I hope no one notices", correct: false, explanation: "Irresponsabile e pericoloso." },
                        { text: "Someone else should have checked it", correct: false, explanation: "Scarica la colpa su altri." }
                    ],
                    phrases: [
                        "I need to correct something...",
                        "I've identified an error and...",
                        "I take full responsibility and...",
                        "Here's my plan to fix this..."
                    ]
                },
                {
                    title: "Negoziare una Scadenza",
                    scenario: "Il tuo capo ti chiede di finire un progetto in tempi impossibili",
                    question: "Come negozi una scadenza realistica?",
                    options: [
                        { text: "That's impossible", correct: false, explanation: "Troppo negativo, non offre alternative." },
                        { text: "I can deliver quality work by [date] or rush it by [earlier date]", correct: true, explanation: "Offre opzioni e mostra professionalità." },
                        { text: "I'll try my best", correct: false, explanation: "Vago e non impegnativo." },
                        { text: "Why is everything always urgent?", correct: false, explanation: "Lamentoso e poco costruttivo." }
                    ],
                    phrases: [
                        "I can deliver quality work by...",
                        "To meet that deadline, I would need...",
                        "Let me propose an alternative timeline...",
                        "What's the priority here...?"
                    ]
                },
                {
                    title: "Dare Feedback Costruttivo",
                    scenario: "Un collega junior ha fatto un lavoro che necessita miglioramenti",
                    question: "Come dai feedback senza demotivare?",
                    options: [
                        { text: "This is all wrong", correct: false, explanation: "Distruttivo e demotivante." },
                        { text: "You did well here, and we can improve this part", correct: true, explanation: "Sandwich approach: positivo + miglioramento + supporto." },
                        { text: "It's not bad for a beginner", correct: false, explanation: "Condiscendente, minimizza il lavoro." },
                        { text: "Let me just redo it myself", correct: false, explanation: "Non insegna nulla e demotiva." }
                    ],
                    phrases: [
                        "You did well with..., let's work on...",
                        "I like how you approached..., consider...",
                        "This shows good thinking, what if we...",
                        "You're on the right track, let's refine..."
                    ]
                },
                {
                    title: "Gestire una Riunione Caotica",
                    scenario: "La riunione è degenerata, tutti parlano insieme e nessuno ascolta",
                    question: "Come riporti ordine diplomaticamente?",
                    options: [
                        { text: "QUIET! Let me speak!", correct: false, explanation: "Aggressivo e poco professionale." },
                        { text: "Can we take a step back and focus on the main issue?", correct: true, explanation: "Diplomatico e orientato agli obiettivi." },
                        { text: "This is a waste of time", correct: false, explanation: "Negativo e non costruttivo." },
                        { text: "Maybe we should end the meeting", correct: false, explanation: "Evita il problema invece di risolverlo." }
                    ],
                    phrases: [
                        "Can we take a step back...",
                        "Let's focus on the main issue...",
                        "I'd like to hear everyone's view, one at a time...",
                        "What if we approach this differently..."
                    ]
                },
                {
                    title: "Chiedere un Aumento",
                    scenario: "Vuoi chiedere un aumento dopo un anno di ottimo lavoro",
                    question: "Come strutturi la richiesta?",
                    options: [
                        { text: "I deserve more money", correct: false, explanation: "Suona pretenzioso, non giustifica la richiesta." },
                        { text: "Based on my contributions this year, I'd like to discuss my compensation", correct: true, explanation: "Professionale, basato sui fatti, apre al dialogo." },
                        { text: "Everyone else makes more than me", correct: false, explanation: "Confronto negativo, non focalizzato sui tuoi meriti." },
                        { text: "If you don't give me a raise, I'll quit", correct: false, explanation: "Ultimatum aggressivo, danneggia i rapporti." }
                    ],
                    phrases: [
                        "Based on my contributions...",
                        "I'd like to discuss my career progression...",
                        "Given my performance this year...",
                        "I believe my role has evolved to include..."
                    ]
                }
            ];
            
            // Sistema anti-ripetizione: tiene traccia delle situazioni già viste
            if (!window.conversationHistory) {
                window.conversationHistory = [];
            }
            
            // Se abbiamo visto tutte le situazioni, reset con messaggio
            if (window.conversationHistory.length >= situations.length) {
                window.conversationHistory = [];
                showConversationFeedback("🎉 Hai completato tutte le situazioni! Ricominciamo con nuove varianti...", 'success');
            }
            
            // Trova situazioni non ancora viste
            const unseenSituations = situations.filter((_, index) => 
                !window.conversationHistory.includes(index)
            );
            
            // Seleziona casualmente tra quelle non viste
            const randomIndex = Math.floor(Math.random() * unseenSituations.length);
            const selectedSituation = unseenSituations[randomIndex];
            const originalIndex = situations.indexOf(selectedSituation);
            
            // Aggiungi alla cronologia
            window.conversationHistory.push(originalIndex);
            
            updateConversationContent(selectedSituation);
        }
        
        function updateConversationContent(situation) {
            const conversationSection = document.getElementById('conversation');
            const questionDiv = conversationSection.querySelector('.question');
            const optionsDiv = conversationSection.querySelector('.options');
            const phrasesDiv = conversationSection.querySelector('#phraseSuggestions');
            
            // Aggiorna il progresso
            const totalSituations = 8; // Numero totale di situazioni
            const completedSituations = window.conversationHistory ? window.conversationHistory.length : 0;
            const progressPercent = (completedSituations / totalSituations) * 100;
            
            document.getElementById('conversationProgress').textContent = `${completedSituations}/${totalSituations} completate`;
            updateProgressBar('conversationProgressBar', progressPercent);
            
            // Aggiorna la domanda
            questionDiv.innerHTML = `
                <h3>${situation.title}</h3>
                <p>${situation.question}</p>
                <p><strong>Scenario:</strong> "${situation.scenario}"</p>
            `;
            
            // Aggiorna le opzioni
            optionsDiv.innerHTML = '';
            situation.options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'option';
                button.textContent = option.text;
                button.onclick = () => checkConversationAnswer(button, option.correct, option.explanation);
                optionsDiv.appendChild(button);
            });
            
            // Aggiorna le frasi utili
            phrasesDiv.innerHTML = `
                <p><strong>Frasi utili per questa situazione:</strong></p>
                <ul>
                    ${situation.phrases.map(phrase => `<li>"${phrase}" 💬</li>`).join('')}
                </ul>
            `;
            
            // Reset feedback
            document.getElementById('conversationFeedback').classList.remove('active');
        }
        function checkVocabulary() {
            const input = document.getElementById('vocabInput').value.toLowerCase();
            const vocabContent = app.getContentForLevel('vocabulary', currentLevel);
            
            if (vocabContent.length > 0) {
                const currentTerm = vocabContent[0];
                const correctAnswer = currentTerm.definition.toLowerCase();
                
                // Verifica se la risposta contiene parole chiave
                const keyWords = correctAnswer.split(' ').filter(word => 
                    word.length > 4 && !['that', 'with', 'from', 'they', 'have', 'been'].includes(word)
                );
                
                const matchedWords = keyWords.filter(word => input.includes(word));
                const accuracy = matchedWords.length / keyWords.length;
                
                if (accuracy >= 0.5) {
                    showVocabFeedback(`Eccellente! Definizione corretta! 🎯 Accuratezza: ${Math.round(accuracy * 100)}%`, 'success');
                    app.calculateScore('vocabulary', true);
                    wordsLearned += 5;
                    updateProgress();
                    
                    // Carica prossimo termine
                    setTimeout(() => {
                        loadNextVocabularyTerm();
                    }, 2000);
                } else {
                    showVocabFeedback(`Quasi! ${currentTerm.term}: ${currentTerm.definition}`, 'error');
                    app.calculateScore('vocabulary', false);
                }
            }
        }
        
        function loadNextVocabularyTerm() {
            const vocabContent = app.getContentForLevel('vocabulary', currentLevel);
            if (vocabContent.length > 1) {
                // Sistema anti-ripetizione per vocabolario
                if (!window.vocabHistory) {
                    window.vocabHistory = [];
                }
                
                // Reset se abbiamo visto tutti i termini del livello
                if (window.vocabHistory.length >= vocabContent.length) {
                    window.vocabHistory = [];
                    showVocabFeedback("🎉 Hai visto tutti i termini di questo livello! Ricominciamo con nuove varianti...", 'success');
                }
                
                // Trova termini non visti di recente
                const unseenTerms = vocabContent.filter((_, index) => 
                    !window.vocabHistory.includes(index)
                );
                
                // Se tutti sono stati visti, prendi quelli visti meno di recente
                const termsToUse = unseenTerms.length > 0 ? unseenTerms : vocabContent.slice(-3);
                
                const randomIndex = Math.floor(Math.random() * termsToUse.length);
                const selectedTerm = termsToUse[randomIndex];
                const originalIndex = vocabContent.indexOf(selectedTerm);
                
                // Aggiungi alla cronologia
                window.vocabHistory.push(originalIndex);
                
                updateVocabularyQuestion(selectedTerm);
            }
            
            // Reset input
            document.getElementById('vocabInput').value = '';
            document.getElementById('vocabFeedback').classList.remove('active');
        }
        
        function showVocabFeedback(message, type) {
            const feedback = document.getElementById('vocabFeedback');
            feedback.textContent = message;
            feedback.className = `feedback ${type} active`;
        }
        
        // Funzioni per la scrittura
        function updateWordCount() {
            const writingArea = document.getElementById('writingArea');
            if (writingArea) {
                writingArea.addEventListener('input', function() {
                    const words = this.value.trim().split(/\s+/).filter(word => word.length > 0);
                    document.getElementById('wordCount').textContent = words.length;
                });
            }
        }
        
        function analyzeWriting() {
            const text = document.getElementById('writingArea').value;
            const words = text.trim().split(/\s+/).filter(word => word.length > 0);
            const writingContent = app.getContentForLevel('writing', currentLevel);
            
            let feedback = '';
            let type = 'success';
            let score = 0;
            
            if (words.length < 30) {
                feedback = 'Il testo è troppo breve. Espandi le tue idee con più dettagli.';
                type = 'error';
                score = 0;
            } else if (words.length > 300) {
                feedback = 'Il testo è troppo lungo. Cerca di essere più conciso.';
                type = 'error';
                score = 10;
            } else {
                // Analisi avanzata basata sul livello
                const analysis = performWritingAnalysis(text, currentLevel);
                feedback = analysis.feedback;
                type = analysis.type;
                score = analysis.score;
                
                if (score >= 30) {
                    lessonsCompleted += 1;
                    app.calculateScore('writing', true);
                } else {
                    app.calculateScore('writing', false);
                }
                updateProgress();
            }
            
            const feedbackEl = document.getElementById('writingFeedback');
            feedbackEl.innerHTML = `${feedback}<br><strong>Punteggio: ${score}/50</strong>`;
            feedbackEl.className = `feedback ${type} active`;
        }
        
        function performWritingAnalysis(text, level) {
            const analysis = {
                feedback: '',
                type: 'success',
                score: 0
            };
            
            // Criteri di valutazione basati sul livello
            const criteria = {
                'A2': ['simple', 'clear', 'basic', 'patient', 'doctor'],
                'B1': ['because', 'however', 'treatment', 'diagnosis', 'symptoms'],
                'B2': ['furthermore', 'moreover', 'clinical', 'research', 'evidence'],
                'C1': ['consequently', 'nevertheless', 'methodology', 'hypothesis', 'significant'],
                'C2': ['notwithstanding', 'paradigm', 'comprehensive', 'sophisticated', 'implications']
            };
            
            const levelWords = criteria[level] || criteria['A2'];
            const foundWords = levelWords.filter(word => 
                text.toLowerCase().includes(word.toLowerCase())
            );
            
            // Calcola punteggio base
            analysis.score = Math.min(50, (foundWords.length / levelWords.length) * 50);
            
            // Bonus per struttura
            if (text.includes('.') && text.includes(',')) analysis.score += 5;
            if (text.split('.').length > 2) analysis.score += 5; // Frasi multiple
            
            // Feedback personalizzato
            if (analysis.score >= 40) {
                analysis.feedback = `Eccellente scrittura per il livello ${level}! Hai usato: ${foundWords.join(', ')}. 🎓`;
                analysis.type = 'success';
            } else if (analysis.score >= 25) {
                analysis.feedback = `Buon lavoro! Prova ad includere più termini del livello ${level}: ${levelWords.slice(0, 3).join(', ')}.`;
                analysis.type = 'success';
            } else {
                analysis.feedback = `Continua a praticare! Concentrati su: ${levelWords.slice(0, 2).join(', ')}. Studia esempi del livello ${level}.`;
                analysis.type = 'error';
            }
            
            return analysis;
        }
        
        function getWritingSuggestions() {
            const writingContent = app.getContentForLevel('writing', currentLevel);
            const suggestions = [
                `💡 Per il livello ${currentLevel}: Usa strutture appropriate al tuo livello`,
                "💡 Inizia con: 'The primary objective of this study is to...'",
                "💡 Usa connettori appropriati per il tuo livello",
                "💡 Includi terminologia medica specifica",
                "💡 Mantieni un tono formale e professionale"
            ];
            
            // Suggerimenti specifici per livello
            const levelSuggestions = {
                'A2': ["Usa frasi semplici", "Present simple per fatti medici"],
                'B1': ["Usa past tense per case histories", "Connettori: because, so, but"],
                'B2': ["Strutture passive", "Connettori: furthermore, however"],
                'C1': ["Subjunctive mood", "Connettori: nevertheless, consequently"],
                'C2': ["Strutture complesse", "Linguaggio accademico avanzato"]
            };
            
            const specificSuggestions = levelSuggestions[currentLevel] || levelSuggestions['A2'];
            const allSuggestions = [...suggestions, ...specificSuggestions.map(s => `💡 ${currentLevel}: ${s}`)];
            
            const randomSuggestion = allSuggestions[Math.floor(Math.random() * allSuggestions.length)];
            
            const feedbackEl = document.getElementById('writingFeedback');
            feedbackEl.textContent = randomSuggestion;
            feedbackEl.className = 'feedback success active';
        }
        
        // Funzioni per l'audio (simulato)
        function playAudio() {
            document.getElementById('playBtn').textContent = '⏸️ Playing...';
            setTimeout(() => {
                document.getElementById('playBtn').textContent = '▶️ Play Audio';
            }, 3000);
        }
        
        function pauseAudio() {
            document.getElementById('playBtn').textContent = '▶️ Play Audio';
        }
        
        // Funzione per frasi di emergenza anti-blocco (con varietà)
        function showRandomEmergencyPhrase() {
            const emergencyPhrases = [
                // Guadagnare tempo
                { phrase: "Let me think about that...", use: "Guadagna tempo", category: "time" },
                { phrase: "That's a good question...", use: "Complimenta e rifletti", category: "time" },
                { phrase: "Hmm, let me consider that...", use: "Pausa riflessiva", category: "time" },
                { phrase: "Give me a moment to process that...", use: "Tempo per elaborare", category: "time" },
                
                // Cambiare argomento
                { phrase: "Actually, that reminds me...", use: "Cambia argomento", category: "transition" },
                { phrase: "Speaking of which...", use: "Collegamento naturale", category: "transition" },
                { phrase: "On a related note...", use: "Argomento correlato", category: "transition" },
                { phrase: "That brings up another point...", use: "Nuovo punto", category: "transition" },
                
                // Chiarificare
                { phrase: "What I mean is...", use: "Chiarifica", category: "clarify" },
                { phrase: "In other words...", use: "Riformula", category: "clarify" },
                { phrase: "Let me put it this way...", use: "Nuovo approccio", category: "clarify" },
                { phrase: "To clarify what I said...", use: "Precisazione", category: "clarify" },
                
                // Coinvolgere l'altro
                { phrase: "What do you think about...?", use: "Coinvolgi l'interlocutore", category: "engage" },
                { phrase: "How do you see this situation?", use: "Chiedi opinione", category: "engage" },
                { phrase: "From your experience...", use: "Valorizza l'altro", category: "engage" },
                { phrase: "What's your take on...?", use: "Opinione informale", category: "engage" },
                
                // Esprimere incertezza educatamente
                { phrase: "I'm not entirely sure, but...", use: "Incertezza onesta", category: "uncertainty" },
                { phrase: "I could be wrong, but...", use: "Umiltà intellettuale", category: "uncertainty" },
                { phrase: "It seems to me that...", use: "Opinione personale", category: "uncertainty" },
                { phrase: "As far as I know...", use: "Limitazione conoscenza", category: "uncertainty" },
                
                // Situazioni difficili
                { phrase: "I understand your concern...", use: "Empatia", category: "difficult" },
                { phrase: "That's a valid point...", use: "Riconoscimento", category: "difficult" },
                { phrase: "I can see why you'd think that...", use: "Comprensione", category: "difficult" },
                { phrase: "You raise an interesting question...", use: "Valorizza domanda", category: "difficult" }
            ];
            
            // Sistema anti-ripetizione per le frasi
            if (!window.phraseHistory) {
                window.phraseHistory = [];
            }
            
            // Reset se abbiamo visto troppe frasi
            if (window.phraseHistory.length >= Math.min(10, emergencyPhrases.length)) {
                window.phraseHistory = [];
            }
            
            // Filtra frasi non viste di recente
            const availablePhrases = emergencyPhrases.filter((_, index) => 
                !window.phraseHistory.includes(index)
            );
            
            const randomPhrase = availablePhrases[Math.floor(Math.random() * availablePhrases.length)];
            const originalIndex = emergencyPhrases.indexOf(randomPhrase);
            window.phraseHistory.push(originalIndex);
            
            // Colori per categoria
            const categoryClass = ['time', 'transition', 'clarify', 'engage', 'uncertainty', 'difficult'].includes(randomPhrase.category) 
                ? `phrase-card-${randomPhrase.category}` 
                : 'phrase-card-default';

            const phrasesDiv = document.getElementById('emergencyPhrases');
            phrasesDiv.innerHTML = `
                <div class="phrase-card ${categoryClass}">
                    <p class="phrase-text">"${randomPhrase.phrase}"</p>
                    <p class="phrase-use">
                        💡 <strong>Usa per:</strong> ${randomPhrase.use}
                    </p>
                    <p class="phrase-category">
                        📂 Categoria: ${randomPhrase.category}
                    </p>
                </div>
                <p class="phrase-tip">
                    <strong>Trucco:</strong> Usa questa frase in una conversazione oggi!
                </p>
            `;
            
            // Pronuncia la frase se supportato
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(randomPhrase.phrase);
                utterance.lang = 'en-US';
                utterance.rate = 0.7;
                speechSynthesis.speak(utterance);
            }
        }
        function pronounce(word) {
            console.log('Attempting to pronounce:', word);
            
            if ('speechSynthesis' in window) {
                // Stop any ongoing speech
                speechSynthesis.cancel();
                
                // Wait a bit for the cancel to complete
                setTimeout(() => {
                    const utterance = new SpeechSynthesisUtterance(word);
                    utterance.lang = 'en-US';
                    utterance.rate = 0.7;
                    utterance.pitch = 1.0;
                    utterance.volume = 1.0;
                    
                    // Event handlers for debugging
                    utterance.onstart = () => {
                        console.log('Speech started for:', word);
                        showAudioFeedback(`🔊 Pronunciando: "${word}"`, 'info');
                    };
                    
                    utterance.onend = () => {
                        console.log('Speech ended for:', word);
                    };
                    
                    utterance.onerror = (event) => {
                        console.error('Speech error:', event.error);
                        showAudioFeedback(`❌ Errore audio: ${event.error}`, 'error');
                        // Fallback to phonetic display
                        showPhoneticFallback(word);
                    };
                    
                    // Try to get voices and use a specific one
                    const voices = speechSynthesis.getVoices();
                    console.log('Available voices:', voices.length);
                    
                    if (voices.length > 0) {
                        // Try to find an English voice
                        const englishVoice = voices.find(voice => 
                            voice.lang.startsWith('en') && voice.name.includes('Google')
                        ) || voices.find(voice => 
                            voice.lang.startsWith('en')
                        ) || voices[0];
                        
                        if (englishVoice) {
                            utterance.voice = englishVoice;
                            console.log('Using voice:', englishVoice.name);
                        }
                    }
                    
                    speechSynthesis.speak(utterance);
                }, 100);
            } else {
                console.log('Speech synthesis not supported');
                showAudioFeedback('❌ Audio non supportato dal browser', 'error');
                showPhoneticFallback(word);
            }
        }

        function showAudioFeedback(message, type) {
            const feedback = document.createElement('div');
            feedback.className = `audio-feedback-toast ${type === 'error' ? 'audio-feedback-error' : type === 'info' ? 'audio-feedback-info' : 'audio-feedback-success'}`;
            feedback.textContent = message;
            
            document.body.appendChild(feedback);
            
            setTimeout(() => {
                feedback.remove();
            }, 3000);
        }

        function showPhoneticFallback(word) {
            const phonetics = {
                'pharmacovigilance': '/ˌfɑːrməkoʊˈvɪdʒɪləns/',
                'symptom': '/ˈsɪmptəm/',
                'diagnosis': '/ˌdaɪəɡˈnoʊsɪs/',
                'prognosis': '/prɒɡˈnoʊsɪs/',
                'contraindication': '/ˌkɒntrəˌɪndɪˈkeɪʃən/',
                'pharmacokinetics': '/ˌfɑrməkoʊkɪˈnɛtɪks/',
                'actually': '/ˈæktʃuəli/',
                'basically': '/ˈbeɪsɪkli/',
                'obviously': '/ˈɑbviəsli/',
                'definitely': '/ˈdefənətli/',
                'probably': '/ˈprɑbəbli/',
                'especially': '/ɪˈspeʃəli/'
            };
            
            const phonetic = phonetics[word.toLowerCase()] || '/fəˈnɛtɪk/';
            
            const phoneticDisplay = document.createElement('div');
            phoneticDisplay.className = 'phonetic-fallback-modal';
            
            phoneticDisplay.innerHTML = `
                <h3 class="audio-pronunciation-container">🔊 Pronuncia</h3>
                <p class="audio-word-title">${word}</p>
                <p class="audio-phonetic">${phonetic}</p>
                <button onclick="this.parentElement.remove()" class="audio-action-btn">
                    OK
                </button>
            `;
            
            document.body.appendChild(phoneticDisplay);
        }

        // Initialize speech synthesis when page loads
        function initializeSpeechSynthesis() {
            if ('speechSynthesis' in window) {
                // Load voices
                const loadVoices = () => {
                    const voices = speechSynthesis.getVoices();
                    console.log('Loaded voices:', voices.length);
                    
                    if (voices.length > 0) {
                        const englishVoices = voices.filter(voice => voice.lang.startsWith('en'));
                        console.log('English voices available:', englishVoices.map(v => v.name));
                        
                        if (englishVoices.length === 0) {
                            showAudioFeedback('⚠️ Nessuna voce inglese disponibile', 'error');
                        }
                    }
                };
                
                // Load voices immediately if available
                loadVoices();
                
                // Also load when voices change (some browsers load them asynchronously)
                speechSynthesis.onvoiceschanged = loadVoices;
                
                // Test speech synthesis
                setTimeout(() => {
                    console.log('Testing speech synthesis...');
                    showAudioFeedback('🔊 Sistema audio inizializzato', 'info');
                }, 1000);
            } else {
                console.log('Speech synthesis not supported');
                showAudioFeedback('❌ Audio non supportato da questo browser', 'error');
            }
        }

        // Test audio function
        function testAudio() {
            console.log('Testing audio...');
            showAudioFeedback('🔊 Test audio in corso...', 'info');
            
            if ('speechSynthesis' in window) {
                speechSynthesis.cancel(); // Stop any ongoing speech
                
                setTimeout(() => {
                    const testPhrase = "Hello, this is a test of the medical English pronunciation system.";
                    const utterance = new SpeechSynthesisUtterance(testPhrase);
                    utterance.lang = 'en-US';
                    utterance.rate = 0.8;
                    utterance.pitch = 1.0;
                    utterance.volume = 1.0;
                    
                    utterance.onstart = () => {
                        console.log('Test audio started');
                        showAudioFeedback('✅ Audio funziona correttamente!', 'info');
                    };
                    
                    utterance.onerror = (event) => {
                        console.error('Test audio error:', event.error);
                        showAudioFeedback(`❌ Errore test audio: ${event.error}`, 'error');
                        showAudioTroubleshooting();
                    };
                    
                    utterance.onend = () => {
                        console.log('Test audio completed');
                    };
                    
                    speechSynthesis.speak(utterance);
                }, 200);
            } else {
                showAudioFeedback('❌ Speech synthesis non supportato', 'error');
                showAudioTroubleshooting();
            }
        }

        // Show voice settings
        function showVoiceSettings() {
            const voices = speechSynthesis.getVoices();
            const englishVoices = voices.filter(voice => voice.lang.startsWith('en'));
            
            const settingsModal = document.createElement('div');
            settingsModal.className = 'modal-overlay';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content-base audio-settings-modal';
            
            modalContent.innerHTML = `
                <h3 class="audio-settings-title">🔊 Impostazioni Audio</h3>
                
                <div style="margin-bottom: 20px;">
                    <h4>📊 Stato Sistema</h4>
                    <p><strong>Speech Synthesis:</strong> ${('speechSynthesis' in window) ? '✅ Supportato' : '❌ Non supportato'}</p>
                    <p><strong>Voci totali:</strong> ${voices.length}</p>
                    <p><strong>Voci inglesi:</strong> ${englishVoices.length}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h4>🎤 Voci Inglesi Disponibili</h4>
                    <div class="audio-voice-list">
                        ${englishVoices.length > 0 ? 
                            englishVoices.map(voice => `
                                <div class="audio-voice-item" onclick="testVoice('${voice.name}')">
                                    <strong>${voice.name}</strong><br>
                                    <small style="color: #666;">${voice.lang} - ${voice.localService ? 'Locale' : 'Online'}</small>
                                </div>
                            `).join('') : 
                            '<p style="color: #666;">Nessuna voce inglese disponibile</p>'
                        }
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h4>🔧 Risoluzione Problemi</h4>
                    <div class="audio-trouble-content">
                        <p><strong>Se l'audio non funziona:</strong></p>
                        <ul>
                            <li>Assicurati che il volume del browser sia attivo</li>
                            <li>Prova a ricaricare la pagina</li>
                            <li>Usa Chrome, Firefox o Safari</li>
                            <li>Controlla le impostazioni audio del sistema</li>
                            <li>Alcuni browser richiedono interazione utente prima dell'audio</li>
                        </ul>
                    </div>
                </div>
                
                <div style="text-align: center;">
                    <button onclick="testAudio()" class="audio-test-btn">
                        🎵 Test Audio
                    </button>
                    <button onclick="this.closest('.modal-overlay').remove()" class="audio-close-btn">
                        Chiudi
                    </button>
                </div>
            `;
            
            settingsModal.appendChild(modalContent);
            document.body.appendChild(settingsModal);
            
            // Close on background click
            settingsModal.addEventListener('click', (e) => {
                if (e.target === settingsModal) {
                    settingsModal.remove();
                }
            });
        }

        // Test specific voice
        function testVoice(voiceName) {
            const voices = speechSynthesis.getVoices();
            const voice = voices.find(v => v.name === voiceName);
            
            if (voice) {
                speechSynthesis.cancel();
                
                setTimeout(() => {
                    const utterance = new SpeechSynthesisUtterance("Hello, this is a test of the " + voice.name + " voice.");
                    utterance.voice = voice;
                    utterance.rate = 0.8;
                    utterance.pitch = 1.0;
                    utterance.volume = 1.0;
                    
                    utterance.onstart = () => {
                        showAudioFeedback(`🔊 Testing: ${voice.name}`, 'info');
                    };
                    
                    utterance.onerror = (event) => {
                        showAudioFeedback(`❌ Error with ${voice.name}: ${event.error}`, 'error');
                    };
                    
                    speechSynthesis.speak(utterance);
                }, 100);
            }
        }

        // Show audio troubleshooting
        function showAudioTroubleshooting() {
            const troubleshootModal = document.createElement('div');
            troubleshootModal.className = 'troubleshoot-modal';
            
            troubleshootModal.innerHTML = `
                <h3 class="audio-trouble-title">🔧 Risoluzione Problemi Audio</h3>
                
                <div class="audio-trouble-content">
                    <p><strong>Prova questi passaggi:</strong></p>
                    <ol>
                        <li>Controlla il volume del browser e del sistema</li>
                        <li>Ricarica la pagina (F5)</li>
                        <li>Prova un browser diverso (Chrome consigliato)</li>
                        <li>Clicca prima su un pulsante, poi prova l'audio</li>
                        <li>Controlla se altri siti riproducono audio</li>
                    </ol>
                    
                    <p style="margin-top: 15px;"><strong>Browser consigliati:</strong></p>
                    <ul>
                        <li>✅ Google Chrome</li>
                        <li>✅ Mozilla Firefox</li>
                        <li>✅ Safari (Mac)</li>
                        <li>⚠️ Edge (limitato)</li>
                    </ul>
                </div>
                
                <button onclick="this.parentElement.remove()" class="audio-action-btn">
                    Ho capito
                </button>
            `;
            
            document.body.appendChild(troubleshootModal);
        }
        
        // Funzione per il dizionario
        function searchDictionary() {
            const term = document.getElementById('dictionaryInput').value.toLowerCase();
            const result = document.getElementById('dictionaryResult');
            
            if (medicalDictionary[term]) {
                result.innerHTML = `<strong>${term}:</strong><br>${medicalDictionary[term]}`;
                result.className = 'medical-context';
            } else {
                result.innerHTML = `<em>Termine non trovato. Prova con: ${Object.keys(medicalDictionary).slice(0, 3).join(', ')}...</em>`;
                result.className = 'feedback error active';
            }
        }
        
        // Navigazione lezioni
        function nextLesson() {
            lessonsCompleted += 1;
            if (overallProgress < 100) {
                overallProgress += 2;
            }
            updateProgress();
            
            // Simula il passaggio alla prossima lezione
            const lessons = ['grammar', 'vocabulary', 'reading', 'writing', 'listening'];
            const currentActive = document.querySelector('.lesson-type.active').id;
            const currentIndex = lessons.indexOf(currentActive);
            const nextIndex = (currentIndex + 1) % lessons.length;
            
            showLesson(lessons[nextIndex]);
            
            // Reset delle risposte
            resetLesson();
        }
        
        function previousLesson() {
            const lessons = ['grammar', 'vocabulary', 'reading', 'writing', 'listening'];
            const currentActive = document.querySelector('.lesson-type.active').id;
            const currentIndex = lessons.indexOf(currentActive);
            const prevIndex = currentIndex === 0 ? lessons.length - 1 : currentIndex - 1;
            
            showLesson(lessons[prevIndex]);
            resetLesson();
        }
        
        function resetLesson() {
            // Reset opzioni
            const options = document.querySelectorAll('.option');
            options.forEach(opt => {
                opt.classList.remove('correct', 'incorrect');
                opt.disabled = false;
            });
            
            // Reset feedback
            const feedbacks = document.querySelectorAll('.feedback');
            feedbacks.forEach(feedback => {
                feedback.classList.remove('active');
            });
            
            // Reset input
            const inputs = document.querySelectorAll('.vocabulary-input');
            inputs.forEach(input => input.value = '');
            
            const writingArea = document.getElementById('writingArea');
            if (writingArea) writingArea.value = '';
            
            const wordCount = document.getElementById('wordCount');
            if (wordCount) wordCount.textContent = '0';
        }
        
        // Salvataggio automatico del progresso
        setInterval(() => {
            localStorage.setItem('medEnglishProgress', JSON.stringify({
                level: currentLevel,
                progress: overallProgress,
                streak: streakDays,
                words: wordsLearned,
                lessons: lessonsCompleted
            }));
        }, 30000); // Salva ogni 30 secondi
        
        // Caricamento del progresso salvato
        window.addEventListener('load', () => {
            const saved = localStorage.getItem('medEnglishProgress');
            if (saved) {
                const data = JSON.parse(saved);
                currentLevel = data.level || 'A2';
                overallProgress = data.progress || 25;
                streakDays = data.streak || 7;
                wordsLearned = data.words || 342;
                lessonsCompleted = data.lessons || 28;
                updateProgress();
            }
        });

        // ========== NUOVE FUNZIONALITÀ ISPIRATE A TALKPAL E WISER ==========

        // Microlearning Timer (Ispirato a Wiser)
        let microlearningTimer = null;
        let microlearningTimeLeft = 300; // 5 minuti in secondi
        let microlearningActive = false;

        function initializeMicrolearning() {
            const startBtn = document.getElementById('startMicroSession');
            const timerDisplay = document.getElementById('sessionTimer');
            
            startBtn.addEventListener('click', toggleMicrolearning);
            updateTimerDisplay();
        }

        function toggleMicrolearning() {
            const startBtn = document.getElementById('startMicroSession');
            
            if (!microlearningActive) {
                startMicrolearning();
                startBtn.textContent = '⏸️ Pause Session';
                startBtn.classList.remove('btn-success');
                startBtn.classList.add('btn-danger');
            } else {
                pauseMicrolearning();
                startBtn.textContent = '🚀 Resume Session';
                startBtn.classList.remove('btn-danger');
                startBtn.classList.add('btn-success');
            }
        }

        function startMicrolearning() {
            microlearningActive = true;

            // Integrate Enhanced Features
            if (typeof EnhancedMedEnglishFeatures !== 'undefined') {
                const level = currentGeneralLevel || 'A2';
                const modules = EnhancedMedEnglishFeatures.microlearningModules[level];
                if (modules && modules.length > 0) {
                    const randomModule = modules[Math.floor(Math.random() * modules.length)];
                    showMicrolearningModule(randomModule);
                }
            }

            microlearningTimer = setInterval(() => {
                microlearningTimeLeft--;
                updateTimerDisplay();
                
                if (microlearningTimeLeft <= 0) {
                    completeMicrolearning();
                }
            }, 1000);
            
            // Mostra notifica motivazionale
            showMicrolearningNotification("🚀 Sessione micro-learning iniziata! 5 minuti di apprendimento intensivo.", "success");
        }

        function showMicrolearningModule(module) {
             // Create a modal or use an existing container to show content
             const existing = document.getElementById('microlearning-content');
             if (existing) existing.remove();

             const container = document.createElement('div');
             container.id = 'microlearning-content';
             container.className = 'microlearning-modal';
             
             let contentHtml = `<h3 class="microlearning-title">${module.title}</h3>`;
             if (module.content) {
                 module.content.forEach(item => {
                     if (item.type === 'vocabulary') {
                         contentHtml += `<div class="microlearning-vocab-item">
                            <p class="microlearning-vocab-term">${item.term}</p>
                            <p class="microlearning-vocab-translation">${item.translation}</p>
                         </div>`;
                     } else if (item.type === 'quick-quiz') {
                         contentHtml += `<div class="microlearning-quiz-container">
                            <p><strong>Q:</strong> ${item.question}</p>`;
                         item.options.forEach((opt, idx) => {
                             contentHtml += `<button class="btn microlearning-quiz-btn" onclick="checkMicroAnswer(${idx}, ${item.correct}, this)">${opt}</button>`;
                         });
                         contentHtml += `</div>`;
                     } else if (item.type === 'vocabulary-flash') {
                         contentHtml += `<div class="microlearning-quiz-container">
                            <p><strong>Flashcards:</strong> ${item.terms.join(', ')}</p>
                         </div>`;
                     } else if (item.type === 'scenario') {
                        contentHtml += `<div class="microlearning-quiz-container">
                           <p><strong>Scenario:</strong> ${item.situation}</p>
                           ${item.dialogue.map(d => `<p class="microlearning-scenario-dialogue"><em>${d}</em></p>`).join('')}
                        </div>`;
                    }
                 });
             }
             
             contentHtml += `<button class="btn microlearning-close-btn" onclick="document.getElementById('microlearning-content').remove()">Chiudi</button>`;
             
             container.innerHTML = contentHtml;
             document.body.appendChild(container);
        }

        // Rendiamo la funzione globale per l'onclick
        window.checkMicroAnswer = function(selected, correct, btn) {
            if (selected === correct) {
                btn.classList.add('btn-correct');
                // alert('Correct!'); 
            } else {
                btn.classList.add('btn-wrong');
                // alert('Try again');
            }
        };

        function pauseMicrolearning() {
            microlearningActive = false;
            if (microlearningTimer) {
                clearInterval(microlearningTimer);
                microlearningTimer = null;
            }
        }

        function completeMicrolearning() {
            pauseMicrolearning();
            microlearningTimeLeft = 300; // Reset
            
            const startBtn = document.getElementById('startMicroSession');
            startBtn.textContent = '🚀 Start 5-Min Learning';
            startBtn.classList.remove('btn-danger', 'btn-success');
            startBtn.classList.add('btn-primary');
            
            // Achievement per completamento
            wordsLearned += 10;
            lessonsCompleted += 1;
            
            // Update tracking
            if (app.currentUser.microlearning_sessions === undefined) app.currentUser.microlearning_sessions = 0;
            app.currentUser.microlearning_sessions++;
            app.saveUserData();
            
            updateProgress();
            
            showMicrolearningNotification("🎉 Sessione completata! +10 punti esperienza. Ottimo lavoro!", "success");
            updateTimerDisplay();
        }

        function updateTimerDisplay() {
            const minutes = Math.floor(microlearningTimeLeft / 60);
            const seconds = microlearningTimeLeft % 60;
            const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            document.getElementById('sessionTimer').textContent = display;
        }

        function showMicrolearningNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = type === 'success' ? 'microlearning-notification-success' : 'microlearning-notification-error';
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 4000);
        }

        // AI Chat Functionality (Ispirato a TalkPal)
        let aiChatHistory = [];
        let currentAIMode = 'patient-consultation';

        function sendAIMessage() {
            const input = document.getElementById('aiChatInput');
            const message = input.value.trim();
            
            if (!message) return;
            
            // Aggiungi messaggio utente
            addChatMessage(message, 'user');
            
            // Analizza grammatica
            analyzeGrammar(message);
            
            // Genera risposta AI
            setTimeout(() => {
                const aiResponse = generateAIResponse(message, currentAIMode);
                addChatMessage(aiResponse, 'ai');
            }, 1000);
            
            input.value = '';
            
            // Aggiorna punteggio e tracking
            wordsLearned += 3;
            
            // Enhanced tracking
            if (app.currentUser.ai_conversations === undefined) app.currentUser.ai_conversations = 0;
            app.currentUser.ai_conversations++;
            app.saveUserData();
            
            updateProgress();
        }

        function addChatMessage(message, sender) {
            const chatMessages = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            
            if (sender === 'user') {
                messageDiv.className = 'user-message';
                messageDiv.innerHTML = `<strong>👤 You:</strong> ${message}`;
            } else {
                messageDiv.className = 'ai-message';
                messageDiv.innerHTML = `<strong>🤖 AI Doctor:</strong> ${message}`;
            }
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            aiChatHistory.push({ message, sender });
        }

        function analyzeGrammar(message) {
            const feedback = document.getElementById('aiGrammarFeedback');
            
            // Analisi grammaticale semplificata
            let corrections = [];
            let score = 100;
            
            // Controlli base
            if (!message.match(/^[A-Z]/)) {
                corrections.push("Start sentences with a capital letter");
                score -= 10;
            }
            
            if (!message.match(/[.!?]$/)) {
                corrections.push("End sentences with proper punctuation");
                score -= 10;
            }
            
            if (message.includes(' i ') || message.startsWith('i ')) {
                corrections.push("Use 'I' (capital) for first person");
                score -= 5;
            }
            
            // Controlli medici specifici
            if (currentAIMode === 'patient-consultation') {
                if (!message.toLowerCase().includes('patient') && !message.toLowerCase().includes('you')) {
                    corrections.push("In patient consultations, address the patient directly");
                    score -= 5;
                }
            }
            
            // Mostra feedback
            if (corrections.length > 0) {
                feedback.innerHTML = `
                    <div class="grammar-correction">
                        <strong>📝 Grammar Feedback:</strong><br>
                        ${corrections.map(c => `• ${c}`).join('<br>')}
                    </div>
                `;
                feedback.classList.add('active');
            } else {
                feedback.innerHTML = `
                    <div class="fluency-score">
                        <strong>✅ Excellent grammar!</strong> Fluency Score: ${score}/100
                    </div>
                `;
                feedback.classList.add('active');
            }
            
            setTimeout(() => {
                feedback.classList.remove('active');
            }, 5000);
        }

        function generateAIResponse(userMessage, mode) {
            const responses = {
                'patient-consultation': [
                    "Thank you for asking about my symptoms. The chest pain started yesterday and it's getting worse when I breathe deeply.",
                    "I appreciate your concern, doctor. I've also been feeling short of breath, especially when walking upstairs.",
                    "Yes, I understand. Should I be worried about this pain? It's really concerning me.",
                    "I've been taking some over-the-counter pain medication, but it doesn't seem to help much."
                ],
                'colleague-discussion': [
                    "That's an interesting case. Have you considered ordering additional cardiac enzymes?",
                    "Based on the symptoms, I would recommend an ECG and chest X-ray as initial investigations.",
                    "In my experience with similar cases, we should also consider pulmonary embolism in the differential diagnosis.",
                    "What's your assessment of the patient's risk factors for cardiovascular disease?"
                ],
                'research-presentation': [
                    "Those are compelling results. What was your sample size for this study?",
                    "The methodology seems robust. How did you control for confounding variables?",
                    "This could have significant clinical implications. Have you considered a multi-center trial?",
                    "The statistical analysis is impressive. What's the next step in your research?"
                ],
                'case-study': [
                    "This case presents several diagnostic challenges. What additional tests would you recommend?",
                    "The patient's history is complex. How would you prioritize the differential diagnoses?",
                    "Given the clinical presentation, what's your treatment approach?",
                    "This is a rare condition. What resources would you consult for management guidelines?"
                ]
            };
            
            const modeResponses = responses[mode] || responses['patient-consultation'];
            return modeResponses[Math.floor(Math.random() * modeResponses.length)];
        }

        function startVoiceInput() {
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                const recognition = new SpeechRecognition();
                
                recognition.lang = 'en-US';
                recognition.continuous = false;
                recognition.interimResults = false;
                
                const voiceBtn = event.target;
                const originalText = voiceBtn.textContent;
                voiceBtn.textContent = '🔴 Recording...';
                voiceBtn.classList.add('voice-recording');
                
                recognition.onresult = function(event) {
                    const transcript = event.results[0][0].transcript;
                    document.getElementById('aiChatInput').value = transcript;
                    voiceBtn.textContent = originalText;
                    voiceBtn.classList.remove('voice-recording');
                };
                
                recognition.onerror = function() {
                    voiceBtn.textContent = originalText;
                    voiceBtn.classList.remove('voice-recording');
                    alert('Voice recognition error. Please try again.');
                };
                
                recognition.onend = function() {
                    voiceBtn.textContent = originalText;
                    voiceBtn.classList.remove('voice-recording');
                };
                
                recognition.start();
            } else {
                alert('Voice recognition not supported in this browser.');
            }
        }

        function endAISession() {
            // Reset chat history but keep tracking
            document.getElementById('chatMessages').innerHTML = `
                <div class="ai-message">
                    <strong>🤖 AI Doctor:</strong> Session ended. Feel free to start a new conversation whenever you're ready!
                </div>
            `;
            
            // Provide summary feedback
            if (aiChatHistory.length > 2) {
                 showFeedback("Great session! You've practiced " + Math.floor(aiChatHistory.length/2) + " exchanges.", "success");
            }
            
            // Clear history array
            aiChatHistory = [];
        }

        // Roleplay Functionality
        let currentRoleplayScenario = 'emergency';
        let roleplayActive = false;
        let roleplayMessageCount = 0;

        function startRoleplay() {
            roleplayActive = true;
            roleplayMessageCount = 0;
            document.getElementById('roleplayChat').classList.remove('hidden');
            document.getElementById('roleplayInput').classList.remove('hidden');
            
            let initialMessage = '';
            
            // Integrate Enhanced Features
            if (typeof EnhancedMedEnglishFeatures !== 'undefined' && EnhancedMedEnglishFeatures.roleplayScenarios) {
                const scenarioData = EnhancedMedEnglishFeatures.roleplayScenarios[currentRoleplayScenario];
                if (scenarioData && scenarioData.situations) {
                    const situation = scenarioData.situations[0];
                    initialMessage = `<strong>${situation.name}</strong><br>${situation.description}<br><br>Objectives:<br>${situation.objectives.map(o => `- ${o}`).join('<br>')}`;
                }
            }

            if (!initialMessage) {
                const scenarios = {
                    emergency: "You're in the emergency room. A patient with severe abdominal pain has just arrived. Start your assessment.",
                    consultation: "You're conducting a routine consultation. The patient has concerns about their medication side effects.",
                    research: "You're presenting your clinical trial results to the research committee. Begin your presentation.",
                    conference: "You're at a medical conference. A colleague asks about your recent publication."
                };
                initialMessage = scenarios[currentRoleplayScenario];
            }
            
            addRoleplayMessage(initialMessage, 'system');
        }

        function addRoleplayMessage(message, sender) {
            const messagesDiv = document.getElementById('roleplayMessages');
            const messageDiv = document.createElement('div');
            
            if (sender === 'system') {
                messageDiv.className = 'roleplay-message';
                messageDiv.innerHTML = `<strong>🎭 Scenario:</strong> ${message}`;
            } else if (sender === 'user') {
                messageDiv.className = 'user-message';
                messageDiv.innerHTML = `<strong>👤 You:</strong> ${message}`;
            } else {
                messageDiv.className = 'ai-message';
                messageDiv.innerHTML = `<strong>🎭 Patient/Colleague:</strong> ${message}`;
            }
            
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        function sendRoleplayMessage() {
            const input = document.getElementById('roleplayTextInput');
            const message = input.value.trim();
            
            if (!message) return;
            
            addRoleplayMessage(message, 'user');
            
            // Genera risposta basata sullo scenario
            setTimeout(() => {
                const response = generateRoleplayResponse(message, currentRoleplayScenario);
                addRoleplayMessage(response, 'ai');
            }, 1500);
            
            input.value = '';
            wordsLearned += 5;
            
            // Enhanced tracking
            roleplayMessageCount++;
            if (roleplayMessageCount >= 5) { // Consider scenario "completed" after 5 exchanges
                if (app.currentUser.roleplay_scenarios_completed === undefined) app.currentUser.roleplay_scenarios_completed = 0;
                // Increment only once per session batch of 5? 
                // Let's increment by 1 every 5 messages to simulate progress
                if (roleplayMessageCount % 5 === 0) {
                     app.currentUser.roleplay_scenarios_completed++;
                     app.saveUserData();
                     showFeedback("Scenario progress saved! +1 completion credit.", "success");
                }
            }
            
            updateProgress();
        }

        function generateRoleplayResponse(userMessage, scenario) {
            const responses = {
                emergency: [
                    "Doctor, the pain is unbearable! It started about 2 hours ago and it's getting worse.",
                    "I feel nauseous and I vomited once. The pain is here, in my lower right abdomen.",
                    "No, I haven't had surgery before. I'm really scared, doctor. What's wrong with me?",
                    "Yes, I can walk, but it hurts a lot. Should I be worried about appendicitis?"
                ],
                consultation: [
                    "Doctor, I've been taking the medication you prescribed, but I'm experiencing some side effects.",
                    "I feel dizzy sometimes, especially when I stand up quickly. Is this normal?",
                    "I'm also having trouble sleeping. Could this be related to the medication?",
                    "Should I continue taking it, or do you think we should try something else?"
                ],
                research: [
                    "Thank you for the presentation. Can you elaborate on your inclusion criteria?",
                    "The results are impressive. How do you plan to address the limitations you mentioned?",
                    "What's the clinical significance of these findings for everyday practice?",
                    "Have you considered conducting a larger, multi-center study?"
                ],
                conference: [
                    "I read your paper with great interest. The methodology was quite innovative.",
                    "How did you overcome the challenges with patient recruitment?",
                    "Do you think these results are generalizable to other populations?",
                    "What are your plans for future research in this area?"
                ]
            };
            
            const scenarioResponses = responses[scenario] || responses['emergency'];
            return scenarioResponses[Math.floor(Math.random() * scenarioResponses.length)];
        }

        function selectScenario(scenario) {
            currentRoleplayScenario = scenario;
            const scenarioNames = {
                emergency: 'Emergency Room Consultation',
                consultation: 'Routine Patient Consultation', 
                research: 'Research Committee Meeting',
                conference: 'Medical Conference Discussion'
            };
            
            document.getElementById('currentScenario').textContent = scenarioNames[scenario];
            
            // Reset roleplay
            document.getElementById('roleplayMessages').innerHTML = '';
            document.getElementById('roleplayChat').classList.add('hidden');
            document.getElementById('roleplayInput').classList.add('hidden');
            roleplayActive = false;
        }

        function changeScenario() {
            const scenarios = ['emergency', 'consultation', 'research', 'conference'];
            const currentIndex = scenarios.indexOf(currentRoleplayScenario);
            const nextIndex = (currentIndex + 1) % scenarios.length;
            selectScenario(scenarios[nextIndex]);
        }

        // Photo Mode Functionality
        let currentPhotoIndex = 0;
        const medicalPhotos = [
            {
                title: "Chest X-Ray",
                description: "Normal chest radiograph showing clear lung fields",
                icon: "🫁",
                keywords: ["chest", "x-ray", "lungs", "radiograph", "thorax", "ribs", "heart", "diaphragm"],
                hints: ["Describe the lung fields", "Comment on heart size", "Note the diaphragm position", "Mention rib structure"]
            },
            {
                title: "ECG Reading",
                description: "12-lead electrocardiogram showing normal sinus rhythm",
                icon: "📈",
                keywords: ["ECG", "electrocardiogram", "rhythm", "waves", "intervals", "cardiac", "heart rate"],
                hints: ["Identify the rhythm", "Measure intervals", "Comment on wave morphology", "Calculate heart rate"]
            },
            {
                title: "Blood Pressure Monitor",
                description: "Digital sphygmomanometer displaying blood pressure reading",
                icon: "🩺",
                keywords: ["blood pressure", "systolic", "diastolic", "hypertension", "mmHg", "cuff", "monitor"],
                hints: ["Read the values", "Interpret the results", "Comment on normal ranges", "Discuss implications"]
            },
            {
                title: "Microscopy Slide",
                description: "Histological section showing cellular structures",
                icon: "🔬",
                keywords: ["microscopy", "cells", "tissue", "histology", "pathology", "biopsy", "magnification"],
                hints: ["Describe cell types", "Note tissue architecture", "Comment on abnormalities", "Suggest diagnosis"]
            },
            {
                title: "MRI Brain Scan",
                description: "Magnetic resonance imaging of the brain",
                icon: "🧠",
                keywords: ["MRI", "brain", "neuroimaging", "anatomy", "ventricles", "cortex", "white matter"],
                hints: ["Identify brain regions", "Comment on symmetry", "Note any abnormalities", "Describe image quality"]
            }
        ];

        function initializePhotoMode() {
            updatePhotoWordCount();
            loadNewPhoto();
        }

        function loadNewPhoto() {
            currentPhotoIndex = (currentPhotoIndex + 1) % medicalPhotos.length;
            const photo = medicalPhotos[currentPhotoIndex];
            
            const photoContainer = document.getElementById('medicalPhoto');
            photoContainer.innerHTML = `
                <div class="photo-container-inner">
                    <div class="photo-icon-large">${photo.icon}</div>
                    <p><strong>${photo.title}</strong></p>
                    <p class="photo-description-text">${photo.description}</p>
                </div>
            `;
            
            // Reset description
            document.getElementById('photoDescription').value = '';
            document.getElementById('photoWordCount').textContent = '0';
            document.getElementById('photoFeedback').classList.remove('active');
            
            // Update vocabulary bank
            updatePhotoVocabBank(photo.keywords);
        }

        function updatePhotoVocabBank(keywords) {
            const vocabBank = document.getElementById('photoVocabBank');
            vocabBank.innerHTML = keywords.slice(0, 6).map(keyword => `
                <div class="photo-vocab-item" onclick="addToDescription('${keyword}')">
                    <strong>${keyword}</strong>
                </div>
            `).join('');
        }

        function addToDescription(word) {
            const textarea = document.getElementById('photoDescription');
            const currentText = textarea.value;
            const newText = currentText + (currentText ? ' ' : '') + word;
            textarea.value = newText;
            updatePhotoWordCount();
        }

        function updatePhotoWordCount() {
            const textarea = document.getElementById('photoDescription');
            if (textarea) {
                textarea.addEventListener('input', function() {
                    const words = this.value.trim().split(/\s+/).filter(word => word.length > 0);
                    document.getElementById('photoWordCount').textContent = words.length;
                });
            }
        }

        function analyzePhotoDescription() {
            const description = document.getElementById('photoDescription').value.trim();
            const currentPhoto = medicalPhotos[currentPhotoIndex];
            const feedback = document.getElementById('photoFeedback');
            
            if (description.length < 20) {
                feedback.innerHTML = "❌ Description too short. Try to be more detailed!";
                feedback.className = "feedback error active";
                return;
            }
            
            // Analizza l'uso di parole chiave
            const usedKeywords = currentPhoto.keywords.filter(keyword => 
                description.toLowerCase().includes(keyword.toLowerCase())
            );
            
            const score = Math.min(100, (usedKeywords.length / currentPhoto.keywords.length) * 100 + 20);
            
            // Enhanced tracking
            if (app.currentUser.photo_descriptions === undefined) app.currentUser.photo_descriptions = 0;
            app.currentUser.photo_descriptions++;
            app.saveUserData();
            
            let feedbackText = `
                <div class="photo-feedback-score">
                    <strong>📊 Analysis Score: ${Math.round(score)}/100</strong>
                </div>
                <div class="photo-feedback-keywords">
                    <strong>✅ Keywords used:</strong> ${usedKeywords.join(', ') || 'None'}
                </div>
            `;
            
            if (score >= 70) {
                feedbackText += `<div class="feedback-success-text"><strong>🎉 Excellent description!</strong> You demonstrated good medical vocabulary.</div>`;
                wordsLearned += 8;
            } else if (score >= 50) {
                feedbackText += `<div class="feedback-warning-text"><strong>👍 Good effort!</strong> Try to include more medical terms.</div>`;
                wordsLearned += 5;
            } else {
                feedbackText += `<div class="feedback-error-text"><strong>📚 Keep practicing!</strong> Focus on using specific medical terminology.</div>`;
                wordsLearned += 2;
            }
            
            feedback.innerHTML = feedbackText;
            feedback.className = "feedback success active";
            
            updateProgress();
        }

        function getPhotoHints() {
            const currentPhoto = medicalPhotos[currentPhotoIndex];
            const feedback = document.getElementById('photoFeedback');
            
            const hintsText = `
                <div class="hints-container">
                    <strong>💡 Hints for ${currentPhoto.title}:</strong>
                    <ul class="hints-list">
                        ${currentPhoto.hints.map(hint => `<li>${hint}</li>`).join('')}
                    </ul>
                    <div class="hints-keywords">
                        <strong>Suggested keywords:</strong> ${currentPhoto.keywords.slice(0, 4).join(', ')}
                    </div>
                </div>
            `;
            
            feedback.innerHTML = hintsText;
            feedback.className = "feedback success active";
        }

        // Event listeners per i nuovi elementi
        document.addEventListener('DOMContentLoaded', function() {
            // AI Chat mode selector
            const aiModeSelector = document.getElementById('aiChatMode');
            if (aiModeSelector) {
                aiModeSelector.addEventListener('change', function() {
                    currentAIMode = this.value;
                    let initialMessage = `Mode changed to ${this.options[this.selectedIndex].text}. Let's practice!`;
                    
                    // Integrate Enhanced Features for starting message
                    if (typeof EnhancedMedEnglishFeatures !== 'undefined' && EnhancedMedEnglishFeatures.conversationTemplates) {
                        const template = EnhancedMedEnglishFeatures.conversationTemplates[currentAIMode];
                        if (template && template.scenarios && template.scenarios.length > 0) {
                            // Pick a random scenario from the template
                            const scenario = template.scenarios[Math.floor(Math.random() * template.scenarios.length)];
                            initialMessage = `<strong>Scenario: ${scenario.title}</strong><br><em>Context: ${scenario.context}</em><br><br>${scenario.startingMessage}`;
                        }
                    }

                    // Reset chat
                    document.getElementById('chatMessages').innerHTML = `
                        <div class="ai-message">
                            <strong>🤖 AI Doctor:</strong> ${initialMessage}
                        </div>
                    `;
                });
            }
            
            // Enter key support for inputs
            const aiChatInput = document.getElementById('aiChatInput');
            if (aiChatInput) {
                aiChatInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        sendAIMessage();
                    }
                });
            }
            
            const roleplayInput = document.getElementById('roleplayTextInput');
            if (roleplayInput) {
                roleplayInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        sendRoleplayMessage();
                    }
                });
            }
        });

        // ========== GENERAL ENGLISH SYSTEM A2→B2 ==========

        // Inizializza il sistema General English
        function initializeGeneralEnglish() {
            updateGeneralProgress();
            updateLevelAccess();
            checkMedicalSectionAccess();
            showLesson('general-english'); // Mostra la sezione General English di default
        }

        function updateLevelAccess() {
            const levels = ['A2', 'B1', 'B2'];
            
            levels.forEach((level, index) => {
                const card = document.getElementById(`levelCard${level}`);
                if (!card) return;
                
                // A2 is always unlocked
                if (index === 0) {
                    card.classList.remove('locked-level');
                    card.style.opacity = '1';
                    card.style.cursor = 'pointer';
                    return;
                }
                
                // Check previous level progress
                const prevLevel = levels[index - 1];
                const prevProgress = generalLevelProgress[prevLevel] || 0;
                
                if (prevProgress >= 80) {
                    card.classList.remove('locked-level');
                    card.style.opacity = '1';
                    card.style.cursor = 'pointer';
                } else {
                    card.classList.add('locked-level');
                    card.style.opacity = '0.6';
                    card.style.cursor = 'not-allowed';
                }
            });
        }

        // Aggiorna il progresso generale
        function updateGeneralProgress() {
            // Calcola progresso per livello corrente
            const currentLevelData = GeneralEnglishDatabase[currentGeneralLevel];
            if (!currentLevelData) return;
            
            const topics = Object.keys(currentLevelData.topics);
            const completedTopics = topics.filter(topicId => {
                const key = `${currentGeneralLevel}-${topicId}`;
                return (generalTopicProgress[key] || 0) >= 80;
            }).length;
            
            const levelProgress = Math.round((completedTopics / topics.length) * 100);
            generalLevelProgress[currentGeneralLevel] = levelProgress;
            
            // Salva progresso
            localStorage.setItem('generalLevelProgress', JSON.stringify(generalLevelProgress));
            localStorage.setItem('currentGeneralLevel', currentGeneralLevel);
            
            // Aggiorna UI
            document.getElementById('currentGeneralLevelDisplay').textContent = currentGeneralLevel;
            document.getElementById('generalProgressText').textContent = `${levelProgress}%`;
            updateProgressBar('generalProgressBar', levelProgress);
            
            if (document.getElementById('currentLevelDisplay')) {
                document.getElementById('currentLevelDisplay').textContent = currentGeneralLevel;
                document.getElementById('levelDetailProgress').textContent = `Progresso: ${levelProgress}%`;
                updateProgressBar('levelDetailProgressBar', levelProgress);
            }
            
            // Aggiorna progresso per ogni livello
            ['A2', 'B1', 'B2'].forEach(level => {
                const progress = generalLevelProgress[level] || 0;
                const progressElement = document.getElementById(`progress${level}`);
                if (progressElement) {
                    progressElement.textContent = `${progress}% completato`;
                }
            });
        }

        // Seleziona un livello generale
        function selectGeneralLevel(level) {
            // Controlla se il livello è accessibile
            if (level !== 'A2') {
                const levels = ['A2', 'B1', 'B2'];
                const levelIndex = levels.indexOf(level);
                const previousLevel = levels[levelIndex - 1];
                const previousProgress = generalLevelProgress[previousLevel] || 0;
                
                if (previousProgress < 80) {
                    showLevelAccessDenied(level, previousLevel, previousProgress);
                    return;
                }
            }
            
            currentGeneralLevel = level;
            localStorage.setItem('currentGeneralLevel', level);
            
            // Mostra contenuto del livello
            document.getElementById('levelContent').classList.remove('hidden');
            
            const levelData = GeneralEnglishDatabase[level];
            document.getElementById('selectedLevelTitle').textContent = `${level} - ${levelData.name}`;
            document.getElementById('selectedLevelDescription').textContent = levelData.description;
            
            // Genera pulsanti topic
            generateTopicButtons(level);
            
            // Scroll verso il contenuto
            document.getElementById('levelContent').scrollIntoView({ behavior: 'smooth' });
            
            updateGeneralProgress();
        }

        // Controlla accesso alla sezione medica
        function checkMedicalSectionAccess() {
            const medicalSection = document.getElementById('medicalSection');
            if (!medicalSection) return;
            
            // Check for Premium User (Instant Access)
            const isPremium = localStorage.getItem('isPremiumUser') === 'true';
            
            const b2Progress = generalLevelProgress['B2'] || 0;
            const statusDiv = medicalSection.querySelector('.medical-lock-msg');
            
            if (isPremium || b2Progress >= MEDICAL_ACCESS_THRESHOLD) {
                // Sblocca sezione medica
                medicalSection.classList.remove('medical-section-locked');
                medicalSection.classList.add('medical-section-unlocked');
                
                if (isPremium) {
                     medicalSection.querySelector('h5').textContent = '🏥 Medical English (PREMIUM UNLOCKED)';
                     if (statusDiv) {
                        statusDiv.innerHTML = '👑 <strong>Premium Access!</strong> Tutti i contenuti medici sono sbloccati.';
                        statusDiv.className = 'medical-lock-msg medical-section-unlocked-status';
                    }
                } else {
                    medicalSection.querySelector('h5').textContent = '🏥 Medical English (Sbloccato!)';
                     if (statusDiv) {
                        statusDiv.innerHTML = '✅ <strong>Congratulazioni!</strong> Hai sbloccato i contenuti medici';
                        statusDiv.className = 'medical-lock-msg medical-section-unlocked-status';
                    }
                }

                // Mostra notifica se è la prima volta (solo se non premium, per non disturbare)
                if (!isPremium && !localStorage.getItem('medicalSectionUnlocked')) {
                    setTimeout(() => {
                        showMedicalUnlockedNotification();
                        localStorage.setItem('medicalSectionUnlocked', 'true');
                    }, 1000);
                }
            } else {
                medicalSection.classList.add('medical-section-locked');
                medicalSection.classList.remove('medical-section-unlocked');
                
                medicalSection.querySelector('h5').textContent = `🏥 Medical English (Richiede B2 ${MEDICAL_ACCESS_THRESHOLD}%)`;
                
                if (statusDiv) {
                    statusDiv.innerHTML = `🔒 Completa B2 General English (${b2Progress}/${MEDICAL_ACCESS_THRESHOLD}%) <br> <span style="font-size:0.9em;color:#ffd700;cursor:pointer" onclick="showPremiumModal()">oppure 👑 Passa a Premium</span>`;
                    statusDiv.className = 'medical-lock-msg medical-section-locked-status';
                }
            }
        }



        // Mostra messaggio accesso negato
        function showMedicalAccessDenied() {
            const b2Progress = generalLevelProgress['B2'] || 0;
            
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            
            const content = document.createElement('div');
            content.className = 'modal-content-base';
            
            content.innerHTML = `
                <div class="access-denied-icon">🔒</div>
                <h3 class="access-denied-title">Sezione Medica Bloccata</h3>
                <p class="access-denied-text">
                    Per accedere ai contenuti medici specializzati, devi prima completare il 
                    <strong>B2 General English</strong> con almeno ${MEDICAL_ACCESS_THRESHOLD}% di successo.
                </p>
                <p class="access-denied-progress">
                    Progresso B2 attuale: <strong>${b2Progress}%</strong>
                </p>
                <div>
                    <button onclick="this.closest('.modal-overlay').remove(); showLesson('general-english')" class="modal-action-btn">
                        📚 Vai al General English
                    </button>
                    <button onclick="this.closest('.modal-overlay').remove()" class="modal-close-btn">
                        Chiudi
                    </button>
                </div>
            `;
            
            modal.appendChild(content);
            document.body.appendChild(modal);
            
            // Chiudi cliccando fuori
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }

        // PREMIUM MOCK LOGIC
        function checkPremiumAccess(featureName) {
            const isPremium = localStorage.getItem('isPremiumUser') === 'true';
            if (isPremium) return true;

            showPremiumModal(featureName);
            return false;
        }

        function showPremiumModal(source) {
            // Crea modale se non esiste
            let modal = document.getElementById('premiumModal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'premiumModal';
                modal.className = 'premium-modal-overlay';
                
                modal.innerHTML = `
                    <div class="premium-modal-wrapper">
                        <button class="modal-close-btn-styled" onclick="closePremiumModal()">✕</button>
                        
                        <div class="premium-icon">👑</div>
                        <h2 class="premium-title">Diventa un MedEnglish Pro</h2>
                        <p class="premium-text">Supera l'esame OET e lavora all'estero!</p>
                        
                        <ul class="premium-features-list">
                            <li>🤖 <strong>AI Medical Chat:</strong> Simulazioni illimitate</li>
                            <li>🎭 <strong>Roleplay Clinico:</strong> Scenari paziente-dottore</li>
                            <li>📸 <strong>Photo Analysis:</strong> Descrivi casi reali</li>
                            <li>🎓 <strong>Certificato OET/IELTS:</strong> Preparazione esami</li>
                            <li>📈 <strong>Statistiche Avanzate:</strong> Monitora i progressi</li>
                        </ul>
                        
                        <button class="btn-premium-action" onclick="activatePremium()">
                            Sblocca Tutto a soli $9.99/mese
                        </button>
                        <p class="premium-guarantee-text">Garanzia soddisfatti o rimborsati di 30 giorni</p>
                    </div>
                `;
                document.body.appendChild(modal);
            } else {
                modal.style.display = 'flex';
            }
        }

        function closePremiumModal() {
            const modal = document.getElementById('premiumModal');
            if (modal) modal.style.display = 'none';
        }

        function activatePremium() {
            localStorage.setItem('isPremiumUser', 'true');
            alert('🎉 Complimenti! Ora sei un utente PREMIUM!\nTutte le funzioni sono sbloccate.');
            closePremiumModal();
            updateSubscriptionUI();
            
            // Trigger achievement check
            if (typeof app !== 'undefined' && app.checkAchievements) {
                 const newAchievements = app.checkAchievements();
                 if (newAchievements.length > 0) {
                     showAchievements(newAchievements);
                 }
            }
        }

        function updateSubscriptionUI() {
            const isPremium = localStorage.getItem('isPremiumUser') === 'true';
            const badge = document.getElementById('subscriptionStatus');
            const locks = document.querySelectorAll('.premium-lock-icon');
            
            if (isPremium) {
                if (badge) {
                    badge.textContent = 'PRO Member 👑';
                    badge.className = 'badge badge-premium';
                }
                locks.forEach(lock => lock.style.display = 'none');
            }
        }

