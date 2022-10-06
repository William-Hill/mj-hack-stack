from app.core.celery_app import celery_app
from celery import shared_task
from app.db.session import db_context


@celery_app.task(acks_late=True)
def example_task(word: str) -> str:
    return f"test task returns {word}"


@shared_task
def example_task_user() -> str:
    from app.db.models import User

    with db_context() as session:
        user = session.query(User).first()
        print("user:", user)
        return f"test task returns {user}"
