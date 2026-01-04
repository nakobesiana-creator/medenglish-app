// Enhanced Features per MedEnglish Pro
// Ispirato a TalkPal e Wiser per microlearning e conversazioni AI

const EnhancedMedEnglishFeatures = {
    // Microlearning Sessions (Ispirato a Wiser)
    microlearningModules: {
        A2: [
            {
                title: "Medical Greetings",
                duration: 5,
                content: [
                    {
                        type: "vocabulary",
                        term: "How are you feeling today?",
                        translation: "Come ti senti oggi?",
                        audio: true
                    },
                    {
                        type: "quick-quiz",
                        question: "What's the best way to greet a patient?",
                        options: ["Hey!", "Good morning, how are you feeling?", "What's wrong?"],
                        correct: 1
                    }
                ]
            },
            {
                title: "Body Parts Basics",
                duration: 5,
                content: [
                    {
                        type: "vocabulary-flash",
                        terms: ["head", "chest", "abdomen", "arm", "leg"],
                        images: true
                    },
                    {
                        type: "matching",
                        pairs: [["head", "testa"], ["chest", "torace"], ["arm", "braccio"]]
                    }
                ]
            }
        ],
        B1: [
            {
                title: "Symptoms Description",
                duration: 5,
                content: [
                    {
                        type: "scenario",
                        situation: "Patient describes pain",
                        dialogue: [
                            "Patient: I have a sharp pain in my chest",
                            "Doctor: When did it start?",
                            "Patient: About 2 hours ago"
                        ]
                    }
                ]
            }
        ]
    },

    // AI Conversation Templates (Ispirato a TalkPal)
    conversationTemplates: {
        "patient-consultation": {
            scenarios: [
                {
                    title: "Initial Assessment",
                    context: "New patient visit",
                    aiPersonality: "concerned-patient",
                    startingMessage: "Doctor, I've been having some health issues and I'm really worried.",
                    expectedTopics: ["symptoms", "duration", "severity", "medical history"],
                    vocabularyFocus: ["assessment", "symptoms", "examination", "diagnosis"],
                    grammarFocus: ["present perfect", "question formation", "medical imperatives"]
                },
                {
                    title: "Follow-up Visit",
                    context: "Patient returning for results",
                    aiPersonality: "anxious-patient",
                    startingMessage: "Doctor, I'm here for my test results. I've been so nervous.",
                    expectedTopics: ["test results", "treatment plan", "prognosis", "next steps"],
                    vocabularyFocus: ["results", "treatment", "medication", "recovery"],
                    grammarFocus: ["future tense", "conditionals", "medical advice"]
                }
            ]
        },
        "colleague-discussion": {
            scenarios: [
                {
                    title: "Case Consultation",
                    context: "Discussing difficult case",
                    aiPersonality: "experienced-colleague",
                    startingMessage: "I'd like to get your opinion on this complex case I'm managing.",
                    expectedTopics: ["differential diagnosis", "treatment options", "evidence", "guidelines"],
                    vocabularyFocus: ["differential", "etiology", "pathophysiology", "therapeutic"],
                    grammarFocus: ["subjunctive", "complex conditionals", "academic discourse"]
                }
            ]
        },
        "research-presentation": {
            scenarios: [
                {
                    title: "Study Results",
                    context: "Presenting research findings",
                    aiPersonality: "critical-reviewer",
                    startingMessage: "Thank you for the presentation. I have some questions about your methodology.",
                    expectedTopics: ["methodology", "results", "limitations", "implications"],
                    vocabularyFocus: ["statistical", "significance", "correlation", "hypothesis"],
                    grammarFocus: ["passive voice", "academic structures", "data presentation"]
                }
            ]
        }
    },

    // Roleplay Scenarios Avanzati
    roleplayScenarios: {
        emergency: {
            title: "Emergency Department",
            difficulty: "intermediate",
            roles: ["emergency-doctor", "patient", "nurse"],
            situations: [
                {
                    name: "Chest Pain Assessment",
                    description: "45-year-old patient with acute chest pain",
                    objectives: [
                        "Conduct rapid assessment",
                        "Rule out life-threatening conditions", 
                        "Order appropriate tests",
                        "Communicate with patient and family"
                    ],
                    vocabulary: ["acute", "assessment", "ECG", "troponin", "differential"],
                    timeLimit: 10,
                    scoring: {
                        communication: 30,
                        medical_accuracy: 40,
                        efficiency: 30
                    }
                }
            ]
        },
        research: {
            title: "Clinical Research",
            difficulty: "advanced",
            roles: ["principal-investigator", "research-coordinator", "ethics-committee"],
            situations: [
                {
                    name: "Protocol Review",
                    description: "Presenting new clinical trial protocol",
                    objectives: [
                        "Explain study rationale",
                        "Justify methodology",
                        "Address ethical concerns",
                        "Discuss risk-benefit ratio"
                    ],
                    vocabulary: ["protocol", "endpoint", "randomization", "blinding", "ethics"],
                    timeLimit: 15,
                    scoring: {
                        scientific_rigor: 40,
                        communication: 30,
                        ethics_awareness: 30
                    }
                }
            ]
        }
    },

    // Photo Description Challenges
    photoDescriptionChallenges: {
        beginner: [
            {
                category: "Basic Anatomy",
                images: [
                    {
                        title: "Human Skeleton",
                        keywords: ["bones", "skeleton", "anatomy", "structure"],
                        difficulty: "A2",
                        expectedLength: 50,
                        hints: ["Name major bones", "Describe overall structure", "Use basic anatomical terms"]
                    }
                ]
            }
        ],
        intermediate: [
            {
                category: "Medical Imaging",
                images: [
                    {
                        title: "Chest X-Ray with Pneumonia",
                        keywords: ["consolidation", "infiltrate", "opacity", "lung fields"],
                        difficulty: "B2",
                        expectedLength: 100,
                        hints: ["Describe abnormal findings", "Use radiological terminology", "Suggest differential diagnosis"]
                    }
                ]
            }
        ],
        advanced: [
            {
                category: "Pathology",
                images: [
                    {
                        title: "Histological Section",
                        keywords: ["cellular", "morphology", "pathology", "diagnosis"],
                        difficulty: "C1",
                        expectedLength: 150,
                        hints: ["Describe cellular details", "Use pathological terminology", "Provide diagnostic impression"]
                    }
                ]
            }
        ]
    },

    // Gamification Elements
    achievements: [
        {
            id: "microlearning_master",
            name: "Micro Master",
            description: "Complete 10 microlearning sessions",
            icon: "⚡",
            points: 200,
            condition: "microlearning_sessions >= 10"
        },
        {
            id: "conversation_expert",
            name: "Conversation Expert", 
            description: "Have 50 AI conversations",
            icon: "💬",
            points: 500,
            condition: "ai_conversations >= 50"
        },
        {
            id: "roleplay_champion",
            name: "Roleplay Champion",
            description: "Complete all roleplay scenarios",
            icon: "🎭",
            points: 1000,
            condition: "roleplay_scenarios_completed >= 10"
        },
        {
            id: "photo_analyst",
            name: "Medical Image Analyst",
            description: "Analyze 25 medical images",
            icon: "📸",
            points: 300,
            condition: "photo_descriptions >= 25"
        }
    ],

    // Daily Challenges (Ispirato a Wiser)
    dailyChallenges: {
        monday: {
            type: "vocabulary_sprint",
            title: "Medical Monday",
            description: "Learn 10 new medical terms in 5 minutes",
            reward: 50
        },
        tuesday: {
            type: "conversation_challenge",
            title: "Talk Tuesday", 
            description: "Have a 5-minute AI conversation",
            reward: 75
        },
        wednesday: {
            type: "writing_challenge",
            title: "Writing Wednesday",
            description: "Write a 100-word case summary",
            reward: 100
        },
        thursday: {
            type: "listening_challenge",
            title: "Listening Thursday",
            description: "Complete 3 listening exercises",
            reward: 60
        },
        friday: {
            type: "roleplay_challenge",
            title: "Roleplay Friday",
            description: "Complete one roleplay scenario",
            reward: 125
        },
        saturday: {
            type: "photo_challenge",
            title: "Visual Saturday",
            description: "Describe 3 medical images",
            reward: 80
        },
        sunday: {
            type: "review_challenge",
            title: "Review Sunday",
            description: "Review the week's learning",
            reward: 40
        }
    },

    // Spaced Repetition System
    spacedRepetition: {
        intervals: [1, 3, 7, 14, 30, 90], // giorni
        calculateNextReview: function(difficulty, previousInterval) {
            const multipliers = {
                easy: 2.5,
                medium: 2.0,
                hard: 1.3,
                again: 0.5
            };
            return Math.round(previousInterval * multipliers[difficulty]);
        }
    },

    // Adaptive Learning Algorithm
    adaptiveLearning: {
        assessUserLevel: function(userResponses) {
            // Algoritmo semplificato per valutare il livello
            const accuracy = userResponses.correct / userResponses.total;
            const speed = userResponses.averageTime;
            
            if (accuracy > 0.9 && speed < 30) return "advance";
            if (accuracy < 0.6 || speed > 60) return "review";
            return "maintain";
        },
        
        recommendContent: function(userProfile) {
            const weakAreas = userProfile.weakAreas || [];
            const preferences = userProfile.preferences || {};
            
            // Logica per raccomandare contenuti personalizzati
            return {
                priority: weakAreas[0] || "vocabulary",
                format: preferences.format || "mixed",
                difficulty: userProfile.level || "A2"
            };
        }
    },

    // Voice Recognition Features
    voiceFeatures: {
        pronunciationTargets: {
            A2: ["basic medical terms", "patient greetings", "body parts"],
            B1: ["symptom descriptions", "medical procedures", "patient instructions"],
            B2: ["case presentations", "medical discussions", "research terminology"],
            C1: ["conference presentations", "academic discourse", "complex medical concepts"],
            C2: ["expert consultations", "research presentations", "peer review discussions"]
        },
        
        feedbackCriteria: {
            pronunciation: 40,
            fluency: 30,
            vocabulary: 20,
            grammar: 10
        }
    }
};

// Export per l'uso nell'app principale
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedMedEnglishFeatures;
}