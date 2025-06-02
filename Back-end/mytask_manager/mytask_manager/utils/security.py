# utils/security.py
import bcrypt
import logging

log = logging.getLogger(__name__)

def hash_password(password):
    """Hash a password using bcrypt"""
    try:
        # Convert password to bytes if it's a string
        if isinstance(password, str):
            password = password.encode('utf-8')
        
        # Generate salt and hash password
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password, salt)
        
        # Return as string for database storage
        return hashed.decode('utf-8')
    except Exception as e:
        log.error(f"Error hashing password: {e}")
        raise

def verify_password(password, hashed_password):
    """Verify a password against its hash"""
    try:
        # Convert to bytes if they're strings
        if isinstance(password, str):
            password = password.encode('utf-8')
        if isinstance(hashed_password, str):
            hashed_password = hashed_password.encode('utf-8')
        
        # Verify password
        return bcrypt.checkpw(password, hashed_password)
    except Exception as e:
        log.error(f"Error verifying password: {e}")
        return False