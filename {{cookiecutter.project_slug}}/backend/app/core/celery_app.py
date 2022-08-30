from celery import Celery

celery_app = Celery(
    "tasks", backend="redis://localhost:6379/0", broker="redis://redis:6379/0"
)

celery_app.conf.task_routes = {"app.tasks.*": "main-queue"}
