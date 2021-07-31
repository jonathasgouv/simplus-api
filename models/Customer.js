const mongoose = require("../database");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

function isValidCPF(cpf) {
  // Validar se é String
  if (typeof cpf !== "string") return false;

  // Tirar formatação
  cpf = cpf.replace(/[^\d]+/g, "");

  // Validar se tem tamanho 11 ou se é uma sequência de digitos repetidos
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  // String para Array
  cpf = cpf.split("");

  const validator = cpf
    // Pegar os últimos 2 digitos de validação
    .filter((digit, index, array) => index >= array.length - 2 && digit)
    // Transformar digitos em números
    .map((el) => +el);

  const toValidate = (pop) =>
    cpf
      // Pegar Array de items para validar
      .filter((digit, index, array) => index < array.length - pop && digit)
      // Transformar digitos em números
      .map((el) => +el);

  const rest = (count, pop) =>
    ((toValidate(pop)
      // Calcular Soma dos digitos e multiplicar por 10
      .reduce((soma, el, i) => soma + el * (count - i), 0) *
      10) %
      // Pegar o resto por 11
      11) %
    // transformar de 10 para 0
    10;

  return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
}

const isValidCEP = (cep) => {
  pattern = /^[0-9]{2}\.[0-9]{3}-[0-9]{3}$/;
  return pattern.test(cep);
};

const AddressSchema = new mongoose.Schema({
  state: {
    type: String,
    maxlength: 2,
  },
  city: {
    type: String,
  },
  district: {
    type: String,
  },
  street: {
    type: String,
  },
  number: {
    type: String,
  },
  cep: {
    type: String,
    validate: [isValidCEP, "invalid CEP"],
  },
});

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: Boolean,
    required: true,
  },
  cpf: {
    type: String,
    validate: [isValidCPF, "invalid CPF"],
  },
  expiration: {
    type: Date,
    required: true,
  },
  cellphone: {
    type: Number,
  },
  address: AddressSchema,
  observation: {
    type: String,
  },
  dependents: {
    type: Array,
  },
  ownerId: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("Customer", CustomerSchema);

module.exports = User;
