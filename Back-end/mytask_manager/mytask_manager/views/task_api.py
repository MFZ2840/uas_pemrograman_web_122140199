from pyramid.view import view_config, view_defaults
from pyramid.response import Response
from mytask_manager.models.task import Task
import json

@view_defaults(route_name='api_tasks', renderer='json')
class TaskAPI:
    def __init__(self, request):
        self.request = request

    @view_config(request_method='GET')
    def get_all(self):
        tasks = self.request.dbsession.query(Task).all()
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
        try:
            data = self.request.json_body

            title = data.get('title')
            details = data.get('details')
            due_date = data.get('due_date')
            category_id = int(data.get('category_id'))  # pastikan integer

            if not all([title, details, due_date, category_id]):
                return Response(json.dumps({'error': 'Missing fields'}), status=400)

            new_task = Task(
                title=title,
                details=details,
                due_date=due_date,
                category_id=category_id,
                is_done=False
            )
            self.request.dbsession.add(new_task)
            return {'message': 'Task created successfully'}

        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response(json.dumps({'error': str(e)}), status=500)


@view_config(route_name='api_task', renderer='json', request_method='PUT')
def update_task(request):
    id = int(request.matchdict['id'])
    data = request.json_body
    task = request.dbsession.query(Task).get(id)
    if not task:
        return Response(status=404, json_body={"error": "Task not found"})
    
    task.title = data.get("title", "").strip()
    task.details = data.get("details", "").strip()
    task.due_date = data.get("due_date")
    task.category_id = data.get("category_id")
    task.is_done = data.get("is_done", False)

    return {"message": "Task updated"}

@view_config(route_name='api_task', renderer='json', request_method='DELETE')
def delete_task(request):
    id = int(request.matchdict['id'])
    task = request.dbsession.query(Task).get(id)
    if not task:
        return Response(status=404, json_body={"error": "Task not found"})
    
    request.dbsession.delete(task)
    return {"message": "Task deleted"}

@view_config(route_name='mark_task_done', renderer='json', request_method='PATCH')
def mark_task_done(request):
    id = int(request.matchdict['id'])
    task = request.dbsession.query(Task).get(id)
    if not task:
        return Response(status=404, json_body={"error": "Task not found"})
    task.is_done = True
    return {"message": "Task marked as done"}

@view_config(route_name='api_tasks', request_method='OPTIONS')
@view_config(route_name='api_task', request_method='OPTIONS')
def task_options(request):
    return Response(status=200)

@view_config(route_name='mark_task_done', request_method='OPTIONS')
def mark_task_done_options(request):
    return Response(status=200)
