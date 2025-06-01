# views/auth.py

import logging
from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound, HTTPUnauthorized, HTTPInternalServerError
from sqlalchemy.exc import DBAPIError, IntegrityError
import json

try:
    from ..models import User
    from ..utils.security import verify_password, hash_password
except ImportError as e:
    logging.warning(f"Could not import models or security utils: {e}")
    User = None
    verify_password = None
    hash_password = None

log = logging.getLogger(__name__)

@view_config(route_name='login', renderer='json', request_method='POST')
def login_view(request):
    """Handle user login"""
    try:
        log.info("Login endpoint called")
        
        # Parse request data
        try:
            data = request.json_body
        except Exception as e:
            log.error(f"Failed to parse JSON body: {e}")
            raise HTTPBadRequest(json_body={'error': 'Invalid JSON data'})
        
        email = data.get('email', '').strip()
        password = data.get('password', '')
        
        log.info(f"Login attempt for email: {email}")
        
        # Basic validation
        if not email or not password:
            raise HTTPBadRequest(json_body={'error': 'Email and password are required'})
        
        # Check if models are available
        if not User or not verify_password:
            log.warning("User model or security utils not available")
            raise HTTPInternalServerError(json_body={'error': 'Server configuration error'})
        
        # Find user
        user = request.dbsession.query(User).filter_by(email=email).first()
        
        if not user:
            log.info(f"User not found for email: {email}")
            raise HTTPNotFound(json_body={'error': 'User not found'})
        
        # Verify password
        if not verify_password(password, user.password_hash):
            log.info(f"Invalid password for email: {email}")
            raise HTTPUnauthorized(json_body={'error': 'Incorrect password'})
        
        log.info(f"Login successful for user: {user.username}")
        
        return {
            'message': 'Login successful',
            'user_id': user.id,
            'username': user.username,
            'email': user.email
        }
        
    except (HTTPBadRequest, HTTPNotFound, HTTPUnauthorized, HTTPInternalServerError):
        # Re-raise HTTP exceptions
        raise
    except DBAPIError as e:
        log.error(f"Database error in login: {e}")
        raise HTTPInternalServerError(json_body={'error': 'Database error'})
    except Exception as e:
        log.error(f"Unexpected error in login: {e}")
        raise HTTPInternalServerError(json_body={'error': 'Internal server error'})

@view_config(route_name='register', renderer='json', request_method='POST')
def register_view(request):
    """Handle user registration"""
    try:
        log.info("Register endpoint called")
        
        # Parse request data
        try:
            data = request.json_body
        except Exception as e:
            log.error(f"Failed to parse JSON body: {e}")
            raise HTTPBadRequest(json_body={'error': 'Invalid JSON data'})
        
        username = data.get('username', '').strip()
        email = data.get('email', '').strip()
        password = data.get('password', '')
        
        log.info(f"Registration attempt - username: {username}, email: {email}")
        
        # Validation
        if not username or not email or not password:
            raise HTTPBadRequest(json_body={'error': 'All fields are required'})
        
        if len(password) < 8:
            raise HTTPBadRequest(json_body={'error': 'Password must be at least 8 characters long'})
        
        # Check if models are available
        if not User or not hash_password:
            log.warning("User model or security utils not available")
            raise HTTPInternalServerError(json_body={'error': 'Server configuration error'})
        
        # Check if user already exists
        existing_user_email = request.dbsession.query(User).filter_by(email=email).first()
        if existing_user_email:
            log.info(f"Email already registered: {email}")
            raise HTTPBadRequest(json_body={'error': 'Email already registered'})
        
        existing_user_username = request.dbsession.query(User).filter_by(username=username).first()
        if existing_user_username:
            log.info(f"Username already taken: {username}")
            raise HTTPBadRequest(json_body={'error': 'Username already taken'})
        
        # Create new user
        try:
            password_hash = hash_password(password)
            new_user = User(
                username=username, 
                email=email, 
                password_hash=password_hash
            )
            
            request.dbsession.add(new_user)
            request.dbsession.flush()  # Get the ID without committing
            
            log.info(f"User registered successfully - ID: {new_user.id}, username: {username}")
            
            return {
                'message': 'User registered successfully',
                'user_id': new_user.id,
                'username': new_user.username,
                'email': new_user.email
            }
            
        except IntegrityError as e:
            log.error(f"Database integrity error: {e}")
            request.dbsession.rollback()
            raise HTTPBadRequest(json_body={'error': 'User with this email or username already exists'})
        
    except (HTTPBadRequest, HTTPNotFound, HTTPUnauthorized, HTTPInternalServerError):
        # Re-raise HTTP exceptions
        raise
    except DBAPIError as e:
        log.error(f"Database error in register: {e}")
        request.dbsession.rollback()
        raise HTTPInternalServerError(json_body={'error': 'Database error'})
    except Exception as e:
        log.error(f"Unexpected error in register: {e}")
        request.dbsession.rollback()
        raise HTTPInternalServerError(json_body={'error': 'Internal server error'})

def includeme(config):
    """Include auth views - views are auto-registered via @view_config decorators"""
    log.info("Auth views module included")
    pass