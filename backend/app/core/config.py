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
    mongodb_server_selection_timeout_ms: int = Field(
        default=3000,
        alias="MONGODB_SERVER_SELECTION_TIMEOUT_MS",
    )
    mongodb_connect_timeout_ms: int = Field(default=3000, alias="MONGODB_CONNECT_TIMEOUT_MS")
    mongodb_socket_timeout_ms: int = Field(default=10000, alias="MONGODB_SOCKET_TIMEOUT_MS")
    database_auto_initialize: bool = Field(default=True, alias="DATABASE_AUTO_INITIALIZE")
    database_run_migrations: bool = Field(default=True, alias="DATABASE_RUN_MIGRATIONS")
    database_require_connection: bool = Field(
        default=False,
        alias="DATABASE_REQUIRE_CONNECTION",
    )
    database_test_name: str = Field(default="thyrocare_ai_test", alias="DATABASE_TEST_NAME")
    log_level: str = Field(default="INFO", alias="LOG_LEVEL")
    request_timeout_seconds: int = Field(default=30, alias="REQUEST_TIMEOUT_SECONDS")
    rate_limit_enabled: bool = Field(default=False, alias="RATE_LIMIT_ENABLED")
    rate_limit_default: str = Field(default="100/minute", alias="RATE_LIMIT_DEFAULT")
    openapi_enabled: bool = Field(default=True, alias="OPENAPI_ENABLED")

    # Authentication
    authentication_enabled: bool = Field(default=True, alias="AUTHENTICATION_ENABLED")
    jwt_secret_key: str = Field(
        default="dev-only-change-me-use-openssl-rand-hex-32-chars-min",
        alias="JWT_SECRET_KEY",
    )
    jwt_algorithm: str = Field(default="HS256", alias="JWT_ALGORITHM")
    jwt_issuer: str = Field(default="thyrocare-ai-api", alias="JWT_ISSUER")
    jwt_audience: str = Field(default="thyrocare-ai-web", alias="JWT_AUDIENCE")
    access_token_expire_minutes: int = Field(default=15, alias="ACCESS_TOKEN_EXPIRE_MINUTES")
    refresh_token_expire_days: int = Field(default=14, alias="REFRESH_TOKEN_EXPIRE_DAYS")
    jwt_clock_skew_seconds: int = Field(default=30, alias="JWT_CLOCK_SKEW_SECONDS")
    password_min_length: int = Field(default=10, alias="PASSWORD_MIN_LENGTH")
    password_max_length: int = Field(default=128, alias="PASSWORD_MAX_LENGTH")
    login_max_failed_attempts: int = Field(default=5, alias="LOGIN_MAX_FAILED_ATTEMPTS")
    login_lock_minutes: int = Field(default=15, alias="LOGIN_LOCK_MINUTES")
    auth_rate_limit_login: str = Field(default="10/minute", alias="AUTH_RATE_LIMIT_LOGIN")
    auth_rate_limit_register: str = Field(default="5/minute", alias="AUTH_RATE_LIMIT_REGISTER")
    auth_rate_limit_refresh: str = Field(default="30/minute", alias="AUTH_RATE_LIMIT_REFRESH")
    refresh_cookie_name: str = Field(default="thyrocare_refresh", alias="REFRESH_COOKIE_NAME")
    csrf_cookie_name: str = Field(default="thyrocare_csrf", alias="CSRF_COOKIE_NAME")
    cookie_secure: bool = Field(default=False, alias="COOKIE_SECURE")
    cookie_samesite: Literal["lax", "strict", "none"] = Field(
        default="lax",
        alias="COOKIE_SAMESITE",
    )
    cookie_domain: str | None = Field(default=None, alias="COOKIE_DOMAIN")
    cookie_path: str = Field(default="/api/v1/auth", alias="COOKIE_PATH")
    csrf_header_name: str = Field(default="X-CSRF-Token", alias="CSRF_HEADER_NAME")
    require_email_verification: bool = Field(
        default=False,
        alias="REQUIRE_EMAIL_VERIFICATION",
    )

    # Phase 11 — safe assistant (default disabled)
    ai_assistant_enabled: bool = Field(default=False, alias="AI_ASSISTANT_ENABLED")
    llm_provider: str = Field(default="disabled", alias="LLM_PROVIDER")
    llm_model: str = Field(default="", alias="LLM_MODEL")
    llm_api_key: str = Field(default="", alias="LLM_API_KEY")
    llm_timeout_seconds: int = Field(default=20, alias="LLM_TIMEOUT_SECONDS")
    llm_max_output_tokens: int = Field(default=512, alias="LLM_MAX_OUTPUT_TOKENS")
    knowledge_retrieval_mode: str = Field(default="lexical", alias="KNOWLEDGE_RETRIEVAL_MODE")
    knowledge_max_chunks: int = Field(default=5, alias="KNOWLEDGE_MAX_CHUNKS")
    knowledge_min_score: float = Field(default=0.15, alias="KNOWLEDGE_MIN_SCORE")
    chat_max_message_length: int = Field(default=4000, alias="CHAT_MAX_MESSAGE_LENGTH")
    chat_max_history_messages: int = Field(default=50, alias="CHAT_MAX_HISTORY_MESSAGES")
    chat_rate_limit: str = Field(default="20/minute", alias="CHAT_RATE_LIMIT")

    @field_validator("api_v1_prefix")
    @classmethod
    def normalize_prefix(cls, value: str) -> str:
        value = value.strip() or "/api/v1"
        if not value.startswith("/"):
            value = f"/{value}"
        return value.rstrip("/") or "/api/v1"

    @field_validator("cookie_domain", mode="before")
    @classmethod
    def empty_domain_to_none(cls, value: object) -> object:
        if value == "" or value is None:
            return None
        return value

    @property
    def is_production(self) -> bool:
        return self.app_environment == "production"

    @property
    def is_development(self) -> bool:
        return self.app_environment in {"development", "test"}

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]

    @property
    def access_token_expire_seconds(self) -> int:
        return self.access_token_expire_minutes * 60

    def validate_for_runtime(self) -> None:
        """Fail clearly when critical production values are missing or unsafe."""
        if not self.database_test_name.endswith("_test"):
            raise ValueError("DATABASE_TEST_NAME must end with '_test'")
        if self.jwt_algorithm != "HS256":
            raise ValueError("Only HS256 is supported for JWT_ALGORITHM")
        if self.cookie_samesite == "none" and not self.cookie_secure:
            raise ValueError("COOKIE_SAMESITE=none requires COOKIE_SECURE=true")
        if not self.is_production:
            return
        if not self.mongodb_uri or self.mongodb_uri.startswith("mongodb://localhost"):
            raise ValueError("Production requires a non-local MONGODB_URI")
        if "*" in self.cors_origins:
            raise ValueError("Production must not use wildcard ALLOWED_ORIGINS")
        if self.debug:
            raise ValueError("Production must set DEBUG=false")
        if not self.cookie_secure:
            raise ValueError("Production must set COOKIE_SECURE=true")
        secret = self.jwt_secret_key.strip()
        if len(secret) < 32:
            raise ValueError("Production JWT_SECRET_KEY must be at least 32 characters")
        if secret.startswith("dev-only") or "change-me" in secret.lower():
            raise ValueError("Production must not use the development JWT_SECRET_KEY")
        if self.ai_assistant_enabled:
            provider = self.llm_provider.strip().lower()
            if provider in {"", "disabled", "none", "fake"}:
                raise ValueError(
                    "Production AI_ASSISTANT_ENABLED requires a configured non-fake LLM_PROVIDER"
                )
            if not self.llm_api_key.strip():
                raise ValueError("Production AI_ASSISTANT_ENABLED requires LLM_API_KEY")
            if not self.llm_model.strip():
                raise ValueError("Production AI_ASSISTANT_ENABLED requires LLM_MODEL")


@lru_cache
def get_settings() -> Settings:
    settings = Settings()
    settings.validate_for_runtime()
    return settings
