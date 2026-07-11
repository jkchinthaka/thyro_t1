"""Authentication request/response schemas."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator, model_validator

from app.models.enums import AccountStatus, UserRole
from app.schemas.base import PublicIdSchema


class RegisterRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    full_name: str = Field(min_length=2, max_length=200)
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)
    confirm_password: str = Field(min_length=1, max_length=128)
    consent_accepted: bool
    disclaimer_accepted: bool

    @field_validator("full_name")
    @classmethod
    def strip_name(cls, value: str) -> str:
        cleaned = value.strip()
        if len(cleaned) < 2:
            raise ValueError("Enter your full name")
        return cleaned

    @model_validator(mode="after")
    def passwords_and_consent(self) -> RegisterRequest:
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        if not self.consent_accepted:
            raise ValueError("Consent must be accepted")
        if not self.disclaimer_accepted:
            raise ValueError("Medical disclaimer must be accepted")
        return self


class LoginRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class AuthUserPublic(PublicIdSchema):
    full_name: str
    email: str
    role: UserRole
    account_status: AccountStatus
    email_verified: bool
    created_at: datetime


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: AuthUserPublic


class MessageResponse(BaseModel):
    success: bool = True
    message: str
