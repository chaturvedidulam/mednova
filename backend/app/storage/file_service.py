import os
import uuid

UPLOAD_DIR = "uploads"


class FileService:

    @staticmethod
    def save_upload(file, user_id: int):

        extension = os.path.splitext(file.filename)[1]

        unique_filename = f"{uuid.uuid4()}{extension}"

        user_folder = os.path.join(
            UPLOAD_DIR,
            f"user_{user_id}"
        )

        os.makedirs(user_folder, exist_ok=True)

        file_path = os.path.join(
            user_folder,
            unique_filename
        )

        with open(file_path, "wb") as buffer:
            buffer.write(file.file.read())

        return file_path, unique_filename