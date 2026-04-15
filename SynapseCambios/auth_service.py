import bcrypt
from models.user_model import (
    create_user as create_user_model,
    get_user_by_email
)


def create_user(role_id: int,
                email: str,
                password: str,
                nit: str | None,
                dui: str,
                full_name: str,
                phone_number: str | None):

    # Verifica si el email ya está registrado
    if get_user_by_email(email):
        raise Exception("El email ya está registrado.")

    # Encripta la contraseña usando bcrypt
    password_hash = bcrypt.hashpw(
        password.encode("utf-8"),  # Convierte a bytes
        bcrypt.gensalt()           # Genera salt seguro
    ).decode("utf-8")              # Convierte nuevamente a string

    # Llama al modelo para guardar en la BD
    user_id = create_user_model(
        role_id,
        email,
        password_hash,
        nit,
        dui,
        full_name,
        phone_number
    )

    return user_id  # Retorna ID creado


def login(email: str, password: str):

    # Busca usuario por email
    user = get_user_by_email(email)

    # Si no existe, retorna error
    if not user:
        return False, "Usuario no existe."

    # Obtiene el hash almacenado (posición 3 en la tupla)
    password_hash = user[3]  # Ajustar índice si cambia estructura

    # Compara contraseña ingresada con el hash guardado
    if bcrypt.checkpw(
        password.encode("utf-8"),      # Convierte contraseña a bytes
        password_hash.encode("utf-8")  # Convierte hash a bytes
    ):
        return True, user  # Login correcto

    # Si no coincide la contraseña
    return False, "Contraseña incorrecta."