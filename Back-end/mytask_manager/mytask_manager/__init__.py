from pyramid.config import Configurator

def main(global_config, **settings):
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('mytask_manager.models')
        config.include('mytask_manager.routes')
        config.include('mytask_manager.cors')
        
        # Explicitly include views
        config.include('mytask_manager.views')
        
        # Scan setelah semua include
        config.scan('mytask_manager.views')
        
        return config.make_wsgi_app()