python3 -m venv env
source env/bin/activate
pip install fastapi sqlalchemy psycopg2-binary
uvicorn main:app --reload
