"""API v1 router aggregator.

Future mounts (not in Phase 4):
auth, profiles, medications, appointments, symptoms, chat, analytics, resources, admin
"""

from fastapi import APIRouter

from app.api.v1 import health

api_router = APIRouter()
api_router.include_router(health.router)
