from pyramid.view import view_config, view_defaults
from pyramid.response import Response
from mytask_manager.models.category import Category
import json

@view_defaults(route_name='api_categories', renderer='json')
class CategoryAPI:
    def __init__(self, request):
        self.request = request

    @view_config(request_method='GET')
    def get_all(self):
        # ✅ PERBAIKAN: Filter berdasarkan user_id dari session
        user_id = self.request.session.get("user_id")
        if not user_id:
            return Response(status=401, json_body={"error": "Unauthorized"})
        
        # Hanya ambil categories milik user yang login
        categories = self.request.dbsession.query(Category).filter(Category.user_id == user_id).all()
        return [{"id": c.id, "name": c.name, "description": c.description} for c in categories]

    @view_config(request_method='POST')
    def create(self):
        user_id = self.request.session.get("user_id")
        if not user_id:
            return Response(status=401, json_body={"error": "Unauthorized"})

        data = self.request.json_body
        category = Category(
            name=data.get("name", "").strip(),
            description=data.get("description", "").strip(),
            user_id=user_id
        )

        self.request.dbsession.add(category)
        self.request.dbsession.flush()
        return {"message": "Category created", "id": category.id}
    
    @view_config(request_method='OPTIONS')
    def options(self):
        return Response(status=200)


@view_config(route_name='api_category', renderer='json', request_method='PUT')
def update_category(request):
    # ✅ PERBAIKAN: Pastikan user hanya bisa edit category miliknya
    user_id = request.session.get("user_id")
    if not user_id:
        return Response(status=401, json_body={"error": "Unauthorized"})
    
    id = int(request.matchdict['id'])
    data = request.json_body
    
    # Cari category milik user yang login
    category = request.dbsession.query(Category).filter(
        Category.id == id, 
        Category.user_id == user_id
    ).first()
    
    if not category:
        return Response(status=404, json_body={"error": "Category not found"})
        
    category.name = data.get("name", "").strip()
    category.description = data.get("description", "").strip()
    return {"message": "Category updated"}

@view_config(route_name='api_category', renderer='json', request_method='DELETE')
def delete_category(request):
    # ✅ PERBAIKAN: Pastikan user hanya bisa hapus category miliknya
    user_id = request.session.get("user_id")
    if not user_id:
        return Response(status=401, json_body={"error": "Unauthorized"})
    
    id = int(request.matchdict['id'])
    
    # Cari category milik user yang login
    category = request.dbsession.query(Category).filter(
        Category.id == id, 
        Category.user_id == user_id
    ).first()
    
    if not category:
        return Response(status=404, json_body={"error": "Category not found"})
        
    request.dbsession.delete(category)
    return {"message": "Category deleted"}

@view_config(route_name='api_category', request_method='OPTIONS', renderer='json')
def category_options(request):
    return {}