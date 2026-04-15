from services.auth_service import create_user
from services.account_service import create_account_for_user


def test_create_user_and_account():

    try:
        print("🔹 Creando usuario...")

        # Llama al servicio para crear usuario (aplica reglas y encripta contraseña)
        user_id = create_user(
            role_id=1,
            email="nuevo123@gmail.com",
            password="123456",
            nit=None,
            dui="11112222-3",
            full_name="Usuario Prueba",
            phone_number="7777-8888"
        )

        # Muestra el ID retornado
        print("✅ Usuario creado:", user_id)

        print("🔹 Creando cuenta...")

        # Crea cuenta asociada al usuario
        create_account_for_user(user_id, "USD")

        print("✅ Cuenta creada correctamente.")

    except Exception as e:
        # Captura y muestra cualquier error
        print("❌ Error:", e)


# Ejecuta la función solo si el archivo se corre directamente
if __name__ == "__main__":
    test_create_user_and_account()