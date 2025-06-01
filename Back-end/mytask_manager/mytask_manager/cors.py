# mytask_manager/cors.py

def includeme(config):
    def add_cors_headers_response_callback(event):
        response = event.response
        response.headers.update({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        })

    config.add_subscriber(add_cors_headers_response_callback, 'pyramid.events.NewResponse')

    # Handler untuk preflight OPTIONS request - lebih spesifik
    def options_handler(request):
        """Handle CORS preflight requests"""
        return {}

    # Tambahkan view untuk OPTIONS method tanpa route spesifik
    # Ini akan menangani semua OPTIONS request
    config.add_view(
        options_handler,
        request_method='OPTIONS',
        renderer='json'
    )