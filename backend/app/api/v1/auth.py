"""Authentication API routes."""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, Request, Response, status

from app.api.dependencies import CurrentActiveUser, get_auth_service
from app.core.config import get_settings
from app.core.cookies import (
    clear_csrf_cookie,
    clear_refresh_cookie,
    set_csrf_cookie,
    set_refresh_cookie,
)
from app.core.csrf import generate_csrf_token, verify_csrf
from app.core.exceptions import UnauthorizedException
from app.core.rate_limit import limiter
from app.models.object_id import object_id_to_string
from app.models.user import UserDocument
from app.schemas.auth import (
    AuthUserPublic,
    LoginRequest,
    MessageResponse,
    RegisterRequest,
    TokenResponse,
)
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["auth"])

AuthServiceDep = Annotated[AuthService, Depends(get_auth_service)]


def _login_limit() -> str:
    return get_settings().auth_rate_limit_login


def _register_limit() -> str:
    return get_settings().auth_rate_limit_register


def _refresh_limit() -> str:
    return get_settings().auth_rate_limit_refresh


def _apply_session_cookies(
    response: Response,
    *,
    raw_refresh: str,
    refresh_max_age: int,
) -> None:
    csrf = generate_csrf_token()
    set_refresh_cookie(response, raw_refresh, max_age=refresh_max_age)
    set_csrf_cookie(response, csrf, max_age=refresh_max_age)


def _user_public(user: UserDocument) -> AuthUserPublic:
    return AuthUserPublic(
        id=object_id_to_string(user.id),
        full_name=user.full_name,
        email=user.email_display,
        role=user.role,
        account_status=user.account_status,
        email_verified=user.email_verified,
        created_at=user.created_at,
    )


@router.post(
    "/register",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a patient account",
)
@limiter.limit(_register_limit)
async def register(
    payload: RegisterRequest,
    request: Request,
    response: Response,
    auth: AuthServiceDep,
) -> TokenResponse:
    """Create a PATIENT account only. Role cannot be chosen by the client."""
    session = await auth.register(
        payload,
        user_agent=request.headers.get("user-agent"),
    )
    _apply_session_cookies(
        response,
        raw_refresh=session.raw_refresh_token,
        refresh_max_age=session.refresh_max_age,
    )
    return session.response


@router.post("/login", response_model=TokenResponse, summary="Login")
@limiter.limit(_login_limit)
async def login(
    payload: LoginRequest,
    request: Request,
    response: Response,
    auth: AuthServiceDep,
) -> TokenResponse:
    session = await auth.login(
        payload,
        user_agent=request.headers.get("user-agent"),
    )
    _apply_session_cookies(
        response,
        raw_refresh=session.raw_refresh_token,
        refresh_max_age=session.refresh_max_age,
    )
    return session.response


@router.post("/refresh", response_model=TokenResponse, summary="Refresh access token")
@limiter.limit(_refresh_limit)
async def refresh(
    request: Request,
    response: Response,
    auth: AuthServiceDep,
) -> TokenResponse:
    """Requires HttpOnly refresh cookie + X-CSRF-Token header."""
    verify_csrf(request)
    settings = get_settings()
    raw = request.cookies.get(settings.refresh_cookie_name)
    if not raw:
        raise UnauthorizedException("Invalid refresh token")
    session = await auth.refresh(
        raw,
        user_agent=request.headers.get("user-agent"),
    )
    _apply_session_cookies(
        response,
        raw_refresh=session.raw_refresh_token,
        refresh_max_age=session.refresh_max_age,
    )
    return session.response


@router.post("/logout", response_model=MessageResponse, summary="Logout")
async def logout(
    request: Request,
    response: Response,
    auth: AuthServiceDep,
) -> MessageResponse:
    settings = get_settings()
    raw = request.cookies.get(settings.refresh_cookie_name)
    if raw:
        verify_csrf(request)
        await auth.logout(raw)
    clear_refresh_cookie(response)
    clear_csrf_cookie(response)
    return MessageResponse(message="Logged out")


@router.get(
    "/me",
    response_model=AuthUserPublic,
    summary="Current authenticated user",
)
async def me(user: CurrentActiveUser) -> AuthUserPublic:
    return _user_public(user)
