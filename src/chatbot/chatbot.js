// Floating Chatbot with Gemini AI Integration - Philippine Barangay Focus
// Import API key from config
import { GEMINI_API_KEY } from '../js/config.js';

class BarangayNavChatbot {
    constructor() {
        console.log('🤖 Initializing BarangayNav Chatbot from chatbot.js...');
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        this.GEMINI_API_KEY = GEMINI_API_KEY;
        this.GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.GEMINI_API_KEY}`;
        
        console.log('🔑 Using Gemini API from config.js in chatbot.js');
        
        // Wait for DOM to be loaded before initializing
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('⚙️ Setting up chatbot from chatbot.js...');
        this.initializeChatbot();
        this.setupEventListeners();
        this.loadKnowledgeBase();
    }

    initializeChatbot() {
        // Add welcome message in Tagalog
        this.addMessage('bot', 'Kumusta! Ako ang inyong AI assistant para sa BarangayNav services powered by **Gemini AI**! 🤖\n\nMakakatulong ako sa inyo sa:\n• Pag-file ng mga reklamo at ulat\n• Requirements at bayad sa mga serbisyo\n• Oras ng opisina at mga pamamaraan\n• Status ng mga dokumento\n\nPaano ko kayo matutulungan ngayong araw?');
        
        // Initialize UI
        this.updateChatDisplay();
    }

    setupEventListeners() {
        const toggle = document.getElementById('chatbotToggle');
        const sendBtn = document.getElementById('sendMessage');
        const messageInput = document.getElementById('messageInput');

        if (toggle) {
            toggle.addEventListener('click', () => this.toggleChatbot());
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });

            // Auto-resize input
            messageInput.addEventListener('input', () => {
                this.autoResizeInput(messageInput);
            });
        }

        // Close chatbot when clicking outside
        document.addEventListener('click', (e) => {
            const chatbotWindow = document.getElementById('chatbotWindow');
            const chatbotToggle = document.getElementById('chatbotToggle');
            
            if (this.isOpen && chatbotWindow && !chatbotWindow.contains(e.target) && !chatbotToggle.contains(e.target)) {
                this.closeChatbot();
            }
        });
    }

    loadKnowledgeBase() {
        this.knowledgeBase = {
            greetings: [
                'hello', 'hi', 'hey', 'kumusta', 'musta', 'good morning', 'good afternoon', 'good evening', 'magandang umaga', 'magandang hapon', 'magandang gabi'
            ],
            services: {
                clearance: {
                    keywords: ['clearance', 'certificate', 'good moral', 'character', 'barangay clearance', 'sertipiko', 'patunay'],
                    response: `**Barangay Clearance Requirements:**\n\n📋 **Mga Kailangan na Dokumento:**\n• Valid Government ID (original + photocopy)\n• Patunay ng Paninirahan (6 buwan)\n• 2x2 ID Photos (2 piraso)\n• Certificate of Employment (kung may trabaho)\n• Cedula o Community Tax Certificate\n\n💰 **Bayad:** ₱50.00\n⏱️ **Processing Time:** 1-2 araw\n📍 **Kukunin sa:** Barangay Office, 2nd Floor\n📞 **Contact:** +63 912 345 6789\n\n📝 **Paalala:** Dalhin ang lahat ng original documents para sa verification.`
                },
                id: {
                    keywords: ['barangay id', 'identification', 'id card', 'resident id', 'barangay ID', 'pagkakakilanlan'],
                    response: `**Barangay ID Application:**\n\n🔑 **Mga Requirements:**\n• Birth Certificate (original + photocopy)\n• Patunay ng Paninirahan (minimum 6 buwan)\n• 1x1 ID Photos (4 piraso)\n• Accomplished Application Form\n• Consent ng magulang (kung minor)\n• Barangay Clearance\n\n💰 **Bayad:** ₱30.00\n⏱️ **Processing:** 5-7 araw\n📱 **Notification:** SMS kapag ready na\n🏢 **Office Hours:** Lunes-Biyernes 8AM-5PM, Sabado 8AM-12PM\n\n✨ **May validity ng 3 taon**`
                },
                complaint: {
                    keywords: ['complaint', 'report', 'reklamo', 'sumbong', 'problema', 'issue', 'file complaint'],
                    response: `**Paano Mag-file ng Reklamo:**\n\n📝 **Hakbang:**\n1. Pumunta sa barangay office o gamitin ang online portal\n2. Punan ang complaint form nang kumpleto\n3. Magbigay ng ebidensya kung meron\n4. Kunin ang complaint reference number\n5. I-track ang status sa BarangayNav system\n\n⏰ **Response Time:** 3-5 araw\n📞 **Hotline:** +63 912 345 6789\n🌐 **Online Portal:** Available 24/7\n📍 **Location:** Barangay Hall, Ground Floor\n\n🤝 **May mediation services din kami para sa mga disputes**`
                },
                indigency: {
                    keywords: ['indigency', 'indigent', 'financial assistance', 'tulong', 'sertipikong indigent', 'mahirap'],
                    response: `**Certificate of Indigency:**\n\n📋 **Mga Kailangan:**\n• Valid ID (original + photocopy)\n• Patunay ng Paninirahan\n• Medical Certificate (kung para sa medical assistance)\n• Sworn Affidavit of Income\n• Barangay ID (kung meron)\n• Endorsement ng Purok Leader\n\n💰 **Bayad:** LIBRE\n⏱️ **Processing:** 2-3 araw\n🎯 **Gamit:** Medical, Educational, Legal assistance\n📋 **Note:** May verification at home visit\n\n💡 **Para sa mga nangangailangan ng tulong pinansyal**`
                },
                business: {
                    keywords: ['business permit', 'business clearance', 'permit', 'negosyo', 'sari-sari', 'tindahan'],
                    response: `**Business Permit/Clearance:**\n\n📋 **Mga Requirements:**\n• Business Registration mula sa DTI/SEC\n• Valid ID ng May-ari\n• Barangay Clearance\n• Location Sketch/Map\n• Lease Contract (kung rented)\n• Fire Safety Inspection Certificate\n\n💰 **Bayad:** ₱150.00 - ₱500.00 (depende sa uri ng negosyo)\n⏱️ **Processing:** 3-5 araw\n📍 **Valid for:** 1 taon\n🔄 **Renewal:** Bawat taon\n\n🏪 **Para sa lahat ng uri ng negosyo sa barangay**`
                },
                cedula: {
                    keywords: ['cedula', 'community tax', 'community tax certificate', 'ctc'],
                    response: `**Community Tax Certificate (Cedula):**\n\n📋 **Mga Kailangan:**\n• Valid Government ID\n• Accomplished CTC Form\n• Proof of Income (kung employed)\n• Barangay Clearance\n\n💰 **Bayad:** ₱5.00 - ₱500.00 (depende sa kita)\n⏱️ **Processing:** Same day\n📍 **Kukunin:** Barangay Treasury Office\n\n📅 **Valid:** Hanggang December 31 ng taon\n📝 **Kailangan para sa ibang mga dokumento**`
                }
            },
            office: {
                keywords: ['hours', 'schedule', 'open', 'closed', 'time', 'when', 'oras', 'bukas', 'sarado', 'kailan'],
                response: `**Barangay Office Information:**\n\n🕒 **Regular na Oras:**\n• Lunes - Biyernes: 8:00 AM - 5:00 PM\n• Sabado: 8:00 AM - 12:00 PM\n• Linggo: SARADO\n\n🚨 **Emergency Services:** Available 24/7\n📞 **Emergency Hotline:** +63 912 345 6789\n📧 **Email:** barangaysanantonio@gmail.com\n📍 **Address:** Barangay San Antonio Hall, Main Street\n🚌 **Landmark:** Tapat ng palengke\n\n🎯 **Pinakamabuting oras:** 9:00 AM - 11:00 AM (hindi masyadong maraming tao)`
            },
            fees: {
                keywords: ['bayad', 'fee', 'presyo', 'magkano', 'how much', 'cost'],
                response: `**Mga Bayad sa Serbisyo:**\n\n💰 **Regular Services:**\n• Barangay Clearance: ₱50.00\n• Barangay ID: ₱30.00\n• Certificate of Indigency: LIBRE\n• Business Clearance: ₱150.00 - ₱500.00\n• Cedula: ₱5.00 - ₱500.00\n• Residency Certificate: ₱25.00\n\n📋 **Special Services:**\n• Permit to Construct: ₱200.00\n• Barangay Franchise: ₱300.00\n• Complaint Filing: LIBRE\n\n💡 **Senior Citizens at PWD may discount!**`
            }
        };
    }

    toggleChatbot() {
        if (this.isOpen) {
            this.closeChatbot();
        } else {
            this.openChatbot();
        }
    }

    openChatbot() {
        this.isOpen = true;
        const window = document.getElementById('chatbotWindow');
        const toggle = document.getElementById('chatbotToggle');
        
        if (window) {
            window.classList.add('show');
            window.style.animation = 'slideInUp 0.3s ease-out';
        }
        
        if (toggle) {
            toggle.innerHTML = '<i class="fas fa-times"></i>';
            toggle.style.transform = 'rotate(180deg)';
        }

        // Focus on input
        setTimeout(() => {
            const input = document.getElementById('messageInput');
            if (input) input.focus();
        }, 300);
    }

    closeChatbot() {
        this.isOpen = false;
        const window = document.getElementById('chatbotWindow');
        const toggle = document.getElementById('chatbotToggle');
        
        if (window) {
            window.style.animation = 'slideOutDown 0.3s ease-in';
            setTimeout(() => {
                window.classList.remove('show');
            }, 300);
        }
        
        if (toggle) {
            toggle.innerHTML = '<i class="fas fa-comment"></i>';
            toggle.style.transform = 'rotate(0deg)';
        }
    }

    async sendMessage() {
        const input = document.getElementById('messageInput');
        const message = input?.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addMessage('user', message);
        input.value = '';
        this.updateChatDisplay();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Check local knowledge base first
            const localResponse = this.checkKnowledgeBase(message);
            
            if (localResponse) {
                // Simulate AI thinking time
                await this.delay(1000 + Math.random() * 1000);
                this.hideTypingIndicator();
                this.addMessage('bot', localResponse);
            } else {
                // Use Gemini AI for complex queries
                const aiResponse = await this.queryGeminiAI(message);
                this.hideTypingIndicator();
                this.addMessage('bot', aiResponse);
            }
        } catch (error) {
            console.error('Chatbot error:', error);
            this.hideTypingIndicator();
            this.addMessage('bot', 'Pasensya na, may technical problem kami ngayon. Subukan ulit mamaya o tawagan ang aming opisina sa +63 912 345 6789.');
        }
        
        this.updateChatDisplay();
    }

    checkKnowledgeBase(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check greetings
        if (this.knowledgeBase.greetings.some(greeting => lowerMessage.includes(greeting))) {
            return `Kumusta! Maligayang pagdating sa BarangayNav! 👋\n\nAndito ako para tulungan kayo sa lahat ng barangay services. Pwede ninyong tanungin ako tungkol sa:\n\n🏛️ **Mga Serbisyo:** Clearance, ID, Business Permits\n📋 **Requirements:** Mga dokumento at bayad\n⏰ **Processing:** Mga oras at pamamaraan\n📞 **Contact:** Office hours at location\n\nAno ang gusto ninyong malaman?`;
        }
        
        // Check office hours
        if (this.knowledgeBase.office.keywords.some(keyword => lowerMessage.includes(keyword))) {
            return this.knowledgeBase.office.response;
        }
        
        // Check fees
        if (this.knowledgeBase.fees.keywords.some(keyword => lowerMessage.includes(keyword))) {
            return this.knowledgeBase.fees.response;
        }
        
        // Check services
        for (const [serviceName, serviceData] of Object.entries(this.knowledgeBase.services)) {
            if (serviceData.keywords.some(keyword => lowerMessage.includes(keyword))) {
                return serviceData.response;
            }
        }
        
        // Check for help
        if (lowerMessage.includes('help') || lowerMessage.includes('tulong') || lowerMessage.includes('assist')) {
            return `Nandito ako para tumulong! Narito ang mga madalas na tanong:\n\n💡 **Popular na Tanong:**\n• "Paano kumuha ng barangay clearance?"\n• "Ano ang requirements para sa barangay ID?"\n• "Paano mag-file ng reklamo?"\n• "Ano ang office hours ninyo?"\n• "Magkano ang bayad sa business permit?"\n• "Saan pwedeng kumuha ng cedula?"\n\n🎯 I-type lang ang inyong tanong at tutulungan ko kayo!`;
        }
        
        // Check for thanks
        if (lowerMessage.includes('thank') || lowerMessage.includes('salamat') || lowerMessage.includes('maraming salamat')) {
            return `Walang anuman! Natutuwa akong nakatulong! 😊\n\nMay iba pa bang pwedeng tulungan ko tungkol sa barangay services? Nandito ako 24/7 para sa inyo!\n\n🌟 Huwag kalimutang i-rate ang inyong experience at i-share ang BarangayNav sa iba para sa transparent na governance.`;
        }
        
        return null; // No local match found, use AI
    }

    async queryGeminiAI(message) {
        const prompt = `Ikaw ay isang helpful AI assistant para sa BarangayNav, isang digital platform para sa transparent barangay services sa Pilipinas. 

Context: Tumutulong ka sa mga mamamayan sa barangay services tulad ng clearances, IDs, complaints, business permits, at general government procedures. Laging maging professional, helpful, at mag-promote ng transparency at good governance. Sagutan mo in Tagalog and English mix (Taglish) na natural sa mga Pilipino.

User question: ${message}

Please provide a helpful, accurate response about barangay services. Kung hindi mo alam ang specific information, i-direct mo sila na makipag-ugnayan sa barangay office. Keep responses concise but informative. Gamitin ang Filipino context at maging culturally appropriate.`;

        try {
            const response = await fetch(this.GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Invalid response format from Gemini AI');
            }
        } catch (error) {
            console.error('Gemini AI API error:', error);
            return `Naiintindihan ko ang inyong tanong tungkol sa "${message}". Bagamat wala akong specific information tungkol dyan ngayon, narito ang mga pwede ninyong gawin:\n\n📞 **Contact Information:**\n• Barangay Office: +63 912 345 6789\n• Office Hours: Lunes-Biyernes 8AM-5PM\n• Emergency: Available 24/7\n\n🌐 **Online Services:**\n• Bisitahin ang aming BarangayNav portal\n• I-track ang inyong service requests\n• Access sa transparency reports\n\nMay iba pa bang pwedeng tulungan ko?`;
        }
    }

    addMessage(sender, text) {
        this.messages.push({
            sender,
            text,
            timestamp: new Date()
        });
    }

    showTypingIndicator() {
        this.isTyping = true;
        const messagesContainer = document.getElementById('chatbotMessages');
        if (messagesContainer) {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.id = 'typingIndicator';
            typingDiv.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
            messagesContainer.appendChild(typingDiv);
            this.scrollToBottom();
        }
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    updateChatDisplay() {
        const container = document.getElementById('chatbotMessages');
        if (!container) return;

        // Clear existing messages (except typing indicator)
        const existingMessages = container.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Add all messages
        this.messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.sender}`;
            
            // Convert markdown-style formatting to HTML
            let formattedText = msg.text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br>');
            
            messageDiv.innerHTML = formattedText;
            container.appendChild(messageDiv);
        });

        this.scrollToBottom();
    }

    scrollToBottom() {
        const container = document.getElementById('chatbotMessages');
        if (container) {
            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
            }, 100);
        }
    }

    autoResizeInput(input) {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 100) + 'px';
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize chatbot when DOM is loaded - only if not already initialized
document.addEventListener('DOMContentLoaded', () => {
    // Check if chatbot is already initialized from index.html
    if (!window.barangayNavChatbot) {
        console.log('🚀 Initializing chatbot from chatbot.js...');
        // Small delay to ensure all elements are loaded
        setTimeout(() => {
            window.barangayNavChatbot = new BarangayNavChatbot();
            
            // Add pulse animation to toggle button
            const toggle = document.getElementById('chatbotToggle');
            if (toggle) {
                setTimeout(() => {
                    toggle.style.animation = 'pulse 2s infinite';
                }, 2000);
            }
        }, 1000);
    } else {
        console.log('ℹ️ Chatbot already initialized from index.html');
    }
});

// Export for use in other modules
export default BarangayNavChatbot;
