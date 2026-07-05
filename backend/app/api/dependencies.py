from fastapi import Header

from fastapi import HTTPException

from firebase_admin import auth


async def get_current_user(

    authorization: str = Header(...)

):

    try:

        token = authorization.replace("Bearer ", "")

        decoded = auth.verify_id_token(token)

        return decoded

    except Exception:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )