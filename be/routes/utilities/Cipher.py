import os

from cryptography.fernet import Fernet

secret_key: str = os.getenv('SECRET_KEY')


def encrypt(data: str) -> str:
    cipher_suite = Fernet(secret_key)
    return cipher_suite.encrypt(data.encode('utf-8')).decode('utf-8')


def decrypt(data: str) -> str:
    cipher_suite = Fernet(secret_key)
    return cipher_suite.decrypt(data.encode('utf-8')).decode('utf-8')
