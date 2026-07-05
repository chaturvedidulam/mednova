import io

import fitz
import pytesseract

from PIL import Image


pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


class OCRService:

    @staticmethod
    def extract_text(file_path: str):

        if file_path.lower().endswith(".pdf"):
            return OCRService.extract_pdf(file_path)

        return OCRService.extract_image(file_path)

    @staticmethod
    def extract_pdf(file_path: str):

        text = ""

        with fitz.open(file_path) as pdf:

            for page in pdf:

                text += page.get_text()

        if text.strip():

            return text

        return OCRService.extract_scanned_pdf(file_path)

    @staticmethod
    def extract_scanned_pdf(file_path: str):

        text = ""

        with fitz.open(file_path) as pdf:

            for page in pdf:

                pixmap = page.get_pixmap(
                    matrix=fitz.Matrix(2, 2),
                    alpha=False
                )

                image = Image.open(
                    io.BytesIO(pixmap.tobytes("png"))
                )

                text += pytesseract.image_to_string(image)

        return text

    @staticmethod
    def extract_image(file_path: str):

        with Image.open(file_path) as image:

            return pytesseract.image_to_string(image)
