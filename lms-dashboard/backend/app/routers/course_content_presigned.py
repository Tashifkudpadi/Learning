from fastapi import APIRouter, Query
from datetime import timedelta
from app.utils.minio_client import minio_client, BUCKET_NAME

router = APIRouter()


@router.get("/upload-url")
def get_presigned_upload_url(file_name: str, content_type: str = "application/octet-stream"):
    url = minio_client.presigned_put_object(
        bucket_name=BUCKET_NAME,
        object_name=file_name,
        expires=timedelta(minutes=10)
    )
    return {"upload_url": url, "file_name": file_name}


# 🟦 Generate presigned download URL
@router.get("/download-url")
def get_presigned_download_url(file_name: str):
    url = minio_client.presigned_get_object(
        bucket_name=BUCKET_NAME,
        object_name=file_name,
        expires=timedelta(minutes=10)
    )
    return {"download_url": url}
