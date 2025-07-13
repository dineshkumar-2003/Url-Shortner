import secrets
import string

def generate_code(length=6):
    return ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(length))
