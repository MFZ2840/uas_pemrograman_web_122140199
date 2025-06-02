from pyramid.config import Configurator
from pyramid.session import SignedCookieSessionFactory

def main(global_config, **settings):
    my_session_factory = SignedCookieSessionFactory(
        'supersecret', 
        domain='localhost',     # ✅ sangat penting
        path='/',
        httponly=True,
        secure=False,           # Jangan True saat development
        samesite='Lax'          # 'None' jika lintas domain pakai HTTPS
    )
    with Configurator(settings=settings) as config:
        config.set_session_factory(my_session_factory)  # ✅ INI WAJIB
        
        config.include('pyramid_jinja2')
        config.include('mytask_manager.models')
        config.include('mytask_manager.routes')
        config.include('mytask_manager.cors')
        config.include('mytask_manager.views')

        config.scan('mytask_manager.views')
        return config.make_wsgi_app()
