"""Chat repository — ownership-enforced session/message access."""

from __future__ import annotations

from bson import ObjectId
from pymongo.asynchronous.database import AsyncDatabase

from app.db.collections import CollectionName
from app.models.chat import ChatMessageDocument, ChatSessionDocument
from app.models.object_id import to_object_id
from app.repositories.base import BaseRepository


class ChatSessionRepository(BaseRepository[ChatSessionDocument]):
    collection_name = CollectionName.CHAT_SESSIONS.value
    model_type = ChatSessionDocument
    supports_soft_delete = True

    def __init__(self, database: AsyncDatabase) -> None:
        super().__init__(database)

    async def list_sessions_for_user(
        self,
        user_id: ObjectId | str,
        *,
        page: int = 1,
        page_size: int = 20,
    ) -> list[ChatSessionDocument]:
        return await self.find_many(
            {"user_id": to_object_id(user_id)},
            page=page,
            page_size=page_size,
            sort=[("last_message_at", -1), ("created_at", -1)],
        )

    async def get_owned_session(
        self,
        session_id: ObjectId | str,
        user_id: ObjectId | str,
    ) -> ChatSessionDocument | None:
        return await self.find_one(
            {"_id": to_object_id(session_id), "user_id": to_object_id(user_id)},
        )


class ChatMessageRepository(BaseRepository[ChatMessageDocument]):
    collection_name = CollectionName.CHAT_MESSAGES.value
    model_type = ChatMessageDocument
    supports_soft_delete = False

    def __init__(self, database: AsyncDatabase) -> None:
        super().__init__(database)

    async def list_messages_for_session(
        self,
        session_id: ObjectId | str,
        user_id: ObjectId | str,
        *,
        page: int = 1,
        page_size: int = 50,
    ) -> list[ChatMessageDocument]:
        return await self.find_many(
            {
                "session_id": to_object_id(session_id),
                "user_id": to_object_id(user_id),
            },
            page=page,
            page_size=page_size,
            sort=[("created_at", 1)],
        )


class ChatRepository:
    """Facade combining session and message repositories."""

    def __init__(self, database: AsyncDatabase) -> None:
        self.sessions = ChatSessionRepository(database)
        self.messages = ChatMessageRepository(database)

    async def list_sessions_for_user(
        self,
        user_id: ObjectId | str,
        *,
        page: int = 1,
        page_size: int = 20,
    ) -> list[ChatSessionDocument]:
        return await self.sessions.list_sessions_for_user(user_id, page=page, page_size=page_size)

    async def get_owned_session(
        self,
        session_id: ObjectId | str,
        user_id: ObjectId | str,
    ) -> ChatSessionDocument | None:
        return await self.sessions.get_owned_session(session_id, user_id)

    async def list_messages_for_session(
        self,
        session_id: ObjectId | str,
        user_id: ObjectId | str,
        *,
        page: int = 1,
        page_size: int = 50,
    ) -> list[ChatMessageDocument]:
        return await self.messages.list_messages_for_session(
            session_id, user_id, page=page, page_size=page_size
        )
