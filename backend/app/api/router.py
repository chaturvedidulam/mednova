from fastapi import APIRouter

from app.api.v1 import reports
from app.api.v1 import users
from app.api.v1 import symptoms
from app.api.v1 import chat

api_router = APIRouter()

api_router.include_router(
    reports.router,
    prefix="/reports",
    tags=["Reports"]
)

api_router.include_router(

    users.router,

    prefix="/users",

    tags=["Users"]

)

api_router.include_router(

    symptoms.router,

    prefix="/symptoms",

    tags=["Symptoms"]

)

api_router.include_router(

    chat.router,

    prefix="/chat",

    tags=["Chat"]

)