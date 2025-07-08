from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.batch import Batch
from schemas.batch import BatchCreate, BatchUpdate, BatchOut
from typing import List

router = APIRouter()

@router.post("/", response_model=BatchOut)
def create_batch(batch: BatchCreate, db: Session = Depends(get_db)):
    db_batch = Batch(**batch.dict())
    db.add(db_batch)
    db.commit()
    db.refresh(db_batch)
    return db_batch

@router.get("/", response_model=List[BatchOut])
def get_batches(db: Session = Depends(get_db)):
    return db.query(Batch).all()

@router.get("/{batch_id}", response_model=BatchOut)
def get_batch(batch_id: int, db: Session = Depends(get_db)):
    batch = db.query(Batch).filter(Batch.id == batch_id).first()
    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")
    return batch

@router.put("/{batch_id}", response_model=BatchOut)
def update_batch(batch_id: int, update: BatchUpdate, db: Session = Depends(get_db)):
    batch = db.query(Batch).filter(Batch.id == batch_id).first()
    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")
    for key, value in update.dict().items():
        setattr(batch, key, value)
    db.commit()
    db.refresh(batch)
    return batch

@router.delete("/{batch_id}")
def delete_batch(batch_id: int, db: Session = Depends(get_db)):
    batch = db.query(Batch).filter(Batch.id == batch_id).first()
    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")
    db.delete(batch)
    db.commit()
    return {"message": "Batch deleted successfully"}
