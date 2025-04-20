import os
import configparser

# print(sys.path)
config = configparser.ConfigParser()
# config_file_path = os.path.join(os.path.dirname(__file__), 'secrets.conf')
config.read('secrets.conf')

LLMS_API_ACCESS_TOKEN = config.get('GEMINI_API', 'access_token')

class Settings:
    CHROMA_DB_PATH = os.getenv("CHROMA_DB_PATH", "./chroma_db")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", LLMS_API_ACCESS_TOKEN)
    GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")

settings = Settings()
