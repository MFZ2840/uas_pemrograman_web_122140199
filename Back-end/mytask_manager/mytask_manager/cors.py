# mytask_manager/cors.py

from pyramid.events import NewResponse
from pyramid.response import Response

def includeme(config):
    def add_cors_headers_response_callback(event):
        request = event.request
        response = event.response

        origin = request.headers.get('Origin')
        allowed_origin = 'http://localhost:3000'  # <- sesuaikan jika beda

        if origin == allowed_origin:
            response.headers.update({
                'Access-Control-Allow-Origin': allowed_origin,
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Credentials': 'true',
            })

    config.add_subscriber(add_cors_headers_response_callback, NewResponse)

    # Handler untuk preflight OPTIONS request
    def options_handler(request):
        return Response(status=200, json_body={})

    config.add_view(
        options_handler,
        request_method='OPTIONS',
        renderer='json'
    )