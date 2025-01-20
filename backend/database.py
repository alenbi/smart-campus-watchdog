from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

# Create the database engine
DATABASE_URL = "sqlite:///./students.db"  # Using SQLite for simplicity
engine = create_engine(DATABASE_URL)

# Create declarative base
Base = declarative_base()

# Define Student model
class Student(Base):
    __tablename__ = "students"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    roll_no = Column(String, nullable=False, unique=True)
    department = Column(String, nullable=False)
    year = Column(String, nullable=False)
    section = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    violations = Column(Integer, default=0)
    photo = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    violation_records = relationship("ViolationRecord", back_populates="student")

class ViolationRecord(Base):
    __tablename__ = "violation_records"

    id = Column(Integer, primary_key=True)
    student_id = Column(String, ForeignKey("students.id"))
    violation_type = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    location = Column(String)
    description = Column(String)
    status = Column(String, default="pending")  # pending, resolved, dismissed

    student = relationship("Student", back_populates="violation_records")

# Create all tables
Base.metadata.create_all(bind=engine)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()