from pyramid.view import view_config, view_defaults
from pyramid.response import Response
from pyramid.httpexceptions import HTTPUnauthorized
from mytask_manager.models.task import Task
from datetime import datetime
import json

@view_defaults(route_name='api_tasks', renderer='json')
class TaskAPI:
    def __init__(self, request):
        self.request = request

    @view_config(request_method='GET')
    def get_all(self):
        # ✅ PERBAIKAN: Filter berdasarkan user_id dari session
        user_id = self.request.session.get("user_id")
        if not user_id:
            return Response(status=401, json_body={"error": "Unauthorized"})
        
        # Hanya ambil tasks milik user yang login
        tasks = self.request.dbsession.query(Task).filter(Task.user_id == user_id).all()
        return [
            {
                "id": t.id,
                "title": t.title,
                "details": t.details,
                "due_date": t.due_date.isoformat() if t.due_date else None,
                "category_id": t.category_id,
                "is_done": t.is_done
            } for t in tasks
        ]

    @view_config(request_method='POST')
    def create(self):
        user_id = self.request.session.get("user_id")
        if not user_id:
            return Response(status=401, json_body={"error": "Unauthorized"})

        data = self.request.json_body
        title = data.get('title')
        details = data.get('details')
        category_id = data.get('category_id')
        due_date_str = data.get('due_date')

        if not title or not category_id:
            return Response(json_body={"error": "Missing required fields"}, status=400)

        # Parse due_date jika ada
        due_date = None
        if due_date_str:
            try:
                due_date = datetime.fromisoformat(due_date_str.replace('Z', '+00:00')).date()
            except ValueError:
                try:
                    due_date = datetime.strptime(due_date_str, '%Y-%m-%d').date()
                except ValueError:
                    pass

        task = Task(
            title=title,
            details=details,
            category_id=category_id,
            due_date=due_date,
            user_id=user_id  # ✅ Pastikan user_id di-set
        )

        self.request.dbsession.add(task)
        self.request.dbsession.flush()
        
        return {
            "message": "Task created",
            "task": {
                "id": task.id,
                "title": task.title,
                "details": task.details,
                "due_date": task.due_date.isoformat() if task.due_date else None,
                "category_id": task.category_id,
                "is_done": task.is_done
            }
        }

    @view_config(request_method='OPTIONS')
    def options(self):
        return Response(status=200)

@view_config(route_name='api_task', renderer='json', request_method='PUT')
def update_task(request):
    # ✅ PERBAIKAN: Pastikan user hanya bisa edit task miliknya
    user_id = request.session.get("user_id")
    if not user_id:
        return Response(status=401, json_body={"error": "Unauthorized"})
    
    id = int(request.matchdict['id'])
    data = request.json_body
    
    # Cari task milik user yang login
    task = request.dbsession.query(Task).filter(
        Task.id == id, 
        Task.user_id == user_id
    ).first()
    
    if not task:
        return Response(status=404, json_body={"error": "Task not found"})

    task.title = data.get("title", "").strip()
    task.details = data.get("details", "").strip()
    
    # Handle due_date
    due_date_str = data.get("due_date")
    if due_date_str:
        try:
            task.due_date = datetime.fromisoformat(due_date_str.replace('Z', '+00:00')).date()
        except ValueError:
            try:
                task.due_date = datetime.strptime(due_date_str, '%Y-%m-%d').date()
            except ValueError:
                task.due_date = None
    else:
        task.due_date = None
    
    task.category_id = data.get("category_id")
    task.is_done = data.get("is_done", False)

    return {"message": "Task updated"}

@view_config(route_name='api_task', renderer='json', request_method='DELETE')
def delete_task(request):
    # ✅ PERBAIKAN: Pastikan user hanya bisa hapus task miliknya
    user_id = request.session.get("user_id")
    if not user_id:
        return Response(status=401, json_body={"error": "Unauthorized"})
    
    id = int(request.matchdict['id'])
    
    # Cari task milik user yang login
    task = request.dbsession.query(Task).filter(
        Task.id == id, 
        Task.user_id == user_id
    ).first()
    
    if not task:
        return Response(status=404, json_body={"error": "Task not found"})

    request.dbsession.delete(task)
    return {"message": "Task deleted"}

@view_config(route_name='mark_task_done', renderer='json', request_method='PATCH')
def mark_task_done(request):
    # ✅ PERBAIHAN: Pastikan user hanya bisa mark task miliknya
    user_id = request.session.get("user_id")
    if not user_id:
        return Response(status=401, json_body={"error": "Unauthorized"})
    
    id = int(request.matchdict['id'])
    
    # Cari task milik user yang login
    task = request.dbsession.query(Task).filter(
        Task.id == id, 
        Task.user_id == user_id
    ).first()
    
    if not task:
        return Response(status=404, json_body={"error": "Task not found"})
    
    task.is_done = True
    return {"message": "Task marked as done"}

@view_config(route_name='api_task', request_method='OPTIONS')
def task_options(request):
    return Response(status=200)

@view_config(route_name='mark_task_done', request_method='OPTIONS')
def mark_task_done_options(request):
    return Response(status=200)