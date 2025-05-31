import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit {
  
  messages: ChatMessage[] = [];
  currentMessage: string = '';
  isTyping: boolean = false;
  
  quickSuggestions: string[] = [
    'How to file a complaint?',
    'Request barangay clearance',
    'ID requirements',
    'Office hours'
  ];

  private knowledgeBase = {
    'complaint': {
      keywords: ['complaint', 'file complaint', 'report', 'problem'],
      response: `<strong>How to File a Complaint:</strong><br>
      1. Visit the barangay office or use our online form<br>
      2. Provide details about the incident<br>
      3. Submit supporting documents if available<br>
      4. Get your complaint reference number<br>
      5. Track status through BarangayNav<br><br>
      <em>Response time: 3-5 business days</em>`
    },
    'clearance': {
      keywords: ['clearance', 'barangay clearance', 'certificate'],
      response: `<strong>Barangay Clearance Requirements:</strong><br>
      📋 Required Documents:<br>
      • Valid ID (original + photocopy)<br>
      • Proof of residency<br>
      • 2x2 ID photos (2 pieces)<br>
      • Certificate of Employment (if employed)<br><br>
      💰 Fee: ₱50.00<br>
      ⏱️ Processing: 1-2 business days<br>
      📍 Claim at: Barangay Office, 2nd Floor`
    },
    'id': {
      keywords: ['id', 'barangay id', 'identification'],
      response: `<strong>Barangay ID Requirements:</strong><br>
      📋 Required:<br>
      • Birth Certificate (original + photocopy)<br>
      • Proof of residency (6 months)<br>
      • 1x1 ID photos (4 pieces)<br>
      • Filled application form<br><br>
      💰 Fee: ₱30.00<br>
      ⏱️ Processing: 5-7 business days<br>
      📱 SMS notification when ready`
    },
    'hours': {
      keywords: ['hours', 'office hours', 'schedule', 'open'],
      response: `<strong>Barangay Office Hours:</strong><br>
      📅 Monday - Friday: 8:00 AM - 5:00 PM<br>
      📅 Saturday: 8:00 AM - 12:00 PM<br>
      📅 Sunday: Closed<br><br>
      🚨 Emergency services: 24/7<br>
      📞 Hotline: +63 912 345 6789<br>
      📧 Email: barangaysanantonio@email.com`
    }
  };

  ngOnInit(): void {
    // Welcome message
    this.addBotMessage(`Hello! I'm your AI assistant for Barangay services. I can help you with:
    <br>• Filing complaints and reports
    <br>• Service requirements and fees  
    <br>• Office hours and contact info
    <br>• Step-by-step procedures
    <br><br>What would you like to know?`);
  }

  sendUserMessage(): void {
    if (!this.currentMessage.trim()) return;
    
    const userMessage = this.currentMessage.trim();
    this.addUserMessage(userMessage);
    this.currentMessage = '';
    
    // Simulate typing delay
    this.isTyping = true;
    setTimeout(() => {
      this.generateBotResponse(userMessage);
      this.isTyping = false;
    }, 1500);
  }

  sendMessage(message: string): void {
    this.currentMessage = message;
    this.sendUserMessage();
  }

  private addUserMessage(text: string): void {
    this.messages.push({
      text,
      sender: 'user',
      timestamp: new Date()
    });
    this.scrollToBottom();
  }

  private addBotMessage(text: string): void {
    this.messages.push({
      text,
      sender: 'bot',
      timestamp: new Date()
    });
    this.scrollToBottom();
  }

  private generateBotResponse(userMessage: string): void {
    const lowerMessage = userMessage.toLowerCase();
    let response = '';

    // Check knowledge base
    for (const [key, value] of Object.entries(this.knowledgeBase)) {
      if (value.keywords.some(keyword => lowerMessage.includes(keyword))) {
        response = value.response;
        break;
      }
    }

    // Default responses for common patterns
    if (!response) {
      if (lowerMessage.includes('help')) {
        response = `I'm here to help! You can ask me about:
        <br>• <strong>Service requirements</strong> - "What do I need for clearance?"
        <br>• <strong>Procedures</strong> - "How to file a complaint?"
        <br>• <strong>Fees and processing time</strong> - "How much is barangay ID?"
        <br>• <strong>Contact information</strong> - "What are the office hours?"`;
      } else if (lowerMessage.includes('thank')) {
        response = `You're welcome! Is there anything else I can help you with regarding barangay services?`;
      } else {
        response = `I understand you're asking about "${userMessage}". While I don't have specific information about that, you can:
        <br>• Contact the barangay office at +63 912 345 6789
        <br>• Visit during office hours (Mon-Fri 8AM-5PM)
        <br>• Try asking about specific services like clearance, ID, or complaints
        <br><br>Is there something specific I can help you with?`;
      }
    }

    this.addBotMessage(response);
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const chatContainer = document.querySelector('.chat-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  }
}
