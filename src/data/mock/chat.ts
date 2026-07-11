import type { ChatMsg } from "@/types";

export const mockInitialMessages: ChatMsg[] = [
  { id: 1, from: "ai", text: "Hello Sarah! I'm your ThyroCare AI assistant. How are you feeling today? I'm here to help with any questions about your recovery, medications, diet, or symptoms.", time: "9:01 AM" },
  { id: 2, from: "user", text: "I've been feeling a bit fatigued lately. Is that normal after thyroid surgery?", time: "9:03 AM" },
  { id: 3, from: "ai", text: "Fatigue is indeed very common after thyroidectomy, especially in the first year of recovery. Several factors can contribute: your Levothyroxine dosage may need adjustment, your TSH levels might be out of optimal range, or your body is still adapting to its new hormonal balance.\n\nI'd recommend:\n• Ensure you're taking your Levothyroxine consistently each morning\n• Schedule a TSH level check if you haven't had one recently\n• Maintain a regular sleep schedule (7-9 hours)\n• Stay hydrated and eat a balanced diet\n\nIf fatigue is severe or worsening, please contact your endocrinologist. Would you like me to help you schedule a follow-up appointment?", time: "9:03 AM" },
];

export const mockQuickActions = ["Medication Help", "Symptom Check", "Low-Iodine Diet", "Follow-up Care", "Emotional Support"];

export const mockSuggestions = [
  "What are signs my Levothyroxine dose needs adjusting?",
  "What foods are safe on a low-iodine diet?",
  "When should I be concerned about my symptoms?",
];

export const mockRecentChats = [
  { label: "Fatigue after surgery", date: "Today" },
  { label: "Levothyroxine timing", date: "Yesterday" },
  { label: "Low-iodine meal ideas", date: "3 days ago" },
  { label: "TSH test questions", date: "1 week ago" },
];

export const mockChatReply =
  "Thank you for sharing that. Based on your recovery stage (9 months post-thyroidectomy), this is within the normal range of experiences. I recommend tracking this symptom in your health log and discussing it at your next appointment. Would you like me to add a reminder for your follow-up, or do you have other questions I can help with?";
