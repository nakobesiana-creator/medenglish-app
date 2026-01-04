// ========== GENERAL ENGLISH DATA & GLOBAL VARIABLES ==========
// Database e variabili globali per il sistema A2→B2

// Variabili globali
window.currentGeneralLevel = localStorage.getItem('currentGeneralLevel') || 'A2';
window.generalLevelProgress = JSON.parse(localStorage.getItem('generalLevelProgress')) || {
    A2: 0, B1: 0, B2: 0
};
window.generalTopicProgress = JSON.parse(localStorage.getItem('generalTopicProgress')) || {};
window.currentGeneralTopic = null;
window.currentGeneralQuestionIndex = 0;
window.MEDICAL_ACCESS_THRESHOLD = 80;

// Database General English Completo (A2→B2)
window.GeneralEnglishDatabase = {
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
                        options: ["arrived", "arrive", "arriving", "arrives"],
                        correct: 0,
                        explanation: "Third conditional with inversion: Had + subject + past participle."
                    },
                    {
                        question: "Complete: 'It is essential that the patient _____ the medication.'",
                        options: ["takes", "take", "took", "will take"],
                        correct: 1,
                        explanation: "Subjunctive mood: base form of verb after expressions of necessity."
                    },
                    {
                        question: "Choose the correct form: 'I wish I _____ more about this condition.'",
                        options: ["know", "knew", "have known", "will know"],
                        correct: 1,
                        explanation: "'I wish' + past simple expresses a present unreal situation."
                    },
                    {
                        question: "Complete: 'The research, _____ was published last year, changed medical practice.'",
                        options: ["that", "which", "who", "what"],
                        correct: 1,
                        explanation: "'Which' is used in non-defining relative clauses with commas."
                    },
                    {
                        question: "Choose the correct form: 'Not only _____ the treatment effective, but it was also affordable.'",
                        options: ["was", "is", "were", "has been"],
                        correct: 0,
                        explanation: "Inversion after 'not only': auxiliary verb comes before subject."
                    }
                ]
            },
            'academic-writing': {
                title: 'Academic Writing',
                questions: [
                    {
                        question: "Which connector shows contrast in academic writing?",
                        options: ["Furthermore", "However", "Moreover", "Additionally"],
                        correct: 1,
                        explanation: "'However' introduces a contrasting idea in formal writing."
                    },
                    {
                        question: "How do you introduce evidence in academic writing?",
                        options: ["I think", "According to", "Maybe", "In my opinion"],
                        correct: 1,
                        explanation: "'According to' formally introduces evidence from sources."
                    },
                    {
                        question: "Which phrase emphasizes a point?",
                        options: ["It is worth noting that", "Maybe", "I guess", "Perhaps"],
                        correct: 0,
                        explanation: "'It is worth noting that' formally emphasizes important information."
                    },
                    {
                        question: "How do you conclude an academic argument?",
                        options: ["So", "In conclusion", "Anyway", "Finally"],
                        correct: 1,
                        explanation: "'In conclusion' formally signals the end of an argument."
                    },
                    {
                        question: "Which connector shows cause and effect?",
                        options: ["However", "Consequently", "Although", "Despite"],
                        correct: 1,
                        explanation: "'Consequently' shows that something is a result of something else."
                    }
                ]
            },
            'complex-communication': {
                title: 'Complex Communication',
                questions: [
                    {
                        question: "How do you express a nuanced opinion professionally?",
                        options: ["I think", "While I appreciate your perspective, I would argue that", "You're wrong", "Maybe"],
                        correct: 1,
                        explanation: "This phrase acknowledges others while presenting your view diplomatically."
                    },
                    {
                        question: "How do you handle a difficult conversation?",
                        options: ["This is wrong", "I understand this is challenging, however", "No way", "Forget it"],
                        correct: 1,
                        explanation: "Acknowledging difficulty while moving forward shows emotional intelligence."
                    },
                    {
                        question: "How do you present complex information clearly?",
                        options: ["It's complicated", "To break this down into key components", "I don't know", "Whatever"],
                        correct: 1,
                        explanation: "Structuring information helps audience understand complex topics."
                    },
                    {
                        question: "How do you negotiate professionally?",
                        options: ["Take it or leave it", "I propose we find a middle ground", "My way only", "Do what I say"],
                        correct: 1,
                        explanation: "Collaborative language facilitates successful negotiation."
                    },
                    {
                        question: "How do you give constructive feedback?",
                        options: ["That's terrible", "I appreciate your effort, and I suggest", "You failed", "Bad job"],
                        correct: 1,
                        explanation: "Positive framing with specific suggestions is constructive."
                    }
                ]
            }
        }
    }
};

console.log('General English Data loaded successfully');
