"""API v1 router aggregator."""

from fastapi import APIRouter

from app.api.v1 import appointments, auth, health, medications, profiles, symptoms

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(auth.router)
api_router.include_router(profiles.router)
api_router.include_router(medications.router)
api_router.include_router(appointments.router)
api_router.include_router(symptoms.router)
