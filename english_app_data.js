// Database completo per MedEnglish Pro
// Sistema di contenuti strutturato per livelli A2-C2

const MedEnglishDatabase = {
    // Struttura dei livelli e progressione
    levels: {
        A2: {
            name: "Elementary Medical English",
            description: "Fondamenti della comunicazione medica",
            totalLessons: 50,
            requiredScore: 70,
            skills: ["Basic medical vocabulary", "Simple patient interactions", "Present tense medical descriptions"]
        },
        B1: {
            name: "Intermediate Clinical Communication", 
            description: "Comunicazione clinica intermedia",
            totalLessons: 60,
            requiredScore: 75,
            skills: ["Medical case presentations", "Past tense medical histories", "Basic research terminology"]
        },
        B2: {
            name: "Advanced Medical Practice",
            description: "Pratica medica avanzata",
            totalLessons: 70,
            requiredScore: 80,
            skills: ["Complex medical discussions", "Research paper reading", "Professional presentations"]
        },
        C1: {
            name: "Expert Clinical English",
            description: "Inglese clinico esperto",
            totalLessons: 80,
            requiredScore: 85,
            skills: ["Academic writing", "Conference presentations", "Peer review"]
        },
        C2: {
            name: "Mastery Medical English",
            description: "Padronanza completa",
            totalLessons: 90,
            requiredScore: 90,
            skills: ["Native-level medical communication", "Research leadership", "International collaboration"]
        }
    },

    // Contenuti per Grammatica
    grammar: {
        A2: [
            {
                title: "Present Simple in Medical Contexts",
                question: "The patient _____ (to have) diabetes and _____ (to take) insulin daily.",
                options: [
                    "has / takes",
                    "have / take", 
                    "had / took",
                    "will have / will take"
                ],
                correct: 0,
                explanation: "Present simple is used for permanent conditions and regular treatments."
            },
            {
                title: "Medical Prepositions",
                question: "The medication should be taken _____ meals _____ three times a day.",
                options: [
                    "with / for",
                    "after / during",
                    "before / at",
                    "during / in"
                ],
                correct: 0,
                explanation: "Medical instructions often use specific prepositions for timing and frequency."
            }
        ],
        B1: [
            {
                title: "Past Perfect in Medical Histories",
                question: "The patient reported that he _____ (to experience) chest pain before he _____ (to arrive) at the hospital.",
                options: [
                    "experienced / arrived",
                    "had experienced / arrived",
                    "was experiencing / had arrived",
                    "has experienced / arrives"
                ],
                correct: 1,
                explanation: "Past perfect shows which action happened first in medical histories."
            }
        ],
        B2: [
            {
                title: "Subjunctive in Medical Recommendations",
                question: "It is essential that the patient _____ the medication as prescribed.",
                options: [
                    "takes",
                    "took",
                    "take",
                    "will take"
                ],
                correct: 2,
                explanation: "Subjunctive mood is used after expressions of necessity in medical contexts."
            }
        ],
        C1: [
            {
                title: "Complex Conditional in Research",
                question: "Had the clinical trial _____ (to include) more participants, the results _____ (to be) more statistically significant.",
                options: [
                    "included / would be",
                    "included / would have been", 
                    "had included / would be",
                    "include / will be"
                ],
                correct: 1,
                explanation: "Third conditional expresses hypothetical past situations in research contexts."
            }
        ],
        C2: [
            {
                title: "Advanced Academic Structures",
                question: "Notwithstanding the limitations inherent in retrospective studies, the findings _____ significant implications for clinical practice.",
                options: [
                    "have",
                    "has",
                    "having",
                    "to have"
                ],
                correct: 0,
                explanation: "Complex academic structures require precise subject-verb agreement."
            }
        ]
    },

    // Vocabolario Medico + Quotidiano per Superare il Blocco
    vocabulary: {
        A2: [
            // Terminologia Medica Base
            {
                term: "symptom",
                definition: "A physical or mental feature indicating a condition or disease",
                pronunciation: "/ˈsɪmptəm/",
                example: "The patient's main symptom was severe headache.",
                category: "General Medical"
            },
            {
                term: "diagnosis",
                definition: "The identification of the nature of an illness or problem",
                pronunciation: "/ˌdaɪəɡˈnoʊsɪs/",
                example: "The doctor made a diagnosis of pneumonia.",
                category: "General Medical"
            },
            // Vocabolario Quotidiano per Superare il Blocco
            {
                term: "actually",
                definition: "In fact, really (used to emphasize or correct)",
                pronunciation: "/ˈæktʃuəli/",
                example: "Actually, I think the patient needs more rest.",
                category: "Daily Communication",
                usage_tip: "Usa per correggere gentilmente o enfatizzare un punto"
            },
            {
                term: "basically",
                definition: "In the most essential respects; fundamentally",
                pronunciation: "/ˈbeɪsɪkli/",
                example: "Basically, we need to monitor the patient closely.",
                category: "Daily Communication",
                usage_tip: "Perfetto per semplificare spiegazioni complesse"
            },
            {
                term: "obviously",
                definition: "In a way that is easily perceived or understood; clearly",
                pronunciation: "/ˈɑbviəsli/",
                example: "Obviously, patient safety is our priority.",
                category: "Daily Communication",
                usage_tip: "Usa quando qualcosa è chiaro per tutti"
            },
            {
                term: "definitely",
                definition: "Without doubt; certainly",
                pronunciation: "/ˈdefənətli/",
                example: "We definitely need to check the lab results.",
                category: "Daily Communication",
                usage_tip: "Esprime certezza - molto utile nelle conversazioni"
            },
            {
                term: "probably",
                definition: "Almost certainly; as far as one knows or can tell",
                pronunciation: "/ˈprɑbəbli/",
                example: "The patient will probably recover quickly.",
                category: "Daily Communication",
                usage_tip: "Per esprimere probabilità senza essere troppo definitivi"
            },
            {
                term: "especially",
                definition: "Used to single out one person or thing over all others",
                pronunciation: "/ɪˈspeʃəli/",
                example: "This is important, especially for elderly patients.",
                category: "Daily Communication",
                usage_tip: "Per dare enfasi a qualcosa di particolare"
            }
        ],
        B1: [
            // Terminologia Medica Intermedia
            {
                term: "prognosis",
                definition: "A forecast of the likely course of a disease or ailment",
                pronunciation: "/prɒɡˈnoʊsɪs/",
                example: "The prognosis for early-stage cancer is generally favorable.",
                category: "Clinical Assessment"
            },
            // Frasi di Transizione per Fluidità
            {
                term: "in other words",
                definition: "Used to introduce a rephrasing or explanation",
                pronunciation: "/ɪn ˈʌðər wɜrdz/",
                example: "The treatment failed, in other words, we need a new approach.",
                category: "Conversation Flow",
                usage_tip: "Perfetto per riformulare concetti difficili"
            },
            {
                term: "what I mean is",
                definition: "Used to clarify or explain what you just said",
                pronunciation: "/wʌt aɪ min ɪz/",
                example: "The results are inconclusive, what I mean is we need more data.",
                category: "Conversation Flow",
                usage_tip: "Usa quando vedi che l'altro non ha capito"
            },
            {
                term: "let me put it this way",
                definition: "Used to introduce a different way of explaining something",
                pronunciation: "/let mi pʊt ɪt ðɪs weɪ/",
                example: "Let me put it this way: the patient needs immediate attention.",
                category: "Conversation Flow",
                usage_tip: "Ottimo per cambiare approccio nella spiegazione"
            },
            {
                term: "the thing is",
                definition: "Used to introduce an important point or problem",
                pronunciation: "/ðə θɪŋ ɪz/",
                example: "The thing is, we don't have enough staff for night shifts.",
                category: "Conversation Flow",
                usage_tip: "Per introdurre il punto centrale di un problema"
            },
            {
                term: "to be honest",
                definition: "Used to emphasize that you are telling the truth",
                pronunciation: "/tu bi ˈɑnəst/",
                example: "To be honest, I'm not sure about this diagnosis.",
                category: "Conversation Flow",
                usage_tip: "Crea fiducia e mostra sincerità"
            }
        ],
        B2: [
            // Terminologia Medica Avanzata
            {
                term: "contraindication",
                definition: "A condition or factor that serves as a reason to withhold a certain medical treatment",
                pronunciation: "/ˌkɒntrəˌɪndɪˈkeɪʃən/",
                example: "Pregnancy is a contraindication for this medication.",
                category: "Pharmacology"
            },
            // Terminologia dalla Tua Tesi - Clinical Research
            {
                term: "CTIS",
                definition: "Clinical Trials Information System - EU database for clinical trial applications and information",
                pronunciation: "/siː tiː aɪ ɛs/",
                example: "All clinical trials in the EU must be registered in CTIS since 2022.",
                category: "Regulatory Affairs",
                usage_tip: "Sistema che usi quotidianamente nel tuo lavoro!"
            },
            {
                term: "lay summary",
                definition: "A plain language summary of clinical trial results accessible to the general public",
                pronunciation: "/leɪ ˈsʌməri/",
                example: "The study found 0.0% compliance with lay summary requirements in Italian pediatric trials.",
                category: "Clinical Research",
                usage_tip: "Tema centrale della tua tesi - gap di trasparenza!"
            },
            {
                term: "PIP",
                definition: "Paediatric Investigation Plan - mandatory development plan for medicines in children",
                pronunciation: "/piː aɪ piː/",
                example: "The pharmaceutical company submitted a PIP to the EMA for pediatric development.",
                category: "Regulatory Affairs",
                usage_tip: "Strumento chiave per la ricerca pediatrica"
            },
            {
                term: "reference member state",
                definition: "The EU member state that leads the assessment of a clinical trial application",
                pronunciation: "/ˈrɛfərəns ˈmɛmbər steɪt/",
                example: "Italy served as reference member state for 15% of the analyzed trials.",
                category: "Regulatory Affairs",
                usage_tip: "RMS - ruolo importante dell'Italia in Europa"
            },
            {
                term: "orphan drug",
                definition: "A pharmaceutical agent developed to treat rare diseases affecting small patient populations",
                pronunciation: "/ˈɔrfən drʌg/",
                example: "37.9% of pediatric trials in Italy involve orphan drugs, above EU average.",
                category: "Rare Diseases",
                usage_tip: "Dato chiave dalla tua ricerca - Italia hub per malattie rare"
            }
        ],
        C1: [
            // Terminologia Medica Esperta
            {
                term: "pharmacokinetics",
                definition: "The study of how the body affects a drug after administration",
                pronunciation: "/ˌfɑrməkoʊkɪˈnɛtɪks/",
                example: "The pharmacokinetics of this drug vary significantly between pediatric and adult populations.",
                category: "Advanced Pharmacology"
            },
            // Terminologia Avanzata dalla Tua Tesi
            {
                term: "clinical trial coordinator",
                definition: "A healthcare professional responsible for the operational management and ethical oversight of clinical trials",
                pronunciation: "/ˈklɪnɪkəl traɪəl koʊˈɔrdəˌneɪtər/",
                example: "The clinical trial coordinator evolved from data manager to cultural mediator in the CTIS era.",
                category: "Clinical Research",
                usage_tip: "Il TUO ruolo professionale - da data manager a mediatore culturale!"
            },
            {
                term: "transparency gap",
                definition: "The discrepancy between regulatory requirements for public information and actual compliance",
                pronunciation: "/trænˈspɛrənsi gæp/",
                example: "The study identified a significant transparency gap in Italian pediatric trials.",
                category: "Research Ethics",
                usage_tip: "Concetto centrale della tua tesi - gap di trasparenza"
            },
            {
                term: "financial toxicity",
                definition: "The negative financial impact of medical treatment on patients and families",
                pronunciation: "/faɪˈnænʃəl tɑkˈsɪsəti/",
                example: "Clinical trials should assess financial toxicity as part of sustainability evaluation.",
                category: "Health Economics",
                usage_tip: "Concetto innovativo che hai introdotto nella tua ricerca"
            },
            {
                term: "quality by design",
                definition: "A systematic approach to pharmaceutical development emphasizing quality from the design phase",
                pronunciation: "/ˈkwɑləti baɪ dɪˈzaɪn/",
                example: "ICH E6(R3) promotes quality by design principles in clinical trial management.",
                category: "Quality Management",
                usage_tip: "Approccio moderno che conosci bene"
            },
            {
                term: "risk-based monitoring",
                definition: "A clinical trial monitoring approach that focuses resources on the most critical data and processes",
                pronunciation: "/rɪsk beɪst ˈmɑnətərɪŋ/",
                example: "Risk-based monitoring reduces costs while maintaining data quality in pediatric trials.",
                category: "Quality Management",
                usage_tip: "Metodologia che applichi nel tuo lavoro quotidiano"
            }
        ],
        C2: [
            {
                term: "pharmacovigilance",
                definition: "The practice of monitoring the effects of medical drugs after they have been licensed for use",
                pronunciation: "/ˌfɑrməkoʊˈvɪdʒɪləns/",
                example: "Robust pharmacovigilance systems are essential for post-market drug safety monitoring.",
                category: "Regulatory Affairs"
            }
        ]
    },

    // Frasi Salvavita per Superare il Blocco nel Parlare/Scrivere
    conversationStarters: {
        A2: [
            {
                situation: "Iniziare una conversazione",
                phrases: [
                    "How are things going with...?",
                    "I wanted to talk to you about...",
                    "Can I ask you something about...?",
                    "I was wondering if..."
                ]
            },
            {
                situation: "Quando non capisci",
                phrases: [
                    "Could you repeat that, please?",
                    "I'm not sure I understand...",
                    "What do you mean by...?",
                    "Sorry, could you explain that again?"
                ]
            },
            {
                situation: "Guadagnare tempo per pensare",
                phrases: [
                    "That's a good question...",
                    "Let me think about that...",
                    "Well, actually...",
                    "You know what..."
                ]
            }
        ],
        B1: [
            {
                situation: "Esprimere opinioni",
                phrases: [
                    "In my opinion...",
                    "I think that...",
                    "From my experience...",
                    "It seems to me that..."
                ]
            },
            {
                situation: "Essere diplomatici",
                phrases: [
                    "I see your point, but...",
                    "That's interesting, however...",
                    "I understand what you're saying, although...",
                    "You might be right, but..."
                ]
            }
        ],
        B2: [
            {
                situation: "Presentazioni professionali",
                phrases: [
                    "I'd like to draw your attention to...",
                    "What's particularly interesting is...",
                    "This brings me to my next point...",
                    "As you can see from the data..."
                ]
            }
        ]
    },

    // Espressioni per Situazioni Specifiche
    situationalPhrases: {
        "meeting_start": [
            "Shall we get started?",
            "Let's begin with...",
            "First on the agenda is...",
            "I'd like to start by..."
        ],
        "asking_clarification": [
            "Could you elaborate on that?",
            "What exactly do you mean?",
            "Can you give me an example?",
            "I'm not quite following..."
        ],
        "buying_time": [
            "That's an excellent question...",
            "Let me think about that for a moment...",
            "Well, there are several ways to look at this...",
            "Actually, that reminds me of..."
        ],
        "agreeing": [
            "Absolutely!",
            "I couldn't agree more",
            "That's exactly what I was thinking",
            "You're absolutely right"
        ],
        "disagreeing_politely": [
            "I see it differently...",
            "I'm not entirely convinced that...",
            "Have you considered...?",
            "That's one way to look at it, but..."
        ]
    },

    // Testi per Reading Comprehension
    reading: {
        A2: [
            {
                title: "Basic Patient Information",
                text: "Mrs. Johnson is a 45-year-old woman who came to the clinic with chest pain. She has a history of high blood pressure and diabetes. The doctor examined her and ordered some tests. The results showed that she had a heart attack. She is now in the hospital receiving treatment.",
                questions: [
                    {
                        question: "What is Mrs. Johnson's main complaint?",
                        options: ["High blood pressure", "Chest pain", "Diabetes", "Heart attack"],
                        correct: 1
                    }
                ]
            }
        ],
        B1: [
            {
                title: "Clinical Case Study",
                text: "A 32-year-old male patient presented to the emergency department with acute onset of severe abdominal pain. Physical examination revealed tenderness in the right lower quadrant. Laboratory results showed elevated white blood cell count. Based on clinical findings and imaging studies, the patient was diagnosed with acute appendicitis and underwent emergency appendectomy.",
                questions: [
                    {
                        question: "What procedure did the patient undergo?",
                        options: ["Blood test", "Physical examination", "Appendectomy", "Imaging study"],
                        correct: 2
                    }
                ]
            }
        ],
        B2: [
            {
                title: "Research Abstract",
                text: "Background: Antibiotic resistance represents a growing threat to global health. This study aimed to evaluate the effectiveness of a new antimicrobial stewardship program in reducing inappropriate antibiotic prescribing. Methods: A retrospective cohort study was conducted over 12 months. Results: The intervention resulted in a 35% reduction in inappropriate prescriptions. Conclusion: Antimicrobial stewardship programs can significantly improve prescribing practices.",
                questions: [
                    {
                        question: "What was the main outcome of the study?",
                        options: ["Increased resistance", "35% reduction in inappropriate prescriptions", "No significant change", "Improved patient outcomes"],
                        correct: 1
                    }
                ]
            }
        ],
        C1: [
            {
                title: "Advanced Research Paper",
                text: "The implementation of precision medicine approaches in oncology has revolutionized treatment paradigms. Genomic profiling of tumors enables clinicians to identify specific molecular alterations that can be targeted with tailored therapies. However, challenges remain in translating these advances into routine clinical practice, particularly in resource-limited settings where access to sophisticated diagnostic technologies may be constrained.",
                questions: [
                    {
                        question: "According to the text, what is a major challenge in precision medicine?",
                        options: ["Lack of molecular targets", "Translation to routine practice", "Patient resistance", "Regulatory barriers"],
                        correct: 1
                    }
                ]
            }
        ],
        C2: [
            {
                title: "Complex Medical Literature",
                text: "The paradigmatic shift towards value-based healthcare necessitates a fundamental reconceptualization of outcome metrics, transcending traditional volume-based indicators to encompass patient-reported outcome measures (PROMs) and patient-reported experience measures (PREMs). This transformation requires sophisticated analytical frameworks capable of integrating multidimensional data streams while accounting for the inherent heterogeneity in patient populations and care delivery contexts.",
                questions: [
                    {
                        question: "What does the text suggest about outcome metrics in value-based healthcare?",
                        options: ["They should focus on volume", "They need fundamental reconceptualization", "They are already adequate", "They should be simplified"],
                        correct: 1
                    }
                ]
            }
        ]
    },

    // Esercizi di Writing
    writing: {
        A2: [
            {
                prompt: "Write a simple patient history for a 30-year-old man with a broken arm.",
                requirements: ["Use past tense", "Include basic medical information", "50-75 words"],
                sampleAnswer: "The patient is a 30-year-old male who fell from his bicycle yesterday. He injured his right arm and came to the hospital. The doctor examined him and took X-rays. The X-rays showed a fracture in his arm. The doctor put a cast on his arm and gave him pain medication."
            }
        ],
        B1: [
            {
                prompt: "Write a discharge summary for a patient who was treated for pneumonia.",
                requirements: ["Include admission reason", "Treatment given", "Discharge instructions", "100-150 words"],
                sampleAnswer: "Patient was admitted with community-acquired pneumonia. Treatment included intravenous antibiotics and supportive care. Patient showed good response to treatment with resolution of fever and improvement in respiratory symptoms. Discharged home with oral antibiotics to complete 10-day course. Follow-up appointment scheduled in one week."
            }
        ],
        B2: [
            {
                prompt: "Write a research proposal abstract for a study on diabetes management.",
                requirements: ["Clear objective", "Methodology outline", "Expected outcomes", "150-200 words"],
                sampleAnswer: "Background: Diabetes management remains challenging despite available treatments. Objective: To evaluate the effectiveness of a mobile health intervention in improving glycemic control. Methods: Randomized controlled trial with 200 participants. Primary outcome: HbA1c reduction at 6 months. Expected results: Significant improvement in diabetes management through technology-enhanced care."
            }
        ],
        C1: [
            {
                prompt: "Write a critical analysis of current challenges in clinical trial design for rare diseases.",
                requirements: ["Academic tone", "Critical evaluation", "Evidence-based arguments", "250-300 words"],
                sampleAnswer: "Clinical trial design for rare diseases presents unique methodological challenges that require innovative approaches. Traditional randomized controlled trial designs often prove inadequate due to small patient populations, ethical considerations, and regulatory complexities. Alternative designs such as adaptive trials and real-world evidence studies offer promising solutions but require careful validation."
            }
        ],
        C2: [
            {
                prompt: "Compose a comprehensive review of the ethical implications of artificial intelligence in medical diagnosis.",
                requirements: ["Sophisticated analysis", "Multiple perspectives", "Nuanced argumentation", "400-500 words"],
                sampleAnswer: "The integration of artificial intelligence in medical diagnosis represents a paradigmatic shift that necessitates careful ethical consideration. While AI systems offer unprecedented diagnostic accuracy and efficiency, they simultaneously raise profound questions about accountability, transparency, and the fundamental nature of medical decision-making..."
            }
        ]
    },

    // Sistema di punteggio e progressione
    scoring: {
        grammar: { correct: 10, incorrect: -2 },
        vocabulary: { correct: 15, incorrect: -3 },
        reading: { correct: 20, incorrect: -5 },
        writing: { excellent: 50, good: 30, fair: 15, poor: 0 },
        listening: { correct: 25, incorrect: -5 }
    },

    // Achievements e badges
    achievements: [
        { id: 'first_lesson', name: 'Start Here', description: 'Complete your first lesson', points: 50, icon: '🚀' },
        { id: 'week_streak', name: 'Week Warrior', description: 'Study for 7 days in a row', points: 150, icon: '🔥' },
        { id: 'vocabulary_master', name: 'Vocab Master', description: 'Learn 50 new medical terms', points: 100, icon: '📚' },
        { id: 'microlearning_master', name: 'Micro-Learner', description: 'Complete 10 micro-sessions', points: 100, icon: '⚡' },
        { id: 'conversation_expert', name: 'Chat Expert', description: '50 messages with AI Doctor', points: 200, icon: '🤖' },
        { id: 'roleplay_champion', name: 'Roleplay Star', description: 'Complete 10 roleplay scenarios', points: 250, icon: '🎭' },
        { id: 'photo_analyst', name: 'Photo Analyst', description: 'Describe 25 medical images', points: 200, icon: '📸' },
        { id: 'premium_supporter', name: 'Premium Member', description: 'Upgrade to Pro', points: 500, icon: '💎' }
    ],

    // Suggerimenti personalizzati basati sul progresso
    adaptiveTips: {
        struggling_grammar: [
            "Focus on one grammar rule at a time",
            "Practice with medical examples daily",
            "Review basic structures before advancing"
        ],
        vocabulary_plateau: [
            "Use spaced repetition for better retention",
            "Create medical scenarios with new words",
            "Read medical journals for context"
        ],
        writing_improvement: [
            "Start with simple sentence structures",
            "Use medical writing templates",
            "Practice academic connectors"
        ]
    },

    // Contenuti specializzati per background medico
    medicalSpecialties: {
        "Clinical Research": {
            vocabulary: ["randomization", "blinding", "endpoint", "adverse event"],
            phrases: ["primary outcome measure", "statistical significance", "clinical relevance"],
            scenarios: ["protocol design", "data analysis", "regulatory submission"]
        },
        "Patient Care": {
            vocabulary: ["empathy", "bedside manner", "informed consent", "quality of life"],
            phrases: ["patient-centered care", "shared decision making", "therapeutic relationship"],
            scenarios: ["difficult conversations", "breaking bad news", "cultural sensitivity"]
        },
        "Academic Medicine": {
            vocabulary: ["peer review", "methodology", "hypothesis", "publication"],
            phrases: ["systematic review", "meta-analysis", "evidence-based medicine"],
            scenarios: ["conference presentation", "manuscript writing", "grant application"]
        }
    }
};

// Funzioni per la gestione dei dati
class MedEnglishApp {
    constructor() {
        this.currentUser = {
            level: 'A2',
            progress: 0,
            streak: 0,
            totalPoints: 0,
            achievements: [],
            weakAreas: [],
            strengths: [],
            // Enhanced tracking
            microlearning_sessions: 0,
            ai_conversations: 0,
            roleplay_scenarios_completed: 0,
            photo_descriptions: 0
        };
        this.loadUserData();
    }

    // Carica i dati dell'utente
    loadUserData() {
        const saved = localStorage.getItem('medEnglishUser');
        if (saved) {
            this.currentUser = { ...this.currentUser, ...JSON.parse(saved) };
        }
    }

    // Salva i dati dell'utente
    saveUserData() {
        localStorage.setItem('medEnglishUser', JSON.stringify(this.currentUser));
    }

    // Ottieni contenuto basato sul livello
    getContentForLevel(type, level = null) {
        const userLevel = level || this.currentUser.level;
        return MedEnglishDatabase[type][userLevel] || [];
    }

    // Calcola il punteggio
    calculateScore(type, isCorrect, timeSpent = null) {
        const baseScore = MedEnglishDatabase.scoring[type];
        let score = isCorrect ? baseScore.correct : baseScore.incorrect;
        
        // Bonus per velocità (se applicabile)
        if (timeSpent && timeSpent < 30 && isCorrect) {
            score += 5;
        }
        
        this.currentUser.totalPoints += score;
        this.saveUserData();
        return score;
    }

    // Verifica achievements
    checkAchievements() {
        const newAchievements = [];
        
        MedEnglishDatabase.achievements.forEach(achievement => {
            if (!this.currentUser.achievements.includes(achievement.id)) {
                let earned = false;
                
                switch(achievement.id) {
                    case 'first_lesson':
                        earned = this.currentUser.progress > 0;
                        break;
                    case 'week_streak':
                        earned = this.currentUser.streak >= 7;
                        break;
                    case 'vocabulary_master':
                        earned = this.currentUser.totalPoints >= 1500; // Approssimazione
                        break;
                    case 'microlearning_master':
                        earned = (this.currentUser.microlearning_sessions || 0) >= 10;
                        break;
                    case 'conversation_expert':
                        earned = (this.currentUser.ai_conversations || 0) >= 50;
                        break;
                    case 'roleplay_champion':
                        earned = (this.currentUser.roleplay_scenarios_completed || 0) >= 10;
                        break;
                    case 'photo_analyst':
                        earned = (this.currentUser.photo_descriptions || 0) >= 25;
                        break;
                    // Altri achievements...
                }
                
                if (earned) {
                    this.currentUser.achievements.push(achievement.id);
                    this.currentUser.totalPoints += achievement.points;
                    newAchievements.push(achievement);
                }
            }
        });
        
        if (newAchievements.length > 0) {
            this.saveUserData();
        }
        
        return newAchievements;
    }

    // Suggerimenti adattivi
    getAdaptiveTips() {
        // Analizza le performance dell'utente e suggerisce aree di miglioramento
        const tips = [];
        
        if (this.currentUser.weakAreas.includes('grammar')) {
            tips.push(...MedEnglishDatabase.adaptiveTips.struggling_grammar);
        }
        
        if (this.currentUser.weakAreas.includes('vocabulary')) {
            tips.push(...MedEnglishDatabase.adaptiveTips.vocabulary_plateau);
        }
        
        return tips;
    }

    // Progressione di livello
    checkLevelProgression() {
        const levels = Object.keys(MedEnglishDatabase.levels);
        const currentIndex = levels.indexOf(this.currentUser.level);
        const currentLevelData = MedEnglishDatabase.levels[this.currentUser.level];
        
        // Calcola se l'utente può avanzare al livello successivo
        const progressPercentage = (this.currentUser.progress / currentLevelData.totalLessons) * 100;
        const averageScore = this.calculateAverageScore();
        
        if (progressPercentage >= 80 && averageScore >= currentLevelData.requiredScore) {
            if (currentIndex < levels.length - 1) {
                return levels[currentIndex + 1];
            }
        }
        
        return null;
    }

    calculateAverageScore() {
        // Implementazione semplificata - in un'app reale, tracceresti i punteggi individuali
        return Math.min(90, 60 + (this.currentUser.totalPoints / 100));
    }
}

// Esporta per l'uso nell'app principale
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MedEnglishDatabase, MedEnglishApp };
}