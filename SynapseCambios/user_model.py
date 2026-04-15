from config.database import get_cursor
from datetime import datetime


def create_user(role_id: int,
                email: str,
                password_hash: str,
                nit: str | None,
                dui: str,
                full_name: str,
                phone_number: str | None,
                is_active: bool = True) -> int:

    now = datetime.now()  # Fecha actual para created_at y updated_at

    query = """
        INSERT INTO [user] (
            [role_id],
            [email],
            [password_hash],
            [NIT],
            [DUI],
            [full_name],
            [phone_number],
            [created_at],
            [updated_at],
            [is_active]
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """  # Consulta para insertar nuevo usuario

    # Abre conexión con commit automático
    with get_cursor(commit=True) as cursor:
        cursor.execute(
            query,
            (
                role_id,        # Rol del usuario
                email,          # Correo electrónico
                password_hash,  # Contraseña encriptada
                nit,            # NIT (puede ser None)
                dui,            # DUI
                full_name,      # Nombre completo
                phone_number,   # Teléfono (puede ser None)
                now,            # Fecha de creación
                now,            # Fecha de actualización
                is_active       # Estado activo/inactivo
            )
        )

        # Obtiene el ID del usuario recién insertado
        cursor.execute("SELECT @@IDENTITY")
        user_id = cursor.fetchone()[0]

    return user_id  # Retorna el ID creado


def get_user_by_email(email: str):
    # Consulta para buscar usuario por email
    query = "SELECT * FROM [user] WHERE [email] = ?"

    with get_cursor() as cursor:  # Abre conexión
        cursor.execute(query, (email,))  # Ejecuta consulta
        return cursor.fetchone()  # Devuelve el usuario encontrado


def get_user_by_id(user_id: int):
    # Consulta para buscar usuario por ID
    query = "SELECT * FROM [user] WHERE [Id_user] = ?"

    with get_cursor() as cursor:  # Abre conexión
        cursor.execute(query, (user_id,))  # Ejecuta consulta
        return cursor.fetchone()  # Devuelve el usuario encontrado