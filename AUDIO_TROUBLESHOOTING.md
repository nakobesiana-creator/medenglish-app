# 🔊 Guida Risoluzione Problemi Audio - MedEnglish Pro

## 🚨 Problema: "NON SENTO L'AUDIO"

### ✅ Soluzioni Immediate

#### 1. **Controlli Base**
- 🔊 **Volume Browser**: Controlla che il browser non sia mutato
- 🔊 **Volume Sistema**: Verifica il volume generale del computer
- 🔊 **Cuffie/Altoparlanti**: Assicurati che siano collegati e funzionanti

#### 2. **Test Audio Integrato**
1. Clicca su **"🎵 Test Audio"** nella sidebar destra
2. Se senti "Hello, this is a test...", l'audio funziona!
3. Se non senti nulla, segui i passaggi successivi

#### 3. **Browser Consigliati** (in ordine di compatibilità)
- ✅ **Google Chrome** (migliore compatibilità)
- ✅ **Mozilla Firefox** (buona compatibilità)
- ✅ **Safari** (solo su Mac)
- ⚠️ **Microsoft Edge** (compatibilità limitata)
- ❌ **Internet Explorer** (non supportato)

#### 4. **Interazione Utente Richiesta**
Molti browser richiedono che l'utente interagisca con la pagina prima di riprodurre audio:
1. **Clicca prima** su qualsiasi pulsante della pagina
2. **Poi prova** il pulsante "🔊 Pronuncia"
3. Questo "sblocca" l'audio nel browser

### 🔧 Soluzioni Avanzate

#### 1. **Ricarica la Pagina**
- Premi **F5** o **Ctrl+R** (Windows) / **Cmd+R** (Mac)
- Riprova l'audio dopo il ricaricamento

#### 2. **Controlla Impostazioni Browser**

**Chrome:**
1. Clicca sull'icona 🔒 o ℹ️ nella barra degli indirizzi
2. Assicurati che "Suono" sia impostato su "Consenti"
3. Ricarica la pagina

**Firefox:**
1. Clicca sull'icona 🔒 nella barra degli indirizzi
2. Verifica che le autorizzazioni audio siano abilitate
3. Ricarica la pagina

#### 3. **Modalità Incognito/Privata**
- Prova ad aprire la pagina in modalità incognito
- Questo esclude problemi con estensioni o cache

#### 4. **Disabilita Estensioni**
- Disabilita temporaneamente ad-blocker e altre estensioni
- Alcune estensioni possono bloccare l'audio

### 🛠️ Strumenti di Diagnostica Integrati

#### 1. **Impostazioni Voce**
- Clicca su **"⚙️ Impostazioni Voce"** nella sidebar
- Visualizza tutte le voci disponibili
- Testa voci specifiche

#### 2. **Console Browser** (per utenti avanzati)
1. Premi **F12** per aprire Developer Tools
2. Vai alla tab **Console**
3. Cerca messaggi di errore relativi all'audio
4. Condividi questi messaggi per supporto avanzato

### 📱 Dispositivi Mobili

#### iOS (iPhone/iPad)
- L'audio potrebbe non funzionare in modalità silenziosa
- Attiva il suono usando il pulsante laterale
- Prova con Safari (browser consigliato su iOS)

#### Android
- Usa Chrome o Firefox
- Controlla le impostazioni audio del browser
- Alcuni browser Android hanno limitazioni audio

### 🔄 Fallback: Pronuncia Fonetica

Se l'audio proprio non funziona, l'app mostra automaticamente:
- **Trascrizione fonetica** (es: /ˌfɑːrməkoʊˈvɪdʒɪləns/)
- **Popup con pronuncia** scritta
- **Suggerimenti alternativi**

### 🆘 Supporto Aggiuntivo

#### Test Esterni
Prova questi siti per verificare se l'audio funziona in generale:
- [Google Translate](https://translate.google.com) (ha pronuncia audio)
- [Forvo](https://forvo.com) (dizionario pronuncia)
- YouTube (qualsiasi video)

#### Segnalazione Problemi
Se nessuna soluzione funziona:
1. **Browser utilizzato**: Chrome/Firefox/Safari/Edge + versione
2. **Sistema operativo**: Windows/Mac/Linux + versione
3. **Dispositivo**: Desktop/Mobile/Tablet
4. **Messaggio di errore**: Se presente nella console
5. **Test esterni**: Funziona su Google Translate?

### 💡 Suggerimenti Preventivi

#### Per Sviluppatori
- Usa sempre `speechSynthesis.cancel()` prima di nuove sintesi vocali
- Implementa gestione errori con `utterance.onerror`
- Fornisci sempre fallback fonetici
- Testa su più browser e dispositivi

#### Per Utenti
- **Usa Chrome** per la migliore esperienza
- **Interagisci** con la pagina prima di usare l'audio
- **Mantieni aggiornato** il browser
- **Controlla periodicamente** le impostazioni audio

---

## 🎯 Riassunto Veloce

1. **🔊 Controlla volume** browser e sistema
2. **🎵 Clicca "Test Audio"** nella sidebar
3. **🌐 Usa Chrome** se possibile
4. **👆 Clicca prima** su qualsiasi pulsante
5. **🔄 Ricarica** la pagina se necessario
6. **⚙️ Controlla impostazioni** browser per audio
7. **📱 Su mobile** usa Safari (iOS) o Chrome (Android)

**Se tutto fallisce**: L'app mostrerà automaticamente la pronuncia fonetica! 📝

---

*Sviluppato per MedEnglish Pro - Sistema di apprendimento inglese medico con audio avanzato* 🎓