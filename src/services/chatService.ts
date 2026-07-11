import { api } from "@/services/api";
import type {
  ChatAssistantResponse,
  ChatSession,
  ChatSessionDetail,
  ChatSessionListResponse,
} from "@/types/chat";
import { toAppError } from "@/utils/apiError";

export async function listSessions(params?: {
  page?: number;
  page_size?: number;
}): Promise<ChatSessionListResponse> {
  try {
    const { data } = await api.get<ChatSessionListResponse>("/chat/sessions", { params });
    return data;
  } catch (error) {
    throw toAppError(error);
  }
}

export async function createSession(title?: string): Promise<ChatSession> {
  try {
    const { data } = await api.post<ChatSession>("/chat/sessions", {
      title: title ?? null,
    });
    return data;
  } catch (error) {
    throw toAppError(error);
  }
}

export async function getSession(sessionId: string): Promise<ChatSessionDetail> {
  try {
    const { data } = await api.get<ChatSessionDetail>(`/chat/sessions/${sessionId}`);
    return data;
  } catch (error) {
    throw toAppError(error);
  }
}

export async function deleteSession(sessionId: string): Promise<void> {
  try {
    await api.delete(`/chat/sessions/${sessionId}`);
  } catch (error) {
    throw toAppError(error);
  }
}

export async function updateSessionTitle(sessionId: string, title: string): Promise<ChatSession> {
  try {
    const { data } = await api.patch<ChatSession>(`/chat/sessions/${sessionId}`, { title });
    return data;
  } catch (error) {
    throw toAppError(error);
  }
}

export async function sendMessage(
  sessionId: string,
  content: string,
): Promise<ChatAssistantResponse> {
  try {
    const { data } = await api.post<ChatAssistantResponse>(`/chat/sessions/${sessionId}/messages`, {
      content,
    });
    return data;
  } catch (error) {
    throw toAppError(error);
  }
}
