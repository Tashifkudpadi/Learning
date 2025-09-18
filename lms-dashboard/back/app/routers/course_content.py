from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List
import os
from uuid import uuid4
from app.database import get_db
from app.models.course import Course
from app.models.course_content import CourseContent
from app.models.subject import Subject
from app.models.topic import Topic
from app.schemas.course_content import CourseContentCreate, CourseContentOut, CourseContentUpdate

router = APIRouter()

UPLOAD_DIR = "uploads/course_contents"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload", response_model=CourseContentOut)
def upload_content(
    course_id: int = Form(...),
    title: str = Form(...),
    description: str = Form(None),
    subject_id: int = Form(...),
    topic_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # Validate subject and topic
    subject = db.query(Subject).filter(Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    topic = db.query(Topic).filter(Topic.id == topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    if topic.subject_id != subject.id:
        raise HTTPException(
            status_code=400, detail="Topic does not belong to the selected subject")

    # Generate unique filename
    file_ext = os.path.splitext(file.filename)[1]
    filename = f"{uuid4().hex}{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    # Save file
    with open(file_path, "wb") as f:
        f.write(file.file.read())

    db_content = CourseContent(
        course_id=course_id,
        title=title,
        description=description,
        file_type=file.content_type,
        file_url=f"/uploads/course_contents/{filename}",  # public URL
        subject_id=subject_id,
        topic_id=topic_id,
    )
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    return db_content


@router.post("/youtube", response_model=CourseContentOut)
def add_youtube_content(content: CourseContentCreate, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == content.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # Validate subject and topic
    subject = db.query(Subject).filter(
        Subject.id == content.subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    topic = db.query(Topic).filter(Topic.id == content.topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    if topic.subject_id != subject.id:
        raise HTTPException(
            status_code=400, detail="Topic does not belong to the selected subject")

    db_content = CourseContent(
        course_id=content.course_id,
        title=content.title,
        description=content.description,
        youtube_link=content.youtube_link,
        subject_id=content.subject_id,
        topic_id=content.topic_id,
    )
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    return db_content


@router.post("/", response_model=CourseContentOut)
def create_content(content: CourseContentCreate, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == content.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # Validate subject and topic
    subject = db.query(Subject).filter(
        Subject.id == content.subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    topic = db.query(Topic).filter(Topic.id == content.topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    if topic.subject_id != subject.id:
        raise HTTPException(
            status_code=400, detail="Topic does not belong to the selected subject")

    db_content = CourseContent(
        course_id=content.course_id,
        title=content.title,
        description=content.description,
        file_type=content.file_type,
        file_url=content.file_url,
        subject_id=content.subject_id,
        topic_id=content.topic_id,
    )
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    return db_content


@router.get("/course/{course_id}", response_model=List[CourseContentOut])
def get_contents(course_id: int, db: Session = Depends(get_db)):
    return db.query(CourseContent).filter(CourseContent.course_id == course_id).all()


@router.put("/{content_id}", response_model=CourseContentOut)
def update_content(content_id: int, update: CourseContentUpdate, db: Session = Depends(get_db)):
    content = db.query(CourseContent).filter(
        CourseContent.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")

    if update.title is not None:
        content.title = update.title
    if update.description is not None:
        content.description = update.description
    if update.file_type is not None:
        content.file_type = update.file_type
    if update.file_url is not None:
        content.file_url = update.file_url
    if update.youtube_link is not None:
        content.youtube_link = update.youtube_link
    # Allow updating subject/topic with validation
    if update.subject_id is not None and update.topic_id is not None:
        subject = db.query(Subject).filter(
            Subject.id == update.subject_id).first()
        if not subject:
            raise HTTPException(status_code=404, detail="Subject not found")
        topic = db.query(Topic).filter(Topic.id == update.topic_id).first()
        if not topic:
            raise HTTPException(status_code=404, detail="Topic not found")
        if topic.subject_id != subject.id:
            raise HTTPException(
                status_code=400, detail="Topic does not belong to the selected subject")
        content.subject_id = update.subject_id
        content.topic_id = update.topic_id

    db.commit()
    db.refresh(content)
    return content

    # return CourseContentOut(
    #     id=content.id,
    #     course_id=content.course_id,
    #     title=content.title,
    #     description=content.description,
    #     file_type=content.file_type,
    #     file_url=content.file_url,
    # )


@router.delete("/{content_id}")
def delete_content(content_id: int, db: Session = Depends(get_db)):
    content = db.query(CourseContent).filter(
        CourseContent.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    db.delete(content)
    db.commit()
    return {"message": "Content deleted successfully"}
