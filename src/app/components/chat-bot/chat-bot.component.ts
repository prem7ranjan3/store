import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent {
  isOpen = false;
  userMessage = '';
  messages: ChatMessage[] = [];

  constructor() {
    // Add welcome message when component is initialized
    this.messages.push({
      text: 'Welcome to Elegance Fine Jewelry! How can I assist you today?',
      isUser: false,
      timestamp: new Date()
    });
    
    // Add quick suggestions
    this.messages.push({
      text: 'You can ask me about:\n• Our Collections\n• Shipping & Delivery\n• Returns & Refunds\n• Jewelry Care',
      isUser: false,
      timestamp: new Date()
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({
        text: this.userMessage,
        isUser: true,
        timestamp: new Date()
      });

      // Simulate bot response
      setTimeout(() => {
        this.messages.push({
          text: this.getBotResponse(this.userMessage),
          isUser: false,
          timestamp: new Date()
        });
      }, 1000);

      this.userMessage = '';
    }
  }

  private getBotResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Enhanced responses
    if (lowerMessage.includes('collection') || lowerMessage.includes('jewelry')) {
      return 'We have stunning collections of necklaces, rings, and earrings. Each piece is crafted with the finest materials. Would you like to see our latest collection?';
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return 'Our jewelry pieces range from $100 to $10,000+. Can I help you find something in a specific price range?';
    } else if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
      return 'We offer:\n• Free shipping on orders over $100\n• Standard shipping (3-5 business days)\n• Express shipping (1-2 business days)\n\nWould you like to know more about our shipping options?';
    } else if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
      return 'We offer a 30-day return policy on all items in their original condition. Your satisfaction is our priority! Would you like to know more about our return process?';
    } else if (lowerMessage.includes('care') || lowerMessage.includes('clean')) {
      return 'To keep your jewelry looking its best:\n• Store pieces separately\n• Clean regularly with a soft cloth\n• Avoid exposure to chemicals\n\nWould you like detailed care instructions for a specific type of jewelry?';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! I\'m here to help you find the perfect jewelry piece. What are you looking for today?';
    } else {
      return 'I\'m here to help! Feel free to ask about our collections, shipping, returns, or jewelry care. How can I assist you?';
    }
  }
}
