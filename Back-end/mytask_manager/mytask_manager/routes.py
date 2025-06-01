import logging

log = logging.getLogger(__name__)

def includeme(config):
    log.info("Registering routes...")
    
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    
    # Category API
    config.add_route('api_categories', '/api/categories')
    config.add_route('api_category', '/api/categories/{id}')
    
    # Task API
    config.add_route('api_tasks', '/api/tasks')
    config.add_route('api_task', '/api/tasks/{id}')
    config.add_route('mark_task_done', '/api/tasks/{id}/done')
    
    # Auth API
    config.add_route('register', '/api/register')
    config.add_route('login', '/api/login')
    
    log.info("Routes registered successfully")
    log.info("Register route: /api/register")
    log.info("Login route: /api/login")