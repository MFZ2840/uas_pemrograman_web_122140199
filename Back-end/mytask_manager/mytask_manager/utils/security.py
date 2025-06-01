# utils/security.py
from passlib.hash import bcrypt

def hash_password(password):
    """Hash plain password using bcrypt"""
    return bcrypt.hash(password)

def verify_password(password, hashed):
    """Verify plain password against the hashed version"""
    return bcrypt.verify(password, hashed)
