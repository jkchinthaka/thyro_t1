from functools import lru_cache
from typing import Literal

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Immutable application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    app_name: str = Field(default="ThyroCare AI API", alias="APP_NAME")
    app_version: str = Field(default="0.1.0", alias="APP_VERSION")
    app_environment: Literal["development", "staging", "production", "test"] = Field(
        default="development",
        alias="APP_ENVIRONMENT",
    )
    debug: bool = Field(default=True, alias="DEBUG")
    api_v1_prefix: str = Field(default="/api/v1", alias="API_V1_PREFIX")
    host: str = Field(default="0.0.0.0", alias="HOST")
    port: int = Field(default=8000, alias="PORT")
    allowed_origins: str = Field(default="http://localhost:5173", alias="ALLOWED_ORIGINS")
    mongodb_uri: str = Field(default="mongodb://localhost:27017", alias="MONGODB_URI")
    mongodb_database: str = Field(default="thyrocare_ai", alias="MONGODB_DATABASE")
    log_level: str = Field(default="INFO", alias="LOG_LEVEL")
    request_timeout_seconds: int = Field(default=30, alias="REQUEST_TIMEOUT_SECONDS")
    rate_limit_enabled: bool = Field(default=False, alias="RATE_LIMIT_ENABLED")
    rate_limit_default: str = Field(default="100/minute", alias="RATE_LIMIT_DEFAULT")
    openapi_enabled: bool = Field(default=True, alias="OPENAPI_ENABLED")

    @field_validator("api_v1_prefix")
    @classmethod
    def normalize_prefix(cls, value: str) -> str:
        value = value.strip() or "/api/v1"
        if not value.startswith("/"):
            value = f"/{value}"
        return value.rstrip("/") or "/api/v1"

    @property
    def is_production(self) -> bool:
        return self.app_environment == "production"

    @property
    def is_development(self) -> bool:
        return self.app_environment in {"development", "test"}

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]

    def validate_for_runtime(self) -> None:
        """Fail clearly when critical production values are missing or unsafe."""
        if not self.is_production:
            return
        if not self.mongodb_uri or self.mongodb_uri.startswith("mongodb://localhost"):
            raise ValueError("Production requires a non-local MONGODB_URI")
        if "*" in self.cors_origins:
            raise ValueError("Production must not use wildcard ALLOWED_ORIGINS")
        if self.debug:
            raise ValueError("Production must set DEBUG=false")


@lru_cache
def get_settings() -> Settings:
    settings = Settings()
    settings.validate_for_runtime()
    return settings
