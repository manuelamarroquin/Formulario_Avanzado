// 🎯 SISTEMA DE VALIDACIÓN AVANZADA

const formulario = document.getElementById("formularioAvanzado");
const campos = formulario.querySelectorAll("input, textarea, select");
const btnEnviar = document.getElementById("btnEnviar");
let estadoValidacion = {};

// Inicializar estado de todos los campos
campos.forEach((campo) => {
  estadoValidacion[campo.name] = false;
});

// Validación del nombre
document.getElementById("nombre").addEventListener("input", function() {
  const v = this.value.trim();
  if (v.length < 3) {
    mostrarError("errorNombre", "El nombre no es valido");
    marcarCampo(this, false);
    estadoValidacion["nombre"] = false;
  } else {
    mostrarExito("exitoNombre", "✓ Nombre válido");
    marcarCampo(this, true);
    estadoValidacion["nombre"] = true;
  }

});

//Validacion del apellido// 

document.getElementById("apellido").addEventListener("input", function() {
  const v = this.value.trim();
  if (v.length < 3 && v.length < 3) {
    mostrarError("errorApellido", "Apellido no valido");
    marcarCampo(this, false);
    estadoValidacion["apellido"] = false;
  } else {
    mostrarExito("exitoApellido", "✓ Campo válido");
    marcarCampo(this, true);
    estadoValidacion["apellido"] = true;
  }

});

// Validación del email
document.getElementById("correo").addEventListener("input", function () {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.value)) {
    mostrarError("errorCorreo", "Formato de email inválido");
    marcarCampo(this, false);
  } else {
    mostrarExito("exitoCorreo", "✓ Email válido");
    marcarCampo(this, true);
  }
});

//Confirmar Correo

document.getElementById("confirmarCorreo").addEventListener("input", function () {
  const correo = document.getElementById("correo").value.trim();
  const confirmar = this.value.trim();

  if (confirmar !== correo) {
    mostrarError("errorConfirmarCorreo", "Los correos no coinciden");
    marcarCampo(this, false);
  } else if (confirmar.length > 0) {
    mostrarExito("exitoConfirmarCorreo", "✓ Correos coinciden");
    marcarCampo(this, true);
  }
});

// Validación de contraseña
document.getElementById("password").addEventListener("input", function () {
  const password = this.value;
  const fortaleza = calcularFortalezaPassword(password);
  actualizarBarraFortaleza(fortaleza);

  if (password.length < 8) {
    mostrarError(
      "errorPassword",
      "La contraseña debe tener al menos 8 caracteres"
    );
    marcarCampo(this, false);
  } else if (fortaleza.nivel < 2) {
    mostrarError(
      "errorPassword",
      "Contraseña muy débil. Añade números y símbolos"
    );
    marcarCampo(this, false);
  } else {
    mostrarExito("exitoPassword", `✓ Contraseña ${fortaleza.texto}`);
    marcarCampo(this, true);
  }

  const confirmar = document.getElementById("confirmarPassword");
  if (confirmar.value) confirmar.dispatchEvent(new Event("input"));
});

// Confirmar contraseña
document
  .getElementById("confirmarPassword")
  .addEventListener("input", function () {
    const password = document.getElementById("password").value;
    if (this.value !== password) {
      mostrarError("errorConfirmar", "Las contraseñas no coinciden");
      marcarCampo(this, false);
    } else if (this.value.length > 0) {
      mostrarExito("exitoConfirmar", "✓ Contraseñas coinciden");
      marcarCampo(this, true);
    }
  });

// Teléfono
document.getElementById("telefono").addEventListener("input", function () {
  let valor = this.value.replace(/\D/g, "");
  if (valor.length >= 6) {
    valor =
      valor.substring(0, 3) +
      "-" +
      valor.substring(3, 6) +
      "-" +
      valor.substring(6, 10);
  } else if (valor.length >= 3) {
    valor = valor.substring(0, 3) + "-" + valor.substring(3);
  }
  this.value = valor;

  const telefonoRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  if (!telefonoRegex.test(valor)) {
    mostrarError("errorTelefono", "Formato: 300-123-4567");
    marcarCampo(this, false);
  } else {
    mostrarExito("exitoTelefono", "✓ Teléfono válido");
    marcarCampo(this, true);
  }
});

// Fecha de nacimiento
document
  .getElementById("fechaNacimiento")
  .addEventListener("change", function () {
    const fechaNacimiento = new Date(this.value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

    if (edad < 18) {
      mostrarError("errorFecha", "Debes ser mayor de 18 años");
      marcarCampo(this, false);
    } else if (edad > 100) {
      mostrarError("errorFecha", "Fecha no válida");
      marcarCampo(this, false);
    } else {
      mostrarExito("exitoFecha", `✓ Edad: ${edad} años`);
      marcarCampo(this, true);
    }
  });

// Comentarios
document.getElementById("comentarios").addEventListener("input", function () {
  const contador = document.getElementById("contadorComentarios");
  contador.textContent = this.value.length;

  contador.style.color =
    this.value.length > 450
      ? "#dc3545"
      : this.value.length > 400
      ? "#ffc107"
      : "#666";
  marcarCampo(this, true);
});

// Términos
document.getElementById("terminos").addEventListener("change", function () {
  if (!this.checked) {
    mostrarError("errorTerminos", "Debes aceptar los términos y condiciones");
    marcarCampo(this, false);
  } else {
    ocultarMensaje("errorTerminos");
    marcarCampo(this, true);
  }
});

// Funciones auxiliares
function mostrarError(idElemento, mensaje) {
  const elemento = document.getElementById(idElemento);
  elemento.textContent = mensaje;
  elemento.style.display = "block";
  ocultarMensaje(idElemento.replace("error", "exito"));
}

function mostrarExito(idElemento, mensaje) {
  const elemento = document.getElementById(idElemento);
  elemento.textContent = mensaje;
  elemento.style.display = "block";
  ocultarMensaje(idElemento.replace("exito", "error"));
}

function ocultarMensaje(idElemento) {
  const elemento = document.getElementById(idElemento);
  if (elemento) elemento.style.display = "none";
}

function marcarCampo(campo, esValido) {
  estadoValidacion[campo.name] = esValido;
  campo.classList.toggle("valido", esValido);
  campo.classList.toggle("invalido", !esValido);
  actualizarProgreso();
  actualizarBotonEnvio();
}

function calcularFortalezaPassword(password) {
  let puntos = 0;
  if (password.length >= 8) puntos++;
  if (password.length >= 12) puntos++;
  if (/[a-z]/.test(password)) puntos++;
  if (/[A-Z]/.test(password)) puntos++;
  if (/[0-9]/.test(password)) puntos++;
  if (/[^A-Za-z0-9]/.test(password)) puntos++;
  const niveles = ["muy débil", "débil", "media", "fuerte", "muy fuerte"];
  const nivel = Math.min(Math.floor(puntos / 1.2), 4);
  return { nivel, texto: niveles[nivel], puntos };
}

function actualizarBarraFortaleza(fortaleza) {
  const barra = document.getElementById("strengthBar");
  const clases = [
    "strength-weak",
    "strength-weak",
    "strength-medium",
    "strength-strong",
    "strength-very-strong",
  ];
  barra.className = "password-strength " + clases[fortaleza.nivel];
}

function actualizarProgreso() {
  const totalCampos = Object.keys(estadoValidacion).length;
  const camposValidos = Object.values(estadoValidacion).filter(Boolean).length;
  const porcentaje = Math.round((camposValidos / totalCampos) * 100);
  document.getElementById("barraProgreso").style.width = porcentaje + "%";
  document.getElementById("porcentajeProgreso").textContent = porcentaje + "%";
}

function actualizarBotonEnvio() {
  btnEnviar.disabled = !Object.values(estadoValidacion).every(Boolean);
}

// Envío del formulario
formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  const datosFormulario = new FormData(this);
  let resumenHTML = "";

  for (let [campo, valor] of datosFormulario.entries()) {
    if (valor.trim()) {
      resumenHTML += `<div class="dato-resumen"><span class="etiqueta-resumen">${obtenerNombreCampo(
        campo
      )}:</span> ${valor}</div>`;
    }
  }

  document.getElementById("contenidoResumen").innerHTML = resumenHTML;
  document.getElementById("resumenDatos").style.display = "block";
  document
    .getElementById("resumenDatos")
    .scrollIntoView({ behavior: "smooth" });

  console.log("📊 Formulario enviado:", Object.fromEntries(datosFormulario));
});

function obtenerNombreCampo(campo) {
  const nombres = {
    nombreCompleto: "Nombre completo",
    correo: "Correo electrónico",
    password: "Contraseña",
    confirmarPassword: "Confirmación de contraseña",
    telefono: "Teléfono",
    fechaNacimiento: "Fecha de nacimiento",
    comentarios: "Comentarios",
    terminos: "Términos aceptados",
  };
  return nombres[campo] || campo;
}

function reiniciarFormulario() {
  formulario.reset();
  document.getElementById("resumenDatos").style.display = "none";

  Object.keys(estadoValidacion).forEach((campo) => {
    estadoValidacion[campo] = false;
  });

  campos.forEach((campo) => campo.classList.remove("valido", "invalido"));

  document.querySelectorAll(".mensaje-error, .mensaje-exito").forEach((m) => {
    m.style.display = "none";
  });

  actualizarProgreso();
  actualizarBotonEnvio();

  document.getElementById("strengthBar").className = "password-strength";
}
