"""FastAPI dependencies for database and repositories."""

from __future__ import annotations

from collections.abc import Callable
from typing import Annotated

from fastapi import Depends
from pymongo.asynchronous.database import AsyncDatabase

from app.core.exceptions import ServiceUnavailableException
from app.db.mongodb import get_database as get_mongo_database
from app.repositories.appointment_repository import AppointmentRepository
from app.repositories.chat_repository import ChatRepository
from app.repositories.knowledge_repository import KnowledgeRepository
from app.repositories.medication_repository import MedicationRepository
from app.repositories.patient_profile_repository import PatientProfileRepository
from app.repositories.symptom_repository import SymptomRepository
from app.repositories.user_repository import UserRepository


def get_database() -> AsyncDatabase:
    """Return the lifespan-initialized database or raise 503."""
    database = get_mongo_database()
    if database is None:
        raise ServiceUnavailableException("Database temporarily unavailable")
    return database


DatabaseDep = Annotated[AsyncDatabase, Depends(get_database)]


def _repo_factory(factory: Callable[[AsyncDatabase], object]) -> Callable[..., object]:
    def dependency(database: DatabaseDep) -> object:
        return factory(database)

    return dependency


def get_user_repository(database: DatabaseDep) -> UserRepository:
    return UserRepository(database)


def get_patient_profile_repository(database: DatabaseDep) -> PatientProfileRepository:
    return PatientProfileRepository(database)


def get_medication_repository(database: DatabaseDep) -> MedicationRepository:
    return MedicationRepository(database)


def get_appointment_repository(database: DatabaseDep) -> AppointmentRepository:
    return AppointmentRepository(database)


def get_symptom_repository(database: DatabaseDep) -> SymptomRepository:
    return SymptomRepository(database)


def get_chat_repository(database: DatabaseDep) -> ChatRepository:
    return ChatRepository(database)


def get_knowledge_repository(database: DatabaseDep) -> KnowledgeRepository:
    return KnowledgeRepository(database)


UserRepositoryDep = Annotated[UserRepository, Depends(get_user_repository)]
PatientProfileRepositoryDep = Annotated[
    PatientProfileRepository, Depends(get_patient_profile_repository)
]
MedicationRepositoryDep = Annotated[MedicationRepository, Depends(get_medication_repository)]
AppointmentRepositoryDep = Annotated[AppointmentRepository, Depends(get_appointment_repository)]
SymptomRepositoryDep = Annotated[SymptomRepository, Depends(get_symptom_repository)]
ChatRepositoryDep = Annotated[ChatRepository, Depends(get_chat_repository)]
KnowledgeRepositoryDep = Annotated[KnowledgeRepository, Depends(get_knowledge_repository)]
