export const validateUsuario = ({ nome, email }) => {
  if (!nome || !email) {
    throw new Error("Nome e e-mail são obrigatórios")
  }
  if (!email.includes("@")) {
    throw new Error("E-mail inválido")
  }
} 